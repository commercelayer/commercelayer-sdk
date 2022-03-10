/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { readFileSync, writeFileSync } from 'fs'
import { snakeCase } from 'lodash'
import axios from 'axios'
import { resolve } from 'path'


// eslint-disable-next-line @typescript-eslint/no-var-requires
const Inflector = require('inflector-js')


const SCHEMA_LOCAL_PATH = resolve('./gen/openapi.json')
const SCHEMA_REMOTE_URL = 'https://data.commercelayer.app/schemas/openapi.json'


type SchemaInfo = {
	remoteUrl?: string;
	localPath?: string;
	version?: string;
}


const downloadSchema = async (url?: string): Promise<SchemaInfo> => {

	const schemaUrl = url || SCHEMA_REMOTE_URL
	const schemaOutPath = SCHEMA_LOCAL_PATH

	console.log(`Downloading OpenAPI schema ... [${schemaUrl}]`)

	const response = await axios.get(schemaUrl)
	const schema = await response.data

	if (schema) writeFileSync(schemaOutPath, JSON.stringify(schema, null, 4))
	else console.log ('OpenAPI schema is empty!')

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


const parseSchema = (path: string): { version: string, resources: ResourceMap, components: ComponentMap } => {

	console.log('Parsing OpenAPI schema ...')

	const apiSchema: any = {}

	const schemaFile = path
	const openApi = readFileSync(schemaFile, { encoding: 'utf-8' }) as any

	const schema = JSON.parse(openApi)

	apiSchema.version = schema.info?.version

	apiSchema.paths = parsePaths(schema.paths)
	apiSchema.components = parseComponents(schema.components.schemas)

	const resources: ResourceMap = {}
	const components: ComponentMap = {}

	Object.keys(apiSchema.paths).forEach(p => {
		resources[p] = {
			operations: apiSchema.paths[p],
			components: {}
		}
		Object.keys(apiSchema.components).forEach(c => {
			const resName = snakeCase(c.replace('Update', '').replace('Create', ''))
			if (!c.endsWith('Update') && !c.endsWith('Create')) components[c] = apiSchema.components[c]
			if (resName === Inflector.singularize(p)) resources[p].components[c] = apiSchema.components[c]
		})
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
	const r = ref['$ref']
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
		const res = (slIdx === -1) ? path :  path.substring(0, slIdx)
		
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
			if (oValue.requestBody) {
				// const reqType = oValue.requestBody.content["application/vnd.api+json"].schema['$ref']
				// op.requestType = referenceResource(reqType)
				op.requestType = referenceContent(oValue.requestBody.content)
			}
			if (oValue.responses['200']?.content) {
				// const resType = oValue.responses['200'].content["application/vnd.api+json"].schema['$ref']
				// op.responseType = referenceResource(resType)
				op.responseType = referenceContent(oValue.responses['200'].content)
			}


			if (relationship) {

				const relCard = oValue.tags[0] as string
				if (!relCard) console.log(`Relationship without cardinality: ${op.name} [${op.path}]`)
				const relType = oValue.tags[1] as string
				if (!relType) console.log(`Relationship without type: ${op.name} [${op.path}]`)
				if (!relCard || ! relType) skip = true

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


const parseComponents = (schemaComponents: any[]): ComponentMap => {

	const components: ComponentMap = {}

	for (const c of Object.entries(schemaComponents)) {

		const [cKey, cValue] = c

		const attributes: { [key: string]: Attribute } = {}
		const requiredAttributes: string[] = cValue.properties.data.properties.attributes.required || []
		const relationships: { [key: string]: Relationship } = {}
		const requiredRelationships: string[] = cValue.properties.data.properties.relationships.required || []

		Object.entries(cValue.properties.data.properties.attributes.properties as object).forEach(a => {
			const [aKey, aValue] = a
			const type = (aValue.type === 'array') ? `${aValue.items.type}[]` : aValue.type
			attributes[aKey] = {
				name: aKey,
				type,
				required: requiredAttributes.includes(aKey)
			}
		})

		if (cValue.properties.data.properties.relationships) {
			Object.entries(cValue.properties.data.properties.relationships.properties as object).forEach(r => {
				const [rKey, rValue] = r
				const type = rValue.properties.type.default || rValue.properties.type.example
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
}



export default {
	download: downloadSchema,
	parse: parseSchema,
	current: currentSchema,
	localPath: SCHEMA_LOCAL_PATH,
	remoteUrl: SCHEMA_REMOTE_URL,
}

export { Resource, Operation, Component, ComponentMap, Cardinality, Relationship }