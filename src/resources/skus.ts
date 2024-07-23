import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { ShippingCategory, ShippingCategoryType } from './shipping_categories'
import type { Price } from './prices'
import type { StockItem } from './stock_items'
import type { StockReservation } from './stock_reservations'
import type { DeliveryLeadTime } from './delivery_lead_times'
import type { SkuOption } from './sku_options'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'


type SkuType = 'skus'
type SkuRel = ResourceRel & { type: SkuType }
type ShippingCategoryRel = ResourceRel & { type: ShippingCategoryType }
type TagRel = ResourceRel & { type: TagType }


export type SkuSort = Pick<Sku, 'id' | 'code' | 'name' | 'do_not_ship' | 'do_not_track'> & ResourceSort
// export type SkuFilter = Pick<Sku, 'id' | 'code' | 'name' | 'description' | 'image_url' | 'do_not_ship' | 'do_not_track'> & ResourceFilter


interface Sku extends Resource {
	
	readonly type: SkuType

	/** 
	 * The SKU code, that uniquely identifies the SKU within the organization.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	code: string
	/** 
	 * The internal name of the SKU.
	 * @example ```"Men's Black T-shirt with White Logo (XL)"```
	 */
	name: string
	/** 
	 * An internal description of the SKU.
	 * @example ```"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."```
	 */
	description?: string | null
	/** 
	 * The URL of an image that represents the SKU.
	 * @example ```"https://img.yourdomain.com/skus/xYZkjABcde.png"```
	 */
	image_url?: string | null
	/** 
	 * The number of pieces that compose the SKU. This is useful to describe sets and bundles.
	 * @example ```"6"```
	 */
	pieces_per_pack?: number | null
	/** 
	 * The weight of the SKU. If present, it will be used to calculate the shipping rates.
	 * @example ```"300"```
	 */
	weight?: number | null
	/** 
	 * The unit of weight. One of 'gr', 'oz', or 'lb'.
	 * @example ```"gr"```
	 */
	unit_of_weight?: 'gr' | 'oz' | 'lb' | null
	/** 
	 * The Harmonized System Code used by customs to identify the products shipped across international borders.
	 * @example ```"4901.91.0020"```
	 */
	hs_tariff_number?: string | null
	/** 
	 * Indicates if the SKU doesn't generate shipments.
	 */
	do_not_ship?: boolean | null
	/** 
	 * Indicates if the SKU doesn't track the stock inventory.
	 */
	do_not_track?: boolean | null
	/** 
	 * Aggregated information about the SKU's inventory. Returned only when retrieving a single SKU.
	 * @example ```"[object Object]"```
	 */
	inventory?: Record<string, any> | null

	shipping_category?: ShippingCategory | null
	prices?: Price[] | null
	stock_items?: StockItem[] | null
	stock_reservations?: StockReservation[] | null
	delivery_lead_times?: DeliveryLeadTime[] | null
	sku_options?: SkuOption[] | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	tags?: Tag[] | null
	versions?: Version[] | null

}


interface SkuCreate extends ResourceCreate {
	
	/** 
	 * The SKU code, that uniquely identifies the SKU within the organization.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	code: string
	/** 
	 * The internal name of the SKU.
	 * @example ```"Men's Black T-shirt with White Logo (XL)"```
	 */
	name: string
	/** 
	 * An internal description of the SKU.
	 * @example ```"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."```
	 */
	description?: string | null
	/** 
	 * The URL of an image that represents the SKU.
	 * @example ```"https://img.yourdomain.com/skus/xYZkjABcde.png"```
	 */
	image_url?: string | null
	/** 
	 * The number of pieces that compose the SKU. This is useful to describe sets and bundles.
	 * @example ```"6"```
	 */
	pieces_per_pack?: number | null
	/** 
	 * The weight of the SKU. If present, it will be used to calculate the shipping rates.
	 * @example ```"300"```
	 */
	weight?: number | null
	/** 
	 * The unit of weight. One of 'gr', 'oz', or 'lb'.
	 * @example ```"gr"```
	 */
	unit_of_weight?: 'gr' | 'oz' | 'lb' | null
	/** 
	 * The Harmonized System Code used by customs to identify the products shipped across international borders.
	 * @example ```"4901.91.0020"```
	 */
	hs_tariff_number?: string | null
	/** 
	 * Indicates if the SKU doesn't generate shipments.
	 */
	do_not_ship?: boolean | null
	/** 
	 * Indicates if the SKU doesn't track the stock inventory.
	 */
	do_not_track?: boolean | null

	shipping_category: ShippingCategoryRel
	tags?: TagRel[] | null

}


interface SkuUpdate extends ResourceUpdate {
	
