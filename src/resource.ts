
import ApiClient, { ApiClientConfig, ApiClientInitConfig } from './client'
import { denormalize, normalize, JSONValue } from './jsonapi'
import { QueryParamsRetrieve, QueryParamsList, generateQueryStringParams } from './query'
import { ResTypeLock } from './api'
import config from './config'



type Metadata = { [key: string]: JSONValue }


interface ResourceType {
	readonly type: ResTypeLock
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

	constructor(meta: ListMeta, data: Array<R>) {
		super(...data)
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

}



export type { Metadata, ResourceType, ResourceId, Resource, ResourceCreate, ResourceUpdate, ListResponse }


// Resources adapter local configuration
type ResourceAdapterConfig = {
	// rawResponse?: boolean
}

type ResourcesInitConfig = ResourceAdapterConfig & ApiClientInitConfig
type ResourcesConfig = ResourceAdapterConfig & ApiClientConfig


class ResourceAdapter {

	#client: ApiClient

	#config: ResourceAdapterConfig = {}

	constructor(config: ResourcesInitConfig) {
		this.#client = ApiClient.create(config)
		this.config(config)
	}


	config(config: ResourcesConfig): void {

		if (!config) return

		// Client config
		this.#client.config(config)

		// Resources config
		// if (typeof config.rawResponse !== 'undefined') this.#config.rawResponse = config.rawResponse

		return

	}


	/*
	private isRawResponse(options?: ResourcesConfig): boolean {
		return (typeof options?.rawResponse !== 'undefined') ? (options?.rawResponse === true) : (this.#config.rawResponse === true)
	}
	*/


	async singleton<R extends Resource>(resource: ResourceType, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<R> {

		const queryParams = generateQueryStringParams(params)

		const res = await this.#client.request('get', `${resource.type}`, undefined, { ...options, params: queryParams })
		const r = denormalize<R>(res) as R

		return r

	}


	async retrieve<R extends Resource>(resource: ResourceId, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<R> {

		const queryParams = generateQueryStringParams(params)

		const res = await this.#client.request('get', `${resource.type}/${resource.id}`, undefined, { ...options, params: queryParams })
		const r = denormalize<R>(res) as R

		return r

	}


	async list<R extends Resource>(resource: ResourceType, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<R>> {

		const queryParams = generateQueryStringParams(params)

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


	async create<C extends ResourceCreate, R extends Resource>(resource: C & ResourceType, options?: ResourcesConfig): Promise<R> {

		const data = normalize(resource)

		const res = await this.#client.request('post', resource.type, data, options)
		const r = denormalize<R>(res) as R

		return r

	}


	async update<U extends ResourceUpdate, R extends Resource>(resource: U & ResourceId, options?: ResourcesConfig): Promise<R> {

		const data = normalize(resource)

		const res = await this.#client.request('patch', `${resource.type}/${resource.id}`, data, options)
		const r = denormalize<R>(res) as R

		return r

	}


	async delete(resource: ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.#client.request('delete', `${resource.type}/${resource.id}`, undefined, options)
	}


	/*
	async rawList(resource: ResourceType, params?: QueryParamsList, options?: ResourcesConfig): Promise<DocWithData> {
		const queryParams = generateQueryStringParams(params)
		return this.#client.request('get', `${resource.type}`, undefined, { ...options, params: queryParams })
	}
	*/

}



abstract class ApiResource {

	static readonly TYPE: string
	// static readonly PATH: string
	protected resources: ResourceAdapter

	constructor(adapter: ResourceAdapter) {
		this.resources = adapter
	}

	/*
	async rawList(resource: ResourceType, params?: QueryParamsList, options?: ResourcesConfig): Promise<DocWithData> {
		return this.resources.rawList(resource, params, options)
	}
	*/

}



export default ResourceAdapter

export { ApiResource, ResourcesConfig, ResourcesInitConfig }
