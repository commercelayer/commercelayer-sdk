import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Order } from './orders'
import type { Event } from './events'


type OrderFactoryRel = ResourceRel & { type: typeof OrderFactories.TYPE }


interface OrderFactory extends Resource {
	
	status?: string
	started_at?: string
	completed_at?: string
	failed_at?: string
	errors_log?: object
	errors_count?: number
	place_target_order?: boolean
	reuse_wallet?: boolean

	source_order?: Order
	target_order?: Order
	events?: Event[]

}


class OrderFactories extends ApiResource {

	static readonly TYPE: 'order_factories' = 'order_factories' as const
	// static readonly PATH = 'order_factories'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderFactory>> {
		return this.resources.list<OrderFactory>({ type: OrderFactories.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderFactory> {
		return this.resources.retrieve<OrderFactory>({ type: OrderFactories.TYPE, id }, params, options)
	}

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


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isOrderFactory(resource: any): resource is OrderFactory {
		return resource.type && (resource.type === OrderFactories.TYPE)
	}


	relationship(id: string | ResourceId | null): OrderFactoryRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: OrderFactories.TYPE } : { id: id.id, type: OrderFactories.TYPE }
	}


	type(): string {
		return OrderFactories.TYPE
	}

}


export default OrderFactories

export { OrderFactory }
