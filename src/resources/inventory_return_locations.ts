/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { StockLocation } from './stock_locations'
import { InventoryModel } from './inventory_models'


type InventoryReturnLocationRel = ResourceId & { type: typeof InventoryReturnLocations.TYPE }
type StockLocationRel = ResourceId & { type: 'stock_locations' }
type InventoryModelRel = ResourceId & { type: 'inventory_models' }


interface InventoryReturnLocation extends Resource {
	
	priority?: number

	stock_location?: StockLocation
	inventory_model?: InventoryModel

}


interface InventoryReturnLocationCreate extends ResourceCreate {
	
	priority: number

	stock_location?: StockLocationRel
	inventory_model?: InventoryModelRel

}


interface InventoryReturnLocationUpdate extends ResourceUpdate {
	
	priority?: number

	stock_location?: StockLocationRel
	inventory_model?: InventoryModelRel

}


class InventoryReturnLocations extends ApiResource {

	static readonly TYPE: 'inventory_return_locations' = 'inventory_return_locations'
	// static readonly PATH = 'inventory_return_locations'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<InventoryReturnLocation>> {
		return this.resources.list({ type: InventoryReturnLocations.TYPE }, params, options)
	}

	async create(resource: InventoryReturnLocationCreate, options?: ResourcesConfig): Promise<InventoryReturnLocation> {
		return this.resources.create(Object.assign(resource, { type: InventoryReturnLocations.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryReturnLocation> {
		return this.resources.retrieve<InventoryReturnLocation>({ type: InventoryReturnLocations.TYPE, id }, params, options)
	}

	async update(resource: InventoryReturnLocationUpdate, options?: ResourcesConfig): Promise<InventoryReturnLocation> {
		return this.resources.update({ ...resource, type: InventoryReturnLocations.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: InventoryReturnLocations.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isInventoryReturnLocation(resource: any): resource is InventoryReturnLocation {
		return resource.type && (resource.type === InventoryReturnLocations.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(InventoryReturnLocations.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(InventoryReturnLocations.TYPE)
	}
	*/

	relationship(id: string | ResourceId): InventoryReturnLocationRel {
		return (typeof id === 'string') ? { id, type: InventoryReturnLocations.TYPE } : {id: id.id, type: InventoryReturnLocations.TYPE }
	}

}


export default InventoryReturnLocations

export { InventoryReturnLocation, InventoryReturnLocationCreate, InventoryReturnLocationUpdate }
