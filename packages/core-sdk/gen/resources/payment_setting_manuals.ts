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

type PaymentSettingManualType = 'payment_setting_manuals'
type PaymentSettingManualRel = ResourceRel & { type: PaymentSettingManualType }

export type PaymentSettingManualSort = Pick<PaymentSettingManual, 'id' | 'name' | 'disabled_at'> & ResourceSort
// export type PaymentSettingManualFilter = Pick<PaymentSettingManual, 'id' | 'gateway_version' | 'internal_versionable' | 'auto_capture' | 'auto_place' | 'name' | 'disabled_at'> & ResourceFilter

/**
 * The Payment setting manual object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/payment_setting_manuals endpoint.
 * @since 2026-05
 *
 * @link https://docs.commercelayer.io/core-api-reference/payment_setting_manuals/object
 */
interface PaymentSettingManual extends Resource {
  readonly type: PaymentSettingManualType

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

interface PaymentSettingManualCreate extends ResourceCreate {
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
}

interface PaymentSettingManualUpdate extends ResourceUpdate {
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
}

/** @since 2026-05 */
class PaymentSettingManuals extends ApiResource<PaymentSettingManual> {
  static readonly TYPE: PaymentSettingManualType = 'payment_setting_manuals' as const

  async create(
    resource: PaymentSettingManualCreate,
    params?: QueryParamsRetrieve<PaymentSettingManual>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingManual> {
    return this.resources.create<PaymentSettingManualCreate, PaymentSettingManual>(
      { ...resource, type: PaymentSettingManuals.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: PaymentSettingManualUpdate,
    params?: QueryParamsRetrieve<PaymentSettingManual>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingManual> {
    return this.resources.update<PaymentSettingManualUpdate, PaymentSettingManual>(
      { ...resource, type: PaymentSettingManuals.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: PaymentSettingManuals.TYPE } : id, options)
  }

  async payment_links(
    paymentSettingManualId: string | PaymentSettingManual,
    params?: QueryParamsList<PaymentLink>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentLink>> {
    const _paymentSettingManualId =
      (paymentSettingManualId as PaymentSettingManual).id || (paymentSettingManualId as string)
    return this.resources.fetch<PaymentLink>(
      { type: 'payment_links' },
      `payment_setting_manuals/${_paymentSettingManualId}/payment_links`,
      params,
      options,
    ) as unknown as ListResponse<PaymentLink>
  }

  async payment_sessions(
    paymentSettingManualId: string | PaymentSettingManual,
    params?: QueryParamsList<PaymentSession>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentSession>> {
    const _paymentSettingManualId =
      (paymentSettingManualId as PaymentSettingManual).id || (paymentSettingManualId as string)
    return this.resources.fetch<PaymentSession>(
      { type: 'payment_sessions' },
      `payment_setting_manuals/${_paymentSettingManualId}/payment_sessions`,
      params,
      options,
    ) as unknown as ListResponse<PaymentSession>
  }

  async payment_transactions(
    paymentSettingManualId: string | PaymentSettingManual,
    params?: QueryParamsList<PaymentTransaction>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentTransaction>> {
    const _paymentSettingManualId =
      (paymentSettingManualId as PaymentSettingManual).id || (paymentSettingManualId as string)
    return this.resources.fetch<PaymentTransaction>(
      { type: 'payment_transactions' },
      `payment_setting_manuals/${_paymentSettingManualId}/payment_transactions`,
      params,
      options,
    ) as unknown as ListResponse<PaymentTransaction>
  }

  async payment_wallets(
    paymentSettingManualId: string | PaymentSettingManual,
    params?: QueryParamsList<PaymentWallet>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentWallet>> {
    const _paymentSettingManualId =
      (paymentSettingManualId as PaymentSettingManual).id || (paymentSettingManualId as string)
    return this.resources.fetch<PaymentWallet>(
      { type: 'payment_wallets' },
      `payment_setting_manuals/${_paymentSettingManualId}/payment_wallets`,
      params,
      options,
    ) as unknown as ListResponse<PaymentWallet>
  }

  async order_subscriptions(
    paymentSettingManualId: string | PaymentSettingManual,
    params?: QueryParamsList<OrderSubscription>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<OrderSubscription>> {
    const _paymentSettingManualId =
      (paymentSettingManualId as PaymentSettingManual).id || (paymentSettingManualId as string)
    return this.resources.fetch<OrderSubscription>(
      { type: 'order_subscriptions' },
      `payment_setting_manuals/${_paymentSettingManualId}/order_subscriptions`,
      params,
      options,
    ) as unknown as ListResponse<OrderSubscription>
  }

  async event_stores(
    paymentSettingManualId: string | PaymentSettingManual,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _paymentSettingManualId =
      (paymentSettingManualId as PaymentSettingManual).id || (paymentSettingManualId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `payment_setting_manuals/${_paymentSettingManualId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async _disable(
    id: string | PaymentSettingManual,
    params?: QueryParamsRetrieve<PaymentSettingManual>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingManual> {
    return this.resources.update<PaymentSettingManualUpdate, PaymentSettingManual>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSettingManuals.TYPE, _disable: true },
      params,
      options,
    )
  }

  async _enable(
    id: string | PaymentSettingManual,
    params?: QueryParamsRetrieve<PaymentSettingManual>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingManual> {
    return this.resources.update<PaymentSettingManualUpdate, PaymentSettingManual>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSettingManuals.TYPE, _enable: true },
      params,
      options,
    )
  }

  isPaymentSettingManual(resource: any): resource is PaymentSettingManual {
    return resource.type && resource.type === PaymentSettingManuals.TYPE
  }

  relationship(id: string | ResourceId | null): PaymentSettingManualRel {
    return super.relationshipOneToOne<PaymentSettingManualRel>(id)
  }

  relationshipToMany(...ids: string[]): PaymentSettingManualRel[] {
    return super.relationshipOneToMany<PaymentSettingManualRel>(...ids)
  }

  type(): PaymentSettingManualType {
    return PaymentSettingManuals.TYPE
  }
}

const instance = new PaymentSettingManuals()
export default instance

export type {
  PaymentSettingManual,
  PaymentSettingManualCreate,
  PaymentSettingManuals,
  PaymentSettingManualType,
  PaymentSettingManualUpdate,
}
