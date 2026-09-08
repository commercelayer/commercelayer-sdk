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
import type { Order } from './orders'
import type { PaymentAuthorization, PaymentAuthorizationType } from './payment_authorizations'
import type { PaymentRefund } from './payment_refunds'
import type { PaymentSession, PaymentSessionType } from './payment_sessions'
import type { PaymentSetting } from './payment_settings'

type PaymentCaptureType = 'payment_captures'
type PaymentCaptureRel = ResourceRel & { type: PaymentCaptureType }
type PaymentSessionRel = ResourceRel & { type: PaymentSessionType }
type PaymentAuthorizationRel = ResourceRel & { type: PaymentAuthorizationType }

export type PaymentCaptureSort = Pick<
  PaymentCapture,
  | 'id'
  | 'status'
  | 'payment_type'
  | 'currency_code'
  | 'amount_cents'
  | 'requires_action_at'
  | 'processing_at'
  | 'succeeded_at'
  | 'declined_at'
  | 'failed_at'
  | 'canceled_at'
  | 'expired_at'
> &
  ResourceSort
// export type PaymentCaptureFilter = Pick<PaymentCapture, 'id' | 'status' | 'payment_type' | 'token' | 'currency_code' | 'amount_cents' | 'options' | 'requires_action_at' | 'processing_at' | 'succeeded_at' | 'declined_at' | 'failed_at' | 'canceled_at' | 'expired_at'> & ResourceFilter

/**
 * The Payment capture object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/payment_captures endpoint.
 * @since 2026-05
 *
 * @link https://docs.commercelayer.io/core-api-reference/payment_captures/object
 */
interface PaymentCapture extends Resource {
  readonly type: PaymentCaptureType

  /**
   * The transaction status. One of 'pending' (default), 'requires_action', 'processing', 'succeeded', 'declined', 'failed', 'canceled', or 'expired'.
   * @example ```"draft"```
   */
  status: 'pending' | 'requires_action' | 'processing' | 'succeeded' | 'declined' | 'failed' | 'canceled' | 'expired'
  /**
   * The payment type inherited by the payment session.
   * @example ```"manual_payment"```
   */
  payment_type: string
  /**
   * The token identifying the transaction, returned by the payment session interaction.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  token?: string | null
  /**
   * The international 3-letter currency code as defined by the ISO 4217 standard.
   * @example ```"EUR"```
   */
  currency_code?: string | null
  /**
   * The payment transacion amount cents collected.
   * @example ```1000```
   */
  amount_cents?: number | null
  /**
   * The payment transaction amount, float.
   * @example ```10```
   */
  amount_float?: number | null
  /**
   * The payment transaction amount, formatted.
   * @example ```"€10,00"```
   */
  formatted_amount?: string | null
  /**
   * The data of the request sent to the payment gateway.
   * @example ```{}```
   */
  request_data?: Record<string, any> | null
  /**
   * The payment gateway response data, specific to this transaction. Cannot be passed by sales channels.
   * @example ```{}```
   */
  response_data?: Record<string, any> | null
  /**
   * Options to use for the transaction, the passed values will be used to communicate with the payment gateway. Cannot be passed by sales channels.
   * @example ```{"cancellation_reason":"fraudulent"}```
   */
  options?: Record<string, any> | null
  /**
   * Time at which the transaction is marked as requires_action.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  requires_action_at?: string | null
  /**
   * Time at which the transaction has been processed.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  processing_at?: string | null
  /**
   * Time at which the transaction is marked as succeeded.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  succeeded_at?: string | null
  /**
   * Time at which the transaction is marked as declined.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  declined_at?: string | null
  /**
   * Time at which the transaction is marked as failed.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  failed_at?: string | null
  /**
   * Time at which the transaction has been cancelled.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  canceled_at?: string | null
  /**
   * Time at which the transaction has been expired.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  expired_at?: string | null
  /**
   * The balance to be refunded, in cents.
   * @example ```1000```
   */
  refund_balance_cents?: number | null
  /**
   * The balance to be refunded, float.
   * @example ```10```
   */
  refund_balance_float?: number | null
  /**
   * The balance to be refunded, formatted.
   * @example ```"€10,00"```
   */
  formatted_refund_balance?: string | null

  payment_session?: PaymentSession | null
  order?: Order | null
  payment_setting?: PaymentSetting | null
  attachments?: Attachment[] | null
  events?: Event[] | null
  event_stores?: EventStore[] | null
  payment_authorization?: PaymentAuthorization | null
  payment_refunds?: PaymentRefund[] | null
}

interface PaymentCaptureCreate extends ResourceCreate {
  /**
   * Send this attribute if you want to force a specific supported internal payload version for this request, overriding the payment setting's configured default. Only usable when the payment setting is internal_versionable.
   * @example ```"V72"```
   */
  _internal_version?: string | null
  /**
   * The payment transacion amount cents collected.
   * @example ```1000```
   */
  amount_cents?: number | null
  /**
   * Options to use for the transaction, the passed values will be used to communicate with the payment gateway. Cannot be passed by sales channels.
   * @example ```{"cancellation_reason":"fraudulent"}```
   */
  options?: Record<string, any> | null

