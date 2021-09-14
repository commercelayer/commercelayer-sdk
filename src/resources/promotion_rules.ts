/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Promotion } from './promotions'


type PromotionRuleRel = ResourceId & { type: typeof PromotionRules.TYPE }
type PromotionRel = ResourceId & { type: 'promotions' }


interface PromotionRule extends Resource {
	
	promotion?: Promotion

}


interface PromotionRuleCreate extends ResourceCreate {
	
	promotion?: PromotionRel

}


interface PromotionRuleUpdate extends ResourceUpdate {
	
	promotion?: PromotionRel

}


class PromotionRules extends ApiResource {

	static readonly TYPE: 'promotion_rules' = 'promotion_rules'
	// static readonly PATH = 'promotion_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PromotionRule>> {
		return this.resources.list({ type: PromotionRules.TYPE }, params, options)
	}

	async create(resource: PromotionRuleCreate, options?: ResourcesConfig): Promise<PromotionRule> {
		return this.resources.create(Object.assign(resource, { type: PromotionRules.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PromotionRule> {
		return this.resources.retrieve<PromotionRule>({ type: PromotionRules.TYPE, id }, params, options)
	}

	async update(resource: PromotionRuleUpdate, options?: ResourcesConfig): Promise<PromotionRule> {
		return this.resources.update({ ...resource, type: PromotionRules.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: PromotionRules.TYPE, id }, options)
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

export { PromotionRule, PromotionRuleCreate, PromotionRuleUpdate }
