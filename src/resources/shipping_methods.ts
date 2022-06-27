import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Market } from './markets'
import { ShippingZone } from './shipping_zones'
import { ShippingCategory } from './shipping_categories'
import { StockLocation } from './stock_locations'
import { DeliveryLeadTime } from './delivery_lead_times'
import { ShippingMethodTier } from './shipping_method_tiers'
import { ShippingWeightTier } from './shipping_weight_tiers'
import { Attachment } from './attachments'


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

	static readonly TYPE: 'shipping_methods' = 'shipping_methods'
	// static readonly PATH = 'shipping_methods'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ShippingMethod>> {
		return this.resources.list({ type: ShippingMethods.TYPE }, params, options)
	}

	async create(resource: ShippingMethodCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod> {
		return this.resources.create({ ...resource, type: ShippingMethods.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod> {
		return this.resources.retrieve<ShippingMethod>({ type: ShippingMethods.TYPE, id }, params, options)
	}

	async update(resource: ShippingMethodUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod> {
		return this.resources.update({ ...resource, type: ShippingMethods.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ShippingMethods.TYPE, id }, options)
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
