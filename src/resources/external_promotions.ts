import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { PromotionRule, PromotionRuleType } from './promotion_rules'
import type { OrderAmountPromotionRule, OrderAmountPromotionRuleType } from './order_amount_promotion_rules'
import type { SkuListPromotionRule, SkuListPromotionRuleType } from './sku_list_promotion_rules'
import type { CouponCodesPromotionRule, CouponCodesPromotionRuleType } from './coupon_codes_promotion_rules'
import type { Attachment } from './attachments'
import type { Event } from './events'


type ExternalPromotionType = 'external_promotions'
type ExternalPromotionRel = ResourceRel & { type: ExternalPromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type PromotionRuleRel = ResourceRel & { type: PromotionRuleType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }


interface ExternalPromotion extends Resource {
	
	readonly type: ExternalPromotionType

	name: string
	currency_code?: string | null
	starts_at: string
	expires_at: string
	total_usage_limit: number
	total_usage_count?: number | null
	active?: boolean | null
	promotion_url: string
	shared_secret: string

	market?: Market | null
	promotion_rules?: PromotionRule[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRule | null
	sku_list_promotion_rule?: SkuListPromotionRule | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRule | null
	attachments?: Attachment[] | null
	events?: Event[] | null

}


interface ExternalPromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string | null
	starts_at: string
	expires_at: string
	total_usage_limit: number
	promotion_url: string

	market?: MarketRel | null
	promotion_rules?: PromotionRuleRel[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null

}


interface ExternalPromotionUpdate extends ResourceUpdate {
	
	name?: string | null
	currency_code?: string | null
	starts_at?: string | null
	expires_at?: string | null
	total_usage_limit?: number | null
	promotion_url?: string | null

	market?: MarketRel | null
	promotion_rules?: PromotionRuleRel[] | null
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel | null
	sku_list_promotion_rule?: SkuListPromotionRuleRel | null
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel | null

}


class ExternalPromotions extends ApiResource<ExternalPromotion> {

	static readonly TYPE: ExternalPromotionType = 'external_promotions' as const

	async create(resource: ExternalPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPromotion> {
		return this.resources.create<ExternalPromotionCreate, ExternalPromotion>({ ...resource, type: ExternalPromotions.TYPE }, params, options)
	}

	async update(resource: ExternalPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPromotion> {
		return this.resources.update<ExternalPromotionUpdate, ExternalPromotion>({ ...resource, type: ExternalPromotions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ExternalPromotions.TYPE } : id, options)
	}

	async market(externalPromotionId: string | ExternalPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `external_promotions/${_externalPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(externalPromotionId: string | ExternalPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `external_promotions/${_externalPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(externalPromotionId: string | ExternalPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `external_promotions/${_externalPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(externalPromotionId: string | ExternalPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `external_promotions/${_externalPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async attachments(externalPromotionId: string | ExternalPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `external_promotions/${_externalPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(externalPromotionId: string | ExternalPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _externalPromotionId = (externalPromotionId as ExternalPromotion).id || externalPromotionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `external_promotions/${_externalPromotionId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isExternalPromotion(resource: any): resource is ExternalPromotion {
		return resource.type && (resource.type === ExternalPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): ExternalPromotionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ExternalPromotions.TYPE } : { id: id.id, type: ExternalPromotions.TYPE }
	}


	type(): ExternalPromotionType {
		return ExternalPromotions.TYPE
	}

}


export default ExternalPromotions

export type { ExternalPromotion, ExternalPromotionCreate, ExternalPromotionUpdate, ExternalPromotionType }
