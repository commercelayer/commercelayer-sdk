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
import type { EventStore } from './event_stores'
import type { OrderSubscription } from './order_subscriptions'
import type { PaymentLink } from './payment_links'
import type { PaymentSession } from './payment_sessions'
import type { PaymentTransaction } from './payment_transactions'
import type { PaymentWallet } from './payment_wallets'

type PaymentSettingExternalType = 'payment_setting_externals'
type PaymentSettingExternalRel = ResourceRel & { type: PaymentSettingExternalType }

export type PaymentSettingExternalSort = Pick<
  PaymentSettingExternal,
  'id' | 'name' | 'disabled_at' | 'circuit_state' | 'circuit_failure_count'
> &
  ResourceSort
// export type PaymentSettingExternalFilter = Pick<PaymentSettingExternal, 'id' | 'gateway_version' | 'auto_capture' | 'name' | 'disabled_at' | 'circuit_state' | 'circuit_failure_count'> & ResourceFilter

interface PaymentSettingExternal extends Resource {
  readonly type: PaymentSettingExternalType

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
  /**
   * The circuit breaker state, by default it is 'closed'. It can become 'open' once the number of consecutive failures overlaps the specified threshold, in such case no further calls to the failing callback are made.
   * @example ```"closed"```
   */
  circuit_state?: string | null
  /**
   * The number of consecutive failures recorded by the circuit breaker associated to this resource, will be reset on first successful call to callback.
   * @example ```5```
   */
  circuit_failure_count?: number | null
  /**
   * The shared secret used to sign the external request payload.
   * @example ```"1c0994cc4e996e8c6ee56a2198f66f3c"```
   */
  shared_secret: string
  /**
   * List of related resources that will be included in the request to the external callback. Please do consult the documentation to check on which resource the includes are related (i.e. the order) and the defaults in case no list is provided.
   * @example ```["order.line_item_options"]```
   */
  external_includes?: string[] | null
  /**
   * The endpoint used by the external gateway to create a payment session.
   * @example ```"https://external_gateway.com/session"```
   */
  session_url?: string | null
  /**
   * The endpoint used by the external gateway to authorize payments.
   * @example ```"https://external_gateway.com/authorization"```
   */
  authorization_url: string
  /**
   * The endpoint used by the external gateway to capture payments.
   * @example ```"https://external_gateway.com/capture"```
   */
  capture_url: string
  /**
   * The endpoint used by the external gateway to void payments.
   * @example ```"https://external_gateway.com/void"```
   */
  void_url: string
  /**
   * The endpoint used by the external gateway to refund payments.
   * @example ```"https://external_gateway.com/refund"```
   */
  refund_url: string
  /**
   * The endpoint used by the external gateway to create a customer payment token.
   * @example ```"https://external_gateway.com/token"```
   */
  token_url?: string | null
  /**
   * The gateway webhook URL, generated automatically.
   * @example ```"https://core.commercelayer.io/webhook_callbacks/payment_setting_externals/xxxxx"```
   */
  webhook_endpoint_url?: string | null

  payment_links?: PaymentLink[] | null
  payment_sessions?: PaymentSession[] | null
  payment_transactions?: PaymentTransaction[] | null
  payment_wallets?: PaymentWallet[] | null
  order_subscriptions?: OrderSubscription[] | null
  event_stores?: EventStore[] | null
}

interface PaymentSettingExternalCreate extends ResourceCreate {
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
   * List of related resources that will be included in the request to the external callback. Please do consult the documentation to check on which resource the includes are related (i.e. the order) and the defaults in case no list is provided.
   * @example ```["order.line_item_options"]```
   */
  external_includes?: string[] | null
  /**
   * The endpoint used by the external gateway to create a payment session.
   * @example ```"https://external_gateway.com/session"```
   */
  session_url?: string | null
  /**
   * The endpoint used by the external gateway to authorize payments.
   * @example ```"https://external_gateway.com/authorization"```
   */
  authorization_url: string
  /**
   * The endpoint used by the external gateway to capture payments.
   * @example ```"https://external_gateway.com/capture"```
   */
  capture_url: string
  /**
   * The endpoint used by the external gateway to void payments.
   * @example ```"https://external_gateway.com/void"```
   */
  void_url: string
  /**
   * The endpoint used by the external gateway to refund payments.
   * @example ```"https://external_gateway.com/refund"```
   */
  refund_url: string
  /**
   * The endpoint used by the external gateway to create a customer payment token.
   * @example ```"https://external_gateway.com/token"```
   */
  token_url?: string | null
}

