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
import type { Attachment } from './attachments'
import type { EventStore } from './event_stores'
import type { Event } from './events'
import type { Order, OrderType } from './orders'
import type { PaymentAuthorization, PaymentAuthorizationType } from './payment_authorizations'
import type { PaymentCapture } from './payment_captures'
import type { PaymentRefund } from './payment_refunds'
import type { PaymentSetting, PaymentSettingType } from './payment_settings'
import type { PaymentTransaction } from './payment_transactions'
import type { PaymentVoid, PaymentVoidType } from './payment_voids'
import type { PaymentWallet } from './payment_wallets'

type PaymentSessionType = 'payment_sessions'
type PaymentSessionRel = ResourceRel & { type: PaymentSessionType }
type OrderRel = ResourceRel & { type: OrderType }
type PaymentSettingRel = ResourceRel & { type: PaymentSettingType }
type PaymentAuthorizationRel = ResourceRel & { type: PaymentAuthorizationType }
type PaymentVoidRel = ResourceRel & { type: PaymentVoidType }

export type PaymentSessionSort = Pick<
  PaymentSession,
  'id' | 'status' | 'amount_cents' | 'currency_code' | 'gift_card_code' | 'expires_at'
> &
  ResourceSort
// export type PaymentSessionFilter = Pick<PaymentSession, 'id' | 'status' | 'amount_cents' | 'currency_code' | 'gift_card_code' | 'token' | 'expires_at'> & ResourceFilter

interface PaymentSession extends Resource {
  readonly type: PaymentSessionType

