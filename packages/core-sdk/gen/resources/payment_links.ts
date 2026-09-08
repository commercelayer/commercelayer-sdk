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
import type { Attachment } from './attachments'
import type { EventStore } from './event_stores'
import type { Event } from './events'
import type { Order, OrderType } from './orders'
import type { PaymentSession } from './payment_sessions'
import type { PaymentSetting, PaymentSettingType } from './payment_settings'

type PaymentLinkType = 'payment_links'
type PaymentLinkRel = ResourceRel & { type: PaymentLinkType }
type OrderRel = ResourceRel & { type: OrderType }
type PaymentSettingRel = ResourceRel & { type: PaymentSettingType }

export type PaymentLinkSort = Pick<
  PaymentLink,
  'id' | 'status' | 'url' | 'return_url' | 'completed_at' | 'expired_at'
> &
  ResourceSort
// export type PaymentLinkFilter = Pick<PaymentLink, 'id' | 'status' | 'token' | 'url' | 'return_url' | 'completed_at' | 'expired_at'> & ResourceFilter

/**
 * The Payment link object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/payment_links endpoint.
 * @since 2026-05
 *
 * @link https://docs.commercelayer.io/core-api-reference/payment_links/object
 */
interface PaymentLink extends Resource {
  readonly type: PaymentLinkType

  /**
   * The payment link status. One of 'open' (default), 'expired', or 'completed'.
   * @example ```"succeeded"```
   */
  status: 'open' | 'expired' | 'completed'
  /**
   * The unique token identifying the payment link.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  token?: string | null
  /**
   * The URL for this payment link returned by the gateway.
   * @example ```"https://checkout.yourbrand.com/:order_id"```
   */
  url: string
  /**
   * The URL to redirect your customer upon payment is completed.
   * @example ```"http://commercelayer.dev/payment_link/process"```
   */
  return_url: string
  /**
   * Options to use for the payment link, the passed values will be used to communicate with the payment gateway. Cannot be passed by sales channels.
   * @example ```{"usage":"on_session"}```
   */
  options?: Record<string, any> | null
  /**
   * The data of the request sent to the payment gateway.
   * @example ```{}```
   */
  request_data?: Record<string, any> | null
  /**
   * The payment gateway response data, used by successive payment workflows.
   * @example ```{}```
   */
  response_data?: Record<string, any> | null
  /**
   * Time at which the payment link has been expired.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  completed_at?: string | null
  /**
   * Time at which the payment link has been expired.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  expired_at?: string | null

  order?: Order | null
  payment_setting?: PaymentSetting | null
  payment_session?: PaymentSession | null
  attachments?: Attachment[] | null
  events?: Event[] | null
  event_stores?: EventStore[] | null
}

interface PaymentLinkCreate extends ResourceCreate {
  /**
   * The URL for this payment link returned by the gateway.
   * @example ```"https://checkout.yourbrand.com/:order_id"```
   */
  url: string
  /**
   * The URL to redirect your customer upon payment is completed.
   * @example ```"http://commercelayer.dev/payment_link/process"```
   */
  return_url: string
  /**
   * Options to use for the payment link, the passed values will be used to communicate with the payment gateway. Cannot be passed by sales channels.
   * @example ```{"usage":"on_session"}```
   */
  options?: Record<string, any> | null
  /**
   * Send this attribute if you want to force a specific supported internal payload version for this request, overriding the payment setting's configured default. Only usable when the payment setting is internal_versionable.
   * @example ```"V72"```
   */
  _internal_version?: string | null

  order: OrderRel
  payment_setting: PaymentSettingRel
}

interface PaymentLinkUpdate extends ResourceUpdate {
  /**
   * The URL for this payment link returned by the gateway.
   * @example ```"https://checkout.yourbrand.com/:order_id"```
   */
  url?: string | null
  /**
   * The URL to redirect your customer upon payment is completed.
   * @example ```"http://commercelayer.dev/payment_link/process"```
   */
  return_url?: string | null
  /**
   * Send this attribute if you want to update the payment link with fresh data from order.
   * @example ```true```
   */
  _refresh?: boolean | null
  /**
   * Send this attribute if you want to cancel this payment link. Cannot be passed by sales channels.
   * @example ```true```
   */
  _cancel?: boolean | null
}

/** @since 2026-05 */
class PaymentLinks extends ApiResource<PaymentLink> {
  static readonly TYPE: PaymentLinkType = 'payment_links' as const

