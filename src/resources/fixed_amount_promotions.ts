import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { PromotionRule, PromotionRuleType } from './promotion_rules'
import type { OrderAmountPromotionRule, OrderAmountPromotionRuleType } from './order_amount_promotion_rules'
import type { SkuListPromotionRule, SkuListPromotionRuleType } from './sku_list_promotion_rules'
import type { CouponCodesPromotionRule, CouponCodesPromotionRuleType } from './coupon_codes_promotion_rules'
import type { Attachment } from './attachments'
import type { Event } from './events'


type FixedAmountPromotionType = 'fixed_amount_promotions'
type FixedAmountPromotionRel = ResourceRel & { type: FixedAmountPromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type PromotionRuleRel = ResourceRel & { type: PromotionRuleType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }


interface FixedAmountPromotion extends Resource {
	
	readonly type: FixedAmountPromotionType

	name: string
	currency_code?: string | null
	starts_at: string
	expires_at: string
	total_usage_limit: number
	total_usage_count?: number | null
	active?: boolean | null
	fixed_amount_cents: number
	fixed_amount_float?: number | null
	formatted_fixed_amount?: string | null

	market?: Market | null
	promotion_rules?: PromotionRule[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRule | null
	sku_list_promotion_rule?: SkuListPromotionRule | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRule | null
	attachments?: Attachment[] | null
	events?: Event[] | null

}


interface FixedAmountPromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string | null
	starts_at: string
	expires_at: string
	total_usage_limit: number
	fixed_amount_cents: number

	market?: MarketRel | null
	promotion_rules?: PromotionRuleRel[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null

}


interface FixedAmountPromotionUpdate extends ResourceUpdate {
	
	name?: string | null
	currency_code?: string | null
	starts_at?: string | null
	expires_at?: string | null
	total_usage_limit?: number | null
	fixed_amount_cents?: number | null

	market?: MarketRel | null
	promotion_rules?: PromotionRuleRel[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null

}


class FixedAmountPromotions extends ApiResource<FixedAmountPromotion> {

	static readonly TYPE: FixedAmountPromotionType = 'fixed_amount_promotions' as const

	async create(resource: FixedAmountPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedAmountPromotion> {
		return this.resources.create<FixedAmountPromotionCreate, FixedAmountPromotion>({ ...resource, type: FixedAmountPromotions.TYPE }, params, options)
	}

	async update(resource: FixedAmountPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedAmountPromotion> {
		return this.resources.update<FixedAmountPromotionUpdate, FixedAmountPromotion>({ ...resource, type: FixedAmountPromotions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: FixedAmountPromotions.TYPE } : id, options)
	}

	async market(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async attachments(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(fixedAmountPromotionId: string | FixedAmountPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _fixedAmountPromotionId = (fixedAmountPromotionId as FixedAmountPromotion).id || fixedAmountPromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `fixed_amount_promotions/${_fixedAmountPromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isFixedAmountPromotion(resource: any): resource is FixedAmountPromotion {
		return resource.type && (resource.type === FixedAmountPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): FixedAmountPromotionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: FixedAmountPromotions.TYPE } : { id: id.id, type: FixedAmountPromotions.TYPE }
	}


	type(): FixedAmountPromotionType {
		return FixedAmountPromotions.TYPE
	}

}


export default FixedAmountPromotions

export type { FixedAmountPromotion, FixedAmountPromotionCreate, FixedAmountPromotionUpdate, FixedAmountPromotionType }
