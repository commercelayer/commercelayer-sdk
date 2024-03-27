import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Parcel, ParcelType, ParcelSortable } from './parcels'
import type { StockLineItem, StockLineItemType, StockLineItemSortable } from './stock_line_items'
import type { Version, VersionSortable } from './versions'


type ParcelLineItemType = 'parcel_line_items'
type ParcelLineItemRel = ResourceRel & { type: ParcelLineItemType }
type ParcelRel = ResourceRel & { type: ParcelType }
type StockLineItemRel = ResourceRel & { type: StockLineItemType }


export type ParcelLineItemSortable = Pick<ParcelLineItem, 'id' | 'quantity'> & ResourceSortable
export type ParcelLineItemFilterable = Pick<ParcelLineItem, 'id' | 'quantity'> & ResourceFilterable


interface ParcelLineItem extends Resource {
	
	readonly type: ParcelLineItemType

	sku_code?: string | null
	bundle_code?: string | null
	quantity: number
	name: string
	image_url?: string | null

	parcel?: Parcel | null
	stock_line_item?: StockLineItem | null
	versions?: Version[] | null

}


interface ParcelLineItemCreate extends ResourceCreate {
	
	quantity: number

	parcel: ParcelRel
	stock_line_item: StockLineItemRel

}


type ParcelLineItemUpdate = ResourceUpdate


class ParcelLineItems extends ApiResource<ParcelLineItem, ParcelLineItemSortable> {

	static readonly TYPE: ParcelLineItemType = 'parcel_line_items' as const

	async create(resource: ParcelLineItemCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ParcelLineItem> {
		return this.resources.create<ParcelLineItemCreate, ParcelLineItem>({ ...resource, type: ParcelLineItems.TYPE }, params, options)
	}

	async update(resource: ParcelLineItemUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ParcelLineItem> {
		return this.resources.update<ParcelLineItemUpdate, ParcelLineItem>({ ...resource, type: ParcelLineItems.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ParcelLineItems.TYPE } : id, options)
	}

	async parcel(parcelLineItemId: string | ParcelLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Parcel> {
		const _parcelLineItemId = (parcelLineItemId as ParcelLineItem).id || parcelLineItemId as string
		return this.resources.fetch<Parcel, ParcelSortable>({ type: 'parcels' }, `parcel_line_items/${_parcelLineItemId}/parcel`, params, options) as unknown as Parcel
	}

	async stock_line_item(parcelLineItemId: string | ParcelLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLineItem> {
		const _parcelLineItemId = (parcelLineItemId as ParcelLineItem).id || parcelLineItemId as string
		return this.resources.fetch<StockLineItem, StockLineItemSortable>({ type: 'stock_line_items' }, `parcel_line_items/${_parcelLineItemId}/stock_line_item`, params, options) as unknown as StockLineItem
	}

	async versions(parcelLineItemId: string | ParcelLineItem, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _parcelLineItemId = (parcelLineItemId as ParcelLineItem).id || parcelLineItemId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `parcel_line_items/${_parcelLineItemId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isParcelLineItem(resource: any): resource is ParcelLineItem {
		return resource.type && (resource.type === ParcelLineItems.TYPE)
	}


	relationship(id: string | ResourceId | null): ParcelLineItemRel {
		return super.relationshipOneToOne<ParcelLineItemRel>(id)
	}

	relationshipToMany(...ids: string[]): ParcelLineItemRel[] {
		return super.relationshipOneToMany<ParcelLineItemRel>(...ids)
	}


	type(): ParcelLineItemType {
		return ParcelLineItems.TYPE
	}

}


export default ParcelLineItems

export type { ParcelLineItem, ParcelLineItemCreate, ParcelLineItemUpdate, ParcelLineItemType }

/*
export const ParcelLineItemsClient = (init: ResourceAdapter | ResourcesInitConfig): ParcelLineItems => {
	return new ParcelLineItems((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
