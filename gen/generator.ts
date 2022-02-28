/* eslint-disable no-console */

import apiSchema, { Resource, Operation, Component, Cardinality } from './schema'
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'fs'
import { basename } from 'path'
import { capitalize, snakeCase } from 'lodash'
import { inspect } from 'util'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Inflector = require('inflector-js')



type ApiRes = {
	type: string;
	apiClass: string;
	models: Array<String>;
}


const templates: { [key: string]: string } = {}

const global: {
	version?: string
} = {}



const loadTemplates = (): void => {
	const tplDir = './gen/templates'
	const tplList = readdirSync(tplDir, { encoding: 'utf-8' }).filter(f => f.endsWith('.tpl'))
	tplList.forEach(t => {
		const tplName = basename(t).replace('.tpl', '')
		const tpl = readFileSync(`${tplDir}/${tplName}.tpl`, { encoding: 'utf-8' })
		templates[tplName] = tpl
	})
}


const generate = async (localSchema?: boolean) => {

	console.log('>> Local schema: ' + (localSchema || false) + '\n')

	const schemaPath = localSchema ? 'gen/openapi.json' : await apiSchema.download()
	if (!existsSync(schemaPath)) {
		console.log('Cannot find schema file: ' + schemaPath)
		return
	}

	console.log('Generating SDK resources from schema ' + schemaPath)

	const schema = apiSchema.parse(schemaPath)
	global.version = schema.version

	loadTemplates()

	// Initialize source dir
	const resDir = 'src/resources'
	if (existsSync(resDir)) rmSync(resDir, { recursive: true })
	mkdirSync(resDir, { recursive: true })

	// Initialize test dir
	const testDir = 'specs/resources'
	if (existsSync(testDir)) rmSync(testDir, { recursive: true })
	mkdirSync(testDir, { recursive: true })


	const resources: { [key: string]: ApiRes } = {}

	Object.entries(schema.resources).forEach(([type, res]) => {

		const name = Inflector.pluralize(Inflector.camelize(type)) as string

		const tplRes = generateResource(type, name, res)
		writeFileSync(`${resDir}/${type}.ts`, tplRes)
		console.log('Generated resource ' + name)

		const tplSpec = generateSpec(type, name, res)
		writeFileSync(`${testDir}/${type}.spec.ts`, tplSpec)
		console.log('Generated spec ' + name)

		resources[type] = {
			type,
			apiClass: name,
			models: Object.keys(res.components)
		}

	})

	updateApiResources(resources)
	updateSdkInterfaces(resources)
	updateModelTypes(resources)

	console.log('SDK generation completed.\n')

}


