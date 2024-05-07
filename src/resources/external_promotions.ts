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


type ExternalPromotionType = 'external_promotions'
type ExternalPromotionRel = ResourceRel & { type: ExternalPromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type CustomPromotionRuleRel = ResourceRel & { type: CustomPromotionRuleType }
type SkuListRel = ResourceRel & { type: SkuListType }
type TagRel = ResourceRel & { type: TagType }


export type ExternalPromotionSort = Pick<ExternalPromotion, 'id' | 'name' | 'currency_code' | 'exclusive' | 'priority' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'disabled_at' | 'circuit_state' | 'circuit_failure_count'> & ResourceSort
// export type ExternalPromotionFilter = Pick<ExternalPromotion, 'id' | 'name' | 'currency_code' | 'priority' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'disabled_at' | 'circuit_state' | 'circuit_failure_count'> & ResourceFilter


interface ExternalPromotion extends Resource {
	
	readonly type: ExternalPromotionType

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
	 * The URL to the service that will compute the discount..
	 * @example ```"https://external_promotion.yourbrand.com"```
	 */
	promotion_url: string
	/** 
	 * The circuit breaker state, by default it is 'closed'. It can become 'open' once the number of consecutive failures overlaps the specified threshold, in such case no further calls to the failing callback are made..
	 * @example ```"closed"```
	 */
	circuit_state?: Nullable<string>
	/** 
	 * The number of consecutive failures recorded by the circuit breaker associated to this resource, will be reset on first successful call to callback..
	 * @example ```"5"```
	 */
	circuit_failure_count?: Nullable<number>
	/** 
	 * The shared secret used to sign the external request payload..
	 * @example ```"1c0994cc4e996e8c6ee56a2198f66f3c"```
	 */
	shared_secret: string

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


interface ExternalPromotionCreate extends ResourceCreate {
	
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
	 * The URL to the service that will compute the discount..
	 * @example ```"https://external_promotion.yourbrand.com"```
	 */
	promotion_url: string

	market?: Nullable<MarketRel>
	order_amount_promotion_rule?: Nullable<OrderAmountPromotionRuleRel>
	sku_list_promotion_rule?: Nullable<SkuListPromotionRuleRel>
	coupon_codes_promotion_rule?: Nullable<CouponCodesPromotionRuleRel>
	custom_promotion_rule?: Nullable<CustomPromotionRuleRel>
	sku_list?: Nullable<SkuListRel>
	tags?: Nullable<TagRel[]>

}


interface ExternalPromotionUpdate extends ResourceUpdate {
	
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
	 * The URL to the service that will compute the discount..
	 * @example ```"https://external_promotion.yourbrand.com"```
	 */
	promotion_url?: Nullable<string>
	/** 
	 * Send this attribute if you want to reset the circuit breaker associated to this resource to 'closed' state and zero failures count..
	 * @example ```"true"```
	 */
	_reset_circuit?: Nullable<boolean>

	market?: Nullable<MarketRel>
	order_amount_promotion_rule?: Nullable<OrderAmountPromotionRuleRel>
	sku_list_promotion_rule?: Nullable<SkuListPromotionRuleRel>
	coupon_codes_promotion_rule?: Nullable<CouponCodesPromotionRuleRel>
	custom_promotion_rule?: Nullable<CustomPromotionRuleRel>
	sku_list?: Nullable<SkuListRel>
	tags?: Nullable<TagRel[]>

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
