import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
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


export type CouponSort = Pick<Coupon, 'id' | 'code' | 'customer_single_use' | 'usage_limit' | 'usage_count' | 'expires_at'> & ResourceSort
// export type CouponFilter = Pick<Coupon, 'id' | 'code' | 'customer_single_use' | 'usage_limit' | 'usage_count' | 'expires_at'> & ResourceFilter


interface Coupon extends Resource {
	
	readonly type: CouponType

	/** 
	 * The coupon code, that uniquely identifies the coupon within the promotion rule.
	 * @example ```"04371af2-70b3-48d7-8f4e-316b374224c3"```
	 */
	code: string
	/** 
	 * Indicates if the coupon can be used just once per customer.
	 */
	customer_single_use?: boolean | null
	/** 
	 * The total number of times this coupon can be used.
	 * @example ```50```
	 */
	usage_limit?: number | null
	/** 
	 * The number of times this coupon has been used.
	 * @example ```20```
	 */
	usage_count?: number | null
	/** 
	 * The email address of the associated recipient. When creating or updating a coupon, this is a shortcut to find or create the associated recipient by email.
	 * @example ```"john@example.com"```
	 */
	recipient_email?: string | null
	/** 
	 * Time at which the coupon will expire.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	expires_at?: string | null

	promotion_rule?: CouponCodesPromotionRule | null
	coupon_recipient?: CouponRecipient | null
	events?: Event[] | null
	tags?: Tag[] | null
	versions?: Version[] | null

}


interface CouponCreate extends ResourceCreate {
	
	/** 
	 * The coupon code, that uniquely identifies the coupon within the promotion rule.
	 * @example ```"04371af2-70b3-48d7-8f4e-316b374224c3"```
	 */
	code: string
	/** 
	 * Indicates if the coupon can be used just once per customer.
	 */
	customer_single_use?: boolean | null
	/** 
	 * The total number of times this coupon can be used.
	 * @example ```50```
	 */
	usage_limit?: number | null
	/** 
	 * The email address of the associated recipient. When creating or updating a coupon, this is a shortcut to find or create the associated recipient by email.
	 * @example ```"john@example.com"```
	 */
	recipient_email?: string | null
	/** 
	 * Time at which the coupon will expire.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	expires_at?: string | null

	promotion_rule: CouponCodesPromotionRuleRel
	coupon_recipient?: CouponRecipientRel | null
	tags?: TagRel[] | null

}


interface CouponUpdate extends ResourceUpdate {
	
	/** 
	 * The coupon code, that uniquely identifies the coupon within the promotion rule.
	 * @example ```"04371af2-70b3-48d7-8f4e-316b374224c3"```
	 */
	code?: string | null
	/** 
	 * Indicates if the coupon can be used just once per customer.
	 */
	customer_single_use?: boolean | null
	/** 
	 * The total number of times this coupon can be used.
	 * @example ```50```
	 */
	usage_limit?: number | null
	/** 
	 * The email address of the associated recipient. When creating or updating a coupon, this is a shortcut to find or create the associated recipient by email.
	 * @example ```"john@example.com"```
	 */
	recipient_email?: string | null
	/** 
	 * Time at which the coupon will expire.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	expires_at?: string | null

	promotion_rule?: CouponCodesPromotionRuleRel | null
	coupon_recipient?: CouponRecipientRel | null
	tags?: TagRel[] | null

}


class Coupons extends ApiResource<Coupon> {

	static readonly TYPE: CouponType = 'coupons' as const

	async create(resource: CouponCreate, params?: QueryParamsRetrieve<Coupon>, options?: ResourcesConfig): Promise<Coupon> {
		return this.resources.create<CouponCreate, Coupon>({ ...resource, type: Coupons.TYPE }, params, options)
	}

	async update(resource: CouponUpdate, params?: QueryParamsRetrieve<Coupon>, options?: ResourcesConfig): Promise<Coupon> {
		return this.resources.update<CouponUpdate, Coupon>({ ...resource, type: Coupons.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Coupons.TYPE } : id, options)
	}

	async promotion_rule(couponId: string | Coupon, params?: QueryParamsRetrieve<CouponCodesPromotionRule>, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _couponId = (couponId as Coupon).id || couponId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `coupons/${_couponId}/promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async coupon_recipient(couponId: string | Coupon, params?: QueryParamsRetrieve<CouponRecipient>, options?: ResourcesConfig): Promise<CouponRecipient> {
		const _couponId = (couponId as Coupon).id || couponId as string
		return this.resources.fetch<CouponRecipient>({ type: 'coupon_recipients' }, `coupons/${_couponId}/coupon_recipient`, params, options) as unknown as CouponRecipient
	}

	async events(couponId: string | Coupon, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _couponId = (couponId as Coupon).id || couponId as string
		return this.resources.fetch<Event>({ type: 'events' }, `coupons/${_couponId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(couponId: string | Coupon, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _couponId = (couponId as Coupon).id || couponId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `coupons/${_couponId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(couponId: string | Coupon, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
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
