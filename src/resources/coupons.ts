import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { CouponCodesPromotionRule } from './coupon_codes_promotion_rules'


type CouponRel = ResourceRel & { type: typeof Coupons.TYPE }
type CouponCodesPromotionRuleRel = ResourceRel & { type: 'coupon_codes_promotion_rules' }


interface Coupon extends Resource {
	
	code?: string
	customer_single_use?: boolean
	usage_limit?: number
	usage_count?: number
	recipient_email?: string

	promotion_rule?: CouponCodesPromotionRule

}


interface CouponCreate extends ResourceCreate {
	
	code: string
	customer_single_use?: boolean
	usage_limit: number
	recipient_email?: string

	promotion_rule: CouponCodesPromotionRuleRel

}


interface CouponUpdate extends ResourceUpdate {
	
	code?: string
	customer_single_use?: boolean
	usage_limit?: number
	recipient_email?: string

	promotion_rule?: CouponCodesPromotionRuleRel

}


class Coupons extends ApiResource {

	static readonly TYPE: 'coupons' = 'coupons' as const
	// static readonly PATH = 'coupons'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		return this.resources.list<Coupon>({ type: Coupons.TYPE }, params, options)
	}

	async create(resource: CouponCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Coupon> {
		return this.resources.create<CouponCreate, Coupon>({ ...resource, type: Coupons.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Coupon> {
		return this.resources.retrieve<Coupon>({ type: Coupons.TYPE, id }, params, options)
	}

	async update(resource: CouponUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Coupon> {
		return this.resources.update<CouponUpdate, Coupon>({ ...resource, type: Coupons.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Coupons.TYPE, id }, options)
	}

	async promotion_rule(couponId: string | Coupon, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _couponId = (couponId as Coupon).id || couponId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `coupons/${_couponId}/promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCoupon(resource: any): resource is Coupon {
		return resource.type && (resource.type === Coupons.TYPE)
	}


	relationship(id: string | ResourceId | null): CouponRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Coupons.TYPE } : { id: id.id, type: Coupons.TYPE }
	}


	type(): string {
		return Coupons.TYPE
	}

}


export default Coupons

export { Coupon, CouponCreate, CouponUpdate }
