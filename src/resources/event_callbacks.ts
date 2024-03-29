import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { Webhook } from './webhooks'


type EventCallbackType = 'event_callbacks'
type EventCallbackRel = ResourceRel & { type: EventCallbackType }


export type EventCallbackSort = Pick<EventCallback, 'id' | 'response_code' | 'response_message'> & ResourceSort
// export type EventCallbackFilter = Pick<EventCallback, 'id' | 'callback_url' | 'response_code' | 'response_message'> & ResourceFilter


interface EventCallback extends Resource {
	
	readonly type: EventCallbackType

	callback_url: string
	payload?: Record<string, any> | null
	response_code?: string | null
	response_message?: string | null

	webhook?: Webhook | null

}


class EventCallbacks extends ApiResource<EventCallback> {

	static readonly TYPE: EventCallbackType = 'event_callbacks' as const

	async webhook(eventCallbackId: string | EventCallback, params?: QueryParamsRetrieve<Webhook>, options?: ResourcesConfig): Promise<Webhook> {
		const _eventCallbackId = (eventCallbackId as EventCallback).id || eventCallbackId as string
		return this.resources.fetch<Webhook>({ type: 'webhooks' }, `event_callbacks/${_eventCallbackId}/webhook`, params, options) as unknown as Webhook
	}


	isEventCallback(resource: any): resource is EventCallback {
		return resource.type && (resource.type === EventCallbacks.TYPE)
	}


	relationship(id: string | ResourceId | null): EventCallbackRel {
		return super.relationshipOneToOne<EventCallbackRel>(id)
	}

	relationshipToMany(...ids: string[]): EventCallbackRel[] {
		return super.relationshipOneToMany<EventCallbackRel>(...ids)
	}


	type(): EventCallbackType {
		return EventCallbacks.TYPE
	}

}


export default EventCallbacks

export type { EventCallback, EventCallbackType }
