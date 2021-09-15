/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList } from '../query'

import { PercentageDiscountPromotion } from './percentage_discount_promotions'
import { FreeShippingPromotion } from './free_shipping_promotions'
import { FixedAmountPromotion } from './fixed_amount_promotions'
import { ExternalPromotion } from './external_promotions'


type PromotionRuleRel = ResourceId & { type: typeof PromotionRules.TYPE }


interface PromotionRule extends Resource {
	
	promotion?: PercentageDiscountPromotion | FreeShippingPromotion | FixedAmountPromotion | ExternalPromotion

}


class PromotionRules extends ApiResource {

	static readonly TYPE: 'promotion_rules' = 'promotion_rules'
	// static readonly PATH = 'promotion_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PromotionRule>> {
		return this.resources.list({ type: PromotionRules.TYPE }, params, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPromotionRule(resource: any): resource is PromotionRule {
		return resource.type && (resource.type === PromotionRules.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(PromotionRules.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(PromotionRules.TYPE)
	}
	*/

	relationship(id: string | ResourceId): PromotionRuleRel {
		return (typeof id === 'string') ? { id, type: PromotionRules.TYPE } : {id: id.id, type: PromotionRules.TYPE }
	}

}


export default PromotionRules

export { PromotionRule }
