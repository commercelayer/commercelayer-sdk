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

type PaymentSettingBraintreeType = 'payment_setting_braintrees'
type PaymentSettingBraintreeRel = ResourceRel & { type: PaymentSettingBraintreeType }

export type PaymentSettingBraintreeSort = Pick<PaymentSettingBraintree, 'id' | 'name' | 'disabled_at'> & ResourceSort
// export type PaymentSettingBraintreeFilter = Pick<PaymentSettingBraintree, 'id' | 'gateway_version' | 'internal_versionable' | 'auto_capture' | 'auto_place' | 'name' | 'disabled_at'> & ResourceFilter

/**
 * The Payment setting braintree object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/payment_setting_braintrees endpoint.
 * @since 2026-05
 *
 * @link https://docs.commercelayer.io/core-api-reference/payment_setting_braintrees/object
 */
interface PaymentSettingBraintree extends Resource {
  readonly type: PaymentSettingBraintreeType

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
   * The gateway public key.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  public_key: string
  /**
   * The gateway merchant account ID, used to route transactions to the correct sub-account.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  merchant_account_id: string
  /**
   * The gateway webhook URL to configure manually in the Braintree Control Panel.
   * @example ```"https://core.commercelayer.co/webhook_callbacks/payment_setting_braintrees/xxxxx"```
   */
  webhook_endpoint_url?: string | null

  payment_links?: PaymentLink[] | null
  payment_sessions?: PaymentSession[] | null
  payment_transactions?: PaymentTransaction[] | null
  payment_wallets?: PaymentWallet[] | null
  order_subscriptions?: OrderSubscription[] | null
  event_stores?: EventStore[] | null
}

interface PaymentSettingBraintreeCreate extends ResourceCreate {
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
   * The gateway merchant ID.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  merchant_id: string
  /**
   * The gateway public key.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  public_key: string
  /**
   * The gateway private key.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  private_key: string
  /**
   * The gateway merchant account ID, used to route transactions to the correct sub-account.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  merchant_account_id: string
}

interface PaymentSettingBraintreeUpdate extends ResourceUpdate {
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
   * The gateway merchant ID.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  merchant_id?: string | null
  /**
   * The gateway public key.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  public_key?: string | null
  /**
   * The gateway private key.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  private_key?: string | null
  /**
   * The gateway merchant account ID, used to route transactions to the correct sub-account.
   * @example ```"xxxx-yyyy-zzzz"```
   */
  merchant_account_id?: string | null
}

/** @since 2026-05 */
class PaymentSettingBraintrees extends ApiResource<PaymentSettingBraintree> {
  static readonly TYPE: PaymentSettingBraintreeType = 'payment_setting_braintrees' as const

