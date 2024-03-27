import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsList } from '../query'

import type { Webhook, WebhookSortable } from './webhooks'
import type { EventCallback, EventCallbackSortable } from './event_callbacks'


type EventType = 'events'
type EventRel = ResourceRel & { type: EventType }


export type EventSortable = Pick<Event, 'id' | 'name'> & ResourceSortable
export type EventFilterable = Pick<Event, 'id' | 'name'> & ResourceFilterable


interface Event extends Resource {
	
	readonly type: EventType

	name: string

	webhooks?: Webhook[] | null
	last_event_callbacks?: EventCallback[] | null

}


class Events extends ApiResource<Event, EventSortable> {

	static readonly TYPE: EventType = 'events' as const

	async webhooks(eventId: string | Event, params?: QueryParamsList<WebhookSortable>, options?: ResourcesConfig): Promise<ListResponse<Webhook>> {
		const _eventId = (eventId as Event).id || eventId as string
		return this.resources.fetch<Webhook, WebhookSortable>({ type: 'webhooks' }, `events/${_eventId}/webhooks`, params, options) as unknown as ListResponse<Webhook>
	}

	async last_event_callbacks(eventId: string | Event, params?: QueryParamsList<EventCallbackSortable>, options?: ResourcesConfig): Promise<ListResponse<EventCallback>> {
		const _eventId = (eventId as Event).id || eventId as string
		return this.resources.fetch<EventCallback, EventCallbackSortable>({ type: 'event_callbacks' }, `events/${_eventId}/last_event_callbacks`, params, options) as unknown as ListResponse<EventCallback>
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

/*
export const EventsClient = (init: ResourceAdapter | ResourcesInitConfig): Events => {
	return new Events((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
