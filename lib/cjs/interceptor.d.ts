import { AxiosError, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from "axios";
declare type InterceptorManager = {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<any>;
};
declare type RequestObj = AxiosRequestConfig;
declare type RequestInterceptor = (request: RequestObj) => RequestObj | Promise<RequestObj>;
declare type ResponseObj = AxiosResponse;
declare type ResponseInterceptor = (response: ResponseObj) => ResponseObj;
declare type ErrorObj = AxiosError;
declare type ErrorInterceptor = (error: ErrorObj) => ErrorObj;
declare type InterceptorType = 'request' | 'response';
export type { InterceptorManager, RequestInterceptor, ResponseInterceptor, ErrorInterceptor, InterceptorType };
export type { RequestObj, ResponseObj, ErrorObj };
declare type RawResponseReader = {
    id: number | undefined;
    rawResponse: ResponseObj | undefined;
};
export type { RawResponseReader };
