import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList } from '../query'

import type { PercentageDiscountPromotion } from './percentage_discount_promotions'
import type { FreeShippingPromotion } from './free_shipping_promotions'
import type { BuyXPayYPromotion } from './buy_x_pay_y_promotions'
import type { FreeGiftPromotion } from './free_gift_promotions'
import type { FixedPricePromotion } from './fixed_price_promotions'
import type { ExternalPromotion } from './external_promotions'
import type { FixedAmountPromotion } from './fixed_amount_promotions'
import type { Version } from './versions'


type PromotionRuleType = 'promotion_rules'
type PromotionRuleRel = ResourceRel & { type: PromotionRuleType }


interface PromotionRule extends Resource {
	
	readonly type: PromotionRuleType


	promotion?: PercentageDiscountPromotion | FreeShippingPromotion | BuyXPayYPromotion | FreeGiftPromotion | FixedPricePromotion | ExternalPromotion | FixedAmountPromotion | null
	versions?: Version[] | null

}


class PromotionRules extends ApiResource<PromotionRule> {

	static readonly TYPE: PromotionRuleType = 'promotion_rules' as const

	async versions(promotionRuleId: string | PromotionRule, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _promotionRuleId = (promotionRuleId as PromotionRule).id || promotionRuleId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `promotion_rules/${_promotionRuleId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isPromotionRule(resource: any): resource is PromotionRule {
		return resource.type && (resource.type === PromotionRules.TYPE)
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


export default PromotionRules

export type { PromotionRule, PromotionRuleType }
