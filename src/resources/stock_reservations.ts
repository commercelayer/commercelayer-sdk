import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { LineItem } from './line_items'
import type { StockItem } from './stock_items'


type StockReservationRel = ResourceRel & { type: typeof StockReservations.TYPE }


interface StockReservation extends Resource {
	
	status?: string
	quantity?: number
	expires_at?: string

	line_item?: LineItem
	stock_item?: StockItem

}


class StockReservations extends ApiResource {

	static readonly TYPE: 'stock_reservations' = 'stock_reservations' as const
	// static readonly PATH = 'stock_reservations'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockReservation>> {
		return this.resources.list<StockReservation>({ type: StockReservations.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockReservation> {
		return this.resources.retrieve<StockReservation>({ type: StockReservations.TYPE, id }, params, options)
	}

	async line_item(stockReservationId: string | StockReservation, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
		const _stockReservationId = (stockReservationId as StockReservation).id || stockReservationId as string
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `stock_reservations/${_stockReservationId}/line_item`, params, options) as unknown as LineItem
	}

	async stock_item(stockReservationId: string | StockReservation, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockItem> {
		const _stockReservationId = (stockReservationId as StockReservation).id || stockReservationId as string
		return this.resources.fetch<StockItem>({ type: 'stock_items' }, `stock_reservations/${_stockReservationId}/stock_item`, params, options) as unknown as StockItem
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isStockReservation(resource: any): resource is StockReservation {
		return resource.type && (resource.type === StockReservations.TYPE)
	}


	relationship(id: string | ResourceId | null): StockReservationRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: StockReservations.TYPE } : { id: id.id, type: StockReservations.TYPE }
	}


	type(): string {
		return StockReservations.TYPE
	}

}


export default StockReservations

export { StockReservation }
