import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { sortObjectFields } from '../src/util'
import Inflector from './inflector'

type ApiSchema = {
  version: string
  resources: Record<string, Resource>
  components: ComponentMap
}

type Resource = {
  components: ComponentMap
  operations: Record<string, Operation>
  deprecated?: boolean
  deprecatedSince?: string
  since?: string
}

type Component = {
  attributes: { [key: string]: Attribute }
  relationships: { [key: string]: Relationship }
}

type ComponentMap = {
  [key: string]: Component
}

type Attribute = {
  type: string
  name: string
  required: boolean
  fetchable: boolean
  sortable?: boolean
  filterable?: boolean
  enum: string[]
  description?: string
  example?: string
  deprecated?: boolean
  deprecatedSince?: string
  since?: string
}

enum Cardinality {
  to_one = 'to_one',
  to_many = 'to_many',
}

type Relationship = {
  type: string
  name: string
  required: boolean
  cardinality: Cardinality
  deprecated: boolean
  deprecatedSince?: string
  since?: string
  /**
   * Set when the relationship's target resource is excluded from the current
   * build (only available in versions newer than the target). The renderer
   * falls back to `object[]` because the proper type module isn't generated.
   * When false/undefined, even deprecated relationships render with their
   * proper type — the target resource is still in the SDK (with its own
   * `@deprecated` marker when applicable).
   */
  targetExcluded?: boolean
  oneOf?: Array<string>
  polymorphic: boolean
}

type Operation = {
  path: string
  type: string
  id?: string
  name: string
  requestType?: string
  responseType?: string
  singleton: boolean
  relationship?: Relationship
  trigger?: boolean
  deprecated?: boolean
  deprecatedSince?: string
  since?: string
}

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
  /** API versions this field belongs to. Absent → version-agnostic. */
  versions?: string[]
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
  /** API versions this relationship belongs to. Absent → version-agnostic. Unified schema only. */
  versions?: string[]
  /** Legacy schema only — replaced by `versions` in the unified shape. Drives deprecation when present. */
  deprecated?: boolean
}

type PublicResource = {
  id: string
  type: 'resources'
  attributes: {
    singleton: boolean
    addon: boolean
    hidden: boolean
    actions: Array<'list' | 'retrieve' | 'create' | 'update' | 'delete'>
    fields: Record<string, PublicField>
    relationships?: Record<string, PublicRelationship>
    examples?: Record<string, unknown>
    filter_scopes?: unknown[]
    filters?: Record<string, unknown>
    parent_resource?: string
    /**
     * API versions the resource lives in. Synonymous with `meta.api_versions`
     * (same array, always identical). The parser reads `meta.api_versions`
     * canonically. Unified schema only.
     */
    versions?: string[]
    /** Legacy schema only — replaced by `meta.api_versions` in the unified shape. */
    deprecated?: boolean
  }
  /** Unified schema only — absent in the legacy payload. */
  meta?: {
    api_versions?: string[]
  }
}

type PublicResourcesDoc = {
  data: PublicResource[]
  meta?: { record_count?: number; page_count?: number; version?: string }
}

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
  // The unversioned route returns the full catalogue regardless of API
  // version. `--api-version` no longer affects the URL — it selects the
  // target version for classification only.
  return `https://${host}/api/public/resources`
}

/**
 * Three-way classification of a versioned element against the build target:
 * - `include`: element is available at the target (or version-agnostic).
 * - `deprecated`: element exists only in versions older than the target.
 * - `exclude`: element is only in versions newer than the target (or has a
 *   version gap that skips the target). Calling it at runtime would 404.
 *
 * Version strings are in `YYYY-MM` format and compare lexicographically.
 */
type Classification = 'include' | 'deprecated' | 'exclude'

const classifyVersions = (versions: string[] | undefined, targetVersion: string): Classification => {
  if (!versions || versions.length === 0) return 'include'
  if (versions.includes(targetVersion)) return 'include'
  const allOlder = versions.every((v) => v < targetVersion)
  return allOlder ? 'deprecated' : 'exclude'
}

const maxVersion = (versions: string[]): string => versions.slice().sort().at(-1) as string
const minVersion = (versions: string[]): string => versions.slice().sort()[0] as string

