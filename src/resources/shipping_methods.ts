import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { ShippingZone, ShippingZoneType } from './shipping_zones'
import type { ShippingCategory, ShippingCategoryType } from './shipping_categories'
import type { StockLocation, StockLocationType } from './stock_locations'
import type { DeliveryLeadTime } from './delivery_lead_times'
import type { ShippingMethodTier, ShippingMethodTierType } from './shipping_method_tiers'
import type { ShippingWeightTier } from './shipping_weight_tiers'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type ShippingMethodType = 'shipping_methods'
type ShippingMethodRel = ResourceRel & { type: ShippingMethodType }
type MarketRel = ResourceRel & { type: MarketType }
type ShippingZoneRel = ResourceRel & { type: ShippingZoneType }
type ShippingCategoryRel = ResourceRel & { type: ShippingCategoryType }
type StockLocationRel = ResourceRel & { type: StockLocationType }
type ShippingMethodTierRel = ResourceRel & { type: ShippingMethodTierType }


interface ShippingMethod extends Resource {
	
	readonly type: ShippingMethodType

	name: string
	scheme?: string | null
	currency_code?: string | null
	external_prices_url?: string | null
	price_amount_cents: number
	price_amount_float?: number | null
	formatted_price_amount?: string | null
	free_over_amount_cents?: number | null
	free_over_amount_float?: number | null
	formatted_free_over_amount?: string | null
	use_subtotal?: boolean | null
	price_amount_for_shipment_cents?: number | null
	price_amount_for_shipment_float?: number | null
	formatted_price_amount_for_shipment?: string | null
	min_weight?: number | null
	max_weight?: number | null
	unit_of_weight?: string | null
	disabled_at?: string | null
	circuit_state?: string | null
	circuit_failure_count?: number | null

