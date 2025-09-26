import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { EventCallback } from './event_callbacks'
import type { Version } from './versions'
import type { EventStore } from './event_stores'


type WebhookType = 'webhooks'
type WebhookRel = ResourceRel & { type: WebhookType }


export type WebhookSort = Pick<Webhook, 'id' | 'disabled_at' | 'circuit_state' | 'circuit_failure_count'> & ResourceSort
// export type WebhookFilter = Pick<Webhook, 'id' | 'name' | 'topic' | 'disabled_at' | 'circuit_state' | 'circuit_failure_count'> & ResourceFilter


interface Webhook extends Resource {
	
	readonly type: WebhookType

	/** 
	 * Unique name for the webhook.
	 * @example ```"myorg-orders.place"```
	 */
	name?: string | null
	/** 
	 * The identifier of the resource/event that will trigger the webhook.
	 * @example ```"orders.place"```
	 */
	topic: string
	/** 
	 * URI where the webhook subscription should send the POST request when the event occurs.
	 * @example ```"https://yourapp.com/webhooks"```
	 */
	callback_url: string
	/** 
	 * List of related resources that should be included in the webhook body.
	 * @example ```["customer","shipping_address","billing_address"]```
	 */
	include_resources?: string[] | null
	/** 
	 * Time at which this resource was disabled.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	disabled_at?: string | null
	/** 
	 * The circuit breaker state, by default it is 'closed'. It can become 'open' once the number of consecutive failures overlaps the specified threshold, in such case no further calls to the failing callback are made.
	 * @example ```"closed"```
	 */
	circuit_state?: string | null
	/** 
	 * The number of consecutive failures recorded by the circuit breaker associated to this resource, will be reset on first successful call to callback.
	 * @example ```5```
	 */
	circuit_failure_count?: number | null
	/** 
	 * The shared secret used to sign the external request payload.
	 * @example ```"1c0994cc4e996e8c6ee56a2198f66f3c"```
	 */
	shared_secret: string

	last_event_callbacks?: EventCallback[] | null
	versions?: Version[] | null
	event_stores?: EventStore[] | null

}


interface WebhookCreate extends ResourceCreate {
	
	/** 
	 * Unique name for the webhook.
	 * @example ```"myorg-orders.place"```
	 */
	name?: string | null
	/** 
	 * The identifier of the resource/event that will trigger the webhook.
	 * @example ```"orders.place"```
	 */
	topic: string
	/** 
	 * URI where the webhook subscription should send the POST request when the event occurs.
	 * @example ```"https://yourapp.com/webhooks"```
	 */
	callback_url: string
	/** 
	 * List of related resources that should be included in the webhook body.
	 * @example ```["customer","shipping_address","billing_address"]```
	 */
	include_resources?: string[] | null
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```true```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```true```
	 */
	_enable?: boolean | null
	
}


interface WebhookUpdate extends ResourceUpdate {
	
	/** 
	 * Unique name for the webhook.
	 * @example ```"myorg-orders.place"```
	 */
	name?: string | null
	/** 
	 * The identifier of the resource/event that will trigger the webhook.
	 * @example ```"orders.place"```
	 */
	topic?: string | null
	/** 
	 * URI where the webhook subscription should send the POST request when the event occurs.
	 * @example ```"https://yourapp.com/webhooks"```
	 */
	callback_url?: string | null
	/** 
	 * List of related resources that should be included in the webhook body.
	 * @example ```["customer","shipping_address","billing_address"]```
	 */
	include_resources?: string[] | null
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```true```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```true```
	 */
	_enable?: boolean | null
	/** 
	 * Send this attribute if you want to reset the circuit breaker associated to this resource to 'closed' state and zero failures count. Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_reset_circuit?: boolean | null
	
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

	async event_stores(webhookId: string | Webhook, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _webhookId = (webhookId as Webhook).id || webhookId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `webhooks/${_webhookId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
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


const instance = new Webhooks()
export default instance

export type { Webhooks, Webhook, WebhookCreate, WebhookUpdate, WebhookType }
