import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsList } from '../query'

import type { Webhook } from './webhooks'
import type { EventCallback } from './event_callbacks'


type EventType = 'events'
type EventRel = ResourceRel & { type: EventType }


export type EventSort = Pick<Event, 'id' | 'name'> & ResourceSort
// export type EventFilter = Pick<Event, 'id' | 'name'> & ResourceFilter


interface Event extends Resource {
	
	readonly type: EventType

	/** 
	 * The event's internal name.
	 * @example ```"orders.create"```
	 */
	name: string

	webhooks?: Webhook[] | null
	last_event_callbacks?: EventCallback[] | null

}


class Events extends ApiResource<Event> {

	static readonly TYPE: EventType = 'events' as const

	async webhooks(eventId: string | Event, params?: QueryParamsList<Webhook>, options?: ResourcesConfig): Promise<ListResponse<Webhook>> {
		const _eventId = (eventId as Event).id || eventId as string
		return this.resources.fetch<Webhook>({ type: 'webhooks' }, `events/${_eventId}/webhooks`, params, options) as unknown as ListResponse<Webhook>
	}

	async last_event_callbacks(eventId: string | Event, params?: QueryParamsList<EventCallback>, options?: ResourcesConfig): Promise<ListResponse<EventCallback>> {
		const _eventId = (eventId as Event).id || eventId as string
		return this.resources.fetch<EventCallback>({ type: 'event_callbacks' }, `events/${_eventId}/last_event_callbacks`, params, options) as unknown as ListResponse<EventCallback>
	}


	isEvent(resource: any): resource is Event {
		return resource.type && (resource.type === Events.TYPE)
	}


	relationship(id: string | ResourceId | null): EventRel {
		return super.relationshipOneToOne<EventRel>(id)
	}

	relationshipToMany(...ids: string[]): EventRel[] {
		return super.relationshipOneToMany<EventRel>(...ids)
	}


	type(): EventType {
		return Events.TYPE
	}

}


export default Events

export type { Event, EventType }
