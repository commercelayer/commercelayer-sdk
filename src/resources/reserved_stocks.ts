import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { StockItem } from './stock_items'
import type { Sku } from './skus'
import type { StockReservation } from './stock_reservations'


type ReservedStockType = 'reserved_stocks'
type ReservedStockRel = ResourceRel & { type: ReservedStockType }


interface ReservedStock extends Resource {
	
	readonly type: ReservedStockType

	quantity: number

	stock_item?: StockItem | null
	sku?: Sku | null
	stock_reservations?: StockReservation[] | null

}


class ReservedStocks extends ApiResource<ReservedStock> {

	static readonly TYPE: ReservedStockType = 'reserved_stocks' as const

	async stock_item(reservedStockId: string | ReservedStock, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockItem> {
		const _reservedStockId = (reservedStockId as ReservedStock).id || reservedStockId as string
		return this.resources.fetch<StockItem>({ type: 'stock_items' }, `reserved_stocks/${_reservedStockId}/stock_item`, params, options) as unknown as StockItem
	}

	async sku(reservedStockId: string | ReservedStock, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku> {
		const _reservedStockId = (reservedStockId as ReservedStock).id || reservedStockId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `reserved_stocks/${_reservedStockId}/sku`, params, options) as unknown as Sku
	}

	async stock_reservations(reservedStockId: string | ReservedStock, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockReservation>> {
		const _reservedStockId = (reservedStockId as ReservedStock).id || reservedStockId as string
		return this.resources.fetch<StockReservation>({ type: 'stock_reservations' }, `reserved_stocks/${_reservedStockId}/stock_reservations`, params, options) as unknown as ListResponse<StockReservation>
	}


	isReservedStock(resource: any): resource is ReservedStock {
		return resource.type && (resource.type === ReservedStocks.TYPE)
	}


	relationship(id: string | ResourceId | null): ReservedStockRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ReservedStocks.TYPE } : { id: id.id, type: ReservedStocks.TYPE }
	}


	type(): ReservedStockType {
		return ReservedStocks.TYPE
	}

}


export default ReservedStocks

export type { ReservedStock, ReservedStockType }
