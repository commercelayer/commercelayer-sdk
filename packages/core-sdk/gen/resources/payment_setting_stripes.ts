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

type PaymentSettingStripeType = 'payment_setting_stripes'
type PaymentSettingStripeRel = ResourceRel & { type: PaymentSettingStripeType }

export type PaymentSettingStripeSort = Pick<PaymentSettingStripe, 'id' | 'name' | 'disabled_at'> & ResourceSort
// export type PaymentSettingStripeFilter = Pick<PaymentSettingStripe, 'id' | 'gateway_version' | 'internal_versionable' | 'auto_capture' | 'auto_place' | 'name' | 'disabled_at'> & ResourceFilter

/**
 * The Payment setting stripe object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/payment_setting_stripes endpoint.
 * @since 2026-05
 *
 * @link https://docs.commercelayer.io/core-api-reference/payment_setting_stripes/object
 */
interface PaymentSettingStripe extends Resource {
  readonly type: PaymentSettingStripeType

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
   * The gateway public API key.
   * @example ```"pk_live_xxxx-yyyy-zzzz"```
   */
  public_key?: string | null
  /**
   * The account (if any) for which the funds of the PaymentIntent are intended.
   * @example ```"acct_xxxx-yyyy-zzzz"```
   */
  connected_account?: string | null
  /**
   * The gateway webhook endpoint ID, generated automatically.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  webhook_endpoint_id?: string | null
  /**
   * The gateway webhook endpoint secret, generated automatically.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  webhook_endpoint_secret?: string | null
  /**
   * The gateway webhook URL, generated automatically.
   * @example ```"https://core.commercelayer.co/webhook_callbacks/payment_setting_stripes/xxxxx"```
   */
  webhook_endpoint_url?: string | null

  payment_links?: PaymentLink[] | null
  payment_sessions?: PaymentSession[] | null
  payment_transactions?: PaymentTransaction[] | null
  payment_wallets?: PaymentWallet[] | null
  order_subscriptions?: OrderSubscription[] | null
  event_stores?: EventStore[] | null
}

interface PaymentSettingStripeCreate extends ResourceCreate {
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
   * The gateway secure API key.
   * @example ```"sk_live_xxxx-yyyy-zzzz"```
   */
  api_key: string
  /**
   * The gateway public API key.
   * @example ```"pk_live_xxxx-yyyy-zzzz"```
   */
  public_key?: string | null
  /**
   * The account (if any) for which the funds of the PaymentIntent are intended.
   * @example ```"acct_xxxx-yyyy-zzzz"```
   */
  connected_account?: string | null
}

interface PaymentSettingStripeUpdate extends ResourceUpdate {
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
   * The gateway secure API key.
   * @example ```"sk_live_xxxx-yyyy-zzzz"```
   */
  api_key?: string | null
  /**
   * The gateway public API key.
   * @example ```"pk_live_xxxx-yyyy-zzzz"```
   */
  public_key?: string | null
  /**
   * The account (if any) for which the funds of the PaymentIntent are intended.
   * @example ```"acct_xxxx-yyyy-zzzz"```
   */
  connected_account?: string | null
}

/** @since 2026-05 */
class PaymentSettingStripes extends ApiResource<PaymentSettingStripe> {
  static readonly TYPE: PaymentSettingStripeType = 'payment_setting_stripes' as const

