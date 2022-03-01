import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { StockLocation } from './stock_locations'
import type { InventoryModel } from './inventory_models'


type InventoryStockLocationRel = ResourceRel & { type: typeof InventoryStockLocations.TYPE }
type StockLocationRel = ResourceRel & { type: 'stock_locations' }
type InventoryModelRel = ResourceRel & { type: 'inventory_models' }


interface InventoryStockLocation extends Resource {
	
	priority?: number
	on_hold?: boolean

	stock_location?: StockLocation
	inventory_model?: InventoryModel

}


interface InventoryStockLocationCreate extends ResourceCreate {
	
	priority: number
	on_hold?: boolean

	stock_location: StockLocationRel
	inventory_model: InventoryModelRel

}


interface InventoryStockLocationUpdate extends ResourceUpdate {
	
	priority?: number
	on_hold?: boolean

	stock_location?: StockLocationRel
	inventory_model?: InventoryModelRel

}


class InventoryStockLocations extends ApiResource {

	static readonly TYPE: 'inventory_stock_locations' = 'inventory_stock_locations'
	// static readonly PATH = 'inventory_stock_locations'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<InventoryStockLocation>> {
		return this.resources.list<InventoryStockLocation>({ type: InventoryStockLocations.TYPE }, params, options)
	}

	async create(resource: InventoryStockLocationCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryStockLocation> {
		return this.resources.create<InventoryStockLocationCreate, InventoryStockLocation>({ ...resource, type: InventoryStockLocations.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryStockLocation> {
		return this.resources.retrieve<InventoryStockLocation>({ type: InventoryStockLocations.TYPE, id }, params, options)
	}

	async update(resource: InventoryStockLocationUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryStockLocation> {
		return this.resources.update<InventoryStockLocationUpdate, InventoryStockLocation>({ ...resource, type: InventoryStockLocations.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: InventoryStockLocations.TYPE, id }, options)
	}

	async stock_location(inventoryStockLocationId: string | InventoryStockLocation, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		const _inventoryStockLocationId = (inventoryStockLocationId as InventoryStockLocation).id || inventoryStockLocationId
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `inventory_stock_locations/${_inventoryStockLocationId}/stock_location`, params, options) as unknown as StockLocation
	}

	async inventory_model(inventoryStockLocationId: string | InventoryStockLocation, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryModel> {
		const _inventoryStockLocationId = (inventoryStockLocationId as InventoryStockLocation).id || inventoryStockLocationId
		return this.resources.fetch<InventoryModel>({ type: 'inventory_models' }, `inventory_stock_locations/${_inventoryStockLocationId}/inventory_model`, params, options) as unknown as InventoryModel
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isInventoryStockLocation(resource: any): resource is InventoryStockLocation {
		return resource.type && (resource.type === InventoryStockLocations.TYPE)
	}


	relationship(id: string | ResourceId | null): InventoryStockLocationRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: InventoryStockLocations.TYPE } : { id: id.id, type: InventoryStockLocations.TYPE }
	}


	type(): string {
		return InventoryStockLocations.TYPE
	}

}


export default InventoryStockLocations

export { InventoryStockLocation, InventoryStockLocationCreate, InventoryStockLocationUpdate }
