import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Address, AddressType } from './addresses'
import type { Attachment } from './attachments'
import type { InventoryReturnLocation } from './inventory_return_locations'
import type { InventoryStockLocation } from './inventory_stock_locations'
import type { StockItem } from './stock_items'
import type { StockTransfer } from './stock_transfers'
import type { Version } from './versions'


type StockLocationType = 'stock_locations'
type StockLocationRel = ResourceRel & { type: StockLocationType }
type AddressRel = ResourceRel & { type: AddressType }


export type StockLocationSort = Pick<StockLocation, 'id' | 'code' | 'label_format' | 'name' | 'suppress_etd'> & ResourceSort
// export type StockLocationFilter = Pick<StockLocation, 'id' | 'code' | 'label_format' | 'name' | 'suppress_etd'> & ResourceFilter


interface StockLocation extends Resource {
	
	readonly type: StockLocationType

	/** 
	 * A string that you can use to identify the stock location (must be unique within the environment).
	 * @example ```"europe1"```
	 */
	code?: string | null
	/** 
	 * The shipping label format for this stock location. Can be one of 'PDF', 'ZPL', 'EPL2', or 'PNG'.
	 * @example ```"PDF"```
	 */
	label_format?: string | null
	/** 
	 * The stock location's internal name.
	 * @example ```"Primary warehouse"```
	 */
	name: string
	/** 
	 * Unique identifier for the stock location (numeric).
	 * @example ```"1234"```
	 */
	number?: number | null
	/** 
	 * Flag it if you want to skip the electronic invoice creation when generating the customs info for this stock location shipments.
	 */
	suppress_etd?: boolean | null

	address?: Address | null
	attachments?: Attachment[] | null
	inventory_return_locations?: InventoryReturnLocation[] | null
	inventory_stock_locations?: InventoryStockLocation[] | null
	stock_items?: StockItem[] | null
	stock_transfers?: StockTransfer[] | null
	versions?: Version[] | null

}


interface StockLocationCreate extends ResourceCreate {
	
	/** 
	 * A string that you can use to identify the stock location (must be unique within the environment).
	 * @example ```"europe1"```
	 */
	code?: string | null
	/** 
	 * The shipping label format for this stock location. Can be one of 'PDF', 'ZPL', 'EPL2', or 'PNG'.
	 * @example ```"PDF"```
	 */
	label_format?: string | null
	/** 
	 * The stock location's internal name.
	 * @example ```"Primary warehouse"```
	 */
	name: string
	/** 
	 * Flag it if you want to skip the electronic invoice creation when generating the customs info for this stock location shipments.
	 */
	suppress_etd?: boolean | null

	address: AddressRel

}


interface StockLocationUpdate extends ResourceUpdate {
	
	/** 
	 * A string that you can use to identify the stock location (must be unique within the environment).
	 * @example ```"europe1"```
	 */
	code?: string | null
	/** 
	 * The shipping label format for this stock location. Can be one of 'PDF', 'ZPL', 'EPL2', or 'PNG'.
	 * @example ```"PDF"```
	 */
	label_format?: string | null
	/** 
	 * The stock location's internal name.
	 * @example ```"Primary warehouse"```
	 */
	name?: string | null
	/** 
	 * Flag it if you want to skip the electronic invoice creation when generating the customs info for this stock location shipments.
	 */
	suppress_etd?: boolean | null

	address?: AddressRel | null

}


class StockLocations extends ApiResource<StockLocation> {

	static readonly TYPE: StockLocationType = 'stock_locations' as const

	async create(resource: StockLocationCreate, params?: QueryParamsRetrieve<StockLocation>, options?: ResourcesConfig): Promise<StockLocation> {
		return this.resources.create<StockLocationCreate, StockLocation>({ ...resource, type: StockLocations.TYPE }, params, options)
	}

	async update(resource: StockLocationUpdate, params?: QueryParamsRetrieve<StockLocation>, options?: ResourcesConfig): Promise<StockLocation> {
		return this.resources.update<StockLocationUpdate, StockLocation>({ ...resource, type: StockLocations.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: StockLocations.TYPE } : id, options)
	}

	async address(stockLocationId: string | StockLocation, params?: QueryParamsRetrieve<Address>, options?: ResourcesConfig): Promise<Address> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `stock_locations/${_stockLocationId}/address`, params, options) as unknown as Address
	}

	async attachments(stockLocationId: string | StockLocation, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `stock_locations/${_stockLocationId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async inventory_return_locations(stockLocationId: string | StockLocation, params?: QueryParamsList<InventoryReturnLocation>, options?: ResourcesConfig): Promise<ListResponse<InventoryReturnLocation>> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<InventoryReturnLocation>({ type: 'inventory_return_locations' }, `stock_locations/${_stockLocationId}/inventory_return_locations`, params, options) as unknown as ListResponse<InventoryReturnLocation>
	}

	async inventory_stock_locations(stockLocationId: string | StockLocation, params?: QueryParamsList<InventoryStockLocation>, options?: ResourcesConfig): Promise<ListResponse<InventoryStockLocation>> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<InventoryStockLocation>({ type: 'inventory_stock_locations' }, `stock_locations/${_stockLocationId}/inventory_stock_locations`, params, options) as unknown as ListResponse<InventoryStockLocation>
	}

	async stock_items(stockLocationId: string | StockLocation, params?: QueryParamsList<StockItem>, options?: ResourcesConfig): Promise<ListResponse<StockItem>> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<StockItem>({ type: 'stock_items' }, `stock_locations/${_stockLocationId}/stock_items`, params, options) as unknown as ListResponse<StockItem>
	}

	async stock_transfers(stockLocationId: string | StockLocation, params?: QueryParamsList<StockTransfer>, options?: ResourcesConfig): Promise<ListResponse<StockTransfer>> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<StockTransfer>({ type: 'stock_transfers' }, `stock_locations/${_stockLocationId}/stock_transfers`, params, options) as unknown as ListResponse<StockTransfer>
	}

	async versions(stockLocationId: string | StockLocation, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `stock_locations/${_stockLocationId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isStockLocation(resource: any): resource is StockLocation {
		return resource.type && (resource.type === StockLocations.TYPE)
	}


	relationship(id: string | ResourceId | null): StockLocationRel {
		return super.relationshipOneToOne<StockLocationRel>(id)
	}

	relationshipToMany(...ids: string[]): StockLocationRel[] {
		return super.relationshipOneToMany<StockLocationRel>(...ids)
	}


	type(): StockLocationType {
		return StockLocations.TYPE
	}

}


export default StockLocations

export type { StockLocation, StockLocationCreate, StockLocationUpdate, StockLocationType }
