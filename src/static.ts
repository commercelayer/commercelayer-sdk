
import * as api from './api'
import { SdkError, ApiError} from './error'


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

}
