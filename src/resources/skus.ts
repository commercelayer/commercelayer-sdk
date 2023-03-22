import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { ShippingCategory, ShippingCategoryType } from './shipping_categories'
import type { Price } from './prices'
import type { StockItem } from './stock_items'
import type { DeliveryLeadTime } from './delivery_lead_times'
import type { SkuOption } from './sku_options'
import type { Attachment } from './attachments'


type SkuType = 'skus'
type SkuRel = ResourceRel & { type: SkuType }
type ShippingCategoryRel = ResourceRel & { type: ShippingCategoryType }


interface Sku extends Resource {
	
	readonly type: SkuType

	code: string
	name: string
	description?: string | null
	image_url?: string | null
	pieces_per_pack?: number | null
	weight?: number | null
	unit_of_weight?: string | null
	hs_tariff_number?: string | null
	do_not_ship?: boolean | null
	do_not_track?: boolean | null
	inventory?: object | null

	shipping_category?: ShippingCategory | null
	prices?: Price[] | null
	stock_items?: StockItem[] | null
	delivery_lead_times?: DeliveryLeadTime[] | null
	sku_options?: SkuOption[] | null
	attachments?: Attachment[] | null

}


interface SkuCreate extends ResourceCreate {
	
	code: string
	name: string
	description?: string | null
	image_url?: string | null
	pieces_per_pack?: number | null
	weight?: number | null
	unit_of_weight?: string | null
	hs_tariff_number?: string | null
	do_not_ship?: boolean | null
	do_not_track?: boolean | null

	shipping_category: ShippingCategoryRel

}


interface SkuUpdate extends ResourceUpdate {
	
	code?: string | null
	name?: string | null
	description?: string | null
	image_url?: string | null
	pieces_per_pack?: number | null
	weight?: number | null
	unit_of_weight?: string | null
	hs_tariff_number?: string | null
	do_not_ship?: boolean | null
	do_not_track?: boolean | null

	shipping_category?: ShippingCategoryRel | null

}


class Skus extends ApiResource<Sku> {

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
		return this.resources.fetch<ShippingCategory>({ type: 'shipping_categories' }, `skus/${_skuId}/shipping_category`, params, options) as unknown as ShippingCategory
	}

	async prices(skuId: string | Sku, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Price>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<Price>({ type: 'prices' }, `skus/${_skuId}/prices`, params, options) as unknown as ListResponse<Price>
	}

	async stock_items(skuId: string | Sku, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockItem>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<StockItem>({ type: 'stock_items' }, `skus/${_skuId}/stock_items`, params, options) as unknown as ListResponse<StockItem>
	}

	async delivery_lead_times(skuId: string | Sku, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<DeliveryLeadTime>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<DeliveryLeadTime>({ type: 'delivery_lead_times' }, `skus/${_skuId}/delivery_lead_times`, params, options) as unknown as ListResponse<DeliveryLeadTime>
	}

	async sku_options(skuId: string | Sku, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SkuOption>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<SkuOption>({ type: 'sku_options' }, `skus/${_skuId}/sku_options`, params, options) as unknown as ListResponse<SkuOption>
	}

	async attachments(skuId: string | Sku, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _skuId = (skuId as Sku).id || skuId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `skus/${_skuId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isSku(resource: any): resource is Sku {
		return resource.type && (resource.type === Skus.TYPE)
	}


	relationship(id: string | ResourceId | null): SkuRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Skus.TYPE } : { id: id.id, type: Skus.TYPE }
	}


	type(): SkuType {
		return Skus.TYPE
	}

}


export default Skus

export type { Sku, SkuCreate, SkuUpdate, SkuType }
