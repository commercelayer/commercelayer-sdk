import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { PercentageDiscountPromotion } from './percentage_discount_promotions'
import type { FreeShippingPromotion } from './free_shipping_promotions'
import type { FreeGiftPromotion } from './free_gift_promotions'
import type { FixedPricePromotion } from './fixed_price_promotions'
import type { ExternalPromotion } from './external_promotions'
import type { FixedAmountPromotion } from './fixed_amount_promotions'
import type { Coupon } from './coupons'


type CouponCodesPromotionRuleRel = ResourceRel & { type: typeof CouponCodesPromotionRules.TYPE }
type PercentageDiscountPromotionRel = ResourceRel & { type: 'percentage_discount_promotions' }
type FreeShippingPromotionRel = ResourceRel & { type: 'free_shipping_promotions' }
type FreeGiftPromotionRel = ResourceRel & { type: 'free_gift_promotions' }
type FixedPricePromotionRel = ResourceRel & { type: 'fixed_price_promotions' }
type ExternalPromotionRel = ResourceRel & { type: 'external_promotions' }
type FixedAmountPromotionRel = ResourceRel & { type: 'fixed_amount_promotions' }
type CouponRel = ResourceRel & { type: 'coupons' }


interface CouponCodesPromotionRule extends Resource {
	
	promotion?: PercentageDiscountPromotion | FreeShippingPromotion | FreeGiftPromotion | FixedPricePromotion | ExternalPromotion | FixedAmountPromotion
	coupons?: Coupon[]

}


interface CouponCodesPromotionRuleCreate extends ResourceCreate {
	
	promotion: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel | FixedAmountPromotionRel
	coupons?: CouponRel[]

}


interface CouponCodesPromotionRuleUpdate extends ResourceUpdate {
	
	promotion?: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel | FixedAmountPromotionRel
	coupons?: CouponRel[]

}


class CouponCodesPromotionRules extends ApiResource {

	static readonly TYPE: 'coupon_codes_promotion_rules' = 'coupon_codes_promotion_rules' as const
	// static readonly PATH = 'coupon_codes_promotion_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CouponCodesPromotionRule>> {
		return this.resources.list<CouponCodesPromotionRule>({ type: CouponCodesPromotionRules.TYPE }, params, options)
	}

	async create(resource: CouponCodesPromotionRuleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		return this.resources.create<CouponCodesPromotionRuleCreate, CouponCodesPromotionRule>({ ...resource, type: CouponCodesPromotionRules.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		return this.resources.retrieve<CouponCodesPromotionRule>({ type: CouponCodesPromotionRules.TYPE, id }, params, options)
	}

	async update(resource: CouponCodesPromotionRuleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		return this.resources.update<CouponCodesPromotionRuleUpdate, CouponCodesPromotionRule>({ ...resource, type: CouponCodesPromotionRules.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: CouponCodesPromotionRules.TYPE, id }, options)
	}

	async coupons(couponCodesPromotionRuleId: string | CouponCodesPromotionRule, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _couponCodesPromotionRuleId = (couponCodesPromotionRuleId as CouponCodesPromotionRule).id || couponCodesPromotionRuleId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `coupon_codes_promotion_rules/${_couponCodesPromotionRuleId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCouponCodesPromotionRule(resource: any): resource is CouponCodesPromotionRule {
		return resource.type && (resource.type === CouponCodesPromotionRules.TYPE)
	}


	relationship(id: string | ResourceId | null): CouponCodesPromotionRuleRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: CouponCodesPromotionRules.TYPE } : { id: id.id, type: CouponCodesPromotionRules.TYPE }
	}


	type(): string {
		return CouponCodesPromotionRules.TYPE
	}

}


export default CouponCodesPromotionRules

export { CouponCodesPromotionRule, CouponCodesPromotionRuleCreate, CouponCodesPromotionRuleUpdate }
