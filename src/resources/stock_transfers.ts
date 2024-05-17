import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Sku } from './skus'
import type { StockLocation } from './stock_locations'
import type { Shipment } from './shipments'
import type { LineItem } from './line_items'
import type { Event } from './events'
import type { Version } from './versions'


type StockTransferRel = ResourceRel & { type: typeof StockTransfers.TYPE }
type SkuRel = ResourceRel & { type: 'skus' }
type StockLocationRel = ResourceRel & { type: 'stock_locations' }
type ShipmentRel = ResourceRel & { type: 'shipments' }
type LineItemRel = ResourceRel & { type: 'line_items' }


interface StockTransfer extends Resource {
	
	number?: string
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
	events?: Event[]
	versions?: Version[]

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
	_on_hold?: boolean
	_picking?: boolean
	_in_transit?: boolean
	_complete?: boolean
	_cancel?: boolean

	sku?: SkuRel
	origin_stock_location?: StockLocationRel
	destination_stock_location?: StockLocationRel
	shipment?: ShipmentRel
	line_item?: LineItemRel

}


class StockTransfers extends ApiResource {

	static readonly TYPE: 'stock_transfers' = 'stock_transfers' as const
	// static readonly PATH = 'stock_transfers'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockTransfer>> {
		return this.resources.list<StockTransfer>({ type: StockTransfers.TYPE }, params, options)
	}

	async create(resource: StockTransferCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockTransfer> {
		return this.resources.create<StockTransferCreate, StockTransfer>({ ...resource, type: StockTransfers.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockTransfer> {
		return this.resources.retrieve<StockTransfer>({ type: StockTransfers.TYPE, id }, params, options)
	}

	async update(resource: StockTransferUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockTransfer> {
		return this.resources.update<StockTransferUpdate, StockTransfer>({ ...resource, type: StockTransfers.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: StockTransfers.TYPE, id }, options)
	}

	async sku(stockTransferId: string | StockTransfer, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku> {
		const _stockTransferId = (stockTransferId as StockTransfer).id || stockTransferId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `stock_transfers/${_stockTransferId}/sku`, params, options) as unknown as Sku
	}

	async origin_stock_location(stockTransferId: string | StockTransfer, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		const _stockTransferId = (stockTransferId as StockTransfer).id || stockTransferId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `stock_transfers/${_stockTransferId}/origin_stock_location`, params, options) as unknown as StockLocation
	}

	async destination_stock_location(stockTransferId: string | StockTransfer, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		const _stockTransferId = (stockTransferId as StockTransfer).id || stockTransferId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `stock_transfers/${_stockTransferId}/destination_stock_location`, params, options) as unknown as StockLocation
	}

	async shipment(stockTransferId: string | StockTransfer, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Shipment> {
		const _stockTransferId = (stockTransferId as StockTransfer).id || stockTransferId as string
		return this.resources.fetch<Shipment>({ type: 'shipments' }, `stock_transfers/${_stockTransferId}/shipment`, params, options) as unknown as Shipment
	}

	async line_item(stockTransferId: string | StockTransfer, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
		const _stockTransferId = (stockTransferId as StockTransfer).id || stockTransferId as string
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `stock_transfers/${_stockTransferId}/line_item`, params, options) as unknown as LineItem
	}

	async events(stockTransferId: string | StockTransfer, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _stockTransferId = (stockTransferId as StockTransfer).id || stockTransferId as string
		return this.resources.fetch<Event>({ type: 'events' }, `stock_transfers/${_stockTransferId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(stockTransferId: string | StockTransfer, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _stockTransferId = (stockTransferId as StockTransfer).id || stockTransferId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `stock_transfers/${_stockTransferId}/versions`, params, options) as unknown as ListResponse<Version>
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
