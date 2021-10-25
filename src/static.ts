
import * as api from './api'
import ApiError from './error'


/* Static functions */
export const CommerceLayerStatic = {

	resources: (): readonly string[] => {
		return api.resourceList
	},

	isApiError: (error: unknown): error is ApiError => {
		return ApiError.isApiError(error)
	},

}
