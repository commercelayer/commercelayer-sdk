import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market } from './markets'
import type { OrderSubscription } from './order_subscriptions'
import type { Attachment } from './attachments'


type SubscriptionModelType = 'subscription_models'
type SubscriptionModelRel = ResourceRel & { type: SubscriptionModelType }


export type SubscriptionModelSort = Pick<SubscriptionModel, 'id' | 'name' | 'strategy'> & ResourceSort
// export type SubscriptionModelFilter = Pick<SubscriptionModel, 'id' | 'name' | 'strategy' | 'auto_activate' | 'auto_cancel'> & ResourceFilter


interface SubscriptionModel extends Resource {
	
	readonly type: SubscriptionModelType

	name: string
	strategy?: Nullable<string>
	frequencies: string[]
	auto_activate?: Nullable<boolean>
	auto_cancel?: Nullable<boolean>

	markets?: Nullable<Market[]>
	order_subscriptions?: Nullable<OrderSubscription[]>
	attachments?: Nullable<Attachment[]>

}


interface SubscriptionModelCreate extends ResourceCreate {
	
	name: string
	strategy?: Nullable<string>
	frequencies: string[]
	auto_activate?: Nullable<boolean>
	auto_cancel?: Nullable<boolean>
	
}


interface SubscriptionModelUpdate extends ResourceUpdate {
	
	name?: Nullable<string>
	strategy?: Nullable<string>
	frequencies?: Nullable<string[]>
	auto_activate?: Nullable<boolean>
	auto_cancel?: Nullable<boolean>
	
}


class SubscriptionModels extends ApiResource<SubscriptionModel> {

	static readonly TYPE: SubscriptionModelType = 'subscription_models' as const

	async create(resource: SubscriptionModelCreate, params?: QueryParamsRetrieve<SubscriptionModel>, options?: ResourcesConfig): Promise<SubscriptionModel> {
		return this.resources.create<SubscriptionModelCreate, SubscriptionModel>({ ...resource, type: SubscriptionModels.TYPE }, params, options)
	}

	async update(resource: SubscriptionModelUpdate, params?: QueryParamsRetrieve<SubscriptionModel>, options?: ResourcesConfig): Promise<SubscriptionModel> {
		return this.resources.update<SubscriptionModelUpdate, SubscriptionModel>({ ...resource, type: SubscriptionModels.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: SubscriptionModels.TYPE } : id, options)
	}

	async markets(subscriptionModelId: string | SubscriptionModel, params?: QueryParamsList<Market>, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _subscriptionModelId = (subscriptionModelId as SubscriptionModel).id || subscriptionModelId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `subscription_models/${_subscriptionModelId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async order_subscriptions(subscriptionModelId: string | SubscriptionModel, params?: QueryParamsList<OrderSubscription>, options?: ResourcesConfig): Promise<ListResponse<OrderSubscription>> {
		const _subscriptionModelId = (subscriptionModelId as SubscriptionModel).id || subscriptionModelId as string
		return this.resources.fetch<OrderSubscription>({ type: 'order_subscriptions' }, `subscription_models/${_subscriptionModelId}/order_subscriptions`, params, options) as unknown as ListResponse<OrderSubscription>
	}

	async attachments(subscriptionModelId: string | SubscriptionModel, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _subscriptionModelId = (subscriptionModelId as SubscriptionModel).id || subscriptionModelId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `subscription_models/${_subscriptionModelId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isSubscriptionModel(resource: any): resource is SubscriptionModel {
		return resource.type && (resource.type === SubscriptionModels.TYPE)
	}


	relationship(id: string | ResourceId | null): SubscriptionModelRel {
		return super.relationshipOneToOne<SubscriptionModelRel>(id)
	}

	relationshipToMany(...ids: string[]): SubscriptionModelRel[] {
		return super.relationshipOneToMany<SubscriptionModelRel>(...ids)
	}


	type(): SubscriptionModelType {
		return SubscriptionModels.TYPE
	}

}


export default SubscriptionModels

export type { SubscriptionModel, SubscriptionModelCreate, SubscriptionModelUpdate, SubscriptionModelType }
