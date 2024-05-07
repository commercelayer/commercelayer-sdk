import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { sortObjectFields } from '../src/util'
import Inflector from './inflector'


const SCHEMA_LOCAL_PATH = resolve('./gen/openapi.json')
const SCHEMA_NAME = 'openapi.json'
const SCHEMA_REMOTE_URL = 'https://data.commercelayer.app/schemas/' + SCHEMA_NAME


type SchemaInfo = {
	remoteUrl?: string;
	localPath?: string;
	version?: string;
}


const downloadSchema = async (url?: string): Promise<SchemaInfo> => {

	const schemaUrl = url || SCHEMA_REMOTE_URL
	const schemaOutPath = SCHEMA_LOCAL_PATH

	console.log(`Downloading OpenAPI schema ... [${schemaUrl}]`)

	const response = await fetch(schemaUrl)
	const schema = await response.json()

	if (schema) writeFileSync(schemaOutPath, JSON.stringify(schema, null, 4))
	else console.log('OpenAPI schema is empty!')

	const version = schema.info.version

	console.log('OpenAPI schema downloaded: ' + version)

	return {
		remoteUrl: schemaUrl,
		localPath: schemaOutPath,
		version,
	}

}


const currentSchema = (): any => {

	const currentSchema = readFileSync(SCHEMA_LOCAL_PATH, { encoding: 'utf-8' })
	const schema = JSON.parse(currentSchema)

	return schema

}


const parseSchema = (path: string): ApiSchema => {

	console.log('Parsing OpenAPI schema ...')

	const apiSchema: any = {}

	const schemaFile = path
	const openApi = readFileSync(schemaFile, { encoding: 'utf-8' }) as any

	const schema = JSON.parse(openApi)

	apiSchema.version = schema.info?.version
	console.log(`Schema version: ${apiSchema.version}`)

	apiSchema.paths = parsePaths(schema.paths)
	apiSchema.components = parseComponents(schema.components.schemas)

	const resources: ResourceMap = {}
	const components: ComponentMap = {}

	const specialComponentMatcher = /(Create|Update|ResponseList|ResponseCreated|ResponseUpdated|Response)$/

	Object.keys(apiSchema.paths).forEach(p => {
		const singRes = Inflector.singularize(p)	// singularized resource name in snake case format
		resources[p] = {
			operations: apiSchema.paths[p],
			components: {}
		}
		Object.keys(apiSchema.components).forEach(c => {
			if (!specialComponentMatcher.test(c)) components[c] = apiSchema.components[c]
			else
				if (Inflector.snakeCase(c.replace(specialComponentMatcher, '')) === singRes) resources[p].components[c] = apiSchema.components[c]
		})
		// Sort components
		resources[p].components = sortObjectFields(resources[p].components)
	})

	console.log('OpenAPI schema correctly parsed.')


	return { version: apiSchema.version, resources, components }

}


const operationName = (op: string, id?: string, relationship?: string): string => {
	switch (op) {
		case 'get': return id ? (relationship || 'retrieve') : 'list'
		case 'patch': return 'update'
		case 'delete': return 'delete'
		case 'post': return 'create'
		default: return op
	}
}


const referenceResource = (ref: { '$ref': string }): string => {
	const r = getReference(ref) as string
	return Inflector.camelize(r.substring(r.lastIndexOf('/') + 1))
}


const referenceContent = (content: any): string => {
	return referenceResource(content["application/vnd.api+json"].schema)
}


const parsePaths = (schemaPaths: any[]): PathMap => {

	const paths: PathMap = {}

	for (const p of Object.entries(schemaPaths)) {

		const [pKey, pValue] = p
		const relIdx = pKey.indexOf('}/') + 2
		const relationship = (relIdx > 1) ? pKey.substring(relIdx) : undefined

		const id = pKey.substring(pKey.indexOf('{') + 1, pKey.indexOf('}'))
		const path = pKey.replace(/\/{.*}/g, '').substring(1)
		const slIdx = path.lastIndexOf('/')
		const res = (slIdx === -1) ? path : path.substring(0, slIdx)

		const operations: OperationMap = paths[res] || {}

		Object.entries(pValue as object).forEach(o => {

			let skip = false

			const [oKey, oValue] = o

			const singleton = oValue.tags.includes('singleton')

			const op: Operation = {
				path: pKey,
				type: oKey,
				name: operationName(oKey, id, relationship),
				singleton,
			}

			if (id) op.id = id
			if (oValue.requestBody) op.requestType = referenceContent(oValue.requestBody.content)
			if (oValue.responses) {
				if (oValue.responses['200']?.content) op.responseType = referenceContent(oValue.responses['200'].content)
				else
				if (oValue.responses['201']?.content) op.responseType = referenceContent(oValue.responses['201'].content)
			}


			if (relationship) {

				const tags = oValue.tags as string[]
				const relCard = tags.find(t => t.startsWith('has_')) as string
				if (!relCard) console.log(`Relationship without cardinality: ${op.name} [${op.path}]`)
				const relType = tags.find(t => !t.startsWith('has_')) as string
				if (!relType) console.log(`Relationship without type: ${op.name} [${op.path}]`)
				if (!relCard || !relType) skip = true

				if (!skip) {
					op.relationship = {
						name: relationship || '',
						type: relType,
						polymorphic: false,
						cardinality: (relCard === 'has_many') ? Cardinality.to_many : Cardinality.to_one,
						required: false,
						deprecated: false
					}
					op.responseType = Inflector.camelize(Inflector.singularize(op.relationship.type))
				}
			}


			if (skip) console.log(`Operation skipped: ${op.name} [${op.path}]`)
			else operations[op.name] = op

		})

		paths[res] = operations

	}


	return paths

}


