import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { Shipment } from './shipments'
import type { LineItem } from './line_items'
import type { StockItem } from './stock_items'


type StockLineItemType = 'stock_line_items'
type StockLineItemRel = ResourceRel & { type: StockLineItemType }


interface StockLineItem extends Resource {
	
	readonly type: StockLineItemType

	sku_code?: string | null
	bundle_code?: string | null
	quantity: number

	shipment?: Shipment | null
	line_item?: LineItem | null
	stock_item?: StockItem | null

}


class StockLineItems extends ApiResource<StockLineItem> {

	static readonly TYPE: StockLineItemType = 'stock_line_items' as const

	async shipment(stockLineItemId: string | StockLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		const _stockLineItemId = (stockLineItemId as StockLineItem).id || stockLineItemId as string
		return this.resources.fetch<Shipment>({ type: 'shipments' }, `stock_line_items/${_stockLineItemId}/shipment`, params, options) as unknown as Shipment
	}

	async line_item(stockLineItemId: string | StockLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
		const _stockLineItemId = (stockLineItemId as StockLineItem).id || stockLineItemId as string
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `stock_line_items/${_stockLineItemId}/line_item`, params, options) as unknown as LineItem
	}

	async stock_item(stockLineItemId: string | StockLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockItem> {
		const _stockLineItemId = (stockLineItemId as StockLineItem).id || stockLineItemId as string
		return this.resources.fetch<StockItem>({ type: 'stock_items' }, `stock_line_items/${_stockLineItemId}/stock_item`, params, options) as unknown as StockItem
	}


	isStockLineItem(resource: any): resource is StockLineItem {
		return resource.type && (resource.type === StockLineItems.TYPE)
	}


	relationship(id: string | ResourceId | null): StockLineItemRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: StockLineItems.TYPE } : { id: id.id, type: StockLineItems.TYPE }
	}


	type(): StockLineItemType {
		return StockLineItems.TYPE
	}

}


export default StockLineItems

export type { StockLineItem, StockLineItemType }
