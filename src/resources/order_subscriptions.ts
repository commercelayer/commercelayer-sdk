/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Market } from './markets'
import { Order } from './orders'
import { OrderCopy } from './order_copies'


type OrderSubscriptionRel = ResourceId & { type: typeof OrderSubscriptions.TYPE }
type MarketRel = ResourceId & { type: 'markets' }
type OrderRel = ResourceId & { type: 'orders' }


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
	order_copies?: OrderCopy[]
	orders?: Order[]

}


interface OrderSubscriptionCreate extends ResourceCreate {
	
	frequency?: string
	activate_by_source_order?: boolean
	starts_at: string
	expires_at?: string
	options?: object

	market?: MarketRel
	source_order?: OrderRel

}


interface OrderSubscriptionUpdate extends ResourceUpdate {
	
	expires_at?: string
	_activate?: boolean
	_deactivate?: boolean
	_cancel?: boolean
	
}


class OrderSubscriptions extends ApiResource {

	static readonly TYPE: 'order_subscriptions' = 'order_subscriptions'
	// static readonly PATH = 'order_subscriptions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderSubscription>> {
		return this.resources.list({ type: OrderSubscriptions.TYPE }, params, options)
	}

	async create(resource: OrderSubscriptionCreate, options?: ResourcesConfig): Promise<OrderSubscription> {
		return this.resources.create(Object.assign(resource, { type: OrderSubscriptions.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderSubscription> {
		return this.resources.retrieve<OrderSubscription>({ type: OrderSubscriptions.TYPE, id }, params, options)
	}

	async update(resource: OrderSubscriptionUpdate, options?: ResourcesConfig): Promise<OrderSubscription> {
		return this.resources.update({ ...resource, type: OrderSubscriptions.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: OrderSubscriptions.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isOrderSubscription(resource: any): resource is OrderSubscription {
		return resource.type && (resource.type === OrderSubscriptions.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(OrderSubscriptions.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(OrderSubscriptions.TYPE)
	}
	*/

	relationship(id: string | ResourceId): OrderSubscriptionRel {
		return (typeof id === 'string') ? { id, type: OrderSubscriptions.TYPE } : {id: id.id, type: OrderSubscriptions.TYPE }
	}

}


export default OrderSubscriptions

export { OrderSubscription, OrderSubscriptionCreate, OrderSubscriptionUpdate }
