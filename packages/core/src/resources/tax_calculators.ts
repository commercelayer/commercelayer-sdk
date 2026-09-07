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
import type { Attachment } from './attachments'
import type { AvalaraAccount } from './avalara_accounts'
import type { EventStore } from './event_stores'
import type { Event } from './events'
import type { ExternalTaxCalculator } from './external_tax_calculators'
import type { ManualTaxCalculator } from './manual_tax_calculators'
import type { Market } from './markets'
import type { StripeTaxAccount } from './stripe_tax_accounts'
import type { TaxjarAccount } from './taxjar_accounts'
import type { VertexAccount } from './vertex_accounts'

type TaxCalculatorType =
  | 'tax_calculators'
  | 'avalara_accounts'
  | 'external_tax_calculators'
  | 'manual_tax_calculators'
  | 'stripe_tax_accounts'
  | 'taxjar_accounts'
  | 'vertex_accounts'
type TaxCalculatorRel = ResourceRel & { type: TaxCalculatorType }

export type TaxCalculatorSort = Pick<TaxCalculatorBase, 'id' | 'name'> & ResourceSort
// export type TaxCalculatorFilter = Pick<TaxCalculator, 'id' | 'name'> & ResourceFilter

/**
 * The Tax calculator object is returned as part of the response body of each successful list or retrieve API call to the /api/tax_calculators endpoint.
 *
 * @link https://docs.commercelayer.io/core-api-reference/tax_calculators/object
 */
type TaxCalculator =
  | AvalaraAccount
  | ExternalTaxCalculator
  | ManualTaxCalculator
  | StripeTaxAccount
  | TaxjarAccount
  | VertexAccount

interface TaxCalculatorBase extends Resource {
  readonly type: TaxCalculatorType

  /**
   * The tax calculator's internal name.
   * @example ```"Personal tax calculator"```
   */
  name: string

  markets?: Market[] | null
  attachments?: Attachment[] | null
  events?: Event[] | null
  event_stores?: EventStore[] | null
}

class TaxCalculators extends ApiResource<TaxCalculator> {
  static readonly TYPE: TaxCalculatorType = 'tax_calculators' as const

  async markets(
    taxCalculatorId: string | TaxCalculator,
    params?: QueryParamsList<Market>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Market>> {
    const _taxCalculatorId = (taxCalculatorId as TaxCalculator).id || (taxCalculatorId as string)
    return this.resources.fetch<Market>(
      { type: 'markets' },
      `tax_calculators/${_taxCalculatorId}/markets`,
      params,
      options,
    ) as unknown as ListResponse<Market>
  }

  async attachments(
    taxCalculatorId: string | TaxCalculator,
    params?: QueryParamsList<Attachment>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Attachment>> {
    const _taxCalculatorId = (taxCalculatorId as TaxCalculator).id || (taxCalculatorId as string)
    return this.resources.fetch<Attachment>(
      { type: 'attachments' },
      `tax_calculators/${_taxCalculatorId}/attachments`,
      params,
      options,
    ) as unknown as ListResponse<Attachment>
  }

  async events(
    taxCalculatorId: string | TaxCalculator,
    params?: QueryParamsList<Event>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Event>> {
    const _taxCalculatorId = (taxCalculatorId as TaxCalculator).id || (taxCalculatorId as string)
    return this.resources.fetch<Event>(
      { type: 'events' },
      `tax_calculators/${_taxCalculatorId}/events`,
      params,
      options,
    ) as unknown as ListResponse<Event>
  }

  async event_stores(
    taxCalculatorId: string | TaxCalculator,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _taxCalculatorId = (taxCalculatorId as TaxCalculator).id || (taxCalculatorId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `tax_calculators/${_taxCalculatorId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  isTaxCalculator(resource: any): resource is TaxCalculator {
    return (
      !!resource.type &&
      (resource.type === TaxCalculators.TYPE ||
        [
          'avalara_accounts',
          'external_tax_calculators',
          'manual_tax_calculators',
          'stripe_tax_accounts',
          'taxjar_accounts',
          'vertex_accounts',
        ].includes(resource.type))
    )
  }

  relationship(id: string | ResourceId | null): TaxCalculatorRel {
    return super.relationshipOneToOne<TaxCalculatorRel>(id)
  }

  relationshipToMany(...ids: string[]): TaxCalculatorRel[] {
    return super.relationshipOneToMany<TaxCalculatorRel>(...ids)
  }

  type(): TaxCalculatorType {
    return TaxCalculators.TYPE
  }
}

const instance = new TaxCalculators()
export default instance

export type { TaxCalculator, TaxCalculators, TaxCalculatorType }
