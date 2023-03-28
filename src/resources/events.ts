import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList } from '../query'

import type { EventCallback } from './event_callbacks'
import type { Webhook } from './webhooks'


type EventType = 'events'
type EventRel = ResourceRel & { type: EventType }


interface Event extends Resource {
	
	readonly type: EventType

	name: string

	last_event_callbacks?: EventCallback[] | null
	webhooks?: Webhook[] | null

}


class Events extends ApiResource<Event> {

	static readonly TYPE: EventType = 'events' as const

	async last_event_callbacks(eventId: string | Event, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<EventCallback>> {
		const _eventId = (eventId as Event).id || eventId as string
		return this.resources.fetch<EventCallback>({ type: 'event_callbacks' }, `events/${_eventId}/last_event_callbacks`, params, options) as unknown as ListResponse<EventCallback>
	}

	async webhooks(eventId: string | Event, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Webhook>> {
		const _eventId = (eventId as Event).id || eventId as string
		return this.resources.fetch<Webhook>({ type: 'webhooks' }, `events/${_eventId}/webhooks`, params, options) as unknown as ListResponse<Webhook>
	}


	isEvent(resource: any): resource is Event {
		return resource.type && (resource.type === Events.TYPE)
	}


	relationship(id: string | ResourceId | null): EventRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Events.TYPE } : { id: id.id, type: Events.TYPE }
	}


	type(): EventType {
		return Events.TYPE
	}

}


export default Events

export type { Event, EventType }
