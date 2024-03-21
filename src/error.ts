import { FetchError } from './fetch'


enum ErrorType {

	CLIENT = 'client',		  // Generic Client error
	REQUEST = 'request',		// Error preparing API request
	RESPONSE = 'response',	// Error response from API
	CANCEL = 'cancel',		  // Forced request abort using interceptor
	PARSE = 'parse',		    // Error parsing API resource
  TIMEOUT = 'timeout'     // Timeout error
}


class SdkError extends Error {

	static NAME = 'SdkError'

	static isSdkError(error: any): error is SdkError {
		return error && [SdkError.NAME, ApiError.NAME].includes(error.name as string) && Object.values(ErrorType).includes(error.type as ErrorType)
	}

	type: ErrorType
	code?: string
	source?: Error

	constructor(error: { message: string, type?: ErrorType }) {
		super(error.message)
		this.name = SdkError.NAME
		this.type = error.type || ErrorType.CLIENT
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
		this.name = ApiError.NAME
	}

	first(): any {
		return (this.errors?.length > 0) ? this.errors[0] : undefined
	}

}


const isRequestError = (error: any): error is TypeError => {
	return error instanceof TypeError
}

const isCancelError = (error: any): boolean => {
	return (error instanceof DOMException) && (error.name === 'AbortError')
}

const isTimeoutError = (error: any): boolean => {
	return (error instanceof DOMException) && (error.name === 'TimeoutError')
}


const handleError = (error: Error): never => {

	let sdkError = new SdkError({ message: error.message })

	if (FetchError.isFetchError(error)) {
    // console.log('********** FetchError')
		const apiError = new ApiError(sdkError)
		apiError.type = ErrorType.RESPONSE
		apiError.status = error.status
		apiError.statusText = error.statusText
		apiError.code = String(apiError.status)
		apiError.errors = error.errors || []
		if (!apiError.message && apiError.statusText) apiError.message = apiError.statusText
		sdkError = apiError
	}
	else if (isRequestError(error)) {
    // console.log('********** RequestError')
    sdkError.type = ErrorType.REQUEST
  }
	else if (isCancelError(error)) {
    // console.log('********** CancelError')
    sdkError.type = ErrorType.CANCEL
  }
  else if (isTimeoutError(error)) {
    // console.log('********** TimeoutError')
    sdkError.type = ErrorType.TIMEOUT
  }
	else {
    // console.log('********** ClientError')
		sdkError.type = ErrorType.CLIENT
		sdkError.source = error
	}

	throw sdkError

}


export { SdkError, ApiError, ErrorType, handleError }
