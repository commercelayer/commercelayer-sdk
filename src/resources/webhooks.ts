import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { EventCallback } from './event_callbacks'


type WebhookType = 'webhooks'
type WebhookRel = ResourceRel & { type: WebhookType }


interface Webhook extends Resource {
	
	readonly type: WebhookType

	name?: string
	topic: string
	callback_url: string
	include_resources?: string[]
	circuit_state?: string
	circuit_failure_count?: number
	shared_secret: string

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
	topic: string
	callback_url: string
	include_resources?: string[]
	_reset_circuit?: boolean
	
}


class Webhooks extends ApiResource<Webhook> {

	static readonly TYPE: WebhookType = 'webhooks' as const
	// static readonly PATH = 'webhooks'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Webhook>> {
		return this.resources.list<Webhook>({ type: Webhooks.TYPE }, params, options)
	}

	async create(resource: WebhookCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Webhook> {
		return this.resources.create<WebhookCreate, Webhook>({ ...resource, type: Webhooks.TYPE }, params, options)
	}

	async update(resource: WebhookUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Webhook> {
		return this.resources.update<WebhookUpdate, Webhook>({ ...resource, type: Webhooks.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Webhooks.TYPE } : id, options)
	}

	async last_event_callbacks(webhookId: string | Webhook, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<EventCallback>> {
		const _webhookId = (webhookId as Webhook).id || webhookId as string
		return this.resources.fetch<EventCallback>({ type: 'event_callbacks' }, `webhooks/${_webhookId}/last_event_callbacks`, params, options) as unknown as ListResponse<EventCallback>
	}


	isWebhook(resource: any): resource is Webhook {
		return resource.type && (resource.type === Webhooks.TYPE)
	}


	relationship(id: string | ResourceId | null): WebhookRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Webhooks.TYPE } : { id: id.id, type: Webhooks.TYPE }
	}


	type(): WebhookType {
		return Webhooks.TYPE
	}

}


export default Webhooks

export type { Webhook, WebhookCreate, WebhookUpdate, WebhookType }
