/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { resourceList } from './api'
import type { ResourceId, ResourceType } from './resource'

const isResourceId = (resource: any): resource is ResourceId => {
	return (resource && resource.type && resource.id) && resourceList.includes(resource.type)
}

const isResourceType = (resource: any): resource is ResourceType => {
	return resource && (typeof resource.type !== 'undefined') && resource.type && resourceList.includes(resource.type)
}


export { isResourceId, isResourceType }