/**
 * Returns the version in which a versioned element was introduced if that
 * version is later than the catalogue's oldest supported one (so callers see
 * "this was added in X"). Returns `undefined` when the element has been
 * present since the oldest version — no annotation needed.
 */
const deriveSince = (versions: string[] | undefined, oldestSupported: string): string | undefined => {
  if (!versions || versions.length === 0) return undefined
  const min = minVersion(versions)
  return min > oldestSupported ? min : undefined
}

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

  // The release tag is the right cache-bust key: a new release means the
  // catalogue may have changed even if the requested target version did not.
  const version = doc.meta?.version || opts.apiVersion || 'latest'
  console.log('Public resources schema downloaded: ' + version)

  return { remoteUrl: url, localPath: outPath, version }
}

const currentSchema = (): { info: { version: string } } | undefined => {
  try {
    const raw = readFileSync(RESOURCES_LOCAL_PATH, { encoding: 'utf-8' })
    const doc = JSON.parse(raw) as PublicResourcesDoc
    return { info: { version: doc.meta?.version || '0.0.0' } }
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

const buildAttribute = (
  resId: string,
  fieldName: string,
  field: PublicField,
  required: boolean,
  targetVersion: string,
  oldestSupported: string,
): Attribute | undefined => {
  const classification = classifyVersions(field.versions, targetVersion)
  if (classification === 'exclude') return undefined
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
    deprecated: classification === 'deprecated' ? true : undefined,
    deprecatedSince: classification === 'deprecated' ? maxVersion(field.versions as string[]) : undefined,
    since: classification === 'include' ? deriveSince(field.versions, oldestSupported) : undefined,
  }
}

const buildRelationship = (
  relName: string,
  rel: PublicRelationship,
  targetVersion: string,
  oldestSupported: string,
  parentCam?: string,
  excludedClassNames?: ReadonlySet<string>,
): Relationship | undefined => {
  // Classify the relationship's own version scope first; future-only
  // relationships drop out of the SDK surface entirely.
  const ownClassification = classifyVersions(rel.versions, targetVersion)
  if (ownClassification === 'exclude') return undefined

  const cardinality = rel.type === 'has_many' ? Cardinality.to_many : Cardinality.to_one
  const className = rel.class_name
  let polymorphic = rel.polymorphic === true && Array.isArray(rel.enum) && rel.enum.length > 0
  // For polymorphic relationships use the first enum entry as the canonical
  // `type` (used by the spec generator to pick a concrete relationship
  // import). Non-polymorphic relationships derive from class_name.
  let type =
    polymorphic && rel.enum && rel.enum.length > 0
      ? (rel.enum[0] as string)
      : Inflector.pluralize(Inflector.snakeCase(className))
  let oneOf = polymorphic && rel.enum ? rel.enum.map((e) => Inflector.camelize(Inflector.singularize(e))) : undefined
  // Drop polymorphic options that point to excluded resources (not present
  // in the catalogue for this target) — the renderer would otherwise emit
  // imports from non-existent files. Deprecated resources STAY in oneOf:
  // they're still generated (with @deprecated on the class) so their imports
  // resolve.
  if (oneOf && excludedClassNames && excludedClassNames.size > 0) {
    oneOf = oneOf.filter((n) => !excludedClassNames.has(n))
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

  // `deprecated` covers three signals:
  //   1. the relationship's own `versions` are legacy (unified shape)
  //   2. the relationship's `deprecated: true` boolean is set (legacy shape)
  //   3. the target resource doesn't exist in this build (`targetExcluded`)
  // `targetExcluded` is kept separate so the renderer can decide between
  // "proper-type-with-@deprecated" (target still exists, just marked
  // deprecated) and the `object[]` fallback (target's module isn't there).
  const targetExcluded = excludedClassNames?.has(Inflector.camelize(className)) === true
  const legacyDeprecated = rel.deprecated === true
  const deprecated = ownClassification === 'deprecated' || legacyDeprecated || targetExcluded
  const deprecatedSince = ownClassification === 'deprecated' ? maxVersion(rel.versions as string[]) : undefined
  const since = ownClassification === 'include' ? deriveSince(rel.versions, oldestSupported) : undefined

  return {
    name: relName,
    type,
    required: readRequired(rel.required),
    cardinality,
    deprecated,
    deprecatedSince,
    since,
    targetExcluded: targetExcluded || undefined,
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
  targetVersion: string,
  oldestSupported: string,
  excludedClassNames: ReadonlySet<string>,
): Component => {
  const rule = VARIANT_RULES[variant]
  const attributes: Record<string, Attribute> = {}
  const relationships: Record<string, Relationship> = {}

  for (const [name, field] of Object.entries(ctx.res.attributes.fields)) {
    if (name === 'id' || name === 'type') continue
    if (!rule.includeField(field)) continue
    const attr = buildAttribute(ctx.singular, name, field, rule.fieldRequired(field), targetVersion, oldestSupported)
    if (attr) attributes[name] = attr
  }

  for (const [name, rel] of Object.entries(ctx.res.attributes.relationships || {})) {
    if (!rule.includeRel(rel)) continue
    const built = buildRelationship(name, rel, targetVersion, oldestSupported, ctx.cam, excludedClassNames)
    if (!built) continue
    relationships[name] = {
      ...built,
      required: rule.relRequired(rel),
    }
  }

  return { attributes, relationships }
}

const buildOperations = (
  ctx: ResourceContext,
  targetVersion: string,
  oldestSupported: string,
  excludedClassNames: ReadonlySet<string>,
): Record<string, Operation> => {
  const { singular, plural, cam, idVar, singleton } = ctx
  const operations: Record<string, Operation> = {}

  const basePath = singleton ? `/${singular}` : `/${plural}`
  const idPath = singleton ? `/${singular}` : `/${plural}/{${idVar}}`
  // Even for singleton resources, OpenAPI exposes relationship sub-paths
  // under `/<singular>/{<singular>Id}/<rel>`. Match that.
  const relParentPath = singleton ? `/${singular}/{${idVar}}` : idPath
  const opId = singleton ? undefined : idVar

  // Singleton resources only declare a 'retrieve' action; the renderer's spec
  // template detects singletons via `op.name === 'list' && op.singleton`.
  // Normalise upfront.
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
    // Polymorphic relationships handle their union inline in the read model
    // and don't get a dedicated sub-path operation.
    if (rel.polymorphic === true) continue
    const relationship = buildRelationship(relName, rel, targetVersion, oldestSupported, undefined, excludedClassNames)
    // No relationship at all → own classification is `exclude`, skip.
    if (!relationship) continue
    // Target resource was excluded → there's no proper response type to
    // import, so no async method either. The TYPE field on the model still
    // exists (rendered as the `object[]` fallback).
    if (relationship.targetExcluded) continue
    // Deprecated relationships (own legacy versions, target still available)
    // keep the method — calling at the build's target may legitimately work
    // for callers transitioning between versions; the `@deprecated` JSDoc
    // signals the lifecycle. Same convention as fields and class-level
    // deprecation.
    operations[relName] = {
      path: `${relParentPath}/${relName}`,
      type: 'get',
      name: relName,
      singleton: false,
      id: idVar,
      responseType: Inflector.camelize(Inflector.singularize(relationship.type)),
      relationship,
      deprecated: relationship.deprecated || undefined,
      deprecatedSince: relationship.deprecatedSince,
      since: relationship.since,
    }
  }

  return operations
}

const parseSchema = (path: string, opts: GeneratorOptions = {}): ApiSchema => {
  console.log('Parsing public resources schema ...')

  const raw = readFileSync(path, { encoding: 'utf-8' })
  const doc = JSON.parse(raw) as PublicResourcesDoc

  // Shape detection. Unified payloads carry `meta.api_versions` on every
  // resource; legacy payloads (e.g. production today) don't have a per-resource
  // `meta` block at all. Lenient rule: any resource with the field flips us
  // into unified mode. In a hypothetical mixed payload, resources without
  // the field are treated as version-agnostic (always included).
  const isUnified = doc.data.some((r) => r.meta?.api_versions != null)
  console.log(`Schema shape: ${isUnified ? 'unified' : 'legacy'}`)
  if (doc.meta?.version) console.log(`Schema release: ${doc.meta.version}`)

  if (!isUnified && opts.apiVersion) {
    throw new Error(
      `--api-version=${opts.apiVersion} was provided but the schema doesn't include version metadata. ` +
        `Either omit the flag or point at a host returning the unified schema (e.g. core.stg1.commercelayer.co).`,
    )
  }

  // Union of every resource's api_versions, sorted; first/last entries
  // are the oldest/newest API versions the catalogue knows about. Empty
  // when the payload is legacy.
  const supportedVersions: readonly string[] = isUnified
    ? Array.from(new Set(doc.data.flatMap((r) => r.meta?.api_versions ?? []))).sort()
    : []

  let targetVersion: string
  let oldestSupported: string
  if (isUnified) {
    const latestVersion = supportedVersions[supportedVersions.length - 1] as string
    oldestSupported = supportedVersions[0] as string
    targetVersion = opts.apiVersion ?? latestVersion
    if (!supportedVersions.includes(targetVersion)) {
      throw new Error(
        `--api-version=${targetVersion} is not in the supported set [${supportedVersions.join(', ')}]. Check for typos.`,
      )
    }
    console.log(`Target API version: ${targetVersion} (latest: ${latestVersion}, oldest: ${oldestSupported})`)
  } else {
    // Legacy payloads carry no version metadata — pin to the literal
    // 'latest', preserving pre-Phase-4 production behaviour. No `@since`
    // annotations are emitted in this mode.
    targetVersion = 'latest'
    oldestSupported = ''
  }

  // Classify each resource. In unified mode classification is version-driven;
  // in legacy mode it falls back to the boolean `attributes.deprecated`.
  // Either way, "deprecated" resources stay in the SDK with an @deprecated
  // marker so callers keep getting type imports.
  const resourceClassifications = new Map<string, Classification>()
  for (const res of doc.data) {
    const versioned = classifyVersions(res.meta?.api_versions, targetVersion)
    if (versioned === 'deprecated' || versioned === 'exclude') {
      resourceClassifications.set(res.id, versioned)
    } else if (res.attributes.deprecated === true) {
      resourceClassifications.set(res.id, 'deprecated')
    } else {
      resourceClassifications.set(res.id, 'include')
    }
  }
  // Camelized class names of resources excluded for this target — drop any
  // polymorphic `oneOf` reference pointing at them since their files don't
  // exist in the generated output. Always empty in legacy mode.
  const excludedClassNames: ReadonlySet<string> = new Set(
    doc.data.filter((r) => resourceClassifications.get(r.id) === 'exclude').map((r) => Inflector.camelize(r.id)),
  )

  const resources: Record<string, Resource> = {}
  const components: ComponentMap = {}

  for (const res of doc.data) {
    const classification = resourceClassifications.get(res.id) as Classification
    if (classification === 'exclude') continue

    const ctx = resourceContext(res)
    const { plural, cam } = ctx

    const operations = buildOperations(ctx, targetVersion, oldestSupported, excludedClassNames)
    const readComp = buildComponent(ctx, 'read', targetVersion, oldestSupported, excludedClassNames)

    const resComponents: ComponentMap = { [cam]: readComp }
    if (operations.create)
      resComponents[`${cam}Create`] = buildComponent(ctx, 'create', targetVersion, oldestSupported, excludedClassNames)
    if (operations.update)
      resComponents[`${cam}Update`] = buildComponent(ctx, 'update', targetVersion, oldestSupported, excludedClassNames)

    const apiVersions = res.meta?.api_versions
    resources[plural] = {
      components: sortObjectFields(resComponents),
      operations,
      deprecated: classification === 'deprecated' ? true : undefined,
      // Only attach "Last available in API version X" when we actually know
      // the version (unified shape); legacy payloads carry no such info.
      deprecatedSince:
        classification === 'deprecated' && apiVersions && apiVersions.length > 0 ? maxVersion(apiVersions) : undefined,
      since: classification === 'include' ? deriveSince(apiVersions, oldestSupported) : undefined,
    }

    components[cam] = readComp
  }

  console.log('Public resources schema correctly parsed.')

  return { version: targetVersion, resources, components }
}

export default {
  download: downloadResources,
  parse: parseSchema,
  current: currentSchema,
  localPath: RESOURCES_LOCAL_PATH,
  remoteUrl: remoteUrlFor({}),
}

export {
  type ApiSchema,
  type Attribute,
  Cardinality,
  type Component,
  type ComponentMap,
  type Operation,
  type Relationship,
  type Resource,
}
