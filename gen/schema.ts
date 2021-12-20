/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import fs from 'fs'
import _ from 'lodash'
import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Inflector = require('inflector-js')



const downloadSchema = async (url?: string): Promise<string> => {

	const schemaUrl = url || 'https://data.commercelayer.app/schemas/openapi.json'
	const schemaOutPath = './gen/openapi.json'

	console.log('Downloading OpenAPI schema ...')

	const response = await axios.get(schemaUrl)
	const schema = await response.data

	if (schema) fs.writeFileSync(schemaOutPath, JSON.stringify(schema, null, 4))
	else console.log ('OpenAPI schema is empty!')

	console.log('OpenAPI schema downloaded.')

	return schemaOutPath

}


const parseSchema = (path: string): { version: string, resources: ResourceMap, components: ComponentMap } => {

	console.log('Parsing OpenAPI schema ...')

	const apiSchema: any = {}

	const schemaFile = path
	const openApi = fs.readFileSync(schemaFile, { encoding: 'utf-8' }) as any

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
			const resName = _.snakeCase(c.replace('Update', '').replace('Create', ''))
			if (!c.endsWith('Update') && !c.endsWith('Create')) components[c] = apiSchema.components[c]
			if (resName === Inflector.singularize(p)) resources[p].components[c] = apiSchema.components[c]
		})
	})

	console.log('OpenAPI schema correctly parsed.')


	return { version: apiSchema.version, resources, components }

}


const basicOperationName = (op: string, id?: string): string => {
	switch (op) {
		case 'get': return id ? 'retrieve' : 'list'
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
		if (pKey.indexOf('}/') > -1) continue

		const id = pKey.substring(pKey.indexOf('{') + 1, pKey.indexOf('}'))
		const path = pKey.replace(/\/{.*}/g, '')
		const res = path.substr(1)

		const operations: OperationMap = paths[res] || {}

		Object.entries(pValue as object).forEach(o => {

			const [oKey, oValue] = o

			const singleton = oValue.tags.includes('singleton')

			const op: Operation = {
				path: pKey,
				type: oKey,
				name: basicOperationName(oKey, id),
				singleton
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

			operations[op.name] = op

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
	responseType?: any,
	singleton: boolean
}



export default {
	download: downloadSchema,
	parse: parseSchema,
}

export { Resource, Operation, Component, ComponentMap, Cardinality, Relationship }