
import ApiClient, { type ApiClientInitConfig } from './client'
import { denormalize, normalize, type DocWithData } from './jsonapi'
import type { QueryParamsRetrieve, QueryParamsList, QueryFilter, QueryParams } from './query'
import { generateQueryStringParams, isParamsList } from './query'
import { type ResourceTypeLock, resourceList } from './enum'
import config from './config'
import { SdkError } from './error'
import type { ObjectType } from './types'


import Debug from './debug'
const debug = Debug('resource')



type ResourceNull = { id: null } & ResourceType
type ResourceRel = ResourceId | ResourceNull


type Metadata = ObjectType


interface ResourceType {
	readonly type: ResourceTypeLock
}


interface ResourceId extends ResourceType {
	readonly id: string
}


interface ResourceBase {
	reference?: string | null
	reference_origin?: string | null
	metadata?: Metadata
}


interface Resource extends ResourceBase, ResourceId {
	readonly created_at: string
	readonly updated_at: string
}


interface ResourceCreate extends ResourceBase {

}


interface ResourceUpdate extends ResourceBase {
	readonly id: string
}


type ListMeta = {
	readonly pageCount: number
	readonly recordCount: number
	readonly currentPage: number
	readonly recordsPerPage: number
}


class ListResponse<R extends Resource = Resource> extends Array<R> {

	readonly meta: ListMeta

	constructor(meta: ListMeta, data: R[]) {
		super(...(data || []))
		this.meta = meta
	}

	first(): R | undefined { return this.length ? this[0] : undefined }
	last(): R | undefined { return this.length ? this[this.length - 1] : undefined }
	get(index: number): R | undefined { return (this.length && (index >= 0)) ? this[index] : undefined }

	hasNextPage(): boolean { return (this.meta.currentPage < this.meta.pageCount) }
	hasPrevPage(): boolean { return (this.meta.currentPage > 1) }

	getRecordCount(): number { return this.meta.recordCount }
	getPageCount(): number { return this.meta.pageCount }
	get recordCount(): number { return this.meta.recordCount }
	get pageCount(): number { return this.meta.pageCount }

}


export type { Metadata, ResourceType, ResourceId, Resource, ResourceCreate, ResourceUpdate, ListResponse, ListMeta, ResourceRel }

export type ResourceSort = Pick<Resource, 'id' | 'reference' | 'reference_origin' | 'created_at' | 'updated_at'>
export type ResourceFilter = Pick<Resource, 'id' | 'reference' | 'reference_origin' | 'metadata' | 'created_at' | 'updated_at'>



// Resource adapters local configuration
type ResourceAdapterConfig = {
	// xyz?: boolean
}

export type ResourcesInitConfig = ResourceAdapterConfig & ApiClientInitConfig
export type ResourcesConfig = Partial<ResourcesInitConfig>



class ApiResourceAdapter {

	private static adapter: ResourceAdapter


	private constructor() { }


	static init(config: ResourcesInitConfig): ResourceAdapter {
		ApiResourceAdapter.adapter = new ResourceAdapter(config)
		debug('resource adapter initialized')
		return ApiResourceAdapter.get()
	}

	static get(config?: ResourcesInitConfig): ResourceAdapter {
		if (config) return ApiResourceAdapter.init(config)
		else {
			if (ApiResourceAdapter.adapter) return ApiResourceAdapter.adapter
			else throw new SdkError({ message: 'Commerce Layer not initialized' })
		}
	}

	static config(config: ResourcesConfig): void {
		ApiResourceAdapter.get().config(config)
	}

}



class ResourceAdapter {

	readonly #client: ApiClient

	readonly #config: ResourceAdapterConfig = {}

	constructor(config: ResourcesInitConfig) {
		this.#client = ApiClient.create(config)
		this.localConfig(config)
	}


