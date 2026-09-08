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
import type { PaymentCapture, PaymentCaptureType } from './payment_captures'
import type { PaymentSession, PaymentSessionType } from './payment_sessions'
import type { PaymentSetting } from './payment_settings'
import type { Return, ReturnType } from './returns'

type PaymentRefundType = 'payment_refunds'
type PaymentRefundRel = ResourceRel & { type: PaymentRefundType }
type PaymentSessionRel = ResourceRel & { type: PaymentSessionType }
type PaymentCaptureRel = ResourceRel & { type: PaymentCaptureType }
type ReturnRel = ResourceRel & { type: ReturnType }

export type PaymentRefundSort = Pick<
  PaymentRefund,
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
// export type PaymentRefundFilter = Pick<PaymentRefund, 'id' | 'status' | 'payment_type' | 'token' | 'currency_code' | 'amount_cents' | 'options' | 'requires_action_at' | 'processing_at' | 'succeeded_at' | 'declined_at' | 'failed_at' | 'canceled_at' | 'expired_at'> & ResourceFilter

/**
 * The Payment refund object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/payment_refunds endpoint.
 * @since 2026-05
 *
 * @link https://docs.commercelayer.io/core-api-reference/payment_refunds/object
 */
interface PaymentRefund extends Resource {
  readonly type: PaymentRefundType

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

  payment_session?: PaymentSession | null
  order?: Order | null
  payment_setting?: PaymentSetting | null
  attachments?: Attachment[] | null
  events?: Event[] | null
  event_stores?: EventStore[] | null
  payment_capture?: PaymentCapture | null
  return?: Return | null
}

interface PaymentRefundCreate extends ResourceCreate {
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
  payment_capture: PaymentCaptureRel
  return?: ReturnRel | null
}

type PaymentRefundUpdate = ResourceUpdate

/** @since 2026-05 */
class PaymentRefunds extends ApiResource<PaymentRefund> {
  static readonly TYPE: PaymentRefundType = 'payment_refunds' as const

  async create(
    resource: PaymentRefundCreate,
    params?: QueryParamsRetrieve<PaymentRefund>,
    options?: ResourcesConfig,
  ): Promise<PaymentRefund> {
    return this.resources.create<PaymentRefundCreate, PaymentRefund>(
      { ...resource, type: PaymentRefunds.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: PaymentRefundUpdate,
    params?: QueryParamsRetrieve<PaymentRefund>,
    options?: ResourcesConfig,
  ): Promise<PaymentRefund> {
    return this.resources.update<PaymentRefundUpdate, PaymentRefund>(
      { ...resource, type: PaymentRefunds.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: PaymentRefunds.TYPE } : id, options)
  }

  async payment_session(
    paymentRefundId: string | PaymentRefund,
    params?: QueryParamsRetrieve<PaymentSession>,
    options?: ResourcesConfig,
  ): Promise<PaymentSession> {
    const _paymentRefundId = (paymentRefundId as PaymentRefund).id || (paymentRefundId as string)
    return this.resources.fetch<PaymentSession>(
      { type: 'payment_sessions' },
      `payment_refunds/${_paymentRefundId}/payment_session`,
      params,
      options,
    ) as unknown as PaymentSession
  }

  async order(
    paymentRefundId: string | PaymentRefund,
    params?: QueryParamsRetrieve<Order>,
    options?: ResourcesConfig,
  ): Promise<Order> {
    const _paymentRefundId = (paymentRefundId as PaymentRefund).id || (paymentRefundId as string)
    return this.resources.fetch<Order>(
      { type: 'orders' },
      `payment_refunds/${_paymentRefundId}/order`,
      params,
      options,
    ) as unknown as Order
  }

  async attachments(
    paymentRefundId: string | PaymentRefund,
    params?: QueryParamsList<Attachment>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Attachment>> {
    const _paymentRefundId = (paymentRefundId as PaymentRefund).id || (paymentRefundId as string)
    return this.resources.fetch<Attachment>(
      { type: 'attachments' },
      `payment_refunds/${_paymentRefundId}/attachments`,
      params,
      options,
    ) as unknown as ListResponse<Attachment>
  }

  async events(
    paymentRefundId: string | PaymentRefund,
    params?: QueryParamsList<Event>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Event>> {
    const _paymentRefundId = (paymentRefundId as PaymentRefund).id || (paymentRefundId as string)
    return this.resources.fetch<Event>(
      { type: 'events' },
      `payment_refunds/${_paymentRefundId}/events`,
      params,
      options,
    ) as unknown as ListResponse<Event>
  }

  async event_stores(
    paymentRefundId: string | PaymentRefund,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _paymentRefundId = (paymentRefundId as PaymentRefund).id || (paymentRefundId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `payment_refunds/${_paymentRefundId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async payment_capture(
    paymentRefundId: string | PaymentRefund,
    params?: QueryParamsRetrieve<PaymentCapture>,
    options?: ResourcesConfig,
  ): Promise<PaymentCapture> {
    const _paymentRefundId = (paymentRefundId as PaymentRefund).id || (paymentRefundId as string)
    return this.resources.fetch<PaymentCapture>(
      { type: 'payment_captures' },
      `payment_refunds/${_paymentRefundId}/payment_capture`,
      params,
      options,
    ) as unknown as PaymentCapture
  }

  async return(
    paymentRefundId: string | PaymentRefund,
    params?: QueryParamsRetrieve<Return>,
    options?: ResourcesConfig,
  ): Promise<Return> {
    const _paymentRefundId = (paymentRefundId as PaymentRefund).id || (paymentRefundId as string)
    return this.resources.fetch<Return>(
      { type: 'returns' },
      `payment_refunds/${_paymentRefundId}/return`,
      params,
      options,
    ) as unknown as Return
  }

  isPaymentRefund(resource: any): resource is PaymentRefund {
    return resource.type && resource.type === PaymentRefunds.TYPE
  }

  relationship(id: string | ResourceId | null): PaymentRefundRel {
    return super.relationshipOneToOne<PaymentRefundRel>(id)
  }

  relationshipToMany(...ids: string[]): PaymentRefundRel[] {
    return super.relationshipOneToMany<PaymentRefundRel>(...ids)
  }

  type(): PaymentRefundType {
    return PaymentRefunds.TYPE
  }
}

const instance = new PaymentRefunds()
export default instance

export type { PaymentRefund, PaymentRefundCreate, PaymentRefunds, PaymentRefundType, PaymentRefundUpdate }
