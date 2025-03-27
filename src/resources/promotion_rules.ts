import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsList } from '../query'

import type { Version } from './versions'
import type { PercentageDiscountPromotion } from './percentage_discount_promotions'
import type { FreeShippingPromotion } from './free_shipping_promotions'
import type { BuyXPayYPromotion } from './buy_x_pay_y_promotions'
import type { FreeGiftPromotion } from './free_gift_promotions'
import type { FixedPricePromotion } from './fixed_price_promotions'
import type { ExternalPromotion } from './external_promotions'
import type { FixedAmountPromotion } from './fixed_amount_promotions'
import type { FlexPromotion } from './flex_promotions'


type PromotionRuleType = 'promotion_rules'
type PromotionRuleRel = ResourceRel & { type: PromotionRuleType }


export type PromotionRuleSort = Pick<PromotionRule, 'id'> & ResourceSort
// export type PromotionRuleFilter = Pick<PromotionRule, 'id'> & ResourceFilter


interface PromotionRule extends Resource {
	
	readonly type: PromotionRuleType


	promotion?: PercentageDiscountPromotion | FreeShippingPromotion | BuyXPayYPromotion | FreeGiftPromotion | FixedPricePromotion | ExternalPromotion | FixedAmountPromotion | FlexPromotion | null
	versions?: Version[] | null

}


class PromotionRules extends ApiResource<PromotionRule> {

	static readonly TYPE: PromotionRuleType = 'promotion_rules' as const

	async versions(promotionRuleId: string | PromotionRule, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
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


const instance = new PromotionRules()
export default instance

export type { PromotionRule, PromotionRuleType }
