/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 21-07-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, DocWithData, ResourceId } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Promotion } from './promotions'


type PromotionRel = ResourceId & { type: 'promotions' }


interface OrderAmountPromotionRule extends Resource {
	
	order_amount_cents?: number
	order_amount_float?: number
	formatted_order_amount?: string

	promotion?: Promotion

}


interface OrderAmountPromotionRuleCreate extends ResourceCreate {
	
	order_amount_cents?: number

	promotion?: PromotionRel

}


interface OrderAmountPromotionRuleUpdate extends ResourceUpdate {
	
	order_amount_cents?: number

	promotion?: PromotionRel

}


class OrderAmountPromotionRules extends ApiResource {

	static readonly TYPE: 'order_amount_promotion_rules' = 'order_amount_promotion_rules'
	// static readonly PATH = 'order_amount_promotion_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<OrderAmountPromotionRule[] | DocWithData<OrderAmountPromotionRule>> {
		return this.resources.list({ type: OrderAmountPromotionRules.TYPE }, params, options)
	}

	async create(resource: OrderAmountPromotionRuleCreate, options?: ResourcesConfig): Promise<OrderAmountPromotionRule | DocWithData<OrderAmountPromotionRule>> {
		return this.resources.create(Object.assign(resource, { type: OrderAmountPromotionRules.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<OrderAmountPromotionRule | DocWithData<OrderAmountPromotionRule>> {
		return this.resources.retrieve<OrderAmountPromotionRule>({ type: OrderAmountPromotionRules.TYPE, id }, params, options)
	}

	async update(resource: OrderAmountPromotionRuleUpdate, options?: ResourcesConfig): Promise<OrderAmountPromotionRule | DocWithData<OrderAmountPromotionRule>> {
		return this.resources.update({ ...resource, type: OrderAmountPromotionRules.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: OrderAmountPromotionRules.TYPE, id }, options)
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

	relationship(id: string): ResourceId & { type: typeof OrderAmountPromotionRules.TYPE } {
		return { id, type: OrderAmountPromotionRules.TYPE }
	}

}


export default OrderAmountPromotionRules

export { OrderAmountPromotionRule, OrderAmountPromotionRuleCreate, OrderAmountPromotionRuleUpdate }
