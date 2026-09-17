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
import type { EventStore } from './event_stores'
import type { OrderSubscription } from './order_subscriptions'
import type { PaymentLink } from './payment_links'
import type { PaymentSession } from './payment_sessions'
import type { PaymentTransaction } from './payment_transactions'
import type { PaymentWallet } from './payment_wallets'

type PaymentSettingPaypalType = 'payment_setting_paypals'
type PaymentSettingPaypalRel = ResourceRel & { type: PaymentSettingPaypalType }

export type PaymentSettingPaypalSort = Pick<PaymentSettingPaypal, 'id' | 'name' | 'disabled_at'> & ResourceSort
// export type PaymentSettingPaypalFilter = Pick<PaymentSettingPaypal, 'id' | 'gateway_version' | 'internal_versionable' | 'auto_capture' | 'auto_place' | 'name' | 'disabled_at'> & ResourceFilter

/**
 * The Payment setting paypal object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/payment_setting_paypals endpoint.
 * @since 2026-05
 *
 * @link https://docs.commercelayer.io/core-api-reference/payment_setting_paypals/object
 */
interface PaymentSettingPaypal extends Resource {
  readonly type: PaymentSettingPaypalType

  /**
   * The gateway version of the payment setting (external API version).
   * @example ```"2025-09-30.clover"```
   */
  gateway_version?: string | null
  /**
   * The internal versions of the payment setting for payload changes.
   * @example ```{"payment_intent":"V1","setup_intent":"V3"}```
   */
  internal_versions?: Record<string, any> | null
  /**
   * Indicates whether this payment setting's gateway supports internal payload versioning (see internal_versions).
   * @example ```true```
   */
  internal_versionable?: boolean | null
  /**
   * Send this attribute if you want the payment to be automatically captured when authorized.
   */
  auto_capture?: boolean | null
  /**
   * Send this attribute if you want the order to be automatically placed when a payment session using this payment setting is authorized.
   */
  auto_place?: boolean | null
  /**
   * The name of the payment setting.
   * @example ```"Stripe"```
   */
  name?: string | null
  /**
   * Time at which this resource was disabled.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  disabled_at?: string | null
  /**
   * The gateway webhook ID, generated automatically.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  webhook_id?: string | null
  /**
   * The gateway webhook URL, generated automatically.
   * @example ```"https://core.commercelayer.co/webhook_callbacks/payment_setting_paypals/xxxxx"```
   */
  webhook_endpoint_url?: string | null

  payment_links?: PaymentLink[] | null
  payment_sessions?: PaymentSession[] | null
  payment_transactions?: PaymentTransaction[] | null
  payment_wallets?: PaymentWallet[] | null
  order_subscriptions?: OrderSubscription[] | null
  event_stores?: EventStore[] | null
}

interface PaymentSettingPaypalCreate extends ResourceCreate {
  /**
   * The gateway version of the payment setting (external API version).
   * @example ```"2025-09-30.clover"```
   */
  gateway_version?: string | null
  /**
   * Send this attribute if you want the payment to be automatically captured when authorized.
   */
  auto_capture?: boolean | null
  /**
   * Send this attribute if you want the order to be automatically placed when a payment session using this payment setting is authorized.
   */
  auto_place?: boolean | null
  /**
   * The name of the payment setting.
   * @example ```"Stripe"```
   */
  name?: string | null
  /**
   * Send this attribute if you want to mark this resource as disabled.
   * @example ```true```
   */
  _disable?: boolean | null
  /**
   * Send this attribute if you want to mark this resource as enabled.
   * @example ```true```
   */
  _enable?: boolean | null
  /**
   * Send this attribute if you want to validate the payment gateway credentials using the gateway’s own APIs.
   * @example ```true```
   */
  _check?: boolean | null
  /**
   * The gateway client ID.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  client_id: string
  /**
   * The gateway client secret.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  client_secret: string
}

interface PaymentSettingPaypalUpdate extends ResourceUpdate {
  /**
   * The gateway version of the payment setting (external API version).
   * @example ```"2025-09-30.clover"```
   */
  gateway_version?: string | null
  /**
   * Send this attribute if you want the payment to be automatically captured when authorized.
   */
  auto_capture?: boolean | null
  /**
   * Send this attribute if you want the order to be automatically placed when a payment session using this payment setting is authorized.
   */
  auto_place?: boolean | null
  /**
   * The name of the payment setting.
   * @example ```"Stripe"```
   */
  name?: string | null
  /**
   * Send this attribute if you want to mark this resource as disabled.
   * @example ```true```
   */
  _disable?: boolean | null
  /**
   * Send this attribute if you want to mark this resource as enabled.
   * @example ```true```
   */
  _enable?: boolean | null
  /**
   * Send this attribute if you want to validate the payment gateway credentials using the gateway’s own APIs.
   * @example ```true```
   */
  _check?: boolean | null
  /**
   * The gateway client ID.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  client_id?: string | null
  /**
   * The gateway client secret.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  client_secret?: string | null
}

/** @since 2026-05 */
class PaymentSettingPaypals extends ApiResource<PaymentSettingPaypal> {
  static readonly TYPE: PaymentSettingPaypalType = 'payment_setting_paypals' as const

