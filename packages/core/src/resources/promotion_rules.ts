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
import type { BuyXPayYPromotion } from './buy_x_pay_y_promotions'
import type { CouponCodesPromotionRule } from './coupon_codes_promotion_rules'
import type { CustomPromotionRule } from './custom_promotion_rules'
import type { EventStore } from './event_stores'
import type { ExternalPromotion } from './external_promotions'
import type { FixedAmountPromotion } from './fixed_amount_promotions'
import type { FixedPricePromotion } from './fixed_price_promotions'
import type { FlexPromotion } from './flex_promotions'
import type { FreeGiftPromotion } from './free_gift_promotions'
import type { FreeShippingPromotion } from './free_shipping_promotions'
import type { OrderAmountPromotionRule } from './order_amount_promotion_rules'
import type { PercentageDiscountPromotion } from './percentage_discount_promotions'
import type { SkuListPromotionRule } from './sku_list_promotion_rules'

type PromotionRuleType =
  | 'promotion_rules'
  | 'coupon_codes_promotion_rules'
  | 'custom_promotion_rules'
  | 'order_amount_promotion_rules'
  | 'sku_list_promotion_rules'
type PromotionRuleRel = ResourceRel & { type: PromotionRuleType }

export type PromotionRuleSort = Pick<PromotionRuleBase, 'id'> & ResourceSort
// export type PromotionRuleFilter = Pick<PromotionRule, 'id'> & ResourceFilter

/**
 * The Promotion rule object is returned as part of the response body of each successful list or retrieve API call to the /api/promotion_rules endpoint.
 *
 * @link https://docs.commercelayer.io/core-api-reference/promotion_rules/object
 */
type PromotionRule = CouponCodesPromotionRule | CustomPromotionRule | OrderAmountPromotionRule | SkuListPromotionRule

interface PromotionRuleBase extends Resource {
  readonly type: PromotionRuleType

  promotion?:
    | PercentageDiscountPromotion
    | FreeShippingPromotion
    | BuyXPayYPromotion
    | FreeGiftPromotion
    | FixedPricePromotion
    | ExternalPromotion
    | FixedAmountPromotion
    | FlexPromotion
    | null
  event_stores?: EventStore[] | null
}

class PromotionRules extends ApiResource<PromotionRule> {
  static readonly TYPE: PromotionRuleType = 'promotion_rules' as const

  async event_stores(
    promotionRuleId: string | PromotionRule,
    params?: QueryParamsList<EventStore>,
    options?: ResourcesConfig,
  ): Promise<ListResponse<EventStore>> {
    const _promotionRuleId = (promotionRuleId as PromotionRule).id || (promotionRuleId as string)
    return this.resources.fetch<EventStore>(
      { type: 'event_stores' },
      `promotion_rules/${_promotionRuleId}/event_stores`,
      params,
      options,
    ) as unknown as ListResponse<EventStore>
  }

  isPromotionRule(resource: any): resource is PromotionRule {
    return (
      !!resource.type &&
      (resource.type === PromotionRules.TYPE ||
        [
          'coupon_codes_promotion_rules',
          'custom_promotion_rules',
          'order_amount_promotion_rules',
          'sku_list_promotion_rules',
        ].includes(resource.type))
    )
  }

  relationship(id: string | ResourceId | null): PromotionRuleRel {
    return super.relationshipOneToOne<PromotionRuleRel>(id)
  }

  relationshipToMany(...ids: string[]): PromotionRuleRel[] {
    return super.relationshipOneToMany<PromotionRuleRel>(...ids)
  }

  type(): PromotionRuleType {
    return PromotionRules.TYPE
  }
}

const instance = new PromotionRules()
export default instance

export type { PromotionRule, PromotionRules, PromotionRuleType }
