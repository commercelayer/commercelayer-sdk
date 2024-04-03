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


type PercentageDiscountPromotionType = 'percentage_discount_promotions'
type PercentageDiscountPromotionRel = ResourceRel & { type: PercentageDiscountPromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type CustomPromotionRuleRel = ResourceRel & { type: CustomPromotionRuleType }
type SkuListRel = ResourceRel & { type: SkuListType }
type TagRel = ResourceRel & { type: TagType }


export type PercentageDiscountPromotionSort = Pick<PercentageDiscountPromotion, 'id' | 'name' | 'currency_code' | 'exclusive' | 'priority' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'disabled_at'> & ResourceSort
// export type PercentageDiscountPromotionFilter = Pick<PercentageDiscountPromotion, 'id' | 'name' | 'currency_code' | 'starts_at' | 'expires_at' | 'total_usage_limit' | 'total_usage_count' | 'disabled_at'> & ResourceFilter


interface PercentageDiscountPromotion extends Resource {
	
	readonly type: PercentageDiscountPromotionType

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
	percentage: number

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


interface PercentageDiscountPromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: Nullable<string>
	exclusive?: Nullable<boolean>
	priority?: Nullable<number>
	starts_at: string
	expires_at: string
	total_usage_limit?: Nullable<number>
	_disable?: Nullable<boolean>
	_enable?: Nullable<boolean>
	percentage: number

	market?: Nullable<MarketRel>
	order_amount_promotion_rule?: Nullable<OrderAmountPromotionRuleRel>
	sku_list_promotion_rule?: Nullable<SkuListPromotionRuleRel>
	coupon_codes_promotion_rule?: Nullable<CouponCodesPromotionRuleRel>
	custom_promotion_rule?: Nullable<CustomPromotionRuleRel>
	sku_list?: Nullable<SkuListRel>
	tags?: Nullable<TagRel[]>

}


interface PercentageDiscountPromotionUpdate extends ResourceUpdate {
	
	name?: Nullable<string>
	currency_code?: Nullable<string>
	exclusive?: Nullable<boolean>
	priority?: Nullable<number>
	starts_at?: Nullable<string>
	expires_at?: Nullable<string>
	total_usage_limit?: Nullable<number>
	_disable?: Nullable<boolean>
	_enable?: Nullable<boolean>
	percentage?: Nullable<number>

	market?: Nullable<MarketRel>
	order_amount_promotion_rule?: Nullable<OrderAmountPromotionRuleRel>
	sku_list_promotion_rule?: Nullable<SkuListPromotionRuleRel>
	coupon_codes_promotion_rule?: Nullable<CouponCodesPromotionRuleRel>
	custom_promotion_rule?: Nullable<CustomPromotionRuleRel>
	sku_list?: Nullable<SkuListRel>
	tags?: Nullable<TagRel[]>

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

	async market(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve<OrderAmountPromotionRule>, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve<SkuListPromotionRule>, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve<CouponCodesPromotionRule>, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async custom_promotion_rule(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve<CustomPromotionRule>, options?: ResourcesConfig): Promise<CustomPromotionRule> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<CustomPromotionRule>({ type: 'custom_promotion_rules' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/custom_promotion_rule`, params, options) as unknown as CustomPromotionRule
	}

	async sku_list(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve<SkuList>, options?: ResourcesConfig): Promise<SkuList> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async coupons(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList<Coupon>, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}

	async attachments(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async skus(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList<Sku>, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/skus`, params, options) as unknown as ListResponse<Sku>
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