  async create(
    resource: PaymentSettingPaypalCreate,
    params?: QueryParamsRetrieve<PaymentSettingPaypal>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingPaypal> {
    return this.resources.create<PaymentSettingPaypalCreate, PaymentSettingPaypal>(
      { ...resource, type: PaymentSettingPaypals.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: PaymentSettingPaypalUpdate,
    params?: QueryParamsRetrieve<PaymentSettingPaypal>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingPaypal> {
    return this.resources.update<PaymentSettingPaypalUpdate, PaymentSettingPaypal>(
      { ...resource, type: PaymentSettingPaypals.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: PaymentSettingPaypals.TYPE } : id, options)
  }

  async payment_links(
    paymentSettingPaypalId: string | PaymentSettingPaypal,
    params?: QueryParamsList<PaymentLink>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentLink>> {
    const _paymentSettingPaypalId =
      (paymentSettingPaypalId as PaymentSettingPaypal).id || (paymentSettingPaypalId as string)
    return this.resources.fetch<PaymentLink>(
      { type: 'payment_links' },
      `payment_setting_paypals/${_paymentSettingPaypalId}/payment_links`,
      params,
      options,
    ) as unknown as ListResponse<PaymentLink>
  }

  async payment_sessions(
    paymentSettingPaypalId: string | PaymentSettingPaypal,
    params?: QueryParamsList<PaymentSession>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentSession>> {
    const _paymentSettingPaypalId =
      (paymentSettingPaypalId as PaymentSettingPaypal).id || (paymentSettingPaypalId as string)
    return this.resources.fetch<PaymentSession>(
      { type: 'payment_sessions' },
      `payment_setting_paypals/${_paymentSettingPaypalId}/payment_sessions`,
      params,
      options,
    ) as unknown as ListResponse<PaymentSession>
  }

  async payment_transactions(
    paymentSettingPaypalId: string | PaymentSettingPaypal,
    params?: QueryParamsList<PaymentTransaction>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentTransaction>> {
    const _paymentSettingPaypalId =
      (paymentSettingPaypalId as PaymentSettingPaypal).id || (paymentSettingPaypalId as string)
    return this.resources.fetch<PaymentTransaction>(
      { type: 'payment_transactions' },
      `payment_setting_paypals/${_paymentSettingPaypalId}/payment_transactions`,
      params,
      options,
    ) as unknown as ListResponse<PaymentTransaction>
  }

  async payment_wallets(
    paymentSettingPaypalId: string | PaymentSettingPaypal,
    params?: QueryParamsList<PaymentWallet>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentWallet>> {
    const _paymentSettingPaypalId =
      (paymentSettingPaypalId as PaymentSettingPaypal).id || (paymentSettingPaypalId as string)
    return this.resources.fetch<PaymentWallet>(
      { type: 'payment_wallets' },
      `payment_setting_paypals/${_paymentSettingPaypalId}/payment_wallets`,
      params,
      options,
    ) as unknown as ListResponse<PaymentWallet>
  }

  async order_subscriptions(
    paymentSettingPaypalId: string | PaymentSettingPaypal,
    params?: QueryParamsList<OrderSubscription>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<OrderSubscription>> {
    const _paymentSettingPaypalId =
      (paymentSettingPaypalId as PaymentSettingPaypal).id || (paymentSettingPaypalId as string)
    return this.resources.fetch<OrderSubscription>(
      { type: 'order_subscriptions' },
      `payment_setting_paypals/${_paymentSettingPaypalId}/order_subscriptions`,
      params,
      options,
    ) as unknown as ListResponse<OrderSubscription>
  }

  async event_stores(
    paymentSettingPaypalId: string | PaymentSettingPaypal,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _paymentSettingPaypalId =
      (paymentSettingPaypalId as PaymentSettingPaypal).id || (paymentSettingPaypalId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `payment_setting_paypals/${_paymentSettingPaypalId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async _disable(
    id: string | PaymentSettingPaypal,
    params?: QueryParamsRetrieve<PaymentSettingPaypal>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingPaypal> {
    return this.resources.update<PaymentSettingPaypalUpdate, PaymentSettingPaypal>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSettingPaypals.TYPE, _disable: true },
      params,
      options,
    )
  }

  async _enable(
    id: string | PaymentSettingPaypal,
    params?: QueryParamsRetrieve<PaymentSettingPaypal>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingPaypal> {
    return this.resources.update<PaymentSettingPaypalUpdate, PaymentSettingPaypal>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSettingPaypals.TYPE, _enable: true },
      params,
      options,
    )
  }

  async _check(
    id: string | PaymentSettingPaypal,
    params?: QueryParamsRetrieve<PaymentSettingPaypal>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingPaypal> {
    return this.resources.update<PaymentSettingPaypalUpdate, PaymentSettingPaypal>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSettingPaypals.TYPE, _check: true },
      params,
      options,
    )
  }

  isPaymentSettingPaypal(resource: any): resource is PaymentSettingPaypal {
    return resource.type && resource.type === PaymentSettingPaypals.TYPE
  }

  relationship(id: string | ResourceId | null): PaymentSettingPaypalRel {
    return super.relationshipOneToOne<PaymentSettingPaypalRel>(id)
  }

  relationshipToMany(...ids: string[]): PaymentSettingPaypalRel[] {
    return super.relationshipOneToMany<PaymentSettingPaypalRel>(...ids)
  }

  type(): PaymentSettingPaypalType {
    return PaymentSettingPaypals.TYPE
  }
}

const instance = new PaymentSettingPaypals()
export default instance

export type {
  PaymentSettingPaypal,
  PaymentSettingPaypalCreate,
  PaymentSettingPaypals,
  PaymentSettingPaypalType,
  PaymentSettingPaypalUpdate,
}
