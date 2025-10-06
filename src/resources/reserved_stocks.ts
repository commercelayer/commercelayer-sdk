import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { StockItem } from './stock_items'
import type { Sku } from './skus'
import type { StockReservation } from './stock_reservations'
import type { Version } from './versions'
import type { EventStore } from './event_stores'


type ReservedStockType = 'reserved_stocks'
type ReservedStockRel = ResourceRel & { type: ReservedStockType }


export type ReservedStockSort = Pick<ReservedStock, 'id' | 'quantity'> & ResourceSort
// export type ReservedStockFilter = Pick<ReservedStock, 'id' | 'quantity'> & ResourceFilter


interface ReservedStock extends Resource {
	
	readonly type: ReservedStockType

	/** 
	 * The stock item reserved quantity.
	 * @example ```100```
	 */
	quantity: number

	stock_item?: StockItem | null
	sku?: Sku | null
	stock_reservations?: StockReservation[] | null
	versions?: Version[] | null
	event_stores?: EventStore[] | null

}


class ReservedStocks extends ApiResource<ReservedStock> {

	static readonly TYPE: ReservedStockType = 'reserved_stocks' as const

	async stock_item(reservedStockId: string | ReservedStock, params?: QueryParamsRetrieve<StockItem>, options?: ResourcesConfig): Promise<StockItem> {
		const _reservedStockId = (reservedStockId as ReservedStock).id || reservedStockId as string
		return this.resources.fetch<StockItem>({ type: 'stock_items' }, `reserved_stocks/${_reservedStockId}/stock_item`, params, options) as unknown as StockItem
	}

	async sku(reservedStockId: string | ReservedStock, params?: QueryParamsRetrieve<Sku>, options?: ResourcesConfig): Promise<Sku> {
		const _reservedStockId = (reservedStockId as ReservedStock).id || reservedStockId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `reserved_stocks/${_reservedStockId}/sku`, params, options) as unknown as Sku
	}

	async stock_reservations(reservedStockId: string | ReservedStock, params?: QueryParamsList<StockReservation>, options?: ResourcesConfig): Promise<ListResponse<StockReservation>> {
		const _reservedStockId = (reservedStockId as ReservedStock).id || reservedStockId as string
		return this.resources.fetch<StockReservation>({ type: 'stock_reservations' }, `reserved_stocks/${_reservedStockId}/stock_reservations`, params, options) as unknown as ListResponse<StockReservation>
	}

	async versions(reservedStockId: string | ReservedStock, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _reservedStockId = (reservedStockId as ReservedStock).id || reservedStockId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `reserved_stocks/${_reservedStockId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async event_stores(reservedStockId: string | ReservedStock, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _reservedStockId = (reservedStockId as ReservedStock).id || reservedStockId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `reserved_stocks/${_reservedStockId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}


	isReservedStock(resource: any): resource is ReservedStock {
		return resource.type && (resource.type === ReservedStocks.TYPE)
	}


	relationship(id: string | ResourceId | null): ReservedStockRel {
		return super.relationshipOneToOne<ReservedStockRel>(id)
	}

	relationshipToMany(...ids: string[]): ReservedStockRel[] {
		return super.relationshipOneToMany<ReservedStockRel>(...ids)
	}


	type(): ReservedStockType {
		return ReservedStocks.TYPE
	}

}


export default ReservedStocks

export type { ReservedStock, ReservedStockType }
