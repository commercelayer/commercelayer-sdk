import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { LineItem } from './line_items'
import type { Order } from './orders'
import type { StockItem } from './stock_items'
import type { ReservedStock } from './reserved_stocks'
import type { Sku } from './skus'


type StockReservationType = 'stock_reservations'
type StockReservationRel = ResourceRel & { type: StockReservationType }


interface StockReservation extends Resource {
	
	readonly type: StockReservationType

	status: 'draft' | 'pending'
	quantity: number
	expires_at: string

	line_item?: LineItem | null
	order?: Order | null
	stock_item?: StockItem | null
	reserved_stock?: ReservedStock | null
	sku?: Sku | null

}


class StockReservations extends ApiResource<StockReservation> {

	static readonly TYPE: StockReservationType = 'stock_reservations' as const

	async line_item(stockReservationId: string | StockReservation, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
		const _stockReservationId = (stockReservationId as StockReservation).id || stockReservationId as string
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `stock_reservations/${_stockReservationId}/line_item`, params, options) as unknown as LineItem
	}

	async order(stockReservationId: string | StockReservation, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _stockReservationId = (stockReservationId as StockReservation).id || stockReservationId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `stock_reservations/${_stockReservationId}/order`, params, options) as unknown as Order
	}

	async stock_item(stockReservationId: string | StockReservation, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockItem> {
		const _stockReservationId = (stockReservationId as StockReservation).id || stockReservationId as string
		return this.resources.fetch<StockItem>({ type: 'stock_items' }, `stock_reservations/${_stockReservationId}/stock_item`, params, options) as unknown as StockItem
	}

	async reserved_stock(stockReservationId: string | StockReservation, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ReservedStock> {
		const _stockReservationId = (stockReservationId as StockReservation).id || stockReservationId as string
		return this.resources.fetch<ReservedStock>({ type: 'reserved_stocks' }, `stock_reservations/${_stockReservationId}/reserved_stock`, params, options) as unknown as ReservedStock
	}

	async sku(stockReservationId: string | StockReservation, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku> {
		const _stockReservationId = (stockReservationId as StockReservation).id || stockReservationId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `stock_reservations/${_stockReservationId}/sku`, params, options) as unknown as Sku
	}


	isStockReservation(resource: any): resource is StockReservation {
		return resource.type && (resource.type === StockReservations.TYPE)
	}


	relationship(id: string | ResourceId | null): StockReservationRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: StockReservations.TYPE } : { id: id.id, type: StockReservations.TYPE }
	}


	type(): StockReservationType {
		return StockReservations.TYPE
	}

}


export default StockReservations

export type { StockReservation, StockReservationType }
