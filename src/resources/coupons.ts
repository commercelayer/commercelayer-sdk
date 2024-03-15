import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { CouponCodesPromotionRule, CouponCodesPromotionRuleType } from './coupon_codes_promotion_rules'
import type { CouponRecipient, CouponRecipientType } from './coupon_recipients'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'


type CouponType = 'coupons'
type CouponRel = ResourceRel & { type: CouponType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type CouponRecipientRel = ResourceRel & { type: CouponRecipientType }
type TagRel = ResourceRel & { type: TagType }


interface Coupon extends Resource {
	
	readonly type: CouponType

	code: string
	customer_single_use?: boolean | null
	usage_limit?: number | null
	usage_count?: number | null
	recipient_email?: string | null
	expires_at?: string | null

	promotion_rule?: CouponCodesPromotionRule | null
	coupon_recipient?: CouponRecipient | null
	events?: Event[] | null
	tags?: Tag[] | null
	versions?: Version[] | null

}


interface CouponCreate extends ResourceCreate {
	
	code: string
	customer_single_use?: boolean | null
	usage_limit?: number | null
	recipient_email?: string | null
	expires_at?: string | null

	promotion_rule: CouponCodesPromotionRuleRel
	coupon_recipient?: CouponRecipientRel | null
	tags?: TagRel[] | null

}


interface CouponUpdate extends ResourceUpdate {
	
	code?: string | null
	customer_single_use?: boolean | null
	usage_limit?: number | null
	recipient_email?: string | null
	expires_at?: string | null

	promotion_rule?: CouponCodesPromotionRuleRel | null
	coupon_recipient?: CouponRecipientRel | null
	tags?: TagRel[] | null

}


class Coupons extends ApiResource<Coupon> {

	static readonly TYPE: CouponType = 'coupons' as const

	async create(resource: CouponCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Coupon> {
		return this.resources.create<CouponCreate, Coupon>({ ...resource, type: Coupons.TYPE }, params, options)
	}

	async update(resource: CouponUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Coupon> {
		return this.resources.update<CouponUpdate, Coupon>({ ...resource, type: Coupons.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Coupons.TYPE } : id, options)
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


	isCoupon(resource: any): resource is Coupon {
		return resource.type && (resource.type === Coupons.TYPE)
	}


	relationship(id: string | ResourceId | null): CouponRel {
		return super.relationshipOneToOne<CouponRel>(id)
	}

	relationshipToMany(...ids: string[]): CouponRel[] {
		return super.relationshipOneToMany<CouponRel>(...ids)
	}


	type(): CouponType {
		return Coupons.TYPE
	}

}


export default Coupons

export type { Coupon, CouponCreate, CouponUpdate, CouponType }