const getReference = (obj: any): string | undefined => {
	if (obj) return obj['$ref']
	return undefined
}


const resolveReference = (schemaComponents: any[], ref: string): any => {

	const segs = ref.replace('#/components/schemas/', '').split('/')
	const key = Inflector.camelize(segs.shift() as string, true)

	let reference: any = schemaComponents[key]
	segs.forEach(s => reference = reference[s])

	return reference

}


const parseComponents = (schemaComponents: any[]): ComponentMap => {

	const components: ComponentMap = {}

	for (const c of Object.entries(schemaComponents)) {

		const [cKey, cValue] = c

		// Check component reference
		let cmp = (cValue.properties.data.type === 'array') ? cValue.properties.data.items : cValue.properties.data
		const cmpRef = getReference(cmp)
		if (cmpRef) cmp = resolveReference(schemaComponents, cmpRef)

		// Check attributes reference
		const attributesRef = getReference(cmp.properties.attributes)
		const cmpAttributes = attributesRef ? resolveReference(schemaComponents, attributesRef) : cmp.properties.attributes
		const cmpRelationships = cmp.properties.relationships

		const attributes: { [key: string]: Attribute } = {}
		const requiredAttributes: string[] = cmpAttributes.required || []
		const relationships: { [key: string]: Relationship } = {}
		const requiredRelationships: string[] = cmpRelationships.required || []

		// Attributes
		Object.entries(cmpAttributes.properties as object).forEach(a => {
			const [aKey, aValue] = a
			const fetchable = (aValue.nullable !== undefined) || aValue.readOnly
			attributes[aKey] = {
				name: aKey,
				type: (aValue.type === 'array') ? `${aValue.items.type}[]` : aValue.type,
				required: requiredAttributes.includes(aKey) || (fetchable && !aValue.nullable && !cKey.match(/(Create|Update)$/)),
				fetchable,
				enum: aValue.enum,
				description: aValue.description,
				example: aValue.example
			}
		})

		// Relationships
		if (cmpRelationships) {
			Object.entries(cmpRelationships.properties as object).forEach(r => {
				const [rKey, rValue] = r
				const dataObj = rValue.properties.data ? rValue.properties.data : rValue
				const typeObj = dataObj.items ? dataObj.items.properties : dataObj.properties
				const type = typeObj.type.enum[0] // typeObj.type.default || typeObj.type.example
				let oneOf = rValue.oneOf
				if (oneOf) oneOf = oneOf.map(referenceResource)
				relationships[rKey] = {
					name: rKey,
					type,
					required: requiredRelationships.includes(rKey),
					cardinality: (Inflector.pluralize(rKey) === rKey) ? Cardinality.to_many : Cardinality.to_one,
					deprecated: rValue.deprecated,
					oneOf,
					polymorphic: (oneOf !== undefined) && oneOf.length
				}
			})
		}

		components[Inflector.camelize(cKey)] = {
			attributes,
			relationships
		}

	}


	return components

}


type ApiSchema = {
	version: string,
	resources: ResourceMap,
	components: ComponentMap
}


type Resource = {
	components: ComponentMap
	operations: OperationMap
}

type ResourceMap = {
	[resource: string]: Resource
}

type Component = {
	attributes: { [key: string]: Attribute },
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
}

enum Cardinality {
	to_one = 'to_one',
	to_many = 'to_many'
}

type Relationship = {
	type: string
	name: string
	required: boolean
	cardinality: Cardinality
	deprecated: boolean
	oneOf?: Array<string>
	polymorphic: boolean
}

type PathMap = { [key: string]: OperationMap }

type OperationMap = { [key: string]: Operation }

type Operation = {
	path: string
	type: string
	id?: string
	name: string
	requestType?: any
	responseType?: any
	singleton: boolean
	relationship?: Relationship
	trigger?: boolean
}



export default {
	download: downloadSchema,
	parse: parseSchema,
	current: currentSchema,
	localPath: SCHEMA_LOCAL_PATH,
	remoteUrl: SCHEMA_REMOTE_URL
}

export { Resource, Operation, Component, ComponentMap, Cardinality, Relationship, ApiSchema, Attribute }