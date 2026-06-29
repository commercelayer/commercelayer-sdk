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
import type { Order } from './orders'
import type { PaymentCapture } from './payment_captures'
import type { PaymentSession, PaymentSessionType } from './payment_sessions'
import type { PaymentSetting } from './payment_settings'
import type { PaymentVoid } from './payment_voids'

type PaymentAuthorizationType = 'payment_authorizations'
type PaymentAuthorizationRel = ResourceRel & { type: PaymentAuthorizationType }
type PaymentSessionRel = ResourceRel & { type: PaymentSessionType }

export type PaymentAuthorizationSort = Pick<
  PaymentAuthorization,
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
// export type PaymentAuthorizationFilter = Pick<PaymentAuthorization, 'id' | 'status' | 'payment_type' | 'token' | 'currency_code' | 'amount_cents' | 'options' | 'requires_action_at' | 'processing_at' | 'succeeded_at' | 'declined_at' | 'failed_at' | 'canceled_at' | 'expired_at'> & ResourceFilter

interface PaymentAuthorization extends Resource {
  readonly type: PaymentAuthorizationType

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
  /**
   * The balance to be captured, in cents.
   * @example ```1000```
   */
  capture_balance_cents?: number | null
  /**
   * The balance to be captured, float.
   * @example ```10```
   */
  capture_balance_float?: number | null
  /**
   * The balance to be captured, formatted.
   * @example ```"€10,00"```
   */
  formatted_capture_balance?: string | null
  /**
   * The balance to be voided, in cents.
   * @example ```1500```
   */
  void_balance_cents?: number | null
  /**
   * The balance to be voided, float.
   * @example ```15```
   */
  void_balance_float?: number | null
  /**
   * The balance to be voided, formatted.
   * @example ```"€15,00"```
   */
  formatted_void_balance?: string | null

  payment_session?: PaymentSession | null
  order?: Order | null
  payment_setting?: PaymentSetting | null
  attachments?: Attachment[] | null
  events?: Event[] | null
  event_stores?: EventStore[] | null
  payment_void?: PaymentVoid | null
  payment_captures?: PaymentCapture[] | null
}

interface PaymentAuthorizationCreate extends ResourceCreate {
  /**
   * Options to use for the transaction, the passed values will be used to communicate with the payment gateway.
   * @example ```{"cancellation_reason":"fraudulent"}```
   */
  options?: Record<string, any> | null

  payment_session: PaymentSessionRel
}

interface PaymentAuthorizationUpdate extends ResourceUpdate {
  /**
   * Send this attribute if you want to send additional details for the payment collected by client, such as 3DS authentication result.
   * @example ```{"foo":"bar"}```
   */
  _payment_details?: Record<string, any> | null
}

class PaymentAuthorizations extends ApiResource<PaymentAuthorization> {
  static readonly TYPE: PaymentAuthorizationType = 'payment_authorizations' as const

