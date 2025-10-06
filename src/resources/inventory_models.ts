import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { InventoryStockLocation } from './inventory_stock_locations'
import type { InventoryReturnLocation } from './inventory_return_locations'
import type { Attachment } from './attachments'
import type { Version } from './versions'
import type { EventStore } from './event_stores'


type InventoryModelType = 'inventory_models'
type InventoryModelRel = ResourceRel & { type: InventoryModelType }


export type InventoryModelSort = Pick<InventoryModel, 'id' | 'name' | 'strategy' | 'stock_locations_cutoff' | 'stock_reservation_cutoff'> & ResourceSort
// export type InventoryModelFilter = Pick<InventoryModel, 'id' | 'name' | 'strategy' | 'stock_locations_cutoff' | 'stock_reservation_cutoff'> & ResourceFilter


interface InventoryModel extends Resource {
	
	readonly type: InventoryModelType

	/** 
	 * The inventory model's internal name.
	 * @example ```"EU Inventory Model"```
	 */
	name: string
	/** 
	 * The inventory model's shipping strategy: one between 'no_split' (default), 'split_shipments', 'ship_from_primary' and 'ship_from_first_available_or_primary'.
	 * @example ```"no_split"```
	 */
	strategy?: string | null
	/** 
	 * The maximum number of stock locations used for inventory computation.
	 * @example ```3```
	 */
	stock_locations_cutoff?: number | null
	/** 
	 * The duration in seconds of the generated stock reservations.
	 * @example ```3600```
	 */
	stock_reservation_cutoff?: number | null
	/** 
	 * Indicates if the the stock transfers must be put on hold automatically with the associated shipment.
	 * @example ```true```
	 */
	put_stock_transfers_on_hold?: boolean | null
	/** 
	 * Indicates if the the stock will be decremented manually after the order approval.
	 * @example ```true```
	 */
	manual_stock_decrement?: boolean | null

	inventory_stock_locations?: InventoryStockLocation[] | null
	inventory_return_locations?: InventoryReturnLocation[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null
	event_stores?: EventStore[] | null

}


interface InventoryModelCreate extends ResourceCreate {
	
	/** 
	 * The inventory model's internal name.
	 * @example ```"EU Inventory Model"```
	 */
	name: string
	/** 
	 * The inventory model's shipping strategy: one between 'no_split' (default), 'split_shipments', 'ship_from_primary' and 'ship_from_first_available_or_primary'.
	 * @example ```"no_split"```
	 */
	strategy?: string | null
	/** 
	 * The maximum number of stock locations used for inventory computation.
	 * @example ```3```
	 */
	stock_locations_cutoff?: number | null
	/** 
	 * The duration in seconds of the generated stock reservations.
	 * @example ```3600```
	 */
	stock_reservation_cutoff?: number | null
	/** 
	 * Indicates if the the stock transfers must be put on hold automatically with the associated shipment.
	 * @example ```true```
	 */
	put_stock_transfers_on_hold?: boolean | null
	/** 
	 * Indicates if the the stock will be decremented manually after the order approval.
	 * @example ```true```
	 */
	manual_stock_decrement?: boolean | null
	
}


interface InventoryModelUpdate extends ResourceUpdate {
	
	/** 
	 * The inventory model's internal name.
	 * @example ```"EU Inventory Model"```
	 */
	name?: string | null
	/** 
	 * The inventory model's shipping strategy: one between 'no_split' (default), 'split_shipments', 'ship_from_primary' and 'ship_from_first_available_or_primary'.
	 * @example ```"no_split"```
	 */
	strategy?: string | null
	/** 
	 * The maximum number of stock locations used for inventory computation.
	 * @example ```3```
	 */
	stock_locations_cutoff?: number | null
	/** 
	 * The duration in seconds of the generated stock reservations.
	 * @example ```3600```
	 */
	stock_reservation_cutoff?: number | null
	/** 
	 * Indicates if the the stock transfers must be put on hold automatically with the associated shipment.
	 * @example ```true```
	 */
	put_stock_transfers_on_hold?: boolean | null
	/** 
	 * Indicates if the the stock will be decremented manually after the order approval.
	 * @example ```true```
	 */
	manual_stock_decrement?: boolean | null
	
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

	async inventory_stock_locations(inventoryModelId: string | InventoryModel, params?: QueryParamsList<InventoryStockLocation>, options?: ResourcesConfig): Promise<ListResponse<InventoryStockLocation>> {
		const _inventoryModelId = (inventoryModelId as InventoryModel).id || inventoryModelId as string
		return this.resources.fetch<InventoryStockLocation>({ type: 'inventory_stock_locations' }, `inventory_models/${_inventoryModelId}/inventory_stock_locations`, params, options) as unknown as ListResponse<InventoryStockLocation>
	}

	async inventory_return_locations(inventoryModelId: string | InventoryModel, params?: QueryParamsList<InventoryReturnLocation>, options?: ResourcesConfig): Promise<ListResponse<InventoryReturnLocation>> {
		const _inventoryModelId = (inventoryModelId as InventoryModel).id || inventoryModelId as string
		return this.resources.fetch<InventoryReturnLocation>({ type: 'inventory_return_locations' }, `inventory_models/${_inventoryModelId}/inventory_return_locations`, params, options) as unknown as ListResponse<InventoryReturnLocation>
	}

	async attachments(inventoryModelId: string | InventoryModel, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _inventoryModelId = (inventoryModelId as InventoryModel).id || inventoryModelId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `inventory_models/${_inventoryModelId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(inventoryModelId: string | InventoryModel, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _inventoryModelId = (inventoryModelId as InventoryModel).id || inventoryModelId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `inventory_models/${_inventoryModelId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async event_stores(inventoryModelId: string | InventoryModel, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _inventoryModelId = (inventoryModelId as InventoryModel).id || inventoryModelId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `inventory_models/${_inventoryModelId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
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
