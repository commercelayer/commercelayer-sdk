import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { PriceList } from './price_lists'
import type { Sku } from './skus'
import type { PriceTier } from './price_tiers'
import type { PriceVolumeTier } from './price_volume_tiers'
import type { PriceFrequencyTier } from './price_frequency_tiers'
import type { Attachment } from './attachments'
import type { Version } from './versions'
import type { Customer } from './customers'
import type { Market } from './markets'
import type { StockLocation } from './stock_locations'


type PriceRel = ResourceRel & { type: typeof Prices.TYPE }
type PriceListRel = ResourceRel & { type: 'price_lists' }
type SkuRel = ResourceRel & { type: 'skus' }
type PriceTierRel = ResourceRel & { type: 'price_tiers' }


interface Price extends Resource {
	
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
	price_frequency_tiers?: PriceFrequencyTier[]
	attachments?: Attachment[]
	versions?: Version[]
	jwt_customer?: Customer
	jwt_markets?: Market[]
	jwt_stock_locations?: StockLocation[]

}


interface PriceCreate extends ResourceCreate {
	
	sku_code?: string
	amount_cents: number
	compare_at_amount_cents?: number

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


class Prices extends ApiResource {

	static readonly TYPE: 'prices' = 'prices' as const
	// static readonly PATH = 'prices'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Price>> {
		return this.resources.list<Price>({ type: Prices.TYPE }, params, options)
	}

	async create(resource: PriceCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Price> {
		return this.resources.create<PriceCreate, Price>({ ...resource, type: Prices.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Price> {
		return this.resources.retrieve<Price>({ type: Prices.TYPE, id }, params, options)
	}

	async update(resource: PriceUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Price> {
		return this.resources.update<PriceUpdate, Price>({ ...resource, type: Prices.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Prices.TYPE, id }, options)
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


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPrice(resource: any): resource is Price {
		return resource.type && (resource.type === Prices.TYPE)
	}


	relationship(id: string | ResourceId | null): PriceRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Prices.TYPE } : { id: id.id, type: Prices.TYPE }
	}


	type(): string {
		return Prices.TYPE
	}

}


export default Prices

export { Price, PriceCreate, PriceUpdate }
