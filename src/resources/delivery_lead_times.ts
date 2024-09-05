import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Attachment } from './attachments'
import type { ShippingMethod, ShippingMethodType } from './shipping_methods'
import type { StockLocation, StockLocationType } from './stock_locations'
import type { Version } from './versions'


type DeliveryLeadTimeType = 'delivery_lead_times'
type DeliveryLeadTimeRel = ResourceRel & { type: DeliveryLeadTimeType }
type ShippingMethodRel = ResourceRel & { type: ShippingMethodType }
type StockLocationRel = ResourceRel & { type: StockLocationType }


export type DeliveryLeadTimeSort = Pick<DeliveryLeadTime, 'id' | 'max_hours' | 'min_days' | 'min_hours'> & ResourceSort
// export type DeliveryLeadTimeFilter = Pick<DeliveryLeadTime, 'id' | 'max_days' | 'max_hours' | 'min_days' | 'min_hours'> & ResourceFilter


interface DeliveryLeadTime extends Resource {
	
	readonly type: DeliveryLeadTimeType

	/** 
	 * The delivery lead maximun time, in days (rounded).
	 * @example ```"3"```
	 */
	max_days?: number | null
	/** 
	 * The delivery lead maximun time (in hours) when shipping from the associated stock location with the associated shipping method.
	 * @example ```"72"```
	 */
	max_hours: number
	/** 
	 * The delivery lead minimum time, in days (rounded).
	 * @example ```"2"```
	 */
	min_days?: number | null
	/** 
	 * The delivery lead minimum time (in hours) when shipping from the associated stock location with the associated shipping method.
	 * @example ```"48"```
	 */
	min_hours: number

	attachments?: Attachment[] | null
	shipping_method?: ShippingMethod | null
	stock_location?: StockLocation | null
	versions?: Version[] | null

}


interface DeliveryLeadTimeCreate extends ResourceCreate {
	
	/** 
	 * The delivery lead maximun time (in hours) when shipping from the associated stock location with the associated shipping method.
	 * @example ```"72"```
	 */
	max_hours: number
	/** 
	 * The delivery lead minimum time (in hours) when shipping from the associated stock location with the associated shipping method.
	 * @example ```"48"```
	 */
	min_hours: number

	shipping_method: ShippingMethodRel
	stock_location: StockLocationRel

}


interface DeliveryLeadTimeUpdate extends ResourceUpdate {
	
	/** 
	 * The delivery lead maximun time (in hours) when shipping from the associated stock location with the associated shipping method.
	 * @example ```"72"```
	 */
	max_hours?: number | null
	/** 
	 * The delivery lead minimum time (in hours) when shipping from the associated stock location with the associated shipping method.
	 * @example ```"48"```
	 */
	min_hours?: number | null

	shipping_method?: ShippingMethodRel | null
	stock_location?: StockLocationRel | null

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

	async attachments(deliveryLeadTimeId: string | DeliveryLeadTime, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _deliveryLeadTimeId = (deliveryLeadTimeId as DeliveryLeadTime).id || deliveryLeadTimeId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `delivery_lead_times/${_deliveryLeadTimeId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async shipping_method(deliveryLeadTimeId: string | DeliveryLeadTime, params?: QueryParamsRetrieve<ShippingMethod>, options?: ResourcesConfig): Promise<ShippingMethod> {
		const _deliveryLeadTimeId = (deliveryLeadTimeId as DeliveryLeadTime).id || deliveryLeadTimeId as string
		return this.resources.fetch<ShippingMethod>({ type: 'shipping_methods' }, `delivery_lead_times/${_deliveryLeadTimeId}/shipping_method`, params, options) as unknown as ShippingMethod
	}

	async stock_location(deliveryLeadTimeId: string | DeliveryLeadTime, params?: QueryParamsRetrieve<StockLocation>, options?: ResourcesConfig): Promise<StockLocation> {
		const _deliveryLeadTimeId = (deliveryLeadTimeId as DeliveryLeadTime).id || deliveryLeadTimeId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `delivery_lead_times/${_deliveryLeadTimeId}/stock_location`, params, options) as unknown as StockLocation
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