const findLine = (str: string, lines: string[]): { text: string, index: number, offset: number } => {
	let idx = 0
	for (const l of lines) {
		const i = l.indexOf(str)
		if (i > -1) return { text: l, index: idx, offset: i }
		else idx++
	}
	return { text: '', index: -1, offset: -1 }
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tabsCount = (template: string): number => {
	return template.match(/##__TAB__##/g)?.length || 0
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tabsString = (num: number): string => {
	let str = ''
	for (let i = 0; i < num; i++) str += '\t'
	return str
}


const updateSdkInterfaces = (resources: { [key: string]: ApiRes }): void => {

	const cl = readFileSync('src/commercelayer.ts', { encoding: 'utf-8' })

	const lines = cl.split('\n')

	// OpenAPI schema version
	if (global.version) {
		const schemaLine = findLine('const OPEN_API_SCHEMA_VERSION', lines)
		if (schemaLine.index >= 0) lines[schemaLine.index] = `const OPEN_API_SCHEMA_VERSION = '${global.version}'`
	}

	// Definitions
	const defTplLine = findLine('##__CL_RESOURCES_DEF_TEMPLATE::', lines)
	const defTplIdx = defTplLine.offset + '##__CL_RESOURCES_DEF_TEMPLATE::'.length + 1
	const defTpl = defTplLine.text.substring(defTplIdx)

	const definitions: string[] = []
	Object.entries(resources).forEach(([type, res]) => {
		let def = defTpl
		def = def.replace(/##__TAB__##/g, '\t')
		def = def.replace('##__RESOURCE_TYPE__##', type)
		def = def.replace('##__RESOURCE_CLASS__##', res.apiClass)
		definitions.push(def)
	})

	const defStartIdx = findLine('##__CL_RESOURCES_DEF_START__##', lines).index + 2
	const defStopIdx = findLine('##__CL_RESOURCES_DEF_STOP__##', lines).index
	lines.splice(defStartIdx, defStopIdx - defStartIdx, ...definitions)


	// Initializations
	const iniTplLine = findLine('##__CL_RESOURCES_INIT_TEMPLATE::', lines)
	const iniTplIdx = iniTplLine.offset + '##__CL_RESOURCES_INIT_TEMPLATE::'.length + 1
	const iniTpl = iniTplLine.text.substring(iniTplIdx)

	const initializations: string[] = []
	Object.entries(resources).forEach(([type, res]) => {
		let ini = iniTpl
		ini = ini.replace(/##__TAB__##/g, '\t')
		ini = ini.replace('##__RESOURCE_TYPE__##', type)
		ini = ini.replace('##__RESOURCE_CLASS__##', res.apiClass)
		initializations.push(ini)
	})

	const iniStartIdx = findLine('##__CL_RESOURCES_INIT_START__##', lines).index + 2
	const iniStopIdx = findLine('##__CL_RESOURCES_INIT_STOP__##', lines).index
	lines.splice(iniStartIdx, iniStopIdx - iniStartIdx, ...initializations)


	// console.log(definitions)
	// console.log(initializations)

	writeFileSync('src/commercelayer.ts', lines.join('\n'), { encoding: 'utf-8' })

	console.log('API interfaces generated.')

}


const updateModelTypes = (resources: { [key: string]: ApiRes }): void => {

	const cl = readFileSync('src/model.ts', { encoding: 'utf-8' })

	const lines = cl.split('\n')

	// Exports
	const expTplLine = findLine('##__MODEL_TYPES_TEMPLATE::', lines)
	const expTplIdx = expTplLine.offset + '##__MODEL_TYPES_TEMPLATE::'.length + 1
	const expTpl = expTplLine.text.substring(expTplIdx)

	const exports: string[] = [copyrightHeader(templates.header)]
	const types: string[] = []
	Object.entries(resources).forEach(([type, res]) => {
		let exp = expTpl
		exp = exp.replace(/##__TAB__##/g, '\t')
		exp = exp.replace('##__RESOURCE_TYPE__##', type)
		exp = exp.replace('##__RESOURCE_MODELS__##', res.models.join(', '))
		exports.push(exp)
		types.push(`\t'${type}'`)
	})

	const expStartIdx = findLine('##__MODEL_TYPES_START__##', lines).index + 2
	const expStopIdx = findLine('##__MODEL_TYPES_STOP__##', lines).index
	lines.splice(expStartIdx, expStopIdx - expStartIdx, ...exports)


	writeFileSync('src/model.ts', lines.join('\n'), { encoding: 'utf-8' })

	console.log('Model types generated.')

}


const updateApiResources = (resources: { [key: string]: ApiRes }): void => {

	const cl = readFileSync('src/api.ts', { encoding: 'utf-8' })

	const lines = cl.split('\n')

	// Exports
	const expTplLine = findLine('##__API_RESOURCES_TEMPLATE::', lines)
	const expTplIdx = expTplLine.offset + '##__API_RESOURCES_TEMPLATE::'.length + 1
	const expTpl = expTplLine.text.substring(expTplIdx)

	const exports: string[] = [copyrightHeader(templates.header)]
	const types: string[] = []
	Object.entries(resources).forEach(([type, res]) => {
		let exp = expTpl
		exp = exp.replace(/##__TAB__##/g, '\t')
		exp = exp.replace('##__RESOURCE_TYPE__##', type)
		exp = exp.replace('##__RESOURCE_CLASS__##', res.apiClass)
		exports.push(exp)
		types.push(`\t'${type}'`)
	})

	const expStartIdx = findLine('##__API_RESOURCES_START__##', lines).index + 2
	const expStopIdx = findLine('##__API_RESOURCES_STOP__##', lines).index
	lines.splice(expStartIdx, expStopIdx - expStartIdx, ...exports)

	const typeStartIdx = findLine('##__API_RESOURCE_TYPES_START__##', lines).index + 1
	const typeStopIdx = findLine('##__API_RESOURCE_TYPES_STOP__##', lines).index
	lines.splice(typeStartIdx, typeStopIdx - typeStartIdx, types.join('\n|'))

	const resStartIdx = findLine('##__API_RESOURCE_LIST_START__##', lines).index + 1
	const resStopIdx = findLine('##__API_RESOURCE_LIST_STOP__##', lines).index
	lines.splice(resStartIdx, resStopIdx - resStartIdx, types.join(',\n'))

	/*
	const mapStartIdx = findLine('##__API_RESOURCE_MAP_START__##', lines).index + 1
	const mapStopIdx = findLine('##__API_RESOURCE_MAP_STOP__##', lines).index
	lines.splice(mapStartIdx, mapStopIdx - mapStartIdx,
		Object.keys(resources).map(t => `\t${t}: { name: '${Inflector.singularize(t)}', type: '${t}', api: '${t}' }`).join(',\n')
	)
	*/


	writeFileSync('src/api.ts', lines.join('\n'), { encoding: 'utf-8' })

	console.log('API resources generated.')

}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const randomValue = (type: string, name?: string): any | Array<any> => {

	const numbers = [0, 1, 10, 100, 1000, 10000, 5, 55, 555, 12345, 6666]
	const strings = ['alfa', 'beta', 'gamma', 'delta', 'epsilon', 'kappa', 'lambda', 'omega', 'sigma', 'zeta']
	const booleans = [true, false, true, false, true, false, true, false, true, false]
	const objects = [{ key11: 'val11' }, { key21: 'val21' }, { key31: 'val31' }, { key41: 'val41' }, { key51: 'val51' }]

	let values: Array<string | number | boolean | object>

	if (name) {
		// type = 
	}

	if (type.startsWith('boolean')) values = booleans
	else
	if (type.startsWith('integer') || type.startsWith('number')) values = numbers
	else
	if (type.startsWith('fload') || type.startsWith('decimal')) values = numbers
	else
	if (type.startsWith('object')) values = objects
	else
	if (type.startsWith('string')) values = strings
	else values = strings

	let value = values[Math.floor(Math.random() * (values.length - 1))]

	if (type === 'string') value = `${value}_${Math.floor(Math.random() * 100)}`

	if (type.endsWith('[]')) value = [ value ]

	return value

}


const generateSpec = (type: string, name: string, resource: Resource): string => {

	let spec = templates.spec

	// Remove unsupported operations
	const lines = spec.split('\n')

	const allOperations = ['list', 'create', 'retrieve', 'update', 'delete', 'singleton']

	// Generate CRUD operations specs
	allOperations.forEach(op => {
		if (!Object.values(resource.operations).map(o => {
			if ((o.name === 'list') && o.singleton) return 'singleton'
			else return o.name
		}).includes(op)) {
			const opStartIdx = findLine(`spec.${op}.start`, lines).index - 2
			const opStopIdx = findLine(`spec.${op}.stop`, lines).index + 2
			lines.splice(opStartIdx, opStopIdx - opStartIdx, '')
		}
	})

	spec = lines.join('\n')

	// Generate relationships operations specs
	Object.keys(resource.operations).filter(o => !allOperations.includes(o)).forEach(o => {
		const op = resource.operations[o]
		if (op.relationship) {

			let specRel = templates.spec_relationship.split('\n').join('\n\t')

			specRel = specRel.replace(/##__OPERATION_NAME__##/g, op.name)
			specRel = specRel.replace(/##__RELATIONSHIP_TYPE__##/g, op.relationship.type)
			spec = spec.replace(/##__RELATIONSHIP_SPECS__##/g, '\n\n\t' + specRel + '\n\t##__RELATIONSHIP_SPECS__##')

		}
	})

	// Header
	spec = copyrightHeader(spec)

	spec = spec.replace(/##__RESOURCE_CLASS__##/g, name)
	spec = spec.replace(/##__RESOURCE_TYPE__##/g, type)
	spec = spec.replace(/##__RELATIONSHIP_SPECS__##/g, '')

	if (resource.operations.create) {

		let obj = '{\n'

		// Attriburtes
		const reqType = resource.operations.create.requestType
		const attributes = reqType ? resource.components[reqType].attributes : {}
		const required = Object.values(attributes).filter(attr => attr.required)
		required.forEach(r => obj += `\t\t\t${r.name}: ${inspect(randomValue(r.type, r.name))},\n`)

		// Relationships
		const relationships = reqType ? resource.components[reqType].relationships : {}
		const filtered = Object.values(relationships).filter(rel => !rel.deprecated)
		filtered.forEach(f => {
			let relVal: string | string[] = `cl.${f.type}.relationship(TestData.id)`
			if (f.cardinality === 'to_many') relVal = `[ ${relVal} ]`
			obj += `\t\t\t${f.name}: ${relVal},\n`
		})

		obj += '\t\t}\n'

		spec = spec.replace(/##__RESOURCE_ATTRIBUTES_CREATE__##/g, obj)

	}

	let modelName = String(Object.keys(resource.components)[0])
	if (modelName.endsWith('Update')) modelName = String(resource.components).slice(0, -'Update'.length)
	else
	if (modelName.endsWith('Create')) modelName = String(resource.components).slice(0, -'Create'.length)
	spec = spec.replace(/##__RESOURCE_MODEL__##/g, modelName)


	return spec

}


const copyrightHeader = (template: string): string => {

	// Header
	const now = new Date()
	const year = String(now.getFullYear())
	const date = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${year}`
	template = template.replace(/##__CURRENT_YEAR__##/g, year)
	template = template.replace(/##__CURRENT_DATE__##/g, date)
	if (global.version) template = template.replace(/##__SCHEMA_VERSION__##/g, global.version)

	return template

}


const generateResource = (type: string, name: string, resource: Resource): string => {

	let res = templates.resource
	const operations: string[] = []

	const resName = name

	const declaredTypes: Set<string> = new Set()
	const declaredImports: Set<string> = new Set()

	// Header
	res = copyrightHeader(res)


	// Operations
	const qryMod: string[] = []
	const resMod: string[] = []
	Object.entries(resource.operations).forEach(([opName, op]) => {
		const tpl = op.singleton ? templates['singleton'] : templates[opName]
		if (tpl) {
			if (['retrieve', 'list'].includes(opName)) {
				qryMod.push('QueryParams' + capitalize(op.singleton ? 'retrieve' : opName))
				if ((opName === 'list') && !op.singleton) resMod.push('ListResponse')
			}
			const tplOp = templatedOperation(resName, opName, op, tpl)
			operations.push(tplOp.operation)
			tplOp.types.forEach(t => { declaredTypes.add(t) })
		}
		else {
			if (op.relationship) {
				const tplr = templates[`relationship_${op.relationship.cardinality.replace('to_', '')}`]
				const tplrOp = templatedOperation('', opName, op, tplr)
				operations.push(tplrOp.operation)
			} else console.log('Unknown operation: ' + opName)
		}
	})
	res = res.replace(/##__QUERY_MODELS__##/g, qryMod.join(', '))
	res = res.replace(/##__RESPONSE_MODELS__##/g, (resMod.length > 0) ? `, ${resMod.join(', ')}`: '')
	res = res.replace(/##__MODEL_RESOURCE_INTERFACE__##/g, Inflector.singularize(resName))


	// Resource definition
	res = res.replace(/##__RESOURCE_TYPE__##/g, type)
	res = res.replace(/##__RESOURCE_CLASS__##/g, resName)
	if (operations && (operations.length > 0)) res = res.replace(/##__RESOURCE_OPERATIONS__##/g, operations.join('\n\n\t'))

	// Interfaces export
	const typesArray = Array.from(declaredTypes)
	res = res.replace(/##__EXPORT_RESOURCE_TYPES__##/g, typesArray.join(', '))

	// Interfaces definition
	const modIntf: string[] = []
	const resIntf: string[] = []
	const relTypes: Set<string> = new Set()

	typesArray.forEach(t => {
		const cudSuffix = getCUDSuffix(t)
		resIntf.push(`Resource${cudSuffix}`)
		const tplCmp = templatedComponent(resName, t, resource.components[t])
		tplCmp.models.forEach(m => declaredImports.add(m))
		modIntf.push(tplCmp.component)
		if (cudSuffix) tplCmp.models.forEach(t => relTypes.add(t))
	})
	res = res.replace(/##__MODEL_INTERFACES__##/g, modIntf.join('\n\n\n'))
	res = res.replace(/##__RESOURCE_INTERFACES__##/g, resIntf.join(', '))


	// Relationships definition
	const relTypesArray = Array.from(relTypes).map(i => `type ${i}Rel = ResourceRel & { type: '${snakeCase(Inflector.pluralize(i))}' }`)
	res = res.replace(/##__RELATIONSHIP_TYPES__##/g, relTypesArray.length ? (relTypesArray.join('\n') + '\n') : '')

	// Resources import
	const impResMod: string[] = Array.from(declaredImports)
		.filter(i => !typesArray.includes(i))	// exludes resource self reference
		.map(i => `import { ${i} } from './${snakeCase(Inflector.pluralize(i))}'`)
	const importStr = impResMod.join('\n') + (impResMod.length ? '\n' : '')
	res = res.replace(/##__IMPORT_RESOURCE_MODELS__##/g, importStr)


	return res

}


const templatedOperation = (res: string, name: string, op: Operation, tpl: string): { operation: string, types: string[] } => {

	let operation = tpl
	const types: string[] = []

	operation = operation.replace(/##__OPERATION_NAME__##/g, name)
	operation = operation.replace(/##__RESOURCE_CLASS__##/g, res)

	if (op.requestType) {
		const requestType = op.requestType
		operation = operation.replace(/##__RESOURCE_REQUEST_CLASS__##/g, requestType)
		if (!types.includes(requestType)) types.push(requestType)
	}
	if (op.responseType || ['list', 'update', 'create'].includes(name)) {
		const responseType = op.responseType ? op.responseType : Inflector.singularize(res)
		operation = operation.replace(/##__RESOURCE_RESPONSE_CLASS__##/g, responseType)
		if (!types.includes(responseType)) types.push(responseType)
	}
	if (op.relationship) {
		operation = operation.replace(/##__RELATIONSHIP_TYPE__##/g, op.relationship.type)
		operation = operation.replace(/##__RELATIONSHIP_PATH__##/g, op.path.substring(1).replace('{', '${'))
		operation = operation.replace(/##__RESOURCE_ID__##/g, op.id || 'id')
	}

	operation = operation.replace(/\n/g, '\n\t')


	return { operation, types }

}


const expType = (type: string): string => {
	switch (type) {
		case 'integer': return 'number'
		default: return type
	}
}


const getCUDSuffix = (name: string): string => {
	const suffixes = ['Update', 'Create', 'Delete']
	let suffix = ''
	if (name) {
		suffixes.some(x => {
			if (name.endsWith(x)) {
				suffix = x
				return true
			}
			return false
		})
	}
	return suffix
}

const isCUDModel = (name: string): boolean => {
	return (name !== undefined) && (getCUDSuffix(name) !== '')
}


const templatedComponent = (res: string, name: string, cmp: Component): { component: string, models: string[] } => {

	const models: string[] = []

	// Attributes
	const attributes = Object.values(cmp.attributes)
	const fields: string[] = []
	attributes.forEach(a => {
		if (!['type', 'id', 'reference', 'reference_origin', 'metadata', 'created_at', 'updated_at'].includes(a.name))
			fields.push(`${a.name}${a.required ? '' : '?'}: ${expType(a.type)}`)
	})

	// Relationships
	const relationships = Object.values(cmp.relationships)
	const rels: string[] = []
	relationships.forEach(r => {
		if (r.deprecated) {
			const deprecated = '/**\n\t* @deprecated This field should not be used as it may be removed in the future without notice\n\t*/\n\t'
			rels.push(`${deprecated}${r.name}?: object${(r.cardinality === Cardinality.to_many) ? '[]' : ''}`)
		}
		else {

			let resName = r.type

			if (resName !== 'object') {
				const relStr = isCUDModel(name) ? 'Rel' : ''
				if (r.polymorphic && r.oneOf) {
					resName = r.oneOf.map(o => `${o}${relStr}`).join(' | ')
					models.push(...r.oneOf)
				}
				else {
					resName = Inflector.camelize(Inflector.singularize(r.type))
					models.push(resName)
					resName += relStr
				}
			}

			const req = r.required ? '' : '?'
			const arr = (r.cardinality === Cardinality.to_many) ? '[]' : ''

			if (r.polymorphic && (r.cardinality === Cardinality.to_many)) resName = `(${resName})`

			rels.push(`${r.name}${req}: ${resName}${arr}`)

		}
	})


	let component = (fields.length || rels.length) ? templates.model : templates.model_empty

	component = component.replace(/##__RESOURCE_MODEL__##/g, name)
	component = component.replace(/##__EXTEND_TYPE__##/g, getCUDSuffix(name))

	const fieldsStr = (fields.length ? '\n\t' : '') + fields.join('\n\t') + (fields.length && rels.length ? '\n' : '')
	const relsStr = rels.join('\n\t') + (rels.length ? '\n' : '')
	component = component.replace(/##__RESOURCE_MODEL_FIELDS__##/g, fieldsStr)
	component = component.replace(/##__RESOURCE_MODEL_RELATIONSHIPS__##/g, relsStr)


	return { component, models }

}


generate(process.argv.indexOf('--local') > -1)
