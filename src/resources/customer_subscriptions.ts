import type { QueryParamsList, QueryParamsRetrieve } from '../query'
import type {
  ListResponse,
  Resource,
  ResourceCreate,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
  ResourceUpdate,
} from '../resource'
import { ApiResource } from '../resource'

import type { Customer } from './customers'
import type { EventStore } from './event_stores'
import type { Event } from './events'

type CustomerSubscriptionType = 'customer_subscriptions'
type CustomerSubscriptionRel = ResourceRel & { type: CustomerSubscriptionType }

export type CustomerSubscriptionSort = Pick<CustomerSubscription, 'id'> & ResourceSort
// export type CustomerSubscriptionFilter = Pick<CustomerSubscription, 'id'> & ResourceFilter

/**
 * The Customer subscription object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/customer_subscriptions endpoint.
 *
 * @link https://docs.commercelayer.io/core-api-reference/customer_subscriptions/object
 */
interface CustomerSubscription extends Resource {
  readonly type: CustomerSubscriptionType

  /**
   * The email of the customer that owns the subscription.
   * @example ```"john@example.com"```
   */
  customer_email: string

  customer?: Customer | null
  events?: Event[] | null
  event_stores?: EventStore[] | null
}

interface CustomerSubscriptionCreate extends ResourceCreate {
  /**
   * The email of the customer that owns the subscription.
   * @example ```"john@example.com"```
   */
  customer_email: string
}

type CustomerSubscriptionUpdate = ResourceUpdate

class CustomerSubscriptions extends ApiResource<CustomerSubscription> {
  static readonly TYPE: CustomerSubscriptionType = 'customer_subscriptions' as const

  async create(
    resource: CustomerSubscriptionCreate,
    params?: QueryParamsRetrieve<CustomerSubscription>,
    options?: ResourcesConfig,
  ): Promise<CustomerSubscription> {
    return this.resources.create<CustomerSubscriptionCreate, CustomerSubscription>(
      { ...resource, type: CustomerSubscriptions.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: CustomerSubscriptionUpdate,
    params?: QueryParamsRetrieve<CustomerSubscription>,
    options?: ResourcesConfig,
  ): Promise<CustomerSubscription> {
    return this.resources.update<CustomerSubscriptionUpdate, CustomerSubscription>(
      { ...resource, type: CustomerSubscriptions.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: CustomerSubscriptions.TYPE } : id, options)
  }

  async customer(
    customerSubscriptionId: string | CustomerSubscription,
    params?: QueryParamsRetrieve<Customer>,
    options?: ResourcesConfig,
  ): Promise<Customer> {
    const _customerSubscriptionId =
      (customerSubscriptionId as CustomerSubscription).id || (customerSubscriptionId as string)
    return this.resources.fetch<Customer>(
      { type: 'customers' },
      `customer_subscriptions/${_customerSubscriptionId}/customer`,
      params,
      options,
    ) as unknown as Customer
  }

  async events(
    customerSubscriptionId: string | CustomerSubscription,
    params?: QueryParamsList<Event>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Event>> {
    const _customerSubscriptionId =
      (customerSubscriptionId as CustomerSubscription).id || (customerSubscriptionId as string)
    return this.resources.fetch<Event>(
      { type: 'events' },
      `customer_subscriptions/${_customerSubscriptionId}/events`,
      params,
      options,
    ) as unknown as ListResponse<Event>
  }

  async event_stores(
    customerSubscriptionId: string | CustomerSubscription,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _customerSubscriptionId =
      (customerSubscriptionId as CustomerSubscription).id || (customerSubscriptionId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `customer_subscriptions/${_customerSubscriptionId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  isCustomerSubscription(resource: any): resource is CustomerSubscription {
    return resource.type && resource.type === CustomerSubscriptions.TYPE
  }

  relationship(id: string | ResourceId | null): CustomerSubscriptionRel {
    return super.relationshipOneToOne<CustomerSubscriptionRel>(id)
  }

  relationshipToMany(...ids: string[]): CustomerSubscriptionRel[] {
    return super.relationshipOneToMany<CustomerSubscriptionRel>(...ids)
  }

  type(): CustomerSubscriptionType {
    return CustomerSubscriptions.TYPE
  }
}

const instance = new CustomerSubscriptions()
export default instance

export type {
  CustomerSubscription,
  CustomerSubscriptionCreate,
  CustomerSubscriptions,
  CustomerSubscriptionType,
  CustomerSubscriptionUpdate,
}
