/* eslint-disable no-console */
import { ApiSchema } from './schema'
import { sortObjectFields } from '../src/util'



const fixRedundantComponents = (schema: ApiSchema): ApiSchema => {

	Object.values(schema.resources).forEach(res => {

		// Remove redundant components and replace them with global resource component
		Object.values(res.operations).forEach(op => {
			if (op.responseType && (/(ResponseList|Response)$/.test(op.responseType))) {
				const rt = op.responseType.replace(/ResponseList|Response/g, '')
				if (res.components[op.responseType]) delete res.components[op.responseType]
				if (!res.components[rt]) res.components[rt] = schema.components[rt]
				op.responseType = rt
			}
		})

		// Remove potential redundant operation components
		Object.keys(res.components).forEach(key => {
			if (/(ResponseList|Response)$/.test(key)) delete res.components[key]
		})

		// Sort components
		res.components = sortObjectFields(res.components)

	})
	
	console.log('Redundant components have been replaced')

	return schema

}


const fixSchema = (schema: ApiSchema): ApiSchema => {
	console.log('Fixing parsed schema...')
	const fixedSchema = fixRedundantComponents(schema)
	console.log('Schema fixed.')
	return fixedSchema
}


export default fixSchema