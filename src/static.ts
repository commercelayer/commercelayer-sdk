
import { resourceList, singletonList, type ResourceTypeLock } from './api'
import { SdkError, ApiError} from './error'
import CommerceLayer, { OPEN_API_SCHEMA_VERSION } from './commercelayer'
import type { CommerceLayerClient, CommerceLayerInitConfig } from './commercelayer'


/* Static functions */
export const CommerceLayerStatic = {

	resources: (sort?: boolean): readonly string[] => {
		return sort? [ ...resourceList ].sort() : resourceList
	},

	singletons: (sort?: boolean): readonly string[] => {
		return sort? [ ...singletonList ].sort() : singletonList
	},

	isSingleton: (resource: ResourceTypeLock): boolean => {
		return (singletonList as unknown as ResourceTypeLock[]).includes(resource)
	},

	isSdkError: (error: unknown): error is SdkError => {
		return SdkError.isSdkError(error)
	},

	isApiError: (error: unknown): error is ApiError => {
		return ApiError.isApiError(error)
	},

	init: (config: CommerceLayerInitConfig): CommerceLayerClient => {
		return CommerceLayer(config)
	},

	get schemaVersion(): string { return OPEN_API_SCHEMA_VERSION }

}
