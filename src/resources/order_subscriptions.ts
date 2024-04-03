import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { SubscriptionModel } from './subscription_models'
import type { Order, OrderType } from './orders'
import type { Customer } from './customers'
import type { CustomerPaymentSource, CustomerPaymentSourceType } from './customer_payment_sources'
import type { OrderSubscriptionItem } from './order_subscription_items'
import type { OrderFactory } from './order_factories'
import type { RecurringOrderCopy } from './recurring_order_copies'
import type { Event } from './events'
import type { Version } from './versions'


type OrderSubscriptionType = 'order_subscriptions'
type OrderSubscriptionRel = ResourceRel & { type: OrderSubscriptionType }
type MarketRel = ResourceRel & { type: MarketType }
type OrderRel = ResourceRel & { type: OrderType }
type CustomerPaymentSourceRel = ResourceRel & { type: CustomerPaymentSourceType }


export type OrderSubscriptionSort = Pick<OrderSubscription, 'id' | 'number' | 'status' | 'frequency' | 'starts_at' | 'expires_at' | 'last_run_at' | 'next_run_at' | 'occurrencies' | 'errors_count' | 'succeeded_on_last_run'> & ResourceSort
// export type OrderSubscriptionFilter = Pick<OrderSubscription, 'id' | 'number' | 'status' | 'frequency' | 'customer_email' | 'starts_at' | 'expires_at' | 'last_run_at' | 'next_run_at' | 'occurrencies' | 'errors_count' | 'succeeded_on_last_run'> & ResourceFilter


interface OrderSubscription extends Resource {
	
	readonly type: OrderSubscriptionType

	number?: Nullable<string>
	status: 'draft' | 'inactive' | 'active' | 'cancelled'
	frequency: string
	activate_by_source_order?: Nullable<boolean>
	place_target_order?: Nullable<boolean>
	customer_email?: Nullable<string>
	starts_at?: Nullable<string>
	expires_at?: Nullable<string>
	last_run_at?: Nullable<string>
	next_run_at?: Nullable<string>
	occurrencies?: Nullable<number>
	errors_count?: Nullable<number>
	succeeded_on_last_run?: Nullable<boolean>

	market?: Nullable<Market>
	subscription_model?: Nullable<SubscriptionModel>
	source_order?: Nullable<Order>
	customer?: Nullable<Customer>
	customer_payment_source?: Nullable<CustomerPaymentSource>
	order_subscription_items?: Nullable<OrderSubscriptionItem[]>
	order_factories?: Nullable<OrderFactory[]>
	recurring_order_copies?: Nullable<RecurringOrderCopy[]>
	orders?: Nullable<Order[]>
	events?: Nullable<Event[]>
	versions?: Nullable<Version[]>

}


interface OrderSubscriptionCreate extends ResourceCreate {
	
	frequency: string
	activate_by_source_order?: Nullable<boolean>
	place_target_order?: Nullable<boolean>
	starts_at?: Nullable<string>
	expires_at?: Nullable<string>

	market?: Nullable<MarketRel>
	source_order: OrderRel

}


interface OrderSubscriptionUpdate extends ResourceUpdate {
	
	frequency?: Nullable<string>
	activate_by_source_order?: Nullable<boolean>
	place_target_order?: Nullable<boolean>
	expires_at?: Nullable<string>
	next_run_at?: Nullable<string>
	_activate?: Nullable<boolean>
	_deactivate?: Nullable<boolean>
	_cancel?: Nullable<boolean>

	customer_payment_source?: Nullable<CustomerPaymentSourceRel>

}


class OrderSubscriptions extends ApiResource<OrderSubscription> {

	static readonly TYPE: OrderSubscriptionType = 'order_subscriptions' as const

	async create(resource: OrderSubscriptionCreate, params?: QueryParamsRetrieve<OrderSubscription>, options?: ResourcesConfig): Promise<OrderSubscription> {
		return this.resources.create<OrderSubscriptionCreate, OrderSubscription>({ ...resource, type: OrderSubscriptions.TYPE }, params, options)
	}

	async update(resource: OrderSubscriptionUpdate, params?: QueryParamsRetrieve<OrderSubscription>, options?: ResourcesConfig): Promise<OrderSubscription> {
		return this.resources.update<OrderSubscriptionUpdate, OrderSubscription>({ ...resource, type: OrderSubscriptions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: OrderSubscriptions.TYPE } : id, options)
	}

