import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { PromotionRule } from './promotion_rules'
import type { OrderAmountPromotionRule, OrderAmountPromotionRuleType } from './order_amount_promotion_rules'
import type { SkuListPromotionRule, SkuListPromotionRuleType } from './sku_list_promotion_rules'
import type { CouponCodesPromotionRule, CouponCodesPromotionRuleType } from './coupon_codes_promotion_rules'
import type { CustomPromotionRule, CustomPromotionRuleType } from './custom_promotion_rules'
import type { SkuList, SkuListType } from './sku_lists'
import type { Coupon } from './coupons'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'
import type { Sku } from './skus'


type FixedAmountPromotionType = 'fixed_amount_promotions'
type FixedAmountPromotionRel = ResourceRel & { type: FixedAmountPromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type CustomPromotionRuleRel = ResourceRel & { type: CustomPromotionRuleType }
type SkuListRel = ResourceRel & { type: SkuListType }
type TagRel = ResourceRel & { type: TagType }


export type FixedAmountPromotionSort = Pick<FixedAmountPromotion, 'id' | 'name' | 'currency_code' | 'exclusive' | 'priority' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'disabled_at'> & ResourceSort
// export type FixedAmountPromotionFilter = Pick<FixedAmountPromotion, 'id' | 'name' | 'currency_code' | 'priority' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'disabled_at'> & ResourceFilter


interface FixedAmountPromotion extends Resource {
	
	readonly type: FixedAmountPromotionType

	/** 
	 * The promotion's internal name..
	 * @example ```"Personal promotion"```
	 */
	name: string
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard..
	 * @example ```"EUR"```
	 */
	currency_code?: Nullable<string>
	/** 
	 * Indicates if the promotion will be applied exclusively, based on its priority score..
	 * @example ```"true"```
	 */
	exclusive?: Nullable<boolean>
	/** 
	 * The priority assigned to the promotion (lower means higher priority)..
	 * @example ```"2"```
	 */
	priority?: Nullable<number>
	/** 
	 * The activation date/time of this promotion..
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	starts_at: string
	/** 
	 * The expiration date/time of this promotion (must be after starts_at)..
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at: string
	/** 
	 * The total number of times this promotion can be applied. When 'null' it means promotion can be applied infinite times..
	 * @example ```"5"```
	 */
	total_usage_limit?: Nullable<number>
	/** 
	 * The number of times this promotion has been applied..
	 * @example ```"2"```
	 */
	total_usage_count?: Nullable<number>
	/** 
	 * Indicates if the promotion is active (enabled and not expired)..
	 * @example ```"true"```
	 */
	active?: Nullable<boolean>
	/** 
	 * Time at which this resource was disabled..
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	disabled_at?: Nullable<string>
	/** 
	 * The discount fixed amount to be applied, in cents.
	 * @example ```"1000"```
	 */
	fixed_amount_cents: number
	/** 
	 * The discount fixed amount to be applied, float..
	 * @example ```"10"```
	 */
	fixed_amount_float?: Nullable<number>
	/** 
	 * The discount fixed amount to be applied, formatted..
	 * @example ```"€10,00"```
	 */
	formatted_fixed_amount?: Nullable<string>

	market?: Nullable<Market>
	promotion_rules?: Nullable<PromotionRule[]>
	order_amount_promotion_rule?: Nullable<OrderAmountPromotionRule>
	sku_list_promotion_rule?: Nullable<SkuListPromotionRule>
	coupon_codes_promotion_rule?: Nullable<CouponCodesPromotionRule>
	custom_promotion_rule?: Nullable<CustomPromotionRule>
	sku_list?: Nullable<SkuList>
	coupons?: Nullable<Coupon[]>
	attachments?: Nullable<Attachment[]>
	events?: Nullable<Event[]>
	tags?: Nullable<Tag[]>
	versions?: Nullable<Version[]>
	skus?: Nullable<Sku[]>

}


interface FixedAmountPromotionCreate extends ResourceCreate {
	
	/** 
	 * The promotion's internal name..
	 * @example ```"Personal promotion"```
	 */
	name: string
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard..
	 * @example ```"EUR"```
	 */
	currency_code?: Nullable<string>
	/** 
	 * Indicates if the promotion will be applied exclusively, based on its priority score..
	 * @example ```"true"```
	 */
	exclusive?: Nullable<boolean>
	/** 
	 * The priority assigned to the promotion (lower means higher priority)..
	 * @example ```"2"```
	 */
	priority?: Nullable<number>
	/** 
	 * The activation date/time of this promotion..
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	starts_at: string
	/** 
	 * The expiration date/time of this promotion (must be after starts_at)..
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at: string
	/** 
	 * The total number of times this promotion can be applied. When 'null' it means promotion can be applied infinite times..
	 * @example ```"5"```
	 */
	total_usage_limit?: Nullable<number>
	/** 
	 * Send this attribute if you want to mark this resource as disabled..
	 * @example ```"true"```
	 */
	_disable?: Nullable<boolean>
	/** 
	 * Send this attribute if you want to mark this resource as enabled..
	 * @example ```"true"```
	 */
	_enable?: Nullable<boolean>
	/** 
	 * The discount fixed amount to be applied, in cents.
	 * @example ```"1000"```
	 */
	fixed_amount_cents: number

	market?: Nullable<MarketRel>
	order_amount_promotion_rule?: Nullable<OrderAmountPromotionRuleRel>
	sku_list_promotion_rule?: Nullable<SkuListPromotionRuleRel>
	coupon_codes_promotion_rule?: Nullable<CouponCodesPromotionRuleRel>
	custom_promotion_rule?: Nullable<CustomPromotionRuleRel>
	sku_list?: Nullable<SkuListRel>
	tags?: Nullable<TagRel[]>

}


interface FixedAmountPromotionUpdate extends ResourceUpdate {
	
	/** 
	 * The promotion's internal name..
	 * @example ```"Personal promotion"```
	 */
	name?: Nullable<string>
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard..
	 * @example ```"EUR"```
	 */
	currency_code?: Nullable<string>
	/** 
	 * Indicates if the promotion will be applied exclusively, based on its priority score..
	 * @example ```"true"```
	 */
	exclusive?: Nullable<boolean>
	/** 
	 * The priority assigned to the promotion (lower means higher priority)..
	 * @example ```"2"```
	 */
	priority?: Nullable<number>
	/** 
	 * The activation date/time of this promotion..
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	starts_at?: Nullable<string>
	/** 
	 * The expiration date/time of this promotion (must be after starts_at)..
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at?: Nullable<string>
	/** 
	 * The total number of times this promotion can be applied. When 'null' it means promotion can be applied infinite times..
	 * @example ```"5"```
	 */
	total_usage_limit?: Nullable<number>
	/** 
	 * Send this attribute if you want to mark this resource as disabled..
	 * @example ```"true"```
	 */
	_disable?: Nullable<boolean>
	/** 
	 * Send this attribute if you want to mark this resource as enabled..
	 * @example ```"true"```
	 */
	_enable?: Nullable<boolean>
	/** 
	 * The discount fixed amount to be applied, in cents.
	 * @example ```"1000"```
	 */
	fixed_amount_cents?: Nullable<number>

	market?: Nullable<MarketRel>
	order_amount_promotion_rule?: Nullable<OrderAmountPromotionRuleRel>
	sku_list_promotion_rule?: Nullable<SkuListPromotionRuleRel>
	coupon_codes_promotion_rule?: Nullable<CouponCodesPromotionRuleRel>
	custom_promotion_rule?: Nullable<CustomPromotionRuleRel>
	sku_list?: Nullable<SkuListRel>
	tags?: Nullable<TagRel[]>

}


class FixedAmountPromotions extends ApiResource<FixedAmountPromotion> {

	static readonly TYPE: FixedAmountPromotionType = 'fixed_amount_promotions' as const

	async create(resource: FixedAmountPromotionCreate, params?: QueryParamsRetrieve<FixedAmountPromotion>, options?: ResourcesConfig): Promise<FixedAmountPromotion> {
		return this.resources.create<FixedAmountPromotionCreate, FixedAmountPromotion>({ ...resource, type: FixedAmountPromotions.TYPE }, params, options)
	}

	async update(resource: FixedAmountPromotionUpdate, params?: QueryParamsRetrieve<FixedAmountPromotion>, options?: ResourcesConfig): Promise<FixedAmountPromotion> {
		return this.resources.update<FixedAmountPromotionUpdate, FixedAmountPromotion>({ ...resource, type: FixedAmountPromotions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: FixedAmountPromotions.TYPE } : id, options)
	}

	async market(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsRetrieve<OrderAmountPromotionRule>, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsRetrieve<SkuListPromotionRule>, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsRetrieve<CouponCodesPromotionRule>, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async custom_promotion_rule(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsRetrieve<CustomPromotionRule>, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<CustomPromotionRule>({ type: 'custom_promotion_rules' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/custom_promotion_rule`, params, options) as unknown as CustomPromotionRule
	}

	async sku_list(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsRetrieve<SkuList>, options?: ResourcesConfig): Promise<SkuList> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async coupons(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsList<Coupon>, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}

	async attachments(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async skus(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsList<Sku>, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async _disable(id: string | FixedAmountPromotion, params?: QueryParamsRetrieve<FixedAmountPromotion>, options?: ResourcesConfig): Promise<FixedAmountPromotion> {
		return this.resources.update<FixedAmountPromotionUpdate, FixedAmountPromotion>({ id: (typeof id === 'string')? id: id.id, type: FixedAmountPromotions.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | FixedAmountPromotion, params?: QueryParamsRetrieve<FixedAmountPromotion>, options?: ResourcesConfig): Promise<FixedAmountPromotion> {
		return this.resources.update<FixedAmountPromotionUpdate, FixedAmountPromotion>({ id: (typeof id === 'string')? id: id.id, type: FixedAmountPromotions.TYPE, _enable: true }, params, options)
	}


	isFixedAmountPromotion(resource: any): resource is FixedAmountPromotion {
		return resource.type && (resource.type === FixedAmountPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): FixedAmountPromotionRel {
		return super.relationshipOneToOne<FixedAmountPromotionRel>(id)
	}

	relationshipToMany(...ids: string[]): FixedAmountPromotionRel[] {
		return super.relationshipOneToMany<FixedAmountPromotionRel>(...ids)
	}


	type(): FixedAmountPromotionType {
		return FixedAmountPromotions.TYPE
	}

}


export default FixedAmountPromotions

export type { FixedAmountPromotion, FixedAmountPromotionCreate, FixedAmountPromotionUpdate, FixedAmountPromotionType }
