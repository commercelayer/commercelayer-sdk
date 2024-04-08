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


type FixedPricePromotionType = 'fixed_price_promotions'
type FixedPricePromotionRel = ResourceRel & { type: FixedPricePromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type CustomPromotionRuleRel = ResourceRel & { type: CustomPromotionRuleType }
type SkuListRel = ResourceRel & { type: SkuListType }
type TagRel = ResourceRel & { type: TagType }


export type FixedPricePromotionSort = Pick<FixedPricePromotion, 'id' | 'name' | 'currency_code' | 'exclusive' | 'priority' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'disabled_at'> & ResourceSort
// export type FixedPricePromotionFilter = Pick<FixedPricePromotion, 'id' | 'name' | 'currency_code' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'disabled_at'> & ResourceFilter


interface FixedPricePromotion extends Resource {
	
	readonly type: FixedPricePromotionType

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
	 * The price fixed amount to be applied on matching SKUs, in cents.
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


interface FixedPricePromotionCreate extends ResourceCreate {
	
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
	 * The price fixed amount to be applied on matching SKUs, in cents.
	 * @example ```"1000"```
	 */
	fixed_amount_cents: number

	market?: Nullable<MarketRel>
	order_amount_promotion_rule?: Nullable<OrderAmountPromotionRuleRel>
	sku_list_promotion_rule?: Nullable<SkuListPromotionRuleRel>
	coupon_codes_promotion_rule?: Nullable<CouponCodesPromotionRuleRel>
	custom_promotion_rule?: Nullable<CustomPromotionRuleRel>
	sku_list: SkuListRel
	tags?: Nullable<TagRel[]>

}


interface FixedPricePromotionUpdate extends ResourceUpdate {
	
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
	 * The price fixed amount to be applied on matching SKUs, in cents.
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


class FixedPricePromotions extends ApiResource<FixedPricePromotion> {

	static readonly TYPE: FixedPricePromotionType = 'fixed_price_promotions' as const

	async create(resource: FixedPricePromotionCreate, params?: QueryParamsRetrieve<FixedPricePromotion>, options?: ResourcesConfig): Promise<FixedPricePromotion> {
		return this.resources.create<FixedPricePromotionCreate, FixedPricePromotion>({ ...resource, type: FixedPricePromotions.TYPE }, params, options)
	}

	async update(resource: FixedPricePromotionUpdate, params?: QueryParamsRetrieve<FixedPricePromotion>, options?: ResourcesConfig): Promise<FixedPricePromotion> {
		return this.resources.update<FixedPricePromotionUpdate, FixedPricePromotion>({ ...resource, type: FixedPricePromotions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: FixedPricePromotions.TYPE } : id, options)
	}

	async market(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `fixed_price_promotions/${_fixedPricePromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsRetrieve<OrderAmountPromotionRule>, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `fixed_price_promotions/${_fixedPricePromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsRetrieve<SkuListPromotionRule>, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `fixed_price_promotions/${_fixedPricePromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsRetrieve<CouponCodesPromotionRule>, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `fixed_price_promotions/${_fixedPricePromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async custom_promotion_rule(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsRetrieve<CustomPromotionRule>, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<CustomPromotionRule>({ type: 'custom_promotion_rules' }, `fixed_price_promotions/${_fixedPricePromotionId}/custom_promotion_rule`, params, options) as unknown as CustomPromotionRule
	}

	async sku_list(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsRetrieve<SkuList>, options?: ResourcesConfig): Promise<SkuList> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `fixed_price_promotions/${_fixedPricePromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async coupons(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsList<Coupon>, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `fixed_price_promotions/${_fixedPricePromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}

	async attachments(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `fixed_price_promotions/${_fixedPricePromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `fixed_price_promotions/${_fixedPricePromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `fixed_price_promotions/${_fixedPricePromotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `fixed_price_promotions/${_fixedPricePromotionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async skus(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsList<Sku>, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `fixed_price_promotions/${_fixedPricePromotionId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async _disable(id: string | FixedPricePromotion, params?: QueryParamsRetrieve<FixedPricePromotion>, options?: ResourcesConfig): Promise<FixedPricePromotion> {
		return this.resources.update<FixedPricePromotionUpdate, FixedPricePromotion>({ id: (typeof id === 'string')? id: id.id, type: FixedPricePromotions.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | FixedPricePromotion, params?: QueryParamsRetrieve<FixedPricePromotion>, options?: ResourcesConfig): Promise<FixedPricePromotion> {
		return this.resources.update<FixedPricePromotionUpdate, FixedPricePromotion>({ id: (typeof id === 'string')? id: id.id, type: FixedPricePromotions.TYPE, _enable: true }, params, options)
	}


	isFixedPricePromotion(resource: any): resource is FixedPricePromotion {
		return resource.type && (resource.type === FixedPricePromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): FixedPricePromotionRel {
		return super.relationshipOneToOne<FixedPricePromotionRel>(id)
	}

	relationshipToMany(...ids: string[]): FixedPricePromotionRel[] {
		return super.relationshipOneToMany<FixedPricePromotionRel>(...ids)
	}


	type(): FixedPricePromotionType {
		return FixedPricePromotions.TYPE
	}

}


export default FixedPricePromotions

export type { FixedPricePromotion, FixedPricePromotionCreate, FixedPricePromotionUpdate, FixedPricePromotionType }
