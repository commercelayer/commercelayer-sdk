/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Market } from './markets'


type BillingInfoValidationRuleRel = ResourceId & { type: typeof BillingInfoValidationRules.TYPE }
type MarketRel = ResourceId & { type: 'markets' }


interface BillingInfoValidationRule extends Resource {
	
	market?: Market

}


interface BillingInfoValidationRuleCreate extends ResourceCreate {
	
	market?: MarketRel

}


interface BillingInfoValidationRuleUpdate extends ResourceUpdate {
	
	market?: MarketRel

}


class BillingInfoValidationRules extends ApiResource {

	static readonly TYPE: 'billing_info_validation_rules' = 'billing_info_validation_rules'
	// static readonly PATH = 'billing_info_validation_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<BillingInfoValidationRule>> {
		return this.resources.list({ type: BillingInfoValidationRules.TYPE }, params, options)
	}

	async create(resource: BillingInfoValidationRuleCreate, options?: ResourcesConfig): Promise<BillingInfoValidationRule> {
		return this.resources.create(Object.assign(resource, { type: BillingInfoValidationRules.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BillingInfoValidationRule> {
		return this.resources.retrieve<BillingInfoValidationRule>({ type: BillingInfoValidationRules.TYPE, id }, params, options)
	}

	async update(resource: BillingInfoValidationRuleUpdate, options?: ResourcesConfig): Promise<BillingInfoValidationRule> {
		return this.resources.update({ ...resource, type: BillingInfoValidationRules.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: BillingInfoValidationRules.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isBillingInfoValidationRule(resource: any): resource is BillingInfoValidationRule {
		return resource.type && (resource.type === BillingInfoValidationRules.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(BillingInfoValidationRules.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(BillingInfoValidationRules.TYPE)
	}
	*/

	relationship(id: string | ResourceId): BillingInfoValidationRuleRel {
		return (typeof id === 'string') ? { id, type: BillingInfoValidationRules.TYPE } : {id: id.id, type: BillingInfoValidationRules.TYPE }
	}

}


export default BillingInfoValidationRules

export { BillingInfoValidationRule, BillingInfoValidationRuleCreate, BillingInfoValidationRuleUpdate }
