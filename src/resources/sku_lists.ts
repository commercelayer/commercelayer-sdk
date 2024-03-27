import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, /* ResourceFilterable */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Customer, CustomerType } from './customers'
import type { Sku } from './skus'
import type { SkuListItem } from './sku_list_items'
import type { Bundle } from './bundles'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type SkuListType = 'sku_lists'
type SkuListRel = ResourceRel & { type: SkuListType }
type CustomerRel = ResourceRel & { type: CustomerType }


export type SkuListSortable = Pick<SkuList, 'id' | 'name' | 'slug' | 'manual'> & ResourceSortable
// export type SkuListFilterable = Pick<SkuList, 'id' | 'name' | 'slug' | 'description' | 'image_url' | 'manual'> & ResourceFilterable


interface SkuList extends Resource {
	
	readonly type: SkuListType

	name: string
	slug: string
	description?: string | null
	image_url?: string | null
	manual?: boolean | null
	sku_code_regex?: string | null

	customer?: Customer | null
	skus?: Sku[] | null
	sku_list_items?: SkuListItem[] | null
	bundles?: Bundle[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface SkuListCreate extends ResourceCreate {
	
	name: string
	description?: string | null
	image_url?: string | null
	manual?: boolean | null
	sku_code_regex?: string | null

	customer?: CustomerRel | null

}


interface SkuListUpdate extends ResourceUpdate {
	
	name?: string | null
	description?: string | null
	image_url?: string | null
	manual?: boolean | null
	sku_code_regex?: string | null

	customer?: CustomerRel | null

}


class SkuLists extends ApiResource<SkuList> {

	static readonly TYPE: SkuListType = 'sku_lists' as const

	async create(resource: SkuListCreate, params?: QueryParamsRetrieve<SkuList>, options?: ResourcesConfig): Promise<SkuList> {
		return this.resources.create<SkuListCreate, SkuList>({ ...resource, type: SkuLists.TYPE }, params, options)
	}

	async update(resource: SkuListUpdate, params?: QueryParamsRetrieve<SkuList>, options?: ResourcesConfig): Promise<SkuList> {
		return this.resources.update<SkuListUpdate, SkuList>({ ...resource, type: SkuLists.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: SkuLists.TYPE } : id, options)
	}

	async customer(skuListId: string | SkuList, params?: QueryParamsRetrieve<Customer>, options?: ResourcesConfig): Promise<Customer> {
		const _skuListId = (skuListId as SkuList).id || skuListId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `sku_lists/${_skuListId}/customer`, params, options) as unknown as Customer
	}

	async skus(skuListId: string | SkuList, params?: QueryParamsList<Sku>, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _skuListId = (skuListId as SkuList).id || skuListId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `sku_lists/${_skuListId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async sku_list_items(skuListId: string | SkuList, params?: QueryParamsList<SkuListItem>, options?: ResourcesConfig): Promise<ListResponse<SkuListItem>> {
		const _skuListId = (skuListId as SkuList).id || skuListId as string
		return this.resources.fetch<SkuListItem>({ type: 'sku_list_items' }, `sku_lists/${_skuListId}/sku_list_items`, params, options) as unknown as ListResponse<SkuListItem>
	}

	async bundles(skuListId: string | SkuList, params?: QueryParamsList<Bundle>, options?: ResourcesConfig): Promise<ListResponse<Bundle>> {
		const _skuListId = (skuListId as SkuList).id || skuListId as string
		return this.resources.fetch<Bundle>({ type: 'bundles' }, `sku_lists/${_skuListId}/bundles`, params, options) as unknown as ListResponse<Bundle>
	}

	async attachments(skuListId: string | SkuList, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _skuListId = (skuListId as SkuList).id || skuListId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `sku_lists/${_skuListId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(skuListId: string | SkuList, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _skuListId = (skuListId as SkuList).id || skuListId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `sku_lists/${_skuListId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isSkuList(resource: any): resource is SkuList {
		return resource.type && (resource.type === SkuLists.TYPE)
	}


	relationship(id: string | ResourceId | null): SkuListRel {
		return super.relationshipOneToOne<SkuListRel>(id)
	}

	relationshipToMany(...ids: string[]): SkuListRel[] {
		return super.relationshipOneToMany<SkuListRel>(...ids)
	}


	type(): SkuListType {
		return SkuLists.TYPE
	}

}


export default SkuLists

export type { SkuList, SkuListCreate, SkuListUpdate, SkuListType }

/*
export const SkuListsClient = (init: ResourceAdapter | ResourcesInitConfig): SkuLists => {
	return new SkuLists((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
