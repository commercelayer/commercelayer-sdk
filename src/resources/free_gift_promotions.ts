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


type FreeGiftPromotionType = 'free_gift_promotions'
type FreeGiftPromotionRel = ResourceRel & { type: FreeGiftPromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type CustomPromotionRuleRel = ResourceRel & { type: CustomPromotionRuleType }
type SkuListRel = ResourceRel & { type: SkuListType }
type TagRel = ResourceRel & { type: TagType }


export type FreeGiftPromotionSort = Pick<FreeGiftPromotion, 'id' | 'name' | 'currency_code' | 'exclusive' | 'priority' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'disabled_at'> & ResourceSort
// export type FreeGiftPromotionFilter = Pick<FreeGiftPromotion, 'id' | 'name' | 'currency_code' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'disabled_at'> & ResourceFilter


interface FreeGiftPromotion extends Resource {
	
	readonly type: FreeGiftPromotionType

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
	 * The max quantity of free gifts globally applicable by the promotion..
	 * @example ```"3"```
	 */
	max_quantity?: Nullable<number>

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


interface FreeGiftPromotionCreate extends ResourceCreate {
	
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
	 * The max quantity of free gifts globally applicable by the promotion..
	 * @example ```"3"```
	 */
	max_quantity?: Nullable<number>

	market?: Nullable<MarketRel>
	order_amount_promotion_rule?: Nullable<OrderAmountPromotionRuleRel>
	sku_list_promotion_rule?: Nullable<SkuListPromotionRuleRel>
	coupon_codes_promotion_rule?: Nullable<CouponCodesPromotionRuleRel>
	custom_promotion_rule?: Nullable<CustomPromotionRuleRel>
	sku_list: SkuListRel
	tags?: Nullable<TagRel[]>

}


interface FreeGiftPromotionUpdate extends ResourceUpdate {
	
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
	 * The max quantity of free gifts globally applicable by the promotion..
	 * @example ```"3"```
	 */
	max_quantity?: Nullable<number>

	market?: Nullable<MarketRel>
	order_amount_promotion_rule?: Nullable<OrderAmountPromotionRuleRel>
	sku_list_promotion_rule?: Nullable<SkuListPromotionRuleRel>
	coupon_codes_promotion_rule?: Nullable<CouponCodesPromotionRuleRel>
	custom_promotion_rule?: Nullable<CustomPromotionRuleRel>
	sku_list?: Nullable<SkuListRel>
	tags?: Nullable<TagRel[]>

}


class FreeGiftPromotions extends ApiResource<FreeGiftPromotion> {

	static readonly TYPE: FreeGiftPromotionType = 'free_gift_promotions' as const

	async create(resource: FreeGiftPromotionCreate, params?: QueryParamsRetrieve<FreeGiftPromotion>, options?: ResourcesConfig): Promise<FreeGiftPromotion> {
		return this.resources.create<FreeGiftPromotionCreate, FreeGiftPromotion>({ ...resource, type: FreeGiftPromotions.TYPE }, params, options)
	}

	async update(resource: FreeGiftPromotionUpdate, params?: QueryParamsRetrieve<FreeGiftPromotion>, options?: ResourcesConfig): Promise<FreeGiftPromotion> {
		return this.resources.update<FreeGiftPromotionUpdate, FreeGiftPromotion>({ ...resource, type: FreeGiftPromotions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: FreeGiftPromotions.TYPE } : id, options)
	}

	async market(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `free_gift_promotions/${_freeGiftPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsRetrieve<OrderAmountPromotionRule>, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `free_gift_promotions/${_freeGiftPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsRetrieve<SkuListPromotionRule>, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `free_gift_promotions/${_freeGiftPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsRetrieve<CouponCodesPromotionRule>, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `free_gift_promotions/${_freeGiftPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async custom_promotion_rule(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsRetrieve<CustomPromotionRule>, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<CustomPromotionRule>({ type: 'custom_promotion_rules' }, `free_gift_promotions/${_freeGiftPromotionId}/custom_promotion_rule`, params, options) as unknown as CustomPromotionRule
	}

	async sku_list(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsRetrieve<SkuList>, options?: ResourcesConfig): Promise<SkuList> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `free_gift_promotions/${_freeGiftPromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async coupons(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsList<Coupon>, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `free_gift_promotions/${_freeGiftPromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}

	async attachments(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `free_gift_promotions/${_freeGiftPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `free_gift_promotions/${_freeGiftPromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `free_gift_promotions/${_freeGiftPromotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `free_gift_promotions/${_freeGiftPromotionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async skus(freeGiftPromotionId: string | FreeGiftPromotion, params?: QueryParamsList<Sku>, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _freeGiftPromotionId = (freeGiftPromotionId as FreeGiftPromotion).id || freeGiftPromotionId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `free_gift_promotions/${_freeGiftPromotionId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async _disable(id: string | FreeGiftPromotion, params?: QueryParamsRetrieve<FreeGiftPromotion>, options?: ResourcesConfig): Promise<FreeGiftPromotion> {
		return this.resources.update<FreeGiftPromotionUpdate, FreeGiftPromotion>({ id: (typeof id === 'string')? id: id.id, type: FreeGiftPromotions.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | FreeGiftPromotion, params?: QueryParamsRetrieve<FreeGiftPromotion>, options?: ResourcesConfig): Promise<FreeGiftPromotion> {
		return this.resources.update<FreeGiftPromotionUpdate, FreeGiftPromotion>({ id: (typeof id === 'string')? id: id.id, type: FreeGiftPromotions.TYPE, _enable: true }, params, options)
	}


	isFreeGiftPromotion(resource: any): resource is FreeGiftPromotion {
		return resource.type && (resource.type === FreeGiftPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): FreeGiftPromotionRel {
		return super.relationshipOneToOne<FreeGiftPromotionRel>(id)
	}

	relationshipToMany(...ids: string[]): FreeGiftPromotionRel[] {
		return super.relationshipOneToMany<FreeGiftPromotionRel>(...ids)
	}


	type(): FreeGiftPromotionType {
		return FreeGiftPromotions.TYPE
	}

}


export default FreeGiftPromotions

export type { FreeGiftPromotion, FreeGiftPromotionCreate, FreeGiftPromotionUpdate, FreeGiftPromotionType }
