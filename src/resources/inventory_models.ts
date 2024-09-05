import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Attachment } from './attachments'
import type { InventoryReturnLocation } from './inventory_return_locations'
import type { InventoryStockLocation } from './inventory_stock_locations'
import type { Version } from './versions'


type InventoryModelType = 'inventory_models'
type InventoryModelRel = ResourceRel & { type: InventoryModelType }


export type InventoryModelSort = Pick<InventoryModel, 'id' | 'name' | 'stock_locations_cutoff' | 'stock_reservation_cutoff' | 'strategy'> & ResourceSort
// export type InventoryModelFilter = Pick<InventoryModel, 'id' | 'name' | 'stock_locations_cutoff' | 'stock_reservation_cutoff' | 'strategy'> & ResourceFilter


interface InventoryModel extends Resource {
	
	readonly type: InventoryModelType

	/** 
	 * Indicates if the the stock will be decremented manually after the order approval.
	 * @example ```"true"```
	 */
	manual_stock_decrement?: boolean | null
	/** 
	 * The inventory model's internal name.
	 * @example ```"EU Inventory Model"```
	 */
	name: string
	/** 
	 * Indicates if the the stock transfers must be put on hold automatically with the associated shipment.
	 * @example ```"true"```
	 */
	put_stock_transfers_on_hold?: boolean | null
	/** 
	 * The maximum number of stock locations used for inventory computation.
	 * @example ```"3"```
	 */
	stock_locations_cutoff?: number | null
	/** 
	 * The duration in seconds of the generated stock reservations.
	 * @example ```"3600"```
	 */
	stock_reservation_cutoff?: number | null
	/** 
	 * The inventory model's shipping strategy: one between 'no_split' (default), 'split_shipments', 'ship_from_primary' and 'ship_from_first_available_or_primary'.
	 * @example ```"no_split"```
	 */
	strategy?: string | null

	attachments?: Attachment[] | null
	inventory_return_locations?: InventoryReturnLocation[] | null
	inventory_stock_locations?: InventoryStockLocation[] | null
	versions?: Version[] | null

}


interface InventoryModelCreate extends ResourceCreate {
	
	/** 
	 * Indicates if the the stock will be decremented manually after the order approval.
	 * @example ```"true"```
	 */
	manual_stock_decrement?: boolean | null
	/** 
	 * The inventory model's internal name.
	 * @example ```"EU Inventory Model"```
	 */
	name: string
	/** 
	 * Indicates if the the stock transfers must be put on hold automatically with the associated shipment.
	 * @example ```"true"```
	 */
	put_stock_transfers_on_hold?: boolean | null
	/** 
	 * The maximum number of stock locations used for inventory computation.
	 * @example ```"3"```
	 */
	stock_locations_cutoff?: number | null
	/** 
	 * The duration in seconds of the generated stock reservations.
	 * @example ```"3600"```
	 */
	stock_reservation_cutoff?: number | null
	/** 
	 * The inventory model's shipping strategy: one between 'no_split' (default), 'split_shipments', 'ship_from_primary' and 'ship_from_first_available_or_primary'.
	 * @example ```"no_split"```
	 */
	strategy?: string | null
	
}


interface InventoryModelUpdate extends ResourceUpdate {
	
	/** 
	 * Indicates if the the stock will be decremented manually after the order approval.
	 * @example ```"true"```
	 */
	manual_stock_decrement?: boolean | null
	/** 
	 * The inventory model's internal name.
	 * @example ```"EU Inventory Model"```
	 */
	name?: string | null
	/** 
	 * Indicates if the the stock transfers must be put on hold automatically with the associated shipment.
	 * @example ```"true"```
	 */
	put_stock_transfers_on_hold?: boolean | null
	/** 
	 * The maximum number of stock locations used for inventory computation.
	 * @example ```"3"```
	 */
	stock_locations_cutoff?: number | null
	/** 
	 * The duration in seconds of the generated stock reservations.
	 * @example ```"3600"```
	 */
	stock_reservation_cutoff?: number | null
	/** 
	 * The inventory model's shipping strategy: one between 'no_split' (default), 'split_shipments', 'ship_from_primary' and 'ship_from_first_available_or_primary'.
	 * @example ```"no_split"```
	 */
	strategy?: string | null
	
}


class InventoryModels extends ApiResource<InventoryModel> {

	static readonly TYPE: InventoryModelType = 'inventory_models' as const

	async create(resource: InventoryModelCreate, params?: QueryParamsRetrieve<InventoryModel>, options?: ResourcesConfig): Promise<InventoryModel> {
		return this.resources.create<InventoryModelCreate, InventoryModel>({ ...resource, type: InventoryModels.TYPE }, params, options)
	}

	async update(resource: InventoryModelUpdate, params?: QueryParamsRetrieve<InventoryModel>, options?: ResourcesConfig): Promise<InventoryModel> {
		return this.resources.update<InventoryModelUpdate, InventoryModel>({ ...resource, type: InventoryModels.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: InventoryModels.TYPE } : id, options)
	}

	async attachments(inventoryModelId: string | InventoryModel, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _inventoryModelId = (inventoryModelId as InventoryModel).id || inventoryModelId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `inventory_models/${_inventoryModelId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async inventory_return_locations(inventoryModelId: string | InventoryModel, params?: QueryParamsList<InventoryReturnLocation>, options?: ResourcesConfig): Promise<ListResponse<InventoryReturnLocation>> {
		const _inventoryModelId = (inventoryModelId as InventoryModel).id || inventoryModelId as string
		return this.resources.fetch<InventoryReturnLocation>({ type: 'inventory_return_locations' }, `inventory_models/${_inventoryModelId}/inventory_return_locations`, params, options) as unknown as ListResponse<InventoryReturnLocation>
	}

	async inventory_stock_locations(inventoryModelId: string | InventoryModel, params?: QueryParamsList<InventoryStockLocation>, options?: ResourcesConfig): Promise<ListResponse<InventoryStockLocation>> {
		const _inventoryModelId = (inventoryModelId as InventoryModel).id || inventoryModelId as string
		return this.resources.fetch<InventoryStockLocation>({ type: 'inventory_stock_locations' }, `inventory_models/${_inventoryModelId}/inventory_stock_locations`, params, options) as unknown as ListResponse<InventoryStockLocation>
	}

	async versions(inventoryModelId: string | InventoryModel, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
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
