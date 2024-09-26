import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { LineItem } from './line_items'
import type { Order } from './orders'
import type { StockLineItem } from './stock_line_items'
import type { StockTransfer } from './stock_transfers'
import type { StockItem, StockItemType } from './stock_items'
import type { ReservedStock } from './reserved_stocks'
import type { Sku } from './skus'


type StockReservationType = 'stock_reservations'
type StockReservationRel = ResourceRel & { type: StockReservationType }
type StockItemRel = ResourceRel & { type: StockItemType }


export type StockReservationSort = Pick<StockReservation, 'id' | 'status' | 'quantity' | 'expires_at'> & ResourceSort
// export type StockReservationFilter = Pick<StockReservation, 'id' | 'status' | 'quantity' | 'expires_at'> & ResourceFilter


interface StockReservation extends Resource {
	
	readonly type: StockReservationType

	/** 
	 * The stock reservation status. One of 'draft' (default), or 'pending'.
	 * @example ```"draft"```
	 */
	status: 'draft' | 'pending'
	/** 
	 * The stock reservation quantity.
	 * @example ```"4"```
	 */
	quantity: number
	/** 
	 * The expiration date/time of this stock reservation.
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at: string

	line_item?: LineItem | null
	order?: Order | null
	stock_line_item?: StockLineItem | null
	stock_transfer?: StockTransfer | null
	stock_item?: StockItem | null
	reserved_stock?: ReservedStock | null
	sku?: Sku | null

}


interface StockReservationCreate extends ResourceCreate {
	
	/** 
	 * The stock reservation quantity.
	 * @example ```"4"```
	 */
	quantity: number

	stock_item: StockItemRel

}


interface StockReservationUpdate extends ResourceUpdate {
	
	/** 
	 * The stock reservation quantity.
	 * @example ```"4"```
	 */
	quantity?: number | null
	/** 
	 * Send this attribute if you want to mark this stock reservation as pending.
	 * @example ```"true"```
	 */
	_pending?: boolean | null
	
}


class StockReservations extends ApiResource<StockReservation> {

	static readonly TYPE: StockReservationType = 'stock_reservations' as const

	async create(resource: StockReservationCreate, params?: QueryParamsRetrieve<StockReservation>, options?: ResourcesConfig): Promise<StockReservation> {
		return this.resources.create<StockReservationCreate, StockReservation>({ ...resource, type: StockReservations.TYPE }, params, options)
	}

	async update(resource: StockReservationUpdate, params?: QueryParamsRetrieve<StockReservation>, options?: ResourcesConfig): Promise<StockReservation> {
		return this.resources.update<StockReservationUpdate, StockReservation>({ ...resource, type: StockReservations.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: StockReservations.TYPE } : id, options)
	}

	async line_item(stockReservationId: string | StockReservation, params?: QueryParamsRetrieve<LineItem>, options?: ResourcesConfig): Promise<LineItem> {
		const _stockReservationId = (stockReservationId as StockReservation).id || stockReservationId as string
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `stock_reservations/${_stockReservationId}/line_item`, params, options) as unknown as LineItem
	}

	async order(stockReservationId: string | StockReservation, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _stockReservationId = (stockReservationId as StockReservation).id || stockReservationId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `stock_reservations/${_stockReservationId}/order`, params, options) as unknown as Order
	}

	async stock_line_item(stockReservationId: string | StockReservation, params?: QueryParamsRetrieve<StockLineItem>, options?: ResourcesConfig): Promise<StockLineItem> {
		const _stockReservationId = (stockReservationId as StockReservation).id || stockReservationId as string
		return this.resources.fetch<StockLineItem>({ type: 'stock_line_items' }, `stock_reservations/${_stockReservationId}/stock_line_item`, params, options) as unknown as StockLineItem
	}

	async stock_transfer(stockReservationId: string | StockReservation, params?: QueryParamsRetrieve<StockTransfer>, options?: ResourcesConfig): Promise<StockTransfer> {
		const _stockReservationId = (stockReservationId as StockReservation).id || stockReservationId as string
		return this.resources.fetch<StockTransfer>({ type: 'stock_transfers' }, `stock_reservations/${_stockReservationId}/stock_transfer`, params, options) as unknown as StockTransfer
	}

	async stock_item(stockReservationId: string | StockReservation, params?: QueryParamsRetrieve<StockItem>, options?: ResourcesConfig): Promise<StockItem> {
		const _stockReservationId = (stockReservationId as StockReservation).id || stockReservationId as string
		return this.resources.fetch<StockItem>({ type: 'stock_items' }, `stock_reservations/${_stockReservationId}/stock_item`, params, options) as unknown as StockItem
	}

	async reserved_stock(stockReservationId: string | StockReservation, params?: QueryParamsRetrieve<ReservedStock>, options?: ResourcesConfig): Promise<ReservedStock> {
		const _stockReservationId = (stockReservationId as StockReservation).id || stockReservationId as string
		return this.resources.fetch<ReservedStock>({ type: 'reserved_stocks' }, `stock_reservations/${_stockReservationId}/reserved_stock`, params, options) as unknown as ReservedStock
	}

	async sku(stockReservationId: string | StockReservation, params?: QueryParamsRetrieve<Sku>, options?: ResourcesConfig): Promise<Sku> {
		const _stockReservationId = (stockReservationId as StockReservation).id || stockReservationId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `stock_reservations/${_stockReservationId}/sku`, params, options) as unknown as Sku
	}

	async _pending(id: string | StockReservation, params?: QueryParamsRetrieve<StockReservation>, options?: ResourcesConfig): Promise<StockReservation> {
		return this.resources.update<StockReservationUpdate, StockReservation>({ id: (typeof id === 'string')? id: id.id, type: StockReservations.TYPE, _pending: true }, params, options)
	}


	isStockReservation(resource: any): resource is StockReservation {
		return resource.type && (resource.type === StockReservations.TYPE)
	}


	relationship(id: string | ResourceId | null): StockReservationRel {
		return super.relationshipOneToOne<StockReservationRel>(id)
	}

	relationshipToMany(...ids: string[]): StockReservationRel[] {
		return super.relationshipOneToMany<StockReservationRel>(...ids)
	}


	type(): StockReservationType {
		return StockReservations.TYPE
	}

}


export default StockReservations

export type { StockReservation, StockReservationCreate, StockReservationUpdate, StockReservationType }
