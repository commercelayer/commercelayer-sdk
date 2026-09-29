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
import type { Market, MarketType } from './markets'

type PaymentRuleType = 'payment_rules'
type PaymentRuleRel = ResourceRel & { type: PaymentRuleType }
type MarketRel = ResourceRel & { type: MarketType }

export type PaymentRuleSort = Pick<PaymentRule, 'id' | 'template_id' | 'disabled_at'> & ResourceSort
// export type PaymentRuleFilter = Pick<PaymentRule, 'id' | 'template_id' | 'disabled_at'> & ResourceFilter

/**
 * The Payment rule object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/payment_rules endpoint.
 * @since 2026-05
 *
 * @link https://docs.commercelayer.io/core-api-reference/payment_rules/object
 */
interface PaymentRule extends Resource {
  readonly type: PaymentRuleType

  /**
   * The identifier of the template to be used (UUID).
   * @example ```"351af371-4090-43cf-af58-762244e19f9c"```
   */
  template_id: string
  /**
   * The settings for the template used.
   * @example ```{}```
   */
  template_settings: Record<string, any>
  /**
   * The expiration date/time of this payment rule.
   * @example ```"2018-01-02T12:00:00.000Z"```
   */
  expires_at?: string | null
  /**
   * Time at which this resource was disabled.
   * @example ```"2018-01-01T12:00:00.000Z"```
   */
  disabled_at?: string | null

  ruleable?: Market | null
  event_stores?: EventStore[] | null
}

interface PaymentRuleCreate extends ResourceCreate {
  /**
   * The identifier of the template to be used (UUID).
   * @example ```"351af371-4090-43cf-af58-762244e19f9c"```
   */
  template_id: string
  /**
   * The settings for the template used.
   * @example ```{}```
   */
  template_settings: Record<string, any>
  /**
   * The expiration date/time of this payment rule.
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

  ruleable: MarketRel
}

interface PaymentRuleUpdate extends ResourceUpdate {
  /**
   * The settings for the template used.
   * @example ```{}```
   */
  template_settings?: Record<string, any> | null
  /**
   * The expiration date/time of this payment rule.
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
class PaymentRules extends ApiResource<PaymentRule> {
  static readonly TYPE: PaymentRuleType = 'payment_rules' as const

  async create(
    resource: PaymentRuleCreate,
    params?: QueryParamsRetrieve<PaymentRule>,
    options?: ResourcesConfig,
  ): Promise<PaymentRule> {
    return this.resources.create<PaymentRuleCreate, PaymentRule>(
      { ...resource, type: PaymentRules.TYPE },
      params,
      options,
    )
  }

  async update(
    resource: PaymentRuleUpdate,
    params?: QueryParamsRetrieve<PaymentRule>,
    options?: ResourcesConfig,
  ): Promise<PaymentRule> {
    return this.resources.update<PaymentRuleUpdate, PaymentRule>(
      { ...resource, type: PaymentRules.TYPE },
      params,
      options,
    )
  }

  async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
    await this.resources.delete(typeof id === 'string' ? { id, type: PaymentRules.TYPE } : id, options)
  }

  async event_stores(
    paymentRuleId: string | PaymentRule,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _paymentRuleId = (paymentRuleId as PaymentRule).id || (paymentRuleId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `payment_rules/${_paymentRuleId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  async _disable(
    id: string | PaymentRule,
    params?: QueryParamsRetrieve<PaymentRule>,
    options?: ResourcesConfig,
  ): Promise<PaymentRule> {
    return this.resources.update<PaymentRuleUpdate, PaymentRule>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentRules.TYPE, _disable: true },
      params,
      options,
    )
  }

  async _enable(
    id: string | PaymentRule,
    params?: QueryParamsRetrieve<PaymentRule>,
    options?: ResourcesConfig,
  ): Promise<PaymentRule> {
    return this.resources.update<PaymentRuleUpdate, PaymentRule>(
      { id: typeof id === 'string' ? id : id.id, type: PaymentRules.TYPE, _enable: true },
      params,
      options,
    )
  }

  isPaymentRule(resource: any): resource is PaymentRule {
    return resource.type && resource.type === PaymentRules.TYPE
  }

  relationship(id: string | ResourceId | null): PaymentRuleRel {
    return super.relationshipOneToOne<PaymentRuleRel>(id)
  }

  relationshipToMany(...ids: string[]): PaymentRuleRel[] {
    return super.relationshipOneToMany<PaymentRuleRel>(...ids)
  }

  type(): PaymentRuleType {
    return PaymentRules.TYPE
  }
}

const instance = new PaymentRules()
export default instance

export type { PaymentRule, PaymentRuleCreate, PaymentRules, PaymentRuleType, PaymentRuleUpdate }
