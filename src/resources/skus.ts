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
	description?: string
	image_url?: string
	pieces_per_pack?: number
	weight?: number
	unit_of_weight?: string
	hs_tariff_number?: string
	do_not_ship?: boolean
	do_not_track?: boolean
	inventory?: object

	shipping_category?: ShippingCategory
	prices?: Price[]
	stock_items?: StockItem[]
	delivery_lead_times?: DeliveryLeadTime[]
	sku_options?: SkuOption[]
	attachments?: Attachment[]

}


interface SkuCreate extends ResourceCreate {
	
	code: string
	name: string
	description?: string
	image_url?: string
	pieces_per_pack?: number
	weight?: number
	unit_of_weight?: string
	hs_tariff_number?: string
	do_not_ship?: boolean
	do_not_track?: boolean

	shipping_category: ShippingCategoryRel

}


interface SkuUpdate extends ResourceUpdate {
	
	code: string
	name: string
	description?: string
	image_url?: string
	pieces_per_pack?: number
	weight?: number
	unit_of_weight?: string
	hs_tariff_number?: string
	do_not_ship?: boolean
	do_not_track?: boolean

	shipping_category?: ShippingCategoryRel

}


class Skus extends ApiResource<Sku> {

	static readonly TYPE: SkuType = 'skus' as const
	// static readonly PATH = 'skus'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		return this.resources.list<Sku>({ type: Skus.TYPE }, params, options)
	}

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
