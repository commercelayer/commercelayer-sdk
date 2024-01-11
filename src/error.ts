import axios from 'axios'

enum ErrorType {
	CLIENT 		= 'client',		// Error instantiating the client
	REQUEST 	= 'request',	// Error preparing API request
	RESPONSE 	= 'response',	// Error response from API
	CANCEL 		= 'cancel',		// Forced request abort using interceptor
	PARSE 		= 'parse',		// Error parsing API resource
	GENERIC 	= 'generic',	// Other not specified errors
}


class SdkError extends Error {

	static NAME = 'SdkError'

	static isSdkError(error: any): error is SdkError {
		return error && [SdkError.NAME, ApiError.NAME].includes(error.name as string) && Object.values(ErrorType).includes(error.type as ErrorType)
	}

	type: ErrorType
	code?: string
	source?: Error
	request?: any

	constructor(error: { message: string, type?: ErrorType }) {
		super(error.message)
		this.name = SdkError.NAME// this.constructor.name
		this.type = error.type || ErrorType.GENERIC
	}

}

class ApiError extends SdkError {

	static NAME = 'ApiError'

	static isApiError(error: any): error is ApiError {
		return SdkError.isSdkError(error) && (error.name === ApiError.NAME) && (error.type === ErrorType.RESPONSE)
	}

	errors: any[] = []
	status?: number
	statusText?: string

	constructor(error: SdkError)
	constructor(error: { message: string }) {
		super({ ...error, type: ErrorType.RESPONSE })
		this.name = ApiError.NAME// this.constructor.name
	}

	first(): any {
		return (this.errors?.length > 0) ? this.errors[0] : undefined
	}

}



const handleError = (error: Error): never => {

	let sdkError = new SdkError({ message: error.message })

	if (axios.isAxiosError(error)) {
		if (error.response) {
			// The request was made and the server responded with a status code that falls out of the range of 2xx
			const apiError = new ApiError(sdkError)
			apiError.type = ErrorType.RESPONSE
			apiError.status = error.response.status
			apiError.statusText = error.response.statusText
			apiError.code = String(apiError.status)
			apiError.errors = error.response.data.errors
			if (!apiError.message && apiError.statusText) apiError.message = apiError.statusText
			sdkError = apiError
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
			sdkError.type = ErrorType.REQUEST
			sdkError.request = error.request
		} else {
			// Something happened in setting up the request that triggered an Error
			sdkError.type = ErrorType.CLIENT
		}
	} else if (axios.isCancel(error)) sdkError.type = ErrorType.CANCEL
	else sdkError.source = error

	throw sdkError

}


export { SdkError, ApiError, ErrorType, handleError }
