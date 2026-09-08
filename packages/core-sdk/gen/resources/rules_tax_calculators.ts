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
import type { Market } from './markets'
import type { TaxBusinessRule, TaxBusinessRuleType } from './tax_business_rules'

type RulesTaxCalculatorType = 'rules_tax_calculators'
type RulesTaxCalculatorRel = ResourceRel & { type: RulesTaxCalculatorType }
type TaxBusinessRuleRel = ResourceRel & { type: TaxBusinessRuleType }

export type RulesTaxCalculatorSort = Pick<RulesTaxCalculator, 'id' | 'name'> & ResourceSort
// export type RulesTaxCalculatorFilter = Pick<RulesTaxCalculator, 'id' | 'name' | 'freight_taxable'> & ResourceFilter

/**
 * The Rules tax calculator object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/rules_tax_calculators endpoint.
 * @since 2026-05
 *
 * @link https://docs.commercelayer.io/core-api-reference/rules_tax_calculators/object
 */
interface RulesTaxCalculator extends Resource {
  readonly type: RulesTaxCalculatorType

  /**
   * The tax calculator's internal name.
   * @example ```"Personal tax calculator"```
   */
  name: string
  /**
   * Fallback tax rate when no rule group matches.
   * @example ```0.25```
   */
  default_tax_rate?: number | null
  /**
   * Whether shipment line items are taxed.
   */
  freight_taxable?: boolean | null

  markets?: Market[] | null
  attachments?: Attachment[] | null
  events?: Event[] | null
  event_stores?: EventStore[] | null
  tax_business_rules?: TaxBusinessRule[] | null
}

interface RulesTaxCalculatorCreate extends ResourceCreate {
  /**
   * The tax calculator's internal name.
   * @example ```"Personal tax calculator"```
   */
  name: string
  /**
   * Fallback tax rate when no rule group matches.
   * @example ```0.25```
   */
  default_tax_rate?: number | null
  /**
   * Whether shipment line items are taxed.
   */
  freight_taxable?: boolean | null

  tax_business_rules?: TaxBusinessRuleRel[] | null
}

interface RulesTaxCalculatorUpdate extends ResourceUpdate {
  /**
   * The tax calculator's internal name.
   * @example ```"Personal tax calculator"```
   */
  name?: string | null
  /**
   * Fallback tax rate when no rule group matches.
   * @example ```0.25```
   */
  default_tax_rate?: number | null
  /**
   * Whether shipment line items are taxed.
   */
  freight_taxable?: boolean | null

  tax_business_rules?: TaxBusinessRuleRel[] | null
}

/** @since 2026-05 */
class RulesTaxCalculators extends ApiResource<RulesTaxCalculator> {
  static readonly TYPE: RulesTaxCalculatorType = 'rules_tax_calculators' as const

  async create(
    resource: RulesTaxCalculatorCreate,
    params?: QueryParamsRetrieve<RulesTaxCalculator>,
    options?: ResourcesConfig,
  ): Promise<RulesTaxCalculator> {
    return this.resources.create<RulesTaxCalculatorCreate, RulesTaxCalculator>(
      { ...resource, type: RulesTaxCalculators.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: RulesTaxCalculatorUpdate,
    params?: QueryParamsRetrieve<RulesTaxCalculator>,
    options?: ResourcesConfig,
  ): Promise<RulesTaxCalculator> {
    return this.resources.update<RulesTaxCalculatorUpdate, RulesTaxCalculator>(
      { ...resource, type: RulesTaxCalculators.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: RulesTaxCalculators.TYPE } : id, options)
  }

  async markets(
    rulesTaxCalculatorId: string | RulesTaxCalculator,
    params?: QueryParamsList<Market>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Market>> {
    const _rulesTaxCalculatorId = (rulesTaxCalculatorId as RulesTaxCalculator).id || (rulesTaxCalculatorId as string)
    return this.resources.fetch<Market>(
      { type: 'markets' },
      `rules_tax_calculators/${_rulesTaxCalculatorId}/markets`,
      params,
      options,
    ) as unknown as ListResponse<Market>
  }

  async attachments(
    rulesTaxCalculatorId: string | RulesTaxCalculator,
    params?: QueryParamsList<Attachment>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Attachment>> {
    const _rulesTaxCalculatorId = (rulesTaxCalculatorId as RulesTaxCalculator).id || (rulesTaxCalculatorId as string)
    return this.resources.fetch<Attachment>(
      { type: 'attachments' },
      `rules_tax_calculators/${_rulesTaxCalculatorId}/attachments`,
      params,
      options,
    ) as unknown as ListResponse<Attachment>
  }

  async events(
    rulesTaxCalculatorId: string | RulesTaxCalculator,
    params?: QueryParamsList<Event>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Event>> {
    const _rulesTaxCalculatorId = (rulesTaxCalculatorId as RulesTaxCalculator).id || (rulesTaxCalculatorId as string)
    return this.resources.fetch<Event>(
      { type: 'events' },
      `rules_tax_calculators/${_rulesTaxCalculatorId}/events`,
      params,
      options,
    ) as unknown as ListResponse<Event>
  }

  async event_stores(
    rulesTaxCalculatorId: string | RulesTaxCalculator,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _rulesTaxCalculatorId = (rulesTaxCalculatorId as RulesTaxCalculator).id || (rulesTaxCalculatorId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `rules_tax_calculators/${_rulesTaxCalculatorId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async tax_business_rules(
    rulesTaxCalculatorId: string | RulesTaxCalculator,
    params?: QueryParamsList<TaxBusinessRule>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<TaxBusinessRule>> {
    const _rulesTaxCalculatorId = (rulesTaxCalculatorId as RulesTaxCalculator).id || (rulesTaxCalculatorId as string)
    return this.resources.fetch<TaxBusinessRule>(
      { type: 'tax_business_rules' },
      `rules_tax_calculators/${_rulesTaxCalculatorId}/tax_business_rules`,
      params,
      options,
    ) as unknown as ListResponse<TaxBusinessRule>
  }

  isRulesTaxCalculator(resource: any): resource is RulesTaxCalculator {
    return resource.type && resource.type === RulesTaxCalculators.TYPE
  }

  relationship(id: string | ResourceId | null): RulesTaxCalculatorRel {
    return super.relationshipOneToOne<RulesTaxCalculatorRel>(id)
  }

  relationshipToMany(...ids: string[]): RulesTaxCalculatorRel[] {
    return super.relationshipOneToMany<RulesTaxCalculatorRel>(...ids)
  }

  type(): RulesTaxCalculatorType {
    return RulesTaxCalculators.TYPE
  }
}

const instance = new RulesTaxCalculators()
export default instance

export type {
  RulesTaxCalculator,
  RulesTaxCalculatorCreate,
  RulesTaxCalculators,
  RulesTaxCalculatorType,
  RulesTaxCalculatorUpdate,
}
