import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { InventoryStockLocation } from './inventory_stock_locations'
import { InventoryReturnLocation } from './inventory_return_locations'
import { Attachment } from './attachments'


type InventoryModelRel = ResourceRel & { type: typeof InventoryModels.TYPE }


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
		return this.resources.list<InventoryModel>({ type: InventoryModels.TYPE }, params, options)
	}

	async create(resource: InventoryModelCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryModel> {
		return this.resources.create<InventoryModelCreate, InventoryModel>({ ...resource, type: InventoryModels.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryModel> {
		return this.resources.retrieve<InventoryModel>({ type: InventoryModels.TYPE, id }, params, options)
	}

	async update(resource: InventoryModelUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryModel> {
		return this.resources.update<InventoryModelUpdate, InventoryModel>({ ...resource, type: InventoryModels.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: InventoryModels.TYPE, id }, options)
	}

	async inventory_stock_locations(inventoryModelId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<InventoryStockLocation>> {
		return this.resources.fetch<InventoryStockLocation>({ type: 'inventory_stock_locations' }, `inventory_models/${inventoryModelId}/inventory_stock_locations`, params, options) as unknown as ListResponse<InventoryStockLocation>
	}

	async inventory_return_locations(inventoryModelId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<InventoryReturnLocation>> {
		return this.resources.fetch<InventoryReturnLocation>({ type: 'inventory_return_locations' }, `inventory_models/${inventoryModelId}/inventory_return_locations`, params, options) as unknown as ListResponse<InventoryReturnLocation>
	}

	async attachments(inventoryModelId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `inventory_models/${inventoryModelId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isInventoryModel(resource: any): resource is InventoryModel {
		return resource.type && (resource.type === InventoryModels.TYPE)
	}


	relationship(id: string | ResourceId | null): InventoryModelRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: InventoryModels.TYPE } : { id: id.id, type: InventoryModels.TYPE }
	}


	type(): string {
		return InventoryModels.TYPE
	}

}


export default InventoryModels

export { InventoryModel, InventoryModelCreate, InventoryModelUpdate }
