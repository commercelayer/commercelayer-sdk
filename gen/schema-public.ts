import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { sortObjectFields } from '../src/util'
import Inflector from './inflector'
import {
  type ApiSchema,
  type Attribute,
  Cardinality,
  type Component,
  type ComponentMap,
  type Operation,
  type Relationship,
  type Resource,
} from './schema'

const RESOURCES_LOCAL_PATH = resolve('./gen/public_resources.json')
const DEFAULT_API_HOST = 'core.commercelayer.io'
// No api-version → unversioned endpoint (`/api/public/resources`). Pass
// `--api-version=YYYY-MM` to target a specific dated schema.

type PublicFieldType = 'string' | 'boolean' | 'integer' | 'float' | 'object' | 'array'

type PublicField = {
  type: PublicFieldType
  desc?: string
  required?: string | boolean
  creatable?: boolean
  updatable?: boolean
  fetchable?: boolean
  filterable?: boolean
  sortable?: boolean
  example?: unknown
  enum?: string[]
  aasm?: boolean
  delegate?: string
  filter_operators?: string[]
}

type PublicRelationship = {
  type: 'has_one' | 'has_many'
  desc?: string
  required?: string | boolean
  creatable?: boolean
  updatable?: boolean
  fetchable?: boolean
  filterable?: boolean
  sortable?: boolean
  class_name: string
  polymorphic?: boolean
  sti?: boolean
  prohibited?: boolean
  virtual?: boolean
  includable?: boolean
  exportable?: boolean
  eager_load_on_include?: boolean
  enum?: string[]
  parent_resource?: string
  deprecated?: boolean
}

type PublicResource = {
  id: string
  type: 'resources'
  attributes: {
    singleton: boolean
    deprecated: boolean
    addon: boolean
    hidden: boolean
    actions: Array<'list' | 'retrieve' | 'create' | 'update' | 'delete'>
    fields: Record<string, PublicField>
    relationships?: Record<string, PublicRelationship>
    examples?: Record<string, unknown>
    filter_scopes?: unknown[]
    filters?: Record<string, unknown>
    parent_resource?: string
  }
}

type PublicResourcesDoc = { data: PublicResource[] }

type SchemaInfo = {
  remoteUrl: string
  localPath: string
  version: string
}

type GeneratorOptions = {
  apiHost?: string
  apiVersion?: string
}

// Hardcoded array item types for the 15 array fields in public/resources.
// Mirrors the items.type values from the current OpenAPI schema so the
// dual-source diff exercise stays clean.
const ARRAY_ITEM_TYPES: Record<string, 'string' | 'object'> = {
  'easypost_pickup.rates': 'object',
  'export.includes': 'string',
  'export.fields': 'string',
  'external_gateway.external_includes': 'string',
  'external_promotion.external_includes': 'string',
  'external_tax_calculator.external_includes': 'string',
  'gift_card.balance_log': 'object',
  'import.inputs': 'object',
  'klarna_payment.payment_methods': 'object',
  'market.external_includes': 'string',
  'market.payment_setting_ids': 'string',
  'parcel.tracking_details': 'object',
  'payment_setting_external.external_includes': 'string',
  'shipment.rates': 'object',
  'shipment.get_rates_errors': 'object',
  'shipping_method.external_includes': 'string',
  'subscription_model.frequencies': 'string',
  'webhook.include_resources': 'string',
}

const remoteUrlFor = (opts: GeneratorOptions): string => {
  const host = opts.apiHost || DEFAULT_API_HOST
  const segment = opts.apiVersion ? `${opts.apiVersion}/` : ''
  return `https://${host}/api/public/${segment}resources`
}

const versionLabel = (opts: GeneratorOptions): string => opts.apiVersion || 'latest'

type ResourceContext = {
  res: PublicResource
  singular: string
  plural: string
  cam: string
  idVar: string
  singleton: boolean
}

const resourceContext = (res: PublicResource): ResourceContext => {
  const singular = res.id
  return {
    res,
    singular,
    plural: Inflector.pluralize(singular),
    cam: Inflector.camelize(singular),
    idVar: `${singular}Id`,
    singleton: res.attributes.singleton === true,
  }
}

