import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Sku } from './skus'
import { StockLocation } from './stock_locations'
import { Shipment } from './shipments'
import { LineItem } from './line_items'


type StockTransferRel = ResourceRel & { type: typeof StockTransfers.TYPE }
type SkuRel = ResourceRel & { type: 'skus' }
type StockLocationRel = ResourceRel & { type: 'stock_locations' }
type ShipmentRel = ResourceRel & { type: 'shipments' }
type LineItemRel = ResourceRel & { type: 'line_items' }


interface StockTransfer extends Resource {
	
	sku_code?: string
	status?: string
	quantity?: number
	completed_at?: string
	cancelled_at?: string

	sku?: Sku
	origin_stock_location?: StockLocation
	destination_stock_location?: StockLocation
	shipment?: Shipment
	line_item?: LineItem

}


interface StockTransferCreate extends ResourceCreate {
	
	sku_code?: string
	quantity: number

	sku: SkuRel
	origin_stock_location: StockLocationRel
	destination_stock_location: StockLocationRel
	shipment?: ShipmentRel
	line_item?: LineItemRel

}


interface StockTransferUpdate extends ResourceUpdate {
	
	sku_code?: string
	_upcoming?: boolean
	_picking?: boolean
	_in_transit?: boolean
	_complete?: boolean
	_cancel?: boolean

	sku?: SkuRel
	origin_stock_location?: StockLocationRel
	destination_stock_location?: StockLocationRel

}


class StockTransfers extends ApiResource {

	static readonly TYPE: 'stock_transfers' = 'stock_transfers'
	// static readonly PATH = 'stock_transfers'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockTransfer>> {
		return this.resources.list<StockTransfer>({ type: StockTransfers.TYPE }, params, options)
	}

	async create(resource: StockTransferCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockTransfer> {
		return this.resources.create({ ...resource, type: StockTransfers.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockTransfer> {
		return this.resources.retrieve<StockTransfer>({ type: StockTransfers.TYPE, id }, params, options)
	}

	async update(resource: StockTransferUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockTransfer> {
		return this.resources.update({ ...resource, type: StockTransfers.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: StockTransfers.TYPE, id }, options)
	}

	async sku(stockTransferId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku> {
		return this.resources.fetch<Sku>({ type: 'skus' }, `stock_transfers/${stockTransferId}/sku`, params, options) as unknown as Sku
	}

	async origin_stock_location(stockTransferId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `stock_transfers/${stockTransferId}/origin_stock_location`, params, options) as unknown as StockLocation
	}

	async destination_stock_location(stockTransferId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `stock_transfers/${stockTransferId}/destination_stock_location`, params, options) as unknown as StockLocation
	}

	async shipment(stockTransferId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		return this.resources.fetch<Shipment>({ type: 'shipments' }, `stock_transfers/${stockTransferId}/shipment`, params, options) as unknown as Shipment
	}

	async line_item(stockTransferId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `stock_transfers/${stockTransferId}/line_item`, params, options) as unknown as LineItem
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isStockTransfer(resource: any): resource is StockTransfer {
		return resource.type && (resource.type === StockTransfers.TYPE)
	}


	relationship(id: string | ResourceId | null): StockTransferRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: StockTransfers.TYPE } : { id: id.id, type: StockTransfers.TYPE }
	}


	type(): string {
		return StockTransfers.TYPE
	}

}


export default StockTransfers

export { StockTransfer, StockTransferCreate, StockTransferUpdate }
