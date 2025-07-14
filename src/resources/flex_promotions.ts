import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { CouponCodesPromotionRule, CouponCodesPromotionRuleType } from './coupon_codes_promotion_rules'
import type { Coupon } from './coupons'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'


type FlexPromotionType = 'flex_promotions'
type FlexPromotionRel = ResourceRel & { type: FlexPromotionType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type TagRel = ResourceRel & { type: TagType }


export type FlexPromotionSort = Pick<FlexPromotion, 'id' | 'name' | 'exclusive' | 'priority' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'disabled_at'> & ResourceSort
// export type FlexPromotionFilter = Pick<FlexPromotion, 'id' | 'name' | 'exclusive' | 'priority' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'rules' | 'disabled_at'> & ResourceFilter


interface FlexPromotion extends Resource {
	
	readonly type: FlexPromotionType

	/** 
	 * The promotion's internal name.
	 * @example ```"Personal promotion"```
	 */
	name: string
	/** 
	 * Indicates if the promotion will be applied exclusively, based on its priority score.
	 * @example ```true```
	 */
	exclusive?: boolean | null
	/** 
	 * The priority assigned to the promotion (lower means higher priority).
	 * @example ```2```
	 */
	priority?: number | null
	/** 
	 * The activation date/time of this promotion.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	starts_at: string
	/** 
	 * The expiration date/time of this promotion (must be after starts_at).
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at: string
	/** 
	 * The total number of times this promotion can be applied. When 'null' it means promotion can be applied infinite times.
	 * @example ```5```
	 */
	total_usage_limit?: number | null
	/** 
	 * The number of times this promotion has been applied.
	 * @example ```2```
	 */
	total_usage_count?: number | null
	/** 
	 * Indicates if the promotion is active (enabled and not expired).
	 * @example ```true```
	 */
	active?: boolean | null
	/** 
	 * The promotion status. One of 'disabled', 'expired', 'pending', 'active', or 'inactive'.
	 * @example ```"pending"```
	 */
	status?: 'disabled' | 'expired' | 'pending' | 'active' | 'inactive' | null
	/** 
	 * The discount rule to be applied.
	 * @example ```{}```
	 */
	rules: Record<string, any>
	/** 
	 * The rule outcomes.
	 * @example ```[]```
	 */
	rule_outcomes?: Record<string, any> | null
	/** 
	 * Time at which this resource was disabled.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	disabled_at?: string | null
	/** 
	 * The payload used to evaluate the rules.
	 * @example ```{}```
	 */
	resource_payload?: Record<string, any> | null

	coupon_codes_promotion_rule?: CouponCodesPromotionRule | null
	coupons?: Coupon[] | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	tags?: Tag[] | null
	versions?: Version[] | null

}


interface FlexPromotionCreate extends ResourceCreate {
	
	/** 
	 * The promotion's internal name.
	 * @example ```"Personal promotion"```
	 */
	name: string
	/** 
	 * Indicates if the promotion will be applied exclusively, based on its priority score.
	 * @example ```true```
	 */
	exclusive?: boolean | null
	/** 
	 * The priority assigned to the promotion (lower means higher priority).
	 * @example ```2```
	 */
	priority?: number | null
	/** 
	 * The activation date/time of this promotion.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	starts_at: string
	/** 
	 * The expiration date/time of this promotion (must be after starts_at).
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at: string
	/** 
	 * The total number of times this promotion can be applied. When 'null' it means promotion can be applied infinite times.
	 * @example ```5```
	 */
	total_usage_limit?: number | null
	/** 
	 * The discount rule to be applied.
	 * @example ```{}```
	 */
	rules: Record<string, any>
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```true```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```true```
	 */
	_enable?: boolean | null

	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	tags?: TagRel[] | null

}


interface FlexPromotionUpdate extends ResourceUpdate {
	
	/** 
	 * The promotion's internal name.
	 * @example ```"Personal promotion"```
	 */
	name?: string | null
	/** 
	 * Indicates if the promotion will be applied exclusively, based on its priority score.
	 * @example ```true```
	 */
	exclusive?: boolean | null
	/** 
	 * The priority assigned to the promotion (lower means higher priority).
	 * @example ```2```
	 */
	priority?: number | null
	/** 
	 * The activation date/time of this promotion.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	starts_at?: string | null
	/** 
	 * The expiration date/time of this promotion (must be after starts_at).
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at?: string | null
	/** 
	 * The total number of times this promotion can be applied. When 'null' it means promotion can be applied infinite times.
	 * @example ```5```
	 */
	total_usage_limit?: number | null
	/** 
	 * The discount rule to be applied.
	 * @example ```{}```
	 */
	rules?: Record<string, any> | null
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```true```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```true```
	 */
	_enable?: boolean | null
	/** 
	 * Comma separated list of tags to be added. Duplicates, invalid and non existing ones are discarded. Cannot be passed by sales channels.
	 */
	_add_tags?: string | null
	/** 
	 * Comma separated list of tags to be removed. Duplicates, invalid and non existing ones are discarded. Cannot be passed by sales channels.
	 */
	_remove_tags?: string | null

	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	tags?: TagRel[] | null

}


class FlexPromotions extends ApiResource<FlexPromotion> {

	static readonly TYPE: FlexPromotionType = 'flex_promotions' as const

	async create(resource: FlexPromotionCreate, params?: QueryParamsRetrieve<FlexPromotion>, options?: ResourcesConfig): Promise<FlexPromotion> {
		return this.resources.create<FlexPromotionCreate, FlexPromotion>({ ...resource, type: FlexPromotions.TYPE }, params, options)
	}

	async update(resource: FlexPromotionUpdate, params?: QueryParamsRetrieve<FlexPromotion>, options?: ResourcesConfig): Promise<FlexPromotion> {
		return this.resources.update<FlexPromotionUpdate, FlexPromotion>({ ...resource, type: FlexPromotions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: FlexPromotions.TYPE } : id, options)
	}

	async coupon_codes_promotion_rule(flexPromotionId: string | FlexPromotion, params?: QueryParamsRetrieve<CouponCodesPromotionRule>, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _flexPromotionId = (flexPromotionId as FlexPromotion).id || flexPromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `flex_promotions/${_flexPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async coupons(flexPromotionId: string | FlexPromotion, params?: QueryParamsList<Coupon>, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _flexPromotionId = (flexPromotionId as FlexPromotion).id || flexPromotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `flex_promotions/${_flexPromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}

	async attachments(flexPromotionId: string | FlexPromotion, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _flexPromotionId = (flexPromotionId as FlexPromotion).id || flexPromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `flex_promotions/${_flexPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(flexPromotionId: string | FlexPromotion, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _flexPromotionId = (flexPromotionId as FlexPromotion).id || flexPromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `flex_promotions/${_flexPromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(flexPromotionId: string | FlexPromotion, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _flexPromotionId = (flexPromotionId as FlexPromotion).id || flexPromotionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `flex_promotions/${_flexPromotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(flexPromotionId: string | FlexPromotion, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _flexPromotionId = (flexPromotionId as FlexPromotion).id || flexPromotionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `flex_promotions/${_flexPromotionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _disable(id: string | FlexPromotion, params?: QueryParamsRetrieve<FlexPromotion>, options?: ResourcesConfig): Promise<FlexPromotion> {
		return this.resources.update<FlexPromotionUpdate, FlexPromotion>({ id: (typeof id === 'string')? id: id.id, type: FlexPromotions.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | FlexPromotion, params?: QueryParamsRetrieve<FlexPromotion>, options?: ResourcesConfig): Promise<FlexPromotion> {
		return this.resources.update<FlexPromotionUpdate, FlexPromotion>({ id: (typeof id === 'string')? id: id.id, type: FlexPromotions.TYPE, _enable: true }, params, options)
	}

	async _add_tags(id: string | FlexPromotion, triggerValue: string, params?: QueryParamsRetrieve<FlexPromotion>, options?: ResourcesConfig): Promise<FlexPromotion> {
		return this.resources.update<FlexPromotionUpdate, FlexPromotion>({ id: (typeof id === 'string')? id: id.id, type: FlexPromotions.TYPE, _add_tags: triggerValue }, params, options)
	}

	async _remove_tags(id: string | FlexPromotion, triggerValue: string, params?: QueryParamsRetrieve<FlexPromotion>, options?: ResourcesConfig): Promise<FlexPromotion> {
		return this.resources.update<FlexPromotionUpdate, FlexPromotion>({ id: (typeof id === 'string')? id: id.id, type: FlexPromotions.TYPE, _remove_tags: triggerValue }, params, options)
	}


	isFlexPromotion(resource: any): resource is FlexPromotion {
		return resource.type && (resource.type === FlexPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): FlexPromotionRel {
		return super.relationshipOneToOne<FlexPromotionRel>(id)
	}

	relationshipToMany(...ids: string[]): FlexPromotionRel[] {
		return super.relationshipOneToMany<FlexPromotionRel>(...ids)
	}


	type(): FlexPromotionType {
		return FlexPromotions.TYPE
	}

}


const instance = new FlexPromotions()
export default instance

export type { FlexPromotions, FlexPromotion, FlexPromotionCreate, FlexPromotionUpdate, FlexPromotionType }