  payment_session: PaymentSessionRel
  payment_authorization: PaymentAuthorizationRel
}

type PaymentCaptureUpdate = ResourceUpdate

/** @since 2026-05 */
class PaymentCaptures extends ApiResource<PaymentCapture> {
  static readonly TYPE: PaymentCaptureType = 'payment_captures' as const

  async create(
    resource: PaymentCaptureCreate,
    params?: QueryParamsRetrieve<PaymentCapture>,
    options?: ResourcesConfig,
  ): Promise<PaymentCapture> {
    return this.resources.create<PaymentCaptureCreate, PaymentCapture>(
      { ...resource, type: PaymentCaptures.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: PaymentCaptureUpdate,
    params?: QueryParamsRetrieve<PaymentCapture>,
    options?: ResourcesConfig,
  ): Promise<PaymentCapture> {
    return this.resources.update<PaymentCaptureUpdate, PaymentCapture>(
      { ...resource, type: PaymentCaptures.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: PaymentCaptures.TYPE } : id, options)
  }

  async payment_session(
    paymentCaptureId: string | PaymentCapture,
    params?: QueryParamsRetrieve<PaymentSession>,
    options?: ResourcesConfig,
  ): Promise<PaymentSession> {
    const _paymentCaptureId = (paymentCaptureId as PaymentCapture).id || (paymentCaptureId as string)
    return this.resources.fetch<PaymentSession>(
      { type: 'payment_sessions' },
      `payment_captures/${_paymentCaptureId}/payment_session`,
      params,
      options,
    ) as unknown as PaymentSession
  }

  async order(
    paymentCaptureId: string | PaymentCapture,
    params?: QueryParamsRetrieve<Order>,
    options?: ResourcesConfig,
  ): Promise<Order> {
    const _paymentCaptureId = (paymentCaptureId as PaymentCapture).id || (paymentCaptureId as string)
    return this.resources.fetch<Order>(
      { type: 'orders' },
      `payment_captures/${_paymentCaptureId}/order`,
      params,
      options,
    ) as unknown as Order
  }

  async attachments(
    paymentCaptureId: string | PaymentCapture,
    params?: QueryParamsList<Attachment>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Attachment>> {
    const _paymentCaptureId = (paymentCaptureId as PaymentCapture).id || (paymentCaptureId as string)
    return this.resources.fetch<Attachment>(
      { type: 'attachments' },
      `payment_captures/${_paymentCaptureId}/attachments`,
      params,
      options,
    ) as unknown as ListResponse<Attachment>
  }

  async events(
    paymentCaptureId: string | PaymentCapture,
    params?: QueryParamsList<Event>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Event>> {
    const _paymentCaptureId = (paymentCaptureId as PaymentCapture).id || (paymentCaptureId as string)
    return this.resources.fetch<Event>(
      { type: 'events' },
      `payment_captures/${_paymentCaptureId}/events`,
      params,
      options,
    ) as unknown as ListResponse<Event>
  }

  async event_stores(
    paymentCaptureId: string | PaymentCapture,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _paymentCaptureId = (paymentCaptureId as PaymentCapture).id || (paymentCaptureId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `payment_captures/${_paymentCaptureId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async payment_authorization(
    paymentCaptureId: string | PaymentCapture,
    params?: QueryParamsRetrieve<PaymentAuthorization>,
    options?: ResourcesConfig,
  ): Promise<PaymentAuthorization> {
    const _paymentCaptureId = (paymentCaptureId as PaymentCapture).id || (paymentCaptureId as string)
    return this.resources.fetch<PaymentAuthorization>(
      { type: 'payment_authorizations' },
      `payment_captures/${_paymentCaptureId}/payment_authorization`,
      params,
      options,
    ) as unknown as PaymentAuthorization
  }

  async payment_refunds(
    paymentCaptureId: string | PaymentCapture,
    params?: QueryParamsList<PaymentRefund>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentRefund>> {
    const _paymentCaptureId = (paymentCaptureId as PaymentCapture).id || (paymentCaptureId as string)
    return this.resources.fetch<PaymentRefund>(
      { type: 'payment_refunds' },
      `payment_captures/${_paymentCaptureId}/payment_refunds`,
      params,
      options,
    ) as unknown as ListResponse<PaymentRefund>
  }

  isPaymentCapture(resource: any): resource is PaymentCapture {
    return resource.type && resource.type === PaymentCaptures.TYPE
  }

  relationship(id: string | ResourceId | null): PaymentCaptureRel {
    return super.relationshipOneToOne<PaymentCaptureRel>(id)
  }

  relationshipToMany(...ids: string[]): PaymentCaptureRel[] {
    return super.relationshipOneToMany<PaymentCaptureRel>(...ids)
  }

  type(): PaymentCaptureType {
    return PaymentCaptures.TYPE
  }
}

const instance = new PaymentCaptures()
export default instance

export type { PaymentCapture, PaymentCaptureCreate, PaymentCaptures, PaymentCaptureType, PaymentCaptureUpdate }
