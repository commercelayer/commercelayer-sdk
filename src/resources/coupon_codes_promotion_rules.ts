import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Version } from './versions'
import type { Coupon, CouponType } from './coupons'
import type { PercentageDiscountPromotion, PercentageDiscountPromotionType } from './percentage_discount_promotions'
import type { FreeShippingPromotion, FreeShippingPromotionType } from './free_shipping_promotions'
import type { BuyXPayYPromotion, BuyXPayYPromotionType } from './buy_x_pay_y_promotions'
import type { FreeGiftPromotion, FreeGiftPromotionType } from './free_gift_promotions'
import type { FixedPricePromotion, FixedPricePromotionType } from './fixed_price_promotions'
import type { ExternalPromotion, ExternalPromotionType } from './external_promotions'
import type { FixedAmountPromotion, FixedAmountPromotionType } from './fixed_amount_promotions'
import type { FlexPromotion, FlexPromotionType } from './flex_promotions'


type CouponCodesPromotionRuleType = 'coupon_codes_promotion_rules'
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type PercentageDiscountPromotionRel = ResourceRel & { type: PercentageDiscountPromotionType }
type FreeShippingPromotionRel = ResourceRel & { type: FreeShippingPromotionType }
type BuyXPayYPromotionRel = ResourceRel & { type: BuyXPayYPromotionType }
type FreeGiftPromotionRel = ResourceRel & { type: FreeGiftPromotionType }
type FixedPricePromotionRel = ResourceRel & { type: FixedPricePromotionType }
type ExternalPromotionRel = ResourceRel & { type: ExternalPromotionType }
type FixedAmountPromotionRel = ResourceRel & { type: FixedAmountPromotionType }
type FlexPromotionRel = ResourceRel & { type: FlexPromotionType }
type CouponRel = ResourceRel & { type: CouponType }


export type CouponCodesPromotionRuleSort = Pick<CouponCodesPromotionRule, 'id'> & ResourceSort
// export type CouponCodesPromotionRuleFilter = Pick<CouponCodesPromotionRule, 'id'> & ResourceFilter


interface CouponCodesPromotionRule extends Resource {
	
	readonly type: CouponCodesPromotionRuleType


	promotion?: PercentageDiscountPromotion | FreeShippingPromotion | BuyXPayYPromotion | FreeGiftPromotion | FixedPricePromotion | ExternalPromotion | FixedAmountPromotion | FlexPromotion | null
	versions?: Version[] | null
	coupons?: Coupon[] | null

}


interface CouponCodesPromotionRuleCreate extends ResourceCreate {
	
	promotion: PercentageDiscountPromotionRel | FreeShippingPromotionRel | BuyXPayYPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel | FixedAmountPromotionRel | FlexPromotionRel
	coupons?: CouponRel[] | null

}


interface CouponCodesPromotionRuleUpdate extends ResourceUpdate {
	
	promotion?: PercentageDiscountPromotionRel | FreeShippingPromotionRel | BuyXPayYPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel | FixedAmountPromotionRel | FlexPromotionRel | null
	coupons?: CouponRel[] | null

}


class CouponCodesPromotionRules extends ApiResource<CouponCodesPromotionRule> {

	static readonly TYPE: CouponCodesPromotionRuleType = 'coupon_codes_promotion_rules' as const

	async create(resource: CouponCodesPromotionRuleCreate, params?: QueryParamsRetrieve<CouponCodesPromotionRule>, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		return this.resources.create<CouponCodesPromotionRuleCreate, CouponCodesPromotionRule>({ ...resource, type: CouponCodesPromotionRules.TYPE }, params, options)
	}

	async update(resource: CouponCodesPromotionRuleUpdate, params?: QueryParamsRetrieve<CouponCodesPromotionRule>, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		return this.resources.update<CouponCodesPromotionRuleUpdate, CouponCodesPromotionRule>({ ...resource, type: CouponCodesPromotionRules.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: CouponCodesPromotionRules.TYPE } : id, options)
	}

	async versions(couponCodesPromotionRuleId: string | CouponCodesPromotionRule, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _couponCodesPromotionRuleId = (couponCodesPromotionRuleId as CouponCodesPromotionRule).id || couponCodesPromotionRuleId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `coupon_codes_promotion_rules/${_couponCodesPromotionRuleId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async coupons(couponCodesPromotionRuleId: string | CouponCodesPromotionRule, params?: QueryParamsList<Coupon>, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _couponCodesPromotionRuleId = (couponCodesPromotionRuleId as CouponCodesPromotionRule).id || couponCodesPromotionRuleId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `coupon_codes_promotion_rules/${_couponCodesPromotionRuleId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}


	isCouponCodesPromotionRule(resource: any): resource is CouponCodesPromotionRule {
		return resource.type && (resource.type === CouponCodesPromotionRules.TYPE)
	}


	relationship(id: string | ResourceId | null): CouponCodesPromotionRuleRel {
		return super.relationshipOneToOne<CouponCodesPromotionRuleRel>(id)
	}

	relationshipToMany(...ids: string[]): CouponCodesPromotionRuleRel[] {
		return super.relationshipOneToMany<CouponCodesPromotionRuleRel>(...ids)
	}


	type(): CouponCodesPromotionRuleType {
		return CouponCodesPromotionRules.TYPE
	}

}


export default CouponCodesPromotionRules

export type { CouponCodesPromotionRule, CouponCodesPromotionRuleCreate, CouponCodesPromotionRuleUpdate, CouponCodesPromotionRuleType }
