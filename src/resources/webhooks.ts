import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { EventCallback } from './event_callbacks'
import type { Version } from './versions'


type WebhookType = 'webhooks'
type WebhookRel = ResourceRel & { type: WebhookType }


export type WebhookSort = Pick<Webhook, 'id' | 'disabled_at' | 'circuit_state' | 'circuit_failure_count'> & ResourceSort
// export type WebhookFilter = Pick<Webhook, 'id' | 'name' | 'topic' | 'disabled_at' | 'circuit_state' | 'circuit_failure_count'> & ResourceFilter


interface Webhook extends Resource {
	
	readonly type: WebhookType

	name?: Nullable<string>
	topic: string
	callback_url: string
	include_resources?: Nullable<string[]>
	disabled_at?: Nullable<string>
	circuit_state?: Nullable<string>
	circuit_failure_count?: Nullable<number>
	shared_secret: string

	last_event_callbacks?: Nullable<EventCallback[]>
	versions?: Nullable<Version[]>

}


interface WebhookCreate extends ResourceCreate {
	
	name?: Nullable<string>
	topic: string
	callback_url: string
	include_resources?: Nullable<string[]>
	_disable?: Nullable<boolean>
	_enable?: Nullable<boolean>
	
}


interface WebhookUpdate extends ResourceUpdate {
	
	name?: Nullable<string>
	topic?: Nullable<string>
	callback_url?: Nullable<string>
	include_resources?: Nullable<string[]>
	_disable?: Nullable<boolean>
	_enable?: Nullable<boolean>
	_reset_circuit?: Nullable<boolean>
	
}


class Webhooks extends ApiResource<Webhook> {

	static readonly TYPE: WebhookType = 'webhooks' as const

	async create(resource: WebhookCreate, params?: QueryParamsRetrieve<Webhook>, options?: ResourcesConfig): Promise<Webhook> {
		return this.resources.create<WebhookCreate, Webhook>({ ...resource, type: Webhooks.TYPE }, params, options)
	}

	async update(resource: WebhookUpdate, params?: QueryParamsRetrieve<Webhook>, options?: ResourcesConfig): Promise<Webhook> {
		return this.resources.update<WebhookUpdate, Webhook>({ ...resource, type: Webhooks.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Webhooks.TYPE } : id, options)
	}

	async last_event_callbacks(webhookId: string | Webhook, params?: QueryParamsList<EventCallback>, options?: ResourcesConfig): Promise<ListResponse<EventCallback>> {
		const _webhookId = (webhookId as Webhook).id || webhookId as string
		return this.resources.fetch<EventCallback>({ type: 'event_callbacks' }, `webhooks/${_webhookId}/last_event_callbacks`, params, options) as unknown as ListResponse<EventCallback>
	}

	async versions(webhookId: string | Webhook, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _webhookId = (webhookId as Webhook).id || webhookId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `webhooks/${_webhookId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _disable(id: string | Webhook, params?: QueryParamsRetrieve<Webhook>, options?: ResourcesConfig): Promise<Webhook> {
		return this.resources.update<WebhookUpdate, Webhook>({ id: (typeof id === 'string')? id: id.id, type: Webhooks.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | Webhook, params?: QueryParamsRetrieve<Webhook>, options?: ResourcesConfig): Promise<Webhook> {
		return this.resources.update<WebhookUpdate, Webhook>({ id: (typeof id === 'string')? id: id.id, type: Webhooks.TYPE, _enable: true }, params, options)
	}

	async _reset_circuit(id: string | Webhook, params?: QueryParamsRetrieve<Webhook>, options?: ResourcesConfig): Promise<Webhook> {
		return this.resources.update<WebhookUpdate, Webhook>({ id: (typeof id === 'string')? id: id.id, type: Webhooks.TYPE, _reset_circuit: true }, params, options)
	}


	isWebhook(resource: any): resource is Webhook {
		return resource.type && (resource.type === Webhooks.TYPE)
	}


	relationship(id: string | ResourceId | null): WebhookRel {
		return super.relationshipOneToOne<WebhookRel>(id)
	}

	relationshipToMany(...ids: string[]): WebhookRel[] {
		return super.relationshipOneToMany<WebhookRel>(...ids)
	}


	type(): WebhookType {
		return Webhooks.TYPE
	}

}


export default Webhooks

export type { Webhook, WebhookCreate, WebhookUpdate, WebhookType }
