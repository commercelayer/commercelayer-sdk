
import * as api from './api'
import { SdkError, ApiError} from './error'
import CommerceLayer, { CommerceLayerClient, CommerceLayerInitConfig } from './commercelayer'


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
	}

}
