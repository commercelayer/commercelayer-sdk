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
import type { AdyenGateway } from './adyen_gateways'
import type { AxerveGateway } from './axerve_gateways'
import type { BraintreeGateway } from './braintree_gateways'
import type { CheckoutComGateway } from './checkout_com_gateways'
import type { EventStore } from './event_stores'
import type { ExternalGateway } from './external_gateways'
import type { KlarnaGateway } from './klarna_gateways'
import type { ManualGateway } from './manual_gateways'
import type { PaymentMethod } from './payment_methods'
import type { PaypalGateway } from './paypal_gateways'
import type { SatispayGateway } from './satispay_gateways'
import type { StripeGateway } from './stripe_gateways'

type PaymentGatewayType = 'payment_gateways'
type PaymentGatewayRel = ResourceRel & { type: PaymentGatewayType }

export type PaymentGatewaySort = Pick<PaymentGatewayBase, 'id' | 'name' | 'disabled_at'> & ResourceSort
// export type PaymentGatewayFilter = Pick<PaymentGateway, 'id' | 'name' | 'disabled_at'> & ResourceFilter

type PaymentGateway =
  | AdyenGateway
  | AxerveGateway
  | BraintreeGateway
  | CheckoutComGateway
  | ExternalGateway
  | KlarnaGateway
  | ManualGateway
  | PaypalGateway
  | SatispayGateway
  | StripeGateway

interface PaymentGatewayBase extends Resource {
  readonly type: PaymentGatewayType

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
}

class PaymentGateways extends ApiResource<PaymentGateway> {
  static readonly TYPE: PaymentGatewayType = 'payment_gateways' as const

  async payment_methods(
    paymentGatewayId: string | PaymentGateway,
    params?: QueryParamsList<PaymentMethod>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<PaymentMethod>> {
    const _paymentGatewayId = (paymentGatewayId as PaymentGateway).id || (paymentGatewayId as string)
    return this.resources.fetch<PaymentMethod>(
      { type: 'payment_methods' },
      `payment_gateways/${_paymentGatewayId}/payment_methods`,
      params,
      options,
    ) as unknown as ListResponse<PaymentMethod>
  }

  async event_stores(
    paymentGatewayId: string | PaymentGateway,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _paymentGatewayId = (paymentGatewayId as PaymentGateway).id || (paymentGatewayId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `payment_gateways/${_paymentGatewayId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  isPaymentGateway(resource: any): resource is PaymentGateway {
    return (
      !!resource.type &&
      (resource.type === PaymentGateways.TYPE ||
        [
          'adyen_gateways',
          'axerve_gateways',
          'braintree_gateways',
          'checkout_com_gateways',
          'external_gateways',
          'klarna_gateways',
          'manual_gateways',
          'paypal_gateways',
          'satispay_gateways',
          'stripe_gateways',
        ].includes(resource.type))
    )
  }

  relationship(id: string | ResourceId | null): PaymentGatewayRel {
    return super.relationshipOneToOne<PaymentGatewayRel>(id)
  }

  relationshipToMany(...ids: string[]): PaymentGatewayRel[] {
    return super.relationshipOneToMany<PaymentGatewayRel>(...ids)
  }

  type(): PaymentGatewayType {
    return PaymentGateways.TYPE
  }
}

const instance = new PaymentGateways()
export default instance

export type { PaymentGateway, PaymentGateways, PaymentGatewayType }
