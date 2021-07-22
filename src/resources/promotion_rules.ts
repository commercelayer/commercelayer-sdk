/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 21-07-2021
 **/

import { ApiResource, Resource, ResourcesConfig, DocWithData, ResourceId } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList } from '../query'

import { Promotion } from './promotions'




interface PromotionRule extends Resource {
	
	promotion?: Promotion

}


class PromotionRules extends ApiResource {

	static readonly TYPE: 'promotion_rules' = 'promotion_rules'
	// static readonly PATH = 'promotion_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<PromotionRule[] | DocWithData<PromotionRule>> {
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

	relationship(id: string): ResourceId & { type: typeof PromotionRules.TYPE } {
		return { id, type: PromotionRules.TYPE }
	}

}


export default PromotionRules

export { PromotionRule }
