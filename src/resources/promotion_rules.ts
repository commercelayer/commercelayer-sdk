import { ApiResource, Resource, ResourceId, ResourceRel } from '../resource'


import type { PercentageDiscountPromotion } from './percentage_discount_promotions'
import type { FreeShippingPromotion } from './free_shipping_promotions'
import type { FreeGiftPromotion } from './free_gift_promotions'
import type { FixedPricePromotion } from './fixed_price_promotions'
import type { ExternalPromotion } from './external_promotions'
import type { FixedAmountPromotion } from './fixed_amount_promotions'


type PromotionRuleType = 'promotion_rules'
type PromotionRuleRel = ResourceRel & { type: PromotionRuleType }


interface PromotionRule extends Resource {
	
	readonly type: PromotionRuleType


	promotion?: PercentageDiscountPromotion | FreeShippingPromotion | FreeGiftPromotion | FixedPricePromotion | ExternalPromotion | FixedAmountPromotion

}


class PromotionRules extends ApiResource<PromotionRule> {

	static readonly TYPE: PromotionRuleType = 'promotion_rules' as const

	


	isPromotionRule(resource: any): resource is PromotionRule {
		return resource.type && (resource.type === PromotionRules.TYPE)
	}


	relationship(id: string | ResourceId | null): PromotionRuleRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: PromotionRules.TYPE } : { id: id.id, type: PromotionRules.TYPE }
	}


	type(): PromotionRuleType {
		return PromotionRules.TYPE
	}

}


export default PromotionRules

export type { PromotionRule, PromotionRuleType }
