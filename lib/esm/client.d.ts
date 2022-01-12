import { Method } from 'axios';
import type { DocWithData as JSONApiDocument, ResourceObject as JSONApiResource } from 'jsonapi-typescript';
import type { InterceptorManager } from './interceptor';
declare type RequestConfig = {
    timeout?: number;
    params?: {
        [key: string]: string | number | boolean;
    };
};
declare type ApiClientInitConfig = {
    organization: string;
    domain?: string;
    accessToken: string;
} & RequestConfig;
declare type ApiClientConfig = Partial<ApiClientInitConfig>;
declare class ApiClient {
    #private;
    static create(options: ApiClientInitConfig): ApiClient;
    baseUrl: string;
    interceptors: InterceptorManager;
    private constructor();
    config(config: ApiClientConfig): void;
    request(method: Method, path: string, body?: JSONApiResource, options?: ApiClientConfig): Promise<JSONApiDocument>;
}
export default ApiClient;
export { ApiClientInitConfig, ApiClientConfig, RequestConfig };
