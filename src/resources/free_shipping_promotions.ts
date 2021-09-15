/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Market } from './markets'
import { PromotionRule } from './promotion_rules'
import { OrderAmountPromotionRule } from './order_amount_promotion_rules'
import { SkuListPromotionRule } from './sku_list_promotion_rules'
import { CouponCodesPromotionRule } from './coupon_codes_promotion_rules'
import { Attachment } from './attachments'


type FreeShippingPromotionRel = ResourceId & { type: typeof FreeShippingPromotions.TYPE }
type MarketRel = ResourceId & { type: 'markets' }
type PromotionRuleRel = ResourceId & { type: 'promotion_rules' }
type OrderAmountPromotionRuleRel = ResourceId & { type: 'order_amount_promotion_rules' }
type SkuListPromotionRuleRel = ResourceId & { type: 'sku_list_promotion_rules' }
type CouponCodesPromotionRuleRel = ResourceId & { type: 'coupon_codes_promotion_rules' }


interface FreeShippingPromotion extends Resource {
	
	name?: string
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
		return this.resources.list({ type: FreeShippingPromotions.TYPE }, params, options)
	}

	async create(resource: FreeShippingPromotionCreate, options?: ResourcesConfig): Promise<FreeShippingPromotion> {
		return this.resources.create(Object.assign(resource, { type: FreeShippingPromotions.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeShippingPromotion> {
		return this.resources.retrieve<FreeShippingPromotion>({ type: FreeShippingPromotions.TYPE, id }, params, options)
	}

	async update(resource: FreeShippingPromotionUpdate, options?: ResourcesConfig): Promise<FreeShippingPromotion> {
		return this.resources.update({ ...resource, type: FreeShippingPromotions.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: FreeShippingPromotions.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isFreeShippingPromotion(resource: any): resource is FreeShippingPromotion {
		return resource.type && (resource.type === FreeShippingPromotions.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(FreeShippingPromotions.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(FreeShippingPromotions.TYPE)
	}
	*/

	relationship(id: string | ResourceId): FreeShippingPromotionRel {
		return (typeof id === 'string') ? { id, type: FreeShippingPromotions.TYPE } : {id: id.id, type: FreeShippingPromotions.TYPE }
	}

}


export default FreeShippingPromotions

export { FreeShippingPromotion, FreeShippingPromotionCreate, FreeShippingPromotionUpdate }
