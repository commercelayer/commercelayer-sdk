import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { Event } from './events'
import type { OrderSubscription, OrderSubscriptionType } from './order_subscriptions'


type RecurringOrderCopyType = 'recurring_order_copies'
type RecurringOrderCopyRel = ResourceRel & { type: RecurringOrderCopyType }
type OrderRel = ResourceRel & { type: OrderType }
type OrderSubscriptionRel = ResourceRel & { type: OrderSubscriptionType }


interface RecurringOrderCopy extends Resource {
	
	readonly type: RecurringOrderCopyType

	status: 'pending' | 'in_progress' | 'failed' | 'completed'
	started_at?: string | null
	completed_at?: string | null
	failed_at?: string | null
	errors_log?: Record<string, any> | null
	errors_count?: number | null
	place_target_order?: boolean | null
	reuse_wallet?: boolean | null

	source_order?: Order | null
	target_order?: Order | null
	events?: Event[] | null
	order_subscription?: OrderSubscription | null

}


interface RecurringOrderCopyCreate extends ResourceCreate {
	
	place_target_order?: boolean | null
	reuse_wallet?: boolean | null

	source_order: OrderRel
	order_subscription: OrderSubscriptionRel

}


type RecurringOrderCopyUpdate = ResourceUpdate


class RecurringOrderCopies extends ApiResource<RecurringOrderCopy> {

	static readonly TYPE: RecurringOrderCopyType = 'recurring_order_copies' as const

	async create(resource: RecurringOrderCopyCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<RecurringOrderCopy> {
		return this.resources.create<RecurringOrderCopyCreate, RecurringOrderCopy>({ ...resource, type: RecurringOrderCopies.TYPE }, params, options)
	}

	async update(resource: RecurringOrderCopyUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<RecurringOrderCopy> {
		return this.resources.update<RecurringOrderCopyUpdate, RecurringOrderCopy>({ ...resource, type: RecurringOrderCopies.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: RecurringOrderCopies.TYPE } : id, options)
	}

	async source_order(recurringOrderCopyId: string | RecurringOrderCopy, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _recurringOrderCopyId = (recurringOrderCopyId as RecurringOrderCopy).id || recurringOrderCopyId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `recurring_order_copies/${_recurringOrderCopyId}/source_order`, params, options) as unknown as Order
	}

	async target_order(recurringOrderCopyId: string | RecurringOrderCopy, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _recurringOrderCopyId = (recurringOrderCopyId as RecurringOrderCopy).id || recurringOrderCopyId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `recurring_order_copies/${_recurringOrderCopyId}/target_order`, params, options) as unknown as Order
	}

	async events(recurringOrderCopyId: string | RecurringOrderCopy, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _recurringOrderCopyId = (recurringOrderCopyId as RecurringOrderCopy).id || recurringOrderCopyId as string
		return this.resources.fetch<Event>({ type: 'events' }, `recurring_order_copies/${_recurringOrderCopyId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async order_subscription(recurringOrderCopyId: string | RecurringOrderCopy, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderSubscription> {
		const _recurringOrderCopyId = (recurringOrderCopyId as RecurringOrderCopy).id || recurringOrderCopyId as string
		return this.resources.fetch<OrderSubscription>({ type: 'order_subscriptions' }, `recurring_order_copies/${_recurringOrderCopyId}/order_subscription`, params, options) as unknown as OrderSubscription
	}


	isRecurringOrderCopy(resource: any): resource is RecurringOrderCopy {
		return resource.type && (resource.type === RecurringOrderCopies.TYPE)
	}


	relationship(id: string | ResourceId | null): RecurringOrderCopyRel {
		return super.relationshipOneToOne<RecurringOrderCopyRel>(id)
	}

	relationshipToMany(...ids: string[]): RecurringOrderCopyRel[] {
		return super.relationshipOneToMany<RecurringOrderCopyRel>(...ids)
	}


	type(): RecurringOrderCopyType {
		return RecurringOrderCopies.TYPE
	}

}


export default RecurringOrderCopies

export type { RecurringOrderCopy, RecurringOrderCopyCreate, RecurringOrderCopyUpdate, RecurringOrderCopyType }
