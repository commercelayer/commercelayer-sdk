import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Customer } from './customers'
import type { Sku } from './skus'
import type { SkuListItem } from './sku_list_items'
import type { Bundle } from './bundles'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type SkuListRel = ResourceRel & { type: typeof SkuLists.TYPE }
type CustomerRel = ResourceRel & { type: 'customers' }


interface SkuList extends Resource {
	
	name?: string
	slug?: string
	description?: string
	image_url?: string
	manual?: boolean
	sku_code_regex?: string

	customer?: Customer
	skus?: Sku[]
	sku_list_items?: SkuListItem[]
	bundles?: Bundle[]
	attachments?: Attachment[]
	versions?: Version[]

}


interface SkuListCreate extends ResourceCreate {
	
	name: string
	description?: string
	image_url?: string
	manual?: boolean
	sku_code_regex?: string

	customer?: CustomerRel

}


interface SkuListUpdate extends ResourceUpdate {
	
	name?: string
	description?: string
	image_url?: string
	manual?: boolean
	sku_code_regex?: string

	customer?: CustomerRel

}


class SkuLists extends ApiResource {

	static readonly TYPE: 'sku_lists' = 'sku_lists' as const
	// static readonly PATH = 'sku_lists'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SkuList>> {
		return this.resources.list<SkuList>({ type: SkuLists.TYPE }, params, options)
	}

	async create(resource: SkuListCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		return this.resources.create<SkuListCreate, SkuList>({ ...resource, type: SkuLists.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		return this.resources.retrieve<SkuList>({ type: SkuLists.TYPE, id }, params, options)
	}

	async update(resource: SkuListUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		return this.resources.update<SkuListUpdate, SkuList>({ ...resource, type: SkuLists.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: SkuLists.TYPE, id }, options)
	}

	async customer(skuListId: string | SkuList, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		const _skuListId = (skuListId as SkuList).id || skuListId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `sku_lists/${_skuListId}/customer`, params, options) as unknown as Customer
	}

	async skus(skuListId: string | SkuList, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _skuListId = (skuListId as SkuList).id || skuListId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `sku_lists/${_skuListId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async sku_list_items(skuListId: string | SkuList, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SkuListItem>> {
		const _skuListId = (skuListId as SkuList).id || skuListId as string
		return this.resources.fetch<SkuListItem>({ type: 'sku_list_items' }, `sku_lists/${_skuListId}/sku_list_items`, params, options) as unknown as ListResponse<SkuListItem>
	}

	async bundles(skuListId: string | SkuList, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Bundle>> {
		const _skuListId = (skuListId as SkuList).id || skuListId as string
		return this.resources.fetch<Bundle>({ type: 'bundles' }, `sku_lists/${_skuListId}/bundles`, params, options) as unknown as ListResponse<Bundle>
	}

	async attachments(skuListId: string | SkuList, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _skuListId = (skuListId as SkuList).id || skuListId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `sku_lists/${_skuListId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(skuListId: string | SkuList, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _skuListId = (skuListId as SkuList).id || skuListId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `sku_lists/${_skuListId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isSkuList(resource: any): resource is SkuList {
		return resource.type && (resource.type === SkuLists.TYPE)
	}


	relationship(id: string | ResourceId | null): SkuListRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: SkuLists.TYPE } : { id: id.id, type: SkuLists.TYPE }
	}


	type(): string {
		return SkuLists.TYPE
	}

}


export default SkuLists

export { SkuList, SkuListCreate, SkuListUpdate }
