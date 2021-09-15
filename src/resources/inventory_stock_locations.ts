/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { StockLocation } from './stock_locations'
import { InventoryModel } from './inventory_models'


type InventoryStockLocationRel = ResourceId & { type: typeof InventoryStockLocations.TYPE }
type StockLocationRel = ResourceId & { type: 'stock_locations' }
type InventoryModelRel = ResourceId & { type: 'inventory_models' }


interface InventoryStockLocation extends Resource {
	
	priority?: number
	on_hold?: boolean

	stock_location?: StockLocation
	inventory_model?: InventoryModel

}


interface InventoryStockLocationCreate extends ResourceCreate {
	
	priority: number
	on_hold?: boolean

	stock_location?: StockLocationRel
	inventory_model?: InventoryModelRel

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
		return this.resources.list({ type: InventoryStockLocations.TYPE }, params, options)
	}

	async create(resource: InventoryStockLocationCreate, options?: ResourcesConfig): Promise<InventoryStockLocation> {
		return this.resources.create(Object.assign(resource, { type: InventoryStockLocations.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryStockLocation> {
		return this.resources.retrieve<InventoryStockLocation>({ type: InventoryStockLocations.TYPE, id }, params, options)
	}

	async update(resource: InventoryStockLocationUpdate, options?: ResourcesConfig): Promise<InventoryStockLocation> {
		return this.resources.update({ ...resource, type: InventoryStockLocations.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: InventoryStockLocations.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isInventoryStockLocation(resource: any): resource is InventoryStockLocation {
		return resource.type && (resource.type === InventoryStockLocations.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(InventoryStockLocations.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(InventoryStockLocations.TYPE)
	}
	*/

	relationship(id: string | ResourceId): InventoryStockLocationRel {
		return (typeof id === 'string') ? { id, type: InventoryStockLocations.TYPE } : {id: id.id, type: InventoryStockLocations.TYPE }
	}

}


export default InventoryStockLocations

export { InventoryStockLocation, InventoryStockLocationCreate, InventoryStockLocationUpdate }
