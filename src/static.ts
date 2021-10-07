
import * as api from './api'
import ApiError from './error'


/* Static functions */
export const CommerceLayerStatic = {

	resources: (): readonly string[] => {
		return api.resourceList
	},

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isApiError: (error: any): error is ApiError => {
		return ApiError.isApiError(error)
	},

}
