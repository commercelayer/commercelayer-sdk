import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PercentageDiscountPromotion, PercentageDiscountPromotionType } from './percentage_discount_promotions'
import type { FreeShippingPromotion, FreeShippingPromotionType } from './free_shipping_promotions'
import type { BuyXPayYPromotion, BuyXPayYPromotionType } from './buy_x_pay_y_promotions'
import type { FreeGiftPromotion, FreeGiftPromotionType } from './free_gift_promotions'
import type { FixedPricePromotion, FixedPricePromotionType } from './fixed_price_promotions'
import type { ExternalPromotion, ExternalPromotionType } from './external_promotions'
import type { FixedAmountPromotion, FixedAmountPromotionType } from './fixed_amount_promotions'
import type { Version } from './versions'


type CustomPromotionRuleType = 'custom_promotion_rules'
type CustomPromotionRuleRel = ResourceRel & { type: CustomPromotionRuleType }
type PercentageDiscountPromotionRel = ResourceRel & { type: PercentageDiscountPromotionType }
type FreeShippingPromotionRel = ResourceRel & { type: FreeShippingPromotionType }
type BuyXPayYPromotionRel = ResourceRel & { type: BuyXPayYPromotionType }
type FreeGiftPromotionRel = ResourceRel & { type: FreeGiftPromotionType }
type FixedPricePromotionRel = ResourceRel & { type: FixedPricePromotionType }
type ExternalPromotionRel = ResourceRel & { type: ExternalPromotionType }
type FixedAmountPromotionRel = ResourceRel & { type: FixedAmountPromotionType }


interface CustomPromotionRule extends Resource {
	
	readonly type: CustomPromotionRuleType

	filters?: Record<string, any> | null

	promotion?: PercentageDiscountPromotion | FreeShippingPromotion | BuyXPayYPromotion | FreeGiftPromotion | FixedPricePromotion | ExternalPromotion | FixedAmountPromotion | null
	versions?: Version[] | null

}


interface CustomPromotionRuleCreate extends ResourceCreate {
	
	filters?: Record<string, any> | null

	promotion: PercentageDiscountPromotionRel | FreeShippingPromotionRel | BuyXPayYPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel | FixedAmountPromotionRel

}


interface CustomPromotionRuleUpdate extends ResourceUpdate {
	
	filters?: Record<string, any> | null

	promotion?: PercentageDiscountPromotionRel | FreeShippingPromotionRel | BuyXPayYPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel | FixedAmountPromotionRel | null

}


class CustomPromotionRules extends ApiResource<CustomPromotionRule> {

	static readonly TYPE: CustomPromotionRuleType = 'custom_promotion_rules' as const

	async create(resource: CustomPromotionRuleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		return this.resources.create<CustomPromotionRuleCreate, CustomPromotionRule>({ ...resource, type: CustomPromotionRules.TYPE }, params, options)
	}

	async update(resource: CustomPromotionRuleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		return this.resources.update<CustomPromotionRuleUpdate, CustomPromotionRule>({ ...resource, type: CustomPromotionRules.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: CustomPromotionRules.TYPE } : id, options)
	}

	async versions(customPromotionRuleId: string | CustomPromotionRule, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _customPromotionRuleId = (customPromotionRuleId as CustomPromotionRule).id || customPromotionRuleId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `custom_promotion_rules/${_customPromotionRuleId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isCustomPromotionRule(resource: any): resource is CustomPromotionRule {
		return resource.type && (resource.type === CustomPromotionRules.TYPE)
	}


	relationship(id: string | ResourceId | null): CustomPromotionRuleRel {
		return super.relationshipOneToOne<CustomPromotionRuleRel>(id)
	}

	relationshipToMany(...ids: string[]): CustomPromotionRuleRel[] {
		return super.relationshipOneToMany<CustomPromotionRuleRel>(...ids)
	}


	type(): CustomPromotionRuleType {
		return CustomPromotionRules.TYPE
	}

}


export default CustomPromotionRules

export type { CustomPromotionRule, CustomPromotionRuleCreate, CustomPromotionRuleUpdate, CustomPromotionRuleType }
