import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Order } from './orders'
import type { Event } from './events'
import type { OrderSubscription } from './order_subscriptions'


type RecurringOrderCopyRel = ResourceRel & { type: typeof RecurringOrderCopies.TYPE }
type OrderRel = ResourceRel & { type: 'orders' }
type OrderSubscriptionRel = ResourceRel & { type: 'order_subscriptions' }


interface RecurringOrderCopy extends Resource {
	
	status?: string
	started_at?: string
	completed_at?: string
	failed_at?: string
	errors_log?: object
	errors_count?: number
	place_target_order?: boolean
	reuse_wallet?: boolean

	source_order?: Order
	target_order?: Order
	events?: Event[]
	order_subscription?: OrderSubscription

}


interface RecurringOrderCopyCreate extends ResourceCreate {
	
	place_target_order?: boolean
	reuse_wallet?: boolean

	source_order: OrderRel
	order_subscription: OrderSubscriptionRel

}


type RecurringOrderCopyUpdate = ResourceUpdate


class RecurringOrderCopies extends ApiResource {

	static readonly TYPE: 'recurring_order_copies' = 'recurring_order_copies' as const
	// static readonly PATH = 'recurring_order_copies'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<RecurringOrderCopy>> {
		return this.resources.list<RecurringOrderCopy>({ type: RecurringOrderCopies.TYPE }, params, options)
	}

	async create(resource: RecurringOrderCopyCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<RecurringOrderCopy> {
		return this.resources.create<RecurringOrderCopyCreate, RecurringOrderCopy>({ ...resource, type: RecurringOrderCopies.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<RecurringOrderCopy> {
		return this.resources.retrieve<RecurringOrderCopy>({ type: RecurringOrderCopies.TYPE, id }, params, options)
	}

	async update(resource: RecurringOrderCopyUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<RecurringOrderCopy> {
		return this.resources.update<RecurringOrderCopyUpdate, RecurringOrderCopy>({ ...resource, type: RecurringOrderCopies.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: RecurringOrderCopies.TYPE, id }, options)
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


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isRecurringOrderCopy(resource: any): resource is RecurringOrderCopy {
		return resource.type && (resource.type === RecurringOrderCopies.TYPE)
	}


	relationship(id: string | ResourceId | null): RecurringOrderCopyRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: RecurringOrderCopies.TYPE } : { id: id.id, type: RecurringOrderCopies.TYPE }
	}


	type(): string {
		return RecurringOrderCopies.TYPE
	}

}


export default RecurringOrderCopies

export { RecurringOrderCopy, RecurringOrderCopyCreate, RecurringOrderCopyUpdate }
