/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { InventoryStockLocation } from './inventory_stock_locations'
import { InventoryReturnLocation } from './inventory_return_locations'
import { Attachment } from './attachments'


type InventoryModelRel = ResourceId & { type: typeof InventoryModels.TYPE }


interface InventoryModel extends Resource {
	
	name?: string
	strategy?: string
	stock_locations_cutoff?: number

	inventory_stock_locations?: InventoryStockLocation[]
	inventory_return_locations?: InventoryReturnLocation[]
	attachments?: Attachment[]

}


interface InventoryModelCreate extends ResourceCreate {
	
	name: string
	strategy: string
	stock_locations_cutoff?: number
	
}


interface InventoryModelUpdate extends ResourceUpdate {
	
	name?: string
	strategy?: string
	stock_locations_cutoff?: number
	
}


class InventoryModels extends ApiResource {

	static readonly TYPE: 'inventory_models' = 'inventory_models'
	// static readonly PATH = 'inventory_models'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<InventoryModel>> {
		return this.resources.list({ type: InventoryModels.TYPE }, params, options)
	}

	async create(resource: InventoryModelCreate, options?: ResourcesConfig): Promise<InventoryModel> {
		return this.resources.create(Object.assign(resource, { type: InventoryModels.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryModel> {
		return this.resources.retrieve<InventoryModel>({ type: InventoryModels.TYPE, id }, params, options)
	}

	async update(resource: InventoryModelUpdate, options?: ResourcesConfig): Promise<InventoryModel> {
		return this.resources.update({ ...resource, type: InventoryModels.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: InventoryModels.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isInventoryModel(resource: any): resource is InventoryModel {
		return resource.type && (resource.type === InventoryModels.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(InventoryModels.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(InventoryModels.TYPE)
	}
	*/

	relationship(id: string | ResourceId): InventoryModelRel {
		return (typeof id === 'string') ? { id, type: InventoryModels.TYPE } : {id: id.id, type: InventoryModels.TYPE }
	}

}


export default InventoryModels

export { InventoryModel, InventoryModelCreate, InventoryModelUpdate }
