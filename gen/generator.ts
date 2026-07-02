import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { basename } from 'node:path'
import Inflector from './inflector'
import { updateLicense } from './license'
import apiSchema, { type Attribute, Cardinality, type Component, type Operation, type Resource } from './schema'

type ConfigType = {
  LOCAL_SCHEMA: boolean
  RELATIONSHIP_FUNCTIONS: boolean
  TRIGGER_FUNCTIONS: boolean
  RESOURCES_FULL_BUNDLE: boolean
  RESOURCES_INSTANCE_STYLE: 'standard_object' | 'lazy_loading' | 'accessors_only'
  RESOURCES_STANDARD_OBJECT?: boolean
  RESOURCES_LAZY_LOADING?: boolean
  RESOURCES_ACCESSORS_ONLY?: boolean
}

/**** SDK source code generator settings ****/
export const CONFIG: ConfigType = {
  LOCAL_SCHEMA: false,
  RELATIONSHIP_FUNCTIONS: true,
  TRIGGER_FUNCTIONS: true,
  RESOURCES_FULL_BUNDLE: true,
  // Bundle clients must be isolated per access token. `lazy_loading` emits
  // private cache fields + lazy getters that bind each resource to the
  // client's own adapter (via `.withAdapter(this.adapter)`), instead of
  // `accessors_only` which returned the shared process-global singletons.
  RESOURCES_INSTANCE_STYLE: 'lazy_loading',
}
CONFIG.RESOURCES_STANDARD_OBJECT = CONFIG.RESOURCES_INSTANCE_STYLE === 'standard_object'
CONFIG.RESOURCES_LAZY_LOADING = CONFIG.RESOURCES_INSTANCE_STYLE === 'lazy_loading'
CONFIG.RESOURCES_ACCESSORS_ONLY = CONFIG.RESOURCES_INSTANCE_STYLE === 'accessors_only'
/**** **** **** **** **** **** **** **** ****/

const SCHEMA_VERSION_CONST = 'API_SCHEMA_VERSION'
// const SDK_VERSION_CONST = 'SDK_VERSION'
const RESOURCE_COMMON_FIELDS = ['type', 'id', 'reference', 'reference_origin', 'metadata', 'created_at', 'updated_at']

type OperationType = 'retrieve' | 'list' | 'create' | 'update' | 'delete'

type ApiRes = {
  type: string
  apiClass: string
  models: Array<string>
  singleton: boolean
  operations: Array<OperationType>
  taggable: boolean
}

const templates: { [key: string]: string } = {}

const global: {
  version?: string
} = {}

const loadTemplates = (): void => {
  const tplDir = './gen/templates'
  const tplList = readdirSync(tplDir, { encoding: 'utf-8' }).filter((f) => f.endsWith('.tpl'))
  tplList.forEach((t) => {
    const tplName = basename(t).replace('.tpl', '')
    const tpl = readFileSync(`${tplDir}/${tplName}.tpl`, { encoding: 'utf-8' })
    templates[tplName] = tpl
  })
}

function formatCode(sourcePath: string): void {
  try {
    console.log(`- Formatting folder: ${sourcePath}`)
    execSync(`pnpm biome check --write ${sourcePath}`, { encoding: 'utf-8' })
  } catch (error) {
    console.error('Formatter error:', error)
  }
}

type CliOptions = {
  localSchema: boolean
  apiHost?: string
  apiVersion?: string
  output?: string
}

const parseCliOptions = (argv: string[]): CliOptions => {
  const get = (name: string): string | undefined => {
    const eq = argv.find((a) => a.startsWith(`--${name}=`))
    if (eq) return eq.substring(name.length + 3)
    const idx = argv.indexOf(`--${name}`)
    if (idx >= 0 && idx + 1 < argv.length) return argv[idx + 1]
    return undefined
  }
  return {
    localSchema: argv.indexOf('--local') > -1,
    apiHost: get('api-host'),
    apiVersion: get('api-version'),
    output: get('output'),
  }
}

const generate = async (cli: CliOptions) => {
  const { localSchema, apiHost, apiVersion, output } = cli

  console.log(`>> Local schema: ${localSchema}\n`)
  CONFIG.LOCAL_SCHEMA = localSchema

  const isDiffMode = output !== undefined

  if (!localSchema) {
    const schemaInfo = await apiSchema.download({ apiHost, apiVersion }).catch((error: Error) => {
      console.log(error.message)
      return undefined
    })

    if (!schemaInfo) {
      console.log('Unable to download schema')
      return
    }
    console.log(`Schema release: ${schemaInfo.version}`)
  }

  const schemaPath = apiSchema.localPath
  if (!existsSync(schemaPath)) {
    console.log('Cannot find schema file: ' + schemaPath)
    return
  }

  console.log('Generating SDK resources from schema ' + schemaPath)

  const schema = apiSchema.parse(schemaPath, { apiHost, apiVersion })
  global.version = schema.version

  loadTemplates()

  // Initialize source dir
  const resDir = output || 'src/resources'
  if (existsSync(resDir)) rmSync(resDir, { recursive: true })
  mkdirSync(resDir, { recursive: true })

  // Initialize test dir (mirror the output dir suffix when in diff mode)
  const testDir = isDiffMode ? `specs/${resDir.replace(/^src\//, '')}` : 'specs/resources'
  if (existsSync(testDir)) rmSync(testDir, { recursive: true })
  mkdirSync(testDir, { recursive: true })

  const resources: Record<string, ApiRes> = {}

  Object.entries(schema.resources).forEach(([type, res]) => {
    const name = Inflector.pluralize(Inflector.camelize(type)) as string

    const tplRes = generateResource(type, name, res)
    writeFileSync(`${resDir}/${type}.ts`, tplRes)
    console.log('Generated resource ' + name)

    const tplSpec = generateSpec(type, name, res)
    writeFileSync(`${testDir}/${type}.spec.ts`, tplSpec)
    console.log('Generated spec ' + name)

    const models = Object.keys(res.components)
    const singleton = Object.values(res.operations).some((op) => op.singleton)
    const operations = Object.keys(res.operations).filter((op) =>
      ['retrieve', 'list', 'create', 'update', 'delete'].includes(op),
    ) as OperationType[]
    const taggable = Object.keys(res.operations).includes('tags')

    resources[type] = {
      type,
      apiClass: name,
      models,
      singleton,
      operations: singleton ? [] : operations,
      taggable,
    }
  })

  if (!isDiffMode) {
    updateApiResources(resources)
    updateAdapters(resources)
    updateModelTypes(resources)
    updateSdkBundle(resources)

    updateSdkVersion()
    updateLicense()
  }

  formatCode(resDir)
  formatCode(testDir)

  console.log(`SDK generation completed [${global.version}].\n`)
}

