import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Shipment, ShipmentType, ShipmentSortable } from './shipments'
import type { LineItem, LineItemType, LineItemSortable } from './line_items'
import type { StockItem, StockItemType, StockItemSortable } from './stock_items'
import type { Sku, SkuType, SkuSortable } from './skus'
import type { Version, VersionSortable } from './versions'


type StockLineItemType = 'stock_line_items'
type StockLineItemRel = ResourceRel & { type: StockLineItemType }
type ShipmentRel = ResourceRel & { type: ShipmentType }
type LineItemRel = ResourceRel & { type: LineItemType }
type StockItemRel = ResourceRel & { type: StockItemType }
type SkuRel = ResourceRel & { type: SkuType }


export type StockLineItemSortable = Pick<StockLineItem, 'id' | 'quantity'> & ResourceSortable
export type StockLineItemFilterable = Pick<StockLineItem, 'id' | 'sku_code' | 'quantity'> & ResourceFilterable


interface StockLineItem extends Resource {
	
	readonly type: StockLineItemType

	sku_code?: string | null
	bundle_code?: string | null
	quantity: number

	shipment?: Shipment | null
	line_item?: LineItem | null
	stock_item?: StockItem | null
	sku?: Sku | null
	versions?: Version[] | null

}


interface StockLineItemCreate extends ResourceCreate {
	
	sku_code?: string | null
	quantity: number

	shipment?: ShipmentRel | null
	line_item?: LineItemRel | null
	stock_item?: StockItemRel | null
	sku?: SkuRel | null

}


interface StockLineItemUpdate extends ResourceUpdate {
	
	sku_code?: string | null
	quantity?: number | null
	_reserve_stock?: boolean | null
	_release_stock?: boolean | null
	_decrement_stock?: boolean | null

	shipment?: ShipmentRel | null
	line_item?: LineItemRel | null
	stock_item?: StockItemRel | null
	sku?: SkuRel | null

}


class StockLineItems extends ApiResource<StockLineItem, StockLineItemSortable> {

	static readonly TYPE: StockLineItemType = 'stock_line_items' as const

	async create(resource: StockLineItemCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLineItem> {
		return this.resources.create<StockLineItemCreate, StockLineItem>({ ...resource, type: StockLineItems.TYPE }, params, options)
	}

	async update(resource: StockLineItemUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLineItem> {
		return this.resources.update<StockLineItemUpdate, StockLineItem>({ ...resource, type: StockLineItems.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: StockLineItems.TYPE } : id, options)
	}

	async shipment(stockLineItemId: string | StockLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		const _stockLineItemId = (stockLineItemId as StockLineItem).id || stockLineItemId as string
		return this.resources.fetch<Shipment, ShipmentSortable>({ type: 'shipments' }, `stock_line_items/${_stockLineItemId}/shipment`, params, options) as unknown as Shipment
	}

	async line_item(stockLineItemId: string | StockLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
		const _stockLineItemId = (stockLineItemId as StockLineItem).id || stockLineItemId as string
		return this.resources.fetch<LineItem, LineItemSortable>({ type: 'line_items' }, `stock_line_items/${_stockLineItemId}/line_item`, params, options) as unknown as LineItem
	}

	async stock_item(stockLineItemId: string | StockLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockItem> {
		const _stockLineItemId = (stockLineItemId as StockLineItem).id || stockLineItemId as string
		return this.resources.fetch<StockItem, StockItemSortable>({ type: 'stock_items' }, `stock_line_items/${_stockLineItemId}/stock_item`, params, options) as unknown as StockItem
	}

	async sku(stockLineItemId: string | StockLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku> {
		const _stockLineItemId = (stockLineItemId as StockLineItem).id || stockLineItemId as string
		return this.resources.fetch<Sku, SkuSortable>({ type: 'skus' }, `stock_line_items/${_stockLineItemId}/sku`, params, options) as unknown as Sku
	}

	async versions(stockLineItemId: string | StockLineItem, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _stockLineItemId = (stockLineItemId as StockLineItem).id || stockLineItemId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `stock_line_items/${_stockLineItemId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _reserve_stock(id: string | StockLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLineItem> {
		return this.resources.update<StockLineItemUpdate, StockLineItem>({ id: (typeof id === 'string')? id: id.id, type: StockLineItems.TYPE, _reserve_stock: true }, params, options)
	}

	async _release_stock(id: string | StockLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLineItem> {
		return this.resources.update<StockLineItemUpdate, StockLineItem>({ id: (typeof id === 'string')? id: id.id, type: StockLineItems.TYPE, _release_stock: true }, params, options)
	}

	async _decrement_stock(id: string | StockLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLineItem> {
		return this.resources.update<StockLineItemUpdate, StockLineItem>({ id: (typeof id === 'string')? id: id.id, type: StockLineItems.TYPE, _decrement_stock: true }, params, options)
	}


	isStockLineItem(resource: any): resource is StockLineItem {
		return resource.type && (resource.type === StockLineItems.TYPE)
	}


	relationship(id: string | ResourceId | null): StockLineItemRel {
		return super.relationshipOneToOne<StockLineItemRel>(id)
	}

	relationshipToMany(...ids: string[]): StockLineItemRel[] {
		return super.relationshipOneToMany<StockLineItemRel>(...ids)
	}


	type(): StockLineItemType {
		return StockLineItems.TYPE
	}

}


export default StockLineItems

export type { StockLineItem, StockLineItemCreate, StockLineItemUpdate, StockLineItemType }

/*
export const StockLineItemsClient = (init: ResourceAdapter | ResourcesInitConfig): StockLineItems => {
	return new StockLineItems((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
