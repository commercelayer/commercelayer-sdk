import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order } from './orders'
import type { Event } from './events'


type OrderFactoryType = 'order_factories'
type OrderFactoryRel = ResourceRel & { type: OrderFactoryType }


export type OrderFactorySort = Pick<OrderFactory, 'id' | 'status' | 'started_at' | 'completed_at' | 'failed_at' | 'errors_count'> & ResourceSort
// export type OrderFactoryFilter = Pick<OrderFactory, 'id' | 'status' | 'started_at' | 'completed_at' | 'failed_at' | 'errors_count'> & ResourceFilter


interface OrderFactory extends Resource {
	
	readonly type: OrderFactoryType

	/** 
	 * The order factory status. One of 'pending' (default), 'in_progress', 'failed', or 'completed'.
	 * @example ```"in_progress"```
	 */
	status: 'pending' | 'in_progress' | 'failed' | 'completed'
	/** 
	 * Time at which the order copy was started.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	started_at?: string | null
	/** 
	 * Time at which the order copy was completed.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	completed_at?: string | null
	/** 
	 * Time at which the order copy has failed.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	failed_at?: string | null
	/** 
	 * Contains the order copy errors, if any.
	 * @example ```{"status":["cannot transition from draft to placed"]}```
	 */
	errors_log?: Record<string, any> | null
	/** 
	 * Indicates the number of copy errors, if any.
	 * @example ```2```
	 */
	errors_count?: number | null
	/** 
	 * Indicates if the target order must be placed upon copy.
	 * @example ```true```
	 */
	place_target_order?: boolean | null
	/** 
	 * Indicates if the payment source within the source order customer's wallet must be copied.
	 * @example ```true```
	 */
	reuse_wallet?: boolean | null

	source_order?: Order | null
	target_order?: Order | null
	events?: Event[] | null

}


class OrderFactories extends ApiResource<OrderFactory> {

	static readonly TYPE: OrderFactoryType = 'order_factories' as const

	async source_order(orderFactoryId: string | OrderFactory, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _orderFactoryId = (orderFactoryId as OrderFactory).id || orderFactoryId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `order_factories/${_orderFactoryId}/source_order`, params, options) as unknown as Order
	}

	async target_order(orderFactoryId: string | OrderFactory, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _orderFactoryId = (orderFactoryId as OrderFactory).id || orderFactoryId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `order_factories/${_orderFactoryId}/target_order`, params, options) as unknown as Order
	}

	async events(orderFactoryId: string | OrderFactory, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _orderFactoryId = (orderFactoryId as OrderFactory).id || orderFactoryId as string
		return this.resources.fetch<Event>({ type: 'events' }, `order_factories/${_orderFactoryId}/events`, params, options) as unknown as ListResponse<Event>
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


const instance = new OrderFactories()
export default instance

export type { OrderFactory, OrderFactoryType }
