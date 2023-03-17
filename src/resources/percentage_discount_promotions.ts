import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { PromotionRule, PromotionRuleType } from './promotion_rules'
import type { OrderAmountPromotionRule, OrderAmountPromotionRuleType } from './order_amount_promotion_rules'
import type { SkuListPromotionRule, SkuListPromotionRuleType } from './sku_list_promotion_rules'
import type { CouponCodesPromotionRule, CouponCodesPromotionRuleType } from './coupon_codes_promotion_rules'
import type { Attachment } from './attachments'
import type { SkuList, SkuListType } from './sku_lists'
import type { Sku } from './skus'
import type { Event } from './events'


type PercentageDiscountPromotionType = 'percentage_discount_promotions'
type PercentageDiscountPromotionRel = ResourceRel & { type: PercentageDiscountPromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type PromotionRuleRel = ResourceRel & { type: PromotionRuleType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type SkuListRel = ResourceRel & { type: SkuListType }


interface PercentageDiscountPromotion extends Resource {
	
	readonly type: PercentageDiscountPromotionType

	name: string
	currency_code?: string
	starts_at: string
	expires_at: string
	total_usage_limit: number
	total_usage_count?: number
	active?: boolean
	percentage: number

	market?: Market
	promotion_rules?: PromotionRule[]
	order_amount_promotion_rule?: OrderAmountPromotionRule
	sku_list_promotion_rule?: SkuListPromotionRule
	coupon_codes_promotion_rule?: CouponCodesPromotionRule
	attachments?: Attachment[]
	sku_list?: SkuList
	skus?: Sku[]
	events?: Event[]

}


interface PercentageDiscountPromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string
	starts_at: string
	expires_at: string
	total_usage_limit: number
	percentage: number

	market?: MarketRel
	promotion_rules?: PromotionRuleRel[]
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	sku_list?: SkuListRel

}


interface PercentageDiscountPromotionUpdate extends ResourceUpdate {
	
	name: string
	currency_code?: string
	starts_at: string
	expires_at: string
	total_usage_limit: number
	percentage: number

	market?: MarketRel
	promotion_rules?: PromotionRuleRel[]
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	sku_list?: SkuListRel

}


class PercentageDiscountPromotions extends ApiResource<PercentageDiscountPromotion> {

	static readonly TYPE: PercentageDiscountPromotionType = 'percentage_discount_promotions' as const

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PercentageDiscountPromotion>> {
		return this.resources.list<PercentageDiscountPromotion>({ type: PercentageDiscountPromotions.TYPE }, params, options)
	}

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

	async attachments(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async sku_list(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async skus(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async events(percentageDiscountPromotionId: string | PercentageDiscountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _percentageDiscountPromotionId = (percentageDiscountPromotionId as PercentageDiscountPromotion).id || percentageDiscountPromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `percentage_discount_promotions/${_percentageDiscountPromotionId}/events`, params, options) as unknown as ListResponse<Event>
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
