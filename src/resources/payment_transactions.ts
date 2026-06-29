import type { QueryParamsList, QueryParamsRetrieve } from '../query'
import type {
  ListResponse,
  Resource,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
} from '../resource'
import { ApiResource } from '../resource'
import type { Attachment } from './attachments'
import type { EventStore } from './event_stores'
import type { Event } from './events'
import type { Order } from './orders'
import type { PaymentSession } from './payment_sessions'
import type { PaymentSetting } from './payment_settings'

type PaymentTransactionType = 'payment_transactions'
type PaymentTransactionRel = ResourceRel & { type: PaymentTransactionType }

export type PaymentTransactionSort = Pick<
  PaymentTransaction,
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

interface PaymentTransaction extends Resource {
  readonly type: PaymentTransactionType

  /**
   * The transaction status.
   * @example ```"draft"```
   */
  status: string
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
   * The payment gateway response data, specific to this transaction.
   * @example ```{}```
   */
  response_data?: Record<string, any> | null
  /**
   * Options to use for the transaction, the passed values will be used to communicate with the payment gateway.
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
    return resource.type && resource.type === PaymentTransactions.TYPE
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
