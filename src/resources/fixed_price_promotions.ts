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


type FixedPricePromotionType = 'fixed_price_promotions'
type FixedPricePromotionRel = ResourceRel & { type: FixedPricePromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type PromotionRuleRel = ResourceRel & { type: PromotionRuleType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }
type SkuListRel = ResourceRel & { type: SkuListType }


interface FixedPricePromotion extends Resource {
	
	readonly type: FixedPricePromotionType

	name: string
	currency_code?: string
	starts_at: string
	expires_at: string
	total_usage_limit: number
	total_usage_count?: number
	active?: boolean
	fixed_amount_cents: number
	fixed_amount_float?: number
	formatted_fixed_amount?: string

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


interface FixedPricePromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string
	starts_at: string
	expires_at: string
	total_usage_limit: number
	fixed_amount_cents: number

	market?: MarketRel
	promotion_rules?: PromotionRuleRel[]
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	sku_list: SkuListRel

}


interface FixedPricePromotionUpdate extends ResourceUpdate {
	
	name: string
	currency_code?: string
	starts_at: string
	expires_at: string
	total_usage_limit: number
	fixed_amount_cents: number

	market?: MarketRel
	promotion_rules?: PromotionRuleRel[]
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	sku_list?: SkuListRel

}


class FixedPricePromotions extends ApiResource<FixedPricePromotion> {

	static readonly TYPE: FixedPricePromotionType = 'fixed_price_promotions' as const

	async create(resource: FixedPricePromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedPricePromotion> {
		return this.resources.create<FixedPricePromotionCreate, FixedPricePromotion>({ ...resource, type: FixedPricePromotions.TYPE }, params, options)
	}

	async update(resource: FixedPricePromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedPricePromotion> {
		return this.resources.update<FixedPricePromotionUpdate, FixedPricePromotion>({ ...resource, type: FixedPricePromotions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: FixedPricePromotions.TYPE } : id, options)
	}

	async market(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `fixed_price_promotions/${_fixedPricePromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `fixed_price_promotions/${_fixedPricePromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `fixed_price_promotions/${_fixedPricePromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `fixed_price_promotions/${_fixedPricePromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async attachments(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `fixed_price_promotions/${_fixedPricePromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async sku_list(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `fixed_price_promotions/${_fixedPricePromotionId}/sku_list`, params, options) as unknown as SkuList
	}

	async skus(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Sku>> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `fixed_price_promotions/${_fixedPricePromotionId}/skus`, params, options) as unknown as ListResponse<Sku>
	}

	async events(fixedPricePromotionId: string | FixedPricePromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _fixedPricePromotionId = (fixedPricePromotionId as FixedPricePromotion).id || fixedPricePromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `fixed_price_promotions/${_fixedPricePromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isFixedPricePromotion(resource: any): resource is FixedPricePromotion {
		return resource.type && (resource.type === FixedPricePromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): FixedPricePromotionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: FixedPricePromotions.TYPE } : { id: id.id, type: FixedPricePromotions.TYPE }
	}


	type(): FixedPricePromotionType {
		return FixedPricePromotions.TYPE
	}

}


export default FixedPricePromotions

export type { FixedPricePromotion, FixedPricePromotionCreate, FixedPricePromotionUpdate, FixedPricePromotionType }
