/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosError, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse, Cancel } from "axios"


type InterceptorManager = {
	request: AxiosInterceptorManager<AxiosRequestConfig>;
	response: AxiosInterceptorManager<any>
}


type RequestObj = AxiosRequestConfig
type RequestInterceptor = (request: RequestObj) => RequestObj | Promise<RequestObj>

type ResponseObj = AxiosResponse
type ResponseInterceptor = (response: ResponseObj) => ResponseObj

type ErrorObj = AxiosError
type ErrorInterceptor = (error: ErrorObj) => ErrorObj

type InterceptorType = 'request' | 'response'

type CancelRequestException = Cancel


export type { InterceptorManager, RequestInterceptor, ResponseInterceptor, ErrorInterceptor, InterceptorType }
export type { RequestObj, ResponseObj, ErrorObj }
export type { CancelRequestException }



type RawResponseReader = {
	id: number | undefined;
	rawResponse: ResponseObj | undefined;
}


export type { RawResponseReader }
