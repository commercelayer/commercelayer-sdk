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
import type { TaxCalculator, TaxCalculatorType } from './tax_calculators'

type TaxBusinessRuleType = 'tax_business_rules'
type TaxBusinessRuleRel = ResourceRel & { type: TaxBusinessRuleType }
type TaxCalculatorRel = ResourceRel & { type: TaxCalculatorType }

export type TaxBusinessRuleSort = Pick<TaxBusinessRule, 'id' | 'template_id' | 'disabled_at'> & ResourceSort
// export type TaxBusinessRuleFilter = Pick<TaxBusinessRule, 'id' | 'template_id' | 'template_kind' | 'disabled_at'> & ResourceFilter

/**
 * The Tax business rule object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/tax_business_rules endpoint.
 * @since 2026-05
 *
 * @link https://docs.commercelayer.io/core-api-reference/tax_business_rules/object
 */
interface TaxBusinessRule extends Resource {
  readonly type: TaxBusinessRuleType

  /**
   * The identifier of the template to be used (UUID).
   * @example ```"c3d4e5f6-a7b8-9012-cdef-123456789abc"```
   */
  template_id: string
  /**
   * The template subject (line_item or line_item_option).
   * @example ```"line_item"```
   */
  template_kind?: string | null
  /**
   * The settings for the template used, including groups.
   * @example ```{}```
   */
  template_settings: Record<string, any>
  /**
   * The expiration date/time of this tax rule.
   * @example ```"2018-01-02T12:00:00.000Z"```
   */
  expires_at?: string | null
  /**
   * Time at which this resource was disabled.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  disabled_at?: string | null

  ruleable?: TaxCalculator | null
  event_stores?: EventStore[] | null
}

interface TaxBusinessRuleCreate extends ResourceCreate {
  /**
   * The identifier of the template to be used (UUID).
   * @example ```"c3d4e5f6-a7b8-9012-cdef-123456789abc"```
   */
  template_id: string
  /**
   * The settings for the template used, including groups.
   * @example ```{}```
   */
  template_settings: Record<string, any>
  /**
   * The expiration date/time of this tax rule.
   * @example ```"2018-01-02T12:00:00.000Z"```
   */
  expires_at?: string | null
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

  ruleable: TaxCalculatorRel
}

interface TaxBusinessRuleUpdate extends ResourceUpdate {
  /**
   * The settings for the template used, including groups.
   * @example ```{}```
   */
  template_settings?: Record<string, any> | null
  /**
   * The expiration date/time of this tax rule.
   * @example ```"2018-01-02T12:00:00.000Z"```
   */
  expires_at?: string | null
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
class TaxBusinessRules extends ApiResource<TaxBusinessRule> {
  static readonly TYPE: TaxBusinessRuleType = 'tax_business_rules' as const

  async create(
    resource: TaxBusinessRuleCreate,
    params?: QueryParamsRetrieve<TaxBusinessRule>,
    options?: ResourcesConfig,
  ): Promise<TaxBusinessRule> {
    return this.resources.create<TaxBusinessRuleCreate, TaxBusinessRule>(
      { ...resource, type: TaxBusinessRules.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: TaxBusinessRuleUpdate,
    params?: QueryParamsRetrieve<TaxBusinessRule>,
    options?: ResourcesConfig,
  ): Promise<TaxBusinessRule> {
    return this.resources.update<TaxBusinessRuleUpdate, TaxBusinessRule>(
      { ...resource, type: TaxBusinessRules.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: TaxBusinessRules.TYPE } : id, options)
  }

  async event_stores(
    taxBusinessRuleId: string | TaxBusinessRule,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _taxBusinessRuleId = (taxBusinessRuleId as TaxBusinessRule).id || (taxBusinessRuleId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `tax_business_rules/${_taxBusinessRuleId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async _disable(
    id: string | TaxBusinessRule,
    params?: QueryParamsRetrieve<TaxBusinessRule>,
    options?: ResourcesConfig,
  ): Promise<TaxBusinessRule> {
    return this.resources.update<TaxBusinessRuleUpdate, TaxBusinessRule>(
      { id: typeof id === 'string' ? id : id.id, type: TaxBusinessRules.TYPE, _disable: true },
      params,
      options,
    )
  }

  async _enable(
    id: string | TaxBusinessRule,
    params?: QueryParamsRetrieve<TaxBusinessRule>,
    options?: ResourcesConfig,
  ): Promise<TaxBusinessRule> {
    return this.resources.update<TaxBusinessRuleUpdate, TaxBusinessRule>(
      { id: typeof id === 'string' ? id : id.id, type: TaxBusinessRules.TYPE, _enable: true },
      params,
      options,
    )
  }

  isTaxBusinessRule(resource: any): resource is TaxBusinessRule {
    return resource.type && resource.type === TaxBusinessRules.TYPE
  }

  relationship(id: string | ResourceId | null): TaxBusinessRuleRel {
    return super.relationshipOneToOne<TaxBusinessRuleRel>(id)
  }

  relationshipToMany(...ids: string[]): TaxBusinessRuleRel[] {
    return super.relationshipOneToMany<TaxBusinessRuleRel>(...ids)
  }

  type(): TaxBusinessRuleType {
    return TaxBusinessRules.TYPE
  }
}

const instance = new TaxBusinessRules()
export default instance

export type { TaxBusinessRule, TaxBusinessRuleCreate, TaxBusinessRules, TaxBusinessRuleType, TaxBusinessRuleUpdate }
