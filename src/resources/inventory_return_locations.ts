import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { StockLocation, StockLocationType } from './stock_locations'
import type { InventoryModel, InventoryModelType } from './inventory_models'


type InventoryReturnLocationType = 'inventory_return_locations'
type InventoryReturnLocationRel = ResourceRel & { type: InventoryReturnLocationType }
type StockLocationRel = ResourceRel & { type: StockLocationType }
type InventoryModelRel = ResourceRel & { type: InventoryModelType }


interface InventoryReturnLocation extends Resource {
	
	readonly type: InventoryReturnLocationType

	priority: number

	stock_location?: StockLocation | null
	inventory_model?: InventoryModel | null

}


interface InventoryReturnLocationCreate extends ResourceCreate {
	
	priority: number

	stock_location: StockLocationRel
	inventory_model: InventoryModelRel

}


interface InventoryReturnLocationUpdate extends ResourceUpdate {
	
	priority?: number | null

	stock_location?: StockLocationRel | null
	inventory_model?: InventoryModelRel | null

}


class InventoryReturnLocations extends ApiResource<InventoryReturnLocation> {

	static readonly TYPE: InventoryReturnLocationType = 'inventory_return_locations' as const

	async create(resource: InventoryReturnLocationCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryReturnLocation> {
		return this.resources.create<InventoryReturnLocationCreate, InventoryReturnLocation>({ ...resource, type: InventoryReturnLocations.TYPE }, params, options)
	}

	async update(resource: InventoryReturnLocationUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryReturnLocation> {
		return this.resources.update<InventoryReturnLocationUpdate, InventoryReturnLocation>({ ...resource, type: InventoryReturnLocations.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: InventoryReturnLocations.TYPE } : id, options)
	}

	async stock_location(inventoryReturnLocationId: string | InventoryReturnLocation, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		const _inventoryReturnLocationId = (inventoryReturnLocationId as InventoryReturnLocation).id || inventoryReturnLocationId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `inventory_return_locations/${_inventoryReturnLocationId}/stock_location`, params, options) as unknown as StockLocation
	}

	async inventory_model(inventoryReturnLocationId: string | InventoryReturnLocation, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryModel> {
		const _inventoryReturnLocationId = (inventoryReturnLocationId as InventoryReturnLocation).id || inventoryReturnLocationId as string
		return this.resources.fetch<InventoryModel>({ type: 'inventory_models' }, `inventory_return_locations/${_inventoryReturnLocationId}/inventory_model`, params, options) as unknown as InventoryModel
	}


	isInventoryReturnLocation(resource: any): resource is InventoryReturnLocation {
		return resource.type && (resource.type === InventoryReturnLocations.TYPE)
	}


	relationship(id: string | ResourceId | null): InventoryReturnLocationRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: InventoryReturnLocations.TYPE } : { id: id.id, type: InventoryReturnLocations.TYPE }
	}


	type(): InventoryReturnLocationType {
		return InventoryReturnLocations.TYPE
	}

}


export default InventoryReturnLocations

export type { InventoryReturnLocation, InventoryReturnLocationCreate, InventoryReturnLocationUpdate, InventoryReturnLocationType }
