import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Shipment } from './shipments'
import type { LineItem } from './line_items'
import type { StockItem } from './stock_items'
import type { Sku } from './skus'
import type { Version } from './versions'


type StockLineItemRel = ResourceRel & { type: typeof StockLineItems.TYPE }
type ShipmentRel = ResourceRel & { type: 'shipments' }
type LineItemRel = ResourceRel & { type: 'line_items' }
type StockItemRel = ResourceRel & { type: 'stock_items' }
type SkuRel = ResourceRel & { type: 'skus' }


interface StockLineItem extends Resource {
	
	sku_code?: string
	bundle_code?: string
	quantity?: number

	shipment?: Shipment
	line_item?: LineItem
	stock_item?: StockItem
	sku?: Sku
	versions?: Version[]

}


interface StockLineItemCreate extends ResourceCreate {
	
	sku_code?: string
	quantity: number

	shipment?: ShipmentRel
	line_item?: LineItemRel
	stock_item?: StockItemRel
	sku?: SkuRel

}


interface StockLineItemUpdate extends ResourceUpdate {
	
	sku_code?: string
	quantity?: number

	shipment?: ShipmentRel
	line_item?: LineItemRel
	stock_item?: StockItemRel
	sku?: SkuRel

}


class StockLineItems extends ApiResource {

	static readonly TYPE: 'stock_line_items' = 'stock_line_items' as const
	// static readonly PATH = 'stock_line_items'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockLineItem>> {
		return this.resources.list<StockLineItem>({ type: StockLineItems.TYPE }, params, options)
	}

	async create(resource: StockLineItemCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLineItem> {
		return this.resources.create<StockLineItemCreate, StockLineItem>({ ...resource, type: StockLineItems.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLineItem> {
		return this.resources.retrieve<StockLineItem>({ type: StockLineItems.TYPE, id }, params, options)
	}

	async update(resource: StockLineItemUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLineItem> {
		return this.resources.update<StockLineItemUpdate, StockLineItem>({ ...resource, type: StockLineItems.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: StockLineItems.TYPE, id }, options)
	}

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

	async sku(stockLineItemId: string | StockLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku> {
		const _stockLineItemId = (stockLineItemId as StockLineItem).id || stockLineItemId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `stock_line_items/${_stockLineItemId}/sku`, params, options) as unknown as Sku
	}

	async versions(stockLineItemId: string | StockLineItem, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _stockLineItemId = (stockLineItemId as StockLineItem).id || stockLineItemId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `stock_line_items/${_stockLineItemId}/versions`, params, options) as unknown as ListResponse<Version>
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

export { StockLineItem, StockLineItemCreate, StockLineItemUpdate }
