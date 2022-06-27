import { ApiResource, Resource, ResourceCreate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Order } from './orders'
import type { OrderSubscription } from './order_subscriptions'
import type { Event } from './events'


type OrderCopyRel = ResourceRel & { type: typeof OrderCopies.TYPE }
type OrderRel = ResourceRel & { type: 'orders' }


interface OrderCopy extends Resource {
	
	status?: string
	started_at?: string
	completed_at?: string
	failed_at?: string
	place_target_order?: boolean
	cancel_source_order?: boolean
	reuse_wallet?: boolean
	errors_log?: object
	errors_count?: number

	source_order?: Order
	target_order?: Order
	order_subscription?: OrderSubscription
	events?: Event[]

}


interface OrderCopyCreate extends ResourceCreate {
	
	place_target_order?: boolean
	cancel_source_order?: boolean
	reuse_wallet?: boolean

	source_order: OrderRel

}


class OrderCopies extends ApiResource {

	static readonly TYPE: 'order_copies' = 'order_copies'
	// static readonly PATH = 'order_copies'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderCopy>> {
		return this.resources.list<OrderCopy>({ type: OrderCopies.TYPE }, params, options)
	}

	async create(resource: OrderCopyCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderCopy> {
		return this.resources.create<OrderCopyCreate, OrderCopy>({ ...resource, type: OrderCopies.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderCopy> {
		return this.resources.retrieve<OrderCopy>({ type: OrderCopies.TYPE, id }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: OrderCopies.TYPE, id }, options)
	}

	async source_order(orderCopyId: string | OrderCopy, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _orderCopyId = (orderCopyId as OrderCopy).id || orderCopyId
		return this.resources.fetch<Order>({ type: 'orders' }, `order_copies/${_orderCopyId}/source_order`, params, options) as unknown as Order
	}

	async target_order(orderCopyId: string | OrderCopy, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _orderCopyId = (orderCopyId as OrderCopy).id || orderCopyId
		return this.resources.fetch<Order>({ type: 'orders' }, `order_copies/${_orderCopyId}/target_order`, params, options) as unknown as Order
	}

	async order_subscription(orderCopyId: string | OrderCopy, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderSubscription> {
		const _orderCopyId = (orderCopyId as OrderCopy).id || orderCopyId
		return this.resources.fetch<OrderSubscription>({ type: 'order_subscriptions' }, `order_copies/${_orderCopyId}/order_subscription`, params, options) as unknown as OrderSubscription
	}

	async events(orderCopyId: string | OrderCopy, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _orderCopyId = (orderCopyId as OrderCopy).id || orderCopyId
		return this.resources.fetch<Event>({ type: 'events' }, `order_copies/${_orderCopyId}/events`, params, options) as unknown as ListResponse<Event>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isOrderCopy(resource: any): resource is OrderCopy {
		return resource.type && (resource.type === OrderCopies.TYPE)
	}


	relationship(id: string | ResourceId | null): OrderCopyRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: OrderCopies.TYPE } : { id: id.id, type: OrderCopies.TYPE }
	}


	type(): string {
		return OrderCopies.TYPE
	}

}


export default OrderCopies

export { OrderCopy, OrderCopyCreate }
