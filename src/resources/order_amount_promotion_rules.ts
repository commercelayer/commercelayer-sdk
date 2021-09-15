/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { PercentageDiscountPromotion } from './percentage_discount_promotions'
import { FreeShippingPromotion } from './free_shipping_promotions'
import { FixedAmountPromotion } from './fixed_amount_promotions'
import { ExternalPromotion } from './external_promotions'


type OrderAmountPromotionRuleRel = ResourceId & { type: typeof OrderAmountPromotionRules.TYPE }
type PercentageDiscountPromotionRel = ResourceId & { type: 'percentage_discount_promotions' }
type FreeShippingPromotionRel = ResourceId & { type: 'free_shipping_promotions' }
type FixedAmountPromotionRel = ResourceId & { type: 'fixed_amount_promotions' }
type ExternalPromotionRel = ResourceId & { type: 'external_promotions' }


interface OrderAmountPromotionRule extends Resource {
	
	order_amount_cents?: number
	order_amount_float?: number
	formatted_order_amount?: string

	promotion?: PercentageDiscountPromotion | FreeShippingPromotion | FixedAmountPromotion | ExternalPromotion

}


interface OrderAmountPromotionRuleCreate extends ResourceCreate {
	
	order_amount_cents?: number

	promotion?: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FixedAmountPromotionRel | ExternalPromotionRel

}


interface OrderAmountPromotionRuleUpdate extends ResourceUpdate {
	
	order_amount_cents?: number

	promotion?: PercentageDiscountPromotionRel | FreeShippingPromotionRel | FixedAmountPromotionRel | ExternalPromotionRel

}


class OrderAmountPromotionRules extends ApiResource {

	static readonly TYPE: 'order_amount_promotion_rules' = 'order_amount_promotion_rules'
	// static readonly PATH = 'order_amount_promotion_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderAmountPromotionRule>> {
		return this.resources.list({ type: OrderAmountPromotionRules.TYPE }, params, options)
	}

	async create(resource: OrderAmountPromotionRuleCreate, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		return this.resources.create(Object.assign(resource, { type: OrderAmountPromotionRules.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		return this.resources.retrieve<OrderAmountPromotionRule>({ type: OrderAmountPromotionRules.TYPE, id }, params, options)
	}

	async update(resource: OrderAmountPromotionRuleUpdate, options?: ResourcesConfig): Promise<OrderAmountPromotionRule> {
		return this.resources.update({ ...resource, type: OrderAmountPromotionRules.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: OrderAmountPromotionRules.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isOrderAmountPromotionRule(resource: any): resource is OrderAmountPromotionRule {
		return resource.type && (resource.type === OrderAmountPromotionRules.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(OrderAmountPromotionRules.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(OrderAmountPromotionRules.TYPE)
	}
	*/

	relationship(id: string | ResourceId): OrderAmountPromotionRuleRel {
		return (typeof id === 'string') ? { id, type: OrderAmountPromotionRules.TYPE } : {id: id.id, type: OrderAmountPromotionRules.TYPE }
	}

}


export default OrderAmountPromotionRules

export { OrderAmountPromotionRule, OrderAmountPromotionRuleCreate, OrderAmountPromotionRuleUpdate }
