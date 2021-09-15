/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { CouponCodesPromotionRule } from './coupon_codes_promotion_rules'


type CouponRel = ResourceId & { type: typeof Coupons.TYPE }
type CouponCodesPromotionRuleRel = ResourceId & { type: 'coupon_codes_promotion_rules' }


interface Coupon extends Resource {
	
	code?: string
	usage_limit?: number
	usage_count?: number

	promotion_rule?: CouponCodesPromotionRule

}


interface CouponCreate extends ResourceCreate {
	
	code: string
	usage_limit: number

	promotion_rule?: CouponCodesPromotionRuleRel

}


interface CouponUpdate extends ResourceUpdate {
	
	code?: string
	usage_limit?: number

	promotion_rule?: CouponCodesPromotionRuleRel

}


class Coupons extends ApiResource {

	static readonly TYPE: 'coupons' = 'coupons'
	// static readonly PATH = 'coupons'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		return this.resources.list({ type: Coupons.TYPE }, params, options)
	}

	async create(resource: CouponCreate, options?: ResourcesConfig): Promise<Coupon> {
		return this.resources.create(Object.assign(resource, { type: Coupons.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Coupon> {
		return this.resources.retrieve<Coupon>({ type: Coupons.TYPE, id }, params, options)
	}

	async update(resource: CouponUpdate, options?: ResourcesConfig): Promise<Coupon> {
		return this.resources.update({ ...resource, type: Coupons.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Coupons.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCoupon(resource: any): resource is Coupon {
		return resource.type && (resource.type === Coupons.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Coupons.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Coupons.TYPE)
	}
	*/

	relationship(id: string | ResourceId): CouponRel {
		return (typeof id === 'string') ? { id, type: Coupons.TYPE } : {id: id.id, type: Coupons.TYPE }
	}

}


export default Coupons

export { Coupon, CouponCreate, CouponUpdate }
