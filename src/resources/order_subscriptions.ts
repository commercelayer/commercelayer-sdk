import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Customer } from './customers'
import type { CustomerPaymentSource, CustomerPaymentSourceType } from './customer_payment_sources'
import type { Event } from './events'
import type { Market, MarketType } from './markets'
import type { OrderFactory } from './order_factories'
import type { OrderSubscriptionItem } from './order_subscription_items'
import type { Order, OrderType } from './orders'
import type { RecurringOrderCopy } from './recurring_order_copies'
import type { SubscriptionModel } from './subscription_models'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'


type OrderSubscriptionType = 'order_subscriptions'
type OrderSubscriptionRel = ResourceRel & { type: OrderSubscriptionType }
type MarketRel = ResourceRel & { type: MarketType }
type OrderRel = ResourceRel & { type: OrderType }
type TagRel = ResourceRel & { type: TagType }
type CustomerPaymentSourceRel = ResourceRel & { type: CustomerPaymentSourceType }


export type OrderSubscriptionSort = Pick<OrderSubscription, 'id' | 'errors_count' | 'expires_at' | 'frequency' | 'last_run_at' | 'next_run_at' | 'number' | 'occurrencies' | 'starts_at' | 'status' | 'succeeded_on_last_run'> & ResourceSort
// export type OrderSubscriptionFilter = Pick<OrderSubscription, 'id' | 'customer_email' | 'errors_count' | 'expires_at' | 'frequency' | 'last_run_at' | 'next_run_at' | 'number' | 'occurrencies' | 'starts_at' | 'status' | 'succeeded_on_last_run'> & ResourceFilter


interface OrderSubscription extends Resource {
	
	readonly type: OrderSubscriptionType

	/** 
	 * Indicates if the subscription will be activated considering the placed source order as its first run.
	 * @example ```"true"```
	 */
	activate_by_source_order?: boolean | null
	/** 
	 * The email address of the customer, if any, associated to the source order.
	 * @example ```"john@example.com"```
	 */
	customer_email?: string | null
	/** 
	 * Indicates the number of subscription errors, if any.
	 * @example ```"3"```
	 */
	errors_count?: number | null
	/** 
	 * The expiration date/time of this subscription (must be after starts_at).
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at?: string | null
	/** 
	 * The frequency of the subscription. Use one of the supported within 'hourly', 'daily', 'weekly', 'monthly', 'two-month', 'three-month', 'four-month', 'six-month', 'yearly', or provide your custom crontab expression (min unit is hour). Must be supported by existing associated subscription_model.
	 * @example ```"monthly"```
	 */
	frequency: string
	/** 
	 * The date/time of the subscription last run.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	last_run_at?: string | null
	/** 
	 * The date/time of the subscription next run. Can be updated but only in the future, to copy with frequency changes.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	next_run_at?: string | null
	/** 
	 * Unique identifier for the subscription (numeric).
	 * @example ```"1234"```
	 */
	number?: string | null
	/** 
	 * The number of times this subscription has run.
	 * @example ```"2"```
	 */
	occurrencies?: number | null
	/** 
	 * Indicates if the subscription created orders are automatically placed at the end of the copy.
	 * @example ```"true"```
	 */
	place_target_order?: boolean | null
	/** 
	 * Indicates the number of hours the renewal alert will be triggered before the subscription next run. Must be included between 1 and 720 hours.
	 * @example ```"1"```
	 */
	renewal_alert_period?: number | null
	/** 
	 * The activation date/time of this subscription.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	starts_at?: string | null
	/** 
	 * The subscription status. One of 'draft' (default), 'inactive', 'active', or 'cancelled'.
	 * @example ```"draft"```
	 */
	status: 'draft' | 'inactive' | 'active' | 'cancelled'
	/** 
	 * Indicates if the subscription has succeeded on its last run.
	 * @example ```"true"```
	 */
	succeeded_on_last_run?: boolean | null

