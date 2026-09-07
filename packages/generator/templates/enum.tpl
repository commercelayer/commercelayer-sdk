import type { Resource, ResourceRel } from '@runtime/resource'
import type * as models from './model'
// ##__IF_TAGGABLE__##
import type { TagType } from './resources/tags'
// ##__END_IF_TAGGABLE__##

const apiResources = [
  // ##__API_RESOURCE_LIST_START__##
  // ##__API_RESOURCE_LIST_STOP__##
] as const

export type ResourceTypeLock = (typeof apiResources)[number]
export const resourceList: readonly ResourceTypeLock[] = apiResources

// Singleton resources
export const singletonList = [
  // ##__API_RESOURCE_SINGLETON_START__##
  // ##__API_RESOURCE_SINGLETON_STOP__##
] as const

// Retrievable resources
export type RetrievableResourceType = ResourceTypeLock

export type RetrievableResource = Resource & {
  type: RetrievableResourceType
}

// Listable resources
export type ListableResourceType = Exclude<
  ResourceTypeLock,
  // ##__API_RESOURCE_NOT_LISTABLE_START__##
  // ##__API_RESOURCE_NOT_LISTABLE_STOP__##
>

export type ListableResource = Resource & {
  type: ListableResourceType
}

// Creatable resources
export const creatableResources = [
  // ##__API_RESOURCE_CREATABLE_START__##
  // ##__API_RESOURCE_CREATABLE_STOP__##
] as const

export type CreatableResourceType = (typeof creatableResources)[number]
export type CreatableResource = Resource & {
  type: CreatableResourceType
}

// Updatable resources
export const updatableResources = [
  // ##__API_RESOURCE_UPDATABLE_START__##
  // ##__API_RESOURCE_UPDATABLE_STOP__##
] as const

export type UpdatableResourceType = (typeof updatableResources)[number]
export type UpdatableResource = Resource & {
  type: UpdatableResourceType
}

// Deletable resources
export const deletableResources = [
  // ##__API_RESOURCE_DELETABLE_START__##
  // ##__API_RESOURCE_DELETABLE_STOP__##
] as const

export type DeletableResourceType = (typeof deletableResources)[number]
export type DeletableResource = Resource & {
  type: DeletableResourceType
}

// ##__IF_TAGGABLE__##
// Taggable resources
export const taggableResources = [
  // ##__API_RESOURCE_TAGGABLE_START__##
  // ##__API_RESOURCE_TAGGABLE_STOP__##
] as const

export type TaggableResourceType = (typeof taggableResources)[number]
export type TaggableResource = Resource & {
  type: TaggableResourceType
  tags?: Array<ResourceRel & { type: TagType }> | null
}
// ##__END_IF_TAGGABLE__##

// Utility functions
export function getResources(sort?: boolean): readonly ResourceTypeLock[] {
  return sort ? [...resourceList].sort() : resourceList
}

export function getSingletons(sort?: boolean): readonly string[] {
  return sort ? [...singletonList].sort() : singletonList
}

export function isSingleton(resource: ResourceTypeLock): boolean {
  return (singletonList as readonly ResourceTypeLock[]).includes(resource)
}

export function isCreatable(resource: ResourceTypeLock): boolean {
  return (creatableResources as readonly ResourceTypeLock[]).includes(resource)
}

export function isUpdatable(resource: ResourceTypeLock): boolean {
  return (updatableResources as readonly ResourceTypeLock[]).includes(resource)
}

export function isDeletable(resource: ResourceTypeLock): boolean {
  return (deletableResources as readonly ResourceTypeLock[]).includes(resource)
}

// ##__IF_TAGGABLE__##
export function isTaggable(resource: ResourceTypeLock): boolean {
  return (taggableResources as readonly ResourceTypeLock[]).includes(resource)
}
// ##__END_IF_TAGGABLE__##

// Helper types
export type ResourceFields = {
  // ##__API_RESOURCE_FIELDS_START__##
  // ##__API_RESOURCE_FIELDS_STOP__##
}

export type ResourceSortFields = {
  // ##__API_RESOURCE_SORTABLE_FIELDS_START__##
  // ##__API_RESOURCE_SORTABLE_FIELDS_STOP__##
}
