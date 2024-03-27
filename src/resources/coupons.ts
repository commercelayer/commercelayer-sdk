import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { CouponCodesPromotionRule, CouponCodesPromotionRuleType, CouponCodesPromotionRuleSortable } from './coupon_codes_promotion_rules'
import type { CouponRecipient, CouponRecipientType, CouponRecipientSortable } from './coupon_recipients'
import type { Event, EventSortable } from './events'
import type { Tag, TagType, TagSortable } from './tags'
import type { Version, VersionSortable } from './versions'


type CouponType = 'coupons'
type CouponRel = ResourceRel & { type: CouponType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type CouponRecipientRel = ResourceRel & { type: CouponRecipientType }
type TagRel = ResourceRel & { type: TagType }


export type CouponSortable = Pick<Coupon, 'id' | 'code' | 'customer_single_use' | 'usage_limit' | 'usage_count' | 'expires_at'> & ResourceSortable
export type CouponFilterable = Pick<Coupon, 'id' | 'code' | 'customer_single_use' | 'usage_limit' | 'usage_count' | 'expires_at'> & ResourceFilterable


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


class Coupons extends ApiResource<Coupon, CouponSortable> {

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
		return this.resources.fetch<CouponCodesPromotionRule, CouponCodesPromotionRuleSortable>({ type: 'coupon_codes_promotion_rules' }, `coupons/${_couponId}/promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async coupon_recipient(couponId: string | Coupon, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponRecipient> {
		const _couponId = (couponId as Coupon).id || couponId as string
		return this.resources.fetch<CouponRecipient, CouponRecipientSortable>({ type: 'coupon_recipients' }, `coupons/${_couponId}/coupon_recipient`, params, options) as unknown as CouponRecipient
	}

	async events(couponId: string | Coupon, params?: QueryParamsList<EventSortable>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _couponId = (couponId as Coupon).id || couponId as string
		return this.resources.fetch<Event, EventSortable>({ type: 'events' }, `coupons/${_couponId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(couponId: string | Coupon, params?: QueryParamsList<TagSortable>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _couponId = (couponId as Coupon).id || couponId as string
		return this.resources.fetch<Tag, TagSortable>({ type: 'tags' }, `coupons/${_couponId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(couponId: string | Coupon, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _couponId = (couponId as Coupon).id || couponId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `coupons/${_couponId}/versions`, params, options) as unknown as ListResponse<Version>
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

/*
export const CouponsClient = (init: ResourceAdapter | ResourcesInitConfig): Coupons => {
	return new Coupons((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
