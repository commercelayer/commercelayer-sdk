import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { SkuList, SkuListType } from './sku_lists'
import type { Sku, SkuType } from './skus'
import type { Version } from './versions'


type SkuListItemType = 'sku_list_items'
type SkuListItemRel = ResourceRel & { type: SkuListItemType }
type SkuListRel = ResourceRel & { type: SkuListType }
type SkuRel = ResourceRel & { type: SkuType }


export type SkuListItemSort = Pick<SkuListItem, 'id' | 'position' | 'quantity'> & ResourceSort
// export type SkuListItemFilter = Pick<SkuListItem, 'id' | 'position' | 'quantity'> & ResourceFilter


interface SkuListItem extends Resource {
	
	readonly type: SkuListItemType

	position?: Nullable<number>
	sku_code?: Nullable<string>
	quantity?: Nullable<number>

	sku_list?: Nullable<SkuList>
	sku?: Nullable<Sku>
	versions?: Nullable<Version[]>

}


interface SkuListItemCreate extends ResourceCreate {
	
	position?: Nullable<number>
	sku_code?: Nullable<string>
	quantity?: Nullable<number>

	sku_list: SkuListRel
	sku: SkuRel

}


interface SkuListItemUpdate extends ResourceUpdate {
	
	position?: Nullable<number>
	sku_code?: Nullable<string>
	quantity?: Nullable<number>
	
}


class SkuListItems extends ApiResource<SkuListItem> {

	static readonly TYPE: SkuListItemType = 'sku_list_items' as const

	async create(resource: SkuListItemCreate, params?: QueryParamsRetrieve<SkuListItem>, options?: ResourcesConfig): Promise<SkuListItem> {
		return this.resources.create<SkuListItemCreate, SkuListItem>({ ...resource, type: SkuListItems.TYPE }, params, options)
	}

	async update(resource: SkuListItemUpdate, params?: QueryParamsRetrieve<SkuListItem>, options?: ResourcesConfig): Promise<SkuListItem> {
		return this.resources.update<SkuListItemUpdate, SkuListItem>({ ...resource, type: SkuListItems.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: SkuListItems.TYPE } : id, options)
	}

	async sku_list(skuListItemId: string | SkuListItem, params?: QueryParamsRetrieve<SkuList>, options?: ResourcesConfig): Promise<SkuList> {
		const _skuListItemId = (skuListItemId as SkuListItem).id || skuListItemId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `sku_list_items/${_skuListItemId}/sku_list`, params, options) as unknown as SkuList
	}

	async sku(skuListItemId: string | SkuListItem, params?: QueryParamsRetrieve<Sku>, options?: ResourcesConfig): Promise<Sku> {
		const _skuListItemId = (skuListItemId as SkuListItem).id || skuListItemId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `sku_list_items/${_skuListItemId}/sku`, params, options) as unknown as Sku
	}

	async versions(skuListItemId: string | SkuListItem, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _skuListItemId = (skuListItemId as SkuListItem).id || skuListItemId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `sku_list_items/${_skuListItemId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isSkuListItem(resource: any): resource is SkuListItem {
		return resource.type && (resource.type === SkuListItems.TYPE)
	}


	relationship(id: string | ResourceId | null): SkuListItemRel {
		return super.relationshipOneToOne<SkuListItemRel>(id)
	}

	relationshipToMany(...ids: string[]): SkuListItemRel[] {
		return super.relationshipOneToMany<SkuListItemRel>(...ids)
	}


	type(): SkuListItemType {
		return SkuListItems.TYPE
	}

}


export default SkuListItems

export type { SkuListItem, SkuListItemCreate, SkuListItemUpdate, SkuListItemType }
