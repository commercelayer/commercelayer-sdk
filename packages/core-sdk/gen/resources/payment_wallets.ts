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
import type { Customer, CustomerType } from './customers'
import type { EventStore } from './event_stores'
import type { Event } from './events'
import type { OrderSubscription } from './order_subscriptions'
import type { PaymentSession } from './payment_sessions'
import type { PaymentSetting, PaymentSettingType } from './payment_settings'

type PaymentWalletType = 'payment_wallets'
type PaymentWalletRel = ResourceRel & { type: PaymentWalletType }
type CustomerRel = ResourceRel & { type: CustomerType }
type PaymentSettingRel = ResourceRel & { type: PaymentSettingType }

export type PaymentWalletSort = Pick<
  PaymentWallet,
  | 'id'
  | 'status'
  | 'customer_token'
  | 'requires_action_at'
  | 'processing_at'
  | 'succeeded_at'
  | 'canceled_at'
  | 'expires_at'
> &
  ResourceSort
// export type PaymentWalletFilter = Pick<PaymentWallet, 'id' | 'status' | 'token' | 'customer_token' | 'payment_token' | 'requires_action_at' | 'processing_at' | 'succeeded_at' | 'canceled_at' | 'expires_at'> & ResourceFilter

/**
 * The Payment wallet object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/payment_wallets endpoint.
 * @since 2026-05
 *
 * @link https://docs.commercelayer.io/core-api-reference/payment_wallets/object
 */
interface PaymentWallet extends Resource {
  readonly type: PaymentWalletType

  /**
   * The payment wallet status. One of 'pending' (default), 'requires_action', 'processing', 'succeeded', or 'canceled'.
   * @example ```"succeeded"```
   */
  status: 'pending' | 'requires_action' | 'processing' | 'succeeded' | 'canceled'
  /**
   * The unique token identifying the payment wallet.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  token?: string | null
  /**
   * The token identifying the customer on the gateway.
   * @example ```"cus_xxxyyyzzz"```
   */
  customer_token?: string | null
  /**
   * The token identifying the payment method on the gateway.
   * @example ```"pm_xxxyyyzzz"```
   */
  payment_token?: string | null
  /**
   * Options to use for the payment wallet, the passed values will be used to communicate with the payment gateway. Cannot be passed by sales channels.
   * @example ```{"usage":"on_session"}```
   */
  options?: Record<string, any> | null
  /**
   * The data of the payment method related to this wallet.
   * @example ```{}```
   */
  payment_data?: Record<string, any> | null
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
   * Time at which the payment wallet is marked as requires_action.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  requires_action_at?: string | null
  /**
   * Time at which the payment wallet has been processed.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  processing_at?: string | null
  /**
   * Time at which the payment wallet is marked as succeeded.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  succeeded_at?: string | null
  /**
   * Time at which the payment wallet has been cancelled.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  canceled_at?: string | null
  /**
   * Time at which this payment wallet will expire.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  expires_at?: string | null

  customer?: Customer | null
  payment_setting?: PaymentSetting | null
  payment_sessions?: PaymentSession[] | null
  order_subscriptions?: OrderSubscription[] | null
  attachments?: Attachment[] | null
  events?: Event[] | null
  event_stores?: EventStore[] | null
}

interface PaymentWalletCreate extends ResourceCreate {
  /**
   * Send this attribute on create if you want to send details for the payment to be stored.
   * @example ```{"foo":"bar"}```
   */
  _payment_details?: Record<string, any> | null
  /**
   * Send this attribute if you want to force a specific supported internal payload version for this request, overriding the payment setting's configured default. Only usable when the payment setting is internal_versionable.
   * @example ```"V72"```
   */
  _internal_version?: string | null
  /**
   * The token identifying the customer on the gateway.
   * @example ```"cus_xxxyyyzzz"```
   */
  customer_token?: string | null
  /**
   * The token identifying the payment method on the gateway.
   * @example ```"pm_xxxyyyzzz"```
   */
  payment_token?: string | null
  /**
   * Options to use for the payment wallet, the passed values will be used to communicate with the payment gateway. Cannot be passed by sales channels.
   * @example ```{"usage":"on_session"}```
   */
  options?: Record<string, any> | null
  /**
   * Time at which this payment wallet will expire.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  expires_at?: string | null

  customer: CustomerRel
  payment_setting: PaymentSettingRel
}

interface PaymentWalletUpdate extends ResourceUpdate {
  /**
   * The token identifying the payment method on the gateway.
   * @example ```"pm_xxxyyyzzz"```
   */
  payment_token?: string | null
  /**
   * Send this attribute if you want to update the payment wallet with fresh data from the payment gateway.
   * @example ```true```
   */
  _refresh?: boolean | null
  /**
   * Send this attribute if you want to cancel this payment wallet. Cannot be passed by sales channels.
   * @example ```true```
   */
  _cancel?: boolean | null
  /**
   * Time at which this payment wallet will expire.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  expires_at?: string | null
}

/** @since 2026-05 */
class PaymentWallets extends ApiResource<PaymentWallet> {
  static readonly TYPE: PaymentWalletType = 'payment_wallets' as const

