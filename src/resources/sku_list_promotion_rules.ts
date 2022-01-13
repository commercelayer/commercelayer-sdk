/**
 * ©2022 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.8.0
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { PercentageDiscountPromotion } from './percentage_discount_promotions'
import { FreeShippingPromotion } from './free_shipping_promotions'
import { FixedAmountPromotion } from './fixed_amount_promotions'
import { FreeGiftPromotion } from './free_gift_promotions'
import { FixedPricePromotion } from './fixed_price_promotions'
import { ExternalPromotion } from './external_promotions'
import { SkuList } from './sku_lists'
import { Sku } from './skus'


type SkuListPromotionRuleRel = ResourceId & { type: typeof SkuListPromotionRules.TYPE }
type PercentageDiscountPromotionRel = ResourceId & { type: 'percentage_discount_promotions' }
type FreeShippingPromotionRel = ResourceId & { type: 'free_shipping_promotions' }
type FixedAmountPromotionRel = ResourceId & { type: 'fixed_amount_promotions' }
type FreeGiftPromotionRel = ResourceId & { type: 'free_gift_promotions' }
type FixedPricePromotionRel = ResourceId & { type: 'fixed_price_promotions' }
type ExternalPromotionRel = ResourceId & { type: 'external_promotions' }
type SkuListRel = ResourceId & { type: 'sku_lists' }


interface SkuListPromotionRule extends Resource {
	
	all_skus?: boolean
	min_quantity?: number

	promotion?: PercentageDiscountPromotion | FreeShippingPromotion | FixedAmountPromotion | FreeGiftPromotion | FixedPricePromotion | ExternalPromotion
	sku_list?: SkuList
	skus?: Sku[]

}


interface SkuListPromotionRuleCreate extends ResourceCreate {
	
	all_skus?: boolean
	min_quantity?: number

	promotion?: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FixedAmountPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel
	sku_list?: SkuListRel

}


interface SkuListPromotionRuleUpdate extends ResourceUpdate {
	
	all_skus?: boolean
	min_quantity?: number

	promotion?: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FixedAmountPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel
	sku_list?: SkuListRel

}


class SkuListPromotionRules extends ApiResource {

	static readonly TYPE: 'sku_list_promotion_rules' = 'sku_list_promotion_rules'
	// static readonly PATH = 'sku_list_promotion_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SkuListPromotionRule>> {
		return this.resources.list({ type: SkuListPromotionRules.TYPE }, params, options)
	}

	async create(resource: SkuListPromotionRuleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		return this.resources.create({ ...resource, type: SkuListPromotionRules.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		return this.resources.retrieve<SkuListPromotionRule>({ type: SkuListPromotionRules.TYPE, id }, params, options)
	}

	async update(resource: SkuListPromotionRuleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListPromotionRule> {
		return this.resources.update({ ...resource, type: SkuListPromotionRules.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: SkuListPromotionRules.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isSkuListPromotionRule(resource: any): resource is SkuListPromotionRule {
		return resource.type && (resource.type === SkuListPromotionRules.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(SkuListPromotionRules.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(SkuListPromotionRules.TYPE)
	}
	*/

	relationship(id: string | ResourceId): SkuListPromotionRuleRel {
		return (typeof id === 'string') ? { id, type: SkuListPromotionRules.TYPE } : { id: id.id, type: SkuListPromotionRules.TYPE }
	}

	type(): string {
		return SkuListPromotionRules.TYPE
	}

}


export default SkuListPromotionRules

export { SkuListPromotionRule, SkuListPromotionRuleCreate, SkuListPromotionRuleUpdate }
