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
import type { Attachment } from './attachments'
import type { EventStore } from './event_stores'
import type { Event } from './events'
import type { ShippingMethod, ShippingMethodType } from './shipping_methods'

type ShippingWeightTierType = 'shipping_weight_tiers'
type ShippingWeightTierRel = ResourceRel & { type: ShippingWeightTierType }
type ShippingMethodRel = ResourceRel & { type: ShippingMethodType }

export type ShippingWeightTierSort = Pick<ShippingWeightTier, 'id' | 'name' | 'up_to' | 'price_amount_cents'> &
  ResourceSort
// export type ShippingWeightTierFilter = Pick<ShippingWeightTier, 'id' | 'name' | 'up_to' | 'price_amount_cents'> & ResourceFilter

/**
 * The Shipping weight tier object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/shipping_weight_tiers endpoint.
 *
 * @link https://docs.commercelayer.io/core-api-reference/shipping_weight_tiers/object
 */
interface ShippingWeightTier extends Resource {
  readonly type: ShippingWeightTierType

  /**
   * The shipping method tier's name.
   * @example ```"Light shipping under 3kg"```
   */
  name: string
  /**
   * The tier upper limit. When 'null' it means infinity (useful to have an always matching tier).
   * @example ```20.5```
   */
  up_to?: number | null
  /**
   * The price of this shipping method tier, in cents.
   * @example ```1000```
   */
  price_amount_cents: number
  /**
   * The price of this shipping method tier, float.
   * @example ```10```
   */
  price_amount_float?: number | null
  /**
   * The price of this shipping method tier, formatted.
   * @example ```"€10,00"```
   */
  formatted_price_amount?: string | null

  shipping_method?: ShippingMethod | null
  attachments?: Attachment[] | null
  event_stores?: EventStore[] | null
  events?: Event[] | null
}

interface ShippingWeightTierCreate extends ResourceCreate {
  /**
   * The shipping method tier's name.
   * @example ```"Light shipping under 3kg"```
   */
  name: string
  /**
   * The tier upper limit. When 'null' it means infinity (useful to have an always matching tier).
   * @example ```20.5```
   */
  up_to?: number | null
  /**
   * The price of this shipping method tier, in cents.
   * @example ```1000```
   */
  price_amount_cents: number

  shipping_method: ShippingMethodRel
}

interface ShippingWeightTierUpdate extends ResourceUpdate {
  /**
   * The shipping method tier's name.
   * @example ```"Light shipping under 3kg"```
   */
  name?: string | null
  /**
   * The tier upper limit. When 'null' it means infinity (useful to have an always matching tier).
   * @example ```20.5```
   */
  up_to?: number | null
  /**
   * The price of this shipping method tier, in cents.
   * @example ```1000```
   */
  price_amount_cents?: number | null

  shipping_method?: ShippingMethodRel | null
}

class ShippingWeightTiers extends ApiResource<ShippingWeightTier> {
  static readonly TYPE: ShippingWeightTierType = 'shipping_weight_tiers' as const

  async create(
    resource: ShippingWeightTierCreate,
    params?: QueryParamsRetrieve<ShippingWeightTier>,
    options?: ResourcesConfig,
  ): Promise<ShippingWeightTier> {
    return this.resources.create<ShippingWeightTierCreate, ShippingWeightTier>(
      { ...resource, type: ShippingWeightTiers.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: ShippingWeightTierUpdate,
    params?: QueryParamsRetrieve<ShippingWeightTier>,
    options?: ResourcesConfig,
  ): Promise<ShippingWeightTier> {
    return this.resources.update<ShippingWeightTierUpdate, ShippingWeightTier>(
      { ...resource, type: ShippingWeightTiers.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: ShippingWeightTiers.TYPE } : id, options)
  }

  async shipping_method(
    shippingWeightTierId: string | ShippingWeightTier,
    params?: QueryParamsRetrieve<ShippingMethod>,
    options?: ResourcesConfig,
  ): Promise<ShippingMethod> {
    const _shippingWeightTierId = (shippingWeightTierId as ShippingWeightTier).id || (shippingWeightTierId as string)
    return this.resources.fetch<ShippingMethod>(
      { type: 'shipping_methods' },
      `shipping_weight_tiers/${_shippingWeightTierId}/shipping_method`,
      params,
      options,
    ) as unknown as ShippingMethod
  }

  async attachments(
    shippingWeightTierId: string | ShippingWeightTier,
    params?: QueryParamsList<Attachment>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Attachment>> {
    const _shippingWeightTierId = (shippingWeightTierId as ShippingWeightTier).id || (shippingWeightTierId as string)
    return this.resources.fetch<Attachment>(
      { type: 'attachments' },
      `shipping_weight_tiers/${_shippingWeightTierId}/attachments`,
      params,
      options,
    ) as unknown as ListResponse<Attachment>
  }

  async event_stores(
    shippingWeightTierId: string | ShippingWeightTier,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _shippingWeightTierId = (shippingWeightTierId as ShippingWeightTier).id || (shippingWeightTierId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `shipping_weight_tiers/${_shippingWeightTierId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async events(
    shippingWeightTierId: string | ShippingWeightTier,
    params?: QueryParamsList<Event>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Event>> {
    const _shippingWeightTierId = (shippingWeightTierId as ShippingWeightTier).id || (shippingWeightTierId as string)
    return this.resources.fetch<Event>(
      { type: 'events' },
      `shipping_weight_tiers/${_shippingWeightTierId}/events`,
      params,
      options,
    ) as unknown as ListResponse<Event>
  }

  isShippingWeightTier(resource: any): resource is ShippingWeightTier {
    return resource.type && resource.type === ShippingWeightTiers.TYPE
  }

  relationship(id: string | ResourceId | null): ShippingWeightTierRel {
    return super.relationshipOneToOne<ShippingWeightTierRel>(id)
  }

  relationshipToMany(...ids: string[]): ShippingWeightTierRel[] {
    return super.relationshipOneToMany<ShippingWeightTierRel>(...ids)
  }

  type(): ShippingWeightTierType {
    return ShippingWeightTiers.TYPE
  }
}

const instance = new ShippingWeightTiers()
export default instance

export type {
  ShippingWeightTier,
  ShippingWeightTierCreate,
  ShippingWeightTiers,
  ShippingWeightTierType,
  ShippingWeightTierUpdate,
}