  /**
   * The payment session status.
   * @example ```"unpaid"```
   */
  status: string
  /**
   * The payment session amount cents to collect, not updatable once the session is created.
   * @example ```1000```
   */
  amount_cents?: number | null
  /**
   * The payment session amount, float.
   * @example ```10```
   */
  amount_float?: number | null
  /**
   * The payment session amount, formatted.
   * @example ```"€10,00"```
   */
  formatted_amount?: string | null
  /**
   * The percentage of the order total (with taxes) covered by this payment session amount.
   * @example ```50```
   */
  percentage_amount_cents?: number | null
  /**
   * The currency code for transactions.
   * @example ```"USD"```
   */
  currency_code?: string | null
  /**
   * The gift card code to be used in conjunction with a payment setting gift card.
   * @example ```"cc92c23e-967e-48b2-a323-59add603301f"```
   */
  gift_card_code?: string | null
  /**
   * The unique token identifying the payment session. Can be specified for some payment gateway. Cannot be passed by sales channels.
   * @example ```"my-order-ref-123"```
   */
  token?: string | null
  /**
   * Options to use for the payment session, the passed values will be used to communicate with the payment gateway.
   * @example ```{"setup_future_usage":"off_session"}```
   */
  options?: Record<string, any> | null
  /**
   * The data collected by the client mandatory to complete the payment process.
   * @example ```{}```
   */
  client_data?: Record<string, any> | null
  /**
   * The data of the request sent to the payment gateway.
   * @example ```{}```
   */
  request_data?: Record<string, any> | null
  /**
   * The payment gateway response data, used by client.
   * @example ```{}```
   */
  response_data?: Record<string, any> | null
  /**
   * The data of the request sent to fetch extra information for the payment.
   * @example ```{}```
   */
  additional_request_data?: Record<string, any> | null
  /**
   * The response containing the extra information for the payment.
   * @example ```{}```
   */
  additional_response_data?: Record<string, any> | null
  /**
   * Time at which this payment session will expire.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  expires_at?: string | null

  order?: Order | null
  payment_setting?: PaymentSetting | null
  payment_wallet?: PaymentWallet | null
  payment_transactions?: PaymentTransaction[] | null
  payment_authorization?: PaymentAuthorization | null
  payment_void?: PaymentVoid | null
  payment_captures?: PaymentCapture[] | null
  payment_refunds?: PaymentRefund[] | null
  attachments?: Attachment[] | null
  events?: Event[] | null
  event_stores?: EventStore[] | null
}

interface PaymentSessionCreate extends ResourceCreate {
  /**
   * The payment session amount cents to collect, not updatable once the session is created.
   * @example ```1000```
   */
  amount_cents?: number | null
  /**
   * The gift card code to be used in conjunction with a payment setting gift card.
   * @example ```"cc92c23e-967e-48b2-a323-59add603301f"```
   */
  gift_card_code?: string | null
  /**
   * The unique token identifying the payment session. Can be specified for some payment gateway. Cannot be passed by sales channels.
   * @example ```"my-order-ref-123"```
   */
  token?: string | null
  /**
   * Options to use for the payment session, the passed values will be used to communicate with the payment gateway.
   * @example ```{"setup_future_usage":"off_session"}```
   */
  options?: Record<string, any> | null
  /**
   * The data collected by the client mandatory to complete the payment process.
   * @example ```{}```
   */
  client_data?: Record<string, any> | null
  /**
   * Time at which this payment session will expire.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  expires_at?: string | null

  order?: OrderRel | null
  payment_setting: PaymentSettingRel
  payment_authorization?: PaymentAuthorizationRel | null
  payment_void?: PaymentVoidRel | null
}

interface PaymentSessionUpdate extends ResourceUpdate {
  /**
   * The data collected by the client mandatory to complete the payment process.
   * @example ```{}```
   */
  client_data?: Record<string, any> | null
  /**
   * Send this attribute if you want to request additional data for the payment.
   * @example ```true```
   */
  _additional_data?: boolean | null
  /**
   * Send this attribute if you want to update the payment session with fresh data from the payment gateway.
   * @example ```true```
   */
  _refresh?: boolean | null
  /**
   * Time at which this payment session will expire.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  expires_at?: string | null
}

class PaymentSessions extends ApiResource<PaymentSession> {
  static readonly TYPE: PaymentSessionType = 'payment_sessions' as const

  async create(
    resource: PaymentSessionCreate,
    params?: QueryParamsRetrieve<PaymentSession>,
    options?: ResourcesConfig,
  ): Promise<PaymentSession> {
    return this.resources.create<PaymentSessionCreate, PaymentSession>(
      { ...resource, type: PaymentSessions.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: PaymentSessionUpdate,
    params?: QueryParamsRetrieve<PaymentSession>,
    options?: ResourcesConfig,
  ): Promise<PaymentSession> {
    return this.resources.update<PaymentSessionUpdate, PaymentSession>(
      { ...resource, type: PaymentSessions.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: PaymentSessions.TYPE } : id, options)
  }

  async order(
    paymentSessionId: string | PaymentSession,
    params?: QueryParamsRetrieve<Order>,
    options?: ResourcesConfig,
  ): Promise<Order> {
    const _paymentSessionId = (paymentSessionId as PaymentSession).id || (paymentSessionId as string)
    return this.resources.fetch<Order>(
      { type: 'orders' },
      `payment_sessions/${_paymentSessionId}/order`,
      params,
      options,
    ) as unknown as Order
  }

  async payment_wallet(
    paymentSessionId: string | PaymentSession,
    params?: QueryParamsRetrieve<PaymentWallet>,
    options?: ResourcesConfig,
  ): Promise<PaymentWallet> {
    const _paymentSessionId = (paymentSessionId as PaymentSession).id || (paymentSessionId as string)
    return this.resources.fetch<PaymentWallet>(
      { type: 'payment_wallets' },
      `payment_sessions/${_paymentSessionId}/payment_wallet`,
      params,
      options,
    ) as unknown as PaymentWallet
  }

  async payment_transactions(
    paymentSessionId: string | PaymentSession,
    params?: QueryParamsList<PaymentTransaction>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentTransaction>> {
    const _paymentSessionId = (paymentSessionId as PaymentSession).id || (paymentSessionId as string)
    return this.resources.fetch<PaymentTransaction>(
      { type: 'payment_transactions' },
      `payment_sessions/${_paymentSessionId}/payment_transactions`,
      params,
      options,
    ) as unknown as ListResponse<PaymentTransaction>
  }

  async payment_authorization(
    paymentSessionId: string | PaymentSession,
    params?: QueryParamsRetrieve<PaymentAuthorization>,
    options?: ResourcesConfig,
  ): Promise<PaymentAuthorization> {
    const _paymentSessionId = (paymentSessionId as PaymentSession).id || (paymentSessionId as string)
    return this.resources.fetch<PaymentAuthorization>(
      { type: 'payment_authorizations' },
      `payment_sessions/${_paymentSessionId}/payment_authorization`,
      params,
      options,
    ) as unknown as PaymentAuthorization
  }

  async payment_void(
    paymentSessionId: string | PaymentSession,
    params?: QueryParamsRetrieve<PaymentVoid>,
    options?: ResourcesConfig,
  ): Promise<PaymentVoid> {
    const _paymentSessionId = (paymentSessionId as PaymentSession).id || (paymentSessionId as string)
    return this.resources.fetch<PaymentVoid>(
      { type: 'payment_voids' },
      `payment_sessions/${_paymentSessionId}/payment_void`,
      params,
      options,
    ) as unknown as PaymentVoid
  }

  async payment_captures(
    paymentSessionId: string | PaymentSession,
    params?: QueryParamsList<PaymentCapture>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentCapture>> {
    const _paymentSessionId = (paymentSessionId as PaymentSession).id || (paymentSessionId as string)
    return this.resources.fetch<PaymentCapture>(
      { type: 'payment_captures' },
      `payment_sessions/${_paymentSessionId}/payment_captures`,
      params,
      options,
    ) as unknown as ListResponse<PaymentCapture>
  }

  async payment_refunds(
    paymentSessionId: string | PaymentSession,
    params?: QueryParamsList<PaymentRefund>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentRefund>> {
    const _paymentSessionId = (paymentSessionId as PaymentSession).id || (paymentSessionId as string)
    return this.resources.fetch<PaymentRefund>(
      { type: 'payment_refunds' },
      `payment_sessions/${_paymentSessionId}/payment_refunds`,
      params,
      options,
    ) as unknown as ListResponse<PaymentRefund>
  }

  async attachments(
    paymentSessionId: string | PaymentSession,
    params?: QueryParamsList<Attachment>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Attachment>> {
    const _paymentSessionId = (paymentSessionId as PaymentSession).id || (paymentSessionId as string)
    return this.resources.fetch<Attachment>(
      { type: 'attachments' },
      `payment_sessions/${_paymentSessionId}/attachments`,
      params,
      options,
    ) as unknown as ListResponse<Attachment>
  }

  async events(
    paymentSessionId: string | PaymentSession,
    params?: QueryParamsList<Event>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Event>> {
    const _paymentSessionId = (paymentSessionId as PaymentSession).id || (paymentSessionId as string)
    return this.resources.fetch<Event>(
      { type: 'events' },
      `payment_sessions/${_paymentSessionId}/events`,
      params,
      options,
    ) as unknown as ListResponse<Event>
  }

  async event_stores(
    paymentSessionId: string | PaymentSession,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _paymentSessionId = (paymentSessionId as PaymentSession).id || (paymentSessionId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `payment_sessions/${_paymentSessionId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async _additional_data(
    id: string | PaymentSession,
    params?: QueryParamsRetrieve<PaymentSession>,
    options?: ResourcesConfig,
  ): Promise<PaymentSession> {
    return this.resources.update<PaymentSessionUpdate, PaymentSession>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSessions.TYPE, _additional_data: true },
      params,
      options,
    )
  }

  async _refresh(
    id: string | PaymentSession,
    params?: QueryParamsRetrieve<PaymentSession>,
    options?: ResourcesConfig,
  ): Promise<PaymentSession> {
    return this.resources.update<PaymentSessionUpdate, PaymentSession>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSessions.TYPE, _refresh: true },
      params,
      options,
    )
  }

  isPaymentSession(resource: any): resource is PaymentSession {
    return resource.type && resource.type === PaymentSessions.TYPE
  }

  relationship(id: string | ResourceId | null): PaymentSessionRel {
    return super.relationshipOneToOne<PaymentSessionRel>(id)
  }

  relationshipToMany(...ids: string[]): PaymentSessionRel[] {
    return super.relationshipOneToMany<PaymentSessionRel>(...ids)
  }

  type(): PaymentSessionType {
    return PaymentSessions.TYPE
  }
}

const instance = new PaymentSessions()
export default instance

export type { PaymentSession, PaymentSessionCreate, PaymentSessions, PaymentSessionType, PaymentSessionUpdate }
