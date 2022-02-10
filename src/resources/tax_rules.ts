import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { ManualTaxCalculator } from './manual_tax_calculators'


type TaxRuleRel = ResourceRel & { type: typeof TaxRules.TYPE }
type ManualTaxCalculatorRel = ResourceRel & { type: 'manual_tax_calculators' }


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

	manual_tax_calculator: ManualTaxCalculatorRel

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
		return this.resources.list<TaxRule>({ type: TaxRules.TYPE }, params, options)
	}

	async create(resource: TaxRuleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxRule> {
		return this.resources.create({ ...resource, type: TaxRules.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxRule> {
		return this.resources.retrieve<TaxRule>({ type: TaxRules.TYPE, id }, params, options)
	}

	async update(resource: TaxRuleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxRule> {
		return this.resources.update({ ...resource, type: TaxRules.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: TaxRules.TYPE, id }, options)
	}

	async manual_tax_calculator(taxRuleId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualTaxCalculator> {
		return this.resources.fetch<ManualTaxCalculator>({ type: 'manual_tax_calculators' }, `tax_rules/${taxRuleId}/manual_tax_calculator`, params, options) as unknown as ManualTaxCalculator
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isTaxRule(resource: any): resource is TaxRule {
		return resource.type && (resource.type === TaxRules.TYPE)
	}


	relationship(id: string | ResourceId | null): TaxRuleRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: TaxRules.TYPE } : { id: id.id, type: TaxRules.TYPE }
	}


	type(): string {
		return TaxRules.TYPE
	}

}


export default TaxRules

export { TaxRule, TaxRuleCreate, TaxRuleUpdate }
