import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { ManualTaxCalculator, ManualTaxCalculatorType } from './manual_tax_calculators'


type TaxRuleType = 'tax_rules'
type TaxRuleRel = ResourceRel & { type: TaxRuleType }
type ManualTaxCalculatorRel = ResourceRel & { type: ManualTaxCalculatorType }


interface TaxRule extends Resource {
	
	readonly type: TaxRuleType

	name: string
	tax_rate?: number | null
	country_code_regex?: string | null
	not_country_code_regex?: string | null
	state_code_regex?: string | null
	not_state_code_regex?: string | null
	zip_code_regex?: string | null
	not_zip_code_regex?: string | null
	freight_taxable?: boolean | null
	payment_method_taxable?: boolean | null
	gift_card_taxable?: boolean | null
	adjustment_taxable?: boolean | null
	breakdown?: object | null

	manual_tax_calculator?: ManualTaxCalculator | null

}


interface TaxRuleCreate extends ResourceCreate {
	
	name: string
	tax_rate?: number | null
	country_code_regex?: string | null
	not_country_code_regex?: string | null
	state_code_regex?: string | null
	not_state_code_regex?: string | null
	zip_code_regex?: string | null
	not_zip_code_regex?: string | null
	freight_taxable?: boolean | null
	payment_method_taxable?: boolean | null
	gift_card_taxable?: boolean | null
	adjustment_taxable?: boolean | null

	manual_tax_calculator: ManualTaxCalculatorRel

}


interface TaxRuleUpdate extends ResourceUpdate {
	
	name?: string | null
	tax_rate?: number | null
	country_code_regex?: string | null
	not_country_code_regex?: string | null
	state_code_regex?: string | null
	not_state_code_regex?: string | null
	zip_code_regex?: string | null
	not_zip_code_regex?: string | null
	freight_taxable?: boolean | null
	payment_method_taxable?: boolean | null
	gift_card_taxable?: boolean | null
	adjustment_taxable?: boolean | null

	manual_tax_calculator?: ManualTaxCalculatorRel | null

}


class TaxRules extends ApiResource<TaxRule> {

	static readonly TYPE: TaxRuleType = 'tax_rules' as const

	async create(resource: TaxRuleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxRule> {
		return this.resources.create<TaxRuleCreate, TaxRule>({ ...resource, type: TaxRules.TYPE }, params, options)
	}

	async update(resource: TaxRuleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxRule> {
		return this.resources.update<TaxRuleUpdate, TaxRule>({ ...resource, type: TaxRules.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: TaxRules.TYPE } : id, options)
	}

	async manual_tax_calculator(taxRuleId: string | TaxRule, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualTaxCalculator> {
		const _taxRuleId = (taxRuleId as TaxRule).id || taxRuleId as string
		return this.resources.fetch<ManualTaxCalculator>({ type: 'manual_tax_calculators' }, `tax_rules/${_taxRuleId}/manual_tax_calculator`, params, options) as unknown as ManualTaxCalculator
	}


	isTaxRule(resource: any): resource is TaxRule {
		return resource.type && (resource.type === TaxRules.TYPE)
	}


	relationship(id: string | ResourceId | null): TaxRuleRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: TaxRules.TYPE } : { id: id.id, type: TaxRules.TYPE }
	}


	type(): TaxRuleType {
		return TaxRules.TYPE
	}

}


export default TaxRules

export type { TaxRule, TaxRuleCreate, TaxRuleUpdate, TaxRuleType }
