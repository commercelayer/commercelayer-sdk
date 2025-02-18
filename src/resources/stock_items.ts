import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { StockLocation, StockLocationType } from './stock_locations'
import type { Sku, SkuType } from './skus'
import type { ReservedStock } from './reserved_stocks'
import type { StockReservation } from './stock_reservations'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type StockItemType = 'stock_items'
type StockItemRel = ResourceRel & { type: StockItemType }
type StockLocationRel = ResourceRel & { type: StockLocationType }
type SkuRel = ResourceRel & { type: SkuType }


export type StockItemSort = Pick<StockItem, 'id' | 'quantity'> & ResourceSort
// export type StockItemFilter = Pick<StockItem, 'id' | 'quantity'> & ResourceFilter


interface StockItem extends Resource {
	
	readonly type: StockItemType

	/** 
	 * The code of the associated SKU.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null
	/** 
	 * The stock item quantity.
	 * @example ```100```
	 */
	quantity: number

	stock_location?: StockLocation | null
	sku?: Sku | null
	reserved_stock?: ReservedStock | null
	stock_reservations?: StockReservation[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface StockItemCreate extends ResourceCreate {
	
	/** 
	 * The code of the associated SKU.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null
	/** 
	 * The stock item quantity.
	 * @example ```100```
	 */
	quantity: number

	stock_location: StockLocationRel
	sku?: SkuRel | null

}


interface StockItemUpdate extends ResourceUpdate {
	
	/** 
	 * The code of the associated SKU.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null
	/** 
	 * The stock item quantity.
	 * @example ```100```
	 */
	quantity?: number | null
	/** 
	 * Send this attribute if you want to validate the stock item quantity against the existing reserved stock one, returns an error in case the former is smaller. Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_validate?: boolean | null

	stock_location?: StockLocationRel | null
	sku?: SkuRel | null

}


class StockItems extends ApiResource<StockItem> {

	static readonly TYPE: StockItemType = 'stock_items' as const

	async create(resource: StockItemCreate, params?: QueryParamsRetrieve<StockItem>, options?: ResourcesConfig): Promise<StockItem> {
		return this.resources.create<StockItemCreate, StockItem>({ ...resource, type: StockItems.TYPE }, params, options)
	}

	async update(resource: StockItemUpdate, params?: QueryParamsRetrieve<StockItem>, options?: ResourcesConfig): Promise<StockItem> {
		return this.resources.update<StockItemUpdate, StockItem>({ ...resource, type: StockItems.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: StockItems.TYPE } : id, options)
	}

	async stock_location(stockItemId: string | StockItem, params?: QueryParamsRetrieve<StockLocation>, options?: ResourcesConfig): Promise<StockLocation> {
		const _stockItemId = (stockItemId as StockItem).id || stockItemId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `stock_items/${_stockItemId}/stock_location`, params, options) as unknown as StockLocation
	}

	async sku(stockItemId: string | StockItem, params?: QueryParamsRetrieve<Sku>, options?: ResourcesConfig): Promise<Sku> {
		const _stockItemId = (stockItemId as StockItem).id || stockItemId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `stock_items/${_stockItemId}/sku`, params, options) as unknown as Sku
	}

	async reserved_stock(stockItemId: string | StockItem, params?: QueryParamsRetrieve<ReservedStock>, options?: ResourcesConfig): Promise<ReservedStock> {
		const _stockItemId = (stockItemId as StockItem).id || stockItemId as string
		return this.resources.fetch<ReservedStock>({ type: 'reserved_stocks' }, `stock_items/${_stockItemId}/reserved_stock`, params, options) as unknown as ReservedStock
	}

	async stock_reservations(stockItemId: string | StockItem, params?: QueryParamsList<StockReservation>, options?: ResourcesConfig): Promise<ListResponse<StockReservation>> {
		const _stockItemId = (stockItemId as StockItem).id || stockItemId as string
		return this.resources.fetch<StockReservation>({ type: 'stock_reservations' }, `stock_items/${_stockItemId}/stock_reservations`, params, options) as unknown as ListResponse<StockReservation>
	}

	async attachments(stockItemId: string | StockItem, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _stockItemId = (stockItemId as StockItem).id || stockItemId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `stock_items/${_stockItemId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(stockItemId: string | StockItem, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _stockItemId = (stockItemId as StockItem).id || stockItemId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `stock_items/${_stockItemId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _validate(id: string | StockItem, params?: QueryParamsRetrieve<StockItem>, options?: ResourcesConfig): Promise<StockItem> {
		return this.resources.update<StockItemUpdate, StockItem>({ id: (typeof id === 'string')? id: id.id, type: StockItems.TYPE, _validate: true }, params, options)
	}


	isStockItem(resource: any): resource is StockItem {
		return resource.type && (resource.type === StockItems.TYPE)
	}


	relationship(id: string | ResourceId | null): StockItemRel {
		return super.relationshipOneToOne<StockItemRel>(id)
	}

	relationshipToMany(...ids: string[]): StockItemRel[] {
		return super.relationshipOneToMany<StockItemRel>(...ids)
	}


	type(): StockItemType {
		return StockItems.TYPE
	}

}


export default StockItems

export type { StockItem, StockItemCreate, StockItemUpdate, StockItemType }