  async create(
    resource: PaymentWalletCreate,
    params?: QueryParamsRetrieve<PaymentWallet>,
    options?: ResourcesConfig,
  ): Promise<PaymentWallet> {
    return this.resources.create<PaymentWalletCreate, PaymentWallet>(
      { ...resource, type: PaymentWallets.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: PaymentWalletUpdate,
    params?: QueryParamsRetrieve<PaymentWallet>,
    options?: ResourcesConfig,
  ): Promise<PaymentWallet> {
    return this.resources.update<PaymentWalletUpdate, PaymentWallet>(
      { ...resource, type: PaymentWallets.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: PaymentWallets.TYPE } : id, options)
  }

  async customer(
    paymentWalletId: string | PaymentWallet,
    params?: QueryParamsRetrieve<Customer>,
    options?: ResourcesConfig,
  ): Promise<Customer> {
    const _paymentWalletId = (paymentWalletId as PaymentWallet).id || (paymentWalletId as string)
    return this.resources.fetch<Customer>(
      { type: 'customers' },
      `payment_wallets/${_paymentWalletId}/customer`,
      params,
      options,
    ) as unknown as Customer
  }

  async payment_setting(
    paymentWalletId: string | PaymentWallet,
    params?: QueryParamsRetrieve<PaymentSetting>,
    options?: ResourcesConfig,
  ): Promise<PaymentSetting> {
    const _paymentWalletId = (paymentWalletId as PaymentWallet).id || (paymentWalletId as string)
    return this.resources.fetch<PaymentSetting>(
      { type: 'payment_settings' },
      `payment_wallets/${_paymentWalletId}/payment_setting`,
      params,
      options,
    ) as unknown as PaymentSetting
  }

  async payment_sessions(
    paymentWalletId: string | PaymentWallet,
    params?: QueryParamsList<PaymentSession>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentSession>> {
    const _paymentWalletId = (paymentWalletId as PaymentWallet).id || (paymentWalletId as string)
    return this.resources.fetch<PaymentSession>(
      { type: 'payment_sessions' },
      `payment_wallets/${_paymentWalletId}/payment_sessions`,
      params,
      options,
    ) as unknown as ListResponse<PaymentSession>
  }

  async order_subscriptions(
    paymentWalletId: string | PaymentWallet,
    params?: QueryParamsList<OrderSubscription>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<OrderSubscription>> {
    const _paymentWalletId = (paymentWalletId as PaymentWallet).id || (paymentWalletId as string)
    return this.resources.fetch<OrderSubscription>(
      { type: 'order_subscriptions' },
      `payment_wallets/${_paymentWalletId}/order_subscriptions`,
      params,
      options,
    ) as unknown as ListResponse<OrderSubscription>
  }

  async attachments(
    paymentWalletId: string | PaymentWallet,
    params?: QueryParamsList<Attachment>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Attachment>> {
    const _paymentWalletId = (paymentWalletId as PaymentWallet).id || (paymentWalletId as string)
    return this.resources.fetch<Attachment>(
      { type: 'attachments' },
      `payment_wallets/${_paymentWalletId}/attachments`,
      params,
      options,
    ) as unknown as ListResponse<Attachment>
  }

  async events(
    paymentWalletId: string | PaymentWallet,
    params?: QueryParamsList<Event>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Event>> {
    const _paymentWalletId = (paymentWalletId as PaymentWallet).id || (paymentWalletId as string)
    return this.resources.fetch<Event>(
      { type: 'events' },
      `payment_wallets/${_paymentWalletId}/events`,
      params,
      options,
    ) as unknown as ListResponse<Event>
  }

  async event_stores(
    paymentWalletId: string | PaymentWallet,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _paymentWalletId = (paymentWalletId as PaymentWallet).id || (paymentWalletId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `payment_wallets/${_paymentWalletId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async _refresh(
    id: string | PaymentWallet,
    params?: QueryParamsRetrieve<PaymentWallet>,
    options?: ResourcesConfig,
  ): Promise<PaymentWallet> {
    return this.resources.update<PaymentWalletUpdate, PaymentWallet>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentWallets.TYPE, _refresh: true },
      params,
      options,
    )
  }

  async _cancel(
    id: string | PaymentWallet,
    params?: QueryParamsRetrieve<PaymentWallet>,
    options?: ResourcesConfig,
  ): Promise<PaymentWallet> {
    return this.resources.update<PaymentWalletUpdate, PaymentWallet>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentWallets.TYPE, _cancel: true },
      params,
      options,
    )
  }

  isPaymentWallet(resource: any): resource is PaymentWallet {
    return resource.type && resource.type === PaymentWallets.TYPE
  }

  relationship(id: string | ResourceId | null): PaymentWalletRel {
    return super.relationshipOneToOne<PaymentWalletRel>(id)
  }

  relationshipToMany(...ids: string[]): PaymentWalletRel[] {
    return super.relationshipOneToMany<PaymentWalletRel>(...ids)
  }

  type(): PaymentWalletType {
    return PaymentWallets.TYPE
  }
}

const instance = new PaymentWallets()
export default instance

export type { PaymentWallet, PaymentWalletCreate, PaymentWallets, PaymentWalletType, PaymentWalletUpdate }
