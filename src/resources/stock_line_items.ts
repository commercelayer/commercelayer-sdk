import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Shipment } from './shipments'
import { LineItem } from './line_items'
import { StockItem } from './stock_items'


type StockLineItemRel = ResourceRel & { type: typeof StockLineItems.TYPE }


interface StockLineItem extends Resource {
	
	sku_code?: string
	bundle_code?: string
	quantity?: number

	shipment?: Shipment
	line_item?: LineItem
	stock_item?: StockItem

}


class StockLineItems extends ApiResource {

	static readonly TYPE: 'stock_line_items' = 'stock_line_items'
	// static readonly PATH = 'stock_line_items'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockLineItem>> {
		return this.resources.list<StockLineItem>({ type: StockLineItems.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLineItem> {
		return this.resources.retrieve<StockLineItem>({ type: StockLineItems.TYPE, id }, params, options)
	}

	async shipment(stockLineItemId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.fetch<Shipment>({ type: 'shipments' }, `stock_line_items/${stockLineItemId}/shipment`, params, options) as unknown as Shipment
	}

	async line_item(stockLineItemId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `stock_line_items/${stockLineItemId}/line_item`, params, options) as unknown as LineItem
	}

	async stock_item(stockLineItemId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockItem> {
		return this.resources.fetch<StockItem>({ type: 'stock_items' }, `stock_line_items/${stockLineItemId}/stock_item`, params, options) as unknown as StockItem
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isStockLineItem(resource: any): resource is StockLineItem {
		return resource.type && (resource.type === StockLineItems.TYPE)
	}


	relationship(id: string | ResourceId | null): StockLineItemRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: StockLineItems.TYPE } : { id: id.id, type: StockLineItems.TYPE }
	}


	type(): string {
		return StockLineItems.TYPE
	}

}


export default StockLineItems

export { StockLineItem }
