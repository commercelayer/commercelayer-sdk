import type { Resource, ResourceId, ResourceRel, ResourceSort /* ResourceFilter */ } from '@runtime/resource'
import { ApiResource } from '@runtime/resource'

type MarketType = 'markets'
type MarketRel = ResourceRel & { type: MarketType }

export type MarketSort = Pick<Market, 'id' | 'name' | 'code' | 'disabled_at'> & ResourceSort
// export type MarketFilter = Pick<Market, 'id' | 'name' | 'code' | 'disabled_at'> & ResourceFilter

/**
 * The Market object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/markets endpoint.
 *
 * @link https://docs.commercelayer.io/provisioning-api-reference/markets/object
 */
interface Market extends Resource {
  readonly type: MarketType

  /**
   * Unique identifier for the market (numeric).
   * @example ```1234```
   */
  number?: number | null
  /**
   * The market's internal name.
   * @example ```"EU Market"```
   */
  name: string
  /**
   * A string that you can use to identify the market (must be unique within the environment).
   * @example ```"europe1"```
   */
  code?: string | null
  /**
   * The Facebook Pixed ID.
   * @example ```"1234567890"```
   */
  facebook_pixel_id?: string | null
  /**
   * The checkout URL for this market.
   * @example ```"https://checkout.yourbrand.com/:order_id"```
   */
  checkout_url?: string | null
  /**
   * The URL used to overwrite prices by an external source.
   * @example ```"https://external_prices.yourbrand.com"```
   */
  external_prices_url?: string | null
  /**
   * The URL used to validate orders by an external source.
   * @example ```"https://external_validation.yourbrand.com"```
   */
  external_order_validation_url?: string | null
  /**
   * Indicates if market belongs to a customer_group.
   * @example ```true```
   */
  private?: boolean | null
  /**
   * When specified indicates the maximum number of shipping line items with cost that will be added to an order.
   * @example ```3```
   */
  shipping_cost_cutoff?: number | null
  /**
   * Time at which this resource was disabled.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  disabled_at?: string | null
}

class Markets extends ApiResource<Market> {
  static readonly TYPE: MarketType = 'markets' as const

  isMarket(resource: any): resource is Market {
    return resource.type && resource.type === Markets.TYPE
  }

  relationship(id: string | ResourceId | null): MarketRel {
    return super.relationshipOneToOne<MarketRel>(id)
  }

  relationshipToMany(...ids: string[]): MarketRel[] {
    return super.relationshipOneToMany<MarketRel>(...ids)
  }

  type(): MarketType {
    return Markets.TYPE
  }
}

const instance = new Markets()
export default instance

export type { Market, Markets, MarketType }
