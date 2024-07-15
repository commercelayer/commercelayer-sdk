import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { Event } from './events'
import type { OrderSubscription } from './order_subscriptions'


type OrderCopyType = 'order_copies'
type OrderCopyRel = ResourceRel & { type: OrderCopyType }
type OrderRel = ResourceRel & { type: OrderType }


export type OrderCopySort = Pick<OrderCopy, 'id' | 'status' | 'started_at' | 'completed_at' | 'failed_at' | 'errors_count'> & ResourceSort
// export type OrderCopyFilter = Pick<OrderCopy, 'id' | 'status' | 'started_at' | 'completed_at' | 'failed_at' | 'errors_count'> & ResourceFilter


interface OrderCopy extends Resource {
	
	readonly type: OrderCopyType

	/** 
	 * The order factory status. One of 'pending' (default), 'in_progress', 'failed', or 'completed'.
	 * @example ```"in_progress"```
	 */
	status: 'pending' | 'in_progress' | 'failed' | 'completed'
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
	 * @example ```"[object Object]"```
	 */
	errors_log?: Record<string, any> | null
	/** 
	 * Indicates the number of copy errors, if any.
	 * @example ```"2"```
	 */
	errors_count?: number | null
	/** 
	 * Indicates if the target order must be placed upon copy.
	 * @example ```"true"```
	 */
	place_target_order?: boolean | null
	/** 
	 * Indicates if the payment source within the source order customer's wallet must be copied.
	 * @example ```"true"```
	 */
	reuse_wallet?: boolean | null
	/** 
	 * Indicates if the source order must be cancelled upon copy.
	 * @example ```"true"```
	 */
	cancel_source_order?: boolean | null

	source_order?: Order | null
	target_order?: Order | null
	events?: Event[] | null
	order_subscription?: OrderSubscription | null

}


interface OrderCopyCreate extends ResourceCreate {
	
	/** 
	 * Indicates if the target order must be placed upon copy.
	 * @example ```"true"```
	 */
	place_target_order?: boolean | null
	/** 
	 * Indicates if the payment source within the source order customer's wallet must be copied.
	 * @example ```"true"```
	 */
	reuse_wallet?: boolean | null
	/** 
	 * Indicates if the source order must be cancelled upon copy.
	 * @example ```"true"```
	 */
	cancel_source_order?: boolean | null

	source_order: OrderRel

}


type OrderCopyUpdate = ResourceUpdate


class OrderCopies extends ApiResource<OrderCopy> {

	static readonly TYPE: OrderCopyType = 'order_copies' as const

	async create(resource: OrderCopyCreate, params?: QueryParamsRetrieve<OrderCopy>, options?: ResourcesConfig): Promise<OrderCopy> {
		return this.resources.create<OrderCopyCreate, OrderCopy>({ ...resource, type: OrderCopies.TYPE }, params, options)
	}

	async update(resource: OrderCopyUpdate, params?: QueryParamsRetrieve<OrderCopy>, options?: ResourcesConfig): Promise<OrderCopy> {
		return this.resources.update<OrderCopyUpdate, OrderCopy>({ ...resource, type: OrderCopies.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: OrderCopies.TYPE } : id, options)
	}

	async source_order(orderCopyId: string | OrderCopy, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _orderCopyId = (orderCopyId as OrderCopy).id || orderCopyId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `order_copies/${_orderCopyId}/source_order`, params, options) as unknown as Order
	}

	async target_order(orderCopyId: string | OrderCopy, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _orderCopyId = (orderCopyId as OrderCopy).id || orderCopyId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `order_copies/${_orderCopyId}/target_order`, params, options) as unknown as Order
	}

	async events(orderCopyId: string | OrderCopy, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _orderCopyId = (orderCopyId as OrderCopy).id || orderCopyId as string
		return this.resources.fetch<Event>({ type: 'events' }, `order_copies/${_orderCopyId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async order_subscription(orderCopyId: string | OrderCopy, params?: QueryParamsRetrieve<OrderSubscription>, options?: ResourcesConfig): Promise<OrderSubscription> {
		const _orderCopyId = (orderCopyId as OrderCopy).id || orderCopyId as string
		return this.resources.fetch<OrderSubscription>({ type: 'order_subscriptions' }, `order_copies/${_orderCopyId}/order_subscription`, params, options) as unknown as OrderSubscription
	}


	isOrderCopy(resource: any): resource is OrderCopy {
		return resource.type && (resource.type === OrderCopies.TYPE)
	}


	relationship(id: string | ResourceId | null): OrderCopyRel {
		return super.relationshipOneToOne<OrderCopyRel>(id)
	}

	relationshipToMany(...ids: string[]): OrderCopyRel[] {
		return super.relationshipOneToMany<OrderCopyRel>(...ids)
	}


	type(): OrderCopyType {
		return OrderCopies.TYPE
	}

}


export default OrderCopies

export type { OrderCopy, OrderCopyCreate, OrderCopyUpdate, OrderCopyType }
