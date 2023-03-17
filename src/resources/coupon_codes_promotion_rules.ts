import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PercentageDiscountPromotion, PercentageDiscountPromotionType } from './percentage_discount_promotions'
import type { FreeShippingPromotion, FreeShippingPromotionType } from './free_shipping_promotions'
import type { FreeGiftPromotion, FreeGiftPromotionType } from './free_gift_promotions'
import type { FixedPricePromotion, FixedPricePromotionType } from './fixed_price_promotions'
import type { ExternalPromotion, ExternalPromotionType } from './external_promotions'
import type { FixedAmountPromotion, FixedAmountPromotionType } from './fixed_amount_promotions'
import type { Coupon, CouponType } from './coupons'


type CouponCodesPromotionRuleType = 'coupon_codes_promotion_rules'
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type PercentageDiscountPromotionRel = ResourceRel & { type: PercentageDiscountPromotionType }
type FreeShippingPromotionRel = ResourceRel & { type: FreeShippingPromotionType }
type FreeGiftPromotionRel = ResourceRel & { type: FreeGiftPromotionType }
type FixedPricePromotionRel = ResourceRel & { type: FixedPricePromotionType }
type ExternalPromotionRel = ResourceRel & { type: ExternalPromotionType }
type FixedAmountPromotionRel = ResourceRel & { type: FixedAmountPromotionType }
type CouponRel = ResourceRel & { type: CouponType }


interface CouponCodesPromotionRule extends Resource {
	
	readonly type: CouponCodesPromotionRuleType


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


class CouponCodesPromotionRules extends ApiResource<CouponCodesPromotionRule> {

	static readonly TYPE: CouponCodesPromotionRuleType = 'coupon_codes_promotion_rules' as const

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CouponCodesPromotionRule>> {
		return this.resources.list<CouponCodesPromotionRule>({ type: CouponCodesPromotionRules.TYPE }, params, options)
	}

	async create(resource: CouponCodesPromotionRuleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		return this.resources.create<CouponCodesPromotionRuleCreate, CouponCodesPromotionRule>({ ...resource, type: CouponCodesPromotionRules.TYPE }, params, options)
	}

	async update(resource: CouponCodesPromotionRuleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		return this.resources.update<CouponCodesPromotionRuleUpdate, CouponCodesPromotionRule>({ ...resource, type: CouponCodesPromotionRules.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: CouponCodesPromotionRules.TYPE } : id, options)
	}

	async coupons(couponCodesPromotionRuleId: string | CouponCodesPromotionRule, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _couponCodesPromotionRuleId = (couponCodesPromotionRuleId as CouponCodesPromotionRule).id || couponCodesPromotionRuleId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `coupon_codes_promotion_rules/${_couponCodesPromotionRuleId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}


	isCouponCodesPromotionRule(resource: any): resource is CouponCodesPromotionRule {
		return resource.type && (resource.type === CouponCodesPromotionRules.TYPE)
	}


	relationship(id: string | ResourceId | null): CouponCodesPromotionRuleRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: CouponCodesPromotionRules.TYPE } : { id: id.id, type: CouponCodesPromotionRules.TYPE }
	}


	type(): CouponCodesPromotionRuleType {
		return CouponCodesPromotionRules.TYPE
	}

}


export default CouponCodesPromotionRules

export type { CouponCodesPromotionRule, CouponCodesPromotionRuleCreate, CouponCodesPromotionRuleUpdate, CouponCodesPromotionRuleType }
