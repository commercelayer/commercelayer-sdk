/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 **/

import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList } from '../query'

import { Webhook } from './webhooks'


type EventCallbackRel = ResourceId & { type: typeof EventCallbacks.TYPE }


interface EventCallback extends Resource {
	
	callback_url?: string
	payload?: object
	response_code?: string
	response_message?: string

	webhook?: Webhook

}


class EventCallbacks extends ApiResource {

	static readonly TYPE: 'event_callbacks' = 'event_callbacks'
	// static readonly PATH = 'event_callbacks'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<EventCallback>> {
		return this.resources.list({ type: EventCallbacks.TYPE }, params, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isEventCallback(resource: any): resource is EventCallback {
		return resource.type && (resource.type === EventCallbacks.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(EventCallbacks.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(EventCallbacks.TYPE)
	}
	*/

	relationship(id: string | ResourceId): EventCallbackRel {
		return (typeof id === 'string') ? { id, type: EventCallbacks.TYPE } : {id: id.id, type: EventCallbacks.TYPE }
	}

}


export default EventCallbacks

export { EventCallback }
