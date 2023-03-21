import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { InventoryStockLocation } from './inventory_stock_locations'
import type { InventoryReturnLocation } from './inventory_return_locations'
import type { Attachment } from './attachments'


type InventoryModelType = 'inventory_models'
type InventoryModelRel = ResourceRel & { type: InventoryModelType }


interface InventoryModel extends Resource {
	
	readonly type: InventoryModelType

	name: string
	strategy?: string
	stock_locations_cutoff?: number

	inventory_stock_locations?: InventoryStockLocation[]
	inventory_return_locations?: InventoryReturnLocation[]
	attachments?: Attachment[]

}


interface InventoryModelCreate extends ResourceCreate {
	
	name: string
	strategy?: string
	stock_locations_cutoff?: number
	
}


interface InventoryModelUpdate extends ResourceUpdate {
	
	name: string
	strategy?: string
	stock_locations_cutoff?: number
	
}


class InventoryModels extends ApiResource<InventoryModel> {

	static readonly TYPE: InventoryModelType = 'inventory_models' as const

	async create(resource: InventoryModelCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryModel> {
		return this.resources.create<InventoryModelCreate, InventoryModel>({ ...resource, type: InventoryModels.TYPE }, params, options)
	}

	async update(resource: InventoryModelUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryModel> {
		return this.resources.update<InventoryModelUpdate, InventoryModel>({ ...resource, type: InventoryModels.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: InventoryModels.TYPE } : id, options)
	}

	async inventory_stock_locations(inventoryModelId: string | InventoryModel, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<InventoryStockLocation>> {
		const _inventoryModelId = (inventoryModelId as InventoryModel).id || inventoryModelId as string
		return this.resources.fetch<InventoryStockLocation>({ type: 'inventory_stock_locations' }, `inventory_models/${_inventoryModelId}/inventory_stock_locations`, params, options) as unknown as ListResponse<InventoryStockLocation>
	}

	async inventory_return_locations(inventoryModelId: string | InventoryModel, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<InventoryReturnLocation>> {
		const _inventoryModelId = (inventoryModelId as InventoryModel).id || inventoryModelId as string
		return this.resources.fetch<InventoryReturnLocation>({ type: 'inventory_return_locations' }, `inventory_models/${_inventoryModelId}/inventory_return_locations`, params, options) as unknown as ListResponse<InventoryReturnLocation>
	}

	async attachments(inventoryModelId: string | InventoryModel, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _inventoryModelId = (inventoryModelId as InventoryModel).id || inventoryModelId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `inventory_models/${_inventoryModelId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isInventoryModel(resource: any): resource is InventoryModel {
		return resource.type && (resource.type === InventoryModels.TYPE)
	}


	relationship(id: string | ResourceId | null): InventoryModelRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: InventoryModels.TYPE } : { id: id.id, type: InventoryModels.TYPE }
	}


	type(): InventoryModelType {
		return InventoryModels.TYPE
	}

}


export default InventoryModels

export type { InventoryModel, InventoryModelCreate, InventoryModelUpdate, InventoryModelType }
