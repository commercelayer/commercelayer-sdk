import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourceRel, ResourceSort, /* ResourceFilter */ } from '../resource'




type EventStoreType = 'event_stores'
type EventStoreRel = ResourceRel & { type: EventStoreType }


export type EventStoreSort = Pick<EventStore, 'id'> & ResourceSort
// export type EventStoreFilter = Pick<EventStore, 'id'> & ResourceFilter


interface EventStore extends Resource {
	
	readonly type: EventStoreType

	/** 
	 * The type of the affected resource.
	 * @example ```"orders"```
	 */
	resource_type?: string | null
	/** 
	 * The ID of the affected resource.
	 * @example ```"PzdJhdLdYV"```
	 */
	resource_id?: string | null
	/** 
	 * The type of change (one of create or update).
	 * @example ```"update"```
	 */
	event?: string | null
	/** 
	 * The object changes payload.
	 * @example ```{"status":["draft","placed"]}```
	 */
	payload?: Record<string, any> | null
	/** 
	 * Information about who triggered the change.
	 * @example ```{"application":{"id":"DNOPYiZYpn","kind":"sales_channel","public":true},"owner":{"id":"yQQrBhLBmQ","type":"Customer"}}```
	 */
	who?: Record<string, any> | null
	
}


class EventStores extends ApiResource<EventStore> {

	static readonly TYPE: EventStoreType = 'event_stores' as const

	


	isEventStore(resource: any): resource is EventStore {
		return resource.type && (resource.type === EventStores.TYPE)
	}


	relationship(id: string | ResourceId | null): EventStoreRel {
		return super.relationshipOneToOne<EventStoreRel>(id)
	}

	relationshipToMany(...ids: string[]): EventStoreRel[] {
		return super.relationshipOneToMany<EventStoreRel>(...ids)
	}


	type(): EventStoreType {
		return EventStores.TYPE
	}

}


export default EventStores

export type { EventStore, EventStoreType }
