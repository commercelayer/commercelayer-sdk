import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { StockLocation, StockLocationType } from './stock_locations'
import type { InventoryModel, InventoryModelType } from './inventory_models'


type InventoryStockLocationType = 'inventory_stock_locations'
type InventoryStockLocationRel = ResourceRel & { type: InventoryStockLocationType }
type StockLocationRel = ResourceRel & { type: StockLocationType }
type InventoryModelRel = ResourceRel & { type: InventoryModelType }


interface InventoryStockLocation extends Resource {
	
	readonly type: InventoryStockLocationType

	priority: number
	on_hold?: boolean | null

	stock_location?: StockLocation | null
	inventory_model?: InventoryModel | null

}


interface InventoryStockLocationCreate extends ResourceCreate {
	
	priority: number
	on_hold?: boolean | null

	stock_location: StockLocationRel
	inventory_model: InventoryModelRel

}


interface InventoryStockLocationUpdate extends ResourceUpdate {
	
	priority?: number | null
	on_hold?: boolean | null

	stock_location?: StockLocationRel | null
	inventory_model?: InventoryModelRel | null

}


class InventoryStockLocations extends ApiResource<InventoryStockLocation> {

	static readonly TYPE: InventoryStockLocationType = 'inventory_stock_locations' as const

	async create(resource: InventoryStockLocationCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryStockLocation> {
		return this.resources.create<InventoryStockLocationCreate, InventoryStockLocation>({ ...resource, type: InventoryStockLocations.TYPE }, params, options)
	}

	async update(resource: InventoryStockLocationUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryStockLocation> {
		return this.resources.update<InventoryStockLocationUpdate, InventoryStockLocation>({ ...resource, type: InventoryStockLocations.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: InventoryStockLocations.TYPE } : id, options)
	}

	async stock_location(inventoryStockLocationId: string | InventoryStockLocation, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		const _inventoryStockLocationId = (inventoryStockLocationId as InventoryStockLocation).id || inventoryStockLocationId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `inventory_stock_locations/${_inventoryStockLocationId}/stock_location`, params, options) as unknown as StockLocation
	}

	async inventory_model(inventoryStockLocationId: string | InventoryStockLocation, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryModel> {
		const _inventoryStockLocationId = (inventoryStockLocationId as InventoryStockLocation).id || inventoryStockLocationId as string
		return this.resources.fetch<InventoryModel>({ type: 'inventory_models' }, `inventory_stock_locations/${_inventoryStockLocationId}/inventory_model`, params, options) as unknown as InventoryModel
	}


	isInventoryStockLocation(resource: any): resource is InventoryStockLocation {
		return resource.type && (resource.type === InventoryStockLocations.TYPE)
	}


	relationship(id: string | ResourceId | null): InventoryStockLocationRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: InventoryStockLocations.TYPE } : { id: id.id, type: InventoryStockLocations.TYPE }
	}


	type(): InventoryStockLocationType {
		return InventoryStockLocations.TYPE
	}

}


export default InventoryStockLocations

export type { InventoryStockLocation, InventoryStockLocationCreate, InventoryStockLocationUpdate, InventoryStockLocationType }
