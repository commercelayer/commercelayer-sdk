
import ApiClient, { ApiClientInitConfig } from './client'
import { denormalize, normalize } from './jsonapi'
import { QueryParamsRetrieve, QueryParamsList, generateQueryStringParams } from './query'
import { ResourceTypeLock } from './api'
import config from './config'
import { InterceptorManager } from './interceptor'

import Debug from './debug'
import { QueryParams } from '.'
const debug = Debug('resource')



type ResourceNull = { id: null } & ResourceType
type ResourceRel = ResourceId | ResourceNull


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Metadata = { [key: string]: any }


interface ResourceType {
	readonly type: ResourceTypeLock
}


interface ResourceId extends ResourceType {
	readonly id: string
}


interface Resource extends ResourceId {
	reference?: string;
	reference_origin?: string;
	metadata?: Metadata
	readonly created_at: string
	readonly updated_at: string
}


interface ResourceCreate {
	reference?: string;
	reference_origin?: string;
	metadata?: Metadata
}


interface ResourceUpdate {
	readonly id: string
	reference?: string;
	reference_origin?: string;
	metadata?: Metadata
}


type ListMeta = {
	readonly pageCount: number
	readonly recordCount: number
	readonly currentPage: number
	readonly recordsPerPage: number
}

class ListResponse<R> extends Array<R> {

	readonly meta: ListMeta

	constructor(meta: ListMeta, data: R[]) {
		super(...(data || []))
		this.meta = meta
	}

	first(): R | undefined { return this.length ? this[0] : undefined }
	last(): R | undefined { return this.length ? this[this.length - 1] : undefined }
	get(index: number): R | undefined { return (this.length && (index >= 0)) ? this[index] : undefined }
	// getMetaInfo(): ListMeta { return this.meta }
	// hasNextPage(): boolean { return (this.meta.currentPage < this.meta.pageCount) }
	// hasPrevPage(): boolean { return (this.meta.currentPage > 1) }
	// recordCount(): number { return this.meta.recordCount }
	// pageCount(): number { return this.meta.pageCount }
	// get metaInfo(): ListMeta { return this.meta }
	// get recordCount(): number { return this.meta.recordCount }
	// get pageCount(): number { return this.meta.pageCount }

}



export type { Metadata, ResourceType, ResourceId, Resource, ResourceCreate, ResourceUpdate, ListResponse, ResourceRel }


// Resource adapters local configuration
type ResourceAdapterConfig = {
	// xyz?: boolean
}

type ResourcesInitConfig = ResourceAdapterConfig & ApiClientInitConfig
type ResourcesConfig = Partial<ResourcesInitConfig>


class ResourceAdapter {

	#client: ApiClient

	#config: ResourceAdapterConfig = {}


	constructor(config: ResourcesInitConfig) {
		this.#client = ApiClient.create(config)
		this.localConfig(config)
	}


	get interceptors(): InterceptorManager { return this.#client.interceptors }


	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	private localConfig(config: ResourceAdapterConfig): void {
		// if (typeof config.xyz !== 'undefined') this.#config.xyz = config.xyz
	}


	config(config: ResourcesConfig): void {
		debug('config %o', config)
		// ResourceAdapter config
		this.localConfig(config)
		// Client config
		this.#client.config(config)
	}


	async singleton<R extends Resource>(resource: ResourceType, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<R> {

		debug('singleton: %o, %O, %O', resource, params || {}, options || {})

		const queryParams = generateQueryStringParams(params, resource)
		if (options?.params) Object.assign(queryParams, options?.params)

		const res = await this.#client.request('get', `${resource.type}`, undefined, { ...options, params: queryParams })
		const r = denormalize<R>(res) as R

		return r

	}


	async retrieve<R extends Resource>(resource: ResourceId, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<R> {

		debug('retrieve: %o, %O, %O', resource, params || {}, options || {})

		const queryParams = generateQueryStringParams(params, resource)
		if (options?.params) Object.assign(queryParams, options?.params)

		const res = await this.#client.request('get', `${resource.type}/${resource.id}`, undefined, { ...options, params: queryParams })
		const r = denormalize<R>(res) as R

		return r

	}


	async list<R extends Resource>(resource: ResourceType, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<R>> {

		debug('list: %o, %O, %O', resource, params || {}, options || {})

		const queryParams = generateQueryStringParams(params, resource)
		if (options?.params) Object.assign(queryParams, options?.params)

		const res = await this.#client.request('get', `${resource.type}`, undefined, { ...options, params: queryParams })
		const r = denormalize<R>(res) as R[]

		const meta: ListMeta = {
			pageCount: Number(res.meta?.page_count),
			recordCount: Number(res.meta?.record_count),
			currentPage: params?.pageNumber || config.default.pageNumber,
			recordsPerPage: params?.pageSize || config.default.pageSize
		}

		return new ListResponse(meta, r)

	}


	async create<C extends ResourceCreate, R extends Resource>(resource: C & ResourceType, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<R> {

		debug('create: %o, %O, %O', resource, params || {}, options || {})

		const queryParams = generateQueryStringParams(params, resource)
		if (options?.params) Object.assign(queryParams, options?.params)

		const data = normalize(resource)
		const res = await this.#client.request('post', resource.type, data, { ...options, params: queryParams })
		const r = denormalize<R>(res) as R

		return r

	}


	async update<U extends ResourceUpdate, R extends Resource>(resource: U & ResourceId, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<R> {

		debug('update: %o, %O, %O', resource, params || {}, options || {})

		const queryParams = generateQueryStringParams(params, resource)
		if (options?.params) Object.assign(queryParams, options?.params)

		const data = normalize(resource)
		const res = await this.#client.request('patch', `${resource.type}/${resource.id}`, data, { ...options, params: queryParams })
		const r = denormalize<R>(res) as R

		return r

	}


	async delete(resource: ResourceId, options?: ResourcesConfig): Promise<void> {
		debug('delete: %o, %O', resource, options || {})
		await this.#client.request('delete', `${resource.type}/${resource.id}`, undefined, options)
	}


	async fetch<R extends Resource>(resource: string | ResourceType, path: string, params?: QueryParams, options?: ResourcesConfig): Promise<R | ListResponse<R>> {

		debug('fetch: %o, %O, %O', path, params || {}, options || {})

		const queryParams = generateQueryStringParams(params, resource)
		if (options?.params) Object.assign(queryParams, options?.params)

		const res = await this.#client.request('get', path, undefined, { ...options, params: queryParams })
		const r = denormalize<R>(res)

		if (Array.isArray(r)) {
			const p = params as QueryParamsList
			const meta: ListMeta = {
				pageCount: Number(res.meta?.page_count),
				recordCount: Number(res.meta?.record_count),
				currentPage: p?.pageNumber || config.default.pageNumber,
				recordsPerPage: p?.pageSize || config.default.pageSize
			}
			return new ListResponse(meta, r)
		}
		else return r

	}

}



abstract class ApiResource {

	static readonly TYPE: ResourceTypeLock
	// static readonly PATH: ResourceTypeLock
	protected resources: ResourceAdapter

	constructor(adapter: ResourceAdapter) {
		debug('new resource instance: %s', this.type())
		this.resources = adapter
	}

	abstract relationship(id: string | ResourceId | null): ResourceRel

	abstract type(): string


	// reference, reference_origin and metadata attributes are always updatable
	async update(resource: ResourceUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Resource> {
		return this.resources.update<ResourceUpdate, Resource>({ ...resource, type: this.type() as ResourceTypeLock }, params, options)
	}

}



export default ResourceAdapter

export { ApiResource, ResourcesConfig, ResourcesInitConfig }
