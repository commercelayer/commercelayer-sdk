import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Market } from './markets'
import { PromotionRule } from './promotion_rules'
import { OrderAmountPromotionRule } from './order_amount_promotion_rules'
import { SkuListPromotionRule } from './sku_list_promotion_rules'
import { CouponCodesPromotionRule } from './coupon_codes_promotion_rules'
import { Attachment } from './attachments'


type FreeShippingPromotionRel = ResourceRel & { type: typeof FreeShippingPromotions.TYPE }
type MarketRel = ResourceRel & { type: 'markets' }
type PromotionRuleRel = ResourceRel & { type: 'promotion_rules' }
type OrderAmountPromotionRuleRel = ResourceRel & { type: 'order_amount_promotion_rules' }
type SkuListPromotionRuleRel = ResourceRel & { type: 'sku_list_promotion_rules' }
type CouponCodesPromotionRuleRel = ResourceRel & { type: 'coupon_codes_promotion_rules' }


interface FreeShippingPromotion extends Resource {
	
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


class FreeShippingPromotions extends ApiResource {

	static readonly TYPE: 'free_shipping_promotions' = 'free_shipping_promotions'
	// static readonly PATH = 'free_shipping_promotions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<FreeShippingPromotion>> {
		return this.resources.list<FreeShippingPromotion>({ type: FreeShippingPromotions.TYPE }, params, options)
	}

	async create(resource: FreeShippingPromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeShippingPromotion> {
		return this.resources.create({ ...resource, type: FreeShippingPromotions.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeShippingPromotion> {
		return this.resources.retrieve<FreeShippingPromotion>({ type: FreeShippingPromotions.TYPE, id }, params, options)
	}

	async update(resource: FreeShippingPromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeShippingPromotion> {
		return this.resources.update({ ...resource, type: FreeShippingPromotions.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: FreeShippingPromotions.TYPE, id }, options)
	}

	async market(freeShippingPromotionId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		return this.resources.fetch<Market>({ type: 'markets' }, `free_shipping_promotions/${freeShippingPromotionId}/market`, params, options) as unknown as Market
	}

	async order_amount_promotion_rule(freeShippingPromotionId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		return this.resources.fetch<OrderAmountPromotionRule>({ type: 'order_amount_promotion_rules' }, `free_shipping_promotions/${freeShippingPromotionId}/order_amount_promotion_rule`, params, options) as unknown as OrderAmountPromotionRule
	}

	async sku_list_promotion_rule(freeShippingPromotionId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		return this.resources.fetch<SkuListPromotionRule>({ type: 'sku_list_promotion_rules' }, `free_shipping_promotions/${freeShippingPromotionId}/sku_list_promotion_rule`, params, options) as unknown as SkuListPromotionRule
	}

	async coupon_codes_promotion_rule(freeShippingPromotionId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponCodesPromotionRule> {
		return this.resources.fetch<CouponCodesPromotionRule>({ type: 'coupon_codes_promotion_rules' }, `free_shipping_promotions/${freeShippingPromotionId}/coupon_codes_promotion_rule`, params, options) as unknown as CouponCodesPromotionRule
	}

	async attachments(freeShippingPromotionId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `free_shipping_promotions/${freeShippingPromotionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isFreeShippingPromotion(resource: any): resource is FreeShippingPromotion {
		return resource.type && (resource.type === FreeShippingPromotions.TYPE)
	}


	relationship(id: string | ResourceId | null): FreeShippingPromotionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: FreeShippingPromotions.TYPE } : { id: id.id, type: FreeShippingPromotions.TYPE }
	}


	type(): string {
		return FreeShippingPromotions.TYPE
	}

}


export default FreeShippingPromotions

export { FreeShippingPromotion, FreeShippingPromotionCreate, FreeShippingPromotionUpdate }
