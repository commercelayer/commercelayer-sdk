import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { StockLocation } from './stock_locations'
import type { InventoryModel } from './inventory_models'
import type { Version } from './versions'


type InventoryReturnLocationRel = ResourceRel & { type: typeof InventoryReturnLocations.TYPE }
type StockLocationRel = ResourceRel & { type: 'stock_locations' }
type InventoryModelRel = ResourceRel & { type: 'inventory_models' }


interface InventoryReturnLocation extends Resource {
	
	priority?: number

	stock_location?: StockLocation
	inventory_model?: InventoryModel
	versions?: Version[]

}


interface InventoryReturnLocationCreate extends ResourceCreate {
	
	priority: number

	stock_location: StockLocationRel
	inventory_model: InventoryModelRel

}


interface InventoryReturnLocationUpdate extends ResourceUpdate {
	
	priority?: number

	stock_location?: StockLocationRel
	inventory_model?: InventoryModelRel

}


class InventoryReturnLocations extends ApiResource {

	static readonly TYPE: 'inventory_return_locations' = 'inventory_return_locations' as const
	// static readonly PATH = 'inventory_return_locations'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<InventoryReturnLocation>> {
		return this.resources.list<InventoryReturnLocation>({ type: InventoryReturnLocations.TYPE }, params, options)
	}

	async create(resource: InventoryReturnLocationCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryReturnLocation> {
		return this.resources.create<InventoryReturnLocationCreate, InventoryReturnLocation>({ ...resource, type: InventoryReturnLocations.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryReturnLocation> {
		return this.resources.retrieve<InventoryReturnLocation>({ type: InventoryReturnLocations.TYPE, id }, params, options)
	}

	async update(resource: InventoryReturnLocationUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryReturnLocation> {
		return this.resources.update<InventoryReturnLocationUpdate, InventoryReturnLocation>({ ...resource, type: InventoryReturnLocations.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: InventoryReturnLocations.TYPE, id }, options)
	}

	async stock_location(inventoryReturnLocationId: string | InventoryReturnLocation, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		const _inventoryReturnLocationId = (inventoryReturnLocationId as InventoryReturnLocation).id || inventoryReturnLocationId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `inventory_return_locations/${_inventoryReturnLocationId}/stock_location`, params, options) as unknown as StockLocation
	}

	async inventory_model(inventoryReturnLocationId: string | InventoryReturnLocation, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryModel> {
		const _inventoryReturnLocationId = (inventoryReturnLocationId as InventoryReturnLocation).id || inventoryReturnLocationId as string
		return this.resources.fetch<InventoryModel>({ type: 'inventory_models' }, `inventory_return_locations/${_inventoryReturnLocationId}/inventory_model`, params, options) as unknown as InventoryModel
	}

	async versions(inventoryReturnLocationId: string | InventoryReturnLocation, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _inventoryReturnLocationId = (inventoryReturnLocationId as InventoryReturnLocation).id || inventoryReturnLocationId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `inventory_return_locations/${_inventoryReturnLocationId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isInventoryReturnLocation(resource: any): resource is InventoryReturnLocation {
		return resource.type && (resource.type === InventoryReturnLocations.TYPE)
	}


	relationship(id: string | ResourceId | null): InventoryReturnLocationRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: InventoryReturnLocations.TYPE } : { id: id.id, type: InventoryReturnLocations.TYPE }
	}


	type(): string {
		return InventoryReturnLocations.TYPE
	}

}


export default InventoryReturnLocations

export { InventoryReturnLocation, InventoryReturnLocationCreate, InventoryReturnLocationUpdate }
