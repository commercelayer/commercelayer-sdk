
import apiSchema, { Resource, Operation, Component, Cardinality, Attribute } from './schema'
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'fs'
import { basename } from 'path'
import { capitalize, snakeCase } from 'lodash'
import { inspect } from 'util'
import fixSchema from './fixer'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Inflector = require('inflector-js')


type OperationType = 'retrieve' | 'list' | 'create' | 'update' | 'delete'

type ApiRes = {
	type: string
	apiClass: string
	models: Array<String>
	singleton: boolean
	operations: Array<OperationType>
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

	if (!localSchema) {

		let currentVersion = '0.0.0'

		try {
			const currentSchema = apiSchema.current()
			currentVersion = currentSchema.info.version
		} catch (err) {
			console.log('No current local schema available')
		}

		const schemaInfo = await apiSchema.download()

		if (schemaInfo.version === currentVersion) {
			console.log('No new OpenAPI schema version: ' + currentVersion)
			return
		}
		else console.log(`New OpenAPI schema version: ${currentVersion} --> ${schemaInfo.version}`)

	}

	const schemaPath = apiSchema.localPath
	if (!existsSync(schemaPath)) {
		console.log('Cannot find schema file: ' + schemaPath)
		return
	}

	console.log('Generating SDK resources from schema ' + schemaPath)

	const schema = apiSchema.parse(schemaPath)
	global.version = schema.version


	// Remove redundant components and force usage of global resource component
	fixSchema(schema)
	// console.log(inspect(schema, false, null, true))


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


		const models = Object.keys(res.components)
		const singleton = Object.values(res.operations).some(op => op.singleton)
		const operations = Object.keys(res.operations).filter(op => ['retrieve', 'list', 'create', 'update', 'delete'].includes(op)) as OperationType[]

		resources[type] = {
			type,
			apiClass: name,
			models,
			singleton,
			operations: singleton? [] : operations
		}

	})


	updateApiResources(resources)
	updateSdkInterfaces(resources)
	updateModelTypes(resources)

	console.log(`SDK generation completed [${global.version}].\n`)

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

	const singletons: string[] = []
	const listables: string[] = []
	const creatables: string[] = []
	const updatables: string[] = []
	const deletables: string[] = []

	Object.entries(resources).forEach(([type, res]) => {

		let exp = expTpl
		exp = exp.replace(/##__TAB__##/g, '\t')
		exp = exp.replace('##__RESOURCE_TYPE__##', type)
		exp = exp.replace('##__RESOURCE_CLASS__##', res.apiClass)
		exports.push(exp)
		const tabType = `\t'${type}'`
		types.push(tabType)

		if (res.singleton) singletons.push(tabType)
		if (res.operations.includes('list')) listables.push(tabType)
		if (res.operations.includes('create')) creatables.push(tabType)
		if (res.operations.includes('update')) updatables.push(tabType)
		if (res.operations.includes('delete')) deletables.push(tabType)

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

	const rsStartIdx = findLine('##__API_RESOURCE_SINGLETON_START__##', lines).index + 1
	const rsStopIdx = findLine('##__API_RESOURCE_SINGLETON_STOP__##', lines).index
	lines.splice(rsStartIdx, rsStopIdx - rsStartIdx, singletons.join('\n|'))

	const rcStartIdx = findLine('##__API_RESOURCE_CREATABLE_START__##', lines).index + 1
	const rcStopIdx = findLine('##__API_RESOURCE_CREATABLE_STOP__##', lines).index
	lines.splice(rcStartIdx, rcStopIdx - rcStartIdx, creatables.join('\n|'))

	const ruStartIdx = findLine('##__API_RESOURCE_UPDATABLE_START__##', lines).index + 1
	const ruStopIdx = findLine('##__API_RESOURCE_UPDATABLE_STOP__##', lines).index
	lines.splice(ruStartIdx, ruStopIdx - ruStartIdx, updatables.join('\n|'))

	const rdStartIdx = findLine('##__API_RESOURCE_DELETABLE_START__##', lines).index + 1
	const rdStopIdx = findLine('##__API_RESOURCE_DELETABLE_STOP__##', lines).index
	lines.splice(rdStartIdx, rdStopIdx - rdStartIdx, deletables.join('\n|'))


	writeFileSync('src/api.ts', lines.join('\n'), { encoding: 'utf-8' })

	console.log('API resources generated.')

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
		// required.forEach(r => obj += `\t\t\t${r.name}: ${inspect(randomValue(r.type, r.name))},\n`)
		required.forEach(r => obj += `\t\t\t${r.name}: randomValue('${r.type}', '${r.name}'),\n`)

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

	const modelName = String(Object.keys(resource.components)[0].replace(/(Create|Update)$/g, ''))
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

	const resModelInterface = Inflector.singularize(resName)
	let resModelType = 'ApiResource'

	const declaredTypes: Set<string> = new Set([resModelInterface])
	// const declaredEnums: ComponentEnums = {}
	const declaredImportsModels: Set<string> = new Set()
	const declaredImportsCommon: Set<string> = new Set(['ResourceId'])


	// Header
	res = copyrightHeader(res)


	// Operations
	const qryMod = new Set<string>()
	const resMod = new Set<string>()
	Object.entries(resource.operations).forEach(([opName, op]) => {
		const tpl = op.singleton ? templates['singleton'] : templates[opName]
		if (op.singleton) resModelType = 'ApiSingleton'
		if (tpl) {
			if (['create', 'update'].includes(opName)) qryMod.add('QueryParamsRetrieve')
			if (['retrieve', 'list'].includes(opName)) {
				/* do nothing:
				   retrieve operation iscommon to all resoucres
				   list operation iscommon to all non singleton resoucres
				*/
			}
			else {
				const tplOp = templatedOperation(resName, opName, op, tpl)
				operations.push(tplOp.operation)
				tplOp.types.forEach(t => { declaredTypes.add(t) })
			}
		}
		else {
			if (op.relationship) {
				const tplr = templates[`relationship_${op.relationship.cardinality.replace('to_', '')}`]
				const tplrOp = templatedOperation(resName, opName, op, tplr)
				if (op.relationship.cardinality === Cardinality.to_one) qryMod.add('QueryParamsRetrieve')
				else
				if (op.relationship.cardinality === Cardinality.to_many) {
					qryMod.add('QueryParamsList')
					resMod.add('ListResponse')
				}
				operations.push(tplrOp.operation)
			} else console.log('Unknown operation: ' + opName)
		}
	})

	if (operations && (operations.length > 0)) declaredImportsCommon.add('ResourcesConfig')

	res = res.replace(/##__RESOURCE_MODEL_TYPE__##/g, resModelType)
	res = res.replace(/##__RESPONSE_MODELS__##/g, (resMod.size > 0) ? `, ${Array.from(resMod).join(', ')}`: '')
	res = res.replace(/##__MODEL_RESOURCE_INTERFACE__##/g, resModelInterface)
	res = res.replace(/##__IMPORT_RESOURCE_COMMON__##/, Array.from(declaredImportsCommon).join(', '))

	const importQueryModels = (qryMod.size > 0)? `import type { ${Array.from(qryMod).sort().reverse().join(', ')} } from '../query'` : ''
	res = res.replace(/##__IMPORT_QUERY_MODELS__##/, importQueryModels)
	

	// Resource definition
	res = res.replace(/##__RESOURCE_TYPE__##/g, type)
	res = res.replace(/##__RESOURCE_CLASS__##/g, resName)

	const resourceOperations = (operations && (operations.length > 0))? operations.join('\n\n\t') : ''
	res = res.replace(/##__RESOURCE_OPERATIONS__##/, resourceOperations)


	// Interfaces export
	const typesArray = Array.from(declaredTypes)
	res = res.replace(/##__EXPORT_RESOURCE_TYPES__##/g, typesArray.join(', '))

	// Interfaces and types definition
	const modelInterfaces: string[] = []
	const resourceInterfaces: string[] = []
	const relationshipTypes: Set<string> = new Set()

	typesArray.forEach(t => {
		const cudSuffix = getCUDSuffix(t)
		resourceInterfaces.push(`Resource${cudSuffix}`)
		const tplCmp = templatedComponent(resName, t, resource.components[t])
		tplCmp.models.forEach(m => declaredImportsModels.add(m))
		modelInterfaces.push(tplCmp.component)
		if (cudSuffix) tplCmp.models.forEach(t => relationshipTypes.add(t))
	})
	res = res.replace(/##__MODEL_INTERFACES__##/g, modelInterfaces.join('\n\n\n'))
	res = res.replace(/##__RESOURCE_INTERFACES__##/g, resourceInterfaces.join(', '))


	// Relationships definition
	const relTypesArray = Array.from(relationshipTypes).map(i => `type ${i}Rel = ResourceRel & { type: ${i}Type }`)
	res = res.replace(/##__RELATIONSHIP_TYPES__##/g, relTypesArray.length ? (relTypesArray.join('\n') + '\n') : '')

	// Resources import
	const impResMod: string[] = Array.from(declaredImportsModels)
		.filter(i => !typesArray.includes(i))	// exludes resource self reference
		.map(i => `import type { ${i}${relationshipTypes.has(i)? `, ${i}Type` : ''} } from './${snakeCase(Inflector.pluralize(i))}'`)
	const importStr = impResMod.join('\n') + (impResMod.length ? '\n' : '')
	res = res.replace(/##__IMPORT_RESOURCE_MODELS__##/g, importStr)

	// Enum types definitions


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
	if (op.responseType) {
		const responseType = op.responseType
		operation = operation.replace(/##__RESOURCE_RESPONSE_CLASS__##/g, responseType)
		if (!types.includes(responseType)) types.push(responseType)
	}
	if (op.relationship) {
		operation = operation.replace(/##__RELATIONSHIP_TYPE__##/g, op.relationship.type)
		operation = operation.replace(/##__RELATIONSHIP_PATH__##/g, op.path.substring(1).replace('{', '${_'))
		operation = operation.replace(/##__RESOURCE_ID__##/g, op.id || 'id')
		operation = operation.replace(/##__MODEL_RESOURCE_INTERFACE__##/g, Inflector.singularize(res))
	}

	operation = operation.replace(/\n/g, '\n\t')


	return { operation, types }

}


const fixAttributeType = (attr: Attribute): string => {
	if (attr.enum) return `${attr.enum.map(a => `'${a}'`).join(' | ')}`
	else
	switch (attr.type) {
		case 'integer': return 'number'
		default: return attr.type
	}
}


const getCUDSuffix = (name: string): string => {
	const suffixes = ['Create', 'Update', 'Delete']
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


type ComponentEnums = { [key: string]: string }

const templatedComponent = (res: string, name: string, cmp: Component): { component: string, models: string[], enums: ComponentEnums } => {

	const cudModel = isCUDModel(name)

	const models: string[] = []
	const enums: ComponentEnums = {}

	// Attributes
	const attributes = Object.values(cmp.attributes)
	const fields: string[] = []
	attributes.forEach(a => {
		if (!['type', 'id', 'reference', 'reference_origin', 'metadata', 'created_at', 'updated_at'].includes(a.name)) {
			if (cudModel || a.fetchable) {
				let attrType = fixAttributeType(a)
				if (a.enum) enums[a.name] = attrType
				fields.push(`${a.name}${a.required ? '' : '?'}: ${attrType}`)
			}
		}
	})

	// Specific resource type
	if (!cudModel) fields.unshift(`readonly type: ${name}Type\n`)

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
				const relStr = cudModel ? 'Rel' : ''
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

			if ((r.cardinality === Cardinality.to_many)) {
				if (r.polymorphic) resName = `Array<${resName}>`
				else resName += '[]'
			}

			rels.push(`${r.name}${req}: ${resName}`)

		}
	})


	let component = (fields.length || rels.length) ? templates.model : templates.model_empty

	component = component.replace(/##__RESOURCE_MODEL__##/g, name)
	component = component.replace(/##__EXTEND_TYPE__##/g, getCUDSuffix(name))

	const fieldsStr = (fields.length ? '\n\t' : '') + fields.join('\n\t') + (fields.length && rels.length ? '\n' : '')
	const relsStr = rels.join('\n\t') + (rels.length ? '\n' : '')
	component = component.replace(/##__RESOURCE_MODEL_FIELDS__##/g, fieldsStr)
	component = component.replace(/##__RESOURCE_MODEL_RELATIONSHIPS__##/g, relsStr)


	return { component, models, enums }

}



generate(process.argv.indexOf('--local') > -1)
