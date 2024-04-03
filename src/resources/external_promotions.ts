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
// export type ExternalPromotionFilter = Pick<ExternalPromotion, 'id' | 'name' | 'currency_code' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'disabled_at' | 'circuit_state' | 'circuit_failure_count'> & ResourceFilter


interface ExternalPromotion extends Resource {
	
	readonly type: ExternalPromotionType

	name: string
	currency_code?: Nullable<string>
	exclusive?: Nullable<boolean>
	priority?: Nullable<number>
	starts_at: string
	expires_at: string
	total_usage_limit?: Nullable<number>
	total_usage_count?: Nullable<number>
	active?: Nullable<boolean>
	disabled_at?: Nullable<string>
	promotion_url: string
	circuit_state?: Nullable<string>
	circuit_failure_count?: Nullable<number>
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
	
	name: string
	currency_code?: Nullable<string>
	exclusive?: Nullable<boolean>
	priority?: Nullable<number>
	starts_at: string
	expires_at: string
	total_usage_limit?: Nullable<number>
	_disable?: Nullable<boolean>
	_enable?: Nullable<boolean>
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
	
	name?: Nullable<string>
	currency_code?: Nullable<string>
	exclusive?: Nullable<boolean>
	priority?: Nullable<number>
	starts_at?: Nullable<string>
	expires_at?: Nullable<string>
	total_usage_limit?: Nullable<number>
	_disable?: Nullable<boolean>
	_enable?: Nullable<boolean>
	promotion_url?: Nullable<string>
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
