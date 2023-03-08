
import { resourceList } from './api'
import type { ResourceId, ResourceType } from './resource'

const isResourceId = (resource: any): resource is ResourceId => {
	return (resource?.type && resource.id) && resourceList.includes(resource.type)
}

const isResourceType = (resource: any): resource is ResourceType => {
	return resource && (typeof resource.type !== 'undefined') && resource.type && resourceList.includes(resource.type)
}


export { isResourceId, isResourceType }
