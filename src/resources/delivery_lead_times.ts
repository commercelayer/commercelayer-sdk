import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { StockLocation, StockLocationType } from './stock_locations'
import type { ShippingMethod, ShippingMethodType } from './shipping_methods'
import type { Attachment } from './attachments'


type DeliveryLeadTimeType = 'delivery_lead_times'
type DeliveryLeadTimeRel = ResourceRel & { type: DeliveryLeadTimeType }
type StockLocationRel = ResourceRel & { type: StockLocationType }
type ShippingMethodRel = ResourceRel & { type: ShippingMethodType }


interface DeliveryLeadTime extends Resource {
	
	readonly type: DeliveryLeadTimeType

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

	stock_location: StockLocationRel
	shipping_method: ShippingMethodRel

}


interface DeliveryLeadTimeUpdate extends ResourceUpdate {
	
	min_hours?: number
	max_hours?: number

	stock_location?: StockLocationRel
	shipping_method?: ShippingMethodRel

}


class DeliveryLeadTimes extends ApiResource<DeliveryLeadTime> {

	static readonly TYPE: DeliveryLeadTimeType = 'delivery_lead_times' as const
	// static readonly PATH = 'delivery_lead_times'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<DeliveryLeadTime>> {
		return this.resources.list<DeliveryLeadTime>({ type: DeliveryLeadTimes.TYPE }, params, options)
	}

	async create(resource: DeliveryLeadTimeCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<DeliveryLeadTime> {
		return this.resources.create<DeliveryLeadTimeCreate, DeliveryLeadTime>({ ...resource, type: DeliveryLeadTimes.TYPE }, params, options)
	}

	async update(resource: DeliveryLeadTimeUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<DeliveryLeadTime> {
		return this.resources.update<DeliveryLeadTimeUpdate, DeliveryLeadTime>({ ...resource, type: DeliveryLeadTimes.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: DeliveryLeadTimes.TYPE } : id, options)
	}

	async stock_location(deliveryLeadTimeId: string | DeliveryLeadTime, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		const _deliveryLeadTimeId = (deliveryLeadTimeId as DeliveryLeadTime).id || deliveryLeadTimeId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `delivery_lead_times/${_deliveryLeadTimeId}/stock_location`, params, options) as unknown as StockLocation
	}

	async shipping_method(deliveryLeadTimeId: string | DeliveryLeadTime, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingMethod> {
		const _deliveryLeadTimeId = (deliveryLeadTimeId as DeliveryLeadTime).id || deliveryLeadTimeId as string
		return this.resources.fetch<ShippingMethod>({ type: 'shipping_methods' }, `delivery_lead_times/${_deliveryLeadTimeId}/shipping_method`, params, options) as unknown as ShippingMethod
	}

	async attachments(deliveryLeadTimeId: string | DeliveryLeadTime, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _deliveryLeadTimeId = (deliveryLeadTimeId as DeliveryLeadTime).id || deliveryLeadTimeId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `delivery_lead_times/${_deliveryLeadTimeId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isDeliveryLeadTime(resource: any): resource is DeliveryLeadTime {
		return resource.type && (resource.type === DeliveryLeadTimes.TYPE)
	}


	relationship(id: string | ResourceId | null): DeliveryLeadTimeRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: DeliveryLeadTimes.TYPE } : { id: id.id, type: DeliveryLeadTimes.TYPE }
	}


	type(): DeliveryLeadTimeType {
		return DeliveryLeadTimes.TYPE
	}

}


export default DeliveryLeadTimes

export type { DeliveryLeadTime, DeliveryLeadTimeCreate, DeliveryLeadTimeUpdate, DeliveryLeadTimeType }
