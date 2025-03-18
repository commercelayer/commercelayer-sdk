import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { ShippingZone, ShippingZoneType } from './shipping_zones'
import type { ShippingCategory, ShippingCategoryType } from './shipping_categories'
import type { StockLocation, StockLocationType } from './stock_locations'
import type { DeliveryLeadTime } from './delivery_lead_times'
import type { ShippingMethodTier, ShippingMethodTierType } from './shipping_method_tiers'
import type { ShippingWeightTier } from './shipping_weight_tiers'
import type { Attachment } from './attachments'
import type { Notification } from './notifications'
import type { Version } from './versions'


type ShippingMethodType = 'shipping_methods'
type ShippingMethodRel = ResourceRel & { type: ShippingMethodType }
type MarketRel = ResourceRel & { type: MarketType }
type ShippingZoneRel = ResourceRel & { type: ShippingZoneType }
type ShippingCategoryRel = ResourceRel & { type: ShippingCategoryType }
type StockLocationRel = ResourceRel & { type: StockLocationType }
type ShippingMethodTierRel = ResourceRel & { type: ShippingMethodTierType }


export type ShippingMethodSort = Pick<ShippingMethod, 'id' | 'name' | 'scheme' | 'currency_code' | 'price_amount_cents' | 'free_over_amount_cents' | 'disabled_at' | 'circuit_state' | 'circuit_failure_count'> & ResourceSort
// export type ShippingMethodFilter = Pick<ShippingMethod, 'id' | 'name' | 'scheme' | 'currency_code' | 'price_amount_cents' | 'free_over_amount_cents' | 'disabled_at' | 'circuit_state' | 'circuit_failure_count'> & ResourceFilter


interface ShippingMethod extends Resource {
	
	readonly type: ShippingMethodType

	/** 
	 * The shipping method's name.
	 * @example ```"Standard shipping"```
	 */
	name: string
	/** 
	 * The shipping method's scheme. One of 'flat', 'weight_tiered', or 'external'.
	 * @example ```"flat"```
	 */
	scheme?: 'flat' | 'weight_tiered' | 'external' | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * The URL used to overwrite prices by an external source.
	 * @example ```"https://external_prices.yourbrand.com"```
	 */
	external_prices_url?: string | null
	/** 
	 * The price of this shipping method, in cents.
	 * @example ```1000```
	 */
	price_amount_cents: number
	/** 
	 * The price of this shipping method, float.
	 * @example ```10```
	 */
	price_amount_float?: number | null
	/** 
	 * The price of this shipping method, formatted.
	 * @example ```"€10,00"```
	 */
	formatted_price_amount?: string | null
	/** 
	 * Apply free shipping if the order amount is over this value, in cents.
	 * @example ```9900```
	 */
	free_over_amount_cents?: number | null
	/** 
	 * Apply free shipping if the order amount is over this value, float.
	 * @example ```99```
	 */
	free_over_amount_float?: number | null
	/** 
	 * Apply free shipping if the order amount is over this value, formatted.
	 * @example ```"€99,00"```
	 */
	formatted_free_over_amount?: string | null
	/** 
	 * Send this attribute if you want to compare the free over amount with order's subtotal (excluding discounts, if any).
	 * @example ```true```
	 */
	use_subtotal?: boolean | null
	/** 
	 * The calculated price (zero or price amount) when associated to a shipment, in cents.
	 */
	price_amount_for_shipment_cents?: number | null
	/** 
	 * The calculated price (zero or price amount) when associated to a shipment, float.
	 */
	price_amount_for_shipment_float?: number | null
	/** 
	 * The calculated price (zero or price amount) when associated to a shipment, formatted.
	 * @example ```"€0,00"```
	 */
	formatted_price_amount_for_shipment?: string | null
	/** 
	 * The minimum weight for which this shipping method is available.
	 * @example ```3```
	 */
	min_weight?: number | null
	/** 
	 * The maximum weight for which this shipping method is available.
	 * @example ```300```
	 */
	max_weight?: number | null
	/** 
	 * The unit of weight. One of 'gr', 'oz', or 'lb'.
	 * @example ```"gr"```
	 */
	unit_of_weight?: 'gr' | 'oz' | 'lb' | null
	/** 
	 * The freight tax identifier code, specific for a particular tax calculator.
	 * @example ```"FR010000"```
	 */
	tax_code?: string | null
	/** 
	 * Time at which this resource was disabled.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	disabled_at?: string | null
	/** 
	 * The circuit breaker state, by default it is 'closed'. It can become 'open' once the number of consecutive failures overlaps the specified threshold, in such case no further calls to the failing callback are made.
	 * @example ```"closed"```
	 */
	circuit_state?: string | null
	/** 
	 * The number of consecutive failures recorded by the circuit breaker associated to this resource, will be reset on first successful call to callback.
	 * @example ```5```
	 */
	circuit_failure_count?: number | null

