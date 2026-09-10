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

type PaymentSettingCheckoutComType = 'payment_setting_checkout_coms'
type PaymentSettingCheckoutComRel = ResourceRel & { type: PaymentSettingCheckoutComType }

export type PaymentSettingCheckoutComSort = Pick<PaymentSettingCheckoutCom, 'id' | 'name' | 'disabled_at'> &
  ResourceSort
// export type PaymentSettingCheckoutComFilter = Pick<PaymentSettingCheckoutCom, 'id' | 'gateway_version' | 'internal_versionable' | 'auto_capture' | 'auto_place' | 'name' | 'disabled_at'> & ResourceFilter

/**
 * The Payment setting checkout com object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/payment_setting_checkout_coms endpoint.
 * @since 2026-05
 *
 * @link https://docs.commercelayer.io/core-api-reference/payment_setting_checkout_coms/object
 */
interface PaymentSettingCheckoutCom extends Resource {
  readonly type: PaymentSettingCheckoutComType

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
   * The gateway webhook (workflow) ID, generated automatically.
   * @example ```"wf_xxxxxxxx"```
   */
  webhook_endpoint_id?: string | null
  /**
   * The gateway webhook signing secret, generated automatically.
   * @example ```"xxxxxxxxxxxxxxxx"```
   */
  webhook_endpoint_secret?: string | null
  /**
   * The gateway webhook URL, generated automatically.
   * @example ```"https://core.commercelayer.co/webhook_callbacks/payment_setting_checkout_coms/xxxxx"```
   */
  webhook_endpoint_url?: string | null

  payment_links?: PaymentLink[] | null
  payment_sessions?: PaymentSession[] | null
  payment_transactions?: PaymentTransaction[] | null
  payment_wallets?: PaymentWallet[] | null
  order_subscriptions?: OrderSubscription[] | null
  event_stores?: EventStore[] | null
}

interface PaymentSettingCheckoutComCreate extends ResourceCreate {
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
   * The gateway secret key.
   * @example ```"sk_xxxxxxxx"```
   */
  secret_key: string
  /**
   * The gateway public key.
   * @example ```"pk_xxxxxxxx"```
   */
  public_key: string
}

interface PaymentSettingCheckoutComUpdate extends ResourceUpdate {
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
   * The gateway secret key.
   * @example ```"sk_xxxxxxxx"```
   */
  secret_key?: string | null
  /**
   * The gateway public key.
   * @example ```"pk_xxxxxxxx"```
   */
  public_key?: string | null
}

/** @since 2026-05 */
class PaymentSettingCheckoutComs extends ApiResource<PaymentSettingCheckoutCom> {
  static readonly TYPE: PaymentSettingCheckoutComType = 'payment_setting_checkout_coms' as const

