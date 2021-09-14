/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { ManualTaxCalculator } from './manual_tax_calculators'


type TaxRuleRel = ResourceId & { type: typeof TaxRules.TYPE }
type ManualTaxCalculatorRel = ResourceId & { type: 'manual_tax_calculators' }


interface TaxRule extends Resource {
	
	name?: string
	tax_rate?: number
	country_code_regex?: string
	not_country_code_regex?: string
	state_code_regex?: string
	not_state_code_regex?: string
	zip_code_regex?: string
	not_zip_code_regex?: string
	freight_taxable?: boolean
	payment_method_taxable?: boolean
	gift_card_taxable?: boolean
	adjustment_taxable?: boolean
	breakdown?: object

	manual_tax_calculator?: ManualTaxCalculator

}


interface TaxRuleCreate extends ResourceCreate {
	
	name: string
	tax_rate?: number
	country_code_regex?: string
	not_country_code_regex?: string
	state_code_regex?: string
	not_state_code_regex?: string
	zip_code_regex?: string
	not_zip_code_regex?: string
	freight_taxable?: boolean
	payment_method_taxable?: boolean
	gift_card_taxable?: boolean
	adjustment_taxable?: boolean

	manual_tax_calculator?: ManualTaxCalculatorRel

}


interface TaxRuleUpdate extends ResourceUpdate {
	
	name?: string
	tax_rate?: number
	country_code_regex?: string
	not_country_code_regex?: string
	state_code_regex?: string
	not_state_code_regex?: string
	zip_code_regex?: string
	not_zip_code_regex?: string
	freight_taxable?: boolean
	payment_method_taxable?: boolean
	gift_card_taxable?: boolean
	adjustment_taxable?: boolean

	manual_tax_calculator?: ManualTaxCalculatorRel

}


class TaxRules extends ApiResource {

	static readonly TYPE: 'tax_rules' = 'tax_rules'
	// static readonly PATH = 'tax_rules'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<TaxRule>> {
		return this.resources.list({ type: TaxRules.TYPE }, params, options)
	}

	async create(resource: TaxRuleCreate, options?: ResourcesConfig): Promise<TaxRule> {
		return this.resources.create(Object.assign(resource, { type: TaxRules.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxRule> {
		return this.resources.retrieve<TaxRule>({ type: TaxRules.TYPE, id }, params, options)
	}

	async update(resource: TaxRuleUpdate, options?: ResourcesConfig): Promise<TaxRule> {
		return this.resources.update({ ...resource, type: TaxRules.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: TaxRules.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isTaxRule(resource: any): resource is TaxRule {
		return resource.type && (resource.type === TaxRules.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(TaxRules.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(TaxRules.TYPE)
	}
	*/

	relationship(id: string | ResourceId): TaxRuleRel {
		return (typeof id === 'string') ? { id, type: TaxRules.TYPE } : {id: id.id, type: TaxRules.TYPE }
	}

}


export default TaxRules

export { TaxRule, TaxRuleCreate, TaxRuleUpdate }
