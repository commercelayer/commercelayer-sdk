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


type FreeShippingPromotionType = 'free_shipping_promotions'
type FreeShippingPromotionRel = ResourceRel & { type: FreeShippingPromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type CustomPromotionRuleRel = ResourceRel & { type: CustomPromotionRuleType }
type SkuListRel = ResourceRel & { type: SkuListType }
type TagRel = ResourceRel & { type: TagType }


export type FreeShippingPromotionSort = Pick<FreeShippingPromotion, 'id' | 'name' | 'currency_code' | 'exclusive' | 'priority' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'disabled_at'> & ResourceSort
// export type FreeShippingPromotionFilter = Pick<FreeShippingPromotion, 'id' | 'name' | 'currency_code' | 'priority' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'disabled_at'> & ResourceFilter


interface FreeShippingPromotion extends Resource {
	
	readonly type: FreeShippingPromotionType

	/** 
	 * The promotion's internal name..
	 * @example ```"Personal promotion"```
	 */
	name: string
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard..
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * Indicates if the promotion will be applied exclusively, based on its priority score..
	 * @example ```"true"```
	 */
	exclusive?: boolean | null
	/** 
	 * The priority assigned to the promotion (lower means higher priority)..
	 * @example ```"2"```
	 */
	priority?: number | null
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
	total_usage_limit?: number | null
	/** 
	 * The number of times this promotion has been applied..
	 * @example ```"2"```
	 */
	total_usage_count?: number | null
	/** 
	 * Indicates if the promotion is active (enabled and not expired)..
	 * @example ```"true"```
	 */
	active?: boolean | null
	/** 
	 * The promotion status, one of 'expired', 'pending', 'active', 'inactive', or 'disabled'..
	 * @example ```"pending"```
	 */
	status?: 'expired' | 'pending' | 'active' | 'inactive' | 'disabled' | null
	/** 
	 * Time at which this resource was disabled..
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	disabled_at?: string | null

	market?: Market | null
	promotion_rules?: PromotionRule[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRule | null
	sku_list_promotion_rule?: SkuListPromotionRule | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRule | null
	custom_promotion_rule?: CustomPromotionRule | null
	sku_list?: SkuList | null
	coupons?: Coupon[] | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	tags?: Tag[] | null
	versions?: Version[] | null

}


interface FreeShippingPromotionCreate extends ResourceCreate {
	
	/** 
	 * The promotion's internal name..
	 * @example ```"Personal promotion"```
	 */
	name: string
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard..
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * Indicates if the promotion will be applied exclusively, based on its priority score..
	 * @example ```"true"```
	 */
	exclusive?: boolean | null
	/** 
	 * The priority assigned to the promotion (lower means higher priority)..
	 * @example ```"2"```
	 */
	priority?: number | null
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
	total_usage_limit?: number | null
	/** 
	 * Send this attribute if you want to mark this resource as disabled..
	 * @example ```"true"```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled..
	 * @example ```"true"```
	 */
	_enable?: boolean | null

	market?: MarketRel | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	custom_promotion_rule?: CustomPromotionRuleRel | null
	sku_list?: SkuListRel | null
	tags?: TagRel[] | null

}


interface FreeShippingPromotionUpdate extends ResourceUpdate {
	
	/** 
	 * The promotion's internal name..
	 * @example ```"Personal promotion"```
	 */
	name?: string | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard..
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * Indicates if the promotion will be applied exclusively, based on its priority score..
	 * @example ```"true"```
	 */
	exclusive?: boolean | null
	/** 
	 * The priority assigned to the promotion (lower means higher priority)..
	 * @example ```"2"```
	 */
	priority?: number | null
	/** 
	 * The activation date/time of this promotion..
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	starts_at?: string | null
	/** 
	 * The expiration date/time of this promotion (must be after starts_at)..
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at?: string | null
	/** 
	 * The total number of times this promotion can be applied. When 'null' it means promotion can be applied infinite times..
	 * @example ```"5"```
	 */
	total_usage_limit?: number | null
	/** 
	 * Send this attribute if you want to mark this resource as disabled..
	 * @example ```"true"```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled..
	 * @example ```"true"```
	 */
	_enable?: boolean | null

	market?: MarketRel | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	custom_promotion_rule?: CustomPromotionRuleRel | null
	sku_list?: SkuListRel | null
	tags?: TagRel[] | null

}


class FreeShippingPromotions extends ApiResource<FreeShippingPromotion> {

	static readonly TYPE: FreeShippingPromotionType = 'free_shipping_promotions' as const

	async create(resource: FreeShippingPromotionCreate, params?: QueryParamsRetrieve<FreeShippingPromotion>, options?: ResourcesConfig): Promise<FreeShippingPromotion> {
		return this.resources.create<FreeShippingPromotionCreate, FreeShippingPromotion>({ ...resource, type: FreeShippingPromotions.TYPE }, params, options)
	}

	async update(resource: FreeShippingPromotionUpdate, params?: QueryParamsRetrieve<FreeShippingPromotion>, options?: ResourcesConfig): Promise<FreeShippingPromotion> {
		return this.resources.update<FreeShippingPromotionUpdate, FreeShippingPromotion>({ ...resource, type: FreeShippingPromotions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: FreeShippingPromotions.TYPE } : id, options)
	}

	async market(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `free_shipping_promotions/${_freeShippingPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve<OrderAmountPromotionRule>, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `free_shipping_promotions/${_freeShippingPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve<SkuListPromotionRule>, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `free_shipping_promotions/${_freeShippingPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve<CouponCodesPromotionRule>, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `free_shipping_promotions/${_freeShippingPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async custom_promotion_rule(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve<CustomPromotionRule>, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<CustomPromotionRule>({ type: 'custom_promotion_rules' }, `free_shipping_promotions/${_freeShippingPromotionId}/custom_promotion_rule`, params, options) as unknown as CustomPromotionRule
	}

	async sku_list(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve<SkuList>, options?: ResourcesConfig): Promise<SkuList> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `free_shipping_promotions/${_freeShippingPromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async coupons(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsList<Coupon>, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `free_shipping_promotions/${_freeShippingPromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}

	async attachments(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `free_shipping_promotions/${_freeShippingPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `free_shipping_promotions/${_freeShippingPromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `free_shipping_promotions/${_freeShippingPromotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `free_shipping_promotions/${_freeShippingPromotionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _disable(id: string | FreeShippingPromotion, params?: QueryParamsRetrieve<FreeShippingPromotion>, options?: ResourcesConfig): Promise<FreeShippingPromotion> {
		return this.resources.update<FreeShippingPromotionUpdate, FreeShippingPromotion>({ id: (typeof id === 'string')? id: id.id, type: FreeShippingPromotions.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | FreeShippingPromotion, params?: QueryParamsRetrieve<FreeShippingPromotion>, options?: ResourcesConfig): Promise<FreeShippingPromotion> {
		return this.resources.update<FreeShippingPromotionUpdate, FreeShippingPromotion>({ id: (typeof id === 'string')? id: id.id, type: FreeShippingPromotions.TYPE, _enable: true }, params, options)
	}


	isFreeShippingPromotion(resource: any): resource is FreeShippingPromotion {
		return resource.type && (resource.type === FreeShippingPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): FreeShippingPromotionRel {
		return super.relationshipOneToOne<FreeShippingPromotionRel>(id)
	}

	relationshipToMany(...ids: string[]): FreeShippingPromotionRel[] {
		return super.relationshipOneToMany<FreeShippingPromotionRel>(...ids)
	}


	type(): FreeShippingPromotionType {
		return FreeShippingPromotions.TYPE
	}

}


export default FreeShippingPromotions

export type { FreeShippingPromotion, FreeShippingPromotionCreate, FreeShippingPromotionUpdate, FreeShippingPromotionType }
