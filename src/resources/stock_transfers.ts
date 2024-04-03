import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Sku, SkuType } from './skus'
import type { StockLocation, StockLocationType } from './stock_locations'
import type { Shipment, ShipmentType } from './shipments'
import type { LineItem, LineItemType } from './line_items'
import type { Event } from './events'
import type { Version } from './versions'


type StockTransferType = 'stock_transfers'
type StockTransferRel = ResourceRel & { type: StockTransferType }
type SkuRel = ResourceRel & { type: SkuType }
type StockLocationRel = ResourceRel & { type: StockLocationType }
type ShipmentRel = ResourceRel & { type: ShipmentType }
type LineItemRel = ResourceRel & { type: LineItemType }


export type StockTransferSort = Pick<StockTransfer, 'id' | 'number' | 'status' | 'quantity' | 'completed_at' | 'cancelled_at'> & ResourceSort
// export type StockTransferFilter = Pick<StockTransfer, 'id' | 'number' | 'status' | 'quantity' | 'completed_at' | 'cancelled_at'> & ResourceFilter


interface StockTransfer extends Resource {
	
	readonly type: StockTransferType

	number?: Nullable<string>
	sku_code?: Nullable<string>
	status: 'draft' | 'upcoming' | 'on_hold' | 'picking' | 'in_transit' | 'completed' | 'cancelled'
	quantity: number
	completed_at?: Nullable<string>
	cancelled_at?: Nullable<string>

	sku?: Nullable<Sku>
	origin_stock_location?: Nullable<StockLocation>
	destination_stock_location?: Nullable<StockLocation>
	shipment?: Nullable<Shipment>
	line_item?: Nullable<LineItem>
	events?: Nullable<Event[]>
	versions?: Nullable<Version[]>

}


interface StockTransferCreate extends ResourceCreate {
	
	sku_code?: Nullable<string>
	quantity: number

	sku: SkuRel
	origin_stock_location: StockLocationRel
	destination_stock_location: StockLocationRel
	shipment?: Nullable<ShipmentRel>
	line_item?: Nullable<LineItemRel>

}


interface StockTransferUpdate extends ResourceUpdate {
	
	sku_code?: Nullable<string>
	_upcoming?: Nullable<boolean>
	_on_hold?: Nullable<boolean>
	_picking?: Nullable<boolean>
	_in_transit?: Nullable<boolean>
	_complete?: Nullable<boolean>
	_cancel?: Nullable<boolean>

	sku?: Nullable<SkuRel>
	origin_stock_location?: Nullable<StockLocationRel>
	destination_stock_location?: Nullable<StockLocationRel>

}


class StockTransfers extends ApiResource<StockTransfer> {

	static readonly TYPE: StockTransferType = 'stock_transfers' as const

	async create(resource: StockTransferCreate, params?: QueryParamsRetrieve<StockTransfer>, options?: ResourcesConfig): Promise<StockTransfer> {
		return this.resources.create<StockTransferCreate, StockTransfer>({ ...resource, type: StockTransfers.TYPE }, params, options)
	}

	async update(resource: StockTransferUpdate, params?: QueryParamsRetrieve<StockTransfer>, options?: ResourcesConfig): Promise<StockTransfer> {
		return this.resources.update<StockTransferUpdate, StockTransfer>({ ...resource, type: StockTransfers.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: StockTransfers.TYPE } : id, options)
	}

