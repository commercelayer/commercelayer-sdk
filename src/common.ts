/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import type { ResourceId, ResourceType } from './resource'

const isResourceId = (resource: any): resource is ResourceId => {
	return (resource.type && resource.id)
}

const isResourceType = (resource: any): resource is ResourceType => {
	return (typeof resource.type !== 'undefined') && resource.type
}


export { isResourceId, isResourceType }
