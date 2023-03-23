
import { resourceList } from './api'
import type { ResourceId, ResourceType } from './resource'

const isResourceId = (resource: any): resource is ResourceId => {
	return (resource?.type && resource.id) && resourceList.includes(resource.type)
}

const isResourceType = (resource: any): resource is ResourceType => {
	return resource && (typeof resource.type !== 'undefined') && resource.type && resourceList.includes(resource.type)
}


export { isResourceId, isResourceType }

/*
// Nullable types
type StringNullable = string | null
type NumberNullable = number | null
type BooleanNullable = boolean | null
type ResourceNullable<R extends Resource> = R | null
type ResourceArrayNullable<R extends Resource> = R[] | null


export type { StringNullable, NumberNullable, BooleanNullable, ResourceNullable, ResourceArrayNullable }
*/
