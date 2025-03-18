import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Shipment } from './shipments'
import type { Parcel } from './parcels'
import type { Event } from './events'


type PickupType = 'pickups'
type PickupRel = ResourceRel & { type: PickupType }


export type PickupSort = Pick<Pickup, 'id' | 'status'> & ResourceSort
// export type PickupFilter = Pick<Pickup, 'id' | 'status'> & ResourceFilter


interface Pickup extends Resource {
	
	readonly type: PickupType

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

	shipment?: Shipment | null
	parcels?: Parcel[] | null
	events?: Event[] | null

}


class Pickups extends ApiResource<Pickup> {

	static readonly TYPE: PickupType = 'pickups' as const

	async shipment(pickupId: string | Pickup, params?: QueryParamsRetrieve<Shipment>, options?: ResourcesConfig): Promise<Shipment> {
		const _pickupId = (pickupId as Pickup).id || pickupId as string
		return this.resources.fetch<Shipment>({ type: 'shipments' }, `pickups/${_pickupId}/shipment`, params, options) as unknown as Shipment
	}

	async parcels(pickupId: string | Pickup, params?: QueryParamsList<Parcel>, options?: ResourcesConfig): Promise<ListResponse<Parcel>> {
		const _pickupId = (pickupId as Pickup).id || pickupId as string
		return this.resources.fetch<Parcel>({ type: 'parcels' }, `pickups/${_pickupId}/parcels`, params, options) as unknown as ListResponse<Parcel>
	}

	async events(pickupId: string | Pickup, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _pickupId = (pickupId as Pickup).id || pickupId as string
		return this.resources.fetch<Event>({ type: 'events' }, `pickups/${_pickupId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isPickup(resource: any): resource is Pickup {
		return resource.type && (resource.type === Pickups.TYPE)
	}


	relationship(id: string | ResourceId | null): PickupRel {
		return super.relationshipOneToOne<PickupRel>(id)
	}

	relationshipToMany(...ids: string[]): PickupRel[] {
		return super.relationshipOneToMany<PickupRel>(...ids)
	}


	type(): PickupType {
		return Pickups.TYPE
	}

}


const instance = new Pickups()
export default instance

export type { Pickup, PickupType }
