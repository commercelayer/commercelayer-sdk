import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Address, AddressType, AddressSortable } from './addresses'
import type { InventoryStockLocation, InventoryStockLocationSortable } from './inventory_stock_locations'
import type { InventoryReturnLocation, InventoryReturnLocationSortable } from './inventory_return_locations'
import type { StockItem, StockItemSortable } from './stock_items'
import type { StockTransfer, StockTransferSortable } from './stock_transfers'
import type { Attachment, AttachmentSortable } from './attachments'
import type { Version, VersionSortable } from './versions'


type StockLocationType = 'stock_locations'
type StockLocationRel = ResourceRel & { type: StockLocationType }
type AddressRel = ResourceRel & { type: AddressType }


export type StockLocationSortable = Pick<StockLocation, 'id' | 'name' | 'code' | 'label_format' | 'suppress_etd'> & ResourceSortable
export type StockLocationFilterable = Pick<StockLocation, 'id' | 'name' | 'code' | 'label_format' | 'suppress_etd'> & ResourceFilterable


interface StockLocation extends Resource {
	
	readonly type: StockLocationType

	number?: number | null
	name: string
	code?: string | null
	label_format?: string | null
	suppress_etd?: boolean | null

	address?: Address | null
	inventory_stock_locations?: InventoryStockLocation[] | null
	inventory_return_locations?: InventoryReturnLocation[] | null
	stock_items?: StockItem[] | null
	stock_transfers?: StockTransfer[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface StockLocationCreate extends ResourceCreate {
	
	name: string
	code?: string | null
	label_format?: string | null
	suppress_etd?: boolean | null

	address: AddressRel

}


interface StockLocationUpdate extends ResourceUpdate {
	
	name?: string | null
	code?: string | null
	label_format?: string | null
	suppress_etd?: boolean | null

	address?: AddressRel | null

}


class StockLocations extends ApiResource<StockLocation, StockLocationSortable> {

	static readonly TYPE: StockLocationType = 'stock_locations' as const

	async create(resource: StockLocationCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		return this.resources.create<StockLocationCreate, StockLocation>({ ...resource, type: StockLocations.TYPE }, params, options)
	}

	async update(resource: StockLocationUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		return this.resources.update<StockLocationUpdate, StockLocation>({ ...resource, type: StockLocations.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: StockLocations.TYPE } : id, options)
	}

	async address(stockLocationId: string | StockLocation, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<Address, AddressSortable>({ type: 'addresses' }, `stock_locations/${_stockLocationId}/address`, params, options) as unknown as Address
	}

	async inventory_stock_locations(stockLocationId: string | StockLocation, params?: QueryParamsList<InventoryStockLocationSortable>, options?: ResourcesConfig): Promise<ListResponse<InventoryStockLocation>> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<InventoryStockLocation, InventoryStockLocationSortable>({ type: 'inventory_stock_locations' }, `stock_locations/${_stockLocationId}/inventory_stock_locations`, params, options) as unknown as ListResponse<InventoryStockLocation>
	}

	async inventory_return_locations(stockLocationId: string | StockLocation, params?: QueryParamsList<InventoryReturnLocationSortable>, options?: ResourcesConfig): Promise<ListResponse<InventoryReturnLocation>> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<InventoryReturnLocation, InventoryReturnLocationSortable>({ type: 'inventory_return_locations' }, `stock_locations/${_stockLocationId}/inventory_return_locations`, params, options) as unknown as ListResponse<InventoryReturnLocation>
	}

	async stock_items(stockLocationId: string | StockLocation, params?: QueryParamsList<StockItemSortable>, options?: ResourcesConfig): Promise<ListResponse<StockItem>> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<StockItem, StockItemSortable>({ type: 'stock_items' }, `stock_locations/${_stockLocationId}/stock_items`, params, options) as unknown as ListResponse<StockItem>
	}

	async stock_transfers(stockLocationId: string | StockLocation, params?: QueryParamsList<StockTransferSortable>, options?: ResourcesConfig): Promise<ListResponse<StockTransfer>> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<StockTransfer, StockTransferSortable>({ type: 'stock_transfers' }, `stock_locations/${_stockLocationId}/stock_transfers`, params, options) as unknown as ListResponse<StockTransfer>
	}

	async attachments(stockLocationId: string | StockLocation, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `stock_locations/${_stockLocationId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(stockLocationId: string | StockLocation, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _stockLocationId = (stockLocationId as StockLocation).id || stockLocationId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `stock_locations/${_stockLocationId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isStockLocation(resource: any): resource is StockLocation {
		return resource.type && (resource.type === StockLocations.TYPE)
	}


	relationship(id: string | ResourceId | null): StockLocationRel {
		return super.relationshipOneToOne<StockLocationRel>(id)
	}

	relationshipToMany(...ids: string[]): StockLocationRel[] {
		return super.relationshipOneToMany<StockLocationRel>(...ids)
	}


	type(): StockLocationType {
		return StockLocations.TYPE
	}

}


export default StockLocations

export type { StockLocation, StockLocationCreate, StockLocationUpdate, StockLocationType }

/*
export const StockLocationsClient = (init: ResourceAdapter | ResourcesInitConfig): StockLocations => {
	return new StockLocations((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
