import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Address, AddressType } from './addresses'
import type { InventoryStockLocation } from './inventory_stock_locations'
import type { InventoryReturnLocation } from './inventory_return_locations'
import type { StockItem } from './stock_items'
import type { StockTransfer } from './stock_transfers'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type StockLocationType = 'stock_locations'
type StockLocationRel = ResourceRel & { type: StockLocationType }
type AddressRel = ResourceRel & { type: AddressType }


interface StockLocation extends Resource {
	
	readonly type: StockLocationType

	number?: number | null
	name: string
	label_format?: string | null
	suppress_etd?: boolean | null

	address?: Address | null
	inventory_stock_locations?: InventoryStockLocation[] | null
	inventory_return_locations?: InventoryReturnLocation[] | null
	stock_items?: StockItem[] | null
	stock_transfers?: StockTransfer[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface StockLocationCreate extends ResourceCreate {
	
	name: string
	label_format?: string | null
	suppress_etd?: boolean | null

	address: AddressRel

}


interface StockLocationUpdate extends ResourceUpdate {
	
	name?: string | null
	label_format?: string | null
	suppress_etd?: boolean | null

	address?: AddressRel | null

}


class StockLocations extends ApiResource<StockLocation> {

	static readonly TYPE: StockLocationType = 'stock_locations' as const

	async create(resource: StockLocationCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		return this.resources.create<StockLocationCreate, StockLocation>({ ...resource, type: StockLocations.TYPE }, params, options)
	}

	async update(resource: StockLocationUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		return this.resources.update<StockLocationUpdate, StockLocation>({ ...resource, type: StockLocations.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: StockLocations.TYPE } : id, options)
	}

	async address(stockLocationId: string | StockLocation, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `stock_locations/${_stockLocationId}/address`, params, options) as unknown as Address
	}

	async inventory_stock_locations(stockLocationId: string | StockLocation, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<InventoryStockLocation>> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<InventoryStockLocation>({ type: 'inventory_stock_locations' }, `stock_locations/${_stockLocationId}/inventory_stock_locations`, params, options) as unknown as ListResponse<InventoryStockLocation>
	}

	async inventory_return_locations(stockLocationId: string | StockLocation, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<InventoryReturnLocation>> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<InventoryReturnLocation>({ type: 'inventory_return_locations' }, `stock_locations/${_stockLocationId}/inventory_return_locations`, params, options) as unknown as ListResponse<InventoryReturnLocation>
	}

	async stock_items(stockLocationId: string | StockLocation, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockItem>> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<StockItem>({ type: 'stock_items' }, `stock_locations/${_stockLocationId}/stock_items`, params, options) as unknown as ListResponse<StockItem>
	}

	async stock_transfers(stockLocationId: string | StockLocation, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockTransfer>> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<StockTransfer>({ type: 'stock_transfers' }, `stock_locations/${_stockLocationId}/stock_transfers`, params, options) as unknown as ListResponse<StockTransfer>
	}

	async attachments(stockLocationId: string | StockLocation, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `stock_locations/${_stockLocationId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(stockLocationId: string | StockLocation, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `stock_locations/${_stockLocationId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isStockLocation(resource: any): resource is StockLocation {
		return resource.type && (resource.type === StockLocations.TYPE)
	}


	relationship(id: string | ResourceId | null): StockLocationRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: StockLocations.TYPE } : { id: id.id, type: StockLocations.TYPE }
	}


	type(): StockLocationType {
		return StockLocations.TYPE
	}


	parse(payload: any): StockLocation | StockLocation[] {
		return super.parse(payload)
	}

}


export default StockLocations

export type { StockLocation, StockLocationCreate, StockLocationUpdate, StockLocationType }
