import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { PercentageDiscountPromotion } from './percentage_discount_promotions'
import { FreeShippingPromotion } from './free_shipping_promotions'
import { FixedAmountPromotion } from './fixed_amount_promotions'
import { FreeGiftPromotion } from './free_gift_promotions'
import { FixedPricePromotion } from './fixed_price_promotions'
import { ExternalPromotion } from './external_promotions'


type PromotionRuleRel = ResourceRel & { type: typeof PromotionRules.TYPE }


interface PromotionRule extends Resource {
	
	promotion?: PercentageDiscountPromotion | FreeShippingPromotion | FixedAmountPromotion | FreeGiftPromotion | FixedPricePromotion | ExternalPromotion

}


class PromotionRules extends ApiResource {

	static readonly TYPE: 'promotion_rules' = 'promotion_rules'
	// static readonly PATH = 'promotion_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PromotionRule>> {
		return this.resources.list({ type: PromotionRules.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PromotionRule> {
		return this.resources.retrieve<PromotionRule>({ type: PromotionRules.TYPE, id }, params, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPromotionRule(resource: any): resource is PromotionRule {
		return resource.type && (resource.type === PromotionRules.TYPE)
	}


	relationship(id: string | ResourceId | null): PromotionRuleRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: PromotionRules.TYPE } : { id: id.id, type: PromotionRules.TYPE }
	}


	type(): string {
		return PromotionRules.TYPE
	}

}


export default PromotionRules

export { PromotionRule }
