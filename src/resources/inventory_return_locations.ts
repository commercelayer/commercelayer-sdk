import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { StockLocation, StockLocationType } from './stock_locations'
import type { InventoryModel, InventoryModelType } from './inventory_models'
import type { Version } from './versions'
import type { EventStore } from './event_stores'


type InventoryReturnLocationType = 'inventory_return_locations'
type InventoryReturnLocationRel = ResourceRel & { type: InventoryReturnLocationType }
type StockLocationRel = ResourceRel & { type: StockLocationType }
type InventoryModelRel = ResourceRel & { type: InventoryModelType }


export type InventoryReturnLocationSort = Pick<InventoryReturnLocation, 'id' | 'priority'> & ResourceSort
// export type InventoryReturnLocationFilter = Pick<InventoryReturnLocation, 'id' | 'priority'> & ResourceFilter


interface InventoryReturnLocation extends Resource {
	
	readonly type: InventoryReturnLocationType

	/** 
	 * The inventory return location priority within the associated invetory model.
	 * @example ```1```
	 */
	priority: number

	stock_location?: StockLocation | null
	inventory_model?: InventoryModel | null
	versions?: Version[] | null
	event_stores?: EventStore[] | null

}


interface InventoryReturnLocationCreate extends ResourceCreate {
	
	/** 
	 * The inventory return location priority within the associated invetory model.
	 * @example ```1```
	 */
	priority: number

	stock_location: StockLocationRel
	inventory_model: InventoryModelRel

}


interface InventoryReturnLocationUpdate extends ResourceUpdate {
	
	/** 
	 * The inventory return location priority within the associated invetory model.
	 * @example ```1```
	 */
	priority?: number | null

	stock_location?: StockLocationRel | null
	inventory_model?: InventoryModelRel | null

}


class InventoryReturnLocations extends ApiResource<InventoryReturnLocation> {

	static readonly TYPE: InventoryReturnLocationType = 'inventory_return_locations' as const

	async create(resource: InventoryReturnLocationCreate, params?: QueryParamsRetrieve<InventoryReturnLocation>, options?: ResourcesConfig): Promise<InventoryReturnLocation> {
		return this.resources.create<InventoryReturnLocationCreate, InventoryReturnLocation>({ ...resource, type: InventoryReturnLocations.TYPE }, params, options)
	}

	async update(resource: InventoryReturnLocationUpdate, params?: QueryParamsRetrieve<InventoryReturnLocation>, options?: ResourcesConfig): Promise<InventoryReturnLocation> {
		return this.resources.update<InventoryReturnLocationUpdate, InventoryReturnLocation>({ ...resource, type: InventoryReturnLocations.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: InventoryReturnLocations.TYPE } : id, options)
	}

	async stock_location(inventoryReturnLocationId: string | InventoryReturnLocation, params?: QueryParamsRetrieve<StockLocation>, options?: ResourcesConfig): Promise<StockLocation> {
		const _inventoryReturnLocationId = (inventoryReturnLocationId as InventoryReturnLocation).id || inventoryReturnLocationId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `inventory_return_locations/${_inventoryReturnLocationId}/stock_location`, params, options) as unknown as StockLocation
	}

	async inventory_model(inventoryReturnLocationId: string | InventoryReturnLocation, params?: QueryParamsRetrieve<InventoryModel>, options?: ResourcesConfig): Promise<InventoryModel> {
		const _inventoryReturnLocationId = (inventoryReturnLocationId as InventoryReturnLocation).id || inventoryReturnLocationId as string
		return this.resources.fetch<InventoryModel>({ type: 'inventory_models' }, `inventory_return_locations/${_inventoryReturnLocationId}/inventory_model`, params, options) as unknown as InventoryModel
	}

	async versions(inventoryReturnLocationId: string | InventoryReturnLocation, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _inventoryReturnLocationId = (inventoryReturnLocationId as InventoryReturnLocation).id || inventoryReturnLocationId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `inventory_return_locations/${_inventoryReturnLocationId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async event_stores(inventoryReturnLocationId: string | InventoryReturnLocation, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _inventoryReturnLocationId = (inventoryReturnLocationId as InventoryReturnLocation).id || inventoryReturnLocationId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `inventory_return_locations/${_inventoryReturnLocationId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}


	isInventoryReturnLocation(resource: any): resource is InventoryReturnLocation {
		return resource.type && (resource.type === InventoryReturnLocations.TYPE)
	}


	relationship(id: string | ResourceId | null): InventoryReturnLocationRel {
		return super.relationshipOneToOne<InventoryReturnLocationRel>(id)
	}

	relationshipToMany(...ids: string[]): InventoryReturnLocationRel[] {
		return super.relationshipOneToMany<InventoryReturnLocationRel>(...ids)
	}


	type(): InventoryReturnLocationType {
		return InventoryReturnLocations.TYPE
	}

}


const instance = new InventoryReturnLocations()
export default instance

export type { InventoryReturnLocations, InventoryReturnLocation, InventoryReturnLocationCreate, InventoryReturnLocationUpdate, InventoryReturnLocationType }
