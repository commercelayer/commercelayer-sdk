import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Sku, SkuType } from './skus'
import type { StockLocation, StockLocationType } from './stock_locations'
import type { Shipment, ShipmentType } from './shipments'
import type { LineItem, LineItemType } from './line_items'
import type { Event } from './events'


type StockTransferType = 'stock_transfers'
type StockTransferRel = ResourceRel & { type: StockTransferType }
type SkuRel = ResourceRel & { type: SkuType }
type StockLocationRel = ResourceRel & { type: StockLocationType }
type ShipmentRel = ResourceRel & { type: ShipmentType }
type LineItemRel = ResourceRel & { type: LineItemType }


interface StockTransfer extends Resource {
	
	readonly type: StockTransferType

	sku_code?: string | null
	status: 'draft' | 'upcoming' | 'picking' | 'in_transit' | 'completed' | 'cancelled'
	quantity: number
	completed_at?: string | null
	cancelled_at?: string | null

	sku?: Sku | null
	origin_stock_location?: StockLocation | null
	destination_stock_location?: StockLocation | null
	shipment?: Shipment | null
	line_item?: LineItem | null
	events?: Event[] | null

}


interface StockTransferCreate extends ResourceCreate {
	
	sku_code?: string | null
	quantity: number

	sku: SkuRel
	origin_stock_location: StockLocationRel
	destination_stock_location: StockLocationRel
	shipment?: ShipmentRel | null
	line_item?: LineItemRel | null

}


interface StockTransferUpdate extends ResourceUpdate {
	
	sku_code?: string | null
	_upcoming?: boolean | null
	_picking?: boolean | null
	_in_transit?: boolean | null
	_complete?: boolean | null
	_cancel?: boolean | null

	sku?: SkuRel | null
	origin_stock_location?: StockLocationRel | null
	destination_stock_location?: StockLocationRel | null

}


class StockTransfers extends ApiResource<StockTransfer> {

	static readonly TYPE: StockTransferType = 'stock_transfers' as const

	async create(resource: StockTransferCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockTransfer> {
		return this.resources.create<StockTransferCreate, StockTransfer>({ ...resource, type: StockTransfers.TYPE }, params, options)
	}

	async update(resource: StockTransferUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockTransfer> {
		return this.resources.update<StockTransferUpdate, StockTransfer>({ ...resource, type: StockTransfers.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: StockTransfers.TYPE } : id, options)
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


	isStockTransfer(resource: any): resource is StockTransfer {
		return resource.type && (resource.type === StockTransfers.TYPE)
	}


	relationship(id: string | ResourceId | null): StockTransferRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: StockTransfers.TYPE } : { id: id.id, type: StockTransfers.TYPE }
	}


	type(): StockTransferType {
		return StockTransfers.TYPE
	}

}


export default StockTransfers

export type { StockTransfer, StockTransferCreate, StockTransferUpdate, StockTransferType }
