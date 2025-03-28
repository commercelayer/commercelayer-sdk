import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { Event } from './events'
import type { OrderSubscription, OrderSubscriptionType } from './order_subscriptions'


type RecurringOrderCopyType = 'recurring_order_copies'
type RecurringOrderCopyRel = ResourceRel & { type: RecurringOrderCopyType }
type OrderRel = ResourceRel & { type: OrderType }
type OrderSubscriptionRel = ResourceRel & { type: OrderSubscriptionType }


export type RecurringOrderCopySort = Pick<RecurringOrderCopy, 'id' | 'status' | 'started_at' | 'completed_at' | 'failed_at' | 'errors_count'> & ResourceSort
// export type RecurringOrderCopyFilter = Pick<RecurringOrderCopy, 'id' | 'status' | 'started_at' | 'completed_at' | 'failed_at' | 'errors_count'> & ResourceFilter


interface RecurringOrderCopy extends Resource {
	
	readonly type: RecurringOrderCopyType

	/** 
	 * The order factory status. One of 'pending' (default), 'in_progress', 'aborted', 'failed', or 'completed'.
	 * @example ```"in_progress"```
	 */
	status: 'pending' | 'in_progress' | 'aborted' | 'failed' | 'completed'
	/** 
	 * Time at which the order copy was started.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	started_at?: string | null
	/** 
	 * Time at which the order copy was completed.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	completed_at?: string | null
	/** 
	 * Time at which the order copy has failed.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	failed_at?: string | null
	/** 
	 * Contains the order copy errors, if any.
	 * @example ```{"status":["cannot transition from draft to placed"]}```
	 */
	errors_log?: Record<string, any> | null
	/** 
	 * Indicates the number of copy errors, if any.
	 * @example ```2```
	 */
	errors_count?: number | null
	/** 
	 * Indicates if the target order must be placed upon copy.
	 * @example ```true```
	 */
	place_target_order?: boolean | null
	/** 
	 * Indicates if the payment source within the source order customer's wallet must be copied.
	 * @example ```true```
	 */
	reuse_wallet?: boolean | null

	source_order?: Order | null
	target_order?: Order | null
	events?: Event[] | null
	order_subscription?: OrderSubscription | null

}


interface RecurringOrderCopyCreate extends ResourceCreate {
	
	/** 
	 * Indicates if the target order must be placed upon copy.
	 * @example ```true```
	 */
	place_target_order?: boolean | null
	/** 
	 * Indicates if the payment source within the source order customer's wallet must be copied.
	 * @example ```true```
	 */
	reuse_wallet?: boolean | null

	source_order: OrderRel
	order_subscription: OrderSubscriptionRel

}


type RecurringOrderCopyUpdate = ResourceUpdate


class RecurringOrderCopies extends ApiResource<RecurringOrderCopy> {

	static readonly TYPE: RecurringOrderCopyType = 'recurring_order_copies' as const

	async create(resource: RecurringOrderCopyCreate, params?: QueryParamsRetrieve<RecurringOrderCopy>, options?: ResourcesConfig): Promise<RecurringOrderCopy> {
		return this.resources.create<RecurringOrderCopyCreate, RecurringOrderCopy>({ ...resource, type: RecurringOrderCopies.TYPE }, params, options)
	}

	async update(resource: RecurringOrderCopyUpdate, params?: QueryParamsRetrieve<RecurringOrderCopy>, options?: ResourcesConfig): Promise<RecurringOrderCopy> {
		return this.resources.update<RecurringOrderCopyUpdate, RecurringOrderCopy>({ ...resource, type: RecurringOrderCopies.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: RecurringOrderCopies.TYPE } : id, options)
	}

	async source_order(recurringOrderCopyId: string | RecurringOrderCopy, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _recurringOrderCopyId = (recurringOrderCopyId as RecurringOrderCopy).id || recurringOrderCopyId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `recurring_order_copies/${_recurringOrderCopyId}/source_order`, params, options) as unknown as Order
	}

	async target_order(recurringOrderCopyId: string | RecurringOrderCopy, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _recurringOrderCopyId = (recurringOrderCopyId as RecurringOrderCopy).id || recurringOrderCopyId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `recurring_order_copies/${_recurringOrderCopyId}/target_order`, params, options) as unknown as Order
	}

	async events(recurringOrderCopyId: string | RecurringOrderCopy, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _recurringOrderCopyId = (recurringOrderCopyId as RecurringOrderCopy).id || recurringOrderCopyId as string
		return this.resources.fetch<Event>({ type: 'events' }, `recurring_order_copies/${_recurringOrderCopyId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async order_subscription(recurringOrderCopyId: string | RecurringOrderCopy, params?: QueryParamsRetrieve<OrderSubscription>, options?: ResourcesConfig): Promise<OrderSubscription> {
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


const instance = new RecurringOrderCopies()
export default instance

export type { RecurringOrderCopy, RecurringOrderCopyCreate, RecurringOrderCopyUpdate, RecurringOrderCopyType }
