import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { StockLocation, StockLocationType } from './stock_locations'
import type { Sku, SkuType } from './skus'
import type { Attachment } from './attachments'


type StockItemType = 'stock_items'
type StockItemRel = ResourceRel & { type: StockItemType }
type StockLocationRel = ResourceRel & { type: StockLocationType }
type SkuRel = ResourceRel & { type: SkuType }


interface StockItem extends Resource {
	
	readonly type: StockItemType

	sku_code?: string | null
	quantity: number

	stock_location?: StockLocation | null
	sku?: Sku | null
	attachments?: Attachment[] | null

}


interface StockItemCreate extends ResourceCreate {
	
	sku_code?: string | null
	quantity: number

	stock_location: StockLocationRel
	sku?: SkuRel | null

}


interface StockItemUpdate extends ResourceUpdate {
	
	sku_code?: string | null
	quantity?: number | null

	stock_location?: StockLocationRel | null
	sku?: SkuRel | null

}


class StockItems extends ApiResource<StockItem> {

	static readonly TYPE: StockItemType = 'stock_items' as const

	async create(resource: StockItemCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockItem> {
		return this.resources.create<StockItemCreate, StockItem>({ ...resource, type: StockItems.TYPE }, params, options)
	}

	async update(resource: StockItemUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockItem> {
		return this.resources.update<StockItemUpdate, StockItem>({ ...resource, type: StockItems.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: StockItems.TYPE } : id, options)
	}

	async stock_location(stockItemId: string | StockItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		const _stockItemId = (stockItemId as StockItem).id || stockItemId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `stock_items/${_stockItemId}/stock_location`, params, options) as unknown as StockLocation
	}

	async sku(stockItemId: string | StockItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku> {
		const _stockItemId = (stockItemId as StockItem).id || stockItemId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `stock_items/${_stockItemId}/sku`, params, options) as unknown as Sku
	}

	async attachments(stockItemId: string | StockItem, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _stockItemId = (stockItemId as StockItem).id || stockItemId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `stock_items/${_stockItemId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isStockItem(resource: any): resource is StockItem {
		return resource.type && (resource.type === StockItems.TYPE)
	}


	relationship(id: string | ResourceId | null): StockItemRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: StockItems.TYPE } : { id: id.id, type: StockItems.TYPE }
	}


	type(): StockItemType {
		return StockItems.TYPE
	}

}


export default StockItems

export type { StockItem, StockItemCreate, StockItemUpdate, StockItemType }
