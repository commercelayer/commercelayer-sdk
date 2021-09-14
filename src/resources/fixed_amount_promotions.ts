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


type FixedAmountPromotionRel = ResourceId & { type: typeof FixedAmountPromotions.TYPE }
type MarketRel = ResourceId & { type: 'markets' }
type PromotionRuleRel = ResourceId & { type: 'promotion_rules' }
type OrderAmountPromotionRuleRel = ResourceId & { type: 'order_amount_promotion_rules' }
type SkuListPromotionRuleRel = ResourceId & { type: 'sku_list_promotion_rules' }
type CouponCodesPromotionRuleRel = ResourceId & { type: 'coupon_codes_promotion_rules' }


interface FixedAmountPromotion extends Resource {
	
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

}


interface FixedAmountPromotionCreate extends ResourceCreate {
	
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

}


interface FixedAmountPromotionUpdate extends ResourceUpdate {
	
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

}


class FixedAmountPromotions extends ApiResource {

	static readonly TYPE: 'fixed_amount_promotions' = 'fixed_amount_promotions'
	// static readonly PATH = 'fixed_amount_promotions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<FixedAmountPromotion>> {
		return this.resources.list({ type: FixedAmountPromotions.TYPE }, params, options)
	}

	async create(resource: FixedAmountPromotionCreate, options?: ResourcesConfig): Promise<FixedAmountPromotion> {
		return this.resources.create(Object.assign(resource, { type: FixedAmountPromotions.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<FixedAmountPromotion> {
		return this.resources.retrieve<FixedAmountPromotion>({ type: FixedAmountPromotions.TYPE, id }, params, options)
	}

	async update(resource: FixedAmountPromotionUpdate, options?: ResourcesConfig): Promise<FixedAmountPromotion> {
		return this.resources.update({ ...resource, type: FixedAmountPromotions.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: FixedAmountPromotions.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isFixedAmountPromotion(resource: any): resource is FixedAmountPromotion {
		return resource.type && (resource.type === FixedAmountPromotions.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(FixedAmountPromotions.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(FixedAmountPromotions.TYPE)
	}
	*/

	relationship(id: string | ResourceId): FixedAmountPromotionRel {
		return (typeof id === 'string') ? { id, type: FixedAmountPromotions.TYPE } : {id: id.id, type: FixedAmountPromotions.TYPE }
	}

}


export default FixedAmountPromotions

export { FixedAmountPromotion, FixedAmountPromotionCreate, FixedAmountPromotionUpdate }
