import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { Parcel, ParcelType } from './parcels'
import type { StockLineItem, StockLineItemType } from './stock_line_items'


type ParcelLineItemType = 'parcel_line_items'
type ParcelLineItemRel = ResourceRel & { type: ParcelLineItemType }
type ParcelRel = ResourceRel & { type: ParcelType }
type StockLineItemRel = ResourceRel & { type: StockLineItemType }


interface ParcelLineItem extends Resource {
	
	readonly type: ParcelLineItemType

	sku_code?: string | null
	quantity: number
	name: string
	image_url?: string | null

	parcel?: Parcel | null
	stock_line_item?: StockLineItem | null
	/**
	* @deprecated This field should not be used as it may be removed in the future without notice
	*/
	shipment_line_item?: object

}


interface ParcelLineItemCreate extends ResourceCreate {
	
	sku_code?: string | null
	quantity: number

	parcel: ParcelRel
	stock_line_item: StockLineItemRel
	/**
	* @deprecated This field should not be used as it may be removed in the future without notice
	*/
	shipment_line_item?: object

}


type ParcelLineItemUpdate = ResourceUpdate


class ParcelLineItems extends ApiResource<ParcelLineItem> {

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
		return this.resources.fetch<Parcel>({ type: 'parcels' }, `parcel_line_items/${_parcelLineItemId}/parcel`, params, options) as unknown as Parcel
	}

	async stock_line_item(parcelLineItemId: string | ParcelLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLineItem> {
		const _parcelLineItemId = (parcelLineItemId as ParcelLineItem).id || parcelLineItemId as string
		return this.resources.fetch<StockLineItem>({ type: 'stock_line_items' }, `parcel_line_items/${_parcelLineItemId}/stock_line_item`, params, options) as unknown as StockLineItem
	}


	isParcelLineItem(resource: any): resource is ParcelLineItem {
		return resource.type && (resource.type === ParcelLineItems.TYPE)
	}


	relationship(id: string | ResourceId | null): ParcelLineItemRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ParcelLineItems.TYPE } : { id: id.id, type: ParcelLineItems.TYPE }
	}


	type(): ParcelLineItemType {
		return ParcelLineItems.TYPE
	}

}


export default ParcelLineItems

export type { ParcelLineItem, ParcelLineItemCreate, ParcelLineItemUpdate, ParcelLineItemType }
