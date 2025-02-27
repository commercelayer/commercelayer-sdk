/* eslint-disable no-console */
import { ApiSchema } from './schema'
import resSchema from './resources.js'
import { sortObjectFields } from '../src/util'
import Inflector from './inflector.js'
import { CONFIG } from './generator.js'



const fixRedundantComponents = (schema: ApiSchema): ApiSchema => {

	const fixResMatcher = /(ResponseList|ResponseCreated|ResponseUpdated|Response)$/

	Object.values(schema.resources).forEach(res => {

		// Remove redundant components and replace them with global resource component
		Object.values(res.operations).forEach(op => {
			if (op.responseType && (fixResMatcher.test(op.responseType))) {
				const rt = op.responseType.replace(fixResMatcher, '')
				if (res.components[op.responseType]) delete res.components[op.responseType]
				if (!res.components[rt]) res.components[rt] = schema.components[rt]
				op.responseType = rt
			}
		})

		// Remove potential redundant operation components
		Object.keys(res.components).forEach(key => {
			if (fixResMatcher.test(key)) delete res.components[key]
		})

		// Sort components
		res.components = sortObjectFields(res.components)

	})

	console.log('Redundant components have been replaced')

	return schema

}


const enrichSchema = async (schema: ApiSchema): Promise<ApiSchema> => {

	const resourcesInfo = CONFIG.LOCAL? resSchema.load() : await resSchema.download()

	if (!resourcesInfo) {
		console.log('Error reading reasources data')
		process.exit()
	}

	Object.entries(schema.components).forEach(([key, val]) => {
		const resId = Inflector.snakeCase(key)
		const resFields = resSchema.getResourceFields(resourcesInfo, resId)
		if (resFields) Object.entries(val.attributes).forEach(([name, info]) => {
			const field = resFields[name]
			if (!field) console.log(`Warning, field not found in resources data: ${resId}.${name}`)
			info.sortable = field?.sortable || false
			info.filterable = field?.filterable || false
		})
	})


	Object.values(schema.resources).forEach(r => {
		Object.entries(r.components).forEach(([key, val]) => {
			const resId = Inflector.snakeCase(key)
			const resFields = resSchema.getResourceFields(resourcesInfo, resId)
			if (resFields) Object.entries(val.attributes).forEach(([name, info]) => {
				const field = resFields[name]
				if (!field) console.log(`Warning, field not found in resources data: ${resId}.${name}`)
				info.sortable = field?.sortable || false
				info.filterable = field?.filterable || false
			})
		})
	})


	console.log('Api schema has been enriched with resources data')

	return schema

}


const fixResourcesType = (schema: ApiSchema): ApiSchema => {

	const resources = {}

	for (const key in schema.resources) {
		const type = Inflector.pluralize(key)
		if (type === key) resources[key] = schema.resources[key]
		else resources[type] = schema.resources[key]
	}

	schema.resources = resources

	return schema

}


export const fixSchema = async (schema: ApiSchema): Promise<ApiSchema> => {

	console.log('Fixing parsed schema...')

	let fixedSchema = schema
	fixedSchema = fixRedundantComponents(fixedSchema)
	fixedSchema = await enrichSchema(fixedSchema)
	fixedSchema = fixResourcesType(fixedSchema)

	console.log('Schema fixed.')

	return fixedSchema

}


export const fixReservedWord = (word: string): string => {
	switch (word) {
		case 'exports': return 'exportz'
		case 'export': return 'eXport'
		default: return word
	}
}



export default {
	fixSchema
}
