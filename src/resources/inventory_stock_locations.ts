import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { InventoryModel, InventoryModelType } from './inventory_models'
import type { StockLocation, StockLocationType } from './stock_locations'
import type { Version } from './versions'


type InventoryStockLocationType = 'inventory_stock_locations'
type InventoryStockLocationRel = ResourceRel & { type: InventoryStockLocationType }
type InventoryModelRel = ResourceRel & { type: InventoryModelType }
type StockLocationRel = ResourceRel & { type: StockLocationType }


export type InventoryStockLocationSort = Pick<InventoryStockLocation, 'id' | 'on_hold' | 'priority'> & ResourceSort
// export type InventoryStockLocationFilter = Pick<InventoryStockLocation, 'id' | 'on_hold' | 'priority'> & ResourceFilter


interface InventoryStockLocation extends Resource {
	
	readonly type: InventoryStockLocationType

	/** 
	 * Indicates if the shipment should be put on hold if fulfilled from the associated stock location. This is useful to manage use cases like back-orders, pre-orders or personalized orders that need to be customized before being fulfilled.
	 */
	on_hold?: boolean | null
	/** 
	 * The stock location priority within the associated invetory model.
	 * @example ```"1"```
	 */
	priority: number

	inventory_model?: InventoryModel | null
	stock_location?: StockLocation | null
	versions?: Version[] | null

}


interface InventoryStockLocationCreate extends ResourceCreate {
	
	/** 
	 * Indicates if the shipment should be put on hold if fulfilled from the associated stock location. This is useful to manage use cases like back-orders, pre-orders or personalized orders that need to be customized before being fulfilled.
	 */
	on_hold?: boolean | null
	/** 
	 * The stock location priority within the associated invetory model.
	 * @example ```"1"```
	 */
	priority: number

	inventory_model: InventoryModelRel
	stock_location: StockLocationRel

}


interface InventoryStockLocationUpdate extends ResourceUpdate {
	
	/** 
	 * Indicates if the shipment should be put on hold if fulfilled from the associated stock location. This is useful to manage use cases like back-orders, pre-orders or personalized orders that need to be customized before being fulfilled.
	 */
	on_hold?: boolean | null
	/** 
	 * The stock location priority within the associated invetory model.
	 * @example ```"1"```
	 */
	priority?: number | null

	inventory_model?: InventoryModelRel | null
	stock_location?: StockLocationRel | null

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

	async inventory_model(inventoryStockLocationId: string | InventoryStockLocation, params?: QueryParamsRetrieve<InventoryModel>, options?: ResourcesConfig): Promise<InventoryModel> {
		const _inventoryStockLocationId = (inventoryStockLocationId as InventoryStockLocation).id || inventoryStockLocationId as string
		return this.resources.fetch<InventoryModel>({ type: 'inventory_models' }, `inventory_stock_locations/${_inventoryStockLocationId}/inventory_model`, params, options) as unknown as InventoryModel
	}

	async stock_location(inventoryStockLocationId: string | InventoryStockLocation, params?: QueryParamsRetrieve<StockLocation>, options?: ResourcesConfig): Promise<StockLocation> {
		const _inventoryStockLocationId = (inventoryStockLocationId as InventoryStockLocation).id || inventoryStockLocationId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `inventory_stock_locations/${_inventoryStockLocationId}/stock_location`, params, options) as unknown as StockLocation
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
