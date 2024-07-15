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

	/** 
	 * The subscription model's internal name.
	 * @example ```"EU Subscription Model"```
	 */
	name: string
	/** 
	 * The subscription model's strategy used to generate order subscriptions: one between 'by_frequency' (default) and 'by_line_items'.
	 * @example ```"by_frequency"```
	 */
	strategy?: string | null
	/** 
	 * An object that contains the frequencies available for this subscription model. Supported ones are 'hourly', 'daily', 'weekly', 'monthly', 'two-month', 'three-month', 'four-month', 'six-month', 'yearly', or your custom crontab expression (min unit is hour).
	 * @example ```"hourly,10 * * * *,weekly,monthly,two-month"```
	 */
	frequencies: string[]
	/** 
	 * Indicates if the created subscriptions will be activated considering the placed source order as its first run, default to true.
	 * @example ```"true"```
	 */
	auto_activate?: boolean | null
	/** 
	 * Indicates if the created subscriptions will be cancelled in case the source order is cancelled, default to false.
	 */
	auto_cancel?: boolean | null

	markets?: Market[] | null
	order_subscriptions?: OrderSubscription[] | null
	attachments?: Attachment[] | null

}


interface SubscriptionModelCreate extends ResourceCreate {
	
	/** 
	 * The subscription model's internal name.
	 * @example ```"EU Subscription Model"```
	 */
	name: string
	/** 
	 * The subscription model's strategy used to generate order subscriptions: one between 'by_frequency' (default) and 'by_line_items'.
	 * @example ```"by_frequency"```
	 */
	strategy?: string | null
	/** 
	 * An object that contains the frequencies available for this subscription model. Supported ones are 'hourly', 'daily', 'weekly', 'monthly', 'two-month', 'three-month', 'four-month', 'six-month', 'yearly', or your custom crontab expression (min unit is hour).
	 * @example ```"hourly,10 * * * *,weekly,monthly,two-month"```
	 */
	frequencies: string[]
	/** 
	 * Indicates if the created subscriptions will be activated considering the placed source order as its first run, default to true.
	 * @example ```"true"```
	 */
	auto_activate?: boolean | null
	/** 
	 * Indicates if the created subscriptions will be cancelled in case the source order is cancelled, default to false.
	 */
	auto_cancel?: boolean | null
	
}


interface SubscriptionModelUpdate extends ResourceUpdate {
	
	/** 
	 * The subscription model's internal name.
	 * @example ```"EU Subscription Model"```
	 */
	name?: string | null
	/** 
	 * The subscription model's strategy used to generate order subscriptions: one between 'by_frequency' (default) and 'by_line_items'.
	 * @example ```"by_frequency"```
	 */
	strategy?: string | null
	/** 
	 * An object that contains the frequencies available for this subscription model. Supported ones are 'hourly', 'daily', 'weekly', 'monthly', 'two-month', 'three-month', 'four-month', 'six-month', 'yearly', or your custom crontab expression (min unit is hour).
	 * @example ```"hourly,10 * * * *,weekly,monthly,two-month"```
	 */
	frequencies?: string[] | null
	/** 
	 * Indicates if the created subscriptions will be activated considering the placed source order as its first run, default to true.
	 * @example ```"true"```
	 */
	auto_activate?: boolean | null
	/** 
	 * Indicates if the created subscriptions will be cancelled in case the source order is cancelled, default to false.
	 */
	auto_cancel?: boolean | null
	
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
