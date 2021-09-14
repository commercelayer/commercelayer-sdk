/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
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


type PromotionRel = ResourceId & { type: typeof Promotions.TYPE }
type MarketRel = ResourceId & { type: 'markets' }
type PromotionRuleRel = ResourceId & { type: 'promotion_rules' }
type OrderAmountPromotionRuleRel = ResourceId & { type: 'order_amount_promotion_rules' }
type SkuListPromotionRuleRel = ResourceId & { type: 'sku_list_promotion_rules' }
type CouponCodesPromotionRuleRel = ResourceId & { type: 'coupon_codes_promotion_rules' }


interface Promotion extends Resource {
	
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


interface PromotionCreate extends ResourceCreate {
	
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


interface PromotionUpdate extends ResourceUpdate {
	
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


class Promotions extends ApiResource {

	static readonly TYPE: 'promotions' = 'promotions'
	// static readonly PATH = 'promotions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Promotion>> {
		return this.resources.list({ type: Promotions.TYPE }, params, options)
	}

	async create(resource: PromotionCreate, options?: ResourcesConfig): Promise<Promotion> {
		return this.resources.create(Object.assign(resource, { type: Promotions.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Promotion> {
		return this.resources.retrieve<Promotion>({ type: Promotions.TYPE, id }, params, options)
	}

	async update(resource: PromotionUpdate, options?: ResourcesConfig): Promise<Promotion> {
		return this.resources.update({ ...resource, type: Promotions.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: Promotions.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPromotion(resource: any): resource is Promotion {
		return resource.type && (resource.type === Promotions.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Promotions.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Promotions.TYPE)
	}
	*/

	relationship(id: string | ResourceId): PromotionRel {
		return (typeof id === 'string') ? { id, type: Promotions.TYPE } : {id: id.id, type: Promotions.TYPE }
	}

}


export default Promotions

export { Promotion, PromotionCreate, PromotionUpdate }
