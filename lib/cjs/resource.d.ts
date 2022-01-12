import { ApiClientInitConfig } from './client';
import { QueryParamsRetrieve, QueryParamsList } from './query';
import { ResourceTypeLock } from './api';
import { InterceptorManager } from './interceptor';
import { Value as JSONValue } from 'json-typescript';
declare type Metadata = {
    [key: string]: JSONValue;
};
interface ResourceType {
    readonly type: ResourceTypeLock;
}
interface ResourceId extends ResourceType {
    readonly id: string;
}
interface Resource extends ResourceId {
    reference?: string;
    reference_origin?: string;
    metadata?: Metadata;
    readonly created_at: string;
    readonly updated_at: string;
}
interface ResourceCreate {
    reference?: string;
    reference_origin?: string;
    metadata?: Metadata;
}
interface ResourceUpdate {
    readonly id: string;
    reference?: string;
    reference_origin?: string;
    metadata?: Metadata;
}
declare type ListMeta = {
    readonly pageCount: number;
    readonly recordCount: number;
    readonly currentPage: number;
    readonly recordsPerPage: number;
};
declare class ListResponse<R> extends Array<R> {
    readonly meta: ListMeta;
    constructor(meta: ListMeta, data: Array<R>);
    first(): R | undefined;
    last(): R | undefined;
    get(index: number): R | undefined;
}
export type { Metadata, ResourceType, ResourceId, Resource, ResourceCreate, ResourceUpdate, ListResponse };
declare type ResourceAdapterConfig = {};
declare type ResourcesInitConfig = ResourceAdapterConfig & ApiClientInitConfig;
declare type ResourcesConfig = Partial<ResourcesInitConfig>;
declare class ResourceAdapter {
    #private;
    constructor(config: ResourcesInitConfig);
    get interceptors(): InterceptorManager;
    private localConfig;
    config(config: ResourcesConfig): void;
    singleton<R extends Resource>(resource: ResourceType, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<R>;
    retrieve<R extends Resource>(resource: ResourceId, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<R>;
    list<R extends Resource>(resource: ResourceType, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<R>>;
    create<C extends ResourceCreate, R extends Resource>(resource: C & ResourceType, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<R>;
    update<U extends ResourceUpdate, R extends Resource>(resource: U & ResourceId, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<R>;
    delete(resource: ResourceId, options?: ResourcesConfig): Promise<void>;
}
declare abstract class ApiResource {
    static readonly TYPE: ResourceTypeLock;
    protected resources: ResourceAdapter;
    constructor(adapter: ResourceAdapter);
    abstract relationship(id: string | ResourceId): ResourceId;
    abstract type(): string;
}
export default ResourceAdapter;
export { ApiResource, ResourcesConfig, ResourcesInitConfig };