const downloadResources = async (opts: GeneratorOptions = {}): Promise<SchemaInfo> => {
  const url = remoteUrlFor(opts)
  const outPath = RESOURCES_LOCAL_PATH

  console.log(`Downloading public resources schema ... [${url}]`)

  const response = await fetch(url)
  if (!response.ok) throw new Error(`Error downloading public resources schema (${response.status})`)
  const doc = (await response.json()) as PublicResourcesDoc

  if (doc?.data) writeFileSync(outPath, JSON.stringify(doc, null, 4))
  else console.log('Public resources schema is empty!')

  const version = versionLabel(opts)
  console.log('Public resources schema downloaded: ' + version)

  return { remoteUrl: url, localPath: outPath, version }
}

const currentSchema = (): { info: { version: string } } | undefined => {
  try {
    const raw = readFileSync(RESOURCES_LOCAL_PATH, { encoding: 'utf-8' })
    const doc = JSON.parse(raw) as PublicResourcesDoc & { _version?: string }
    return { info: { version: doc._version || '0.0.0' } }
  } catch {
    return undefined
  }
}

const readRequired = (required: string | boolean | undefined): boolean => {
  if (typeof required === 'boolean') return required
  return (required || '').trim() === 'required'
}

const mapAttributeType = (resId: string, fieldName: string, field: PublicField): string => {
  switch (field.type) {
    case 'integer':
      return 'integer'
    case 'float':
      return 'number'
    case 'string':
      return 'string'
    case 'boolean':
      return 'boolean'
    case 'object':
      return 'object'
    case 'array': {
      const key = `${resId}.${fieldName}`
      const itemType = ARRAY_ITEM_TYPES[key]
      if (!itemType) {
        console.log(`Warning: unknown array item type for ${key}, defaulting to object`)
        return 'object[]'
      }
      return `${itemType}[]`
    }
    default:
      return 'string'
  }
}

// Public/resources occasionally ships object examples as JS-literal-style
// strings ({ key: "value" }) or with trailing commas — neither is valid
// strict JSON. We coerce both shapes so the rendered @example output matches
// what OpenAPI produces (a stringified object literal). If lenient parsing
// still fails we return the raw string.
const parseLenientObjectExample = (raw: string): unknown => {
  try {
    return JSON.parse(raw)
  } catch {
    // Quote bare object keys, then strip trailing commas before `}` / `]`.
    const quoted = raw.replace(/([{,]\s*)([A-Za-z_][\w]*)\s*:/g, '$1"$2":')
    const stripped = quoted.replace(/,(\s*[}\]])/g, '$1')
    try {
      return JSON.parse(stripped)
    } catch {
      return raw
    }
  }
}

const coerceExample = (example: unknown, fieldType: PublicFieldType): unknown => {
  if (example === undefined || example === null) return undefined
  if (typeof example !== 'string') return example
  switch (fieldType) {
    case 'boolean':
      if (example === 'true') return true
      if (example === 'false') return false
      return example
    case 'integer': {
      const n = Number.parseInt(example, 10)
      return Number.isNaN(n) ? example : n
    }
    case 'float': {
      const n = Number.parseFloat(example)
      return Number.isNaN(n) ? example : n
    }
    case 'object':
      return parseLenientObjectExample(example)
    default:
      return example
  }
}

const buildAttribute = (resId: string, fieldName: string, field: PublicField, required: boolean): Attribute => {
  return {
    name: fieldName,
    type: mapAttributeType(resId, fieldName, field),
    required,
    fetchable: field.fetchable === true,
    sortable: field.sortable === true,
    filterable: field.filterable === true,
    enum: field.enum as string[],
    description: field.desc,
    example: coerceExample(field.example, field.type) as string | undefined,
  }
}

