import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Market } from './markets'
import type { OrderSubscription } from './order_subscriptions'
import type { Attachment } from './attachments'


type SubscriptionModelRel = ResourceRel & { type: typeof SubscriptionModels.TYPE }


interface SubscriptionModel extends Resource {
	
	name?: string
	strategy?: string
	frequencies?: string[]
	auto_activate?: boolean
	auto_cancel?: boolean

	markets?: Market[]
	order_subscriptions?: OrderSubscription[]
	attachments?: Attachment[]

}


interface SubscriptionModelCreate extends ResourceCreate {
	
	name: string
	strategy?: string
	frequencies: string[]
	auto_activate?: boolean
	auto_cancel?: boolean
	
}


interface SubscriptionModelUpdate extends ResourceUpdate {
	
	name?: string
	strategy?: string
	frequencies?: string[]
	auto_activate?: boolean
	auto_cancel?: boolean
	
}


class SubscriptionModels extends ApiResource {

	static readonly TYPE: 'subscription_models' = 'subscription_models' as const
	// static readonly PATH = 'subscription_models'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SubscriptionModel>> {
		return this.resources.list<SubscriptionModel>({ type: SubscriptionModels.TYPE }, params, options)
	}

	async create(resource: SubscriptionModelCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SubscriptionModel> {
		return this.resources.create<SubscriptionModelCreate, SubscriptionModel>({ ...resource, type: SubscriptionModels.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SubscriptionModel> {
		return this.resources.retrieve<SubscriptionModel>({ type: SubscriptionModels.TYPE, id }, params, options)
	}

	async update(resource: SubscriptionModelUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SubscriptionModel> {
		return this.resources.update<SubscriptionModelUpdate, SubscriptionModel>({ ...resource, type: SubscriptionModels.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: SubscriptionModels.TYPE, id }, options)
	}

	async markets(subscriptionModelId: string | SubscriptionModel, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _subscriptionModelId = (subscriptionModelId as SubscriptionModel).id || subscriptionModelId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `subscription_models/${_subscriptionModelId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async order_subscriptions(subscriptionModelId: string | SubscriptionModel, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderSubscription>> {
		const _subscriptionModelId = (subscriptionModelId as SubscriptionModel).id || subscriptionModelId as string
		return this.resources.fetch<OrderSubscription>({ type: 'order_subscriptions' }, `subscription_models/${_subscriptionModelId}/order_subscriptions`, params, options) as unknown as ListResponse<OrderSubscription>
	}

	async attachments(subscriptionModelId: string | SubscriptionModel, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _subscriptionModelId = (subscriptionModelId as SubscriptionModel).id || subscriptionModelId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `subscription_models/${_subscriptionModelId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isSubscriptionModel(resource: any): resource is SubscriptionModel {
		return resource.type && (resource.type === SubscriptionModels.TYPE)
	}


	relationship(id: string | ResourceId | null): SubscriptionModelRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: SubscriptionModels.TYPE } : { id: id.id, type: SubscriptionModels.TYPE }
	}


	type(): string {
		return SubscriptionModels.TYPE
	}

}


export default SubscriptionModels

export { SubscriptionModel, SubscriptionModelCreate, SubscriptionModelUpdate }
