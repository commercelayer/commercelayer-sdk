import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Shipment, ShipmentType } from './shipments'
import type { Parcel } from './parcels'
import type { Event } from './events'


type EasypostPickupType = 'easypost_pickups'
type EasypostPickupRel = ResourceRel & { type: EasypostPickupType }
type ShipmentRel = ResourceRel & { type: ShipmentType }


export type EasypostPickupSort = Pick<EasypostPickup, 'id' | 'status' | 'min_datetime' | 'max_datetime' | 'purchase_started_at' | 'purchase_completed_at'> & ResourceSort
// export type EasypostPickupFilter = Pick<EasypostPickup, 'id' | 'status' | 'min_datetime' | 'max_datetime' | 'purchase_started_at' | 'purchase_completed_at'> & ResourceFilter


interface EasypostPickup extends Resource {
	
	readonly type: EasypostPickupType

	/** 
	 * The pick up status.
	 * @example ```"unknown"```
	 */
	status?: string | null
	/** 
	 * The pick up service internal ID.
	 * @example ```"pickup_13e5d7e2a7824432a07975bc553944bc"```
	 */
	internal_id: string
	/** 
	 * The selected purchase rate from the available pick up rates.
	 * @example ```"pickuprate_a6cd2647a898410aa5d33febde44e1b2"```
	 */
	selected_rate_id?: string | null
	/** 
	 * The available pick up rates.
	 * @example ```[{"id":"pickuprate_a6cd2647a898410aa5d33febde44e1b2","rate":"45.59","carrier":"USPS","service":"NextDay"}]```
	 */
	rates: Array<Record<string, any>>
	/** 
	 * Additional text to help the driver successfully obtain the package, automatically enriched with parcels and package informations.
	 * @example ```"Knock loudly"```
	 */
	instructions?: string | null
	/** 
	 * The earliest time at which the package is available to pick up, must be larger than 2 hours from creation time.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	min_datetime: string
	/** 
	 * The latest time at which the package is available to pick up, must be smaller than 24 hours from creation time.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	max_datetime: string
	/** 
	 * Time at which the purchasing of the pick up rate started.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	purchase_started_at?: string | null
	/** 
	 * Time at which the purchasing of the pick up rate completed.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	purchase_completed_at?: string | null

	shipment?: Shipment | null
	parcels?: Parcel[] | null
	events?: Event[] | null

}


interface EasypostPickupCreate extends ResourceCreate {
	
	/** 
	 * Additional text to help the driver successfully obtain the package, automatically enriched with parcels and package informations.
	 * @example ```"Knock loudly"```
	 */
	instructions?: string | null
	/** 
	 * The earliest time at which the package is available to pick up, must be larger than 2 hours from creation time.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	min_datetime: string
	/** 
	 * The latest time at which the package is available to pick up, must be smaller than 24 hours from creation time.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	max_datetime: string

	shipment: ShipmentRel

}


interface EasypostPickupUpdate extends ResourceUpdate {
	
	/** 
	 * The selected purchase rate from the available pick up rates.
	 * @example ```"pickuprate_a6cd2647a898410aa5d33febde44e1b2"```
	 */
	selected_rate_id?: string | null
	/** 
	 * Send this attribute if you want to purchase this pick up with the selected rate.
	 * @example ```true```
	 */
	_purchase?: boolean | null

	shipment?: ShipmentRel | null

}


class EasypostPickups extends ApiResource<EasypostPickup> {

	static readonly TYPE: EasypostPickupType = 'easypost_pickups' as const

	async create(resource: EasypostPickupCreate, params?: QueryParamsRetrieve<EasypostPickup>, options?: ResourcesConfig): Promise<EasypostPickup> {
		return this.resources.create<EasypostPickupCreate, EasypostPickup>({ ...resource, type: EasypostPickups.TYPE }, params, options)
	}

	async update(resource: EasypostPickupUpdate, params?: QueryParamsRetrieve<EasypostPickup>, options?: ResourcesConfig): Promise<EasypostPickup> {
		return this.resources.update<EasypostPickupUpdate, EasypostPickup>({ ...resource, type: EasypostPickups.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: EasypostPickups.TYPE } : id, options)
	}

	async shipment(easypostPickupId: string | EasypostPickup, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		const _easypostPickupId = (easypostPickupId as EasypostPickup).id || easypostPickupId as string
		return this.resources.fetch<Shipment>({ type: 'shipments' }, `easypost_pickups/${_easypostPickupId}/shipment`, params, options) as unknown as Shipment
	}

	async parcels(easypostPickupId: string | EasypostPickup, params?: QueryParamsList<Parcel>, options?: ResourcesConfig): Promise<ListResponse<Parcel>> {
		const _easypostPickupId = (easypostPickupId as EasypostPickup).id || easypostPickupId as string
		return this.resources.fetch<Parcel>({ type: 'parcels' }, `easypost_pickups/${_easypostPickupId}/parcels`, params, options) as unknown as ListResponse<Parcel>
	}

	async events(easypostPickupId: string | EasypostPickup, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _easypostPickupId = (easypostPickupId as EasypostPickup).id || easypostPickupId as string
		return this.resources.fetch<Event>({ type: 'events' }, `easypost_pickups/${_easypostPickupId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async _purchase(id: string | EasypostPickup, params?: QueryParamsRetrieve<EasypostPickup>, options?: ResourcesConfig): Promise<EasypostPickup> {
		return this.resources.update<EasypostPickupUpdate, EasypostPickup>({ id: (typeof id === 'string')? id: id.id, type: EasypostPickups.TYPE, _purchase: true }, params, options)
	}


	isEasypostPickup(resource: any): resource is EasypostPickup {
		return resource.type && (resource.type === EasypostPickups.TYPE)
	}


	relationship(id: string | ResourceId | null): EasypostPickupRel {
		return super.relationshipOneToOne<EasypostPickupRel>(id)
	}

	relationshipToMany(...ids: string[]): EasypostPickupRel[] {
		return super.relationshipOneToMany<EasypostPickupRel>(...ids)
	}


	type(): EasypostPickupType {
		return EasypostPickups.TYPE
	}

}


const instance = new EasypostPickups()
export default instance

export type { EasypostPickups, EasypostPickup, EasypostPickupCreate, EasypostPickupUpdate, EasypostPickupType }
