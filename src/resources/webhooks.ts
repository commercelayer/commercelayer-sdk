/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 19-08-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'





interface Webhook extends Resource {
	
	topic?: string
	callback_url?: string
	include_resources?: string[]
	circuit_state?: string
	circuit_failure_count?: number
	
}


interface WebhookCreate extends ResourceCreate {
	
	topic: string
	callback_url: string
	include_resources?: string[]
	
}


interface WebhookUpdate extends ResourceUpdate {
	
	topic?: string
	callback_url?: string
	include_resources?: string[]
	_reset_circuit?: boolean
	
}


class Webhooks extends ApiResource {

	static readonly TYPE: 'webhooks' = 'webhooks'
	// static readonly PATH = 'webhooks'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Webhook>> {
		return this.resources.list({ type: Webhooks.TYPE }, params, options)
	}

	async create(resource: WebhookCreate, options?: ResourcesConfig): Promise<Webhook> {
		return this.resources.create(Object.assign(resource, { type: Webhooks.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Webhook> {
		return this.resources.retrieve<Webhook>({ type: Webhooks.TYPE, id }, params, options)
	}

	async update(resource: WebhookUpdate, options?: ResourcesConfig): Promise<Webhook> {
		return this.resources.update({ ...resource, type: Webhooks.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: Webhooks.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isWebhook(resource: any): resource is Webhook {
		return resource.type && (resource.type === Webhooks.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Webhooks.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Webhooks.TYPE)
	}
	*/

	relationship(id: string): ResourceId & { type: typeof Webhooks.TYPE } {
		return { id, type: Webhooks.TYPE }
	}

}


export default Webhooks

export { Webhook, WebhookCreate, WebhookUpdate }
