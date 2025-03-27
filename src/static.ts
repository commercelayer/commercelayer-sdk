
import { OPEN_API_SCHEMA_VERSION, resourceList, singletonList, type ResourceTypeLock } from './api'
import { SdkError, ApiError} from './error'
import { isTokenExpired } from './util'


/* Static functions */
export const CommerceLayerStatic = {

	resources: (sort?: boolean): readonly string[] => {
		return sort? [ ...resourceList ].sort() : resourceList
	},

	singletons: (sort?: boolean): readonly string[] => {
		return sort? [ ...singletonList ].sort() : singletonList
	},

	isSingleton: (resource: ResourceTypeLock): boolean => {
		return singletonList.includes(resource)
	},

	isSdkError: (error: unknown): error is SdkError => {
		return SdkError.isSdkError(error)
	},

	isApiError: (error: unknown): error is ApiError => {
		return ApiError.isApiError(error)
	},

	isTokenExpired: (token: string): boolean => {
		return isTokenExpired(token)
	},

	get schemaVersion(): string { return OPEN_API_SCHEMA_VERSION }

}
