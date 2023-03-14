import { ApiResource, Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Webhook } from './webhooks'


type EventCallbackType = 'event_callbacks'
type EventCallbackRel = ResourceRel & { type: EventCallbackType }


interface EventCallback extends Resource {
	
	readonly type: EventCallbackType

	callback_url: string
	payload?: object
	response_code?: string
	response_message?: string

	webhook?: Webhook

}


class EventCallbacks extends ApiResource<EventCallback> {

	static readonly TYPE: EventCallbackType = 'event_callbacks' as const
	// static readonly PATH = 'event_callbacks'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<EventCallback>> {
		return this.resources.list<EventCallback>({ type: EventCallbacks.TYPE }, params, options)
	}

	async webhook(eventCallbackId: string | EventCallback, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Webhook> {
		const _eventCallbackId = (eventCallbackId as EventCallback).id || eventCallbackId as string
		return this.resources.fetch<Webhook>({ type: 'webhooks' }, `event_callbacks/${_eventCallbackId}/webhook`, params, options) as unknown as Webhook
	}


	isEventCallback(resource: any): resource is EventCallback {
		return resource.type && (resource.type === EventCallbacks.TYPE)
	}


	relationship(id: string | ResourceId | null): EventCallbackRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: EventCallbacks.TYPE } : { id: id.id, type: EventCallbacks.TYPE }
	}


	type(): EventCallbackType {
		return EventCallbacks.TYPE
	}

}


export default EventCallbacks

export type { EventCallback, EventCallbackType }
