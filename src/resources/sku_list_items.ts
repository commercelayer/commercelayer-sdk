import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { SkuList, SkuListType } from './sku_lists'
import type { Sku, SkuType } from './skus'


type SkuListItemType = 'sku_list_items'
type SkuListItemRel = ResourceRel & { type: SkuListItemType }
type SkuListRel = ResourceRel & { type: SkuListType }
type SkuRel = ResourceRel & { type: SkuType }


interface SkuListItem extends Resource {
	
	readonly type: SkuListItemType

	position?: number | null
	sku_code?: string | null
	quantity?: number | null

	sku_list?: SkuList | null
	sku?: Sku | null

}


interface SkuListItemCreate extends ResourceCreate {
	
	position?: number | null
	sku_code?: string | null
	quantity?: number | null

	sku_list: SkuListRel
	sku: SkuRel

}


interface SkuListItemUpdate extends ResourceUpdate {
	
	position?: number | null
	sku_code?: string | null
	quantity?: number | null
	
}


class SkuListItems extends ApiResource<SkuListItem> {

	static readonly TYPE: SkuListItemType = 'sku_list_items' as const

	async create(resource: SkuListItemCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListItem> {
		return this.resources.create<SkuListItemCreate, SkuListItem>({ ...resource, type: SkuListItems.TYPE }, params, options)
	}

	async update(resource: SkuListItemUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListItem> {
		return this.resources.update<SkuListItemUpdate, SkuListItem>({ ...resource, type: SkuListItems.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: SkuListItems.TYPE } : id, options)
	}

	async sku_list(skuListItemId: string | SkuListItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _skuListItemId = (skuListItemId as SkuListItem).id || skuListItemId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `sku_list_items/${_skuListItemId}/sku_list`, params, options) as unknown as SkuList
	}

	async sku(skuListItemId: string | SkuListItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku> {
		const _skuListItemId = (skuListItemId as SkuListItem).id || skuListItemId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `sku_list_items/${_skuListItemId}/sku`, params, options) as unknown as Sku
	}


	isSkuListItem(resource: any): resource is SkuListItem {
		return resource.type && (resource.type === SkuListItems.TYPE)
	}


	relationship(id: string | ResourceId | null): SkuListItemRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: SkuListItems.TYPE } : { id: id.id, type: SkuListItems.TYPE }
	}


	type(): SkuListItemType {
		return SkuListItems.TYPE
	}

}


export default SkuListItems

export type { SkuListItem, SkuListItemCreate, SkuListItemUpdate, SkuListItemType }