	market?: Market | null
	shipping_zone?: ShippingZone | null
	shipping_category?: ShippingCategory | null
	stock_location?: StockLocation | null
	delivery_lead_time_for_shipment?: DeliveryLeadTime | null
	shipping_method_tiers?: ShippingMethodTier[] | null
	shipping_weight_tiers?: ShippingWeightTier[] | null
	attachments?: Attachment[] | null
	notifications?: Notification[] | null
	versions?: Version[] | null

}


interface ShippingMethodCreate extends ResourceCreate {
	
	/** 
	 * The shipping method's name.
	 * @example ```"Standard shipping"```
	 */
	name: string
	/** 
	 * The shipping method's scheme. One of 'flat', 'weight_tiered', or 'external'.
	 * @example ```"flat"```
	 */
	scheme?: 'flat' | 'weight_tiered' | 'external' | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * The URL used to overwrite prices by an external source.
	 * @example ```"https://external_prices.yourbrand.com"```
	 */
	external_prices_url?: string | null
	/** 
	 * The price of this shipping method, in cents.
	 * @example ```1000```
	 */
	price_amount_cents: number
	/** 
	 * Apply free shipping if the order amount is over this value, in cents.
	 * @example ```9900```
	 */
	free_over_amount_cents?: number | null
	/** 
	 * Send this attribute if you want to compare the free over amount with order's subtotal (excluding discounts, if any).
	 * @example ```true```
	 */
	use_subtotal?: boolean | null
	/** 
	 * The minimum weight for which this shipping method is available.
	 * @example ```3```
	 */
	min_weight?: number | null
	/** 
	 * The maximum weight for which this shipping method is available.
	 * @example ```300```
	 */
	max_weight?: number | null
	/** 
	 * The unit of weight. One of 'gr', 'oz', or 'lb'.
	 * @example ```"gr"```
	 */
	unit_of_weight?: 'gr' | 'oz' | 'lb' | null
	/** 
	 * The freight tax identifier code, specific for a particular tax calculator.
	 * @example ```"FR010000"```
	 */
	tax_code?: string | null
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

	market?: MarketRel | null
	shipping_zone?: ShippingZoneRel | null
	shipping_category?: ShippingCategoryRel | null
	stock_location?: StockLocationRel | null
	shipping_method_tiers?: ShippingMethodTierRel[] | null

}


interface ShippingMethodUpdate extends ResourceUpdate {
	
