import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
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
import type { EventStore } from './event_stores'


type PriceType = 'prices'
type PriceRel = ResourceRel & { type: PriceType }
type PriceListRel = ResourceRel & { type: PriceListType }
type SkuRel = ResourceRel & { type: SkuType }
type PriceTierRel = ResourceRel & { type: PriceTierType }


export type PriceSort = Pick<Price, 'id' | 'amount_cents' | 'compare_at_amount_cents'> & ResourceSort
// export type PriceFilter = Pick<Price, 'id' | 'amount_cents' | 'compare_at_amount_cents'> & ResourceFilter


interface Price extends Resource {
	
	readonly type: PriceType

	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard, inherited from the associated price list.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * The code of the associated SKU. When creating a price, either a valid sku_code or a SKU relationship must be present.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null
	/** 
	 * The SKU price amount for the associated price list, in cents.
	 * @example ```10000```
	 */
	amount_cents: number
	/** 
	 * The SKU price amount for the associated price list, float.
	 * @example ```100```
	 */
	amount_float?: number | null
	/** 
	 * The SKU price amount for the associated price list, formatted.
	 * @example ```"€100,00"```
	 */
	formatted_amount?: string | null
	/** 
	 * The SKU price amount for the associated price list, in cents before any applied rule.
	 * @example ```10000```
	 */
	original_amount_cents?: number | null
	/** 
	 * The SKU price amount for the associated price list, in cents before any applied rule, formatted.
	 * @example ```"€100,00"```
	 */
	formatted_original_amount?: string | null
	/** 
	 * The compared price amount, in cents. Useful to display a percentage discount.
	 * @example ```13000```
	 */
	compare_at_amount_cents?: number | null
	/** 
	 * The compared price amount, float.
	 * @example ```130```
	 */
	compare_at_amount_float?: number | null
	/** 
	 * The compared price amount, formatted.
	 * @example ```"€130,00"```
	 */
	formatted_compare_at_amount?: string | null
	/** 
	 * Time at which the resource was processed by API.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	processed_at?: string | null
	/** 
	 * The custom_claim attached to the current JWT (if any).
	 * @example ```{}```
	 */
	jwt_custom_claim?: Record<string, any> | null

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
	event_stores?: EventStore[] | null

}


interface PriceCreate extends ResourceCreate {
	
	/** 
	 * The code of the associated SKU. When creating a price, either a valid sku_code or a SKU relationship must be present.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null
	/** 
	 * The SKU price amount for the associated price list, in cents.
	 * @example ```10000```
	 */
	amount_cents: number
	/** 
	 * The compared price amount, in cents. Useful to display a percentage discount.
	 * @example ```13000```
	 */
	compare_at_amount_cents?: number | null
	/** 
	 * The rules (using Rules Engine) to be applied.
	 * @example ```{}```
	 */
	rules?: Record<string, any> | null

	price_list: PriceListRel
	sku: SkuRel
	price_tiers?: PriceTierRel[] | null

}


interface PriceUpdate extends ResourceUpdate {
	
	/** 
	 * The code of the associated SKU. When creating a price, either a valid sku_code or a SKU relationship must be present.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null
	/** 
	 * The SKU price amount for the associated price list, in cents.
	 * @example ```10000```
	 */
	amount_cents?: number | null
	/** 
	 * The compared price amount, in cents. Useful to display a percentage discount.
	 * @example ```13000```
	 */
	compare_at_amount_cents?: number | null
	/** 
	 * Time at which the resource was processed by API.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	processed_at?: string | null
	/** 
	 * The rules (using Rules Engine) to be applied.
	 * @example ```{}```
	 */
	rules?: Record<string, any> | null

	price_list?: PriceListRel | null
	sku?: SkuRel | null
	price_tiers?: PriceTierRel[] | null

}


class Prices extends ApiResource<Price> {

	static readonly TYPE: PriceType = 'prices' as const

	async create(resource: PriceCreate, params?: QueryParamsRetrieve<Price>, options?: ResourcesConfig): Promise<Price> {
		return this.resources.create<PriceCreate, Price>({ ...resource, type: Prices.TYPE }, params, options)
	}

	async update(resource: PriceUpdate, params?: QueryParamsRetrieve<Price>, options?: ResourcesConfig): Promise<Price> {
		return this.resources.update<PriceUpdate, Price>({ ...resource, type: Prices.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Prices.TYPE } : id, options)
	}

	async price_list(priceId: string | Price, params?: QueryParamsRetrieve<PriceList>, options?: ResourcesConfig): Promise<PriceList> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<PriceList>({ type: 'price_lists' }, `prices/${_priceId}/price_list`, params, options) as unknown as PriceList
	}

	async sku(priceId: string | Price, params?: QueryParamsRetrieve<Sku>, options?: ResourcesConfig): Promise<Sku> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `prices/${_priceId}/sku`, params, options) as unknown as Sku
	}

	async price_tiers(priceId: string | Price, params?: QueryParamsList<PriceTier>, options?: ResourcesConfig): Promise<ListResponse<PriceTier>> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<PriceTier>({ type: 'price_tiers' }, `prices/${_priceId}/price_tiers`, params, options) as unknown as ListResponse<PriceTier>
	}

	async price_volume_tiers(priceId: string | Price, params?: QueryParamsList<PriceVolumeTier>, options?: ResourcesConfig): Promise<ListResponse<PriceVolumeTier>> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<PriceVolumeTier>({ type: 'price_volume_tiers' }, `prices/${_priceId}/price_volume_tiers`, params, options) as unknown as ListResponse<PriceVolumeTier>
	}

	async price_frequency_tiers(priceId: string | Price, params?: QueryParamsList<PriceFrequencyTier>, options?: ResourcesConfig): Promise<ListResponse<PriceFrequencyTier>> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<PriceFrequencyTier>({ type: 'price_frequency_tiers' }, `prices/${_priceId}/price_frequency_tiers`, params, options) as unknown as ListResponse<PriceFrequencyTier>
	}

	async attachments(priceId: string | Price, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `prices/${_priceId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(priceId: string | Price, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `prices/${_priceId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async jwt_customer(priceId: string | Price, params?: QueryParamsRetrieve<Customer>, options?: ResourcesConfig): Promise<Customer> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `prices/${_priceId}/jwt_customer`, params, options) as unknown as Customer
	}

	async jwt_markets(priceId: string | Price, params?: QueryParamsList<Market>, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `prices/${_priceId}/jwt_markets`, params, options) as unknown as ListResponse<Market>
	}

	async jwt_stock_locations(priceId: string | Price, params?: QueryParamsList<StockLocation>, options?: ResourcesConfig): Promise<ListResponse<StockLocation>> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `prices/${_priceId}/jwt_stock_locations`, params, options) as unknown as ListResponse<StockLocation>
	}

	async event_stores(priceId: string | Price, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _priceId = (priceId as Price).id || priceId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `prices/${_priceId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
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
