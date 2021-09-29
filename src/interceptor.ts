/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosInterceptorManager, AxiosRequestConfig } from "axios"


type InterceptorManager = {
	request: AxiosInterceptorManager<AxiosRequestConfig>;
	response: AxiosInterceptorManager<any>
}


type RequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>

type ResponseInterceptor = (response: unknown) => unknown

type ErrorInterceptor = (error: unknown) => unknown

type InterceptorType = 'request' | 'response'


export type { InterceptorManager, RequestInterceptor, ResponseInterceptor, ErrorInterceptor, InterceptorType }
