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
import type { Market } from './markets'

type OrderValidationRuleType = 'order_validation_rules'
type OrderValidationRuleRel = ResourceRel & { type: OrderValidationRuleType }

export type OrderValidationRuleSort = Pick<OrderValidationRule, 'id'> & ResourceSort
// export type OrderValidationRuleFilter = Pick<OrderValidationRule, 'id'> & ResourceFilter

interface OrderValidationRule extends Resource {
  readonly type: OrderValidationRuleType

  market?: Market | null
  attachments?: Attachment[] | null
  event_stores?: EventStore[] | null
}

/** @deprecated Last available in API version 2017-08. */
class OrderValidationRules extends ApiResource<OrderValidationRule> {
  static readonly TYPE: OrderValidationRuleType = 'order_validation_rules' as const

  async market(
    orderValidationRuleId: string | OrderValidationRule,
    params?: QueryParamsRetrieve<Market>,
    options?: ResourcesConfig,
  ): Promise<Market> {
    const _orderValidationRuleId =
      (orderValidationRuleId as OrderValidationRule).id || (orderValidationRuleId as string)
    return this.resources.fetch<Market>(
      { type: 'markets' },
      `order_validation_rules/${_orderValidationRuleId}/market`,
      params,
      options,
    ) as unknown as Market
  }

  async attachments(
    orderValidationRuleId: string | OrderValidationRule,
    params?: QueryParamsList<Attachment>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<Attachment>> {
    const _orderValidationRuleId =
      (orderValidationRuleId as OrderValidationRule).id || (orderValidationRuleId as string)
    return this.resources.fetch<Attachment>(
      { type: 'attachments' },
      `order_validation_rules/${_orderValidationRuleId}/attachments`,
      params,
      options,
    ) as unknown as ListResponse<Attachment>
  }

  async event_stores(
    orderValidationRuleId: string | OrderValidationRule,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _orderValidationRuleId =
      (orderValidationRuleId as OrderValidationRule).id || (orderValidationRuleId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `order_validation_rules/${_orderValidationRuleId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  isOrderValidationRule(resource: any): resource is OrderValidationRule {
    return resource.type && resource.type === OrderValidationRules.TYPE
  }

  relationship(id: string | ResourceId | null): OrderValidationRuleRel {
    return super.relationshipOneToOne<OrderValidationRuleRel>(id)
  }

  relationshipToMany(...ids: string[]): OrderValidationRuleRel[] {
    return super.relationshipOneToMany<OrderValidationRuleRel>(...ids)
  }

  type(): OrderValidationRuleType {
    return OrderValidationRules.TYPE
  }
}

const instance = new OrderValidationRules()
export default instance

export type { OrderValidationRule, OrderValidationRules, OrderValidationRuleType }
