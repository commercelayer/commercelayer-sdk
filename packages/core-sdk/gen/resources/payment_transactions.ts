import type { QueryParamsList, QueryParamsRetrieve } from '@runtime/query'
import type {
  ListResponse,
  Resource,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
} from '@runtime/resource'
import { ApiResource } from '@runtime/resource'
import type { Attachment } from './attachments'
import type { EventStore } from './event_stores'
import type { Event } from './events'
import type { Order } from './orders'
import type { PaymentAuthorization } from './payment_authorizations'
import type { PaymentCapture } from './payment_captures'
import type { PaymentRefund } from './payment_refunds'
import type { PaymentSession } from './payment_sessions'
import type { PaymentSetting } from './payment_settings'
import type { PaymentVoid } from './payment_voids'

type PaymentTransactionType =
  | 'payment_transactions'
  | 'payment_authorizations'
  | 'payment_captures'
  | 'payment_refunds'
  | 'payment_voids'
type PaymentTransactionRel = ResourceRel & { type: PaymentTransactionType }

export type PaymentTransactionSort = Pick<
  PaymentTransactionBase,
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
// export type PaymentTransactionFilter = Pick<PaymentTransaction, 'id' | 'status' | 'payment_type' | 'token' | 'currency_code' | 'amount_cents' | 'options' | 'requires_action_at' | 'processing_at' | 'succeeded_at' | 'declined_at' | 'failed_at' | 'canceled_at' | 'expired_at'> & ResourceFilter

/**
 * The Payment transaction object is returned as part of the response body of each successful list or retrieve API call to the /api/payment_transactions endpoint.
 * @since 2026-05
 *
 * @link https://docs.commercelayer.io/core-api-reference/payment_transactions/object
 */
type PaymentTransaction = PaymentAuthorization | PaymentCapture | PaymentRefund | PaymentVoid

interface PaymentTransactionBase extends Resource {
  readonly type: PaymentTransactionType

  /**
   * The transaction status. One of 'pending' (default), 'requires_action', 'processing', 'succeeded', 'declined', 'failed', 'canceled', or 'expired'.
   * @example ```"draft"```
   */
  status: 'pending' | 'requires_action' | 'processing' | 'succeeded' | 'declined' | 'failed' | 'canceled' | 'expired'
  /**
   * The payment type inherited by the payment session. One of 'ADYEN', 'BRAINTREE', 'CHECKOUT_COM', 'EXTERNAL', 'GIFT_CARD', 'MANUAL', 'PAYPAL', or 'STRIPE'.
   * @example ```"MANUAL"```
   */
  payment_type: 'ADYEN' | 'BRAINTREE' | 'CHECKOUT_COM' | 'EXTERNAL' | 'GIFT_CARD' | 'MANUAL' | 'PAYPAL' | 'STRIPE'
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
}

/** @since 2026-05 */
class PaymentTransactions extends ApiResource<PaymentTransaction> {
  static readonly TYPE: PaymentTransactionType = 'payment_transactions' as const

  async payment_session(
    paymentTransactionId: string | PaymentTransaction,
    params?: QueryParamsRetrieve<PaymentSession>,
    options?: ResourcesConfig,
  ): Promise<PaymentSession> {
    const _paymentTransactionId = (paymentTransactionId as PaymentTransaction).id || (paymentTransactionId as string)
    return this.resources.fetch<PaymentSession>(
      { type: 'payment_sessions' },
      `payment_transactions/${_paymentTransactionId}/payment_session`,
      params,
      options,
    ) as unknown as PaymentSession
  }

  async order(
    paymentTransactionId: string | PaymentTransaction,
    params?: QueryParamsRetrieve<Order>,
    options?: ResourcesConfig,
  ): Promise<Order> {
    const _paymentTransactionId = (paymentTransactionId as PaymentTransaction).id || (paymentTransactionId as string)
    return this.resources.fetch<Order>(
      { type: 'orders' },
      `payment_transactions/${_paymentTransactionId}/order`,
      params,
      options,
    ) as unknown as Order
  }

  async attachments(
    paymentTransactionId: string | PaymentTransaction,
    params?: QueryParamsList<Attachment>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Attachment>> {
    const _paymentTransactionId = (paymentTransactionId as PaymentTransaction).id || (paymentTransactionId as string)
    return this.resources.fetch<Attachment>(
      { type: 'attachments' },
      `payment_transactions/${_paymentTransactionId}/attachments`,
      params,
      options,
    ) as unknown as ListResponse<Attachment>
  }

  async events(
    paymentTransactionId: string | PaymentTransaction,
    params?: QueryParamsList<Event>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Event>> {
    const _paymentTransactionId = (paymentTransactionId as PaymentTransaction).id || (paymentTransactionId as string)
    return this.resources.fetch<Event>(
      { type: 'events' },
      `payment_transactions/${_paymentTransactionId}/events`,
      params,
      options,
    ) as unknown as ListResponse<Event>
  }

  async event_stores(
    paymentTransactionId: string | PaymentTransaction,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _paymentTransactionId = (paymentTransactionId as PaymentTransaction).id || (paymentTransactionId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `payment_transactions/${_paymentTransactionId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  isPaymentTransaction(resource: any): resource is PaymentTransaction {
    return (
      !!resource.type &&
      (resource.type === PaymentTransactions.TYPE ||
        ['payment_authorizations', 'payment_captures', 'payment_refunds', 'payment_voids'].includes(resource.type))
    )
  }

  relationship(id: string | ResourceId | null): PaymentTransactionRel {
    return super.relationshipOneToOne<PaymentTransactionRel>(id)
  }

  relationshipToMany(...ids: string[]): PaymentTransactionRel[] {
    return super.relationshipOneToMany<PaymentTransactionRel>(...ids)
  }

  type(): PaymentTransactionType {
    return PaymentTransactions.TYPE
  }
}

const instance = new PaymentTransactions()
export default instance

export type { PaymentTransaction, PaymentTransactions, PaymentTransactionType }
