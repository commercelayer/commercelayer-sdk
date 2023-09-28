import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { PercentageDiscountPromotion } from './percentage_discount_promotions'
import type { FreeShippingPromotion } from './free_shipping_promotions'
import type { BuyXPayYPromotion } from './buy_x_pay_y_promotions'
import type { FreeGiftPromotion } from './free_gift_promotions'
import type { FixedPricePromotion } from './fixed_price_promotions'
import type { ExternalPromotion } from './external_promotions'
import type { FixedAmountPromotion } from './fixed_amount_promotions'
import type { Version } from './versions'


type CustomPromotionRuleRel = ResourceRel & { type: typeof CustomPromotionRules.TYPE }
type PercentageDiscountPromotionRel = ResourceRel & { type: 'percentage_discount_promotions' }
type FreeShippingPromotionRel = ResourceRel & { type: 'free_shipping_promotions' }
type BuyXPayYPromotionRel = ResourceRel & { type: 'buy_x_pay_y_promotions' }
type FreeGiftPromotionRel = ResourceRel & { type: 'free_gift_promotions' }
type FixedPricePromotionRel = ResourceRel & { type: 'fixed_price_promotions' }
type ExternalPromotionRel = ResourceRel & { type: 'external_promotions' }
type FixedAmountPromotionRel = ResourceRel & { type: 'fixed_amount_promotions' }


interface CustomPromotionRule extends Resource {
	
	filters?: object

	promotion?: PercentageDiscountPromotion | FreeShippingPromotion | BuyXPayYPromotion | FreeGiftPromotion | FixedPricePromotion | ExternalPromotion | FixedAmountPromotion
	versions?: Version[]

}


interface CustomPromotionRuleCreate extends ResourceCreate {
	
	filters?: object

	promotion: PercentageDiscountPromotionRel | FreeShippingPromotionRel | BuyXPayYPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel | FixedAmountPromotionRel

}


interface CustomPromotionRuleUpdate extends ResourceUpdate {
	
	filters?: object

	promotion?: PercentageDiscountPromotionRel | FreeShippingPromotionRel | BuyXPayYPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel | FixedAmountPromotionRel

}


class CustomPromotionRules extends ApiResource {

	static readonly TYPE: 'custom_promotion_rules' = 'custom_promotion_rules' as const
	// static readonly PATH = 'custom_promotion_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomPromotionRule>> {
		return this.resources.list<CustomPromotionRule>({ type: CustomPromotionRules.TYPE }, params, options)
	}

	async create(resource: CustomPromotionRuleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		return this.resources.create<CustomPromotionRuleCreate, CustomPromotionRule>({ ...resource, type: CustomPromotionRules.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		return this.resources.retrieve<CustomPromotionRule>({ type: CustomPromotionRules.TYPE, id }, params, options)
	}

	async update(resource: CustomPromotionRuleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		return this.resources.update<CustomPromotionRuleUpdate, CustomPromotionRule>({ ...resource, type: CustomPromotionRules.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: CustomPromotionRules.TYPE, id }, options)
	}

	async versions(customPromotionRuleId: string | CustomPromotionRule, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _customPromotionRuleId = (customPromotionRuleId as CustomPromotionRule).id || customPromotionRuleId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `custom_promotion_rules/${_customPromotionRuleId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCustomPromotionRule(resource: any): resource is CustomPromotionRule {
		return resource.type && (resource.type === CustomPromotionRules.TYPE)
	}


	relationship(id: string | ResourceId | null): CustomPromotionRuleRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: CustomPromotionRules.TYPE } : { id: id.id, type: CustomPromotionRules.TYPE }
	}


	type(): string {
		return CustomPromotionRules.TYPE
	}

}


export default CustomPromotionRules

export { CustomPromotionRule, CustomPromotionRuleCreate, CustomPromotionRuleUpdate }