const buildRelationship = (
  relName: string,
  rel: PublicRelationship,
  parentCam?: string,
  deprecatedClassNames?: ReadonlySet<string>,
): Relationship => {
  const cardinality = rel.type === 'has_many' ? Cardinality.to_many : Cardinality.to_one
  const className = rel.class_name
  let polymorphic = rel.polymorphic === true && Array.isArray(rel.enum) && rel.enum.length > 0
  // For polymorphic relationships, match OpenAPI's parser which uses the
  // first enum entry as the canonical `type` (used by the spec generator
  // to pick a concrete relationship import). Non-polymorphic relationships
  // derive from class_name.
  let type =
    polymorphic && rel.enum && rel.enum.length > 0
      ? (rel.enum[0] as string)
      : Inflector.pluralize(Inflector.snakeCase(className))
  let oneOf = polymorphic && rel.enum ? rel.enum.map((e) => Inflector.camelize(Inflector.singularize(e))) : undefined
  // Drop polymorphic options that point to deprecated resources — the
  // renderer would otherwise emit imports from non-existent files.
  if (oneOf && deprecatedClassNames && deprecatedClassNames.size > 0) {
    oneOf = oneOf.filter((n) => !deprecatedClassNames.has(n))
  }
  // STI: drop self-reference from oneOf — the template already declares
  // `<Self>Rel = ResourceRel & { type: <Self>Type }`, so re-emitting it here
  // causes a duplicate declaration. If the filter collapses oneOf to empty,
  // the relationship is effectively a self-only union — collapse the abstract
  // class_name down to the concrete parent type.
  if (oneOf && parentCam) {
    const filtered = oneOf.filter((n) => n !== parentCam)
    if (filtered.length === 0) {
      polymorphic = false
      oneOf = undefined
      type = Inflector.pluralize(Inflector.snakeCase(parentCam))
    } else {
      oneOf = filtered
    }
  }
  return {
    name: relName,
    type,
    required: readRequired(rel.required),
    cardinality,
    deprecated: rel.deprecated === true,
    oneOf,
    polymorphic,
  }
}

type ComponentVariant = 'read' | 'create' | 'update'

type VariantRule = {
  includeField: (f: PublicField) => boolean
  includeRel: (r: PublicRelationship) => boolean
  fieldRequired: (f: PublicField) => boolean
  relRequired: (r: PublicRelationship) => boolean
}

// Per-variant inclusion + required-ness rules. Replaces three parallel switch
// statements that each had to be kept in sync.
const VARIANT_RULES: Record<ComponentVariant, VariantRule> = {
  read: {
    includeField: (f) => f.fetchable === true,
    includeRel: () => true,
    // aasm state-machine fields are always populated in responses (OpenAPI
    // renders them nullable:false; the OpenAPI parser promotes
    // `fetchable && !nullable` to required).
    fieldRequired: (f) => readRequired(f.required) || f.aasm === true,
    // OpenAPI's read schema lists no required relationships — match that.
    relRequired: () => false,
  },
  create: {
    includeField: (f) => f.creatable === true,
    includeRel: (r) => r.creatable === true,
    fieldRequired: (f) => readRequired(f.required),
    relRequired: (r) => readRequired(r.required),
  },
  update: {
    includeField: (f) => f.updatable === true,
    includeRel: (r) => r.updatable === true,
    // Update is partial.
    fieldRequired: () => false,
    relRequired: () => false,
  },
}

const buildComponent = (
  ctx: ResourceContext,
  variant: ComponentVariant,
  deprecatedClassNames: ReadonlySet<string>,
): Component => {
  const rule = VARIANT_RULES[variant]
  const attributes: Record<string, Attribute> = {}
  const relationships: Record<string, Relationship> = {}

  for (const [name, field] of Object.entries(ctx.res.attributes.fields)) {
    if (name === 'id' || name === 'type') continue
    if (!rule.includeField(field)) continue
    attributes[name] = buildAttribute(ctx.singular, name, field, rule.fieldRequired(field))
  }

  for (const [name, rel] of Object.entries(ctx.res.attributes.relationships || {})) {
    if (!rule.includeRel(rel)) continue
    relationships[name] = {
      ...buildRelationship(name, rel, ctx.cam, deprecatedClassNames),
      required: rule.relRequired(rel),
    }
  }

  return { attributes, relationships }
}

