import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Parcel } from './parcels'
import type { StockLineItem } from './stock_line_items'


type ParcelLineItemRel = ResourceRel & { type: typeof ParcelLineItems.TYPE }
type ParcelRel = ResourceRel & { type: 'parcels' }
type StockLineItemRel = ResourceRel & { type: 'stock_line_items' }


interface ParcelLineItem extends Resource {
	
	sku_code?: string
	bundle_code?: string
	quantity?: number
	name?: string
	image_url?: string

	parcel?: Parcel
	stock_line_item?: StockLineItem
	/**
	* @deprecated This field should not be used as it may be removed in the future without notice
	*/
	shipment_line_item?: object

}


interface ParcelLineItemCreate extends ResourceCreate {
	
	quantity: number

	parcel: ParcelRel
	stock_line_item: StockLineItemRel
	/**
	* @deprecated This field should not be used as it may be removed in the future without notice
	*/
	shipment_line_item?: object

}


type ParcelLineItemUpdate = ResourceUpdate


class ParcelLineItems extends ApiResource {

	static readonly TYPE: 'parcel_line_items' = 'parcel_line_items' as const
	// static readonly PATH = 'parcel_line_items'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ParcelLineItem>> {
		return this.resources.list<ParcelLineItem>({ type: ParcelLineItems.TYPE }, params, options)
	}

	async create(resource: ParcelLineItemCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ParcelLineItem> {
		return this.resources.create<ParcelLineItemCreate, ParcelLineItem>({ ...resource, type: ParcelLineItems.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ParcelLineItem> {
		return this.resources.retrieve<ParcelLineItem>({ type: ParcelLineItems.TYPE, id }, params, options)
	}

	async update(resource: ParcelLineItemUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ParcelLineItem> {
		return this.resources.update<ParcelLineItemUpdate, ParcelLineItem>({ ...resource, type: ParcelLineItems.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ParcelLineItems.TYPE, id }, options)
	}

	async parcel(parcelLineItemId: string | ParcelLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Parcel> {
		const _parcelLineItemId = (parcelLineItemId as ParcelLineItem).id || parcelLineItemId as string
		return this.resources.fetch<Parcel>({ type: 'parcels' }, `parcel_line_items/${_parcelLineItemId}/parcel`, params, options) as unknown as Parcel
	}

	async stock_line_item(parcelLineItemId: string | ParcelLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLineItem> {
		const _parcelLineItemId = (parcelLineItemId as ParcelLineItem).id || parcelLineItemId as string
		return this.resources.fetch<StockLineItem>({ type: 'stock_line_items' }, `parcel_line_items/${_parcelLineItemId}/stock_line_item`, params, options) as unknown as StockLineItem
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isParcelLineItem(resource: any): resource is ParcelLineItem {
		return resource.type && (resource.type === ParcelLineItems.TYPE)
	}


	relationship(id: string | ResourceId | null): ParcelLineItemRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ParcelLineItems.TYPE } : { id: id.id, type: ParcelLineItems.TYPE }
	}


	type(): string {
		return ParcelLineItems.TYPE
	}

}


export default ParcelLineItems

export { ParcelLineItem, ParcelLineItemCreate, ParcelLineItemUpdate }
