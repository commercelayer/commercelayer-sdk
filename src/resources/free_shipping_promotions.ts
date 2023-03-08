import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { PromotionRule, PromotionRuleType } from './promotion_rules'
import type { OrderAmountPromotionRule, OrderAmountPromotionRuleType } from './order_amount_promotion_rules'
import type { SkuListPromotionRule, SkuListPromotionRuleType } from './sku_list_promotion_rules'
import type { CouponCodesPromotionRule, CouponCodesPromotionRuleType } from './coupon_codes_promotion_rules'
import type { Attachment } from './attachments'


type FreeShippingPromotionType = 'free_shipping_promotions'
type FreeShippingPromotionRel = ResourceRel & { type: FreeShippingPromotionType }
type MarketRel = ResourceRel & { type: MarketType }
type PromotionRuleRel = ResourceRel & { type: PromotionRuleType }
type OrderAmountPromotionRuleRel = ResourceRel & { type: OrderAmountPromotionRuleType }
type SkuListPromotionRuleRel = ResourceRel & { type: SkuListPromotionRuleType }
type CouponCodesPromotionRuleRel = ResourceRel & { type: CouponCodesPromotionRuleType }


interface FreeShippingPromotion extends Resource {
	
	readonly type: FreeShippingPromotionType

	name?: string
	currency_code?: string
	starts_at?: string
	expires_at?: string
	total_usage_limit?: number
	total_usage_count?: number
	active?: boolean

	market?: Market
	promotion_rules?: PromotionRule[]
	order_amount_promotion_rule?: OrderAmountPromotionRule
	sku_list_promotion_rule?: SkuListPromotionRule
	coupon_codes_promotion_rule?: CouponCodesPromotionRule
	attachments?: Attachment[]

}


interface FreeShippingPromotionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string
	starts_at: string
	expires_at: string
	total_usage_limit: number

	market?: MarketRel
	promotion_rules?: PromotionRuleRel[]
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel

}


interface FreeShippingPromotionUpdate extends ResourceUpdate {
	
	name?: string
	currency_code?: string
	starts_at?: string
	expires_at?: string
	total_usage_limit?: number

	market?: MarketRel
	promotion_rules?: PromotionRuleRel[]
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel

}


class FreeShippingPromotions extends ApiResource<FreeShippingPromotion> {

	static readonly TYPE: FreeShippingPromotionType = 'free_shipping_promotions' as const
	// static readonly PATH = 'free_shipping_promotions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<FreeShippingPromotion>> {
		return this.resources.list<FreeShippingPromotion>({ type: FreeShippingPromotions.TYPE }, params, options)
	}

	async create(resource: FreeShippingPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeShippingPromotion> {
		return this.resources.create<FreeShippingPromotionCreate, FreeShippingPromotion>({ ...resource, type: FreeShippingPromotions.TYPE }, params, options)
	}

	async update(resource: FreeShippingPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeShippingPromotion> {
		return this.resources.update<FreeShippingPromotionUpdate, FreeShippingPromotion>({ ...resource, type: FreeShippingPromotions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: FreeShippingPromotions.TYPE } : id, options)
	}

	async market(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `free_shipping_promotions/${_freeShippingPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `free_shipping_promotions/${_freeShippingPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `free_shipping_promotions/${_freeShippingPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `free_shipping_promotions/${_freeShippingPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async attachments(freeShippingPromotionId: string | FreeShippingPromotion, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _freeShippingPromotionId = (freeShippingPromotionId as FreeShippingPromotion).id || freeShippingPromotionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `free_shipping_promotions/${_freeShippingPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isFreeShippingPromotion(resource: any): resource is FreeShippingPromotion {
		return resource.type && (resource.type === FreeShippingPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): FreeShippingPromotionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: FreeShippingPromotions.TYPE } : { id: id.id, type: FreeShippingPromotions.TYPE }
	}


	type(): FreeShippingPromotionType {
		return FreeShippingPromotions.TYPE
	}

}


export default FreeShippingPromotions

export type { FreeShippingPromotion, FreeShippingPromotionCreate, FreeShippingPromotionUpdate, FreeShippingPromotionType }
