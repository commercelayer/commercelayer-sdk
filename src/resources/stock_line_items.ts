import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { LineItem, LineItemType } from './line_items'
import type { Shipment, ShipmentType } from './shipments'
import type { Sku, SkuType } from './skus'
import type { StockItem, StockItemType } from './stock_items'
import type { Version } from './versions'


type StockLineItemType = 'stock_line_items'
type StockLineItemRel = ResourceRel & { type: StockLineItemType }
type LineItemRel = ResourceRel & { type: LineItemType }
type ShipmentRel = ResourceRel & { type: ShipmentType }
type SkuRel = ResourceRel & { type: SkuType }
type StockItemRel = ResourceRel & { type: StockItemType }


export type StockLineItemSort = Pick<StockLineItem, 'id' | 'quantity'> & ResourceSort
// export type StockLineItemFilter = Pick<StockLineItem, 'id' | 'quantity' | 'sku_code'> & ResourceFilter


interface StockLineItem extends Resource {
	
	readonly type: StockLineItemType

	/** 
	 * The code of the associated bundle.
	 * @example ```"BUNDLEMM000000FFFFFFXLXX"```
	 */
	bundle_code?: string | null
	/** 
	 * The line item quantity.
	 * @example ```"4"```
	 */
	quantity: number
	/** 
	 * The code of the associated SKU.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null

	line_item?: LineItem | null
	shipment?: Shipment | null
	sku?: Sku | null
	stock_item?: StockItem | null
	versions?: Version[] | null

}


interface StockLineItemCreate extends ResourceCreate {
	
	/** 
	 * The line item quantity.
	 * @example ```"4"```
	 */
	quantity: number
	/** 
	 * The code of the associated SKU.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null

	line_item?: LineItemRel | null
	shipment?: ShipmentRel | null
	sku?: SkuRel | null
	stock_item?: StockItemRel | null

}


interface StockLineItemUpdate extends ResourceUpdate {
	
	/** 
	 * Send this attribute if you want to automatically decrement and release the stock this stock line item. Can be done only when fulfillment is in progress.
	 * @example ```"true"```
	 */
	_decrement_stock?: boolean | null
	/** 
	 * Send this attribute if you want to automatically destroy the stock reservation for this stock line item. Can be done only when fulfillment is in progress.
	 * @example ```"true"```
	 */
	_release_stock?: boolean | null
	/** 
	 * Send this attribute if you want to automatically reserve the stock for this stock line item. Can be done only when fulfillment is in progress.
	 * @example ```"true"```
	 */
	_reserve_stock?: boolean | null
	/** 
	 * The line item quantity.
	 * @example ```"4"```
	 */
	quantity?: number | null
	/** 
	 * The code of the associated SKU.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null

	line_item?: LineItemRel | null
	shipment?: ShipmentRel | null
	sku?: SkuRel | null
	stock_item?: StockItemRel | null

}


class StockLineItems extends ApiResource<StockLineItem> {

	static readonly TYPE: StockLineItemType = 'stock_line_items' as const

	async create(resource: StockLineItemCreate, params?: QueryParamsRetrieve<StockLineItem>, options?: ResourcesConfig): Promise<StockLineItem> {
		return this.resources.create<StockLineItemCreate, StockLineItem>({ ...resource, type: StockLineItems.TYPE }, params, options)
	}

	async update(resource: StockLineItemUpdate, params?: QueryParamsRetrieve<StockLineItem>, options?: ResourcesConfig): Promise<StockLineItem> {
		return this.resources.update<StockLineItemUpdate, StockLineItem>({ ...resource, type: StockLineItems.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: StockLineItems.TYPE } : id, options)
	}

	async line_item(stockLineItemId: string | StockLineItem, params?: QueryParamsRetrieve<LineItem>, options?: ResourcesConfig): Promise<LineItem> {
		const _stockLineItemId = (stockLineItemId as StockLineItem).id || stockLineItemId as string
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `stock_line_items/${_stockLineItemId}/line_item`, params, options) as unknown as LineItem
	}

	async shipment(stockLineItemId: string | StockLineItem, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		const _stockLineItemId = (stockLineItemId as StockLineItem).id || stockLineItemId as string
		return this.resources.fetch<Shipment>({ type: 'shipments' }, `stock_line_items/${_stockLineItemId}/shipment`, params, options) as unknown as Shipment
	}

	async sku(stockLineItemId: string | StockLineItem, params?: QueryParamsRetrieve<Sku>, options?: ResourcesConfig): Promise<Sku> {
		const _stockLineItemId = (stockLineItemId as StockLineItem).id || stockLineItemId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `stock_line_items/${_stockLineItemId}/sku`, params, options) as unknown as Sku
	}

	async stock_item(stockLineItemId: string | StockLineItem, params?: QueryParamsRetrieve<StockItem>, options?: ResourcesConfig): Promise<StockItem> {
		const _stockLineItemId = (stockLineItemId as StockLineItem).id || stockLineItemId as string
		return this.resources.fetch<StockItem>({ type: 'stock_items' }, `stock_line_items/${_stockLineItemId}/stock_item`, params, options) as unknown as StockItem
	}

	async versions(stockLineItemId: string | StockLineItem, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _stockLineItemId = (stockLineItemId as StockLineItem).id || stockLineItemId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `stock_line_items/${_stockLineItemId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _decrement_stock(id: string | StockLineItem, params?: QueryParamsRetrieve<StockLineItem>, options?: ResourcesConfig): Promise<StockLineItem> {
		return this.resources.update<StockLineItemUpdate, StockLineItem>({ id: (typeof id === 'string')? id: id.id, type: StockLineItems.TYPE, _decrement_stock: true }, params, options)
	}

	async _release_stock(id: string | StockLineItem, params?: QueryParamsRetrieve<StockLineItem>, options?: ResourcesConfig): Promise<StockLineItem> {
		return this.resources.update<StockLineItemUpdate, StockLineItem>({ id: (typeof id === 'string')? id: id.id, type: StockLineItems.TYPE, _release_stock: true }, params, options)
	}

	async _reserve_stock(id: string | StockLineItem, params?: QueryParamsRetrieve<StockLineItem>, options?: ResourcesConfig): Promise<StockLineItem> {
		return this.resources.update<StockLineItemUpdate, StockLineItem>({ id: (typeof id === 'string')? id: id.id, type: StockLineItems.TYPE, _reserve_stock: true }, params, options)
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
