import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketSortable } from './markets'
import type { OrderSubscription, OrderSubscriptionSortable } from './order_subscriptions'
import type { Attachment, AttachmentSortable } from './attachments'


type SubscriptionModelType = 'subscription_models'
type SubscriptionModelRel = ResourceRel & { type: SubscriptionModelType }


export type SubscriptionModelSortable = Pick<SubscriptionModel, 'id' | 'name' | 'strategy'> & ResourceSortable
export type SubscriptionModelFilterable = Pick<SubscriptionModel, 'id' | 'name' | 'strategy' | 'auto_activate' | 'auto_cancel'> & ResourceFilterable


interface SubscriptionModel extends Resource {
	
	readonly type: SubscriptionModelType

	name: string
	strategy?: string | null
	frequencies: string[]
	auto_activate?: boolean | null
	auto_cancel?: boolean | null

	markets?: Market[] | null
	order_subscriptions?: OrderSubscription[] | null
	attachments?: Attachment[] | null

}


interface SubscriptionModelCreate extends ResourceCreate {
	
	name: string
	strategy?: string | null
	frequencies: string[]
	auto_activate?: boolean | null
	auto_cancel?: boolean | null
	
}


interface SubscriptionModelUpdate extends ResourceUpdate {
	
	name?: string | null
	strategy?: string | null
	frequencies?: string[] | null
	auto_activate?: boolean | null
	auto_cancel?: boolean | null
	
}


class SubscriptionModels extends ApiResource<SubscriptionModel, SubscriptionModelSortable> {

	static readonly TYPE: SubscriptionModelType = 'subscription_models' as const

	async create(resource: SubscriptionModelCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SubscriptionModel> {
		return this.resources.create<SubscriptionModelCreate, SubscriptionModel>({ ...resource, type: SubscriptionModels.TYPE }, params, options)
	}

	async update(resource: SubscriptionModelUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SubscriptionModel> {
		return this.resources.update<SubscriptionModelUpdate, SubscriptionModel>({ ...resource, type: SubscriptionModels.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: SubscriptionModels.TYPE } : id, options)
	}

	async markets(subscriptionModelId: string | SubscriptionModel, params?: QueryParamsList<MarketSortable>, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _subscriptionModelId = (subscriptionModelId as SubscriptionModel).id || subscriptionModelId as string
		return this.resources.fetch<Market, MarketSortable>({ type: 'markets' }, `subscription_models/${_subscriptionModelId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async order_subscriptions(subscriptionModelId: string | SubscriptionModel, params?: QueryParamsList<OrderSubscriptionSortable>, options?: ResourcesConfig): Promise<ListResponse<OrderSubscription>> {
		const _subscriptionModelId = (subscriptionModelId as SubscriptionModel).id || subscriptionModelId as string
		return this.resources.fetch<OrderSubscription, OrderSubscriptionSortable>({ type: 'order_subscriptions' }, `subscription_models/${_subscriptionModelId}/order_subscriptions`, params, options) as unknown as ListResponse<OrderSubscription>
	}

	async attachments(subscriptionModelId: string | SubscriptionModel, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _subscriptionModelId = (subscriptionModelId as SubscriptionModel).id || subscriptionModelId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `subscription_models/${_subscriptionModelId}/attachments`, params, options) as unknown as ListResponse<Attachment>
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

/*
export const SubscriptionModelsClient = (init: ResourceAdapter | ResourcesInitConfig): SubscriptionModels => {
	return new SubscriptionModels((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
