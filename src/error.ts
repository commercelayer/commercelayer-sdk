/* eslint-disable @typescript-eslint/no-explicit-any */

enum ErrorType {
	CLIENT = 'client',
	REQUEST = 'request',
	RESPONSE = 'response',
	GENERIC = 'generic',
	CANCEL = 'cancel',
}


class SdkError extends Error {

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static isSdkError(error: any): error is ApiError {
		return error && ['SdkError', 'ApiError'].includes(error.name) && Object.values(ErrorType).includes(error.type)
	}

	type: string
	code?: string
	source?: Error
	request?: any

	constructor(error: { message: string, type?: ErrorType }) {
		super(error.message)
		this.name = this.constructor.name
		this.type = error.type || ErrorType.GENERIC
	}

}

class ApiError extends SdkError {

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static isApiError(error: any): error is ApiError {
		return SdkError.isSdkError(error) && (error.name === 'ApiError') && (error.type === ErrorType.RESPONSE)
	}

	errors: any[] = []
	status?: number

	constructor(error: SdkError)
	constructor(error: { message: string }) {
		super({ ...error, type: ErrorType.RESPONSE })
		this.name = this.constructor.name
	}

	first(): any {
		return (this.errors.length > 0) ? this.errors[0] : undefined
	}

}


export { SdkError, ApiError, ErrorType }
