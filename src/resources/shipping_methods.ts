/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Market } from './markets'
import { ShippingZone } from './shipping_zones'
import { ShippingCategory } from './shipping_categories'
import { DeliveryLeadTime } from './delivery_lead_times'
import { Attachment } from './attachments'


type ShippingMethodRel = ResourceId & { type: typeof ShippingMethods.TYPE }
type MarketRel = ResourceId & { type: 'markets' }
type ShippingZoneRel = ResourceId & { type: 'shipping_zones' }
type ShippingCategoryRel = ResourceId & { type: 'shipping_categories' }


interface ShippingMethod extends Resource {
	
	name?: string
	disabled_at?: string
	currency_code?: string
	price_amount_cents?: number
	price_amount_float?: number
	formatted_price_amount?: string
	free_over_amount_cents?: number
	free_over_amount_float?: number
	formatted_free_over_amount?: string
	price_amount_for_shipment_cents?: number
	price_amount_for_shipment_float?: number
	formatted_price_amount_for_shipment?: string

	market?: Market
	shipping_zone?: ShippingZone
	shipping_category?: ShippingCategory
	delivery_lead_time_for_shipment?: DeliveryLeadTime
	attachments?: Attachment[]

}


interface ShippingMethodCreate extends ResourceCreate {
	
	name: string
	price_amount_cents: number
	free_over_amount_cents?: number

	market?: MarketRel
	shipping_zone?: ShippingZoneRel
	shipping_category?: ShippingCategoryRel

}


interface ShippingMethodUpdate extends ResourceUpdate {
	
	name?: string
	price_amount_cents?: number
	free_over_amount_cents?: number

	market?: MarketRel
	shipping_zone?: ShippingZoneRel
	shipping_category?: ShippingCategoryRel

}


class ShippingMethods extends ApiResource {

	static readonly TYPE: 'shipping_methods' = 'shipping_methods'
	// static readonly PATH = 'shipping_methods'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ShippingMethod>> {
		return this.resources.list({ type: ShippingMethods.TYPE }, params, options)
	}

	async create(resource: ShippingMethodCreate, options?: ResourcesConfig): Promise<ShippingMethod> {
		return this.resources.create(Object.assign(resource, { type: ShippingMethods.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod> {
		return this.resources.retrieve<ShippingMethod>({ type: ShippingMethods.TYPE, id }, params, options)
	}

	async update(resource: ShippingMethodUpdate, options?: ResourcesConfig): Promise<ShippingMethod> {
		return this.resources.update({ ...resource, type: ShippingMethods.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ShippingMethods.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isShippingMethod(resource: any): resource is ShippingMethod {
		return resource.type && (resource.type === ShippingMethods.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(ShippingMethods.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(ShippingMethods.TYPE)
	}
	*/

	relationship(id: string | ResourceId): ShippingMethodRel {
		return (typeof id === 'string') ? { id, type: ShippingMethods.TYPE } : {id: id.id, type: ShippingMethods.TYPE }
	}

}


export default ShippingMethods

export { ShippingMethod, ShippingMethodCreate, ShippingMethodUpdate }