	private localConfig(config: ResourceAdapterConfig): void {
		Object.assign(this.#config, config)
	}


	config(config: ResourcesConfig): this {

		debug('config %o', config)

		// ResourceAdapter config
		this.localConfig(config)
		// Client config
		this.#client.config(config)

		return this

	}



	get client(): Readonly<ApiClient> {
		return this.#client
	}



	async singleton<R extends Resource>(resource: ResourceType, params?: QueryParamsRetrieve<R>, options?: ResourcesConfig, path?: string): Promise<R> {

		debug('singleton: %o, %O, %O', resource, params || {}, options || {})

		const queryParams = generateQueryStringParams(params, resource)
		if (options?.params) Object.assign(queryParams, options?.params)

		const res = await this.#client.request('GET', `${path || resource.type}`, undefined, { ...options, params: queryParams })
		const r = denormalize<R>(res as DocWithData) as R

		return r

	}


	async retrieve<R extends Resource>(resource: ResourceId, params?: QueryParamsRetrieve<R>, options?: ResourcesConfig): Promise<R> {

		debug('retrieve: %o, %O, %O', resource, params || {}, options || {})

		const queryParams = generateQueryStringParams(params, resource)
		if (options?.params) Object.assign(queryParams, options?.params)

		const res = await this.#client.request('GET', `${resource.type}/${resource.id}`, undefined, { ...options, params: queryParams })
		const r = denormalize<R>(res as DocWithData) as R

		return r

	}


	async list<R extends Resource>(resource: ResourceType, params?: QueryParamsList<R>, options?: ResourcesConfig): Promise<ListResponse<R>> {

		debug('list: %o, %O, %O', resource, params || {}, options || {})

		const queryParams = generateQueryStringParams(params, resource)
		if (options?.params) Object.assign(queryParams, options?.params)

		// Load balancer performance optimization
		if (!queryParams['page[number]']) queryParams['page[number]'] = '1'

		const res = await this.#client.request('GET', `${resource.type}`, undefined, { ...options, params: queryParams })
		const r = denormalize<R>(res as DocWithData) as R[]

		const meta: ListMeta = {
			pageCount: Number(res.meta?.page_count),
			recordCount: Number(res.meta?.record_count),
			currentPage: params?.pageNumber || config.default.pageNumber,
			recordsPerPage: params?.pageSize || config.default.pageSize
		}

		return new ListResponse(meta, r)

	}


	async create<C extends ResourceCreate, R extends Resource>(resource: C & ResourceType, params?: QueryParamsRetrieve<R>, options?: ResourcesConfig): Promise<R> {

		debug('create: %o, %O, %O', resource, params || {}, options || {})

		const queryParams = generateQueryStringParams<R>(params, resource)
		if (options?.params) Object.assign(queryParams, options?.params)

		const data = normalize(resource)
		const res = await this.#client.request('POST', resource.type, data, { ...options, params: queryParams })
		const r = denormalize<R>(res as DocWithData) as R

		return r

	}


	async update<U extends ResourceUpdate, R extends Resource>(resource: U & ResourceId, params?: QueryParamsRetrieve<R>, options?: ResourcesConfig): Promise<R> {

		debug('update: %o, %O, %O', resource, params || {}, options || {})

		const queryParams = generateQueryStringParams<R>(params, resource)
		if (options?.params) Object.assign(queryParams, options?.params)

		const data = normalize(resource)
		const res = await this.#client.request('PATCH', `${resource.type}/${resource.id}`, data, { ...options, params: queryParams })
		const r = denormalize<R>(res as DocWithData) as R

		return r

	}


	async delete(resource: ResourceId, options?: ResourcesConfig): Promise<void> {
		debug('delete: %o, %O', resource, options || {})
		await this.#client.request('DELETE', `${resource.type}/${resource.id}`, undefined, options)
	}


	async fetch<R extends Resource>(resource: string | ResourceType, path: string, params?: QueryParams<R>, options?: ResourcesConfig): Promise<R | ListResponse<R>> {

		debug('fetch: %o, %O, %O', path, params || {}, options || {})

		const queryParams = generateQueryStringParams<R>(params, resource)
		if (options?.params) Object.assign(queryParams, options?.params)

		const res = await this.#client.request('GET', path, undefined, { ...options, params: queryParams })
		const r = denormalize<R>(res as DocWithData)

		if (Array.isArray(r)) {
			const p = params as QueryParamsList<R>
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



abstract class ApiResourceBase<R extends Resource> {

	static readonly TYPE: ResourceTypeLock
	#resources?: ResourceAdapter


	constructor(adapter?: ResourceAdapter) {
		debug('new resource instance: %s', this.type())
		if (adapter) this.#resources = adapter
	}


	protected get resources(): ResourceAdapter {
		return this.#resources || ApiResourceAdapter.get()
	}


	abstract relationship(id: string | ResourceId | null): ResourceRel


	protected relationshipOneToOne<RR extends ResourceRel>(id: string | ResourceId | null): RR {
		return (((id === null) || (typeof id === 'string')) ? { id, type: this.type() } : { id: id.id, type: this.type() }) as RR
	}

	protected relationshipOneToMany<RR extends ResourceRel>(...ids: string[]): RR[] {
		return (((ids === null) || (ids.length === 0) || (ids[0] === null)) ? [{ id: null, type: this.type() }] : ids.map(id => { return { id, type: this.type() } })) as RR[]
	}

	abstract type(): ResourceTypeLock

	protected path(): string {
		return this.type()
	}


	// reference, reference_origin and metadata attributes are always updatable
	async update(resource: ResourceUpdate, params?: QueryParamsRetrieve<R>, options?: ResourcesConfig): Promise<R> {
		return this.resources.update<ResourceUpdate, R>({ ...resource, type: this.type() }, params, options)
	}

}


abstract class ApiResource<R extends Resource> extends ApiResourceBase<R> {

	async retrieve(id: string | ResourceId, params?: QueryParamsRetrieve<R>, options?: ResourcesConfig): Promise<R> {
		return this.resources.retrieve<R>((typeof id === 'string') ? { type: this.type(), id } : id, params, options)
	}

	async list(params?: QueryParamsList<R>, options?: ResourcesConfig): Promise<ListResponse<R>> {
		return this.resources.list<R>({ type: this.type() }, params, options)
	}

	async count(filter?: QueryFilter | QueryParamsList<R>, options?: ResourcesConfig): Promise<number> {
		const params: QueryParamsList<R> = { filters: isParamsList<R>(filter) ? filter.filters : filter, pageNumber: 1, pageSize: 1 }
		const response = await this.list(params, options)
		return Promise.resolve(response.meta.recordCount)
	}

}


abstract class ApiSingleton<R extends Resource> extends ApiResourceBase<R> {

	async retrieve(params?: QueryParamsRetrieve<R>, options?: ResourcesConfig): Promise<R> {
		return this.resources.singleton<R>({ type: this.type() }, params, options, this.path())
	}

}



export { ApiResourceAdapter, ApiResource, ApiSingleton, type ResourceAdapter }



export const isResourceId = (resource: any): resource is ResourceId => {
	return (resource?.type && resource.id) && resourceList.includes(resource.type as ResourceTypeLock)
}

export const isResourceType = (resource: any): resource is ResourceType => {
	return resource && (typeof resource.type !== 'undefined') && resource.type && resourceList.includes(resource.type as ResourceTypeLock)
}