interface PaymentSettingExternalUpdate extends ResourceUpdate {
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
   * Send this attribute if you want to reset the circuit breaker associated to this resource to 'closed' state and zero failures count. Cannot be passed by sales channels.
   * @example ```true```
   */
  _reset_circuit?: boolean | null
  /**
   * Send this attribute if you want to regenerate the shared secret.
   * @deprecated Last available in API version 2017-08.
   * @example ```true```
   */
  _regenerate_shared_secret?: boolean | null
  /**
   * List of related resources that will be included in the request to the external callback. Please do consult the documentation to check on which resource the includes are related (i.e. the order) and the defaults in case no list is provided.
   * @example ```["order.line_item_options"]```
   */
  external_includes?: string[] | null
  /**
   * The endpoint used by the external gateway to create a payment session.
   * @example ```"https://external_gateway.com/session"```
   */
  session_url?: string | null
  /**
   * The endpoint used by the external gateway to authorize payments.
   * @example ```"https://external_gateway.com/authorization"```
   */
  authorization_url?: string | null
  /**
   * The endpoint used by the external gateway to capture payments.
   * @example ```"https://external_gateway.com/capture"```
   */
  capture_url?: string | null
  /**
   * The endpoint used by the external gateway to void payments.
   * @example ```"https://external_gateway.com/void"```
   */
  void_url?: string | null
  /**
   * The endpoint used by the external gateway to refund payments.
   * @example ```"https://external_gateway.com/refund"```
   */
  refund_url?: string | null
  /**
   * The endpoint used by the external gateway to create a customer payment token.
   * @example ```"https://external_gateway.com/token"```
   */
  token_url?: string | null
}

class PaymentSettingExternals extends ApiResource<PaymentSettingExternal> {
  static readonly TYPE: PaymentSettingExternalType = 'payment_setting_externals' as const

