import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Customer, CustomerType } from './customers'
import type { Sku } from './skus'
import type { SkuListItem } from './sku_list_items'
import type { Bundle } from './bundles'
import type { Attachment } from './attachments'
import type { Link } from './links'
import type { Version } from './versions'
import type { EventStore } from './event_stores'


type SkuListType = 'sku_lists'
type SkuListRel = ResourceRel & { type: SkuListType }
type CustomerRel = ResourceRel & { type: CustomerType }


export type SkuListSort = Pick<SkuList, 'id' | 'name' | 'slug' | 'manual'> & ResourceSort
// export type SkuListFilter = Pick<SkuList, 'id' | 'name' | 'slug' | 'description' | 'image_url' | 'manual'> & ResourceFilter


interface SkuList extends Resource {
	
	readonly type: SkuListType

	/** 
	 * The SKU list's internal name.
	 * @example ```"Personal list"```
	 */
	name: string
	/** 
	 * The SKU list's internal slug.
	 * @example ```"personal-list-1"```
	 */
	slug: string
	/** 
	 * An internal description of the SKU list.
	 * @example ```"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."```
	 */
	description?: string | null
	/** 
	 * The URL of an image that represents the SKU list.
	 * @example ```"https://img.yourdomain.com/skus/xYZkjABcde.png"```
	 */
	image_url?: string | null
	/** 
	 * Indicates if the SKU list is populated manually.
	 */
	manual?: boolean | null
	/** 
	 * The regex that will be evaluated to match the SKU codes, max size is 5000.
	 * @example ```"^(A|B).*$"```
	 */
	sku_code_regex?: string | null

	customer?: Customer | null
	skus?: Sku[] | null
	sku_list_items?: SkuListItem[] | null
	bundles?: Bundle[] | null
	attachments?: Attachment[] | null
	links?: Link[] | null
	versions?: Version[] | null
	event_stores?: EventStore[] | null

}


interface SkuListCreate extends ResourceCreate {
	
	/** 
	 * The SKU list's internal name.
	 * @example ```"Personal list"```
	 */
	name: string
	/** 
	 * An internal description of the SKU list.
	 * @example ```"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."```
	 */
	description?: string | null
	/** 
	 * The URL of an image that represents the SKU list.
	 * @example ```"https://img.yourdomain.com/skus/xYZkjABcde.png"```
	 */
	image_url?: string | null
	/** 
	 * Indicates if the SKU list is populated manually.
	 */
	manual?: boolean | null
	/** 
	 * The regex that will be evaluated to match the SKU codes, max size is 5000.
	 * @example ```"^(A|B).*$"```
	 */
	sku_code_regex?: string | null

	customer?: CustomerRel | null

}


interface SkuListUpdate extends ResourceUpdate {
	
	/** 
	 * The SKU list's internal name.
	 * @example ```"Personal list"```
	 */
	name?: string | null
	/** 
	 * An internal description of the SKU list.
	 * @example ```"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."```
	 */
	description?: string | null
	/** 
	 * The URL of an image that represents the SKU list.
	 * @example ```"https://img.yourdomain.com/skus/xYZkjABcde.png"```
	 */
	image_url?: string | null
	/** 
	 * Indicates if the SKU list is populated manually.
	 */
	manual?: boolean | null
	/** 
	 * The regex that will be evaluated to match the SKU codes, max size is 5000.
	 * @example ```"^(A|B).*$"```
	 */
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

	async links(skuListId: string | SkuList, params?: QueryParamsList<Link>, options?: ResourcesConfig): Promise<ListResponse<Link>> {
		const _skuListId = (skuListId as SkuList).id || skuListId as string
		return this.resources.fetch<Link>({ type: 'links' }, `sku_lists/${_skuListId}/links`, params, options) as unknown as ListResponse<Link>
	}

	async versions(skuListId: string | SkuList, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _skuListId = (skuListId as SkuList).id || skuListId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `sku_lists/${_skuListId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async event_stores(skuListId: string | SkuList, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _skuListId = (skuListId as SkuList).id || skuListId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `sku_lists/${_skuListId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
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