  async create(
    resource: PaymentSettingBraintreeCreate,
    params?: QueryParamsRetrieve<PaymentSettingBraintree>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingBraintree> {
    return this.resources.create<PaymentSettingBraintreeCreate, PaymentSettingBraintree>(
      { ...resource, type: PaymentSettingBraintrees.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: PaymentSettingBraintreeUpdate,
    params?: QueryParamsRetrieve<PaymentSettingBraintree>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingBraintree> {
    return this.resources.update<PaymentSettingBraintreeUpdate, PaymentSettingBraintree>(
      { ...resource, type: PaymentSettingBraintrees.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: PaymentSettingBraintrees.TYPE } : id, options)
  }

  async payment_links(
    paymentSettingBraintreeId: string | PaymentSettingBraintree,
    params?: QueryParamsList<PaymentLink>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentLink>> {
    const _paymentSettingBraintreeId =
      (paymentSettingBraintreeId as PaymentSettingBraintree).id || (paymentSettingBraintreeId as string)
    return this.resources.fetch<PaymentLink>(
      { type: 'payment_links' },
      `payment_setting_braintrees/${_paymentSettingBraintreeId}/payment_links`,
      params,
      options,
    ) as unknown as ListResponse<PaymentLink>
  }

  async payment_sessions(
    paymentSettingBraintreeId: string | PaymentSettingBraintree,
    params?: QueryParamsList<PaymentSession>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentSession>> {
    const _paymentSettingBraintreeId =
      (paymentSettingBraintreeId as PaymentSettingBraintree).id || (paymentSettingBraintreeId as string)
    return this.resources.fetch<PaymentSession>(
      { type: 'payment_sessions' },
      `payment_setting_braintrees/${_paymentSettingBraintreeId}/payment_sessions`,
      params,
      options,
    ) as unknown as ListResponse<PaymentSession>
  }

  async payment_transactions(
    paymentSettingBraintreeId: string | PaymentSettingBraintree,
    params?: QueryParamsList<PaymentTransaction>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentTransaction>> {
    const _paymentSettingBraintreeId =
      (paymentSettingBraintreeId as PaymentSettingBraintree).id || (paymentSettingBraintreeId as string)
    return this.resources.fetch<PaymentTransaction>(
      { type: 'payment_transactions' },
      `payment_setting_braintrees/${_paymentSettingBraintreeId}/payment_transactions`,
      params,
      options,
    ) as unknown as ListResponse<PaymentTransaction>
  }

  async payment_wallets(
    paymentSettingBraintreeId: string | PaymentSettingBraintree,
    params?: QueryParamsList<PaymentWallet>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentWallet>> {
    const _paymentSettingBraintreeId =
      (paymentSettingBraintreeId as PaymentSettingBraintree).id || (paymentSettingBraintreeId as string)
    return this.resources.fetch<PaymentWallet>(
      { type: 'payment_wallets' },
      `payment_setting_braintrees/${_paymentSettingBraintreeId}/payment_wallets`,
      params,
      options,
    ) as unknown as ListResponse<PaymentWallet>
  }

  async order_subscriptions(
    paymentSettingBraintreeId: string | PaymentSettingBraintree,
    params?: QueryParamsList<OrderSubscription>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<OrderSubscription>> {
    const _paymentSettingBraintreeId =
      (paymentSettingBraintreeId as PaymentSettingBraintree).id || (paymentSettingBraintreeId as string)
    return this.resources.fetch<OrderSubscription>(
      { type: 'order_subscriptions' },
      `payment_setting_braintrees/${_paymentSettingBraintreeId}/order_subscriptions`,
      params,
      options,
    ) as unknown as ListResponse<OrderSubscription>
  }

  async event_stores(
    paymentSettingBraintreeId: string | PaymentSettingBraintree,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _paymentSettingBraintreeId =
      (paymentSettingBraintreeId as PaymentSettingBraintree).id || (paymentSettingBraintreeId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `payment_setting_braintrees/${_paymentSettingBraintreeId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async _disable(
    id: string | PaymentSettingBraintree,
    params?: QueryParamsRetrieve<PaymentSettingBraintree>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingBraintree> {
    return this.resources.update<PaymentSettingBraintreeUpdate, PaymentSettingBraintree>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSettingBraintrees.TYPE, _disable: true },
      params,
      options,
    )
  }

  async _enable(
    id: string | PaymentSettingBraintree,
    params?: QueryParamsRetrieve<PaymentSettingBraintree>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingBraintree> {
    return this.resources.update<PaymentSettingBraintreeUpdate, PaymentSettingBraintree>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSettingBraintrees.TYPE, _enable: true },
      params,
      options,
    )
  }

  async _check(
    id: string | PaymentSettingBraintree,
    params?: QueryParamsRetrieve<PaymentSettingBraintree>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingBraintree> {
    return this.resources.update<PaymentSettingBraintreeUpdate, PaymentSettingBraintree>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSettingBraintrees.TYPE, _check: true },
      params,
      options,
    )
  }

  isPaymentSettingBraintree(resource: any): resource is PaymentSettingBraintree {
    return resource.type && resource.type === PaymentSettingBraintrees.TYPE
  }

  relationship(id: string | ResourceId | null): PaymentSettingBraintreeRel {
    return super.relationshipOneToOne<PaymentSettingBraintreeRel>(id)
  }

  relationshipToMany(...ids: string[]): PaymentSettingBraintreeRel[] {
    return super.relationshipOneToMany<PaymentSettingBraintreeRel>(...ids)
  }

  type(): PaymentSettingBraintreeType {
    return PaymentSettingBraintrees.TYPE
  }
}

const instance = new PaymentSettingBraintrees()
export default instance

export type {
  PaymentSettingBraintree,
  PaymentSettingBraintreeCreate,
  PaymentSettingBraintrees,
  PaymentSettingBraintreeType,
  PaymentSettingBraintreeUpdate,
}