  async create(
    resource: PaymentAuthorizationCreate,
    params?: QueryParamsRetrieve<PaymentAuthorization>,
    options?: ResourcesConfig,
  ): Promise<PaymentAuthorization> {
    return this.resources.create<PaymentAuthorizationCreate, PaymentAuthorization>(
      { ...resource, type: PaymentAuthorizations.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: PaymentAuthorizationUpdate,
    params?: QueryParamsRetrieve<PaymentAuthorization>,
    options?: ResourcesConfig,
  ): Promise<PaymentAuthorization> {
    return this.resources.update<PaymentAuthorizationUpdate, PaymentAuthorization>(
      { ...resource, type: PaymentAuthorizations.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: PaymentAuthorizations.TYPE } : id, options)
  }

  async payment_session(
    paymentAuthorizationId: string | PaymentAuthorization,
    params?: QueryParamsRetrieve<PaymentSession>,
    options?: ResourcesConfig,
  ): Promise<PaymentSession> {
    const _paymentAuthorizationId =
      (paymentAuthorizationId as PaymentAuthorization).id || (paymentAuthorizationId as string)
    return this.resources.fetch<PaymentSession>(
      { type: 'payment_sessions' },
      `payment_authorizations/${_paymentAuthorizationId}/payment_session`,
      params,
      options,
    ) as unknown as PaymentSession
  }

  async order(
    paymentAuthorizationId: string | PaymentAuthorization,
    params?: QueryParamsRetrieve<Order>,
    options?: ResourcesConfig,
  ): Promise<Order> {
    const _paymentAuthorizationId =
      (paymentAuthorizationId as PaymentAuthorization).id || (paymentAuthorizationId as string)
    return this.resources.fetch<Order>(
      { type: 'orders' },
      `payment_authorizations/${_paymentAuthorizationId}/order`,
      params,
      options,
    ) as unknown as Order
  }

  async attachments(
    paymentAuthorizationId: string | PaymentAuthorization,
    params?: QueryParamsList<Attachment>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Attachment>> {
    const _paymentAuthorizationId =
      (paymentAuthorizationId as PaymentAuthorization).id || (paymentAuthorizationId as string)
    return this.resources.fetch<Attachment>(
      { type: 'attachments' },
      `payment_authorizations/${_paymentAuthorizationId}/attachments`,
      params,
      options,
    ) as unknown as ListResponse<Attachment>
  }

  async events(
    paymentAuthorizationId: string | PaymentAuthorization,
    params?: QueryParamsList<Event>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Event>> {
    const _paymentAuthorizationId =
      (paymentAuthorizationId as PaymentAuthorization).id || (paymentAuthorizationId as string)
    return this.resources.fetch<Event>(
      { type: 'events' },
      `payment_authorizations/${_paymentAuthorizationId}/events`,
      params,
      options,
    ) as unknown as ListResponse<Event>
  }

  async event_stores(
    paymentAuthorizationId: string | PaymentAuthorization,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _paymentAuthorizationId =
      (paymentAuthorizationId as PaymentAuthorization).id || (paymentAuthorizationId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `payment_authorizations/${_paymentAuthorizationId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async payment_void(
    paymentAuthorizationId: string | PaymentAuthorization,
    params?: QueryParamsRetrieve<PaymentVoid>,
    options?: ResourcesConfig,
  ): Promise<PaymentVoid> {
    const _paymentAuthorizationId =
      (paymentAuthorizationId as PaymentAuthorization).id || (paymentAuthorizationId as string)
    return this.resources.fetch<PaymentVoid>(
      { type: 'payment_voids' },
      `payment_authorizations/${_paymentAuthorizationId}/payment_void`,
      params,
      options,
    ) as unknown as PaymentVoid
  }

  async payment_captures(
    paymentAuthorizationId: string | PaymentAuthorization,
    params?: QueryParamsList<PaymentCapture>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentCapture>> {
    const _paymentAuthorizationId =
      (paymentAuthorizationId as PaymentAuthorization).id || (paymentAuthorizationId as string)
    return this.resources.fetch<PaymentCapture>(
      { type: 'payment_captures' },
      `payment_authorizations/${_paymentAuthorizationId}/payment_captures`,
      params,
      options,
    ) as unknown as ListResponse<PaymentCapture>
  }

  async _payment_details(
    id: string | PaymentAuthorization,
    triggerValue: Record<string, any>,
    params?: QueryParamsRetrieve<PaymentAuthorization>,
    options?: ResourcesConfig,
  ): Promise<PaymentAuthorization> {
    return this.resources.update<PaymentAuthorizationUpdate, PaymentAuthorization>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentAuthorizations.TYPE, _payment_details: triggerValue },
      params,
      options,
    )
  }

  isPaymentAuthorization(resource: any): resource is PaymentAuthorization {
    return resource.type && resource.type === PaymentAuthorizations.TYPE
  }

  relationship(id: string | ResourceId | null): PaymentAuthorizationRel {
    return super.relationshipOneToOne<PaymentAuthorizationRel>(id)
  }

  relationshipToMany(...ids: string[]): PaymentAuthorizationRel[] {
    return super.relationshipOneToMany<PaymentAuthorizationRel>(...ids)
  }

  type(): PaymentAuthorizationType {
    return PaymentAuthorizations.TYPE
  }
}

const instance = new PaymentAuthorizations()
export default instance

export type {
  PaymentAuthorization,
  PaymentAuthorizationCreate,
  PaymentAuthorizations,
  PaymentAuthorizationType,
  PaymentAuthorizationUpdate,
}
