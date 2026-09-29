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
import type { AdyenPayment } from './adyen_payments'
import type { Attachment } from './attachments'
import type { Authorization } from './authorizations'
import type { AxervePayment } from './axerve_payments'
import type { BraintreePayment } from './braintree_payments'
import type { Capture } from './captures'
import type { CheckoutComPayment } from './checkout_com_payments'
import type { EventStore } from './event_stores'
import type { Event } from './events'
import type { ExternalPayment } from './external_payments'
import type { KlarnaPayment } from './klarna_payments'
import type { Order } from './orders'
import type { PaypalPayment } from './paypal_payments'
import type { Refund } from './refunds'
import type { SatispayPayment } from './satispay_payments'
import type { StripePayment } from './stripe_payments'
import type { Void } from './voids'
import type { WireTransfer } from './wire_transfers'

type TransactionType = 'transactions' | 'authorizations' | 'captures' | 'refunds' | 'voids'
type TransactionRel = ResourceRel & { type: TransactionType }

export type TransactionSort = Pick<TransactionBase, 'id' | 'number' | 'amount_cents'> & ResourceSort
// export type TransactionFilter = Pick<Transaction, 'id' | 'number' | 'currency_code' | 'amount_cents' | 'succeeded' | 'message' | 'error_code' | 'error_detail' | 'token' | 'gateway_transaction_id'> & ResourceFilter

/**
 * The Transaction object is returned as part of the response body of each successful list or retrieve API call to the /api/transactions endpoint.
 *
 * @deprecated Last available in API version 2017-08.
 * @link https://docs.commercelayer.io/core-api-reference/transactions/object
 */
type Transaction = Authorization | Capture | Refund | Void

interface TransactionBase extends Resource {
  readonly type: TransactionType

  /**
   * The transaction number, auto generated.
   * @example ```"42/T/001"```
   */
  number: string
  /**
   * Information about the payment method used in the transaction.
   * @example ```"credit card"```
   */
  payment_method_type?: string | null
  /**
   * The international 3-letter currency code as defined by the ISO 4217 standard, inherited from the associated order.
   * @example ```"EUR"```
   */
  currency_code: string
  /**
   * The transaction amount, in cents.
   * @example ```1500```
   */
  amount_cents: number
  /**
   * The transaction amount, float.
   * @example ```15```
   */
  amount_float: number
  /**
   * The transaction amount, formatted.
   * @example ```"€15,00"```
   */
  formatted_amount: string
  /**
   * Indicates if the transaction is successful.
   */
  succeeded: boolean
  /**
   * The message returned by the payment gateway.
   * @example ```"Accepted"```
   */
  message?: string | null
  /**
   * The error code, if any, returned by the payment gateway.
   * @example ```"00001"```
   */
  error_code?: string | null
  /**
   * The error detail, if any, returned by the payment gateway.
   * @example ```"Already settled"```
   */
  error_detail?: string | null
  /**
   * The token identifying the transaction, returned by the payment gateway.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  token?: string | null
  /**
   * The ID identifying the transaction, returned by the payment gateway.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  gateway_transaction_id?: string | null

  order?: Order | null
  payment_source?:
    | AdyenPayment
    | AxervePayment
    | BraintreePayment
    | CheckoutComPayment
    | ExternalPayment
    | KlarnaPayment
    | PaypalPayment
    | SatispayPayment
    | StripePayment
    | WireTransfer
    | null
  attachments?: Attachment[] | null
  events?: Event[] | null
  event_stores?: EventStore[] | null
}

/** @deprecated Last available in API version 2017-08. */
class Transactions extends ApiResource<Transaction> {
  static readonly TYPE: TransactionType = 'transactions' as const

  async order(
    transactionId: string | Transaction,
    params?: QueryParamsRetrieve<Order>,
    options?: ResourcesConfig,
  ): Promise<Order> {
    const _transactionId = (transactionId as Transaction).id || (transactionId as string)
    return this.resources.fetch<Order>(
      { type: 'orders' },
      `transactions/${_transactionId}/order`,
      params,
      options,
    ) as unknown as Order
  }

  async attachments(
    transactionId: string | Transaction,
    params?: QueryParamsList<Attachment>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Attachment>> {
    const _transactionId = (transactionId as Transaction).id || (transactionId as string)
    return this.resources.fetch<Attachment>(
      { type: 'attachments' },
      `transactions/${_transactionId}/attachments`,
      params,
      options,
    ) as unknown as ListResponse<Attachment>
  }

  async events(
    transactionId: string | Transaction,
    params?: QueryParamsList<Event>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Event>> {
    const _transactionId = (transactionId as Transaction).id || (transactionId as string)
    return this.resources.fetch<Event>(
      { type: 'events' },
      `transactions/${_transactionId}/events`,
      params,
      options,
    ) as unknown as ListResponse<Event>
  }

  async event_stores(
    transactionId: string | Transaction,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _transactionId = (transactionId as Transaction).id || (transactionId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `transactions/${_transactionId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  isTransaction(resource: any): resource is Transaction {
    return (
      !!resource.type &&
      (resource.type === Transactions.TYPE ||
        ['authorizations', 'captures', 'refunds', 'voids'].includes(resource.type))
    )
  }

  relationship(id: string | ResourceId | null): TransactionRel {
    return super.relationshipOneToOne<TransactionRel>(id)
  }

  relationshipToMany(...ids: string[]): TransactionRel[] {
    return super.relationshipOneToMany<TransactionRel>(...ids)
  }

  type(): TransactionType {
    return Transactions.TYPE
  }
}

const instance = new Transactions()
export default instance

export type { Transaction, Transactions, TransactionType }