	/** 
	 * The SKU code, that uniquely identifies the SKU within the organization.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	code?: string | null
	/** 
	 * The internal name of the SKU.
	 * @example ```"Men's Black T-shirt with White Logo (XL)"```
	 */
	name?: string | null
	/** 
	 * An internal description of the SKU.
	 * @example ```"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."```
	 */
	description?: string | null
	/** 
	 * The URL of an image that represents the SKU.
	 * @example ```"https://img.yourdomain.com/skus/xYZkjABcde.png"```
	 */
	image_url?: string | null
	/** 
	 * The number of pieces that compose the SKU. This is useful to describe sets and bundles.
	 * @example ```"6"```
	 */
	pieces_per_pack?: number | null
	/** 
	 * The weight of the SKU. If present, it will be used to calculate the shipping rates.
	 * @example ```"300"```
	 */
	weight?: number | null
	/** 
	 * The unit of weight. One of 'gr', 'oz', or 'lb'.
	 * @example ```"gr"```
	 */
	unit_of_weight?: 'gr' | 'oz' | 'lb' | null
	/** 
	 * The Harmonized System Code used by customs to identify the products shipped across international borders.
	 * @example ```"4901.91.0020"```
	 */
	hs_tariff_number?: string | null
	/** 
	 * Indicates if the SKU doesn't generate shipments.
	 */
	do_not_ship?: boolean | null
	/** 
	 * Indicates if the SKU doesn't track the stock inventory.
	 */
	do_not_track?: boolean | null

	shipping_category?: ShippingCategoryRel | null
	tags?: TagRel[] | null

}


class Skus extends ApiResource<Sku> {

	static readonly TYPE: SkuType = 'skus' as const

	async create(resource: SkuCreate, params?: QueryParamsRetrieve<Sku>, options?: ResourcesConfig): Promise<Sku> {
		return this.resources.create<SkuCreate, Sku>({ ...resource, type: Skus.TYPE }, params, options)
	}

	async update(resource: SkuUpdate, params?: QueryParamsRetrieve<Sku>, options?: ResourcesConfig): Promise<Sku> {
		return this.resources.update<SkuUpdate, Sku>({ ...resource, type: Skus.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Skus.TYPE } : id, options)
	}

	async shipping_category(skuId: string | Sku, params?: QueryParamsRetrieve<ShippingCategory>, options?: ResourcesConfig): Promise<ShippingCategory> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<ShippingCategory>({ type: 'shipping_categories' }, `skus/${_skuId}/shipping_category`, params, options) as unknown as ShippingCategory
	}

	async prices(skuId: string | Sku, params?: QueryParamsList<Price>, options?: ResourcesConfig): Promise<ListResponse<Price>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<Price>({ type: 'prices' }, `skus/${_skuId}/prices`, params, options) as unknown as ListResponse<Price>
	}

	async stock_items(skuId: string | Sku, params?: QueryParamsList<StockItem>, options?: ResourcesConfig): Promise<ListResponse<StockItem>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<StockItem>({ type: 'stock_items' }, `skus/${_skuId}/stock_items`, params, options) as unknown as ListResponse<StockItem>
	}

	async stock_reservations(skuId: string | Sku, params?: QueryParamsList<StockReservation>, options?: ResourcesConfig): Promise<ListResponse<StockReservation>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<StockReservation>({ type: 'stock_reservations' }, `skus/${_skuId}/stock_reservations`, params, options) as unknown as ListResponse<StockReservation>
	}

	async delivery_lead_times(skuId: string | Sku, params?: QueryParamsList<DeliveryLeadTime>, options?: ResourcesConfig): Promise<ListResponse<DeliveryLeadTime>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<DeliveryLeadTime>({ type: 'delivery_lead_times' }, `skus/${_skuId}/delivery_lead_times`, params, options) as unknown as ListResponse<DeliveryLeadTime>
	}

	async sku_options(skuId: string | Sku, params?: QueryParamsList<SkuOption>, options?: ResourcesConfig): Promise<ListResponse<SkuOption>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<SkuOption>({ type: 'sku_options' }, `skus/${_skuId}/sku_options`, params, options) as unknown as ListResponse<SkuOption>
	}

	async attachments(skuId: string | Sku, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `skus/${_skuId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(skuId: string | Sku, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<Event>({ type: 'events' }, `skus/${_skuId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(skuId: string | Sku, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `skus/${_skuId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(skuId: string | Sku, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `skus/${_skuId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isSku(resource: any): resource is Sku {
		return resource.type && (resource.type === Skus.TYPE)
	}


	relationship(id: string | ResourceId | null): SkuRel {
		return super.relationshipOneToOne<SkuRel>(id)
	}

	relationshipToMany(...ids: string[]): SkuRel[] {
		return super.relationshipOneToMany<SkuRel>(...ids)
	}


	type(): SkuType {
		return Skus.TYPE
	}

}


export default Skus

export type { Sku, SkuCreate, SkuUpdate, SkuType }
