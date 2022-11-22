import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Market } from './markets'
import type { Order } from './orders'
import type { Customer } from './customers'
import type { OrderCopy } from './order_copies'
import type { Event } from './events'


type OrderSubscriptionRel = ResourceRel & { type: typeof OrderSubscriptions.TYPE }
type MarketRel = ResourceRel & { type: 'markets' }
type OrderRel = ResourceRel & { type: 'orders' }


interface OrderSubscription extends Resource {
	
	number?: string
	status?: string
	frequency?: string
	activate_by_source_order?: boolean
	customer_email?: string
	starts_at?: string
	expires_at?: string
	next_run_at?: string
	occurrencies?: number
	errors_count?: number
	succeeded_on_last_run?: boolean
	options?: object

	market?: Market
	source_order?: Order
	customer?: Customer
	order_copies?: OrderCopy[]
	orders?: Order[]
	events?: Event[]

}


interface OrderSubscriptionCreate extends ResourceCreate {
	
	frequency: string
	activate_by_source_order?: boolean
	starts_at?: string
	expires_at?: string
	options?: object

	market?: MarketRel
	source_order: OrderRel

}


interface OrderSubscriptionUpdate extends ResourceUpdate {
	
	expires_at?: string
	_activate?: boolean
	_deactivate?: boolean
	_cancel?: boolean
	
}


class OrderSubscriptions extends ApiResource {

	static readonly TYPE: 'order_subscriptions' = 'order_subscriptions' as const
	// static readonly PATH = 'order_subscriptions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderSubscription>> {
		return this.resources.list<OrderSubscription>({ type: OrderSubscriptions.TYPE }, params, options)
	}

	async create(resource: OrderSubscriptionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderSubscription> {
		return this.resources.create<OrderSubscriptionCreate, OrderSubscription>({ ...resource, type: OrderSubscriptions.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderSubscription> {
		return this.resources.retrieve<OrderSubscription>({ type: OrderSubscriptions.TYPE, id }, params, options)
	}

	async update(resource: OrderSubscriptionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderSubscription> {
		return this.resources.update<OrderSubscriptionUpdate, OrderSubscription>({ ...resource, type: OrderSubscriptions.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: OrderSubscriptions.TYPE, id }, options)
	}

	async market(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `order_subscriptions/${_orderSubscriptionId}/market`, params, options) as unknown as Market
	}

	async source_order(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `order_subscriptions/${_orderSubscriptionId}/source_order`, params, options) as unknown as Order
	}

	async customer(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `order_subscriptions/${_orderSubscriptionId}/customer`, params, options) as unknown as Customer
	}

	async order_copies(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderCopy>> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<OrderCopy>({ type: 'order_copies' }, `order_subscriptions/${_orderSubscriptionId}/order_copies`, params, options) as unknown as ListResponse<OrderCopy>
	}

	async orders(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Order>> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `order_subscriptions/${_orderSubscriptionId}/orders`, params, options) as unknown as ListResponse<Order>
	}

	async events(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `order_subscriptions/${_orderSubscriptionId}/events`, params, options) as unknown as ListResponse<Event>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isOrderSubscription(resource: any): resource is OrderSubscription {
		return resource.type && (resource.type === OrderSubscriptions.TYPE)
	}


	relationship(id: string | ResourceId | null): OrderSubscriptionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: OrderSubscriptions.TYPE } : { id: id.id, type: OrderSubscriptions.TYPE }
	}


	type(): string {
		return OrderSubscriptions.TYPE
	}

}


export default OrderSubscriptions

export { OrderSubscription, OrderSubscriptionCreate, OrderSubscriptionUpdate }
