import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { Event } from './events'
import type { OrderSubscription } from './order_subscriptions'


type OrderCopyType = 'order_copies'
type OrderCopyRel = ResourceRel & { type: OrderCopyType }
type OrderRel = ResourceRel & { type: OrderType }


interface OrderCopy extends Resource {
	
	readonly type: OrderCopyType

	status?: 'pending' | 'in_progress' | 'failed' | 'completed' | null
	started_at?: string | null
	completed_at?: string | null
	failed_at?: string | null
	errors_log?: object | null
	errors_count?: number | null
	place_target_order?: boolean | null
	reuse_wallet?: boolean | null
	cancel_source_order?: boolean | null

	source_order?: Order | null
	target_order?: Order | null
	events?: Event[] | null
	order_subscription?: OrderSubscription | null

}


interface OrderCopyCreate extends ResourceCreate {
	
	place_target_order?: boolean | null
	reuse_wallet?: boolean | null
	cancel_source_order?: boolean | null

	source_order: OrderRel

}


type OrderCopyUpdate = ResourceUpdate


class OrderCopies extends ApiResource<OrderCopy> {

	static readonly TYPE: OrderCopyType = 'order_copies' as const

	async create(resource: OrderCopyCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderCopy> {
		return this.resources.create<OrderCopyCreate, OrderCopy>({ ...resource, type: OrderCopies.TYPE }, params, options)
	}

	async update(resource: OrderCopyUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderCopy> {
		return this.resources.update<OrderCopyUpdate, OrderCopy>({ ...resource, type: OrderCopies.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: OrderCopies.TYPE } : id, options)
	}

	async source_order(orderCopyId: string | OrderCopy, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _orderCopyId = (orderCopyId as OrderCopy).id || orderCopyId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `order_copies/${_orderCopyId}/source_order`, params, options) as unknown as Order
	}

	async target_order(orderCopyId: string | OrderCopy, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _orderCopyId = (orderCopyId as OrderCopy).id || orderCopyId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `order_copies/${_orderCopyId}/target_order`, params, options) as unknown as Order
	}

	async events(orderCopyId: string | OrderCopy, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _orderCopyId = (orderCopyId as OrderCopy).id || orderCopyId as string
		return this.resources.fetch<Event>({ type: 'events' }, `order_copies/${_orderCopyId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async order_subscription(orderCopyId: string | OrderCopy, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderSubscription> {
		const _orderCopyId = (orderCopyId as OrderCopy).id || orderCopyId as string
		return this.resources.fetch<OrderSubscription>({ type: 'order_subscriptions' }, `order_copies/${_orderCopyId}/order_subscription`, params, options) as unknown as OrderSubscription
	}


	isOrderCopy(resource: any): resource is OrderCopy {
		return resource.type && (resource.type === OrderCopies.TYPE)
	}


	relationship(id: string | ResourceId | null): OrderCopyRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: OrderCopies.TYPE } : { id: id.id, type: OrderCopies.TYPE }
	}


	type(): OrderCopyType {
		return OrderCopies.TYPE
	}

}


export default OrderCopies

export type { OrderCopy, OrderCopyCreate, OrderCopyUpdate, OrderCopyType }
