import type { QueryParamsList, QueryParamsRetrieve } from '../query'
import type {
  ListResponse,
  Resource,
  ResourceId,
  ResourceRel,
  ResourceSort,
  /* ResourceFilter */ ResourcesConfig,
} from '../resource'
import { ApiResource } from '../resource'
import type { Attachment } from './attachments'
import type { EventStore } from './event_stores'
import type { PriceFrequencyTier } from './price_frequency_tiers'
import type { PriceVolumeTier } from './price_volume_tiers'
import type { Price } from './prices'

type PriceTierType = 'price_tiers' | 'price_frequency_tiers' | 'price_volume_tiers'
type PriceTierRel = ResourceRel & { type: PriceTierType }

export type PriceTierSort = Pick<PriceTierBase, 'id' | 'name' | 'up_to' | 'price_amount_cents'> & ResourceSort
// export type PriceTierFilter = Pick<PriceTier, 'id' | 'name' | 'up_to' | 'price_amount_cents'> & ResourceFilter

/**
 * The Price tier object is returned as part of the response body of each successful list or retrieve API call to the /api/price_tiers endpoint.
 *
 * @link https://docs.commercelayer.io/core-api-reference/price_tiers/object
 */
type PriceTier = PriceFrequencyTier | PriceVolumeTier

interface PriceTierBase extends Resource {
  readonly type: PriceTierType

  /**
   * The price tier's name.
   * @example ```"six pack"```
   */
  name: string
  /**
   * The tier upper limit. When 'null' it means infinity (useful to have an always matching tier).
   * @example ```20.5```
   */
  up_to?: number | null
  /**
   * The price of this price tier, in cents.
   * @example ```1000```
   */
  price_amount_cents: number
  /**
   * The price of this price tier, float.
   * @example ```10```
   */
  price_amount_float?: number | null
  /**
   * The price of this price tier, formatted.
   * @example ```"€10,00"```
   */
  formatted_price_amount?: string | null

  price?: Price | null
  attachments?: Attachment[] | null
  event_stores?: EventStore[] | null
}

class PriceTiers extends ApiResource<PriceTier> {
  static readonly TYPE: PriceTierType = 'price_tiers' as const

  async price(
    priceTierId: string | PriceTier,
    params?: QueryParamsRetrieve<Price>,
    options?: ResourcesConfig,
  ): Promise<Price> {
    const _priceTierId = (priceTierId as PriceTier).id || (priceTierId as string)
    return this.resources.fetch<Price>(
      { type: 'prices' },
      `price_tiers/${_priceTierId}/price`,
      params,
      options,
    ) as unknown as Price
  }

  async attachments(
    priceTierId: string | PriceTier,
    params?: QueryParamsList<Attachment>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Attachment>> {
    const _priceTierId = (priceTierId as PriceTier).id || (priceTierId as string)
    return this.resources.fetch<Attachment>(
      { type: 'attachments' },
      `price_tiers/${_priceTierId}/attachments`,
      params,
      options,
    ) as unknown as ListResponse<Attachment>
  }

  async event_stores(
    priceTierId: string | PriceTier,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _priceTierId = (priceTierId as PriceTier).id || (priceTierId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `price_tiers/${_priceTierId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  isPriceTier(resource: any): resource is PriceTier {
    return (
      !!resource.type &&
      (resource.type === PriceTiers.TYPE || ['price_frequency_tiers', 'price_volume_tiers'].includes(resource.type))
    )
  }

  relationship(id: string | ResourceId | null): PriceTierRel {
    return super.relationshipOneToOne<PriceTierRel>(id)
  }

  relationshipToMany(...ids: string[]): PriceTierRel[] {
    return super.relationshipOneToMany<PriceTierRel>(...ids)
  }

  type(): PriceTierType {
    return PriceTiers.TYPE
  }
}

const instance = new PriceTiers()
export default instance

export type { PriceTier, PriceTiers, PriceTierType }
