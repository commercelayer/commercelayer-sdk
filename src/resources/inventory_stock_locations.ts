import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { StockLocation, StockLocationType } from './stock_locations'
import type { InventoryModel, InventoryModelType } from './inventory_models'
import type { Version } from './versions'


type InventoryStockLocationType = 'inventory_stock_locations'
type InventoryStockLocationRel = ResourceRel & { type: InventoryStockLocationType }
type StockLocationRel = ResourceRel & { type: StockLocationType }
type InventoryModelRel = ResourceRel & { type: InventoryModelType }


export type InventoryStockLocationSort = Pick<InventoryStockLocation, 'id' | 'priority' | 'on_hold'> & ResourceSort
// export type InventoryStockLocationFilter = Pick<InventoryStockLocation, 'id' | 'priority' | 'on_hold'> & ResourceFilter


interface InventoryStockLocation extends Resource {
	
	readonly type: InventoryStockLocationType

	/** 
	 * The stock location priority within the associated invetory model.
	 * @example ```1```
	 */
	priority: number
	/** 
	 * Indicates if the shipment should be put on hold if fulfilled from the associated stock location. This is useful to manage use cases like back-orders, pre-orders or personalized orders that need to be customized before being fulfilled.
	 */
	on_hold?: boolean | null

	stock_location?: StockLocation | null
	inventory_model?: InventoryModel | null
	versions?: Version[] | null

}


interface InventoryStockLocationCreate extends ResourceCreate {
	
	/** 
	 * The stock location priority within the associated invetory model.
	 * @example ```1```
	 */
	priority: number
	/** 
	 * Indicates if the shipment should be put on hold if fulfilled from the associated stock location. This is useful to manage use cases like back-orders, pre-orders or personalized orders that need to be customized before being fulfilled.
	 */
	on_hold?: boolean | null

	stock_location: StockLocationRel
	inventory_model: InventoryModelRel

}


interface InventoryStockLocationUpdate extends ResourceUpdate {
	
	/** 
	 * The stock location priority within the associated invetory model.
	 * @example ```1```
	 */
	priority?: number | null
	/** 
	 * Indicates if the shipment should be put on hold if fulfilled from the associated stock location. This is useful to manage use cases like back-orders, pre-orders or personalized orders that need to be customized before being fulfilled.
	 */
	on_hold?: boolean | null

	stock_location?: StockLocationRel | null
	inventory_model?: InventoryModelRel | null

}


class InventoryStockLocations extends ApiResource<InventoryStockLocation> {

	static readonly TYPE: InventoryStockLocationType = 'inventory_stock_locations' as const

	async create(resource: InventoryStockLocationCreate, params?: QueryParamsRetrieve<InventoryStockLocation>, options?: ResourcesConfig): Promise<InventoryStockLocation> {
		return this.resources.create<InventoryStockLocationCreate, InventoryStockLocation>({ ...resource, type: InventoryStockLocations.TYPE }, params, options)
	}

	async update(resource: InventoryStockLocationUpdate, params?: QueryParamsRetrieve<InventoryStockLocation>, options?: ResourcesConfig): Promise<InventoryStockLocation> {
		return this.resources.update<InventoryStockLocationUpdate, InventoryStockLocation>({ ...resource, type: InventoryStockLocations.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: InventoryStockLocations.TYPE } : id, options)
	}

	async stock_location(inventoryStockLocationId: string | InventoryStockLocation, params?: QueryParamsRetrieve<StockLocation>, options?: ResourcesConfig): Promise<StockLocation> {
		const _inventoryStockLocationId = (inventoryStockLocationId as InventoryStockLocation).id || inventoryStockLocationId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `inventory_stock_locations/${_inventoryStockLocationId}/stock_location`, params, options) as unknown as StockLocation
	}

	async inventory_model(inventoryStockLocationId: string | InventoryStockLocation, params?: QueryParamsRetrieve<InventoryModel>, options?: ResourcesConfig): Promise<InventoryModel> {
		const _inventoryStockLocationId = (inventoryStockLocationId as InventoryStockLocation).id || inventoryStockLocationId as string
		return this.resources.fetch<InventoryModel>({ type: 'inventory_models' }, `inventory_stock_locations/${_inventoryStockLocationId}/inventory_model`, params, options) as unknown as InventoryModel
	}

	async versions(inventoryStockLocationId: string | InventoryStockLocation, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _inventoryStockLocationId = (inventoryStockLocationId as InventoryStockLocation).id || inventoryStockLocationId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `inventory_stock_locations/${_inventoryStockLocationId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isInventoryStockLocation(resource: any): resource is InventoryStockLocation {
		return resource.type && (resource.type === InventoryStockLocations.TYPE)
	}


	relationship(id: string | ResourceId | null): InventoryStockLocationRel {
		return super.relationshipOneToOne<InventoryStockLocationRel>(id)
	}

	relationshipToMany(...ids: string[]): InventoryStockLocationRel[] {
		return super.relationshipOneToMany<InventoryStockLocationRel>(...ids)
	}


	type(): InventoryStockLocationType {
		return InventoryStockLocations.TYPE
	}

}


export default InventoryStockLocations

export type { InventoryStockLocation, InventoryStockLocationCreate, InventoryStockLocationUpdate, InventoryStockLocationType }