  async create(
    resource: PaymentSettingCheckoutComCreate,
    params?: QueryParamsRetrieve<PaymentSettingCheckoutCom>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingCheckoutCom> {
    return this.resources.create<PaymentSettingCheckoutComCreate, PaymentSettingCheckoutCom>(
      { ...resource, type: PaymentSettingCheckoutComs.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: PaymentSettingCheckoutComUpdate,
    params?: QueryParamsRetrieve<PaymentSettingCheckoutCom>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingCheckoutCom> {
    return this.resources.update<PaymentSettingCheckoutComUpdate, PaymentSettingCheckoutCom>(
      { ...resource, type: PaymentSettingCheckoutComs.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: PaymentSettingCheckoutComs.TYPE } : id, options)
  }

  async payment_links(
    paymentSettingCheckoutComId: string | PaymentSettingCheckoutCom,
    params?: QueryParamsList<PaymentLink>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentLink>> {
    const _paymentSettingCheckoutComId =
      (paymentSettingCheckoutComId as PaymentSettingCheckoutCom).id || (paymentSettingCheckoutComId as string)
    return this.resources.fetch<PaymentLink>(
      { type: 'payment_links' },
      `payment_setting_checkout_coms/${_paymentSettingCheckoutComId}/payment_links`,
      params,
      options,
    ) as unknown as ListResponse<PaymentLink>
  }

  async payment_sessions(
    paymentSettingCheckoutComId: string | PaymentSettingCheckoutCom,
    params?: QueryParamsList<PaymentSession>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentSession>> {
    const _paymentSettingCheckoutComId =
      (paymentSettingCheckoutComId as PaymentSettingCheckoutCom).id || (paymentSettingCheckoutComId as string)
    return this.resources.fetch<PaymentSession>(
      { type: 'payment_sessions' },
      `payment_setting_checkout_coms/${_paymentSettingCheckoutComId}/payment_sessions`,
      params,
      options,
    ) as unknown as ListResponse<PaymentSession>
  }

  async payment_transactions(
    paymentSettingCheckoutComId: string | PaymentSettingCheckoutCom,
    params?: QueryParamsList<PaymentTransaction>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentTransaction>> {
    const _paymentSettingCheckoutComId =
      (paymentSettingCheckoutComId as PaymentSettingCheckoutCom).id || (paymentSettingCheckoutComId as string)
    return this.resources.fetch<PaymentTransaction>(
      { type: 'payment_transactions' },
      `payment_setting_checkout_coms/${_paymentSettingCheckoutComId}/payment_transactions`,
      params,
      options,
    ) as unknown as ListResponse<PaymentTransaction>
  }

  async payment_wallets(
    paymentSettingCheckoutComId: string | PaymentSettingCheckoutCom,
    params?: QueryParamsList<PaymentWallet>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentWallet>> {
    const _paymentSettingCheckoutComId =
      (paymentSettingCheckoutComId as PaymentSettingCheckoutCom).id || (paymentSettingCheckoutComId as string)
    return this.resources.fetch<PaymentWallet>(
      { type: 'payment_wallets' },
      `payment_setting_checkout_coms/${_paymentSettingCheckoutComId}/payment_wallets`,
      params,
      options,
    ) as unknown as ListResponse<PaymentWallet>
  }

  async order_subscriptions(
    paymentSettingCheckoutComId: string | PaymentSettingCheckoutCom,
    params?: QueryParamsList<OrderSubscription>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<OrderSubscription>> {
    const _paymentSettingCheckoutComId =
      (paymentSettingCheckoutComId as PaymentSettingCheckoutCom).id || (paymentSettingCheckoutComId as string)
    return this.resources.fetch<OrderSubscription>(
      { type: 'order_subscriptions' },
      `payment_setting_checkout_coms/${_paymentSettingCheckoutComId}/order_subscriptions`,
      params,
      options,
    ) as unknown as ListResponse<OrderSubscription>
  }

  async event_stores(
    paymentSettingCheckoutComId: string | PaymentSettingCheckoutCom,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _paymentSettingCheckoutComId =
      (paymentSettingCheckoutComId as PaymentSettingCheckoutCom).id || (paymentSettingCheckoutComId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `payment_setting_checkout_coms/${_paymentSettingCheckoutComId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async _disable(
    id: string | PaymentSettingCheckoutCom,
    params?: QueryParamsRetrieve<PaymentSettingCheckoutCom>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingCheckoutCom> {
    return this.resources.update<PaymentSettingCheckoutComUpdate, PaymentSettingCheckoutCom>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSettingCheckoutComs.TYPE, _disable: true },
      params,
      options,
    )
  }

  async _enable(
    id: string | PaymentSettingCheckoutCom,
    params?: QueryParamsRetrieve<PaymentSettingCheckoutCom>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingCheckoutCom> {
    return this.resources.update<PaymentSettingCheckoutComUpdate, PaymentSettingCheckoutCom>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSettingCheckoutComs.TYPE, _enable: true },
      params,
      options,
    )
  }

  async _check(
    id: string | PaymentSettingCheckoutCom,
    params?: QueryParamsRetrieve<PaymentSettingCheckoutCom>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingCheckoutCom> {
    return this.resources.update<PaymentSettingCheckoutComUpdate, PaymentSettingCheckoutCom>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSettingCheckoutComs.TYPE, _check: true },
      params,
      options,
    )
  }

  isPaymentSettingCheckoutCom(resource: any): resource is PaymentSettingCheckoutCom {
    return resource.type && resource.type === PaymentSettingCheckoutComs.TYPE
  }

  relationship(id: string | ResourceId | null): PaymentSettingCheckoutComRel {
    return super.relationshipOneToOne<PaymentSettingCheckoutComRel>(id)
  }

  relationshipToMany(...ids: string[]): PaymentSettingCheckoutComRel[] {
    return super.relationshipOneToMany<PaymentSettingCheckoutComRel>(...ids)
  }

  type(): PaymentSettingCheckoutComType {
    return PaymentSettingCheckoutComs.TYPE
  }
}

const instance = new PaymentSettingCheckoutComs()
export default instance

export type {
  PaymentSettingCheckoutCom,
  PaymentSettingCheckoutComCreate,
  PaymentSettingCheckoutComs,
  PaymentSettingCheckoutComType,
  PaymentSettingCheckoutComUpdate,
}
