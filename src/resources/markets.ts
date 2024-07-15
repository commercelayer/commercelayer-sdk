import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Merchant, MerchantType } from './merchants'
import type { PriceList, PriceListType } from './price_lists'
import type { InventoryModel, InventoryModelType } from './inventory_models'
import type { SubscriptionModel, SubscriptionModelType } from './subscription_models'
import type { TaxCalculator } from './tax_calculators'
import type { CustomerGroup, CustomerGroupType } from './customer_groups'
import type { Geocoder, GeocoderType } from './geocoders'
import type { PriceListScheduler } from './price_list_schedulers'
import type { Attachment } from './attachments'
import type { Version } from './versions'
import type { AvalaraAccount, AvalaraAccountType } from './avalara_accounts'
import type { TaxjarAccount, TaxjarAccountType } from './taxjar_accounts'
import type { ManualTaxCalculator, ManualTaxCalculatorType } from './manual_tax_calculators'
import type { ExternalTaxCalculator, ExternalTaxCalculatorType } from './external_tax_calculators'


type MarketType = 'markets'
type MarketRel = ResourceRel & { type: MarketType }
type MerchantRel = ResourceRel & { type: MerchantType }
type PriceListRel = ResourceRel & { type: PriceListType }
type InventoryModelRel = ResourceRel & { type: InventoryModelType }
type SubscriptionModelRel = ResourceRel & { type: SubscriptionModelType }
type AvalaraAccountRel = ResourceRel & { type: AvalaraAccountType }
type TaxjarAccountRel = ResourceRel & { type: TaxjarAccountType }
type ManualTaxCalculatorRel = ResourceRel & { type: ManualTaxCalculatorType }
type ExternalTaxCalculatorRel = ResourceRel & { type: ExternalTaxCalculatorType }
type CustomerGroupRel = ResourceRel & { type: CustomerGroupType }
type GeocoderRel = ResourceRel & { type: GeocoderType }


export type MarketSort = Pick<Market, 'id' | 'name' | 'code' | 'disabled_at'> & ResourceSort
// export type MarketFilter = Pick<Market, 'id' | 'name' | 'code' | 'disabled_at'> & ResourceFilter


interface Market extends Resource {
	
	readonly type: MarketType

	/** 
	 * Unique identifier for the market (numeric).
	 * @example ```"1234"```
	 */
	number?: number | null
	/** 
	 * The market's internal name.
	 * @example ```"EU Market"```
	 */
	name: string
	/** 
	 * A string that you can use to identify the market (must be unique within the environment).
	 * @example ```"europe1"```
	 */
	code?: string | null
	/** 
	 * The Facebook Pixed ID.
	 * @example ```"1234567890"```
	 */
	facebook_pixel_id?: string | null
	/** 
	 * The checkout URL for this market.
	 * @example ```"https://checkout.yourbrand.com/:order_id"```
	 */
	checkout_url?: string | null
	/** 
	 * The URL used to overwrite prices by an external source.
	 * @example ```"https://external_prices.yourbrand.com"```
	 */
	external_prices_url?: string | null
	/** 
	 * The URL used to validate orders by an external source.
	 * @example ```"https://external_validation.yourbrand.com"```
	 */
	external_order_validation_url?: string | null
	/** 
	 * Indicates if market belongs to a customer_group.
	 * @example ```"true"```
	 */
	private?: boolean | null
	/** 
	 * Time at which this resource was disabled.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	disabled_at?: string | null
	/** 
	 * The shared secret used to sign the external request payload.
	 * @example ```"1c0994cc4e996e8c6ee56a2198f66f3c"```
	 */
	shared_secret: string

