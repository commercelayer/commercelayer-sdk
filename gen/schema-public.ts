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
// Empty default → unversioned production endpoint (`/api/public/resources`).
// Set a YYYY-MM string (e.g. via `--api-version=2026-05`) to target a specific
// dated schema (typically against the staging host).
const DEFAULT_API_VERSION = ''


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
	const version = opts.apiVersion ?? DEFAULT_API_VERSION
	const versionSegment = version ? `${version}/` : ''
	return `https://${host}/api/public/${versionSegment}resources`
}


const versionLabel = (opts: GeneratorOptions): string => opts.apiVersion || 'latest'


const downloadResources = async (opts: GeneratorOptions = {}): Promise<SchemaInfo> => {

	const url = remoteUrlFor(opts)
	const outPath = RESOURCES_LOCAL_PATH

	console.log(`Downloading public resources schema ... [${url}]`)

	const response = await fetch(url)
	if (!response.ok) throw new Error(`Error downloading public resources schema (${response.status})`)
	const doc = await response.json() as PublicResourcesDoc

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
		case 'integer': return 'integer'
		case 'float': return 'number'
		case 'string': return 'string'
		case 'boolean': return 'boolean'
		case 'object': return 'object'
		case 'array': {
			const key = `${resId}.${fieldName}`
			const itemType = ARRAY_ITEM_TYPES[key]
			if (!itemType) {
				console.log(`Warning: unknown array item type for ${key}, defaulting to object`)
				return 'object[]'
			}
			return `${itemType}[]`
		}
		default: return 'string'
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
): Attribute => {
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
	let type = polymorphic && rel.enum && rel.enum.length > 0
		? rel.enum[0] as string
		: Inflector.pluralize(Inflector.snakeCase(className))
	let oneOf = polymorphic && rel.enum
		? rel.enum.map(e => Inflector.camelize(Inflector.singularize(e)))
		: undefined
	// Drop polymorphic options that point to deprecated resources — the
	// renderer would otherwise emit imports from non-existent files.
	if (oneOf && deprecatedClassNames && deprecatedClassNames.size > 0) {
		oneOf = oneOf.filter(n => !deprecatedClassNames.has(n))
	}
	// STI: drop self-reference from oneOf — the template already declares
	// `<Self>Rel = ResourceRel & { type: <Self>Type }`, so re-emitting it here
	// causes a duplicate declaration. If the filter collapses oneOf to empty,
	// the relationship is effectively a self-only union — collapse the abstract
	// class_name down to the concrete parent type.
	if (oneOf && parentCam) {
		const filtered = oneOf.filter(n => n !== parentCam)
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


const buildComponent = (
	res: PublicResource,
	variant: ComponentVariant,
	parentCam: string,
	deprecatedClassNames: ReadonlySet<string>,
): Component => {

	const attributes: Record<string, Attribute> = {}
	const relationships: Record<string, Relationship> = {}

	const fields = res.attributes.fields
	const rels = res.attributes.relationships || {}

	for (const [name, field] of Object.entries(fields)) {

		if (name === 'id' || name === 'type') continue

		let include = false
		let required = false
		switch (variant) {
			case 'read':
				include = field.fetchable === true
				// aasm state-machine fields are always populated in responses
				// (OpenAPI marks them nullable:false; the read rule promotes
				// `fetchable && !nullable` to required).
				required = readRequired(field.required) || field.aasm === true
				break
			case 'create':
				include = field.creatable === true
				required = readRequired(field.required)
				break
			case 'update':
				include = field.updatable === true
				required = false
				break
		}

		if (include) attributes[name] = buildAttribute(res.id, name, field, required)

	}

	for (const [name, rel] of Object.entries(rels)) {

		let include = false
		switch (variant) {
			case 'read':
				include = true
				break
			case 'create':
				include = rel.creatable === true
				break
			case 'update':
				include = rel.updatable === true
				break
		}

		if (include) {
			const built = buildRelationship(name, rel, parentCam, deprecatedClassNames)
			// OpenAPI's read schema lists no required relationships — match that.
			// Update is partial, so also force optional.
			if (variant === 'read' || variant === 'update') built.required = false
			relationships[name] = built
		}

	}

	return { attributes, relationships }

}


const buildOperations = (res: PublicResource): Record<string, Operation> => {

	const operations: Record<string, Operation> = {}

	const singular = res.id
	const plural = Inflector.pluralize(singular)
	const cam = Inflector.camelize(singular)
	const idVar = `${singular}Id`
	const singleton = res.attributes.singleton === true

	const basePath = singleton ? `/${singular}` : `/${plural}`
	const idPath = singleton ? `/${singular}` : `/${plural}/{${idVar}}`
	// Even for singleton resources, OpenAPI exposes relationship sub-paths
	// under `/<singular>/{<singular>Id}/<rel>`. Match that.
	const relParentPath = singleton ? `/${singular}/{${idVar}}` : idPath

	for (const action of res.attributes.actions) {
		switch (action) {
			case 'list':
				operations.list = {
					path: basePath,
					type: 'get',
					name: singleton ? 'list' : 'list',
					singleton,
					responseType: cam,
				}
				break
			case 'retrieve':
				// For singletons OpenAPI's path-based parser names this 'list'
				// (no id segment → list), and the renderer's spec template
				// detects singleton via `name === 'list' && singleton`. Match that.
				if (singleton) {
					operations.list = {
						path: basePath,
						type: 'get',
						name: 'list',
						singleton: true,
						responseType: cam,
					}
				} else {
					operations.retrieve = {
						path: idPath,
						type: 'get',
						name: 'retrieve',
						singleton: false,
						id: idVar,
						responseType: cam,
					}
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
					id: singleton ? undefined : idVar,
					requestType: `${cam}Update`,
					responseType: cam,
				}
				break
			case 'delete':
				operations.delete = {
					path: idPath,
					type: 'delete',
					name: 'delete',
					singleton,
					id: singleton ? undefined : idVar,
				}
				break
		}
	}

	const rels = res.attributes.relationships || {}
	for (const [relName, rel] of Object.entries(rels)) {
		// Polymorphic relationships don't expose a dedicated sub-path; the renderer
		// handles them inline via oneOf on the read model.
		if (rel.polymorphic === true) continue
		// Deprecated relationships are rendered inline as `object[]` with a
		// @deprecated JSDoc and don't expose a sub-path operation.
		if (rel.deprecated === true) continue
		const relationship = buildRelationship(relName, rel)
		const responseType = Inflector.camelize(Inflector.singularize(relationship.type))
		operations[relName] = {
			path: `${relParentPath}/${relName}`,
			type: 'get',
			name: relName,
			singleton: false,
			id: idVar,
			responseType,
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
		doc.data
			.filter(r => r.attributes.deprecated === true)
			.map(r => Inflector.camelize(r.id))
	)

	for (const res of doc.data) {

		// Deprecated resources are kept out of the generated SDK surface;
		// references to them via relationships are still emitted but marked
		// @deprecated and typed as `object` by the renderer.
		if (res.attributes.deprecated === true) continue

		const plural = Inflector.pluralize(res.id)
		const cam = Inflector.camelize(res.id)
		const singleton = res.attributes.singleton === true

		const readComp = buildComponent(res, 'read', cam, deprecatedClassNames)
		const createComp = buildComponent(res, 'create', cam, deprecatedClassNames)
		const updateComp = buildComponent(res, 'update', cam, deprecatedClassNames)

		const resComponents: ComponentMap = {}
		resComponents[cam] = readComp
		if (!singleton && res.attributes.actions.includes('create')) resComponents[`${cam}Create`] = createComp
		if (!singleton && res.attributes.actions.includes('update')) resComponents[`${cam}Update`] = updateComp

		const operations = buildOperations(res)

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
