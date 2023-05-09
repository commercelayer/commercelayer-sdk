
import type { AxiosError, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders, RawAxiosResponseHeaders } from 'axios'


type InterceptorManager = {
	request: AxiosInterceptorManager<AxiosRequestConfig>;
	response: AxiosInterceptorManager<any>
}


// Request
type RequestObj = AxiosRequestConfig
type RequestInterceptor = (request: RequestObj) => RequestObj | Promise<RequestObj>

// Response
type ResponseObj = AxiosResponse
type ResponseInterceptor = (response: ResponseObj) => ResponseObj

// Headers
type ApiHeadersList = 'x-ratelimit-limit' | 'x-ratelimit-count' | 'x-ratelimit-period' | 'x-ratelimit-interval' | 'x-ratelimit-remaining'
type ApiHeaders = { [key in ApiHeadersList]: string | number | boolean }
type HeadersObj = (AxiosResponseHeaders | RawAxiosResponseHeaders) & ApiHeaders


type ErrorObj = AxiosError
type ErrorInterceptor = (error: ErrorObj) => ErrorObj

type InterceptorType = 'request' | 'response'


export type { InterceptorManager, RequestInterceptor, ResponseInterceptor, ErrorInterceptor, InterceptorType }
export type { RequestObj, ResponseObj, ErrorObj, HeadersObj }



type RawResponseReader = {
	id: number | undefined;
	rawResponse: ResponseObj | undefined;
	headers: HeadersObj | undefined;
}


export type { RawResponseReader }
