/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { PercentageDiscountPromotion } from './percentage_discount_promotions'
import { FreeShippingPromotion } from './free_shipping_promotions'
import { FixedAmountPromotion } from './fixed_amount_promotions'
import { ExternalPromotion } from './external_promotions'
import { Coupon } from './coupons'


type CouponCodesPromotionRuleRel = ResourceId & { type: typeof CouponCodesPromotionRules.TYPE }
type PercentageDiscountPromotionRel = ResourceId & { type: 'percentage_discount_promotions' }
type FreeShippingPromotionRel = ResourceId & { type: 'free_shipping_promotions' }
type FixedAmountPromotionRel = ResourceId & { type: 'fixed_amount_promotions' }
type ExternalPromotionRel = ResourceId & { type: 'external_promotions' }
type CouponRel = ResourceId & { type: 'coupons' }


interface CouponCodesPromotionRule extends Resource {
	
	promotion?: PercentageDiscountPromotion | FreeShippingPromotion | FixedAmountPromotion | ExternalPromotion
	coupons?: Coupon[]

}


interface CouponCodesPromotionRuleCreate extends ResourceCreate {
	
	promotion?: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FixedAmountPromotionRel | ExternalPromotionRel
	coupons?: CouponRel[]

}


interface CouponCodesPromotionRuleUpdate extends ResourceUpdate {
	
	promotion?: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FixedAmountPromotionRel | ExternalPromotionRel
	coupons?: CouponRel[]

}


class CouponCodesPromotionRules extends ApiResource {

	static readonly TYPE: 'coupon_codes_promotion_rules' = 'coupon_codes_promotion_rules'
	// static readonly PATH = 'coupon_codes_promotion_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CouponCodesPromotionRule>> {
		return this.resources.list({ type: CouponCodesPromotionRules.TYPE }, params, options)
	}

	async create(resource: CouponCodesPromotionRuleCreate, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		return this.resources.create(Object.assign(resource, { type: CouponCodesPromotionRules.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		return this.resources.retrieve<CouponCodesPromotionRule>({ type: CouponCodesPromotionRules.TYPE, id }, params, options)
	}

	async update(resource: CouponCodesPromotionRuleUpdate, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		return this.resources.update({ ...resource, type: CouponCodesPromotionRules.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: CouponCodesPromotionRules.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCouponCodesPromotionRule(resource: any): resource is CouponCodesPromotionRule {
		return resource.type && (resource.type === CouponCodesPromotionRules.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(CouponCodesPromotionRules.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(CouponCodesPromotionRules.TYPE)
	}
	*/

	relationship(id: string | ResourceId): CouponCodesPromotionRuleRel {
		return (typeof id === 'string') ? { id, type: CouponCodesPromotionRules.TYPE } : {id: id.id, type: CouponCodesPromotionRules.TYPE }
	}

}


export default CouponCodesPromotionRules

export { CouponCodesPromotionRule, CouponCodesPromotionRuleCreate, CouponCodesPromotionRuleUpdate }
