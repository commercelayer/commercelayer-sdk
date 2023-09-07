import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { PercentageDiscountPromotion } from './percentage_discount_promotions'
import type { FreeShippingPromotion } from './free_shipping_promotions'
import type { FreeGiftPromotion } from './free_gift_promotions'
import type { FixedPricePromotion } from './fixed_price_promotions'
import type { ExternalPromotion } from './external_promotions'
import type { FixedAmountPromotion } from './fixed_amount_promotions'
import type { Version } from './versions'


type PromotionRuleRel = ResourceRel & { type: typeof PromotionRules.TYPE }


interface PromotionRule extends Resource {
	
	promotion?: PercentageDiscountPromotion | FreeShippingPromotion | FreeGiftPromotion | FixedPricePromotion | ExternalPromotion | FixedAmountPromotion
	versions?: Version[]

}


class PromotionRules extends ApiResource {

	static readonly TYPE: 'promotion_rules' = 'promotion_rules' as const
	// static readonly PATH = 'promotion_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PromotionRule>> {
		return this.resources.list<PromotionRule>({ type: PromotionRules.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PromotionRule> {
		return this.resources.retrieve<PromotionRule>({ type: PromotionRules.TYPE, id }, params, options)
	}

	async versions(promotionRuleId: string | PromotionRule, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _promotionRuleId = (promotionRuleId as PromotionRule).id || promotionRuleId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `promotion_rules/${_promotionRuleId}/versions`, params, options) as unknown as ListResponse<Version>
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
