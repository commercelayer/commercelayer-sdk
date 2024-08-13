import { ApiResource } from '../resource'
import type { Resource, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Webhook } from './webhooks'
import type { EventCallback } from './event_callbacks'


type EventType = 'events'
type EventRel = ResourceRel & { type: EventType }


interface Event extends Resource {
	
	readonly type: EventType

	name: string

	webhooks?: Webhook[] | null
	last_event_callbacks?: EventCallback[] | null

}


interface EventUpdate extends ResourceUpdate {
	
	_trigger?: boolean | null
	
}


class Events extends ApiResource<Event> {

	static readonly TYPE: EventType = 'events' as const

	async update(resource: EventUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Event> {
		return this.resources.update<EventUpdate, Event>({ ...resource, type: Events.TYPE }, params, options)
	}

	async webhooks(eventId: string | Event, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Webhook>> {
		const _eventId = (eventId as Event).id || eventId as string
		return this.resources.fetch<Webhook>({ type: 'webhooks' }, `events/${_eventId}/webhooks`, params, options) as unknown as ListResponse<Webhook>
	}

	async last_event_callbacks(eventId: string | Event, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<EventCallback>> {
		const _eventId = (eventId as Event).id || eventId as string
		return this.resources.fetch<EventCallback>({ type: 'event_callbacks' }, `events/${_eventId}/last_event_callbacks`, params, options) as unknown as ListResponse<EventCallback>
	}

	async _trigger(id: string | Event, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Event> {
		return this.resources.update<EventUpdate, Event>({ id: (typeof id === 'string')? id: id.id, type: Events.TYPE, _trigger: true }, params, options)
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

export type { Event, EventUpdate, EventType }
