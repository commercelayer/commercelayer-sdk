import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { EventCallback } from './event_callbacks'


type WebhookRel = ResourceRel & { type: typeof Webhooks.TYPE }


interface Webhook extends Resource {
	
	name?: string
	topic?: string
	callback_url?: string
	include_resources?: string[]
	circuit_state?: string
	circuit_failure_count?: number

	last_event_callbacks?: EventCallback[]

}


interface WebhookCreate extends ResourceCreate {
	
	name?: string
	topic: string
	callback_url: string
	include_resources?: string[]
	
}


interface WebhookUpdate extends ResourceUpdate {
	
	name?: string
	topic?: string
	callback_url?: string
	include_resources?: string[]
	_reset_circuit?: boolean
	
}


class Webhooks extends ApiResource {

	static readonly TYPE: 'webhooks' = 'webhooks'
	// static readonly PATH = 'webhooks'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Webhook>> {
		return this.resources.list<Webhook>({ type: Webhooks.TYPE }, params, options)
	}

	async create(resource: WebhookCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Webhook> {
		return this.resources.create<WebhookCreate, Webhook>({ ...resource, type: Webhooks.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Webhook> {
		return this.resources.retrieve<Webhook>({ type: Webhooks.TYPE, id }, params, options)
	}

	async update(resource: WebhookUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Webhook> {
		return this.resources.update<WebhookUpdate, Webhook>({ ...resource, type: Webhooks.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Webhooks.TYPE, id }, options)
	}

	async last_event_callbacks(webhookId: string | Webhook, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<EventCallback>> {
		const _webhookId = (webhookId as Webhook).id || webhookId
		return this.resources.fetch<EventCallback>({ type: 'event_callbacks' }, `webhooks/${_webhookId}/last_event_callbacks`, params, options) as unknown as ListResponse<EventCallback>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isWebhook(resource: any): resource is Webhook {
		return resource.type && (resource.type === Webhooks.TYPE)
	}


	relationship(id: string | ResourceId | null): WebhookRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Webhooks.TYPE } : { id: id.id, type: Webhooks.TYPE }
	}


	type(): string {
		return Webhooks.TYPE
	}

}


export default Webhooks

export { Webhook, WebhookCreate, WebhookUpdate }
