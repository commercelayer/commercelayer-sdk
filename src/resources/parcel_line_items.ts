import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Parcel, ParcelType } from './parcels'
import type { StockLineItem, StockLineItemType } from './stock_line_items'
import type { Version } from './versions'


type ParcelLineItemType = 'parcel_line_items'
type ParcelLineItemRel = ResourceRel & { type: ParcelLineItemType }
type ParcelRel = ResourceRel & { type: ParcelType }
type StockLineItemRel = ResourceRel & { type: StockLineItemType }


export type ParcelLineItemSort = Pick<ParcelLineItem, 'id' | 'quantity'> & ResourceSort
// export type ParcelLineItemFilter = Pick<ParcelLineItem, 'id' | 'quantity'> & ResourceFilter


interface ParcelLineItem extends Resource {
	
	readonly type: ParcelLineItemType

	/** 
	 * The code of the associated bundle.
	 * @example ```"BUNDLEMM000000FFFFFFXLXX"```
	 */
	bundle_code?: string | null
	/** 
	 * The image_url of the associated line item.
	 * @example ```"https://img.yourdomain.com/skus/xYZkjABcde.png"```
	 */
	image_url?: string | null
	/** 
	 * The internal name of the associated line item.
	 * @example ```"Men's Black T-shirt with White Logo (XL)"```
	 */
	name: string
	/** 
	 * The parcel line item quantity.
	 * @example ```"4"```
	 */
	quantity: number
	/** 
	 * The code of the associated SKU.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null

	parcel?: Parcel | null
	stock_line_item?: StockLineItem | null
	versions?: Version[] | null

}


interface ParcelLineItemCreate extends ResourceCreate {
	
	/** 
	 * The parcel line item quantity.
	 * @example ```"4"```
	 */
	quantity: number

	parcel: ParcelRel
	stock_line_item: StockLineItemRel

}


type ParcelLineItemUpdate = ResourceUpdate


class ParcelLineItems extends ApiResource<ParcelLineItem> {

	static readonly TYPE: ParcelLineItemType = 'parcel_line_items' as const

	async create(resource: ParcelLineItemCreate, params?: QueryParamsRetrieve<ParcelLineItem>, options?: ResourcesConfig): Promise<ParcelLineItem> {
		return this.resources.create<ParcelLineItemCreate, ParcelLineItem>({ ...resource, type: ParcelLineItems.TYPE }, params, options)
	}

	async update(resource: ParcelLineItemUpdate, params?: QueryParamsRetrieve<ParcelLineItem>, options?: ResourcesConfig): Promise<ParcelLineItem> {
		return this.resources.update<ParcelLineItemUpdate, ParcelLineItem>({ ...resource, type: ParcelLineItems.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ParcelLineItems.TYPE } : id, options)
	}

	async parcel(parcelLineItemId: string | ParcelLineItem, params?: QueryParamsRetrieve<Parcel>, options?: ResourcesConfig): Promise<Parcel> {
		const _parcelLineItemId = (parcelLineItemId as ParcelLineItem).id || parcelLineItemId as string
		return this.resources.fetch<Parcel>({ type: 'parcels' }, `parcel_line_items/${_parcelLineItemId}/parcel`, params, options) as unknown as Parcel
	}

	async stock_line_item(parcelLineItemId: string | ParcelLineItem, params?: QueryParamsRetrieve<StockLineItem>, options?: ResourcesConfig): Promise<StockLineItem> {
		const _parcelLineItemId = (parcelLineItemId as ParcelLineItem).id || parcelLineItemId as string
		return this.resources.fetch<StockLineItem>({ type: 'stock_line_items' }, `parcel_line_items/${_parcelLineItemId}/stock_line_item`, params, options) as unknown as StockLineItem
	}

	async versions(parcelLineItemId: string | ParcelLineItem, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _parcelLineItemId = (parcelLineItemId as ParcelLineItem).id || parcelLineItemId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `parcel_line_items/${_parcelLineItemId}/versions`, params, options) as unknown as ListResponse<Version>
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
