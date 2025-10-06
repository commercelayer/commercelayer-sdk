import { ApiResource } from '../resource'
import type { Resource, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Webhook } from './webhooks'
import type { EventCallback } from './event_callbacks'
import type { EventStore } from './event_stores'


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
	event_stores?: EventStore[] | null

}


interface EventUpdate extends ResourceUpdate {
	
	/** 
	 * Send this attribute if you want to force webhooks execution for this event. Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_trigger?: boolean | null
	
}


class Events extends ApiResource<Event> {

	static readonly TYPE: EventType = 'events' as const

	async update(resource: EventUpdate, params?: QueryParamsRetrieve<Event>, options?: ResourcesConfig): Promise<Event> {
		return this.resources.update<EventUpdate, Event>({ ...resource, type: Events.TYPE }, params, options)
	}

	async webhooks(eventId: string | Event, params?: QueryParamsList<Webhook>, options?: ResourcesConfig): Promise<ListResponse<Webhook>> {
		const _eventId = (eventId as Event).id || eventId as string
		return this.resources.fetch<Webhook>({ type: 'webhooks' }, `events/${_eventId}/webhooks`, params, options) as unknown as ListResponse<Webhook>
	}

	async last_event_callbacks(eventId: string | Event, params?: QueryParamsList<EventCallback>, options?: ResourcesConfig): Promise<ListResponse<EventCallback>> {
		const _eventId = (eventId as Event).id || eventId as string
		return this.resources.fetch<EventCallback>({ type: 'event_callbacks' }, `events/${_eventId}/last_event_callbacks`, params, options) as unknown as ListResponse<EventCallback>
	}

	async event_stores(eventId: string | Event, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _eventId = (eventId as Event).id || eventId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `events/${_eventId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}

	async _trigger(id: string | Event, params?: QueryParamsRetrieve<Event>, options?: ResourcesConfig): Promise<Event> {
		return this.resources.update<EventUpdate, Event>({ id: (typeof id === 'string')? id: id.id, type: Events.TYPE, _trigger: true }, params, options)
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


const instance = new Events()
export default instance

export type { Events, Event, EventUpdate, EventType }