  async create(
    resource: PaymentLinkCreate,
    params?: QueryParamsRetrieve<PaymentLink>,
    options?: ResourcesConfig,
  ): Promise<PaymentLink> {
    return this.resources.create<PaymentLinkCreate, PaymentLink>(
      { ...resource, type: PaymentLinks.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: PaymentLinkUpdate,
    params?: QueryParamsRetrieve<PaymentLink>,
    options?: ResourcesConfig,
  ): Promise<PaymentLink> {
    return this.resources.update<PaymentLinkUpdate, PaymentLink>(
      { ...resource, type: PaymentLinks.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: PaymentLinks.TYPE } : id, options)
  }

  async order(
    paymentLinkId: string | PaymentLink,
    params?: QueryParamsRetrieve<Order>,
    options?: ResourcesConfig,
  ): Promise<Order> {
    const _paymentLinkId = (paymentLinkId as PaymentLink).id || (paymentLinkId as string)
    return this.resources.fetch<Order>(
      { type: 'orders' },
      `payment_links/${_paymentLinkId}/order`,
      params,
      options,
    ) as unknown as Order
  }

  async payment_setting(
    paymentLinkId: string | PaymentLink,
    params?: QueryParamsRetrieve<PaymentSetting>,
    options?: ResourcesConfig,
  ): Promise<PaymentSetting> {
    const _paymentLinkId = (paymentLinkId as PaymentLink).id || (paymentLinkId as string)
    return this.resources.fetch<PaymentSetting>(
      { type: 'payment_settings' },
      `payment_links/${_paymentLinkId}/payment_setting`,
      params,
      options,
    ) as unknown as PaymentSetting
  }

  async payment_session(
    paymentLinkId: string | PaymentLink,
    params?: QueryParamsRetrieve<PaymentSession>,
    options?: ResourcesConfig,
  ): Promise<PaymentSession> {
    const _paymentLinkId = (paymentLinkId as PaymentLink).id || (paymentLinkId as string)
    return this.resources.fetch<PaymentSession>(
      { type: 'payment_sessions' },
      `payment_links/${_paymentLinkId}/payment_session`,
      params,
      options,
    ) as unknown as PaymentSession
  }

  async attachments(
    paymentLinkId: string | PaymentLink,
    params?: QueryParamsList<Attachment>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Attachment>> {
    const _paymentLinkId = (paymentLinkId as PaymentLink).id || (paymentLinkId as string)
    return this.resources.fetch<Attachment>(
      { type: 'attachments' },
      `payment_links/${_paymentLinkId}/attachments`,
      params,
      options,
    ) as unknown as ListResponse<Attachment>
  }

  async events(
    paymentLinkId: string | PaymentLink,
    params?: QueryParamsList<Event>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Event>> {
    const _paymentLinkId = (paymentLinkId as PaymentLink).id || (paymentLinkId as string)
    return this.resources.fetch<Event>(
      { type: 'events' },
      `payment_links/${_paymentLinkId}/events`,
      params,
      options,
    ) as unknown as ListResponse<Event>
  }

  async event_stores(
    paymentLinkId: string | PaymentLink,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _paymentLinkId = (paymentLinkId as PaymentLink).id || (paymentLinkId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `payment_links/${_paymentLinkId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async _refresh(
    id: string | PaymentLink,
    params?: QueryParamsRetrieve<PaymentLink>,
    options?: ResourcesConfig,
  ): Promise<PaymentLink> {
    return this.resources.update<PaymentLinkUpdate, PaymentLink>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentLinks.TYPE, _refresh: true },
      params,
      options,
    )
  }

  async _cancel(
    id: string | PaymentLink,
    params?: QueryParamsRetrieve<PaymentLink>,
    options?: ResourcesConfig,
  ): Promise<PaymentLink> {
    return this.resources.update<PaymentLinkUpdate, PaymentLink>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentLinks.TYPE, _cancel: true },
      params,
      options,
    )
  }

  isPaymentLink(resource: any): resource is PaymentLink {
    return resource.type && resource.type === PaymentLinks.TYPE
  }

  relationship(id: string | ResourceId | null): PaymentLinkRel {
    return super.relationshipOneToOne<PaymentLinkRel>(id)
  }

  relationshipToMany(...ids: string[]): PaymentLinkRel[] {
    return super.relationshipOneToMany<PaymentLinkRel>(...ids)
  }

  type(): PaymentLinkType {
    return PaymentLinks.TYPE
  }
}

const instance = new PaymentLinks()
export default instance

export type { PaymentLink, PaymentLinkCreate, PaymentLinks, PaymentLinkType, PaymentLinkUpdate }
