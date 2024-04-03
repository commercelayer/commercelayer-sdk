import type { FetchError, FetchRequestOptions } from "./fetch"

type InterceptorEventManager<S extends (RequestInterceptor | ResponseInterceptor), F extends (ErrorInterceptor | ResponseInterceptor)> = {
	onSuccess?: S
	onFailure?: F
}


type RequestEventManager = InterceptorEventManager<RequestInterceptor, ErrorInterceptor>
type ResponseEventManager = InterceptorEventManager<ResponseInterceptor, ErrorInterceptor>
type ErrorEventManager = InterceptorEventManager<ResponseInterceptor, ResponseInterceptor>


type InterceptorManager = {
	request?: RequestEventManager
	response?: ResponseEventManager
	rawReader?: ErrorEventManager
}


// Request
type RequestObj = { url: URL, options: FetchRequestOptions }
type RequestInterceptor = (request: RequestObj) => RequestObj | Promise<RequestObj>

// Response
type ResponseObj = Response
type ResponseInterceptor = (response: ResponseObj) => ResponseObj | Promise<ResponseObj>

// Headers
type ApiHeadersList = 'x-ratelimit-limit' | 'x-ratelimit-count' | 'x-ratelimit-period' | 'x-ratelimit-interval' | 'x-ratelimit-remaining'
type ApiHeaders = { [key in ApiHeadersList]: string | number | boolean }
type HeadersObj = Record<string, string> | ApiHeaders

// Error
type ErrorObj = FetchError
type ErrorInterceptor = (error: ErrorObj) => ErrorObj | Promise<ErrorObj>

type InterceptorType = 'request' | 'response'


export type { InterceptorManager, RequestInterceptor, ResponseInterceptor, ErrorInterceptor, InterceptorType }
export type { RequestObj, ResponseObj, ErrorObj, HeadersObj }



type RawResponseReader = {
	id: number
	rawResponse?: any
	headers?: HeadersObj
	ok: boolean
}


export type { RawResponseReader }
