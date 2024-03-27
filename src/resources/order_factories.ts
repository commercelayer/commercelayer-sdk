import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderSortable } from './orders'
import type { Event, EventSortable } from './events'


type OrderFactoryType = 'order_factories'
type OrderFactoryRel = ResourceRel & { type: OrderFactoryType }


export type OrderFactorySortable = Pick<OrderFactory, 'id' | 'status' | 'started_at' | 'completed_at' | 'failed_at' | 'errors_count'> & ResourceSortable
export type OrderFactoryFilterable = Pick<OrderFactory, 'id' | 'status' | 'started_at' | 'completed_at' | 'failed_at' | 'errors_count'> & ResourceFilterable


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


class OrderFactories extends ApiResource<OrderFactory, OrderFactorySortable> {

	static readonly TYPE: OrderFactoryType = 'order_factories' as const

	async source_order(orderFactoryId: string | OrderFactory, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _orderFactoryId = (orderFactoryId as OrderFactory).id || orderFactoryId as string
		return this.resources.fetch<Order, OrderSortable>({ type: 'orders' }, `order_factories/${_orderFactoryId}/source_order`, params, options) as unknown as Order
	}

	async target_order(orderFactoryId: string | OrderFactory, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _orderFactoryId = (orderFactoryId as OrderFactory).id || orderFactoryId as string
		return this.resources.fetch<Order, OrderSortable>({ type: 'orders' }, `order_factories/${_orderFactoryId}/target_order`, params, options) as unknown as Order
	}

	async events(orderFactoryId: string | OrderFactory, params?: QueryParamsList<EventSortable>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _orderFactoryId = (orderFactoryId as OrderFactory).id || orderFactoryId as string
		return this.resources.fetch<Event, EventSortable>({ type: 'events' }, `order_factories/${_orderFactoryId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isOrderFactory(resource: any): resource is OrderFactory {
		return resource.type && (resource.type === OrderFactories.TYPE)
	}


	relationship(id: string | ResourceId | null): OrderFactoryRel {
		return super.relationshipOneToOne<OrderFactoryRel>(id)
	}

	relationshipToMany(...ids: string[]): OrderFactoryRel[] {
		return super.relationshipOneToMany<OrderFactoryRel>(...ids)
	}


	type(): OrderFactoryType {
		return OrderFactories.TYPE
	}

}


export default OrderFactories

export type { OrderFactory, OrderFactoryType }

/*
export const OrderFactoriesClient = (init: ResourceAdapter | ResourcesInitConfig): OrderFactories => {
	return new OrderFactories((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
