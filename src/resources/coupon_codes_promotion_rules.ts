/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Promotion } from './promotions'
import { Coupon } from './coupons'


type CouponCodesPromotionRuleRel = ResourceId & { type: typeof CouponCodesPromotionRules.TYPE }
type PromotionRel = ResourceId & { type: 'promotions' }
type CouponRel = ResourceId & { type: 'coupons' }


interface CouponCodesPromotionRule extends Resource {
	
	promotion?: Promotion
	coupons?: Coupon[]

}


interface CouponCodesPromotionRuleCreate extends ResourceCreate {
	
	promotion?: PromotionRel
	coupons?: CouponRel[]

}


interface CouponCodesPromotionRuleUpdate extends ResourceUpdate {
	
	promotion?: PromotionRel
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
		this.resources.delete({ type: CouponCodesPromotionRules.TYPE, id }, options)
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
