import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Merchant, MerchantType } from './merchants'
import type { PriceList, PriceListType } from './price_lists'
import type { InventoryModel, InventoryModelType } from './inventory_models'
import type { SubscriptionModel, SubscriptionModelType } from './subscription_models'
import type { DiscountEngine, DiscountEngineType } from './discount_engines'
import type { TaxCalculator } from './tax_calculators'
import type { CustomerGroup, CustomerGroupType } from './customer_groups'
import type { Geocoder, GeocoderType } from './geocoders'
import type { ShippingMethod, ShippingMethodType } from './shipping_methods'
import type { PaymentMethod, PaymentMethodType } from './payment_methods'
import type { Store } from './stores'
import type { PriceListScheduler } from './price_list_schedulers'
import type { Attachment } from './attachments'
import type { Version } from './versions'
import type { AvalaraAccount, AvalaraAccountType } from './avalara_accounts'
import type { StripeTaxAccount, StripeTaxAccountType } from './stripe_tax_accounts'
import type { VertexAccount, VertexAccountType } from './vertex_accounts'
import type { TaxjarAccount, TaxjarAccountType } from './taxjar_accounts'
import type { ManualTaxCalculator, ManualTaxCalculatorType } from './manual_tax_calculators'
import type { ExternalTaxCalculator, ExternalTaxCalculatorType } from './external_tax_calculators'


type MarketType = 'markets'
type MarketRel = ResourceRel & { type: MarketType }
type MerchantRel = ResourceRel & { type: MerchantType }
type PriceListRel = ResourceRel & { type: PriceListType }
type InventoryModelRel = ResourceRel & { type: InventoryModelType }
type SubscriptionModelRel = ResourceRel & { type: SubscriptionModelType }
type DiscountEngineRel = ResourceRel & { type: DiscountEngineType }
type AvalaraAccountRel = ResourceRel & { type: AvalaraAccountType }
type StripeTaxAccountRel = ResourceRel & { type: StripeTaxAccountType }
type VertexAccountRel = ResourceRel & { type: VertexAccountType }
type TaxjarAccountRel = ResourceRel & { type: TaxjarAccountType }
type ManualTaxCalculatorRel = ResourceRel & { type: ManualTaxCalculatorType }
type ExternalTaxCalculatorRel = ResourceRel & { type: ExternalTaxCalculatorType }
type CustomerGroupRel = ResourceRel & { type: CustomerGroupType }
type GeocoderRel = ResourceRel & { type: GeocoderType }
type ShippingMethodRel = ResourceRel & { type: ShippingMethodType }
type PaymentMethodRel = ResourceRel & { type: PaymentMethodType }


export type MarketSort = Pick<Market, 'id' | 'name' | 'code' | 'disabled_at'> & ResourceSort
// export type MarketFilter = Pick<Market, 'id' | 'name' | 'code' | 'disabled_at'> & ResourceFilter


interface Market extends Resource {
	
	readonly type: MarketType

	/** 
	 * Unique identifier for the market (numeric).
	 * @example ```1234```
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
	 * @example ```true```
	 */
	private?: boolean | null
	/** 
	 * When specified indicates the maximum number of shipping line items with cost that will be added to an order.
	 * @example ```3```
	 */
	shipping_cost_cutoff?: number | null
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
	base_price_list?: PriceList | null
	inventory_model?: InventoryModel | null
	subscription_model?: SubscriptionModel | null
	discount_engine?: DiscountEngine | null
	tax_calculator?: AvalaraAccount | StripeTaxAccount | VertexAccount | TaxjarAccount | ManualTaxCalculator | ExternalTaxCalculator | null
	customer_group?: CustomerGroup | null
	geocoder?: Geocoder | null
	default_shipping_method?: ShippingMethod | null
	default_payment_method?: PaymentMethod | null
	stores?: Store[] | null
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
	 * When specified indicates the maximum number of shipping line items with cost that will be added to an order.
	 * @example ```3```
	 */
	shipping_cost_cutoff?: number | null
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```true```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```true```
	 */
	_enable?: boolean | null