	merchant?: Merchant | null
	price_list?: PriceList | null
	inventory_model?: InventoryModel | null
	subscription_model?: SubscriptionModel | null
	tax_calculator?: AvalaraAccount | TaxjarAccount | ManualTaxCalculator | ExternalTaxCalculator | null
	customer_group?: CustomerGroup | null
	geocoder?: Geocoder | null
	price_list_schedulers?: PriceListScheduler[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface MarketCreate extends ResourceCreate {
	
	/** 
	 * The market's internal name.
	 * @example ```"EU Market"```
	 */
	name: string
	/** 
	 * A string that you can use to identify the market (must be unique within the environment).
	 * @example ```"europe1"```
	 */
	code?: string | null
	/** 
	 * The Facebook Pixed ID.
	 * @example ```"1234567890"```
	 */
	facebook_pixel_id?: string | null
	/** 
	 * The checkout URL for this market.
	 * @example ```"https://checkout.yourbrand.com/:order_id"```
	 */
	checkout_url?: string | null
	/** 
	 * The URL used to overwrite prices by an external source.
	 * @example ```"https://external_prices.yourbrand.com"```
	 */
	external_prices_url?: string | null
	/** 
	 * The URL used to validate orders by an external source.
	 * @example ```"https://external_validation.yourbrand.com"```
	 */
	external_order_validation_url?: string | null
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```"true"```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```"true"```
	 */
	_enable?: boolean | null

	merchant: MerchantRel
	price_list: PriceListRel
	inventory_model: InventoryModelRel
	subscription_model?: SubscriptionModelRel | null
	tax_calculator?: AvalaraAccountRel | TaxjarAccountRel | ManualTaxCalculatorRel | ExternalTaxCalculatorRel | null
	customer_group?: CustomerGroupRel | null
	geocoder?: GeocoderRel | null

}


interface MarketUpdate extends ResourceUpdate {
	
	/** 
	 * The market's internal name.
	 * @example ```"EU Market"```
	 */
	name?: string | null
	/** 
	 * A string that you can use to identify the market (must be unique within the environment).
	 * @example ```"europe1"```
	 */
	code?: string | null
	/** 
	 * The Facebook Pixed ID.
	 * @example ```"1234567890"```
	 */
	facebook_pixel_id?: string | null
	/** 
	 * The checkout URL for this market.
	 * @example ```"https://checkout.yourbrand.com/:order_id"```
	 */
	checkout_url?: string | null
	/** 
	 * The URL used to overwrite prices by an external source.
	 * @example ```"https://external_prices.yourbrand.com"```
	 */
	external_prices_url?: string | null
	/** 
	 * The URL used to validate orders by an external source.
	 * @example ```"https://external_validation.yourbrand.com"```
	 */
	external_order_validation_url?: string | null
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```"true"```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```"true"```
	 */
	_enable?: boolean | null

	merchant?: MerchantRel | null
	price_list?: PriceListRel | null
	inventory_model?: InventoryModelRel | null
	subscription_model?: SubscriptionModelRel | null
	tax_calculator?: AvalaraAccountRel | TaxjarAccountRel | ManualTaxCalculatorRel | ExternalTaxCalculatorRel | null
	customer_group?: CustomerGroupRel | null
	geocoder?: GeocoderRel | null

}


class Markets extends ApiResource<Market> {

	static readonly TYPE: MarketType = 'markets' as const

	async create(resource: MarketCreate, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		return this.resources.create<MarketCreate, Market>({ ...resource, type: Markets.TYPE }, params, options)
	}

	async update(resource: MarketUpdate, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		return this.resources.update<MarketUpdate, Market>({ ...resource, type: Markets.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Markets.TYPE } : id, options)
	}

	async merchant(marketId: string | Market, params?: QueryParamsRetrieve<Merchant>, options?: ResourcesConfig): Promise<Merchant> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<Merchant>({ type: 'merchants' }, `markets/${_marketId}/merchant`, params, options) as unknown as Merchant
	}

	async price_list(marketId: string | Market, params?: QueryParamsRetrieve<PriceList>, options?: ResourcesConfig): Promise<PriceList> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<PriceList>({ type: 'price_lists' }, `markets/${_marketId}/price_list`, params, options) as unknown as PriceList
	}

	async inventory_model(marketId: string | Market, params?: QueryParamsRetrieve<InventoryModel>, options?: ResourcesConfig): Promise<InventoryModel> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<InventoryModel>({ type: 'inventory_models' }, `markets/${_marketId}/inventory_model`, params, options) as unknown as InventoryModel
	}

	async subscription_model(marketId: string | Market, params?: QueryParamsRetrieve<SubscriptionModel>, options?: ResourcesConfig): Promise<SubscriptionModel> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<SubscriptionModel>({ type: 'subscription_models' }, `markets/${_marketId}/subscription_model`, params, options) as unknown as SubscriptionModel
	}

	async tax_calculator(marketId: string | Market, params?: QueryParamsRetrieve<TaxCalculator>, options?: ResourcesConfig): Promise<TaxCalculator> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<TaxCalculator>({ type: 'tax_calculators' }, `markets/${_marketId}/tax_calculator`, params, options) as unknown as TaxCalculator
	}

	async customer_group(marketId: string | Market, params?: QueryParamsRetrieve<CustomerGroup>, options?: ResourcesConfig): Promise<CustomerGroup> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<CustomerGroup>({ type: 'customer_groups' }, `markets/${_marketId}/customer_group`, params, options) as unknown as CustomerGroup
	}

	async geocoder(marketId: string | Market, params?: QueryParamsRetrieve<Geocoder>, options?: ResourcesConfig): Promise<Geocoder> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<Geocoder>({ type: 'geocoders' }, `markets/${_marketId}/geocoder`, params, options) as unknown as Geocoder
	}

	async price_list_schedulers(marketId: string | Market, params?: QueryParamsList<PriceListScheduler>, options?: ResourcesConfig): Promise<ListResponse<PriceListScheduler>> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<PriceListScheduler>({ type: 'price_list_schedulers' }, `markets/${_marketId}/price_list_schedulers`, params, options) as unknown as ListResponse<PriceListScheduler>
	}

	async attachments(marketId: string | Market, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `markets/${_marketId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(marketId: string | Market, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `markets/${_marketId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _disable(id: string | Market, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		return this.resources.update<MarketUpdate, Market>({ id: (typeof id === 'string')? id: id.id, type: Markets.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | Market, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		return this.resources.update<MarketUpdate, Market>({ id: (typeof id === 'string')? id: id.id, type: Markets.TYPE, _enable: true }, params, options)
	}


	isMarket(resource: any): resource is Market {
		return resource.type && (resource.type === Markets.TYPE)
	}


	relationship(id: string | ResourceId | null): MarketRel {
		return super.relationshipOneToOne<MarketRel>(id)
	}

	relationshipToMany(...ids: string[]): MarketRel[] {
		return super.relationshipOneToMany<MarketRel>(...ids)
	}


	type(): MarketType {
		return Markets.TYPE
	}

}


export default Markets

export type { Market, MarketCreate, MarketUpdate, MarketType }