  async create(
    resource: PaymentSettingStripeCreate,
    params?: QueryParamsRetrieve<PaymentSettingStripe>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingStripe> {
    return this.resources.create<PaymentSettingStripeCreate, PaymentSettingStripe>(
      { ...resource, type: PaymentSettingStripes.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: PaymentSettingStripeUpdate,
    params?: QueryParamsRetrieve<PaymentSettingStripe>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingStripe> {
    return this.resources.update<PaymentSettingStripeUpdate, PaymentSettingStripe>(
      { ...resource, type: PaymentSettingStripes.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: PaymentSettingStripes.TYPE } : id, options)
  }

  async payment_links(
    paymentSettingStripeId: string | PaymentSettingStripe,
    params?: QueryParamsList<PaymentLink>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentLink>> {
    const _paymentSettingStripeId =
      (paymentSettingStripeId as PaymentSettingStripe).id || (paymentSettingStripeId as string)
    return this.resources.fetch<PaymentLink>(
      { type: 'payment_links' },
      `payment_setting_stripes/${_paymentSettingStripeId}/payment_links`,
      params,
      options,
    ) as unknown as ListResponse<PaymentLink>
  }

  async payment_sessions(
    paymentSettingStripeId: string | PaymentSettingStripe,
    params?: QueryParamsList<PaymentSession>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentSession>> {
    const _paymentSettingStripeId =
      (paymentSettingStripeId as PaymentSettingStripe).id || (paymentSettingStripeId as string)
    return this.resources.fetch<PaymentSession>(
      { type: 'payment_sessions' },
      `payment_setting_stripes/${_paymentSettingStripeId}/payment_sessions`,
      params,
      options,
    ) as unknown as ListResponse<PaymentSession>
  }

  async payment_transactions(
    paymentSettingStripeId: string | PaymentSettingStripe,
    params?: QueryParamsList<PaymentTransaction>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentTransaction>> {
    const _paymentSettingStripeId =
      (paymentSettingStripeId as PaymentSettingStripe).id || (paymentSettingStripeId as string)
    return this.resources.fetch<PaymentTransaction>(
      { type: 'payment_transactions' },
      `payment_setting_stripes/${_paymentSettingStripeId}/payment_transactions`,
      params,
      options,
    ) as unknown as ListResponse<PaymentTransaction>
  }

  async payment_wallets(
    paymentSettingStripeId: string | PaymentSettingStripe,
    params?: QueryParamsList<PaymentWallet>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentWallet>> {
    const _paymentSettingStripeId =
      (paymentSettingStripeId as PaymentSettingStripe).id || (paymentSettingStripeId as string)
    return this.resources.fetch<PaymentWallet>(
      { type: 'payment_wallets' },
      `payment_setting_stripes/${_paymentSettingStripeId}/payment_wallets`,
      params,
      options,
    ) as unknown as ListResponse<PaymentWallet>
  }

  async order_subscriptions(
    paymentSettingStripeId: string | PaymentSettingStripe,
    params?: QueryParamsList<OrderSubscription>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<OrderSubscription>> {
    const _paymentSettingStripeId =
      (paymentSettingStripeId as PaymentSettingStripe).id || (paymentSettingStripeId as string)
    return this.resources.fetch<OrderSubscription>(
      { type: 'order_subscriptions' },
      `payment_setting_stripes/${_paymentSettingStripeId}/order_subscriptions`,
      params,
      options,
    ) as unknown as ListResponse<OrderSubscription>
  }

  async event_stores(
    paymentSettingStripeId: string | PaymentSettingStripe,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _paymentSettingStripeId =
      (paymentSettingStripeId as PaymentSettingStripe).id || (paymentSettingStripeId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `payment_setting_stripes/${_paymentSettingStripeId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async _disable(
    id: string | PaymentSettingStripe,
    params?: QueryParamsRetrieve<PaymentSettingStripe>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingStripe> {
    return this.resources.update<PaymentSettingStripeUpdate, PaymentSettingStripe>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSettingStripes.TYPE, _disable: true },
      params,
      options,
    )
  }

  async _enable(
    id: string | PaymentSettingStripe,
    params?: QueryParamsRetrieve<PaymentSettingStripe>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingStripe> {
    return this.resources.update<PaymentSettingStripeUpdate, PaymentSettingStripe>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSettingStripes.TYPE, _enable: true },
      params,
      options,
    )
  }

  async _check(
    id: string | PaymentSettingStripe,
    params?: QueryParamsRetrieve<PaymentSettingStripe>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingStripe> {
    return this.resources.update<PaymentSettingStripeUpdate, PaymentSettingStripe>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSettingStripes.TYPE, _check: true },
      params,
      options,
    )
  }

  isPaymentSettingStripe(resource: any): resource is PaymentSettingStripe {
    return resource.type && resource.type === PaymentSettingStripes.TYPE
  }

  relationship(id: string | ResourceId | null): PaymentSettingStripeRel {
    return super.relationshipOneToOne<PaymentSettingStripeRel>(id)
  }

  relationshipToMany(...ids: string[]): PaymentSettingStripeRel[] {
    return super.relationshipOneToMany<PaymentSettingStripeRel>(...ids)
  }

  type(): PaymentSettingStripeType {
    return PaymentSettingStripes.TYPE
  }
}

const instance = new PaymentSettingStripes()
export default instance

export type {
  PaymentSettingStripe,
  PaymentSettingStripeCreate,
  PaymentSettingStripes,
  PaymentSettingStripeType,
  PaymentSettingStripeUpdate,
}
