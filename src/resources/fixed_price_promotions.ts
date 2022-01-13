/**
 * ©2022 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.8.0
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


type FixedPricePromotionRel = ResourceId & { type: typeof FixedPricePromotions.TYPE }
type MarketRel = ResourceId & { type: 'markets' }
type PromotionRuleRel = ResourceId & { type: 'promotion_rules' }
type OrderAmountPromotionRuleRel = ResourceId & { type: 'order_amount_promotion_rules' }
type SkuListPromotionRuleRel = ResourceId & { type: 'sku_list_promotion_rules' }
type CouponCodesPromotionRuleRel = ResourceId & { type: 'coupon_codes_promotion_rules' }
type SkuListRel = ResourceId & { type: 'sku_lists' }


interface FixedPricePromotion extends Resource {
	
	name?: string
	starts_at?: string
	expires_at?: string
	total_usage_limit?: number
	total_usage_count?: number
	active?: boolean
	fixed_amount_cents?: number
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

}


interface FixedPricePromotionCreate extends ResourceCreate {
	
	name: string
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


interface FixedPricePromotionUpdate extends ResourceUpdate {
	
	name?: string
	starts_at?: string
	expires_at?: string
	total_usage_limit?: number
	fixed_amount_cents?: number

	market?: MarketRel
	promotion_rules?: PromotionRuleRel[]
	order_amount_promotion_rule?: OrderAmountPromotionRuleRel
	sku_list_promotion_rule?: SkuListPromotionRuleRel
	coupon_codes_promotion_rule?: CouponCodesPromotionRuleRel
	sku_list?: SkuListRel

}


class FixedPricePromotions extends ApiResource {

	static readonly TYPE: 'fixed_price_promotions' = 'fixed_price_promotions'
	// static readonly PATH = 'fixed_price_promotions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<FixedPricePromotion>> {
		return this.resources.list({ type: FixedPricePromotions.TYPE }, params, options)
	}

	async create(resource: FixedPricePromotionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedPricePromotion> {
		return this.resources.create({ ...resource, type: FixedPricePromotions.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedPricePromotion> {
		return this.resources.retrieve<FixedPricePromotion>({ type: FixedPricePromotions.TYPE, id }, params, options)
	}

	async update(resource: FixedPricePromotionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedPricePromotion> {
		return this.resources.update({ ...resource, type: FixedPricePromotions.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: FixedPricePromotions.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isFixedPricePromotion(resource: any): resource is FixedPricePromotion {
		return resource.type && (resource.type === FixedPricePromotions.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(FixedPricePromotions.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(FixedPricePromotions.TYPE)
	}
	*/

	relationship(id: string | ResourceId): FixedPricePromotionRel {
		return (typeof id === 'string') ? { id, type: FixedPricePromotions.TYPE } : { id: id.id, type: FixedPricePromotions.TYPE }
	}

	type(): string {
		return FixedPricePromotions.TYPE
	}

}


export default FixedPricePromotions

export { FixedPricePromotion, FixedPricePromotionCreate, FixedPricePromotionUpdate }
