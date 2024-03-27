import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { ShippingCategory, ShippingCategoryType, ShippingCategorySortable } from './shipping_categories'
import type { Price, PriceSortable } from './prices'
import type { StockItem, StockItemSortable } from './stock_items'
import type { StockReservation, StockReservationSortable } from './stock_reservations'
import type { DeliveryLeadTime, DeliveryLeadTimeSortable } from './delivery_lead_times'
import type { SkuOption, SkuOptionSortable } from './sku_options'
import type { Attachment, AttachmentSortable } from './attachments'
import type { Event, EventSortable } from './events'
import type { Tag, TagType, TagSortable } from './tags'
import type { Version, VersionSortable } from './versions'


type SkuType = 'skus'
type SkuRel = ResourceRel & { type: SkuType }
type ShippingCategoryRel = ResourceRel & { type: ShippingCategoryType }
type TagRel = ResourceRel & { type: TagType }


export type SkuSortable = Pick<Sku, 'id' | 'code' | 'name' | 'do_not_ship' | 'do_not_track'> & ResourceSortable
export type SkuFilterable = Pick<Sku, 'id' | 'code' | 'name' | 'description' | 'image_url' | 'do_not_ship' | 'do_not_track'> & ResourceFilterable


interface Sku extends Resource {
	
	readonly type: SkuType

	code: string
	name: string
	description?: string | null
	image_url?: string | null
	pieces_per_pack?: number | null
	weight?: number | null
	unit_of_weight?: 'gr' | 'lb' | 'oz' | null
	hs_tariff_number?: string | null
	do_not_ship?: boolean | null
	do_not_track?: boolean | null
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
	
	code: string
	name: string
	description?: string | null
	image_url?: string | null
	pieces_per_pack?: number | null
	weight?: number | null
	unit_of_weight?: 'gr' | 'lb' | 'oz' | null
	hs_tariff_number?: string | null
	do_not_ship?: boolean | null
	do_not_track?: boolean | null

	shipping_category: ShippingCategoryRel
	tags?: TagRel[] | null

}


interface SkuUpdate extends ResourceUpdate {
	
	code?: string | null
	name?: string | null
	description?: string | null
	image_url?: string | null
	pieces_per_pack?: number | null
	weight?: number | null
	unit_of_weight?: 'gr' | 'lb' | 'oz' | null
	hs_tariff_number?: string | null
	do_not_ship?: boolean | null
	do_not_track?: boolean | null

	shipping_category?: ShippingCategoryRel | null
	tags?: TagRel[] | null

}


class Skus extends ApiResource<Sku, SkuSortable> {

	static readonly TYPE: SkuType = 'skus' as const

	async create(resource: SkuCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku> {
		return this.resources.create<SkuCreate, Sku>({ ...resource, type: Skus.TYPE }, params, options)
	}

	async update(resource: SkuUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku> {
		return this.resources.update<SkuUpdate, Sku>({ ...resource, type: Skus.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Skus.TYPE } : id, options)
	}

	async shipping_category(skuId: string | Sku, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingCategory> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<ShippingCategory, ShippingCategorySortable>({ type: 'shipping_categories' }, `skus/${_skuId}/shipping_category`, params, options) as unknown as ShippingCategory
	}

	async prices(skuId: string | Sku, params?: QueryParamsList<PriceSortable>, options?: ResourcesConfig): Promise<ListResponse<Price>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<Price, PriceSortable>({ type: 'prices' }, `skus/${_skuId}/prices`, params, options) as unknown as ListResponse<Price>
	}

	async stock_items(skuId: string | Sku, params?: QueryParamsList<StockItemSortable>, options?: ResourcesConfig): Promise<ListResponse<StockItem>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<StockItem, StockItemSortable>({ type: 'stock_items' }, `skus/${_skuId}/stock_items`, params, options) as unknown as ListResponse<StockItem>
	}

	async stock_reservations(skuId: string | Sku, params?: QueryParamsList<StockReservationSortable>, options?: ResourcesConfig): Promise<ListResponse<StockReservation>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<StockReservation, StockReservationSortable>({ type: 'stock_reservations' }, `skus/${_skuId}/stock_reservations`, params, options) as unknown as ListResponse<StockReservation>
	}

	async delivery_lead_times(skuId: string | Sku, params?: QueryParamsList<DeliveryLeadTimeSortable>, options?: ResourcesConfig): Promise<ListResponse<DeliveryLeadTime>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<DeliveryLeadTime, DeliveryLeadTimeSortable>({ type: 'delivery_lead_times' }, `skus/${_skuId}/delivery_lead_times`, params, options) as unknown as ListResponse<DeliveryLeadTime>
	}

	async sku_options(skuId: string | Sku, params?: QueryParamsList<SkuOptionSortable>, options?: ResourcesConfig): Promise<ListResponse<SkuOption>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<SkuOption, SkuOptionSortable>({ type: 'sku_options' }, `skus/${_skuId}/sku_options`, params, options) as unknown as ListResponse<SkuOption>
	}

	async attachments(skuId: string | Sku, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `skus/${_skuId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(skuId: string | Sku, params?: QueryParamsList<EventSortable>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<Event, EventSortable>({ type: 'events' }, `skus/${_skuId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(skuId: string | Sku, params?: QueryParamsList<TagSortable>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<Tag, TagSortable>({ type: 'tags' }, `skus/${_skuId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(skuId: string | Sku, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `skus/${_skuId}/versions`, params, options) as unknown as ListResponse<Version>
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

/*
export const SkusClient = (init: ResourceAdapter | ResourcesInitConfig): Skus => {
	return new Skus((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
