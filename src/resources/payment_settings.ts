import type { QueryParamsList } from '../query'
import type {
  ListResponse,
  Resource,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
} from '../resource'
import { ApiResource } from '../resource'
import type { EventStore } from './event_stores'
import type { OrderSubscription } from './order_subscriptions'
import type { PaymentLink } from './payment_links'
import type { PaymentSession } from './payment_sessions'
import type { PaymentTransaction } from './payment_transactions'
import type { PaymentWallet } from './payment_wallets'

type PaymentSettingType = 'payment_settings'
type PaymentSettingRel = ResourceRel & { type: PaymentSettingType }

export type PaymentSettingSort = Pick<PaymentSetting, 'id' | 'name' | 'disabled_at'> & ResourceSort
// export type PaymentSettingFilter = Pick<PaymentSetting, 'id' | 'gateway_version' | 'auto_capture' | 'name' | 'disabled_at'> & ResourceFilter

interface PaymentSetting extends Resource {
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
   * Send this attribute if you want the payment to be automatically captured when authorized.
   */
  auto_capture?: boolean | null
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
    return resource.type && resource.type === PaymentSettings.TYPE
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