const buildOperations = (ctx: ResourceContext): Record<string, Operation> => {
  const { singular, plural, cam, idVar, singleton } = ctx
  const operations: Record<string, Operation> = {}

  const basePath = singleton ? `/${singular}` : `/${plural}`
  const idPath = singleton ? `/${singular}` : `/${plural}/{${idVar}}`
  // Even for singleton resources, OpenAPI exposes relationship sub-paths
  // under `/<singular>/{<singular>Id}/<rel>`. Match that.
  const relParentPath = singleton ? `/${singular}/{${idVar}}` : idPath
  const opId = singleton ? undefined : idVar

  // Singleton resources only declare a 'retrieve' action; OpenAPI's path-based
  // parser names that 'list' (no id segment), and the renderer's spec template
  // detects singletons via `op.name === 'list' && op.singleton`. Normalise upfront.
  const actions = singleton
    ? ctx.res.attributes.actions.map((a) => (a === 'retrieve' ? 'list' : a))
    : ctx.res.attributes.actions

  for (const action of actions) {
    switch (action) {
      case 'list':
        operations.list = { path: basePath, type: 'get', name: 'list', singleton, responseType: cam }
        break
      case 'retrieve':
        operations.retrieve = {
          path: idPath,
          type: 'get',
          name: 'retrieve',
          singleton: false,
          id: idVar,
          responseType: cam,
        }
        break
      case 'create':
        operations.create = {
          path: basePath,
          type: 'post',
          name: 'create',
          singleton,
          requestType: `${cam}Create`,
          responseType: cam,
        }
        break
      case 'update':
        operations.update = {
          path: idPath,
          type: 'patch',
          name: 'update',
          singleton,
          id: opId,
          requestType: `${cam}Update`,
          responseType: cam,
        }
        break
      case 'delete':
        operations.delete = { path: idPath, type: 'delete', name: 'delete', singleton, id: opId }
        break
    }
  }

  for (const [relName, rel] of Object.entries(ctx.res.attributes.relationships || {})) {
    // Polymorphic relationships handle their union inline in the read model;
    // deprecated relationships render as `object[]` with @deprecated. Neither
    // gets a dedicated sub-path operation.
    if (rel.polymorphic === true || rel.deprecated === true) continue
    const relationship = buildRelationship(relName, rel)
    operations[relName] = {
      path: `${relParentPath}/${relName}`,
      type: 'get',
      name: relName,
      singleton: false,
      id: idVar,
      responseType: Inflector.camelize(Inflector.singularize(relationship.type)),
      relationship,
    }
  }

  return operations
}

const parseSchema = (path: string, opts: GeneratorOptions = {}): ApiSchema => {
  console.log('Parsing public resources schema ...')

  const raw = readFileSync(path, { encoding: 'utf-8' })
  const doc = JSON.parse(raw) as PublicResourcesDoc

  const version = versionLabel(opts)
  console.log(`Schema version: ${version}`)

  const resources: Record<string, Resource> = {}
  const components: ComponentMap = {}

  // Collect deprecated resource class_names so polymorphic `oneOf` arrays
  // can exclude entries that would otherwise reference missing imports.
  const deprecatedClassNames: ReadonlySet<string> = new Set(
    doc.data.filter((r) => r.attributes.deprecated === true).map((r) => Inflector.camelize(r.id)),
  )

  for (const res of doc.data) {
    // Deprecated resources are kept out of the generated SDK surface;
    // references to them via relationships are still emitted but marked
    // @deprecated and typed as `object` by the renderer.
    if (res.attributes.deprecated === true) continue

    const ctx = resourceContext(res)
    const { plural, cam } = ctx

    const operations = buildOperations(ctx)
    const readComp = buildComponent(ctx, 'read', deprecatedClassNames)

    const resComponents: ComponentMap = { [cam]: readComp }
    if (operations.create) resComponents[`${cam}Create`] = buildComponent(ctx, 'create', deprecatedClassNames)
    if (operations.update) resComponents[`${cam}Update`] = buildComponent(ctx, 'update', deprecatedClassNames)

    resources[plural] = {
      components: sortObjectFields(resComponents),
      operations,
    }

    components[cam] = readComp
  }

  console.log('Public resources schema correctly parsed.')

  return { version, resources, components }
}

export default {
  download: downloadResources,
  parse: parseSchema,
  current: currentSchema,
  localPath: RESOURCES_LOCAL_PATH,
  remoteUrl: remoteUrlFor({}),
}