  async create(
    resource: PaymentSettingExternalCreate,
    params?: QueryParamsRetrieve<PaymentSettingExternal>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingExternal> {
    return this.resources.create<PaymentSettingExternalCreate, PaymentSettingExternal>(
      { ...resource, type: PaymentSettingExternals.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: PaymentSettingExternalUpdate,
    params?: QueryParamsRetrieve<PaymentSettingExternal>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingExternal> {
    return this.resources.update<PaymentSettingExternalUpdate, PaymentSettingExternal>(
      { ...resource, type: PaymentSettingExternals.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: PaymentSettingExternals.TYPE } : id, options)
  }

  async payment_links(
    paymentSettingExternalId: string | PaymentSettingExternal,
    params?: QueryParamsList<PaymentLink>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentLink>> {
    const _paymentSettingExternalId =
      (paymentSettingExternalId as PaymentSettingExternal).id || (paymentSettingExternalId as string)
    return this.resources.fetch<PaymentLink>(
      { type: 'payment_links' },
      `payment_setting_externals/${_paymentSettingExternalId}/payment_links`,
      params,
      options,
    ) as unknown as ListResponse<PaymentLink>
  }

  async payment_sessions(
    paymentSettingExternalId: string | PaymentSettingExternal,
    params?: QueryParamsList<PaymentSession>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentSession>> {
    const _paymentSettingExternalId =
      (paymentSettingExternalId as PaymentSettingExternal).id || (paymentSettingExternalId as string)
    return this.resources.fetch<PaymentSession>(
      { type: 'payment_sessions' },
      `payment_setting_externals/${_paymentSettingExternalId}/payment_sessions`,
      params,
      options,
    ) as unknown as ListResponse<PaymentSession>
  }

  async payment_transactions(
    paymentSettingExternalId: string | PaymentSettingExternal,
    params?: QueryParamsList<PaymentTransaction>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentTransaction>> {
    const _paymentSettingExternalId =
      (paymentSettingExternalId as PaymentSettingExternal).id || (paymentSettingExternalId as string)
    return this.resources.fetch<PaymentTransaction>(
      { type: 'payment_transactions' },
      `payment_setting_externals/${_paymentSettingExternalId}/payment_transactions`,
      params,
      options,
    ) as unknown as ListResponse<PaymentTransaction>
  }

  async payment_wallets(
    paymentSettingExternalId: string | PaymentSettingExternal,
    params?: QueryParamsList<PaymentWallet>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentWallet>> {
    const _paymentSettingExternalId =
      (paymentSettingExternalId as PaymentSettingExternal).id || (paymentSettingExternalId as string)
    return this.resources.fetch<PaymentWallet>(
      { type: 'payment_wallets' },
      `payment_setting_externals/${_paymentSettingExternalId}/payment_wallets`,
      params,
      options,
    ) as unknown as ListResponse<PaymentWallet>
  }

  async order_subscriptions(
    paymentSettingExternalId: string | PaymentSettingExternal,
    params?: QueryParamsList<OrderSubscription>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<OrderSubscription>> {
    const _paymentSettingExternalId =
      (paymentSettingExternalId as PaymentSettingExternal).id || (paymentSettingExternalId as string)
    return this.resources.fetch<OrderSubscription>(
      { type: 'order_subscriptions' },
      `payment_setting_externals/${_paymentSettingExternalId}/order_subscriptions`,
      params,
      options,
    ) as unknown as ListResponse<OrderSubscription>
  }

  async event_stores(
    paymentSettingExternalId: string | PaymentSettingExternal,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _paymentSettingExternalId =
      (paymentSettingExternalId as PaymentSettingExternal).id || (paymentSettingExternalId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `payment_setting_externals/${_paymentSettingExternalId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async _disable(
    id: string | PaymentSettingExternal,
    params?: QueryParamsRetrieve<PaymentSettingExternal>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingExternal> {
    return this.resources.update<PaymentSettingExternalUpdate, PaymentSettingExternal>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSettingExternals.TYPE, _disable: true },
      params,
      options,
    )
  }

  async _enable(
    id: string | PaymentSettingExternal,
    params?: QueryParamsRetrieve<PaymentSettingExternal>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingExternal> {
    return this.resources.update<PaymentSettingExternalUpdate, PaymentSettingExternal>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSettingExternals.TYPE, _enable: true },
      params,
      options,
    )
  }

  async _reset_circuit(
    id: string | PaymentSettingExternal,
    params?: QueryParamsRetrieve<PaymentSettingExternal>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingExternal> {
    return this.resources.update<PaymentSettingExternalUpdate, PaymentSettingExternal>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSettingExternals.TYPE, _reset_circuit: true },
      params,
      options,
    )
  }

  async _regenerate_shared_secret(
    id: string | PaymentSettingExternal,
    params?: QueryParamsRetrieve<PaymentSettingExternal>,
    options?: ResourcesConfig,
  ): Promise<PaymentSettingExternal> {
    return this.resources.update<PaymentSettingExternalUpdate, PaymentSettingExternal>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentSettingExternals.TYPE, _regenerate_shared_secret: true },
      params,
      options,
    )
  }

  isPaymentSettingExternal(resource: any): resource is PaymentSettingExternal {
    return resource.type && resource.type === PaymentSettingExternals.TYPE
  }

  relationship(id: string | ResourceId | null): PaymentSettingExternalRel {
    return super.relationshipOneToOne<PaymentSettingExternalRel>(id)
  }

  relationshipToMany(...ids: string[]): PaymentSettingExternalRel[] {
    return super.relationshipOneToMany<PaymentSettingExternalRel>(...ids)
  }

  type(): PaymentSettingExternalType {
    return PaymentSettingExternals.TYPE
  }
}

const instance = new PaymentSettingExternals()
export default instance

export type {
  PaymentSettingExternal,
  PaymentSettingExternalCreate,
  PaymentSettingExternals,
  PaymentSettingExternalType,
  PaymentSettingExternalUpdate,
}
