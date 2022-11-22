import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Market } from './markets'
import type { ShippingZone } from './shipping_zones'
import type { ShippingCategory } from './shipping_categories'
import type { StockLocation } from './stock_locations'
import type { DeliveryLeadTime } from './delivery_lead_times'
import type { ShippingMethodTier } from './shipping_method_tiers'
import type { ShippingWeightTier } from './shipping_weight_tiers'
import type { Attachment } from './attachments'


type ShippingMethodRel = ResourceRel & { type: typeof ShippingMethods.TYPE }
type MarketRel = ResourceRel & { type: 'markets' }
type ShippingZoneRel = ResourceRel & { type: 'shipping_zones' }
type ShippingCategoryRel = ResourceRel & { type: 'shipping_categories' }
type StockLocationRel = ResourceRel & { type: 'stock_locations' }
type ShippingMethodTierRel = ResourceRel & { type: 'shipping_method_tiers' }


interface ShippingMethod extends Resource {
	
	name?: string
	scheme?: string
	currency_code?: string
	disabled_at?: string
	price_amount_cents?: number
	price_amount_float?: number
	formatted_price_amount?: string
	free_over_amount_cents?: number
	free_over_amount_float?: number
	formatted_free_over_amount?: string
	price_amount_for_shipment_cents?: number
	price_amount_for_shipment_float?: number
	formatted_price_amount_for_shipment?: string
	min_weight?: number
	max_weight?: number
	unit_of_weight?: string

	market?: Market
	shipping_zone?: ShippingZone
	shipping_category?: ShippingCategory
	stock_location?: StockLocation
	delivery_lead_time_for_shipment?: DeliveryLeadTime
	shipping_method_tiers?: ShippingMethodTier[]
	shipping_weight_tiers?: ShippingWeightTier[]
	attachments?: Attachment[]

}


interface ShippingMethodCreate extends ResourceCreate {
	
	name: string
	scheme?: string
	currency_code?: string
	price_amount_cents: number
	free_over_amount_cents?: number
	min_weight?: number
	max_weight?: number
	unit_of_weight?: string

	market?: MarketRel
	shipping_zone?: ShippingZoneRel
	shipping_category?: ShippingCategoryRel
	stock_location?: StockLocationRel
	shipping_method_tiers?: ShippingMethodTierRel[]

}


interface ShippingMethodUpdate extends ResourceUpdate {
	
	name?: string
	scheme?: string
	currency_code?: string
	_disable?: boolean
	_enable?: boolean
	price_amount_cents?: number
	free_over_amount_cents?: number
	min_weight?: number
	max_weight?: number
	unit_of_weight?: string

	market?: MarketRel
	shipping_zone?: ShippingZoneRel
	shipping_category?: ShippingCategoryRel
	stock_location?: StockLocationRel
	shipping_method_tiers?: ShippingMethodTierRel[]

}


class ShippingMethods extends ApiResource {

	static readonly TYPE: 'shipping_methods' = 'shipping_methods' as const
	// static readonly PATH = 'shipping_methods'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ShippingMethod>> {
		return this.resources.list<ShippingMethod>({ type: ShippingMethods.TYPE }, params, options)
	}

	async create(resource: ShippingMethodCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod> {
		return this.resources.create<ShippingMethodCreate, ShippingMethod>({ ...resource, type: ShippingMethods.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod> {
		return this.resources.retrieve<ShippingMethod>({ type: ShippingMethods.TYPE, id }, params, options)
	}

	async update(resource: ShippingMethodUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod> {
		return this.resources.update<ShippingMethodUpdate, ShippingMethod>({ ...resource, type: ShippingMethods.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ShippingMethods.TYPE, id }, options)
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


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isShippingMethod(resource: any): resource is ShippingMethod {
		return resource.type && (resource.type === ShippingMethods.TYPE)
	}


	relationship(id: string | ResourceId | null): ShippingMethodRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ShippingMethods.TYPE } : { id: id.id, type: ShippingMethods.TYPE }
	}


	type(): string {
		return ShippingMethods.TYPE
	}

}


export default ShippingMethods

export { ShippingMethod, ShippingMethodCreate, ShippingMethodUpdate }
