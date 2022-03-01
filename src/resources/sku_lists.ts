import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Sku } from './skus'
import { SkuListItem } from './sku_list_items'
import { Bundle } from './bundles'


type SkuListRel = ResourceRel & { type: typeof SkuLists.TYPE }


interface SkuList extends Resource {
	
	name?: string
	slug?: string
	description?: string
	image_url?: string
	manual?: boolean
	sku_code_regex?: string

	skus?: Sku[]
	sku_list_items?: SkuListItem[]
	bundles?: Bundle[]

}


interface SkuListCreate extends ResourceCreate {
	
	name: string
	description?: string
	image_url?: string
	manual?: boolean
	sku_code_regex?: string
	
}


interface SkuListUpdate extends ResourceUpdate {
	
	name?: string
	description?: string
	image_url?: string
	manual?: boolean
	sku_code_regex?: string
	
}


class SkuLists extends ApiResource {

	static readonly TYPE: 'sku_lists' = 'sku_lists'
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

	async skus(skuListId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		return this.resources.fetch<Sku>({ type: 'skus' }, `sku_lists/${skuListId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async sku_list_items(skuListId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SkuListItem>> {
		return this.resources.fetch<SkuListItem>({ type: 'sku_list_items' }, `sku_lists/${skuListId}/sku_list_items`, params, options) as unknown as ListResponse<SkuListItem>
	}

	async bundles(skuListId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Bundle>> {
		return this.resources.fetch<Bundle>({ type: 'bundles' }, `sku_lists/${skuListId}/bundles`, params, options) as unknown as ListResponse<Bundle>
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
