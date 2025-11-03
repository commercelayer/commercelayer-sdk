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


type ExternalPromotionType = 'external_promotions'
type ExternalPromotionRel = ResourceRel & { type: ExternalPromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type CustomPromotionRuleRel = ResourceRel & { type: CustomPromotionRuleType }
type SkuListRel = ResourceRel & { type: SkuListType }
type TagRel = ResourceRel & { type: TagType }


export type ExternalPromotionSort = Pick<ExternalPromotion, 'id' | 'name' | 'currency_code' | 'exclusive' | 'priority' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'total_usage_reached' | 'disabled_at' | 'circuit_state' | 'circuit_failure_count'> & ResourceSort
// export type ExternalPromotionFilter = Pick<ExternalPromotion, 'id' | 'name' | 'currency_code' | 'exclusive' | 'priority' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'total_usage_reached' | 'disabled_at' | 'circuit_state' | 'circuit_failure_count'> & ResourceFilter


interface ExternalPromotion extends Resource {
	
	readonly type: ExternalPromotionType

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
	 * The URL to the service that will compute the discount.
	 * @example ```"https://external_promotion.yourbrand.com"```
	 */
	promotion_url: string
	/** 
	 * The circuit breaker state, by default it is 'closed'. It can become 'open' once the number of consecutive failures overlaps the specified threshold, in such case no further calls to the failing callback are made.
	 * @example ```"closed"```
	 */
	circuit_state?: string | null
	/** 
	 * The number of consecutive failures recorded by the circuit breaker associated to this resource, will be reset on first successful call to callback.
	 * @example ```5```
	 */
	circuit_failure_count?: number | null
	/** 
	 * The shared secret used to sign the external request payload.
	 * @example ```"1c0994cc4e996e8c6ee56a2198f66f3c"```
	 */
	shared_secret: string

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


interface ExternalPromotionCreate extends ResourceCreate {
	
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
	 * The URL to the service that will compute the discount.
	 * @example ```"https://external_promotion.yourbrand.com"```
	 */
	promotion_url: string

	market?: MarketRel | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	custom_promotion_rule?: CustomPromotionRuleRel | null
	sku_list?: SkuListRel | null
	tags?: TagRel[] | null

}


interface ExternalPromotionUpdate extends ResourceUpdate {
	
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
	 * The URL to the service that will compute the discount.
	 * @example ```"https://external_promotion.yourbrand.com"```
	 */
	promotion_url?: string | null
	/** 
	 * Send this attribute if you want to reset the circuit breaker associated to this resource to 'closed' state and zero failures count. Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_reset_circuit?: boolean | null

	market?: MarketRel | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	custom_promotion_rule?: CustomPromotionRuleRel | null
	sku_list?: SkuListRel | null
	tags?: TagRel[] | null

}


class ExternalPromotions extends ApiResource<ExternalPromotion> {

	static readonly TYPE: ExternalPromotionType = 'external_promotions' as const

	async create(resource: ExternalPromotionCreate, params?: QueryParamsRetrieve<ExternalPromotion>, options?: ResourcesConfig): Promise<ExternalPromotion> {
		return this.resources.create<ExternalPromotionCreate, ExternalPromotion>({ ...resource, type: ExternalPromotions.TYPE }, params, options)
	}

	async update(resource: ExternalPromotionUpdate, params?: QueryParamsRetrieve<ExternalPromotion>, options?: ResourcesConfig): Promise<ExternalPromotion> {
		return this.resources.update<ExternalPromotionUpdate, ExternalPromotion>({ ...resource, type: ExternalPromotions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ExternalPromotions.TYPE } : id, options)
	}

	async market(externalPromotionId: string | ExternalPromotion, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `external_promotions/${_externalPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(externalPromotionId: string | ExternalPromotion, params?: QueryParamsRetrieve<OrderAmountPromotionRule>, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `external_promotions/${_externalPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(externalPromotionId: string | ExternalPromotion, params?: QueryParamsRetrieve<SkuListPromotionRule>, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `external_promotions/${_externalPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(externalPromotionId: string | ExternalPromotion, params?: QueryParamsRetrieve<CouponCodesPromotionRule>, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `external_promotions/${_externalPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async custom_promotion_rule(externalPromotionId: string | ExternalPromotion, params?: QueryParamsRetrieve<CustomPromotionRule>, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<CustomPromotionRule>({ type: 'custom_promotion_rules' }, `external_promotions/${_externalPromotionId}/custom_promotion_rule`, params, options) as unknown as CustomPromotionRule
	}

	async sku_list(externalPromotionId: string | ExternalPromotion, params?: QueryParamsRetrieve<SkuList>, options?: ResourcesConfig): Promise<SkuList> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `external_promotions/${_externalPromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async coupons(externalPromotionId: string | ExternalPromotion, params?: QueryParamsList<Coupon>, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `external_promotions/${_externalPromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}

	async attachments(externalPromotionId: string | ExternalPromotion, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `external_promotions/${_externalPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(externalPromotionId: string | ExternalPromotion, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `external_promotions/${_externalPromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(externalPromotionId: string | ExternalPromotion, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `external_promotions/${_externalPromotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(externalPromotionId: string | ExternalPromotion, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `external_promotions/${_externalPromotionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async event_stores(externalPromotionId: string | ExternalPromotion, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `external_promotions/${_externalPromotionId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}

	async skus(externalPromotionId: string | ExternalPromotion, params?: QueryParamsList<Sku>, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `external_promotions/${_externalPromotionId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async _disable(id: string | ExternalPromotion, params?: QueryParamsRetrieve<ExternalPromotion>, options?: ResourcesConfig): Promise<ExternalPromotion> {
		return this.resources.update<ExternalPromotionUpdate, ExternalPromotion>({ id: (typeof id === 'string')? id: id.id, type: ExternalPromotions.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | ExternalPromotion, params?: QueryParamsRetrieve<ExternalPromotion>, options?: ResourcesConfig): Promise<ExternalPromotion> {
		return this.resources.update<ExternalPromotionUpdate, ExternalPromotion>({ id: (typeof id === 'string')? id: id.id, type: ExternalPromotions.TYPE, _enable: true }, params, options)
	}

	async _add_tags(id: string | ExternalPromotion, triggerValue: string, params?: QueryParamsRetrieve<ExternalPromotion>, options?: ResourcesConfig): Promise<ExternalPromotion> {
		return this.resources.update<ExternalPromotionUpdate, ExternalPromotion>({ id: (typeof id === 'string')? id: id.id, type: ExternalPromotions.TYPE, _add_tags: triggerValue }, params, options)
	}

	async _remove_tags(id: string | ExternalPromotion, triggerValue: string, params?: QueryParamsRetrieve<ExternalPromotion>, options?: ResourcesConfig): Promise<ExternalPromotion> {
		return this.resources.update<ExternalPromotionUpdate, ExternalPromotion>({ id: (typeof id === 'string')? id: id.id, type: ExternalPromotions.TYPE, _remove_tags: triggerValue }, params, options)
	}

	async _reset_circuit(id: string | ExternalPromotion, params?: QueryParamsRetrieve<ExternalPromotion>, options?: ResourcesConfig): Promise<ExternalPromotion> {
		return this.resources.update<ExternalPromotionUpdate, ExternalPromotion>({ id: (typeof id === 'string')? id: id.id, type: ExternalPromotions.TYPE, _reset_circuit: true }, params, options)
	}


	isExternalPromotion(resource: any): resource is ExternalPromotion {
		return resource.type && (resource.type === ExternalPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): ExternalPromotionRel {
		return super.relationshipOneToOne<ExternalPromotionRel>(id)
	}

	relationshipToMany(...ids: string[]): ExternalPromotionRel[] {
		return super.relationshipOneToMany<ExternalPromotionRel>(...ids)
	}


	type(): ExternalPromotionType {
		return ExternalPromotions.TYPE
	}

}


export default ExternalPromotions

export type { ExternalPromotion, ExternalPromotionCreate, ExternalPromotionUpdate, ExternalPromotionType }