	customer?: Customer | null
	customer_payment_source?: CustomerPaymentSource | null
	events?: Event[] | null
	market?: Market | null
	order_factories?: OrderFactory[] | null
	order_subscription_items?: OrderSubscriptionItem[] | null
	orders?: Order[] | null
	recurring_order_copies?: RecurringOrderCopy[] | null
	source_order?: Order | null
	subscription_model?: SubscriptionModel | null
	tags?: Tag[] | null
	versions?: Version[] | null

}


interface OrderSubscriptionCreate extends ResourceCreate {
	
	/** 
	 * Indicates if the subscription will be activated considering the placed source order as its first run.
	 * @example ```"true"```
	 */
	activate_by_source_order?: boolean | null
	/** 
	 * The expiration date/time of this subscription (must be after starts_at).
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at?: string | null
	/** 
	 * The frequency of the subscription. Use one of the supported within 'hourly', 'daily', 'weekly', 'monthly', 'two-month', 'three-month', 'four-month', 'six-month', 'yearly', or provide your custom crontab expression (min unit is hour). Must be supported by existing associated subscription_model.
	 * @example ```"monthly"```
	 */
	frequency: string
	/** 
	 * Indicates if the subscription created orders are automatically placed at the end of the copy.
	 * @example ```"true"```
	 */
	place_target_order?: boolean | null
	/** 
	 * Indicates the number of hours the renewal alert will be triggered before the subscription next run. Must be included between 1 and 720 hours.
	 * @example ```"1"```
	 */
	renewal_alert_period?: number | null
	/** 
	 * The activation date/time of this subscription.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	starts_at?: string | null

	market?: MarketRel | null
	source_order: OrderRel
	tags?: TagRel[] | null

}


interface OrderSubscriptionUpdate extends ResourceUpdate {
	
	/** 
	 * Send this attribute if you want to mark this subscription as active.
	 * @example ```"true"```
	 */
	_activate?: boolean | null
	/** 
	 * Send this attribute if you want to mark this subscription as cancelled.
	 * @example ```"true"```
	 */
	_cancel?: boolean | null
	/** 
	 * Send this attribute if you want to convert a manual subscription to an automatic one. A subscription model is required before conversion.
	 * @example ```"true"```
	 */
	_convert?: boolean | null
	/** 
	 * Send this attribute if you want to mark this subscription as inactive.
	 * @example ```"true"```
	 */
	_deactivate?: boolean | null
	/** 
	 * Indicates if the subscription will be activated considering the placed source order as its first run.
	 * @example ```"true"```
	 */
	activate_by_source_order?: boolean | null
	/** 
	 * The expiration date/time of this subscription (must be after starts_at).
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at?: string | null
	/** 
	 * The frequency of the subscription. Use one of the supported within 'hourly', 'daily', 'weekly', 'monthly', 'two-month', 'three-month', 'four-month', 'six-month', 'yearly', or provide your custom crontab expression (min unit is hour). Must be supported by existing associated subscription_model.
	 * @example ```"monthly"```
	 */
	frequency?: string | null
	/** 
	 * The date/time of the subscription next run. Can be updated but only in the future, to copy with frequency changes.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	next_run_at?: string | null
	/** 
	 * Indicates if the subscription created orders are automatically placed at the end of the copy.
	 * @example ```"true"```
	 */
	place_target_order?: boolean | null
	/** 
	 * Indicates the number of hours the renewal alert will be triggered before the subscription next run. Must be included between 1 and 720 hours.
	 * @example ```"1"```
	 */
	renewal_alert_period?: number | null

	customer_payment_source?: CustomerPaymentSourceRel | null
	tags?: TagRel[] | null

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

