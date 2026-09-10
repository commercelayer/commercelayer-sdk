import type { QueryParamsList, QueryParamsRetrieve } from '@runtime/query'
import type {
  ListResponse,
  Resource,
  ResourceCreate,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
  ResourceUpdate,
} from '@runtime/resource'
import { ApiResource } from '@runtime/resource'
import type { Agent, AgentType } from './agents'
import type { Customer, CustomerType } from './customers'
import type { EventStore } from './event_stores'
import type { Event } from './events'
import type { Order, OrderType } from './orders'
import type { Organization } from './organizations'
import type { User, UserType } from './users'

type OrderReviewType = 'order_reviews'
type OrderReviewRel = ResourceRel & { type: OrderReviewType }
type AgentRel = ResourceRel & { type: AgentType }
type CustomerRel = ResourceRel & { type: CustomerType }
type UserRel = ResourceRel & { type: UserType }
type OrderRel = ResourceRel & { type: OrderType }

export type OrderReviewSort = Pick<OrderReview, 'id' | 'status' | 'reason' | 'resolved_at'> & ResourceSort
// export type OrderReviewFilter = Pick<OrderReview, 'id' | 'status' | 'reason' | 'resolved_at'> & ResourceFilter

/**
 * The Order review object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/order_reviews endpoint.
 *
 * @deprecated Last available in API version 2017-08.
 * @link https://docs.commercelayer.io/core-api-reference/order_reviews/object
 */
interface OrderReview extends Resource {
  readonly type: OrderReviewType

  /**
   * The order review status. One of 'pending', 'accepted', or 'rejected'.
   * @example ```"pending"```
   */
  status: 'pending' | 'accepted' | 'rejected'
  /**
   * A free-form reason for the review, if any.
   * @example ```"Order exceeds the approved spending limit."```
   */
  reason?: string | null
  /**
   * Time at which the review was resolved (left the pending state).
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  resolved_at?: string | null
  /**
   * Free-form note about the review outcome (e.g. rejection reason).
   * @example ```"Order exceeds the approved spending limit for this customer."```
   */
  notes?: string | null

  requester?: Agent | Customer | User | null
  owner?: Customer | User | null
  order?: Order | null
  organization?: Organization | null
  events?: Event[] | null
  event_stores?: EventStore[] | null
}

interface OrderReviewCreate extends ResourceCreate {
  /**
   * A free-form reason for the review, if any.
   * @example ```"Order exceeds the approved spending limit."```
   */
  reason?: string | null
  /**
   * Free-form note about the review outcome (e.g. rejection reason).
   * @example ```"Order exceeds the approved spending limit for this customer."```
   */
  notes?: string | null

  requester: AgentRel | CustomerRel | UserRel
  owner: CustomerRel | UserRel
  order: OrderRel
}

interface OrderReviewUpdate extends ResourceUpdate {
  /**
   * A free-form reason for the review, if any.
   * @example ```"Order exceeds the approved spending limit."```
   */
  reason?: string | null
  /**
   * Free-form note about the review outcome (e.g. rejection reason).
   * @example ```"Order exceeds the approved spending limit for this customer."```
   */
  notes?: string | null
  /**
   * Send this attribute if you want to mark this order review as accepted.
   * @example ```true```
   */
  _accept?: boolean | null
  /**
   * Send this attribute if you want to mark this order review as rejected.
   * @example ```true```
   */
  _reject?: boolean | null
}

/** @deprecated Last available in API version 2017-08. */
class OrderReviews extends ApiResource<OrderReview> {
  static readonly TYPE: OrderReviewType = 'order_reviews' as const

  async create(
    resource: OrderReviewCreate,
    params?: QueryParamsRetrieve<OrderReview>,
    options?: ResourcesConfig,
  ): Promise<OrderReview> {
    return this.resources.create<OrderReviewCreate, OrderReview>(
      { ...resource, type: OrderReviews.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: OrderReviewUpdate,
    params?: QueryParamsRetrieve<OrderReview>,
    options?: ResourcesConfig,
  ): Promise<OrderReview> {
    return this.resources.update<OrderReviewUpdate, OrderReview>(
      { ...resource, type: OrderReviews.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: OrderReviews.TYPE } : id, options)
  }

  async order(
    orderReviewId: string | OrderReview,
    params?: QueryParamsRetrieve<Order>,
    options?: ResourcesConfig,
  ): Promise<Order> {
    const _orderReviewId = (orderReviewId as OrderReview).id || (orderReviewId as string)
    return this.resources.fetch<Order>(
      { type: 'orders' },
      `order_reviews/${_orderReviewId}/order`,
      params,
      options,
    ) as unknown as Order
  }

  async organization(
    orderReviewId: string | OrderReview,
    params?: QueryParamsRetrieve<Organization>,
    options?: ResourcesConfig,
  ): Promise<Organization> {
    const _orderReviewId = (orderReviewId as OrderReview).id || (orderReviewId as string)
    return this.resources.fetch<Organization>(
      { type: 'organizations' },
      `order_reviews/${_orderReviewId}/organization`,
      params,
      options,
    ) as unknown as Organization
  }

  async events(
    orderReviewId: string | OrderReview,
    params?: QueryParamsList<Event>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Event>> {
    const _orderReviewId = (orderReviewId as OrderReview).id || (orderReviewId as string)
    return this.resources.fetch<Event>(
      { type: 'events' },
      `order_reviews/${_orderReviewId}/events`,
      params,
      options,
    ) as unknown as ListResponse<Event>
  }

  async event_stores(
    orderReviewId: string | OrderReview,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _orderReviewId = (orderReviewId as OrderReview).id || (orderReviewId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `order_reviews/${_orderReviewId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async _accept(
    id: string | OrderReview,
    params?: QueryParamsRetrieve<OrderReview>,
    options?: ResourcesConfig,
  ): Promise<OrderReview> {
    return this.resources.update<OrderReviewUpdate, OrderReview>(
      { id: typeof id === 'string' ? id : id.id, type: OrderReviews.TYPE, _accept: true },
      params,
      options,
    )
  }

  async _reject(
    id: string | OrderReview,
    params?: QueryParamsRetrieve<OrderReview>,
    options?: ResourcesConfig,
  ): Promise<OrderReview> {
    return this.resources.update<OrderReviewUpdate, OrderReview>(
      { id: typeof id === 'string' ? id : id.id, type: OrderReviews.TYPE, _reject: true },
      params,
      options,
    )
  }

  isOrderReview(resource: any): resource is OrderReview {
    return resource.type && resource.type === OrderReviews.TYPE
  }

  relationship(id: string | ResourceId | null): OrderReviewRel {
    return super.relationshipOneToOne<OrderReviewRel>(id)
  }

  relationshipToMany(...ids: string[]): OrderReviewRel[] {
    return super.relationshipOneToMany<OrderReviewRel>(...ids)
  }

  type(): OrderReviewType {
    return OrderReviews.TYPE
  }
}

const instance = new OrderReviews()
export default instance

export type { OrderReview, OrderReviewCreate, OrderReviews, OrderReviewType, OrderReviewUpdate }
