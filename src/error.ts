
enum ErrorType {
	CLIENT = 'client',
	REQUEST = 'request',
	RESPONSE = 'response',
	GENERIC = 'generic',
	CANCEL = 'cancel',
}


class SdkError extends Error {

	static NAME = 'SdkError'

	static isSdkError(error: any): error is ApiError {
		return error && [SdkError.NAME, ApiError.NAME].includes(error.name) && Object.values(ErrorType).includes(error.type)
	}

	type: string
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


export { SdkError, ApiError, ErrorType }
