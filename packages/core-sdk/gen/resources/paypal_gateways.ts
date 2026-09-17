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
import type { PaymentMethod } from './payment_methods'
import type { PaypalPayment } from './paypal_payments'

type PaypalGatewayType = 'paypal_gateways'
type PaypalGatewayRel = ResourceRel & { type: PaypalGatewayType }

export type PaypalGatewaySort = Pick<PaypalGateway, 'id' | 'name' | 'disabled_at'> & ResourceSort
// export type PaypalGatewayFilter = Pick<PaypalGateway, 'id' | 'name' | 'disabled_at'> & ResourceFilter

/**
 * The Paypal gateway object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/paypal_gateways endpoint.
 *
 * @deprecated Last available in API version 2017-08.
 * @link https://docs.commercelayer.io/core-api-reference/paypal_gateways/object
 */
interface PaypalGateway extends Resource {
  readonly type: PaypalGatewayType

  /**
   * The payment gateway's internal name.
   * @example ```"US payment gateway"```
   */
  name: string
  /**
   * Indicates if the payment source is forced on the editable order upon receiving a successful event from the gateway.
   * @example ```true```
   */
  force_payments?: boolean | null
  /**
   * The payment gateway's API credential keys last digits.
   * @example ```{"api_key":"********BW989"}```
   */
  credential_keys?: Record<string, any> | null
  /**
   * Time at which this resource was disabled.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  disabled_at?: string | null

  payment_methods?: PaymentMethod[] | null
  event_stores?: EventStore[] | null
  paypal_payments?: PaypalPayment[] | null
}

interface PaypalGatewayCreate extends ResourceCreate {
  /**
   * The payment gateway's internal name.
   * @example ```"US payment gateway"```
   */
  name: string
  /**
   * Indicates if the payment source is forced on the editable order upon receiving a successful event from the gateway.
   * @example ```true```
   */
  force_payments?: boolean | null
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
   * Send this attribute if you want to check the credentials against the payment gateway's APIs.
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

interface PaypalGatewayUpdate extends ResourceUpdate {
  /**
   * The payment gateway's internal name.
   * @example ```"US payment gateway"```
   */
  name?: string | null
  /**
   * Indicates if the payment source is forced on the editable order upon receiving a successful event from the gateway.
   * @example ```true```
   */
  force_payments?: boolean | null
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
   * Send this attribute if you want to check the credentials against the payment gateway's APIs.
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

/** @deprecated Last available in API version 2017-08. */
class PaypalGateways extends ApiResource<PaypalGateway> {
  static readonly TYPE: PaypalGatewayType = 'paypal_gateways' as const

  async create(
    resource: PaypalGatewayCreate,
    params?: QueryParamsRetrieve<PaypalGateway>,
    options?: ResourcesConfig,
  ): Promise<PaypalGateway> {
    return this.resources.create<PaypalGatewayCreate, PaypalGateway>(
      { ...resource, type: PaypalGateways.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: PaypalGatewayUpdate,
    params?: QueryParamsRetrieve<PaypalGateway>,
    options?: ResourcesConfig,
  ): Promise<PaypalGateway> {
    return this.resources.update<PaypalGatewayUpdate, PaypalGateway>(
      { ...resource, type: PaypalGateways.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: PaypalGateways.TYPE } : id, options)
  }

  async payment_methods(
    paypalGatewayId: string | PaypalGateway,
    params?: QueryParamsList<PaymentMethod>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentMethod>> {
    const _paypalGatewayId = (paypalGatewayId as PaypalGateway).id || (paypalGatewayId as string)
    return this.resources.fetch<PaymentMethod>(
      { type: 'payment_methods' },
      `paypal_gateways/${_paypalGatewayId}/payment_methods`,
      params,
      options,
    ) as unknown as ListResponse<PaymentMethod>
  }

  async event_stores(
    paypalGatewayId: string | PaypalGateway,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _paypalGatewayId = (paypalGatewayId as PaypalGateway).id || (paypalGatewayId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `paypal_gateways/${_paypalGatewayId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async paypal_payments(
    paypalGatewayId: string | PaypalGateway,
    params?: QueryParamsList<PaypalPayment>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaypalPayment>> {
    const _paypalGatewayId = (paypalGatewayId as PaypalGateway).id || (paypalGatewayId as string)
    return this.resources.fetch<PaypalPayment>(
      { type: 'paypal_payments' },
      `paypal_gateways/${_paypalGatewayId}/paypal_payments`,
      params,
      options,
    ) as unknown as ListResponse<PaypalPayment>
  }

  async _disable(
    id: string | PaypalGateway,
    params?: QueryParamsRetrieve<PaypalGateway>,
    options?: ResourcesConfig,
  ): Promise<PaypalGateway> {
    return this.resources.update<PaypalGatewayUpdate, PaypalGateway>(
      { id: typeof id === 'string' ? id : id.id, type: PaypalGateways.TYPE, _disable: true },
      params,
      options,
    )
  }

  async _enable(
    id: string | PaypalGateway,
    params?: QueryParamsRetrieve<PaypalGateway>,
    options?: ResourcesConfig,
  ): Promise<PaypalGateway> {
    return this.resources.update<PaypalGatewayUpdate, PaypalGateway>(
      { id: typeof id === 'string' ? id : id.id, type: PaypalGateways.TYPE, _enable: true },
      params,
      options,
    )
  }

  async _check(
    id: string | PaypalGateway,
    params?: QueryParamsRetrieve<PaypalGateway>,
    options?: ResourcesConfig,
  ): Promise<PaypalGateway> {
    return this.resources.update<PaypalGatewayUpdate, PaypalGateway>(
      { id: typeof id === 'string' ? id : id.id, type: PaypalGateways.TYPE, _check: true },
      params,
      options,
    )
  }

  isPaypalGateway(resource: any): resource is PaypalGateway {
    return resource.type && resource.type === PaypalGateways.TYPE
  }

  relationship(id: string | ResourceId | null): PaypalGatewayRel {
    return super.relationshipOneToOne<PaypalGatewayRel>(id)
  }

  relationshipToMany(...ids: string[]): PaypalGatewayRel[] {
    return super.relationshipOneToMany<PaypalGatewayRel>(...ids)
  }

  type(): PaypalGatewayType {
    return PaypalGateways.TYPE
  }
}

const instance = new PaypalGateways()
export default instance

export type { PaypalGateway, PaypalGatewayCreate, PaypalGateways, PaypalGatewayType, PaypalGatewayUpdate }
