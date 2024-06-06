import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Sku, SkuType } from './skus'
import type { StockLocation, StockLocationType } from './stock_locations'
import type { Shipment, ShipmentType } from './shipments'
import type { LineItem, LineItemType } from './line_items'
import type { Attachment } from './attachments'
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

	/** 
	 * Unique identifier for the stock transfer (numeric)..
	 * @example ```"1234"```
	 */
	number?: string | null
	/** 
	 * The code of the associated SKU..
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null
	/** 
	 * The stock transfer status, one of 'draft', 'upcoming', 'on_hold', 'picking', 'in_transit', 'completed', or 'cancelled'.
	 * @example ```"draft"```
	 */
	status: 'draft' | 'upcoming' | 'on_hold' | 'picking' | 'in_transit' | 'completed' | 'cancelled'
	/** 
	 * The stock quantity to be transferred from the origin stock location to destination one.
	 * @example ```"2"```
	 */
	quantity: number
	/** 
	 * Time at which the stock transfer was completed..
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	completed_at?: string | null
	/** 
	 * Time at which the stock transfer was cancelled..
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	cancelled_at?: string | null

	sku?: Sku | null
	origin_stock_location?: StockLocation | null
	destination_stock_location?: StockLocation | null
	shipment?: Shipment | null
	line_item?: LineItem | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	versions?: Version[] | null

}


interface StockTransferCreate extends ResourceCreate {
	
	/** 
	 * Unique identifier for the stock transfer (numeric)..
	 * @example ```"1234"```
	 */
	number?: string | null
	/** 
	 * The code of the associated SKU..
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null
	/** 
	 * The stock quantity to be transferred from the origin stock location to destination one.
	 * @example ```"2"```
	 */
	quantity: number

	sku: SkuRel
	origin_stock_location: StockLocationRel
	destination_stock_location: StockLocationRel
	shipment?: ShipmentRel | null
	line_item?: LineItemRel | null

}


interface StockTransferUpdate extends ResourceUpdate {
	
	/** 
	 * Unique identifier for the stock transfer (numeric)..
	 * @example ```"1234"```
	 */
	number?: string | null
	/** 
	 * The code of the associated SKU..
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null
	/** 
	 * Send this attribute if you want to mark this stock transfer as upcoming..
	 * @example ```"true"```
	 */
	_upcoming?: boolean | null
	/** 
	 * Send this attribute if you want to put this stock transfer on hold..
	 * @example ```"true"```
	 */
	_on_hold?: boolean | null
	/** 
	 * Send this attribute if you want to start picking this stock transfer..
	 * @example ```"true"```
	 */
	_picking?: boolean | null
	/** 
	 * Send this attribute if you want to mark this stock transfer as in transit..
	 * @example ```"true"```
	 */
	_in_transit?: boolean | null
	/** 
	 * Send this attribute if you want to complete this stock transfer..
	 * @example ```"true"```
	 */
	_complete?: boolean | null
	/** 
	 * Send this attribute if you want to cancel this stock transfer..
	 * @example ```"true"```
	 */
	_cancel?: boolean | null

	sku?: SkuRel | null
	origin_stock_location?: StockLocationRel | null
	destination_stock_location?: StockLocationRel | null
	shipment?: ShipmentRel | null
	line_item?: LineItemRel | null

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

	async attachments(stockTransferId: string | StockTransfer, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _stockTransferId = (stockTransferId as StockTransfer).id || stockTransferId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `stock_transfers/${_stockTransferId}/attachments`, params, options) as unknown as ListResponse<Attachment>
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
