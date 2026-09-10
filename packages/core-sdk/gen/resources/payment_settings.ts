import type { QueryParamsList } from '@runtime/query'
import type {
  ListResponse,
  Resource,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
} from '@runtime/resource'
import { ApiResource } from '@runtime/resource'
import type { EventStore } from './event_stores'
import type { OrderSubscription } from './order_subscriptions'
import type { PaymentLink } from './payment_links'
import type { PaymentSession } from './payment_sessions'
import type { PaymentSettingAdyen } from './payment_setting_adyens'
import type { PaymentSettingBraintree } from './payment_setting_braintrees'
import type { PaymentSettingCheckoutCom } from './payment_setting_checkout_coms'
import type { PaymentSettingExternal } from './payment_setting_externals'
import type { PaymentSettingGiftCard } from './payment_setting_gift_cards'
import type { PaymentSettingManual } from './payment_setting_manuals'
import type { PaymentSettingPaypal } from './payment_setting_paypals'
import type { PaymentSettingStripe } from './payment_setting_stripes'
import type { PaymentTransaction } from './payment_transactions'
import type { PaymentWallet } from './payment_wallets'

type PaymentSettingType =
  | 'payment_settings'
  | 'payment_setting_adyens'
  | 'payment_setting_braintrees'
  | 'payment_setting_checkout_coms'
  | 'payment_setting_externals'
  | 'payment_setting_gift_cards'
  | 'payment_setting_manuals'
  | 'payment_setting_paypals'
  | 'payment_setting_stripes'
type PaymentSettingRel = ResourceRel & { type: PaymentSettingType }

export type PaymentSettingSort = Pick<PaymentSettingBase, 'id' | 'name' | 'disabled_at'> & ResourceSort
// export type PaymentSettingFilter = Pick<PaymentSetting, 'id' | 'gateway_version' | 'internal_versionable' | 'auto_capture' | 'auto_place' | 'name' | 'disabled_at'> & ResourceFilter

/**
 * The Payment setting object is returned as part of the response body of each successful list or retrieve API call to the /api/payment_settings endpoint.
 * @since 2026-05
 *
 * @link https://docs.commercelayer.io/core-api-reference/payment_settings/object
 */
type PaymentSetting =
  | PaymentSettingAdyen
  | PaymentSettingBraintree
  | PaymentSettingCheckoutCom
  | PaymentSettingExternal
  | PaymentSettingGiftCard
  | PaymentSettingManual
  | PaymentSettingPaypal
  | PaymentSettingStripe

interface PaymentSettingBase extends Resource {
  readonly type: PaymentSettingType

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

  payment_links?: PaymentLink[] | null
  payment_sessions?: PaymentSession[] | null
  payment_transactions?: PaymentTransaction[] | null
  payment_wallets?: PaymentWallet[] | null
  order_subscriptions?: OrderSubscription[] | null
  event_stores?: EventStore[] | null
}

/** @since 2026-05 */
class PaymentSettings extends ApiResource<PaymentSetting> {
  static readonly TYPE: PaymentSettingType = 'payment_settings' as const

  async payment_links(
    paymentSettingId: string | PaymentSetting,
    params?: QueryParamsList<PaymentLink>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentLink>> {
    const _paymentSettingId = (paymentSettingId as PaymentSetting).id || (paymentSettingId as string)
    return this.resources.fetch<PaymentLink>(
      { type: 'payment_links' },
      `payment_settings/${_paymentSettingId}/payment_links`,
      params,
      options,
    ) as unknown as ListResponse<PaymentLink>
  }

  async payment_sessions(
    paymentSettingId: string | PaymentSetting,
    params?: QueryParamsList<PaymentSession>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentSession>> {
    const _paymentSettingId = (paymentSettingId as PaymentSetting).id || (paymentSettingId as string)
    return this.resources.fetch<PaymentSession>(
      { type: 'payment_sessions' },
      `payment_settings/${_paymentSettingId}/payment_sessions`,
      params,
      options,
    ) as unknown as ListResponse<PaymentSession>
  }

  async payment_transactions(
    paymentSettingId: string | PaymentSetting,
    params?: QueryParamsList<PaymentTransaction>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentTransaction>> {
    const _paymentSettingId = (paymentSettingId as PaymentSetting).id || (paymentSettingId as string)
    return this.resources.fetch<PaymentTransaction>(
      { type: 'payment_transactions' },
      `payment_settings/${_paymentSettingId}/payment_transactions`,
      params,
      options,
    ) as unknown as ListResponse<PaymentTransaction>
  }

  async payment_wallets(
    paymentSettingId: string | PaymentSetting,
    params?: QueryParamsList<PaymentWallet>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentWallet>> {
    const _paymentSettingId = (paymentSettingId as PaymentSetting).id || (paymentSettingId as string)
    return this.resources.fetch<PaymentWallet>(
      { type: 'payment_wallets' },
      `payment_settings/${_paymentSettingId}/payment_wallets`,
      params,
      options,
    ) as unknown as ListResponse<PaymentWallet>
  }

  async order_subscriptions(
    paymentSettingId: string | PaymentSetting,
    params?: QueryParamsList<OrderSubscription>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<OrderSubscription>> {
    const _paymentSettingId = (paymentSettingId as PaymentSetting).id || (paymentSettingId as string)
    return this.resources.fetch<OrderSubscription>(
      { type: 'order_subscriptions' },
      `payment_settings/${_paymentSettingId}/order_subscriptions`,
      params,
      options,
    ) as unknown as ListResponse<OrderSubscription>
  }

  async event_stores(
    paymentSettingId: string | PaymentSetting,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _paymentSettingId = (paymentSettingId as PaymentSetting).id || (paymentSettingId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `payment_settings/${_paymentSettingId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  isPaymentSetting(resource: any): resource is PaymentSetting {
    return (
      !!resource.type &&
      (resource.type === PaymentSettings.TYPE ||
        [
          'payment_setting_adyens',
          'payment_setting_braintrees',
          'payment_setting_checkout_coms',
          'payment_setting_externals',
          'payment_setting_gift_cards',
          'payment_setting_manuals',
          'payment_setting_paypals',
          'payment_setting_stripes',
        ].includes(resource.type))
    )
  }

  relationship(id: string | ResourceId | null): PaymentSettingRel {
    return super.relationshipOneToOne<PaymentSettingRel>(id)
  }

  relationshipToMany(...ids: string[]): PaymentSettingRel[] {
    return super.relationshipOneToMany<PaymentSettingRel>(...ids)
  }

  type(): PaymentSettingType {
    return PaymentSettings.TYPE
  }
}

const instance = new PaymentSettings()
export default instance

export type { PaymentSetting, PaymentSettings, PaymentSettingType }
