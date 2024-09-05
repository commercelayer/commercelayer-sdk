import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Attachment } from './attachments'
import type { CouponCodesPromotionRule, CouponCodesPromotionRuleType } from './coupon_codes_promotion_rules'
import type { Coupon } from './coupons'
import type { CustomPromotionRule, CustomPromotionRuleType } from './custom_promotion_rules'
import type { Event } from './events'
import type { Market, MarketType } from './markets'
import type { OrderAmountPromotionRule, OrderAmountPromotionRuleType } from './order_amount_promotion_rules'
import type { SkuList, SkuListType } from './sku_lists'
import type { SkuListPromotionRule, SkuListPromotionRuleType } from './sku_list_promotion_rules'
import type { Sku } from './skus'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'
import type { PromotionRule } from './promotion_rules'


type PercentageDiscountPromotionType = 'percentage_discount_promotions'
type PercentageDiscountPromotionRel = ResourceRel & { type: PercentageDiscountPromotionType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type CustomPromotionRuleRel = ResourceRel & { type: CustomPromotionRuleType }
type MarketRel = ResourceRel & { type: MarketType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListRel = ResourceRel & { type: SkuListType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type TagRel = ResourceRel & { type: TagType }


export type PercentageDiscountPromotionSort = Pick<PercentageDiscountPromotion, 'id' | 'currency_code' | 'disabled_at' | 'exclusive' | 'expires_at' | 'name' | 'priority' | 'starts_at' | 'total_usage_count' | 'total_usage_limit'> & ResourceSort
// export type PercentageDiscountPromotionFilter = Pick<PercentageDiscountPromotion, 'id' | 'currency_code' | 'disabled_at' | 'expires_at' | 'name' | 'priority' | 'starts_at' | 'total_usage_count' | 'total_usage_limit'> & ResourceFilter


interface PercentageDiscountPromotion extends Resource {
	
	readonly type: PercentageDiscountPromotionType

	/** 
	 * Indicates if the promotion is active (enabled and not expired).
	 * @example ```"true"```
	 */
	active?: boolean | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * Time at which this resource was disabled.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	disabled_at?: string | null
	/** 
	 * Indicates if the promotion will be applied exclusively, based on its priority score.
	 * @example ```"true"```
	 */
	exclusive?: boolean | null
	/** 
	 * The expiration date/time of this promotion (must be after starts_at).
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at: string
	/** 
	 * The promotion's internal name.
	 * @example ```"Personal promotion"```
	 */
	name: string
	/** 
	 * The discount percentage to be applied.
	 * @example ```"10"```
	 */
	percentage: number
	/** 
	 * The priority assigned to the promotion (lower means higher priority).
	 * @example ```"2"```
	 */
	priority?: number | null
	/** 
	 * The activation date/time of this promotion.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	starts_at: string
	/** 
	 * The promotion status. One of 'disabled', 'expired', 'pending', 'active', or 'inactive'.
	 * @example ```"pending"```
	 */
	status?: 'disabled' | 'expired' | 'pending' | 'active' | 'inactive' | null
	/** 
	 * The number of times this promotion has been applied.
	 * @example ```"2"```
	 */
	total_usage_count?: number | null
	/** 
	 * The total number of times this promotion can be applied. When 'null' it means promotion can be applied infinite times.
	 * @example ```"5"```
	 */
	total_usage_limit?: number | null

	attachments?: Attachment[] | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRule | null
	coupons?: Coupon[] | null
	custom_promotion_rule?: CustomPromotionRule | null
	events?: Event[] | null
	market?: Market | null
	order_amount_promotion_rule?: OrderAmountPromotionRule | null
	promotion_rules?: PromotionRule[] | null
	sku_list?: SkuList | null
	sku_list_promotion_rule?: SkuListPromotionRule | null
	skus?: Sku[] | null
	tags?: Tag[] | null
	versions?: Version[] | null

}


interface PercentageDiscountPromotionCreate extends ResourceCreate {
	
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```"true"```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```"true"```
	 */
	_enable?: boolean | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * Indicates if the promotion will be applied exclusively, based on its priority score.
	 * @example ```"true"```
	 */
	exclusive?: boolean | null
	/** 
	 * The expiration date/time of this promotion (must be after starts_at).
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at: string
	/** 
	 * The promotion's internal name.
	 * @example ```"Personal promotion"```
	 */
	name: string
	/** 
	 * The discount percentage to be applied.
	 * @example ```"10"```
	 */
	percentage: number
	/** 
	 * The priority assigned to the promotion (lower means higher priority).
	 * @example ```"2"```
	 */
	priority?: number | null
	/** 
	 * The activation date/time of this promotion.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	starts_at: string
	/** 
	 * The total number of times this promotion can be applied. When 'null' it means promotion can be applied infinite times.
	 * @example ```"5"```
	 */
	total_usage_limit?: number | null

	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	custom_promotion_rule?: CustomPromotionRuleRel | null
	market?: MarketRel | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list?: SkuListRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	tags?: TagRel[] | null

}


interface PercentageDiscountPromotionUpdate extends ResourceUpdate {
	
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```"true"```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```"true"```
	 */
	_enable?: boolean | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * Indicates if the promotion will be applied exclusively, based on its priority score.
	 * @example ```"true"```
	 */
	exclusive?: boolean | null
	/** 
	 * The expiration date/time of this promotion (must be after starts_at).
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at?: string | null
	/** 
	 * The promotion's internal name.
	 * @example ```"Personal promotion"```
	 */
	name?: string | null
	/** 
	 * The discount percentage to be applied.
	 * @example ```"10"```
	 */
	percentage?: number | null
	/** 
	 * The priority assigned to the promotion (lower means higher priority).
	 * @example ```"2"```
	 */
	priority?: number | null
	/** 
	 * The activation date/time of this promotion.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	starts_at?: string | null
	/** 
	 * The total number of times this promotion can be applied. When 'null' it means promotion can be applied infinite times.
	 * @example ```"5"```
	 */
	total_usage_limit?: number | null

	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	custom_promotion_rule?: CustomPromotionRuleRel | null
	market?: MarketRel | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list?: SkuListRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	tags?: TagRel[] | null

}


class PercentageDiscountPromotions extends ApiResource<PercentageDiscountPromotion> {

	static readonly TYPE: PercentageDiscountPromotionType = 'percentage_discount_promotions' as const

	async create(resource: PercentageDiscountPromotionCreate, params?: QueryParamsRetrieve<PercentageDiscountPromotion>, options?: ResourcesConfig): Promise<PercentageDiscountPromotion> {
		return this.resources.create<PercentageDiscountPromotionCreate, PercentageDiscountPromotion>({ ...resource, type: PercentageDiscountPromotions.TYPE }, params, options)
	}

	async update(resource: PercentageDiscountPromotionUpdate, params?: QueryParamsRetrieve<PercentageDiscountPromotion>, options?: ResourcesConfig): Promise<PercentageDiscountPromotion> {
		return this.resources.update<PercentageDiscountPromotionUpdate, PercentageDiscountPromotion>({ ...resource, type: PercentageDiscountPromotions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: PercentageDiscountPromotions.TYPE } : id, options)
	}

	async attachments(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async coupon_codes_promotion_rule(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve<CouponCodesPromotionRule>, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async coupons(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList<Coupon>, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}

	async custom_promotion_rule(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve<CustomPromotionRule>, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<CustomPromotionRule>({ type: 'custom_promotion_rules' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/custom_promotion_rule`, params, options) as unknown as CustomPromotionRule
	}

	async events(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async market(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve<OrderAmountPromotionRule>, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve<SkuList>, options?: ResourcesConfig): Promise<SkuList> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async sku_list_promotion_rule(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve<SkuListPromotionRule>, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async skus(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList<Sku>, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async tags(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _disable(id: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve<PercentageDiscountPromotion>, options?: ResourcesConfig): Promise<PercentageDiscountPromotion> {
		return this.resources.update<PercentageDiscountPromotionUpdate, PercentageDiscountPromotion>({ id: (typeof id === 'string')? id: id.id, type: PercentageDiscountPromotions.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve<PercentageDiscountPromotion>, options?: ResourcesConfig): Promise<PercentageDiscountPromotion> {
		return this.resources.update<PercentageDiscountPromotionUpdate, PercentageDiscountPromotion>({ id: (typeof id === 'string')? id: id.id, type: PercentageDiscountPromotions.TYPE, _enable: true }, params, options)
	}


	isPercentageDiscountPromotion(resource: any): resource is PercentageDiscountPromotion {
		return resource.type && (resource.type === PercentageDiscountPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): PercentageDiscountPromotionRel {
		return super.relationshipOneToOne<PercentageDiscountPromotionRel>(id)
	}

	relationshipToMany(...ids: string[]): PercentageDiscountPromotionRel[] {
		return super.relationshipOneToMany<PercentageDiscountPromotionRel>(...ids)
	}


	type(): PercentageDiscountPromotionType {
		return PercentageDiscountPromotions.TYPE
	}

}


export default PercentageDiscountPromotions

export type { PercentageDiscountPromotion, PercentageDiscountPromotionCreate, PercentageDiscountPromotionUpdate, PercentageDiscountPromotionType }