	/** 
	 * The shipping method's name.
	 * @example ```"Standard shipping"```
	 */
	name?: string | null
	/** 
	 * The shipping method's scheme. One of 'flat', 'weight_tiered', or 'external'.
	 * @example ```"flat"```
	 */
	scheme?: 'flat' | 'weight_tiered' | 'external' | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * The URL used to overwrite prices by an external source.
	 * @example ```"https://external_prices.yourbrand.com"```
	 */
	external_prices_url?: string | null
	/** 
	 * The price of this shipping method, in cents.
	 * @example ```1000```
	 */
	price_amount_cents?: number | null
	/** 
	 * Apply free shipping if the order amount is over this value, in cents.
	 * @example ```9900```
	 */
	free_over_amount_cents?: number | null
	/** 
	 * Send this attribute if you want to compare the free over amount with order's subtotal (excluding discounts, if any).
	 * @example ```true```
	 */
	use_subtotal?: boolean | null
	/** 
	 * The minimum weight for which this shipping method is available.
	 * @example ```3```
	 */
	min_weight?: number | null
	/** 
	 * The maximum weight for which this shipping method is available.
	 * @example ```300```
	 */
	max_weight?: number | null
	/** 
	 * The unit of weight. One of 'gr', 'oz', or 'lb'.
	 * @example ```"gr"```
	 */
	unit_of_weight?: 'gr' | 'oz' | 'lb' | null
	/** 
	 * The freight tax identifier code, specific for a particular tax calculator.
	 * @example ```"FR010000"```
	 */
	tax_code?: string | null
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
	/** 
	 * Send this attribute if you want to reset the circuit breaker associated to this resource to 'closed' state and zero failures count. Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_reset_circuit?: boolean | null

	market?: MarketRel | null
	shipping_zone?: ShippingZoneRel | null
	shipping_category?: ShippingCategoryRel | null
	stock_location?: StockLocationRel | null
	shipping_method_tiers?: ShippingMethodTierRel[] | null

}


class ShippingMethods extends ApiResource<ShippingMethod> {

	static readonly TYPE: ShippingMethodType = 'shipping_methods' as const

	async create(resource: ShippingMethodCreate, params?: QueryParamsRetrieve<ShippingMethod>, options?: ResourcesConfig): Promise<ShippingMethod> {
		return this.resources.create<ShippingMethodCreate, ShippingMethod>({ ...resource, type: ShippingMethods.TYPE }, params, options)
	}

	async update(resource: ShippingMethodUpdate, params?: QueryParamsRetrieve<ShippingMethod>, options?: ResourcesConfig): Promise<ShippingMethod> {
		return this.resources.update<ShippingMethodUpdate, ShippingMethod>({ ...resource, type: ShippingMethods.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ShippingMethods.TYPE } : id, options)
	}

	async market(shippingMethodId: string | ShippingMethod, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _shippingMethodId = (shippingMethodId as ShippingMethod).id || shippingMethodId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `shipping_methods/${_shippingMethodId}/market`, params, options) as unknown as Market
	}

	async shipping_zone(shippingMethodId: string | ShippingMethod, params?: QueryParamsRetrieve<ShippingZone>, options?: ResourcesConfig): Promise<ShippingZone> {
		const _shippingMethodId = (shippingMethodId as ShippingMethod).id || shippingMethodId as string
		return this.resources.fetch<ShippingZone>({ type: 'shipping_zones' }, `shipping_methods/${_shippingMethodId}/shipping_zone`, params, options) as unknown as ShippingZone
	}

	async shipping_category(shippingMethodId: string | ShippingMethod, params?: QueryParamsRetrieve<ShippingCategory>, options?: ResourcesConfig): Promise<ShippingCategory> {
		const _shippingMethodId = (shippingMethodId as ShippingMethod).id || shippingMethodId as string
		return this.resources.fetch<ShippingCategory>({ type: 'shipping_categories' }, `shipping_methods/${_shippingMethodId}/shipping_category`, params, options) as unknown as ShippingCategory
	}

	async stock_location(shippingMethodId: string | ShippingMethod, params?: QueryParamsRetrieve<StockLocation>, options?: ResourcesConfig): Promise<StockLocation> {
		const _shippingMethodId = (shippingMethodId as ShippingMethod).id || shippingMethodId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `shipping_methods/${_shippingMethodId}/stock_location`, params, options) as unknown as StockLocation
	}

	async delivery_lead_time_for_shipment(shippingMethodId: string | ShippingMethod, params?: QueryParamsRetrieve<DeliveryLeadTime>, options?: ResourcesConfig): Promise<DeliveryLeadTime> {
		const _shippingMethodId = (shippingMethodId as ShippingMethod).id || shippingMethodId as string
		return this.resources.fetch<DeliveryLeadTime>({ type: 'delivery_lead_times' }, `shipping_methods/${_shippingMethodId}/delivery_lead_time_for_shipment`, params, options) as unknown as DeliveryLeadTime
	}

	async shipping_method_tiers(shippingMethodId: string | ShippingMethod, params?: QueryParamsList<ShippingMethodTier>, options?: ResourcesConfig): Promise<ListResponse<ShippingMethodTier>> {
		const _shippingMethodId = (shippingMethodId as ShippingMethod).id || shippingMethodId as string
		return this.resources.fetch<ShippingMethodTier>({ type: 'shipping_method_tiers' }, `shipping_methods/${_shippingMethodId}/shipping_method_tiers`, params, options) as unknown as ListResponse<ShippingMethodTier>
	}

	async shipping_weight_tiers(shippingMethodId: string | ShippingMethod, params?: QueryParamsList<ShippingWeightTier>, options?: ResourcesConfig): Promise<ListResponse<ShippingWeightTier>> {
		const _shippingMethodId = (shippingMethodId as ShippingMethod).id || shippingMethodId as string
		return this.resources.fetch<ShippingWeightTier>({ type: 'shipping_weight_tiers' }, `shipping_methods/${_shippingMethodId}/shipping_weight_tiers`, params, options) as unknown as ListResponse<ShippingWeightTier>
	}

	async attachments(shippingMethodId: string | ShippingMethod, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _shippingMethodId = (shippingMethodId as ShippingMethod).id || shippingMethodId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `shipping_methods/${_shippingMethodId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async notifications(shippingMethodId: string | ShippingMethod, params?: QueryParamsList<Notification>, options?: ResourcesConfig): Promise<ListResponse<Notification>> {
		const _shippingMethodId = (shippingMethodId as ShippingMethod).id || shippingMethodId as string
		return this.resources.fetch<Notification>({ type: 'notifications' }, `shipping_methods/${_shippingMethodId}/notifications`, params, options) as unknown as ListResponse<Notification>
	}

	async versions(shippingMethodId: string | ShippingMethod, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _shippingMethodId = (shippingMethodId as ShippingMethod).id || shippingMethodId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `shipping_methods/${_shippingMethodId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _disable(id: string | ShippingMethod, params?: QueryParamsRetrieve<ShippingMethod>, options?: ResourcesConfig): Promise<ShippingMethod> {
		return this.resources.update<ShippingMethodUpdate, ShippingMethod>({ id: (typeof id === 'string')? id: id.id, type: ShippingMethods.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | ShippingMethod, params?: QueryParamsRetrieve<ShippingMethod>, options?: ResourcesConfig): Promise<ShippingMethod> {
		return this.resources.update<ShippingMethodUpdate, ShippingMethod>({ id: (typeof id === 'string')? id: id.id, type: ShippingMethods.TYPE, _enable: true }, params, options)
	}

	async _reset_circuit(id: string | ShippingMethod, params?: QueryParamsRetrieve<ShippingMethod>, options?: ResourcesConfig): Promise<ShippingMethod> {
		return this.resources.update<ShippingMethodUpdate, ShippingMethod>({ id: (typeof id === 'string')? id: id.id, type: ShippingMethods.TYPE, _reset_circuit: true }, params, options)
	}


	isShippingMethod(resource: any): resource is ShippingMethod {
		return resource.type && (resource.type === ShippingMethods.TYPE)
	}


	relationship(id: string | ResourceId | null): ShippingMethodRel {
		return super.relationshipOneToOne<ShippingMethodRel>(id)
	}

	relationshipToMany(...ids: string[]): ShippingMethodRel[] {
		return super.relationshipOneToMany<ShippingMethodRel>(...ids)
	}


	type(): ShippingMethodType {
		return ShippingMethods.TYPE
	}

}


const instance = new ShippingMethods()
export default instance

export type { ShippingMethod, ShippingMethodCreate, ShippingMethodUpdate, ShippingMethodType }
