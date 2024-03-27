import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, /* ResourceFilterable */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { StockLocation, StockLocationType } from './stock_locations'
import type { ShippingMethod, ShippingMethodType } from './shipping_methods'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type DeliveryLeadTimeType = 'delivery_lead_times'
type DeliveryLeadTimeRel = ResourceRel & { type: DeliveryLeadTimeType }
type StockLocationRel = ResourceRel & { type: StockLocationType }
type ShippingMethodRel = ResourceRel & { type: ShippingMethodType }


export type DeliveryLeadTimeSortable = Pick<DeliveryLeadTime, 'id' | 'min_hours' | 'max_hours' | 'min_days'> & ResourceSortable
// export type DeliveryLeadTimeFilterable = Pick<DeliveryLeadTime, 'id' | 'min_hours' | 'max_hours' | 'min_days' | 'max_days'> & ResourceFilterable


interface DeliveryLeadTime extends Resource {
	
	readonly type: DeliveryLeadTimeType

	min_hours: number
	max_hours: number
	min_days?: number | null
	max_days?: number | null

	stock_location?: StockLocation | null
	shipping_method?: ShippingMethod | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface DeliveryLeadTimeCreate extends ResourceCreate {
	
	min_hours: number
	max_hours: number

	stock_location: StockLocationRel
	shipping_method: ShippingMethodRel

}


interface DeliveryLeadTimeUpdate extends ResourceUpdate {
	
	min_hours?: number | null
	max_hours?: number | null

	stock_location?: StockLocationRel | null
	shipping_method?: ShippingMethodRel | null

}


class DeliveryLeadTimes extends ApiResource<DeliveryLeadTime> {

	static readonly TYPE: DeliveryLeadTimeType = 'delivery_lead_times' as const

	async create(resource: DeliveryLeadTimeCreate, params?: QueryParamsRetrieve<DeliveryLeadTime>, options?: ResourcesConfig): Promise<DeliveryLeadTime> {
		return this.resources.create<DeliveryLeadTimeCreate, DeliveryLeadTime>({ ...resource, type: DeliveryLeadTimes.TYPE }, params, options)
	}

	async update(resource: DeliveryLeadTimeUpdate, params?: QueryParamsRetrieve<DeliveryLeadTime>, options?: ResourcesConfig): Promise<DeliveryLeadTime> {
		return this.resources.update<DeliveryLeadTimeUpdate, DeliveryLeadTime>({ ...resource, type: DeliveryLeadTimes.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: DeliveryLeadTimes.TYPE } : id, options)
	}

	async stock_location(deliveryLeadTimeId: string | DeliveryLeadTime, params?: QueryParamsRetrieve<StockLocation>, options?: ResourcesConfig): Promise<StockLocation> {
		const _deliveryLeadTimeId = (deliveryLeadTimeId as DeliveryLeadTime).id || deliveryLeadTimeId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `delivery_lead_times/${_deliveryLeadTimeId}/stock_location`, params, options) as unknown as StockLocation
	}

	async shipping_method(deliveryLeadTimeId: string | DeliveryLeadTime, params?: QueryParamsRetrieve<ShippingMethod>, options?: ResourcesConfig): Promise<ShippingMethod> {
		const _deliveryLeadTimeId = (deliveryLeadTimeId as DeliveryLeadTime).id || deliveryLeadTimeId as string
		return this.resources.fetch<ShippingMethod>({ type: 'shipping_methods' }, `delivery_lead_times/${_deliveryLeadTimeId}/shipping_method`, params, options) as unknown as ShippingMethod
	}

	async attachments(deliveryLeadTimeId: string | DeliveryLeadTime, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _deliveryLeadTimeId = (deliveryLeadTimeId as DeliveryLeadTime).id || deliveryLeadTimeId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `delivery_lead_times/${_deliveryLeadTimeId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(deliveryLeadTimeId: string | DeliveryLeadTime, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _deliveryLeadTimeId = (deliveryLeadTimeId as DeliveryLeadTime).id || deliveryLeadTimeId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `delivery_lead_times/${_deliveryLeadTimeId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isDeliveryLeadTime(resource: any): resource is DeliveryLeadTime {
		return resource.type && (resource.type === DeliveryLeadTimes.TYPE)
	}


	relationship(id: string | ResourceId | null): DeliveryLeadTimeRel {
		return super.relationshipOneToOne<DeliveryLeadTimeRel>(id)
	}

	relationshipToMany(...ids: string[]): DeliveryLeadTimeRel[] {
		return super.relationshipOneToMany<DeliveryLeadTimeRel>(...ids)
	}


	type(): DeliveryLeadTimeType {
		return DeliveryLeadTimes.TYPE
	}

}


export default DeliveryLeadTimes

export type { DeliveryLeadTime, DeliveryLeadTimeCreate, DeliveryLeadTimeUpdate, DeliveryLeadTimeType }

/*
export const DeliveryLeadTimesClient = (init: ResourceAdapter | ResourcesInitConfig): DeliveryLeadTimes => {
	return new DeliveryLeadTimes((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
