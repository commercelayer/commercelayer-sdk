/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiClient, { ApiClientConfig, ApiClientInitConfig } from './client'
import { denormalize, normalize, JSON, DocWithData } from './jsonapi'
import { QueryParamsRetrieve, QueryParamsList, generateQueryStringParams } from './query'
import { ResTypeLock } from './api'

export { DocWithData }


type Metadata = { [key: string]: JSON.Value }


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



const isResourceId = (resource: any): resource is ResourceId => {
	return (resource.type && resource.id)
}

const isResourceType = (resource: any): resource is ResourceType => {
	return (typeof resource.type !== 'undefined') && resource.type
}


export { Metadata, ResourceType, ResourceId, Resource, ResourceCreate, ResourceUpdate, isResourceId, isResourceType }


// Resources adapter local configuration
type ResourceAdapterConfig = {
	rawResponse?: boolean
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
		if (typeof config.rawResponse !== 'undefined') this.#config.rawResponse = config.rawResponse

		return

	}


	private isRawResponse(options?: ResourcesConfig): boolean {
		return (typeof options?.rawResponse !== 'undefined') ? (options?.rawResponse === true) : (this.#config.rawResponse === true)
	}


	async singleton<R extends Resource>(resource: ResourceType, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<R/* | DocWithData<R>*/> {

		const queryParams = generateQueryStringParams(params)

		const res = await this.#client.request('get', `${resource.type}`, undefined, { ...options, params: queryParams })
		const r = /*this.isRawResponse(options) ? res as DocWithData<R> :*/ denormalize<R>(res) as R

		return r

	}


	async retrieve<R extends Resource>(resource: ResourceId, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<R/* | DocWithData<R>*/> {

		const queryParams = generateQueryStringParams(params)

		const res = await this.#client.request('get', `${resource.type}/${resource.id}`, undefined, { ...options, params: queryParams })
		const r = /*this.isRawResponse(options) ? res as DocWithData<R> : */denormalize<R>(res) as R

		return r

	}


	async list<R extends Resource>(resource: ResourceType, params?: QueryParamsList, options?: ResourcesConfig): Promise<R[]/* | DocWithData<R>*/> {

		const queryParams = generateQueryStringParams(params)

		const res = await this.#client.request('get', `${resource.type}`, undefined, { ...options, params: queryParams })
		const r = /*this.isRawResponse(options) ? res as DocWithData<R> : */denormalize<R>(res) as R[]

		return r

	}


	async create<C extends ResourceCreate, R extends Resource>(resource: C & ResourceType, options?: ResourcesConfig): Promise<R/* | DocWithData<R>*/> {

		const data = normalize(resource)

		const res = await this.#client.request('post', resource.type, data, options)
		const r = /*this.isRawResponse(options) ? res as DocWithData<R> : */denormalize<R>(res) as R

		return r

	}


	async update<U extends ResourceUpdate, R extends Resource>(resource: U & ResourceId, options?: ResourcesConfig): Promise<R/* | DocWithData<R>*/> {

		const data = normalize(resource)

		const res = await this.#client.request('patch', `${resource.type}/${resource.id}`, data, options)
		const r = /*this.isRawResponse(options) ? res as DocWithData<R> : */denormalize<R>(res) as R

		return r

	}


	async delete(resource: ResourceId, options?: ResourcesConfig): Promise<void> {
		this.#client.request('delete', `${resource.type}/${resource.id}`, undefined, options)
	}


	async rawList(resource: ResourceType, params?: QueryParamsList, options?: ResourcesConfig): Promise<DocWithData> {
		const queryParams = generateQueryStringParams(params)
		return this.#client.request('get', `${resource.type}`, undefined, { ...options, params: queryParams })
	}

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
