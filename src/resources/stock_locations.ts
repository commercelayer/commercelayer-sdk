import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Address } from './addresses'
import { InventoryStockLocation } from './inventory_stock_locations'
import { InventoryReturnLocation } from './inventory_return_locations'
import { StockItem } from './stock_items'
import { StockTransfer } from './stock_transfers'
import { Attachment } from './attachments'


type StockLocationRel = ResourceId & { type: typeof StockLocations.TYPE }
type AddressRel = ResourceId & { type: 'addresses' }


interface StockLocation extends Resource {
	
	number?: number
	name?: string
	label_format?: string
	suppress_etd?: boolean

	address?: Address
	inventory_stock_locations?: InventoryStockLocation[]
	inventory_return_locations?: InventoryReturnLocation[]
	stock_items?: StockItem[]
	stock_transfers?: StockTransfer[]
	attachments?: Attachment[]

}


interface StockLocationCreate extends ResourceCreate {
	
	name: string
	label_format?: string
	suppress_etd?: boolean

	address: AddressRel

}


interface StockLocationUpdate extends ResourceUpdate {
	
	name?: string
	label_format?: string
	suppress_etd?: boolean

	address?: AddressRel

}


class StockLocations extends ApiResource {

	static readonly TYPE: 'stock_locations' = 'stock_locations'
	// static readonly PATH = 'stock_locations'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockLocation>> {
		return this.resources.list({ type: StockLocations.TYPE }, params, options)
	}

	async create(resource: StockLocationCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		return this.resources.create({ ...resource, type: StockLocations.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		return this.resources.retrieve<StockLocation>({ type: StockLocations.TYPE, id }, params, options)
	}

	async update(resource: StockLocationUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		return this.resources.update({ ...resource, type: StockLocations.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: StockLocations.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isStockLocation(resource: any): resource is StockLocation {
		return resource.type && (resource.type === StockLocations.TYPE)
	}


	relationship(id: string | ResourceId): StockLocationRel {
		return (typeof id === 'string') ? { id, type: StockLocations.TYPE } : { id: id.id, type: StockLocations.TYPE }
	}


	type(): string {
		return StockLocations.TYPE
	}

}


export default StockLocations

export { StockLocation, StockLocationCreate, StockLocationUpdate }