	async market(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `order_subscriptions/${_orderSubscriptionId}/market`, params, options) as unknown as Market
	}

	async subscription_model(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsRetrieve<SubscriptionModel>, options?: ResourcesConfig): Promise<SubscriptionModel> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<SubscriptionModel>({ type: 'subscription_models' }, `order_subscriptions/${_orderSubscriptionId}/subscription_model`, params, options) as unknown as SubscriptionModel
	}

	async source_order(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `order_subscriptions/${_orderSubscriptionId}/source_order`, params, options) as unknown as Order
	}

	async customer(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsRetrieve<Customer>, options?: ResourcesConfig): Promise<Customer> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `order_subscriptions/${_orderSubscriptionId}/customer`, params, options) as unknown as Customer
	}

	async customer_payment_source(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsRetrieve<CustomerPaymentSource>, options?: ResourcesConfig): Promise<CustomerPaymentSource> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<CustomerPaymentSource>({ type: 'customer_payment_sources' }, `order_subscriptions/${_orderSubscriptionId}/customer_payment_source`, params, options) as unknown as CustomerPaymentSource
	}

	async order_subscription_items(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsList<OrderSubscriptionItem>, options?: ResourcesConfig): Promise<ListResponse<OrderSubscriptionItem>> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<OrderSubscriptionItem>({ type: 'order_subscription_items' }, `order_subscriptions/${_orderSubscriptionId}/order_subscription_items`, params, options) as unknown as ListResponse<OrderSubscriptionItem>
	}

	async order_factories(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsList<OrderFactory>, options?: ResourcesConfig): Promise<ListResponse<OrderFactory>> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<OrderFactory>({ type: 'order_factories' }, `order_subscriptions/${_orderSubscriptionId}/order_factories`, params, options) as unknown as ListResponse<OrderFactory>
	}

	async recurring_order_copies(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsList<RecurringOrderCopy>, options?: ResourcesConfig): Promise<ListResponse<RecurringOrderCopy>> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<RecurringOrderCopy>({ type: 'recurring_order_copies' }, `order_subscriptions/${_orderSubscriptionId}/recurring_order_copies`, params, options) as unknown as ListResponse<RecurringOrderCopy>
	}

	async orders(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsList<Order>, options?: ResourcesConfig): Promise<ListResponse<Order>> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `order_subscriptions/${_orderSubscriptionId}/orders`, params, options) as unknown as ListResponse<Order>
	}

	async events(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `order_subscriptions/${_orderSubscriptionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `order_subscriptions/${_orderSubscriptionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _activate(id: string | OrderSubscription, params?: QueryParamsRetrieve<OrderSubscription>, options?: ResourcesConfig): Promise<OrderSubscription> {
		return this.resources.update<OrderSubscriptionUpdate, OrderSubscription>({ id: (typeof id === 'string')? id: id.id, type: OrderSubscriptions.TYPE, _activate: true }, params, options)
	}

	async _deactivate(id: string | OrderSubscription, params?: QueryParamsRetrieve<OrderSubscription>, options?: ResourcesConfig): Promise<OrderSubscription> {
		return this.resources.update<OrderSubscriptionUpdate, OrderSubscription>({ id: (typeof id === 'string')? id: id.id, type: OrderSubscriptions.TYPE, _deactivate: true }, params, options)
	}

	async _cancel(id: string | OrderSubscription, params?: QueryParamsRetrieve<OrderSubscription>, options?: ResourcesConfig): Promise<OrderSubscription> {
		return this.resources.update<OrderSubscriptionUpdate, OrderSubscription>({ id: (typeof id === 'string')? id: id.id, type: OrderSubscriptions.TYPE, _cancel: true }, params, options)
	}


	isOrderSubscription(resource: any): resource is OrderSubscription {
		return resource.type && (resource.type === OrderSubscriptions.TYPE)
	}


	relationship(id: string | ResourceId | null): OrderSubscriptionRel {
		return super.relationshipOneToOne<OrderSubscriptionRel>(id)
	}

	relationshipToMany(...ids: string[]): OrderSubscriptionRel[] {
		return super.relationshipOneToMany<OrderSubscriptionRel>(...ids)
	}


	type(): OrderSubscriptionType {
		return OrderSubscriptions.TYPE
	}

}


export default OrderSubscriptions

export type { OrderSubscription, OrderSubscriptionCreate, OrderSubscriptionUpdate, OrderSubscriptionType }
