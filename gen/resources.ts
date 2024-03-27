import { readFileSync, writeFileSync } from "fs"
import { resolve } from "path"
import Inflector from './inflector'


const RESOURCES_LOCAL_PATH = resolve('./gen/resources.json')
const RESOURCES_REMOTE_URL = 'https://core.commercelayer.io/api/public/resources'


const downloadResources = async (url?: string): Promise<any> => {

	const resourcesUrl = url || RESOURCES_REMOTE_URL
	const resourcesOutPath = RESOURCES_LOCAL_PATH

	console.log(`Downloading resources ... [${resourcesUrl}]`)

	const response = await fetch(resourcesUrl)
	const resources = (await response.json()).data

	if (resources) writeFileSync(resourcesOutPath, JSON.stringify(resources, null, 4))
	else console.log('Resources file is empty!')

	return resources

}


const loadResources = (): any => {

	const schemaPath = RESOURCES_LOCAL_PATH

	console.log(`Loading resources ... [${schemaPath}]`)

	try {
		const schema = readFileSync(schemaPath, { encoding: 'utf-8'})
		return JSON.parse(schema)
	} catch (error) {
		console.log('Error loading local resources schema: ' + schemaPath)
		return undefined
	}

}


const getResource = (resources: any[], resId: string): { fields: any, relationships: any } => {
  return resources.find(r => r.id === resId)
}

const getResourceFields = (resources: any[] | any, resId: string): any => {
  return (Array.isArray(resources)? getResource(resources, resId) : resources)?.attributes.fields
}

const getResourceRelationships = (resources: any[] | any, resId: string): any => {
  return (Array.isArray(resources)? getResource(resources, resId) : resources)?.attributes.relationships
}


export default {
	download: downloadResources,
	load: loadResources,
  getResource,
  getResourceFields,
  getResourceRelationships,
	localPath: RESOURCES_LOCAL_PATH,
	remoteUrl: RESOURCES_REMOTE_URL
}
