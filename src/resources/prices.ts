import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PriceList, PriceListType } from './price_lists'
import type { Sku, SkuType } from './skus'
import type { PriceTier, PriceTierType } from './price_tiers'
import type { PriceVolumeTier } from './price_volume_tiers'
import type { Attachment } from './attachments'


type PriceType = 'prices'
type PriceRel = ResourceRel & { type: PriceType }
type PriceListRel = ResourceRel & { type: PriceListType }
type SkuRel = ResourceRel & { type: SkuType }
type PriceTierRel = ResourceRel & { type: PriceTierType }


interface Price extends Resource {
	
	readonly type: PriceType

	currency_code?: string
	sku_code?: string
	amount_cents?: number
	amount_float?: number
	formatted_amount?: string
	compare_at_amount_cents?: number
	compare_at_amount_float?: number
	formatted_compare_at_amount?: string

	price_list?: PriceList
	sku?: Sku
	price_tiers?: PriceTier[]
	price_volume_tiers?: PriceVolumeTier[]
	attachments?: Attachment[]

}


interface PriceCreate extends ResourceCreate {
	
	sku_code?: string
	amount_cents: number
	compare_at_amount_cents: number

	price_list: PriceListRel
	sku: SkuRel
	price_tiers?: PriceTierRel[]

}


interface PriceUpdate extends ResourceUpdate {
	
	sku_code?: string
	amount_cents?: number
	compare_at_amount_cents?: number

	price_list?: PriceListRel
	sku?: SkuRel
	price_tiers?: PriceTierRel[]

}


class Prices extends ApiResource<Price> {

	static readonly TYPE: PriceType = 'prices' as const
	// static readonly PATH = 'prices'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Price>> {
		return this.resources.list<Price>({ type: Prices.TYPE }, params, options)
	}

	async create(resource: PriceCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Price> {
		return this.resources.create<PriceCreate, Price>({ ...resource, type: Prices.TYPE }, params, options)
	}

	async update(resource: PriceUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Price> {
		return this.resources.update<PriceUpdate, Price>({ ...resource, type: Prices.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Prices.TYPE } : id, options)
	}

	async price_list(priceId: string | Price, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceList> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<PriceList>({ type: 'price_lists' }, `prices/${_priceId}/price_list`, params, options) as unknown as PriceList
	}

	async sku(priceId: string | Price, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `prices/${_priceId}/sku`, params, options) as unknown as Sku
	}

	async price_tiers(priceId: string | Price, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PriceTier>> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<PriceTier>({ type: 'price_tiers' }, `prices/${_priceId}/price_tiers`, params, options) as unknown as ListResponse<PriceTier>
	}

	async price_volume_tiers(priceId: string | Price, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PriceVolumeTier>> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<PriceVolumeTier>({ type: 'price_volume_tiers' }, `prices/${_priceId}/price_volume_tiers`, params, options) as unknown as ListResponse<PriceVolumeTier>
	}

	async attachments(priceId: string | Price, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `prices/${_priceId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isPrice(resource: any): resource is Price {
		return resource.type && (resource.type === Prices.TYPE)
	}


	relationship(id: string | ResourceId | null): PriceRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Prices.TYPE } : { id: id.id, type: Prices.TYPE }
	}


	type(): PriceType {
		return Prices.TYPE
	}

}


export default Prices

export type { Price, PriceCreate, PriceUpdate, PriceType }
