/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 22-07-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { StockLocation } from './stock_locations'
import { ShippingMethod } from './shipping_methods'
import { Attachment } from './attachments'


type StockLocationRel = ResourceId & { type: 'stock_locations' }
type ShippingMethodRel = ResourceId & { type: 'shipping_methods' }


interface DeliveryLeadTime extends Resource {
	
	min_hours?: number
	max_hours?: number
	min_days?: number
	max_days?: number

	stock_location?: StockLocation
	shipping_method?: ShippingMethod
	attachments?: Attachment[]

}


interface DeliveryLeadTimeCreate extends ResourceCreate {
	
	min_hours: number
	max_hours: number

	stock_location?: StockLocationRel
	shipping_method?: ShippingMethodRel

}


interface DeliveryLeadTimeUpdate extends ResourceUpdate {
	
	min_hours?: number
	max_hours?: number

	stock_location?: StockLocationRel
	shipping_method?: ShippingMethodRel

}


class DeliveryLeadTimes extends ApiResource {

	static readonly TYPE: 'delivery_lead_times' = 'delivery_lead_times'
	// static readonly PATH = 'delivery_lead_times'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<DeliveryLeadTime[]> {
		return this.resources.list({ type: DeliveryLeadTimes.TYPE }, params, options)
	}

	async create(resource: DeliveryLeadTimeCreate, options?: ResourcesConfig): Promise<DeliveryLeadTime> {
		return this.resources.create(Object.assign(resource, { type: DeliveryLeadTimes.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<DeliveryLeadTime> {
		return this.resources.retrieve<DeliveryLeadTime>({ type: DeliveryLeadTimes.TYPE, id }, params, options)
	}

	async update(resource: DeliveryLeadTimeUpdate, options?: ResourcesConfig): Promise<DeliveryLeadTime> {
		return this.resources.update({ ...resource, type: DeliveryLeadTimes.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: DeliveryLeadTimes.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isDeliveryLeadTime(resource: any): resource is DeliveryLeadTime {
		return resource.type && (resource.type === DeliveryLeadTimes.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(DeliveryLeadTimes.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(DeliveryLeadTimes.TYPE)
	}
	*/

	relationship(id: string): ResourceId & { type: typeof DeliveryLeadTimes.TYPE } {
		return { id, type: DeliveryLeadTimes.TYPE }
	}

}


export default DeliveryLeadTimes

export { DeliveryLeadTime, DeliveryLeadTimeCreate, DeliveryLeadTimeUpdate }
