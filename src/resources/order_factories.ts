import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order } from './orders'
import type { Event } from './events'


type OrderFactoryType = 'order_factories'
type OrderFactoryRel = ResourceRel & { type: OrderFactoryType }


interface OrderFactory extends Resource {
	
	readonly type: OrderFactoryType

	status: 'pending' | 'in_progress' | 'failed' | 'completed'
	started_at?: string | null
	completed_at?: string | null
	failed_at?: string | null
	errors_log?: Record<string, any> | null
	errors_count?: number | null
	place_target_order?: boolean | null
	reuse_wallet?: boolean | null

	source_order?: Order | null
	target_order?: Order | null
	events?: Event[] | null

}


class OrderFactories extends ApiResource<OrderFactory> {

	static readonly TYPE: OrderFactoryType = 'order_factories' as const

	async source_order(orderFactoryId: string | OrderFactory, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _orderFactoryId = (orderFactoryId as OrderFactory).id || orderFactoryId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `order_factories/${_orderFactoryId}/source_order`, params, options) as unknown as Order
	}

	async target_order(orderFactoryId: string | OrderFactory, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _orderFactoryId = (orderFactoryId as OrderFactory).id || orderFactoryId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `order_factories/${_orderFactoryId}/target_order`, params, options) as unknown as Order
	}

	async events(orderFactoryId: string | OrderFactory, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _orderFactoryId = (orderFactoryId as OrderFactory).id || orderFactoryId as string
		return this.resources.fetch<Event>({ type: 'events' }, `order_factories/${_orderFactoryId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isOrderFactory(resource: any): resource is OrderFactory {
		return resource.type && (resource.type === OrderFactories.TYPE)
	}


	relationship(id: string | ResourceId | null): OrderFactoryRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: OrderFactories.TYPE } : { id: id.id, type: OrderFactories.TYPE }
	}


	type(): OrderFactoryType {
		return OrderFactories.TYPE
	}


	parse(payload: any): OrderFactory | OrderFactory[] {
		return super.parse(payload)
	}

}


export default OrderFactories

export type { OrderFactory, OrderFactoryType }
