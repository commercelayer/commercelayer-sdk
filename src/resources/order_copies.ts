/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Order } from './orders'
import { OrderSubscription } from './order_subscriptions'


type OrderCopyRel = ResourceId & { type: typeof OrderCopies.TYPE }
type OrderRel = ResourceId & { type: 'orders' }


interface OrderCopy extends Resource {
	
	status?: string
	started_at?: string
	completed_at?: string
	failed_at?: string
	place_target_order?: boolean
	cancel_source_order?: boolean
	errors_log?: object[]
	errors_count?: number

	source_order?: Order
	target_order?: Order
	order_subscription?: OrderSubscription

}


interface OrderCopyCreate extends ResourceCreate {
	
	place_target_order?: boolean
	cancel_source_order?: boolean

	source_order?: OrderRel

}


class OrderCopies extends ApiResource {

	static readonly TYPE: 'order_copies' = 'order_copies'
	// static readonly PATH = 'order_copies'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderCopy>> {
		return this.resources.list({ type: OrderCopies.TYPE }, params, options)
	}

	async create(resource: OrderCopyCreate, options?: ResourcesConfig): Promise<OrderCopy> {
		return this.resources.create(Object.assign(resource, { type: OrderCopies.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderCopy> {
		return this.resources.retrieve<OrderCopy>({ type: OrderCopies.TYPE, id }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: OrderCopies.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isOrderCopy(resource: any): resource is OrderCopy {
		return resource.type && (resource.type === OrderCopies.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(OrderCopies.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(OrderCopies.TYPE)
	}
	*/

	relationship(id: string | ResourceId): OrderCopyRel {
		return (typeof id === 'string') ? { id, type: OrderCopies.TYPE } : {id: id.id, type: OrderCopies.TYPE }
	}

}


export default OrderCopies

export { OrderCopy, OrderCopyCreate }
