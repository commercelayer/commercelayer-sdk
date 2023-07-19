import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { StockItem } from './stock_items'
import type { Sku } from './skus'
import type { StockReservation } from './stock_reservations'


type ReservedStockRel = ResourceRel & { type: typeof ReservedStocks.TYPE }


interface ReservedStock extends Resource {
	
	quantity?: number

	stock_item?: StockItem
	sku?: Sku
	stock_reservations?: StockReservation[]

}


class ReservedStocks extends ApiResource {

	static readonly TYPE: 'reserved_stocks' = 'reserved_stocks' as const
	// static readonly PATH = 'reserved_stocks'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ReservedStock>> {
		return this.resources.list<ReservedStock>({ type: ReservedStocks.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ReservedStock> {
		return this.resources.retrieve<ReservedStock>({ type: ReservedStocks.TYPE, id }, params, options)
	}

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


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isReservedStock(resource: any): resource is ReservedStock {
		return resource.type && (resource.type === ReservedStocks.TYPE)
	}


	relationship(id: string | ResourceId | null): ReservedStockRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ReservedStocks.TYPE } : { id: id.id, type: ReservedStocks.TYPE }
	}


	type(): string {
		return ReservedStocks.TYPE
	}

}


export default ReservedStocks

export { ReservedStock }