	async sku(stockTransferId: string | StockTransfer, params?: QueryParamsRetrieve<Sku>, options?: ResourcesConfig): Promise<Sku> {
		const _stockTransferId = (stockTransferId as StockTransfer).id || stockTransferId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `stock_transfers/${_stockTransferId}/sku`, params, options) as unknown as Sku
	}

	async origin_stock_location(stockTransferId: string | StockTransfer, params?: QueryParamsRetrieve<StockLocation>, options?: ResourcesConfig): Promise<StockLocation> {
		const _stockTransferId = (stockTransferId as StockTransfer).id || stockTransferId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `stock_transfers/${_stockTransferId}/origin_stock_location`, params, options) as unknown as StockLocation
	}

	async destination_stock_location(stockTransferId: string | StockTransfer, params?: QueryParamsRetrieve<StockLocation>, options?: ResourcesConfig): Promise<StockLocation> {
		const _stockTransferId = (stockTransferId as StockTransfer).id || stockTransferId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `stock_transfers/${_stockTransferId}/destination_stock_location`, params, options) as unknown as StockLocation
	}

	async shipment(stockTransferId: string | StockTransfer, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		const _stockTransferId = (stockTransferId as StockTransfer).id || stockTransferId as string
		return this.resources.fetch<Shipment>({ type: 'shipments' }, `stock_transfers/${_stockTransferId}/shipment`, params, options) as unknown as Shipment
	}

	async line_item(stockTransferId: string | StockTransfer, params?: QueryParamsRetrieve<LineItem>, options?: ResourcesConfig): Promise<LineItem> {
		const _stockTransferId = (stockTransferId as StockTransfer).id || stockTransferId as string
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `stock_transfers/${_stockTransferId}/line_item`, params, options) as unknown as LineItem
	}

	async events(stockTransferId: string | StockTransfer, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _stockTransferId = (stockTransferId as StockTransfer).id || stockTransferId as string
		return this.resources.fetch<Event>({ type: 'events' }, `stock_transfers/${_stockTransferId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(stockTransferId: string | StockTransfer, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _stockTransferId = (stockTransferId as StockTransfer).id || stockTransferId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `stock_transfers/${_stockTransferId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _upcoming(id: string | StockTransfer, params?: QueryParamsRetrieve<StockTransfer>, options?: ResourcesConfig): Promise<StockTransfer> {
		return this.resources.update<StockTransferUpdate, StockTransfer>({ id: (typeof id === 'string')? id: id.id, type: StockTransfers.TYPE, _upcoming: true }, params, options)
	}

	async _on_hold(id: string | StockTransfer, params?: QueryParamsRetrieve<StockTransfer>, options?: ResourcesConfig): Promise<StockTransfer> {
		return this.resources.update<StockTransferUpdate, StockTransfer>({ id: (typeof id === 'string')? id: id.id, type: StockTransfers.TYPE, _on_hold: true }, params, options)
	}

	async _picking(id: string | StockTransfer, params?: QueryParamsRetrieve<StockTransfer>, options?: ResourcesConfig): Promise<StockTransfer> {
		return this.resources.update<StockTransferUpdate, StockTransfer>({ id: (typeof id === 'string')? id: id.id, type: StockTransfers.TYPE, _picking: true }, params, options)
	}

	async _in_transit(id: string | StockTransfer, params?: QueryParamsRetrieve<StockTransfer>, options?: ResourcesConfig): Promise<StockTransfer> {
		return this.resources.update<StockTransferUpdate, StockTransfer>({ id: (typeof id === 'string')? id: id.id, type: StockTransfers.TYPE, _in_transit: true }, params, options)
	}

	async _complete(id: string | StockTransfer, params?: QueryParamsRetrieve<StockTransfer>, options?: ResourcesConfig): Promise<StockTransfer> {
		return this.resources.update<StockTransferUpdate, StockTransfer>({ id: (typeof id === 'string')? id: id.id, type: StockTransfers.TYPE, _complete: true }, params, options)
	}

	async _cancel(id: string | StockTransfer, params?: QueryParamsRetrieve<StockTransfer>, options?: ResourcesConfig): Promise<StockTransfer> {
		return this.resources.update<StockTransferUpdate, StockTransfer>({ id: (typeof id === 'string')? id: id.id, type: StockTransfers.TYPE, _cancel: true }, params, options)
	}


	isStockTransfer(resource: any): resource is StockTransfer {
		return resource.type && (resource.type === StockTransfers.TYPE)
	}


	relationship(id: string | ResourceId | null): StockTransferRel {
		return super.relationshipOneToOne<StockTransferRel>(id)
	}

	relationshipToMany(...ids: string[]): StockTransferRel[] {
		return super.relationshipOneToMany<StockTransferRel>(...ids)
	}


	type(): StockTransferType {
		return StockTransfers.TYPE
	}

}


export default StockTransfers

export type { StockTransfer, StockTransferCreate, StockTransferUpdate, StockTransferType }
