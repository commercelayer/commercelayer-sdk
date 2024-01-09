import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { PromotionRule, PromotionRuleType } from './promotion_rules'
import type { OrderAmountPromotionRule, OrderAmountPromotionRuleType } from './order_amount_promotion_rules'
import type { SkuListPromotionRule, SkuListPromotionRuleType } from './sku_list_promotion_rules'
import type { CouponCodesPromotionRule, CouponCodesPromotionRuleType } from './coupon_codes_promotion_rules'
import type { Coupon, CouponType } from './coupons'
import type { SkuList, SkuListType } from './sku_lists'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'
import type { Sku } from './skus'


type PercentageDiscountPromotionType = 'percentage_discount_promotions'
type PercentageDiscountPromotionRel = ResourceRel & { type: PercentageDiscountPromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type PromotionRuleRel = ResourceRel & { type: PromotionRuleType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type CouponRel = ResourceRel & { type: CouponType }
type SkuListRel = ResourceRel & { type: SkuListType }
type TagRel = ResourceRel & { type: TagType }


interface PercentageDiscountPromotion extends Resource {
	
	readonly type: PercentageDiscountPromotionType

	name: string
	currency_code?: string | null
	exclusive?: boolean | null
	priority?: number | null
	starts_at: string
	expires_at: string
	total_usage_limit?: number | null
	total_usage_count?: number | null
	active?: boolean | null
	disabled_at?: string | null
	percentage: number

	market?: Market | null
	promotion_rules?: PromotionRule[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRule | null
	sku_list_promotion_rule?: SkuListPromotionRule | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRule | null
	coupons?: Coupon[] | null
	sku_list?: SkuList | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	tags?: Tag[] | null
	versions?: Version[] | null
	skus?: Sku[] | null

}


interface PercentageDiscountPromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string | null
	exclusive?: boolean | null
	priority?: number | null
	starts_at: string
	expires_at: string
	total_usage_limit?: number | null
	_disable?: boolean | null
	_enable?: boolean | null
	percentage: number

	market?: MarketRel | null
	promotion_rules?: PromotionRuleRel[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	coupons?: CouponRel[] | null
	sku_list?: SkuListRel | null
	tags?: TagRel[] | null

}


interface PercentageDiscountPromotionUpdate extends ResourceUpdate {
	
	name?: string | null
	currency_code?: string | null
	exclusive?: boolean | null
	priority?: number | null
	starts_at?: string | null
	expires_at?: string | null
	total_usage_limit?: number | null
	_disable?: boolean | null
	_enable?: boolean | null
	percentage?: number | null

	market?: MarketRel | null
	promotion_rules?: PromotionRuleRel[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null
	coupons?: CouponRel[] | null
	sku_list?: SkuListRel | null
	tags?: TagRel[] | null

}


class PercentageDiscountPromotions extends ApiResource<PercentageDiscountPromotion> {

	static readonly TYPE: PercentageDiscountPromotionType = 'percentage_discount_promotions' as const

	async create(resource: PercentageDiscountPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PercentageDiscountPromotion> {
		return this.resources.create<PercentageDiscountPromotionCreate, PercentageDiscountPromotion>({ ...resource, type: PercentageDiscountPromotions.TYPE }, params, options)
	}

	async update(resource: PercentageDiscountPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PercentageDiscountPromotion> {
		return this.resources.update<PercentageDiscountPromotionUpdate, PercentageDiscountPromotion>({ ...resource, type: PercentageDiscountPromotions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: PercentageDiscountPromotions.TYPE } : id, options)
	}

	async market(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async coupons(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Coupon>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Coupon>({ type: 'coupons' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/coupons`, params, options) as unknown as ListResponse<Coupon>
	}

	async sku_list(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async attachments(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async skus(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async _disable(id: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PercentageDiscountPromotion> {
		return this.resources.update<PercentageDiscountPromotionUpdate, PercentageDiscountPromotion>({ id: (typeof id === 'string')? id: id.id, type: PercentageDiscountPromotions.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PercentageDiscountPromotion> {
		return this.resources.update<PercentageDiscountPromotionUpdate, PercentageDiscountPromotion>({ id: (typeof id === 'string')? id: id.id, type: PercentageDiscountPromotions.TYPE, _enable: true }, params, options)
	}


	isPercentageDiscountPromotion(resource: any): resource is PercentageDiscountPromotion {
		return resource.type && (resource.type === PercentageDiscountPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): PercentageDiscountPromotionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: PercentageDiscountPromotions.TYPE } : { id: id.id, type: PercentageDiscountPromotions.TYPE }
	}


	type(): PercentageDiscountPromotionType {
		return PercentageDiscountPromotions.TYPE
	}

}


export default PercentageDiscountPromotions

export type { PercentageDiscountPromotion, PercentageDiscountPromotionCreate, PercentageDiscountPromotionUpdate, PercentageDiscountPromotionType }
