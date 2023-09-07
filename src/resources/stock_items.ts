import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { StockLocation } from './stock_locations'
import type { Sku } from './skus'
import type { ReservedStock } from './reserved_stocks'
import type { StockReservation } from './stock_reservations'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type StockItemRel = ResourceRel & { type: typeof StockItems.TYPE }
type StockLocationRel = ResourceRel & { type: 'stock_locations' }
type SkuRel = ResourceRel & { type: 'skus' }


interface StockItem extends Resource {
	
	sku_code?: string
	quantity?: number

	stock_location?: StockLocation
	sku?: Sku
	reserved_stock?: ReservedStock
	stock_reservations?: StockReservation[]
	attachments?: Attachment[]
	versions?: Version[]

}


interface StockItemCreate extends ResourceCreate {
	
	sku_code?: string
	quantity: number

	stock_location: StockLocationRel
	sku?: SkuRel

}


interface StockItemUpdate extends ResourceUpdate {
	
	sku_code?: string
	quantity?: number

	stock_location?: StockLocationRel
	sku?: SkuRel

}


class StockItems extends ApiResource {

	static readonly TYPE: 'stock_items' = 'stock_items' as const
	// static readonly PATH = 'stock_items'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockItem>> {
		return this.resources.list<StockItem>({ type: StockItems.TYPE }, params, options)
	}

	async create(resource: StockItemCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockItem> {
		return this.resources.create<StockItemCreate, StockItem>({ ...resource, type: StockItems.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockItem> {
		return this.resources.retrieve<StockItem>({ type: StockItems.TYPE, id }, params, options)
	}

	async update(resource: StockItemUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockItem> {
		return this.resources.update<StockItemUpdate, StockItem>({ ...resource, type: StockItems.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: StockItems.TYPE, id }, options)
	}

	async stock_location(stockItemId: string | StockItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		const _stockItemId = (stockItemId as StockItem).id || stockItemId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `stock_items/${_stockItemId}/stock_location`, params, options) as unknown as StockLocation
	}

	async sku(stockItemId: string | StockItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku> {
		const _stockItemId = (stockItemId as StockItem).id || stockItemId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `stock_items/${_stockItemId}/sku`, params, options) as unknown as Sku
	}

	async reserved_stock(stockItemId: string | StockItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ReservedStock> {
		const _stockItemId = (stockItemId as StockItem).id || stockItemId as string
		return this.resources.fetch<ReservedStock>({ type: 'reserved_stocks' }, `stock_items/${_stockItemId}/reserved_stock`, params, options) as unknown as ReservedStock
	}

	async stock_reservations(stockItemId: string | StockItem, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockReservation>> {
		const _stockItemId = (stockItemId as StockItem).id || stockItemId as string
		return this.resources.fetch<StockReservation>({ type: 'stock_reservations' }, `stock_items/${_stockItemId}/stock_reservations`, params, options) as unknown as ListResponse<StockReservation>
	}

	async attachments(stockItemId: string | StockItem, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _stockItemId = (stockItemId as StockItem).id || stockItemId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `stock_items/${_stockItemId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(stockItemId: string | StockItem, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _stockItemId = (stockItemId as StockItem).id || stockItemId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `stock_items/${_stockItemId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isStockItem(resource: any): resource is StockItem {
		return resource.type && (resource.type === StockItems.TYPE)
	}


	relationship(id: string | ResourceId | null): StockItemRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: StockItems.TYPE } : { id: id.id, type: StockItems.TYPE }
	}


	type(): string {
		return StockItems.TYPE
	}

}


export default StockItems

export { StockItem, StockItemCreate, StockItemUpdate }
