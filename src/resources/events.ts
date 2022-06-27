import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { EventCallback } from './event_callbacks'
import { Webhook } from './webhooks'


type EventRel = ResourceRel & { type: typeof Events.TYPE }


interface Event extends Resource {
	
	name?: string

	last_event_callbacks?: EventCallback[]
	webhooks?: Webhook[]

}


class Events extends ApiResource {

	static readonly TYPE: 'events' = 'events'
	// static readonly PATH = 'events'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		return this.resources.list({ type: Events.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Event> {
		return this.resources.retrieve<Event>({ type: Events.TYPE, id }, params, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isEvent(resource: any): resource is Event {
		return resource.type && (resource.type === Events.TYPE)
	}


	relationship(id: string | ResourceId | null): EventRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Events.TYPE } : { id: id.id, type: Events.TYPE }
	}


	type(): string {
		return Events.TYPE
	}

}


export default Events

export { Event }