	market?: Market | null
	shipping_zone?: ShippingZone | null
	shipping_category?: ShippingCategory | null
	stock_location?: StockLocation | null
	delivery_lead_time_for_shipment?: DeliveryLeadTime | null
	shipping_method_tiers?: ShippingMethodTier[] | null
	shipping_weight_tiers?: ShippingWeightTier[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface ShippingMethodCreate extends ResourceCreate {
	
	name: string
	scheme?: string | null
	currency_code?: string | null
	external_prices_url?: string | null
	price_amount_cents: number
	free_over_amount_cents?: number | null
	use_subtotal?: boolean | null
	min_weight?: number | null
	max_weight?: number | null
	unit_of_weight?: string | null
	_disable?: boolean | null
	_enable?: boolean | null

	market?: MarketRel | null
	shipping_zone?: ShippingZoneRel | null
	shipping_category?: ShippingCategoryRel | null
	stock_location?: StockLocationRel | null
	shipping_method_tiers?: ShippingMethodTierRel[] | null

}


interface ShippingMethodUpdate extends ResourceUpdate {
	
	name?: string | null
	scheme?: string | null
	currency_code?: string | null
	external_prices_url?: string | null
	price_amount_cents?: number | null
	free_over_amount_cents?: number | null
	use_subtotal?: boolean | null
	min_weight?: number | null
	max_weight?: number | null
	unit_of_weight?: string | null
	_disable?: boolean | null
	_enable?: boolean | null
	_reset_circuit?: boolean | null

	market?: MarketRel | null
	shipping_zone?: ShippingZoneRel | null
	shipping_category?: ShippingCategoryRel | null
	stock_location?: StockLocationRel | null
	shipping_method_tiers?: ShippingMethodTierRel[] | null

}


class ShippingMethods extends ApiResource<ShippingMethod> {

	static readonly TYPE: ShippingMethodType = 'shipping_methods' as const

	async create(resource: ShippingMethodCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod> {
		return this.resources.create<ShippingMethodCreate, ShippingMethod>({ ...resource, type: ShippingMethods.TYPE }, params, options)
	}

	async update(resource: ShippingMethodUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod> {
		return this.resources.update<ShippingMethodUpdate, ShippingMethod>({ ...resource, type: ShippingMethods.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ShippingMethods.TYPE } : id, options)
	}

	async market(shippingMethodId: string | ShippingMethod, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _shippingMethodId = (shippingMethodId as ShippingMethod).id || shippingMethodId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `shipping_methods/${_shippingMethodId}/market`, params, options) as unknown as Market
	}

	async shipping_zone(shippingMethodId: string | ShippingMethod, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingZone> {
		const _shippingMethodId = (shippingMethodId as ShippingMethod).id || shippingMethodId as string
		return this.resources.fetch<ShippingZone>({ type: 'shipping_zones' }, `shipping_methods/${_shippingMethodId}/shipping_zone`, params, options) as unknown as ShippingZone
	}

	async shipping_category(shippingMethodId: string | ShippingMethod, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingCategory> {
		const _shippingMethodId = (shippingMethodId as ShippingMethod).id || shippingMethodId as string
		return this.resources.fetch<ShippingCategory>({ type: 'shipping_categories' }, `shipping_methods/${_shippingMethodId}/shipping_category`, params, options) as unknown as ShippingCategory
	}

	async stock_location(shippingMethodId: string | ShippingMethod, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		const _shippingMethodId = (shippingMethodId as ShippingMethod).id || shippingMethodId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `shipping_methods/${_shippingMethodId}/stock_location`, params, options) as unknown as StockLocation
	}

	async delivery_lead_time_for_shipment(shippingMethodId: string | ShippingMethod, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<DeliveryLeadTime> {
		const _shippingMethodId = (shippingMethodId as ShippingMethod).id || shippingMethodId as string
		return this.resources.fetch<DeliveryLeadTime>({ type: 'delivery_lead_times' }, `shipping_methods/${_shippingMethodId}/delivery_lead_time_for_shipment`, params, options) as unknown as DeliveryLeadTime
	}

	async shipping_method_tiers(shippingMethodId: string | ShippingMethod, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ShippingMethodTier>> {
		const _shippingMethodId = (shippingMethodId as ShippingMethod).id || shippingMethodId as string
		return this.resources.fetch<ShippingMethodTier>({ type: 'shipping_method_tiers' }, `shipping_methods/${_shippingMethodId}/shipping_method_tiers`, params, options) as unknown as ListResponse<ShippingMethodTier>
	}

	async shipping_weight_tiers(shippingMethodId: string | ShippingMethod, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ShippingWeightTier>> {
		const _shippingMethodId = (shippingMethodId as ShippingMethod).id || shippingMethodId as string
		return this.resources.fetch<ShippingWeightTier>({ type: 'shipping_weight_tiers' }, `shipping_methods/${_shippingMethodId}/shipping_weight_tiers`, params, options) as unknown as ListResponse<ShippingWeightTier>
	}

	async attachments(shippingMethodId: string | ShippingMethod, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _shippingMethodId = (shippingMethodId as ShippingMethod).id || shippingMethodId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `shipping_methods/${_shippingMethodId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(shippingMethodId: string | ShippingMethod, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _shippingMethodId = (shippingMethodId as ShippingMethod).id || shippingMethodId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `shipping_methods/${_shippingMethodId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _disable(id: string | ShippingMethod, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod> {
		return this.resources.update<ShippingMethodUpdate, ShippingMethod>({ id: (typeof id === 'string')? id: id.id, type: ShippingMethods.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | ShippingMethod, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod> {
		return this.resources.update<ShippingMethodUpdate, ShippingMethod>({ id: (typeof id === 'string')? id: id.id, type: ShippingMethods.TYPE, _enable: true }, params, options)
	}

	async _reset_circuit(id: string | ShippingMethod, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod> {
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


export default ShippingMethods

export type { ShippingMethod, ShippingMethodCreate, ShippingMethodUpdate, ShippingMethodType }
