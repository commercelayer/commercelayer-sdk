import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { EventCallback } from './event_callbacks'
import type { Version } from './versions'


type WebhookType = 'webhooks'
type WebhookRel = ResourceRel & { type: WebhookType }


interface Webhook extends Resource {
	
	readonly type: WebhookType

	name?: string | null
	topic: string
	callback_url: string
	include_resources?: string[] | null
	circuit_state?: string | null
	circuit_failure_count?: number | null
	shared_secret: string

	last_event_callbacks?: EventCallback[] | null
	versions?: Version[] | null

}


interface WebhookCreate extends ResourceCreate {
	
	name?: string | null
	topic: string
	callback_url: string
	include_resources?: string[] | null
	
}


interface WebhookUpdate extends ResourceUpdate {
	
	name?: string | null
	topic?: string | null
	callback_url?: string | null
	include_resources?: string[] | null
	_reset_circuit?: boolean | null
	
}


class Webhooks extends ApiResource<Webhook> {

	static readonly TYPE: WebhookType = 'webhooks' as const

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

	async versions(webhookId: string | Webhook, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _webhookId = (webhookId as Webhook).id || webhookId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `webhooks/${_webhookId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _reset_circuit(id: string | Webhook, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Webhook> {
		return this.resources.update<WebhookUpdate, Webhook>({ id: (typeof id === 'string')? id: id.id, type: Webhooks.TYPE, _reset_circuit: true }, params, options)
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


	parse(payload: any): Webhook | Webhook[] {
		return super.parse(payload)
	}

}


export default Webhooks

export type { Webhook, WebhookCreate, WebhookUpdate, WebhookType }