const findLine = (str: string, lines: string[]): { text: string; index: number; offset: number } => {
  let idx = 0
  for (const l of lines) {
    const i = l.indexOf(str)
    if (i > -1) return { text: l, index: idx, offset: i }
    else idx++
  }
  return { text: '', index: -1, offset: -1 }
}

const _tabsCount = (template: string): number => {
  return template.match(/##__TAB__##/g)?.length || 0
}

const _tabsString = (num: number): string => {
  let str = ''
  for (let i = 0; i < num; i++) str += '\t'
  return str
}

const updateSdkVersion = (): void => {
  if (!global.version) return

  // API_SCHEMA_VERSION lives in src/version.ts (alongside SDK_VERSION) so
  // client.ts can read it without a circular import via commercelayer.ts.
  const filePath = 'src/version.ts'

  const cl = readFileSync(filePath, { encoding: 'utf-8' })

  const lines = cl.split('\n')

  // Build's target API version (e.g. '2026-05' for a unified build,
  // 'latest' for a legacy build). Customers don't override this — the URL
  // version segment is purely driven by the generator's output.
  // The `: string` annotation widens TS's inferred literal type so
  // comparisons like `API_SCHEMA_VERSION === 'latest'` don't trip TS2367
  // after regen against a unified host.
  const schemaLine = findLine(SCHEMA_VERSION_CONST, lines)
  const schemaPrefix = schemaLine.text.substring(0, schemaLine.offset).trim()
  if (schemaLine.index >= 0)
    lines[schemaLine.index] = `${schemaPrefix} ${SCHEMA_VERSION_CONST}: string = '${global.version}'`

  writeFileSync(filePath, lines.join('\n'), { encoding: 'utf-8' })

  console.log(`SDK version updated [${global.version}].`)
}

const updateSdkBundle = (resources: Record<string, ApiRes>): void => {
  const filePath = 'src/bundle.ts'

  const cl = readFileSync(filePath, { encoding: 'utf-8' })

  const lines = cl.split('\n')

  // Definitions
  const definitions: string[] = []

  if (CONFIG.RESOURCES_FULL_BUNDLE && !CONFIG.RESOURCES_ACCESSORS_ONLY) {
    const defTplLine = findLine('##__CL_RESOURCES_DEF_TEMPLATE::', lines)
    const defTplIdx = defTplLine.offset + '##__CL_RESOURCES_DEF_TEMPLATE::'.length + 1
    const defTpl = defTplLine.text.substring(defTplIdx)

    Object.entries(resources).forEach(([type, res]) => {
      const fieldName = res.singleton ? Inflector.singularize(type) : type
      let def = defTpl
      def = def.replace(/##__TAB__##/g, '\t')
      def = def.replace(/##__RESOURCE_TYPE__##/, fieldName)
      def = def.replace(/##__RESOURCE_CLASS__##/, res.apiClass)
      definitions.push(def)
    })
  }

  const defStartIdx = findLine('##__CL_RESOURCES_DEF_START__##', lines).index + 2
  const defStopIdx = findLine('##__CL_RESOURCES_DEF_STOP__##', lines).index
  lines.splice(defStartIdx, defStopIdx - defStartIdx, ...definitions)

  // Initializations
  const initializations: string[] = []

  if (CONFIG.RESOURCES_FULL_BUNDLE) {
    const iniTplLine = findLine('##__CL_RESOURCES_INIT_TEMPLATE::', lines)
    const iniTplIdx = iniTplLine.offset + '##__CL_RESOURCES_INIT_TEMPLATE::'.length + 1
    const iniTpl = iniTplLine.text.substring(iniTplIdx)

    if (!CONFIG.RESOURCES_LAZY_LOADING && !CONFIG.RESOURCES_ACCESSORS_ONLY)
      Object.entries(resources).forEach(([type, res]) => {
        const fieldName = res.singleton ? Inflector.singularize(type) : type
        let ini = iniTpl
        ini = ini.replace(/##__TAB__##/g, '\t')
        ini = ini.replace(/##__RESOURCE_TYPE__##/, fieldName)
        ini = ini.replace(/##__RESOURCE_CLASS__##/, res.apiClass)
        initializations.push(ini)
      })
  }

  const iniStartIdx = findLine('##__CL_RESOURCES_INIT_START__##', lines).index + 2
  const iniStopIdx = findLine('##__CL_RESOURCES_INIT_STOP__##', lines).index
  lines.splice(iniStartIdx, iniStopIdx - iniStartIdx, ...initializations)

  // Lazy Loading
  const lazyLoaders: string[] = []

  if (CONFIG.RESOURCES_FULL_BUNDLE) {
    const llTplLine = findLine('##__CL_RESOURCES_LAZY_LOADING_TEMPLATE::', lines)
    const llTplIdx = llTplLine.offset + '##__CL_RESOURCES_LAZY_LOADING_TEMPLATE::'.length + 1
    const llTpl = llTplLine.text.substring(llTplIdx)

    if (CONFIG.RESOURCES_LAZY_LOADING && !CONFIG.RESOURCES_ACCESSORS_ONLY)
      Object.entries(resources).forEach(([type, res]) => {
        const fieldName = res.singleton ? Inflector.singularize(type) : type
        let ll = llTpl
        ll = ll.replace(/##__TAB__##/g, '\t')
        ll = ll.replace(/##__RESOURCE_TYPE__##/g, fieldName)
        ll = ll.replace(/##__RESOURCE_CLASS__##/g, res.apiClass)
        lazyLoaders.push(ll)
      })
  }

  const llStartIdx = findLine('##__CL_RESOURCES_LAZY_LOADING_START__##', lines).index + 2
  const llStopIdx = findLine('##__CL_RESOURCES_LAZY_LOADING_STOP__##', lines).index
  lines.splice(llStartIdx, llStopIdx - llStartIdx, ...lazyLoaders)

  // Accessors
  const accessors: string[] = []

  if (CONFIG.RESOURCES_FULL_BUNDLE) {
    const aoTplLine = findLine('##__CL_RESOURCES_ACCESSORS_ONLY_TEMPLATE::', lines)
    const aoTplIdx = aoTplLine.offset + '##__CL_RESOURCES_ACCESSORS_ONLY_TEMPLATE::'.length + 1
    const aoTpl = aoTplLine.text.substring(aoTplIdx)

    if (CONFIG.RESOURCES_ACCESSORS_ONLY)
      Object.entries(resources).forEach(([type, res]) => {
        const fieldName = res.singleton ? Inflector.singularize(type) : type
        let ao = aoTpl
        ao = ao.replace(/##__TAB__##/g, '\t')
        ao = ao.replace(/##__RESOURCE_TYPE__##/g, fieldName)
        ao = ao.replace(/##__RESOURCE_CLASS__##/g, res.apiClass)
        accessors.push(ao)
      })
  }

  const aoStartIdx = findLine('##__CL_RESOURCES_ACCESSORS_ONLY_START__##', lines).index + 2
  const aoStopIdx = findLine('##__CL_RESOURCES_ACCESSORS_ONLY_STOP__##', lines).index
  lines.splice(aoStartIdx, aoStopIdx - aoStartIdx, ...accessors)

  writeFileSync(filePath, lines.join('\n'), { encoding: 'utf-8' })

  console.log('API interfaces generated.')
}

const updateModelTypes = (resources: Record<string, ApiRes>): void => {
  const filePath = 'src/model.ts'

  const cl = readFileSync(filePath, { encoding: 'utf-8' })

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
    exp = exp.replace(/##__RESOURCE_TYPE__##/, type)
    exp = exp.replace(/##__RESOURCE_MODELS__##/, res.models.join(', '))
    exp = exp.replace(/##__RESOURCE_BASE_MODEL__##/g, String(res.models[0]))
    exports.push(exp)
    types.push(`\t'${type}'`)
  })

  const expStartIdx = findLine('##__MODEL_TYPES_START__##', lines).index + 2
  const expStopIdx = findLine('##__MODEL_TYPES_STOP__##', lines).index
  lines.splice(expStartIdx, expStopIdx - expStartIdx, ...exports)

  writeFileSync(filePath, lines.join('\n'), { encoding: 'utf-8' })
  formatCode(filePath)

  console.log('Model types generated.')
}

const updateApiResources = (resources: Record<string, ApiRes>): void => {
  const filePath = 'src/enum.ts'

  const cl = readFileSync(filePath, { encoding: 'utf-8' })

  const lines = cl.split('\n')

  const types: string[] = []

  const singletons: string[] = []
  const listables: string[] = []
  const creatables: string[] = []
  const updatables: string[] = []
  const deletables: string[] = []
  const taggables: string[] = []

  const fieldsets: string[] = []
  const sortables: string[] = []

  Object.entries(resources).forEach(([type, res]) => {
    const _pathAndName = res.singleton ? Inflector.singularize(type) : type

    const tabType = `\t'${type}'`
    types.push(tabType)

    if (res.singleton) singletons.push(tabType)
    if (res.operations.includes('list')) listables.push(tabType)
    if (res.operations.includes('create')) creatables.push(tabType)
    if (res.operations.includes('update')) updatables.push(tabType)
    if (res.operations.includes('delete')) deletables.push(tabType)
    if (res.taggable) taggables.push(tabType)

    fieldsets.push(`\t${res.type}: models.${Inflector.singularize(res.apiClass)}`)
    sortables.push(`\t${res.type}: models.${Inflector.singularize(res.apiClass)}Sort`)
  })

  const resStartIdx = findLine('##__API_RESOURCE_LIST_START__##', lines).index + 1
  const resStopIdx = findLine('##__API_RESOURCE_LIST_STOP__##', lines).index
  lines.splice(resStartIdx, resStopIdx - resStartIdx, types.join(',\n'))

  const rsStartIdx = findLine('##__API_RESOURCE_SINGLETON_START__##', lines).index + 1
  const rsStopIdx = findLine('##__API_RESOURCE_SINGLETON_STOP__##', lines).index
  lines.splice(rsStartIdx, rsStopIdx - rsStartIdx, singletons.join(',\n'))

  const rlStartIdx = findLine('##__API_RESOURCE_NOT_LISTABLE_START__##', lines).index + 1
  const rlStopIdx = findLine('##__API_RESOURCE_NOT_LISTABLE_STOP__##', lines).index
  lines.splice(rlStartIdx, rlStopIdx - rlStartIdx, singletons.join('\n|'))

  const rcStartIdx = findLine('##__API_RESOURCE_CREATABLE_START__##', lines).index + 1
  const rcStopIdx = findLine('##__API_RESOURCE_CREATABLE_STOP__##', lines).index
  lines.splice(rcStartIdx, rcStopIdx - rcStartIdx, creatables.join(',\n'))

  const ruStartIdx = findLine('##__API_RESOURCE_UPDATABLE_START__##', lines).index + 1
  const ruStopIdx = findLine('##__API_RESOURCE_UPDATABLE_STOP__##', lines).index
  lines.splice(ruStartIdx, ruStopIdx - ruStartIdx, updatables.join(',\n'))

  const rdStartIdx = findLine('##__API_RESOURCE_DELETABLE_START__##', lines).index + 1
  const rdStopIdx = findLine('##__API_RESOURCE_DELETABLE_STOP__##', lines).index
  lines.splice(rdStartIdx, rdStopIdx - rdStartIdx, deletables.join(',\n'))

  const rtStartIdx = findLine('##__API_RESOURCE_TAGGABLE_START__##', lines).index + 1
  const rtStopIdx = findLine('##__API_RESOURCE_TAGGABLE_STOP__##', lines).index
  lines.splice(rtStartIdx, rtStopIdx - rtStartIdx, taggables.join(',\n'))

  const rfStartIdx = findLine('##__API_RESOURCE_FIELDS_START__##', lines).index + 1
  const rfStopIdx = findLine('##__API_RESOURCE_FIELDS_STOP__##', lines).index
  lines.splice(rfStartIdx, rfStopIdx - rfStartIdx, fieldsets.join(',\n'))

  const sfStartIdx = findLine('##__API_RESOURCE_SORTABLE_FIELDS_START__##', lines).index + 1
  const sfStopIdx = findLine('##__API_RESOURCE_SORTABLE_FIELDS_STOP__##', lines).index
  lines.splice(sfStartIdx, sfStopIdx - sfStartIdx, sortables.join(',\n'))

  writeFileSync(filePath, lines.join('\n'), { encoding: 'utf-8' })
  formatCode(filePath)

  console.log('API resources generated.')
}

const updateAdapters = (resources: Record<string, ApiRes>): void => {
  const filePath = 'src/api.ts'

  const cl = readFileSync(filePath, { encoding: 'utf-8' })

  const lines = cl.split('\n')

  // Exports
  const expTplLine = findLine('##__API_RESOURCES_TEMPLATE::', lines)
  const expTplIdx = expTplLine.offset + '##__API_RESOURCES_TEMPLATE::'.length + 1
  const expTpl = expTplLine.text.substring(expTplIdx)

  const exports: string[] = [copyrightHeader(templates.header)]

  Object.entries(resources).forEach(([type, res]) => {
    const pathAndName = res.singleton ? Inflector.singularize(type) : type

    let exp = expTpl
    exp = exp.replace(/##__TAB__##/g, '\t')
    exp = exp.replace(/##__RESOURCE_TYPE__##/, type)
    exp = exp.replace(/##__RESOURCE_CLASS__##/, res.apiClass)
    exp = exp.replace(/##__RESOURCE_PATH__##/, pathAndName)
    exp = exp.replace(/##__RESOURCE_INSTANCE__##/, pathAndName /* fixReservedWord(pathAndName) */)
    exp = exp.replace(/##__RESOURCE_MODEL__##/, Inflector.singularize(res.apiClass))
    exports.push(exp)
  })

  const expStartIdx = findLine('##__API_RESOURCES_START__##', lines).index + 2
  const expStopIdx = findLine('##__API_RESOURCES_STOP__##', lines).index
  lines.splice(expStartIdx, expStopIdx - expStartIdx, ...exports)

  writeFileSync(filePath, lines.join('\n'), { encoding: 'utf-8' })
  formatCode(filePath)

  console.log('Resource adapters generated.')
}

const generateSpec = (type: string, name: string, resource: Resource): string => {
  let spec = templates.spec

  // Remove unsupported operations
  const lines = spec.split('\n')

  const allOperations = ['list', 'create', 'retrieve', 'update', 'delete', 'singleton']

  let singleton = false

  // Generate CRUD operations specs
  allOperations.forEach((op) => {
    if (
      !Object.values(resource.operations)
        .map((o) => {
          if (o.name === 'list' && o.singleton) {
            singleton = true
            return 'singleton'
          } else return o.name
        })
        .includes(op)
    ) {
      const opStartIdx = findLine(`spec.${op}.start`, lines).index - 2
      const opStopIdx = findLine(`spec.${op}.stop`, lines).index + 2
      lines.splice(opStartIdx, opStopIdx - opStartIdx, '')
    }
  })

  spec = lines.join('\n')

  if (CONFIG.RELATIONSHIP_FUNCTIONS) {
    // Generate relationships operations specs
    Object.keys(resource.operations)
      .filter((o) => !allOperations.includes(o))
      .forEach((o) => {
        const op = resource.operations[o]
        if (op.relationship) {
          let specRel = templates.spec_relationship.split('\n').join('\n\t')

          specRel = specRel.replace(/##__OPERATION_NAME__##/g, op.name)
          specRel = specRel.replace(/##__RELATIONSHIP_TYPE__##/g, op.relationship.type)
          spec = spec.replace(/##__RELATIONSHIP_SPECS__##/g, '\n\n\t' + specRel + '\n\t##__RELATIONSHIP_SPECS__##')
        }
      })
  }

  if (CONFIG.TRIGGER_FUNCTIONS) {
    // Generate triggers operations specs
    const compUpdKey = Object.keys(resource.components).find((c) => c.endsWith('Update'))
    if (compUpdKey) {
      const compUpd = resource.components[compUpdKey]
      const triggers = Object.values(compUpd.attributes).filter((a) => a.name.startsWith('_'))
      if (triggers.length > 0) {
        const tplt = templates.spec_trigger.split('\n').join('\n\t')
        for (const trigger of triggers) {
          const triggerValue = trigger.type === 'boolean' ? 'true' : `randomValue('${trigger.type}')`
          const triggerParams = trigger.type === 'boolean' ? 'id' : 'id, triggerValue'
          let specTrg = tplt
          specTrg = specTrg.replace(/##__OPERATION_NAME__##/g, trigger.name)
          specTrg = specTrg.replace(/##__TRIGGER_VALUE__##/g, triggerValue)
          specTrg = specTrg.replace(/##__TRIGGER_PARAMS__##/g, triggerParams)
          spec = spec.replace(/##__TRIGGER_SPECS__##/g, '\n\n\t' + specTrg + '\n\t##__TRIGGER_SPECS__##')
        }
      }
    }
  }

  // Header
  spec = copyrightHeader(spec)

  const pathAndName = singleton ? Inflector.singularize(type) : type
  const importInstances: string[] = [pathAndName /* fixReservedWord(pathAndName) */]

  spec = spec.replace(/##__RESOURCE_CLASS__##/g, name)
  spec = spec.replace(/##__RESOURCE_TYPE__##/g, type)
  spec = spec.replace(/##__RESOURCE_PATH__##/g, pathAndName)
  spec = spec.replace(/##__RESOURCE_INSTANCE__##/g, pathAndName /* fixReservedWord(pathAndName) */)
  // For STI parents the type-guard rejects the abstract type — the auto-
  // generated spec needs to assert against a concrete child type instead.
  // Pick the first child's plural id; non-STI resources keep `resourceType`.
  const sampleResourceType =
    resource.stiChildren && resource.stiChildren.length > 0
      ? `'${Inflector.pluralize(resource.stiChildren[0] as string)}'`
      : 'resourceType'
  spec = spec.replace(/##__SAMPLE_RESOURCE_TYPE__##/g, sampleResourceType)
  // Clear unused placeholders
  spec = spec.replace(/##__RELATIONSHIP_SPECS__##/g, '')
  spec = spec.replace(/##__TRIGGER_SPECS__##/g, '')

  if (resource.operations.create) {
    let obj = '{\n'

    // Attributes
    const reqType = resource.operations.create.requestType
    const attributes = reqType ? resource.components[reqType].attributes : {}
    const required = Object.values(attributes).filter((attr) => attr.required)
    // required.forEach(r => obj += `\t\t\t${r.name}: ${inspect(randomValue(r.type, r.name))},\n`)
    required.forEach((r) => {
      obj += `\t\t\t${r.name}: randomValue('${r.type}', '${r.name}'),\n`
    })

    // Relationships
    const relationships = reqType ? resource.components[reqType].relationships : {}
    const filtered = Object.values(relationships).filter((rel) => !rel.deprecated)
    filtered.forEach((f) => {
      if (!importInstances.includes(f.type)) importInstances.push(f.type)
      let relVal: string | string[] = `${f.type}.relationship(TestData.id)`
      if (f.cardinality === 'to_many') relVal = `[ ${relVal} ]`
      obj += `\t\t\t${f.name}: ${relVal},\n`
    })

    obj += '\t\t}\n'

    spec = spec.replace(/##__RESOURCE_ATTRIBUTES_CREATE__##/g, obj)
  }

  const modelName = String(Object.keys(resource.components)[0].replace(/(Create|Update)$/g, ''))
  spec = spec.replace(/##__RESOURCE_MODEL__##/g, modelName)
  spec = spec.replace(/##__IMPORT_INSTANCES__##/, importInstances.join(', '))

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

const triggerFunctions = (type: string, name: string, resource: Resource, operations: string[]): void => {
  const resName = name
  const compSuffix = 'Update'

  const compUpdKey = Object.keys(resource.components).find((c) => c.endsWith(compSuffix))
  if (compUpdKey) {
    const compUpd = resource.components[compUpdKey]
    const triggers = Object.values(compUpd.attributes).filter((a) => a.name.startsWith('_'))
    if (triggers.length > 0) {
      const tplt = templates.trigger
      for (const trigger of triggers) {
        const resId = `${Inflector.underscore(type)}Id`
        const op: Operation = {
          type,
          path: `/${type}/{${resId}}`,
          name: trigger.name,
          singleton: false,
          requestType: compUpdKey,
          responseType: compUpdKey.replace(compSuffix, ''),
          id: resId,
          trigger: true,
        }

        const placeholders: Record<string, string> = {}
        if (trigger.type !== 'boolean')
          placeholders.trigger_value = fixAttributeType({
            name: '',
            type: trigger.type,
            fetchable: true,
            required: false,
            enum: [],
          })

        const tpltOp = templatedOperation(resName, trigger.name, op, tplt, placeholders)
        operations.push(tpltOp.operation)
      }
    }
  }
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
  const qryMod = new Set<string>() // Query models (Retrieve/List)
  const resMod = new Set<string>() // Resource generic models (Es. ResponseList)
  // const relMod = new Set<string>()	// Relationships models
  Object.entries(resource.operations).forEach(([opName, op]) => {
    const tpl = op.singleton ? templates.singleton : templates[opName]
    if (op.singleton) resModelType = 'ApiSingleton'
    if (tpl) {
      if (['create', 'update'].includes(opName)) qryMod.add('QueryParamsRetrieve')
      if (['retrieve', 'list'].includes(opName)) {
        /* do nothing:
					 retrieve operation is common to all resoucres
					 list operation is common to all non singleton resoucres
				*/
      } else {
        const tplOp = templatedOperation(resName, opName, op, tpl)
        operations.push(tplOp.operation)
        tplOp.types.forEach((t) => {
          declaredTypes.add(t)
        })
      }
    } else {
      if (op.relationship && CONFIG.RELATIONSHIP_FUNCTIONS) {
        const tplr = templates[`relationship_${op.relationship.cardinality.replace('to_', '')}`]
        const tplrOp = templatedOperation(resName, opName, op, tplr)
        if (op.relationship.cardinality === Cardinality.to_one) qryMod.add('QueryParamsRetrieve')
        else if (op.relationship.cardinality === Cardinality.to_many) {
          qryMod.add('QueryParamsList')
          resMod.add('ListResponse')
        }
        operations.push(tplrOp.operation)
        tplrOp.types.forEach((t) => {
          // Fix tax_calculators issue
          // relMod.add(t)	// Add releationship type
          declaredImportsModels.add(t) // Add import type
        })
      } else console.log('Unknown operation: ' + opName)
    }
  })

  const singletonResource = resModelType === 'ApiSingleton'

  // Trigger functions (only boolean)
  if (CONFIG.TRIGGER_FUNCTIONS) triggerFunctions(type, resName, resource, operations)

  if (operations && operations.length > 0) declaredImportsCommon.add('ResourcesConfig')

  res = res.replace(/##__RESOURCE_MODEL_TYPE__##/g, resModelType)
  res = res.replace(/##__RESPONSE_MODELS__##/g, resMod.size > 0 ? `, ${Array.from(resMod).join(', ')}` : '')
  res = res.replace(/##__MODEL_RESOURCE_INTERFACE__##/g, resModelInterface)
  res = res.replace(/##__IMPORT_RESOURCE_COMMON__##/, Array.from(declaredImportsCommon).join(', '))
  res = res.replace(/##__MODEL_SORTABLE_INTERFACE__##/, singletonResource ? '' : `, ${resModelInterface}Sort`)

  const importQueryModels =
    qryMod.size > 0 ? `import type { ${Array.from(qryMod).sort().reverse().join(', ')} } from '../query'` : ''
  res = res.replace(/##__IMPORT_QUERY_MODELS__##/, importQueryModels)

  // Resource definition
  res = res.replace(/##__RESOURCE_TYPE__##/g, type)
  res = res.replace(/##__RESOURCE_CLASS__##/g, resName)

  // Resource-level JSDoc — `@deprecated` when the resource is version-scoped
  // to API versions older than the current target, `@since` when introduced
  // after the catalogue's oldest supported version. Both can apply but in
  // practice they're mutually exclusive for resources.
  const resourceDeprecatedSince = resource.deprecatedSince
    ? ` Last available in API version ${resource.deprecatedSince}.`
    : ''
  let resourceJsdoc = ''
  if (resource.deprecated) resourceJsdoc = `/** @deprecated${resourceDeprecatedSince} */\n`
  else if (resource.since) resourceJsdoc = `/** @since ${resource.since} */\n`
  res = res.replace(/##__RESOURCE_DEPRECATED_JSDOC__##/g, resourceJsdoc)

  const resourceOperations = operations && operations.length > 0 ? operations.join('\n\n\t') : ''
  res = res.replace(/##__RESOURCE_OPERATIONS__##/, resourceOperations)

  // Type guard body: for STI parents, accept either the abstract `<Class>.TYPE`
  // or any concrete child type. The abstract still appears on write paths
  // (e.g. create bodies referencing the abstract URL) and on resources like
  // `stock_line_item` that have their own concrete records alongside STI
  // children, so a strict child-only check would reject legitimate inputs.
  // Non-STI resources keep the original single-equality check.
  const stiChildTypes = (resource.stiChildren ?? []).map((c) => Inflector.pluralize(c))
  const typeGuardBody =
    stiChildTypes.length > 0
      ? `!!resource.type && (resource.type === ${resName}.TYPE || [${stiChildTypes.map((t) => `'${t}'`).join(', ')}].includes(resource.type))`
      : `resource.type && (resource.type === ${resName}.TYPE)`
  res = res.replace(/##__TYPE_GUARD_BODY__##/g, typeGuardBody)

  // Interfaces export
  const typesArray = Array.from(declaredTypes)
  res = res.replace(/##__EXPORT_RESOURCE_TYPES__##/g, typesArray.join(', '))

  // Interfaces and types definition
  const modelInterfaces: string[] = []
  const resourceInterfaces: string[] = []
  const relationshipTypes: Set<string> = new Set()
  const sortableFields: string[] = []
  const filterableFields: string[] = []

  typesArray.forEach((t) => {
    const cudSuffix = getCUDSuffix(t)
    resourceInterfaces.push(`Resource${cudSuffix}`)
    const component: Component = resource.components[t]
    const tplCmp = templatedComponent(resName, t, component)
    tplCmp.models.forEach((m) => {
      if (m !== 'Resource') declaredImportsModels.add(m) // Fix resource_errors issue
    })
    modelInterfaces.push(tplCmp.component)
    if (cudSuffix)
      tplCmp.models.forEach((t) => {
        relationshipTypes.add(t)
      })
    else {
      sortableFields.push(
        'id',
        ...Object.values(component.attributes)
          .filter((f) => f.sortable && !RESOURCE_COMMON_FIELDS.includes(f.name))
          .map((f) => f.name),
      )
      filterableFields.push(
        'id',
        ...Object.values(component.attributes)
          .filter((f) => f.filterable && !RESOURCE_COMMON_FIELDS.includes(f.name))
          .map((f) => f.name),
      )
    }
  })
  // STI parents: keep the auto-generated abstract interface as a *private*
  // `<Self>Base` type (used by the Sort `Pick` source — it has every field
  // the abstract declares, including ones some children may legitimately
  // omit from their own schema). The exported `<Self>` becomes a union of
  // the concrete child types — what the API actually returns. Children's
  // modules are pulled in so the union resolves.
  let sortSource = resModelInterface
  if (resource.stiChildren && resource.stiChildren.length > 0) {
    const childClassNames = resource.stiChildren.map((c) => Inflector.camelize(c))
    const baseName = `${resModelInterface}Base`
    // Rename the abstract interface in-place to <Self>Base.
    modelInterfaces[0] = modelInterfaces[0]?.replace(
      new RegExp(`\\binterface ${resModelInterface}\\b`),
      `interface ${baseName}`,
    ) as string
    // Prepend the union type alias so it appears above the abstract.
    modelInterfaces.unshift(`type ${resModelInterface} = ${childClassNames.join(' | ')}`)
    for (const c of childClassNames) declaredImportsModels.add(c)
    sortSource = baseName
  }
  res = res.replace(/##__MODEL_INTERFACES__##/g, modelInterfaces.join('\n\n\n'))
  res = res.replace(/##__SORT_SOURCE__##/g, sortSource)
  res = res.replace(/##__IMPORT_RESOURCE_INTERFACES__##/g, resourceInterfaces.join(', '))

  res = res.replace(
    /##__MODEL_SORTABLE_FIELDS__##/g,
    sortableFields
      .map((f) => {
        return `'${f}'`
      })
      .join(' | '),
  )
  res = res.replace(
    /##__MODEL_FILTERABLE_FIELDS__##/g,
    filterableFields
      .map((f) => {
        return `'${f}'`
      })
      .join(' | '),
  )

  // Relationships definition — exclude the resource's own type, which is already
  // declared by the resource template (`<Self>Rel = ResourceRel & { type: <Self>Type }`).
  const relTypesArray = Array.from(relationshipTypes)
    .filter((i) => i !== resModelInterface)
    .map((i) => `type ${i}Rel = ResourceRel & { type: ${i}Type }`)
  res = res.replace(/##__RELATIONSHIP_TYPES__##/g, relTypesArray.length ? relTypesArray.join('\n') + '\n' : '')

  // Resources import
  const impResMod: string[] = Array.from(declaredImportsModels)
    .filter((i) => !typesArray.includes(i)) // excludes resource self reference
    .map(
      (i) =>
        `import type { ${i}${relationshipTypes.has(i) ? `, ${i}Type` : ''} } from './${Inflector.underscore(Inflector.pluralize(i))}'`,
    )
  const importStr = impResMod.join('\n') + (impResMod.length ? '\n' : '')
  res = res.replace(/##__IMPORT_RESOURCE_MODELS__##/g, importStr)

  // Singleton path override
  res = res.replace(
    /##__SINGLETON_PATH_OVERRIDE__##/,
    singletonResource ? `\n\tpath(): string {\n\t\treturn '${Inflector.singularize(type)}'\n\t}\n` : '',
  )

  // Enum types definitions

  return res
}

const templatedOperation = (
  res: string,
  name: string,
  op: Operation,
  tpl: string,
  placeholders?: Record<string, string>,
): { operation: string; types: string[] } => {
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

  const opIdVar = op.id ? Inflector.camelize(op.id, true) : ''
  if (op.relationship) {
    // Relationship
    operation = operation.replace(/##__RELATIONSHIP_TYPE__##/g, op.relationship.type)
    operation = operation.replace(
      /##__RELATIONSHIP_PATH__##/g,
      op.path.substring(1).replace('{' + op.id, '${_' + opIdVar),
    )
    operation = operation.replace(/##__RESOURCE_ID__##/g, opIdVar)
    operation = operation.replace(/##__MODEL_RESOURCE_INTERFACE__##/g, Inflector.singularize(res))
  } else if (op.trigger) {
    // Trigger
    operation = operation.replace(/##__RESOURCE_ID__##/g, opIdVar)
    operation = operation.replace(/##__MODEL_RESOURCE_INTERFACE__##/g, Inflector.singularize(res))
    operation = operation.replace(
      /##__TRIGGER_VALUE__##/,
      placeholders?.trigger_value ? ` triggerValue: ${placeholders.trigger_value},` : '',
    )
    operation = operation.replace(/##__TRIGGER_VALUE_TYPE__##/, placeholders?.trigger_value ? 'triggerValue' : 'true')
  }

  if (placeholders)
    Object.entries(placeholders).forEach(([key, val]) => {
      const plh = key.startsWith('##__') && key.endsWith('__##') ? key : `##__${key.toUpperCase()}__##`
      operation = operation.replace(plh, val)
    })

  // Prepend `@deprecated` or `@since` JSDoc to the method based on the
  // versions metadata of the underlying relationship.
  if (op.deprecated) {
    const lastAvailable = op.deprecatedSince ? ` Last available in API version ${op.deprecatedSince}.` : ''
    operation = `/**\n * @deprecated${lastAvailable}\n */\n${operation}`
  } else if (op.since) {
    operation = `/**\n * @since ${op.since}\n */\n${operation}`
  }

  operation = operation.replace(/\n/g, '\n\t')

  return { operation, types }
}

const fixAttributeType = (attr: Attribute): string => {
  if (attr.enum?.length > 0) return `${attr.enum.map((a) => `'${a}'`).join(' | ')}`
  else
    switch (attr.type) {
      case 'integer':
        return 'number'
      case 'object':
        return 'Record<string, any>'
      case 'object[]':
        return 'Array<Record<string, any>>'
      case 'json':
        return 'object'
      default:
        return attr.type
    }
}

const getCUDSuffix = (name: string): string => {
  const suffixes = ['Create', 'Update', 'Delete']
  let suffix = ''
  if (name) {
    suffixes.some((x) => {
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
  return name !== undefined && getCUDSuffix(name) !== ''
}

type ComponentEnums = { [key: string]: string }

const templatedComponent = (
  _res: string,
  name: string,
  cmp: Component,
): { component: string; models: string[]; enums: ComponentEnums } => {
  const cudModel = isCUDModel(name)

  const models: string[] = []
  const enums: ComponentEnums = {}

  // Attributes
  const attributes = Object.values(cmp.attributes)
  const fields: string[] = []
  attributes.forEach((a) => {
    if (!RESOURCE_COMMON_FIELDS.includes(a.name)) {
      if (cudModel || a.fetchable) {
        const attrType = fixAttributeType(a)
        if (a.enum) enums[a.name] = attrType
        if (a.description || a.example || a.deprecated || a.since) {
          const desc = a.description && !a.description.endsWith('.') ? `${a.description}.` : a.description
          const descLine = desc ? `\n\t * ${desc}` : ''
          const sinceLine = a.since ? `\n\t * @since ${a.since}` : ''
          const deprecatedLine = a.deprecated
            ? `\n\t * @deprecated${a.deprecatedSince ? ` Last available in API version ${a.deprecatedSince}.` : ''}`
            : ''
          const exampleLine = a.example ? `\n\t * @example \`\`\`${JSON.stringify(a.example)}\`\`\`` : ''
          fields.push(`/** ${descLine}${sinceLine}${deprecatedLine}${exampleLine}\n\t */`)
        }
        fields.push(`${a.name}${a.required ? '' : '?'}: ${attrType}${a.required ? '' : ' | null'}`)
      }
    }
  })

  // Specific resource type
  if (!cudModel) fields.unshift(`readonly type: ${name}Type\n`)

  // Relationships
  const relationships = Object.values(cmp.relationships)
  const rels: string[] = []
  relationships.forEach((r) => {
    // Fallback path: when the target resource was excluded from this build,
    // there's no proper type module to import — render as `object[]` with
    // `@deprecated` JSDoc. This is the only case where typing is degraded.
    if (r.targetExcluded) {
      const deprecated = '/**\n\t * @deprecated Target resource not available in the current API version.\n\t */\n\t'
      rels.push(`${deprecated}${r.name}?: object${r.cardinality === Cardinality.to_many ? '[]' : ''}`)
      return
    }

    // Proper-type path — used for both current and deprecated relationships.
    // Deprecated relationships get the `@deprecated` JSDoc; the underlying
    // type is the real one (the target resource is in the SDK, possibly
    // with its own `@deprecated` on the class).
    let resName = r.type
    if (resName !== 'object') {
      const relStr = cudModel ? 'Rel' : ''
      if (r.polymorphic && r.oneOf) {
        resName = r.oneOf.map((o) => `${o}${relStr}`).join(' | ')
        models.push(...r.oneOf)
      } else {
        resName = Inflector.camelize(Inflector.singularize(r.type))
        models.push(resName)
        resName += relStr
      }
    }
    if (r.cardinality === Cardinality.to_many) {
      if (r.polymorphic) resName = `Array<${resName}>`
      else resName += '[]'
    }

    let jsdoc = ''
    if (r.deprecated) {
      jsdoc = `/**\n\t * @deprecated${r.deprecatedSince ? ` Last available in API version ${r.deprecatedSince}.` : ''}\n\t */\n\t`
    } else if (r.since) {
      jsdoc = `/**\n\t * @since ${r.since}\n\t */\n\t`
    }
    rels.push(`${jsdoc}${r.name}${r.required ? '' : '?'}: ${resName}${r.required ? '' : ' | null'}`)
  })

  let component = fields.length || rels.length ? templates.model : templates.model_empty

  component = component.replace(/##__RESOURCE_MODEL__##/g, name)
  component = component.replace(/##__EXTEND_TYPE__##/g, getCUDSuffix(name))

  const fieldsStr = (fields.length ? '\n\t' : '') + fields.join('\n\t') + (fields.length && rels.length ? '\n' : '')
  const relsStr = rels.join('\n\t') + (rels.length ? '\n' : '')
  component = component.replace(/##__RESOURCE_MODEL_FIELDS__##/g, fieldsStr)
  component = component.replace(/##__RESOURCE_MODEL_RELATIONSHIPS__##/g, relsStr)

  return { component, models, enums }
}

generate(parseCliOptions(process.argv.slice(2)))