	async customer(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsRetrieve<Customer>, options?: ResourcesConfig): Promise<Customer> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `order_subscriptions/${_orderSubscriptionId}/customer`, params, options) as unknown as Customer
	}

	async customer_payment_source(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsRetrieve<CustomerPaymentSource>, options?: ResourcesConfig): Promise<CustomerPaymentSource> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<CustomerPaymentSource>({ type: 'customer_payment_sources' }, `order_subscriptions/${_orderSubscriptionId}/customer_payment_source`, params, options) as unknown as CustomerPaymentSource
	}

	async events(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `order_subscriptions/${_orderSubscriptionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async market(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `order_subscriptions/${_orderSubscriptionId}/market`, params, options) as unknown as Market
	}

	async order_factories(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsList<OrderFactory>, options?: ResourcesConfig): Promise<ListResponse<OrderFactory>> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<OrderFactory>({ type: 'order_factories' }, `order_subscriptions/${_orderSubscriptionId}/order_factories`, params, options) as unknown as ListResponse<OrderFactory>
	}

	async order_subscription_items(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsList<OrderSubscriptionItem>, options?: ResourcesConfig): Promise<ListResponse<OrderSubscriptionItem>> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<OrderSubscriptionItem>({ type: 'order_subscription_items' }, `order_subscriptions/${_orderSubscriptionId}/order_subscription_items`, params, options) as unknown as ListResponse<OrderSubscriptionItem>
	}

	async orders(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsList<Order>, options?: ResourcesConfig): Promise<ListResponse<Order>> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `order_subscriptions/${_orderSubscriptionId}/orders`, params, options) as unknown as ListResponse<Order>
	}

	async recurring_order_copies(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsList<RecurringOrderCopy>, options?: ResourcesConfig): Promise<ListResponse<RecurringOrderCopy>> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<RecurringOrderCopy>({ type: 'recurring_order_copies' }, `order_subscriptions/${_orderSubscriptionId}/recurring_order_copies`, params, options) as unknown as ListResponse<RecurringOrderCopy>
	}

	async source_order(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `order_subscriptions/${_orderSubscriptionId}/source_order`, params, options) as unknown as Order
	}

	async subscription_model(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsRetrieve<SubscriptionModel>, options?: ResourcesConfig): Promise<SubscriptionModel> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<SubscriptionModel>({ type: 'subscription_models' }, `order_subscriptions/${_orderSubscriptionId}/subscription_model`, params, options) as unknown as SubscriptionModel
	}

	async tags(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `order_subscriptions/${_orderSubscriptionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(orderSubscriptionId: string | OrderSubscription, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _orderSubscriptionId = (orderSubscriptionId as OrderSubscription).id || orderSubscriptionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `order_subscriptions/${_orderSubscriptionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _activate(id: string | OrderSubscription, params?: QueryParamsRetrieve<OrderSubscription>, options?: ResourcesConfig): Promise<OrderSubscription> {
		return this.resources.update<OrderSubscriptionUpdate, OrderSubscription>({ id: (typeof id === 'string')? id: id.id, type: OrderSubscriptions.TYPE, _activate: true }, params, options)
	}

	async _cancel(id: string | OrderSubscription, params?: QueryParamsRetrieve<OrderSubscription>, options?: ResourcesConfig): Promise<OrderSubscription> {
		return this.resources.update<OrderSubscriptionUpdate, OrderSubscription>({ id: (typeof id === 'string')? id: id.id, type: OrderSubscriptions.TYPE, _cancel: true }, params, options)
	}

	async _convert(id: string | OrderSubscription, params?: QueryParamsRetrieve<OrderSubscription>, options?: ResourcesConfig): Promise<OrderSubscription> {
		return this.resources.update<OrderSubscriptionUpdate, OrderSubscription>({ id: (typeof id === 'string')? id: id.id, type: OrderSubscriptions.TYPE, _convert: true }, params, options)
	}

	async _deactivate(id: string | OrderSubscription, params?: QueryParamsRetrieve<OrderSubscription>, options?: ResourcesConfig): Promise<OrderSubscription> {
		return this.resources.update<OrderSubscriptionUpdate, OrderSubscription>({ id: (typeof id === 'string')? id: id.id, type: OrderSubscriptions.TYPE, _deactivate: true }, params, options)
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
