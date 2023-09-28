import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { CouponCodesPromotionRule } from './coupon_codes_promotion_rules'
import type { CouponRecipient } from './coupon_recipients'
import type { Event } from './events'
import type { Tag } from './tags'
import type { Version } from './versions'


type CouponRel = ResourceRel & { type: typeof Coupons.TYPE }
type CouponCodesPromotionRuleRel = ResourceRel & { type: 'coupon_codes_promotion_rules' }
type CouponRecipientRel = ResourceRel & { type: 'coupon_recipients' }
type TagRel = ResourceRel & { type: 'tags' }


interface Coupon extends Resource {
	
	code?: string
	customer_single_use?: boolean
	usage_limit?: number
	usage_count?: number
	recipient_email?: string
	expires_at?: string

	promotion_rule?: CouponCodesPromotionRule
	coupon_recipient?: CouponRecipient
	events?: Event[]
	tags?: Tag[]
	versions?: Version[]

}


interface CouponCreate extends ResourceCreate {
	
	code: string
	customer_single_use?: boolean
	usage_limit?: number
	recipient_email?: string
	expires_at?: string

	promotion_rule: CouponCodesPromotionRuleRel
	coupon_recipient?: CouponRecipientRel
	tags?: TagRel[]

}


interface CouponUpdate extends ResourceUpdate {
	
	code?: string
	customer_single_use?: boolean
	usage_limit?: number
	recipient_email?: string
	expires_at?: string

	promotion_rule?: CouponCodesPromotionRuleRel
	coupon_recipient?: CouponRecipientRel
	tags?: TagRel[]

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

	async coupon_recipient(couponId: string | Coupon, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponRecipient> {
		const _couponId = (couponId as Coupon).id || couponId as string
		return this.resources.fetch<CouponRecipient>({ type: 'coupon_recipients' }, `coupons/${_couponId}/coupon_recipient`, params, options) as unknown as CouponRecipient
	}

	async events(couponId: string | Coupon, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _couponId = (couponId as Coupon).id || couponId as string
		return this.resources.fetch<Event>({ type: 'events' }, `coupons/${_couponId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(couponId: string | Coupon, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _couponId = (couponId as Coupon).id || couponId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `coupons/${_couponId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(couponId: string | Coupon, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _couponId = (couponId as Coupon).id || couponId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `coupons/${_couponId}/versions`, params, options) as unknown as ListResponse<Version>
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
