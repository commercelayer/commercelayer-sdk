/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.3
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Market } from './markets'
import { PromotionRule } from './promotion_rules'
import { OrderAmountPromotionRule } from './order_amount_promotion_rules'
import { SkuListPromotionRule } from './sku_list_promotion_rules'
import { CouponCodesPromotionRule } from './coupon_codes_promotion_rules'
import { Attachment } from './attachments'
import { SkuList } from './sku_lists'
import { Sku } from './skus'


type FreeGiftPromotionRel = ResourceId & { type: typeof FreeGiftPromotions.TYPE }
type MarketRel = ResourceId & { type: 'markets' }
type PromotionRuleRel = ResourceId & { type: 'promotion_rules' }
type OrderAmountPromotionRuleRel = ResourceId & { type: 'order_amount_promotion_rules' }
type SkuListPromotionRuleRel = ResourceId & { type: 'sku_list_promotion_rules' }
type CouponCodesPromotionRuleRel = ResourceId & { type: 'coupon_codes_promotion_rules' }
type SkuListRel = ResourceId & { type: 'sku_lists' }


interface FreeGiftPromotion extends Resource {
	
	name?: string
	starts_at?: string
	expires_at?: string
	total_usage_limit?: number
	total_usage_count?: number
	active?: boolean
	max_quantity?: number

	market?: Market
	promotion_rules?: PromotionRule[]
	order_amount_promotion_rule?: OrderAmountPromotionRule
	sku_list_promotion_rule?: SkuListPromotionRule
	coupon_codes_promotion_rule?: CouponCodesPromotionRule
	attachments?: Attachment[]
	sku_list?: SkuList
	skus?: Sku[]

}


interface FreeGiftPromotionCreate extends ResourceCreate {
	
	name: string
	starts_at: string
	expires_at: string
	total_usage_limit: number
	max_quantity?: number

	market?: MarketRel
	promotion_rules?: PromotionRuleRel[]
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	sku_list?: SkuListRel

}


interface FreeGiftPromotionUpdate extends ResourceUpdate {
	
	name?: string
	starts_at?: string
	expires_at?: string
	total_usage_limit?: number
	max_quantity?: number

	market?: MarketRel
	promotion_rules?: PromotionRuleRel[]
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	sku_list?: SkuListRel

}


class FreeGiftPromotions extends ApiResource {

	static readonly TYPE: 'free_gift_promotions' = 'free_gift_promotions'
	// static readonly PATH = 'free_gift_promotions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<FreeGiftPromotion>> {
		return this.resources.list({ type: FreeGiftPromotions.TYPE }, params, options)
	}

	async create(resource: FreeGiftPromotionCreate, options?: ResourcesConfig): Promise<FreeGiftPromotion> {
		return this.resources.create({ ...resource, type: FreeGiftPromotions.TYPE } , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FreeGiftPromotion> {
		return this.resources.retrieve<FreeGiftPromotion>({ type: FreeGiftPromotions.TYPE, id }, params, options)
	}

	async update(resource: FreeGiftPromotionUpdate, options?: ResourcesConfig): Promise<FreeGiftPromotion> {
		return this.resources.update({ ...resource, type: FreeGiftPromotions.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: FreeGiftPromotions.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isFreeGiftPromotion(resource: any): resource is FreeGiftPromotion {
		return resource.type && (resource.type === FreeGiftPromotions.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(FreeGiftPromotions.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(FreeGiftPromotions.TYPE)
	}
	*/

	relationship(id: string | ResourceId): FreeGiftPromotionRel {
		return (typeof id === 'string') ? { id, type: FreeGiftPromotions.TYPE } : {id: id.id, type: FreeGiftPromotions.TYPE }
	}

	type(): string {
		return FreeGiftPromotions.TYPE
	}

}


export default FreeGiftPromotions

export { FreeGiftPromotion, FreeGiftPromotionCreate, FreeGiftPromotionUpdate }
