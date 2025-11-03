import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
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
import type { EventStore } from './event_stores'
import type { Sku } from './skus'
import type { PromotionRule } from './promotion_rules'


type BuyXPayYPromotionType = 'buy_x_pay_y_promotions'
type BuyXPayYPromotionRel = ResourceRel & { type: BuyXPayYPromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type CustomPromotionRuleRel = ResourceRel & { type: CustomPromotionRuleType }
type SkuListRel = ResourceRel & { type: SkuListType }
type TagRel = ResourceRel & { type: TagType }


export type BuyXPayYPromotionSort = Pick<BuyXPayYPromotion, 'id' | 'name' | 'currency_code' | 'exclusive' | 'priority' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'total_usage_reached' | 'disabled_at' | 'x' | 'y'> & ResourceSort
// export type BuyXPayYPromotionFilter = Pick<BuyXPayYPromotion, 'id' | 'name' | 'currency_code' | 'exclusive' | 'priority' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'total_usage_reached' | 'disabled_at' | 'x' | 'y'> & ResourceFilter


interface BuyXPayYPromotion extends Resource {
	
	readonly type: BuyXPayYPromotionType

	/** 
	 * The promotion's internal name.
	 * @example ```"Personal promotion"```
	 */
	name: string
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
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
	 * Indicates if the promotion has been applied the total number of allowed times.
	 */
	total_usage_reached?: boolean | null
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
	 * The weight of the promotion, computed by exclusivity, priority, type and start time. Determines the order of application, higher weight apply first.
	 * @example ```112```
	 */
	weight?: number | null
	/** 
	 * Time at which this resource was disabled.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	disabled_at?: string | null
	/** 
	 * The quantity which defines the threshold for free items (works by multiple of x).
	 * @example ```3```
	 */
	x: number
	/** 
	 * The quantity which defines how many items you get for free, with the formula x-y.
	 * @example ```2```
	 */
	y: number
	/** 
	 * Indicates if the cheapest items are discounted, allowing all of the SKUs in the associated list to be eligible for counting.
	 * @example ```true```
	 */
	cheapest_free?: boolean | null

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
	event_stores?: EventStore[] | null
	skus?: Sku[] | null

}


interface BuyXPayYPromotionCreate extends ResourceCreate {
	
	/** 
	 * The promotion's internal name.
	 * @example ```"Personal promotion"```
	 */
	name: string
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
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
	 * The quantity which defines the threshold for free items (works by multiple of x).
	 * @example ```3```
	 */
	x: number
	/** 
	 * The quantity which defines how many items you get for free, with the formula x-y.
	 * @example ```2```
	 */
	y: number
	/** 
	 * Indicates if the cheapest items are discounted, allowing all of the SKUs in the associated list to be eligible for counting.
	 * @example ```true```
	 */
	cheapest_free?: boolean | null

	market?: MarketRel | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	custom_promotion_rule?: CustomPromotionRuleRel | null
	sku_list: SkuListRel
	tags?: TagRel[] | null

}


interface BuyXPayYPromotionUpdate extends ResourceUpdate {
	
	/** 
	 * The promotion's internal name.
	 * @example ```"Personal promotion"```
	 */
	name?: string | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
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
	/** 
	 * The quantity which defines the threshold for free items (works by multiple of x).
	 * @example ```3```
	 */
	x?: number | null
	/** 
	 * The quantity which defines how many items you get for free, with the formula x-y.
	 * @example ```2```
	 */
	y?: number | null
	/** 
	 * Indicates if the cheapest items are discounted, allowing all of the SKUs in the associated list to be eligible for counting.
	 * @example ```true```
	 */
	cheapest_free?: boolean | null

	market?: MarketRel | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	custom_promotion_rule?: CustomPromotionRuleRel | null
	sku_list?: SkuListRel | null
	tags?: TagRel[] | null

}


class BuyXPayYPromotions extends ApiResource<BuyXPayYPromotion> {

	static readonly TYPE: BuyXPayYPromotionType = 'buy_x_pay_y_promotions' as const

	async create(resource: BuyXPayYPromotionCreate, params?: QueryParamsRetrieve<BuyXPayYPromotion>, options?: ResourcesConfig): Promise<BuyXPayYPromotion> {
		return this.resources.create<BuyXPayYPromotionCreate, BuyXPayYPromotion>({ ...resource, type: BuyXPayYPromotions.TYPE }, params, options)
	}

	async update(resource: BuyXPayYPromotionUpdate, params?: QueryParamsRetrieve<BuyXPayYPromotion>, options?: ResourcesConfig): Promise<BuyXPayYPromotion> {
		return this.resources.update<BuyXPayYPromotionUpdate, BuyXPayYPromotion>({ ...resource, type: BuyXPayYPromotions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: BuyXPayYPromotions.TYPE } : id, options)
	}

	async market(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsRetrieve<OrderAmountPromotionRule>, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsRetrieve<SkuListPromotionRule>, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsRetrieve<CouponCodesPromotionRule>, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async custom_promotion_rule(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsRetrieve<CustomPromotionRule>, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<CustomPromotionRule>({ type: 'custom_promotion_rules' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/custom_promotion_rule`, params, options) as unknown as CustomPromotionRule
	}

	async sku_list(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsRetrieve<SkuList>, options?: ResourcesConfig): Promise<SkuList> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async coupons(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsList<Coupon>, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}

	async attachments(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async event_stores(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}

	async skus(buyXPayYPromotionId: string | BuyXPayYPromotion, params?: QueryParamsList<Sku>, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _buyXPayYPromotionId = (buyXPayYPromotionId as BuyXPayYPromotion).id || buyXPayYPromotionId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `buy_x_pay_y_promotions/${_buyXPayYPromotionId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async _disable(id: string | BuyXPayYPromotion, params?: QueryParamsRetrieve<BuyXPayYPromotion>, options?: ResourcesConfig): Promise<BuyXPayYPromotion> {
		return this.resources.update<BuyXPayYPromotionUpdate, BuyXPayYPromotion>({ id: (typeof id === 'string')? id: id.id, type: BuyXPayYPromotions.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | BuyXPayYPromotion, params?: QueryParamsRetrieve<BuyXPayYPromotion>, options?: ResourcesConfig): Promise<BuyXPayYPromotion> {
		return this.resources.update<BuyXPayYPromotionUpdate, BuyXPayYPromotion>({ id: (typeof id === 'string')? id: id.id, type: BuyXPayYPromotions.TYPE, _enable: true }, params, options)
	}

	async _add_tags(id: string | BuyXPayYPromotion, triggerValue: string, params?: QueryParamsRetrieve<BuyXPayYPromotion>, options?: ResourcesConfig): Promise<BuyXPayYPromotion> {
		return this.resources.update<BuyXPayYPromotionUpdate, BuyXPayYPromotion>({ id: (typeof id === 'string')? id: id.id, type: BuyXPayYPromotions.TYPE, _add_tags: triggerValue }, params, options)
	}

	async _remove_tags(id: string | BuyXPayYPromotion, triggerValue: string, params?: QueryParamsRetrieve<BuyXPayYPromotion>, options?: ResourcesConfig): Promise<BuyXPayYPromotion> {
		return this.resources.update<BuyXPayYPromotionUpdate, BuyXPayYPromotion>({ id: (typeof id === 'string')? id: id.id, type: BuyXPayYPromotions.TYPE, _remove_tags: triggerValue }, params, options)
	}


	isBuyXPayYPromotion(resource: any): resource is BuyXPayYPromotion {
		return resource.type && (resource.type === BuyXPayYPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): BuyXPayYPromotionRel {
		return super.relationshipOneToOne<BuyXPayYPromotionRel>(id)
	}

	relationshipToMany(...ids: string[]): BuyXPayYPromotionRel[] {
		return super.relationshipOneToMany<BuyXPayYPromotionRel>(...ids)
	}


	type(): BuyXPayYPromotionType {
		return BuyXPayYPromotions.TYPE
	}

}


export default BuyXPayYPromotions

export type { BuyXPayYPromotion, BuyXPayYPromotionCreate, BuyXPayYPromotionUpdate, BuyXPayYPromotionType }
