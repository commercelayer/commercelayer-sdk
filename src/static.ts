
import * as api from './api'
import { SdkError, ApiError} from './error'
import CommerceLayer, { CommerceLayerClient, CommerceLayerInitConfig, OPEN_API_SCHEMA_VERSION } from './commercelayer'


/* Static functions */
export const CommerceLayerStatic = {

	resources: (): readonly string[] => {
		return api.resourceList
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
