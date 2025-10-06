
import type { ResourceTypeLock } from './enum'
import { getResources, getSingletons, isCreatable, isDeletable, isSingleton, isTaggable, isUpdatable, isVersionable } from './enum'
import { OPEN_API_SCHEMA_VERSION } from './commercelayer'
import { type SdkError, type ApiError, isSdkError, isApiError} from './error'
import { isTokenExpired } from './util'


/* Static functions */
export const CommerceLayerStatic = {

	resources: (sort?: boolean): readonly string[] => {
		return getResources(sort)
	},

	singletons: (sort?: boolean): readonly string[] => {
		return getSingletons(sort)
	},

	isSingleton: (resource: ResourceTypeLock): boolean => {
		return isSingleton(resource)
	},

	isCreatable: (resource: ResourceTypeLock): boolean => {
		return isCreatable(resource)
	},

	isUpdatable: (resource: ResourceTypeLock): boolean => {
		return isUpdatable(resource)
	},

	isDeletable: (resource: ResourceTypeLock): boolean => {
		return isDeletable(resource)
	},

	isTaggable: (resource: ResourceTypeLock): boolean => {
		return isTaggable(resource)
	},

	isVersionable: (resource: ResourceTypeLock): boolean => {
		return isVersionable(resource)
	},

	isSdkError: (error: unknown): error is SdkError => {
		return isSdkError(error)
	},

	isApiError: (error: unknown): error is ApiError => {
		return isApiError(error)
	},

	isTokenExpired: (token: string): boolean => {
		return isTokenExpired(token)
	},

	get schemaVersion(): string { return OPEN_API_SCHEMA_VERSION }

}