	merchant: MerchantRel
	price_list: PriceListRel
	inventory_model: InventoryModelRel
	subscription_model?: SubscriptionModelRel | null
	discount_engine?: DiscountEngineRel | null
	tax_calculator?: AvalaraAccountRel | StripeTaxAccountRel | VertexAccountRel | TaxjarAccountRel | ManualTaxCalculatorRel | ExternalTaxCalculatorRel | null
	customer_group?: CustomerGroupRel | null
	geocoder?: GeocoderRel | null
	default_shipping_method?: ShippingMethodRel | null
	default_payment_method?: PaymentMethodRel | null

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
	 * When specified indicates the maximum number of shipping line items with cost that will be added to an order.
	 * @example ```3```
	 */
	shipping_cost_cutoff?: number | null
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```true```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```true```
	 */
	_enable?: boolean | null

	merchant?: MerchantRel | null
	price_list?: PriceListRel | null
	inventory_model?: InventoryModelRel | null
	subscription_model?: SubscriptionModelRel | null
	discount_engine?: DiscountEngineRel | null
	tax_calculator?: AvalaraAccountRel | StripeTaxAccountRel | VertexAccountRel | TaxjarAccountRel | ManualTaxCalculatorRel | ExternalTaxCalculatorRel | null
	customer_group?: CustomerGroupRel | null
	geocoder?: GeocoderRel | null
	default_shipping_method?: ShippingMethodRel | null
	default_payment_method?: PaymentMethodRel | null

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

	async base_price_list(marketId: string | Market, params?: QueryParamsRetrieve<PriceList>, options?: ResourcesConfig): Promise<PriceList> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<PriceList>({ type: 'price_lists' }, `markets/${_marketId}/base_price_list`, params, options) as unknown as PriceList
	}

	async inventory_model(marketId: string | Market, params?: QueryParamsRetrieve<InventoryModel>, options?: ResourcesConfig): Promise<InventoryModel> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<InventoryModel>({ type: 'inventory_models' }, `markets/${_marketId}/inventory_model`, params, options) as unknown as InventoryModel
	}

	async subscription_model(marketId: string | Market, params?: QueryParamsRetrieve<SubscriptionModel>, options?: ResourcesConfig): Promise<SubscriptionModel> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<SubscriptionModel>({ type: 'subscription_models' }, `markets/${_marketId}/subscription_model`, params, options) as unknown as SubscriptionModel
	}

	async discount_engine(marketId: string | Market, params?: QueryParamsRetrieve<DiscountEngine>, options?: ResourcesConfig): Promise<DiscountEngine> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<DiscountEngine>({ type: 'discount_engines' }, `markets/${_marketId}/discount_engine`, params, options) as unknown as DiscountEngine
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

	async default_shipping_method(marketId: string | Market, params?: QueryParamsRetrieve<ShippingMethod>, options?: ResourcesConfig): Promise<ShippingMethod> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<ShippingMethod>({ type: 'shipping_methods' }, `markets/${_marketId}/default_shipping_method`, params, options) as unknown as ShippingMethod
	}

	async default_payment_method(marketId: string | Market, params?: QueryParamsRetrieve<PaymentMethod>, options?: ResourcesConfig): Promise<PaymentMethod> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `markets/${_marketId}/default_payment_method`, params, options) as unknown as PaymentMethod
	}

	async stores(marketId: string | Market, params?: QueryParamsList<Store>, options?: ResourcesConfig): Promise<ListResponse<Store>> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<Store>({ type: 'stores' }, `markets/${_marketId}/stores`, params, options) as unknown as ListResponse<Store>
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


const instance = new Markets()
export default instance

export type { Markets, Market, MarketCreate, MarketUpdate, MarketType }
