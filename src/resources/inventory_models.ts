import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { InventoryStockLocation } from './inventory_stock_locations'
import type { InventoryReturnLocation } from './inventory_return_locations'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type InventoryModelType = 'inventory_models'
type InventoryModelRel = ResourceRel & { type: InventoryModelType }


interface InventoryModel extends Resource {
	
	readonly type: InventoryModelType

	name: string
	strategy?: string | null
	stock_locations_cutoff?: number | null
	stock_reservation_cutoff?: number | null
	put_stock_transfers_on_hold?: boolean | null
	manual_stock_decrement?: boolean | null

	inventory_stock_locations?: InventoryStockLocation[] | null
	inventory_return_locations?: InventoryReturnLocation[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface InventoryModelCreate extends ResourceCreate {
	
	name: string
	strategy?: string | null
	stock_locations_cutoff?: number | null
	stock_reservation_cutoff?: number | null
	put_stock_transfers_on_hold?: boolean | null
	manual_stock_decrement?: boolean | null
	
}


interface InventoryModelUpdate extends ResourceUpdate {
	
	name?: string | null
	strategy?: string | null
	stock_locations_cutoff?: number | null
	stock_reservation_cutoff?: number | null
	put_stock_transfers_on_hold?: boolean | null
	manual_stock_decrement?: boolean | null
	
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

	async versions(inventoryModelId: string | InventoryModel, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _inventoryModelId = (inventoryModelId as InventoryModel).id || inventoryModelId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `inventory_models/${_inventoryModelId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isInventoryModel(resource: any): resource is InventoryModel {
		return resource.type && (resource.type === InventoryModels.TYPE)
	}


	relationship(id: string | ResourceId | null): InventoryModelRel {
		return super.relationshipOneToOne<InventoryModelRel>(id)
	}

	relationshipToMany(...ids: string[]): InventoryModelRel[] {
		return super.relationshipOneToMany<InventoryModelRel>(...ids)
	}


	type(): InventoryModelType {
		return InventoryModels.TYPE
	}

}


export default InventoryModels

export type { InventoryModel, InventoryModelCreate, InventoryModelUpdate, InventoryModelType }
