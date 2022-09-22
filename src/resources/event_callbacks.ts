import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Webhook } from './webhooks'


type EventCallbackRel = ResourceRel & { type: typeof EventCallbacks.TYPE }


interface EventCallback extends Resource {
	
	callback_url?: string
	payload?: object
	response_code?: string
	response_message?: string

	webhook?: Webhook

}


class EventCallbacks extends ApiResource {

	static readonly TYPE: 'event_callbacks' = 'event_callbacks' as const
	// static readonly PATH = 'event_callbacks'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<EventCallback>> {
		return this.resources.list<EventCallback>({ type: EventCallbacks.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<EventCallback> {
		return this.resources.retrieve<EventCallback>({ type: EventCallbacks.TYPE, id }, params, options)
	}

	async webhook(eventCallbackId: string | EventCallback, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Webhook> {
		const _eventCallbackId = (eventCallbackId as EventCallback).id || eventCallbackId
		return this.resources.fetch<Webhook>({ type: 'webhooks' }, `event_callbacks/${_eventCallbackId}/webhook`, params, options) as unknown as Webhook
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isEventCallback(resource: any): resource is EventCallback {
		return resource.type && (resource.type === EventCallbacks.TYPE)
	}


	relationship(id: string | ResourceId | null): EventCallbackRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: EventCallbacks.TYPE } : { id: id.id, type: EventCallbacks.TYPE }
	}


	type(): string {
		return EventCallbacks.TYPE
	}

}


export default EventCallbacks

export { EventCallback }
