import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PriceList, PriceListType } from './price_lists'
import type { Sku, SkuType } from './skus'
import type { PriceTier, PriceTierType } from './price_tiers'
import type { PriceVolumeTier } from './price_volume_tiers'
import type { PriceFrequencyTier } from './price_frequency_tiers'
import type { Attachment } from './attachments'
import type { Version } from './versions'
import type { Customer } from './customers'
import type { Market } from './markets'
import type { StockLocation } from './stock_locations'


type PriceType = 'prices'
type PriceRel = ResourceRel & { type: PriceType }
type PriceListRel = ResourceRel & { type: PriceListType }
type SkuRel = ResourceRel & { type: SkuType }
type PriceTierRel = ResourceRel & { type: PriceTierType }


interface Price extends Resource {
	
	readonly type: PriceType

	currency_code?: string | null
	sku_code?: string | null
	amount_cents: number
	amount_float?: number | null
	formatted_amount?: string | null
	compare_at_amount_cents?: number | null
	compare_at_amount_float?: number | null
	formatted_compare_at_amount?: string | null

	price_list?: PriceList | null
	sku?: Sku | null
	price_tiers?: PriceTier[] | null
	price_volume_tiers?: PriceVolumeTier[] | null
	price_frequency_tiers?: PriceFrequencyTier[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null
	jwt_customer?: Customer | null
	jwt_markets?: Market[] | null
	jwt_stock_locations?: StockLocation[] | null

}


interface PriceCreate extends ResourceCreate {
	
	sku_code?: string | null
	amount_cents: number
	compare_at_amount_cents?: number | null

	price_list: PriceListRel
	sku: SkuRel
	price_tiers?: PriceTierRel[] | null

}


interface PriceUpdate extends ResourceUpdate {
	
	sku_code?: string | null
	amount_cents?: number | null
	compare_at_amount_cents?: number | null

	price_list?: PriceListRel | null
	sku?: SkuRel | null
	price_tiers?: PriceTierRel[] | null

}


class Prices extends ApiResource<Price> {

	static readonly TYPE: PriceType = 'prices' as const

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

	async price_frequency_tiers(priceId: string | Price, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PriceFrequencyTier>> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<PriceFrequencyTier>({ type: 'price_frequency_tiers' }, `prices/${_priceId}/price_frequency_tiers`, params, options) as unknown as ListResponse<PriceFrequencyTier>
	}

	async attachments(priceId: string | Price, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `prices/${_priceId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(priceId: string | Price, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `prices/${_priceId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async jwt_customer(priceId: string | Price, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `prices/${_priceId}/jwt_customer`, params, options) as unknown as Customer
	}

	async jwt_markets(priceId: string | Price, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `prices/${_priceId}/jwt_markets`, params, options) as unknown as ListResponse<Market>
	}

	async jwt_stock_locations(priceId: string | Price, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockLocation>> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `prices/${_priceId}/jwt_stock_locations`, params, options) as unknown as ListResponse<StockLocation>
	}


	isPrice(resource: any): resource is Price {
		return resource.type && (resource.type === Prices.TYPE)
	}


	relationship(id: string | ResourceId | null): PriceRel {
		return super.relationshipOneToOne<PriceRel>(id)
	}

	relationshipToMany(...ids: string[]): PriceRel[] {
		return super.relationshipOneToMany<PriceRel>(...ids)
	}


	type(): PriceType {
		return Prices.TYPE
	}

}


export default Prices

export type { Price, PriceCreate, PriceUpdate, PriceType }
