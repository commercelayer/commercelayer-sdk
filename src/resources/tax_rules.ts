import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { ManualTaxCalculator, ManualTaxCalculatorType } from './manual_tax_calculators'
import type { Version } from './versions'
import type { EventStore } from './event_stores'


type TaxRuleType = 'tax_rules'
type TaxRuleRel = ResourceRel & { type: TaxRuleType }
type ManualTaxCalculatorRel = ResourceRel & { type: ManualTaxCalculatorType }


export type TaxRuleSort = Pick<TaxRule, 'id' | 'name' | 'tax_rate'> & ResourceSort
// export type TaxRuleFilter = Pick<TaxRule, 'id' | 'name' | 'tax_rate' | 'freight_taxable' | 'payment_method_taxable' | 'gift_card_taxable' | 'adjustment_taxable'> & ResourceFilter


interface TaxRule extends Resource {
	
	readonly type: TaxRuleType

	/** 
	 * The tax rule internal name.
	 * @example ```"Fixed 22%"```
	 */
	name: string
	/** 
	 * The tax rate for this rule.
	 * @example ```0.22```
	 */
	tax_rate?: number | null
	/** 
	 * Indicates if the freight is taxable.
	 */
	freight_taxable?: boolean | null
	/** 
	 * Indicates if the payment method is taxable.
	 */
	payment_method_taxable?: boolean | null
	/** 
	 * Indicates if gift cards are taxable.
	 */
	gift_card_taxable?: boolean | null
	/** 
	 * Indicates if adjustemnts are taxable.
	 */
	adjustment_taxable?: boolean | null
	/** 
	 * The breakdown for this tax rule (if calculated).
	 * @example ```{"41":{"tax_rate":0.22}}```
	 */
	breakdown?: Record<string, any> | null
	/** 
	 * The regex that will be evaluated to match the shipping address country code, max size is 5000.
	 * @example ```"AT|BE|BG|CZ|DK|EE|DE|HU|LV|LT"```
	 */
	country_code_regex?: string | null
	/** 
	 * The regex that will be evaluated as negative match for the shipping address country code, max size is 5000.
	 * @example ```"AT|BE|BG|CZ|DK|EE|DE"```
	 */
	not_country_code_regex?: string | null
	/** 
	 * The regex that will be evaluated to match the shipping address state code, max size is 5000.
	 * @example ```"A[KLRZ]|C[AOT]|D[CE]|FL"```
	 */
	state_code_regex?: string | null
	/** 
	 * The regex that will be evaluated as negative match for the shipping address state code, max size is 5000.
	 * @example ```"A[KLRZ]|C[AOT]"```
	 */
	not_state_code_regex?: string | null
	/** 
	 * The regex that will be evaluated to match the shipping address zip code, max size is 5000.
	 * @example ```"(?i)(JE1|JE2|JE3|JE4|JE5)"```
	 */
	zip_code_regex?: string | null
	/** 
	 * The regex that will be evaluated as negative match for the shipping zip country code, max size is 5000.
	 * @example ```"(?i)(JE1|JE2|JE3)"```
	 */
	not_zip_code_regex?: string | null

	manual_tax_calculator?: ManualTaxCalculator | null
	versions?: Version[] | null
	event_stores?: EventStore[] | null

}


interface TaxRuleCreate extends ResourceCreate {
	
	/** 
	 * The tax rule internal name.
	 * @example ```"Fixed 22%"```
	 */
	name: string
	/** 
	 * The tax rate for this rule.
	 * @example ```0.22```
	 */
	tax_rate?: number | null
	/** 
	 * Indicates if the freight is taxable.
	 */
	freight_taxable?: boolean | null
	/** 
	 * Indicates if the payment method is taxable.
	 */
	payment_method_taxable?: boolean | null
	/** 
	 * Indicates if gift cards are taxable.
	 */
	gift_card_taxable?: boolean | null
	/** 
	 * Indicates if adjustemnts are taxable.
	 */
	adjustment_taxable?: boolean | null
	/** 
	 * The regex that will be evaluated to match the shipping address country code, max size is 5000.
	 * @example ```"AT|BE|BG|CZ|DK|EE|DE|HU|LV|LT"```
	 */
	country_code_regex?: string | null
	/** 
	 * The regex that will be evaluated as negative match for the shipping address country code, max size is 5000.
	 * @example ```"AT|BE|BG|CZ|DK|EE|DE"```
	 */
	not_country_code_regex?: string | null
	/** 
	 * The regex that will be evaluated to match the shipping address state code, max size is 5000.
	 * @example ```"A[KLRZ]|C[AOT]|D[CE]|FL"```
	 */
	state_code_regex?: string | null
	/** 
	 * The regex that will be evaluated as negative match for the shipping address state code, max size is 5000.
	 * @example ```"A[KLRZ]|C[AOT]"```
	 */
	not_state_code_regex?: string | null
	/** 
	 * The regex that will be evaluated to match the shipping address zip code, max size is 5000.
	 * @example ```"(?i)(JE1|JE2|JE3|JE4|JE5)"```
	 */
	zip_code_regex?: string | null
	/** 
	 * The regex that will be evaluated as negative match for the shipping zip country code, max size is 5000.
	 * @example ```"(?i)(JE1|JE2|JE3)"```
	 */
	not_zip_code_regex?: string | null

	manual_tax_calculator: ManualTaxCalculatorRel

}


interface TaxRuleUpdate extends ResourceUpdate {
	
	/** 
	 * The tax rule internal name.
	 * @example ```"Fixed 22%"```
	 */
	name?: string | null
	/** 
	 * The tax rate for this rule.
	 * @example ```0.22```
	 */
	tax_rate?: number | null
	/** 
	 * Indicates if the freight is taxable.
	 */
	freight_taxable?: boolean | null
	/** 
	 * Indicates if the payment method is taxable.
	 */
	payment_method_taxable?: boolean | null
	/** 
	 * Indicates if gift cards are taxable.
	 */
	gift_card_taxable?: boolean | null
	/** 
	 * Indicates if adjustemnts are taxable.
	 */
	adjustment_taxable?: boolean | null
	/** 
	 * The regex that will be evaluated to match the shipping address country code, max size is 5000.
	 * @example ```"AT|BE|BG|CZ|DK|EE|DE|HU|LV|LT"```
	 */
	country_code_regex?: string | null
	/** 
	 * The regex that will be evaluated as negative match for the shipping address country code, max size is 5000.
	 * @example ```"AT|BE|BG|CZ|DK|EE|DE"```
	 */
	not_country_code_regex?: string | null
	/** 
	 * The regex that will be evaluated to match the shipping address state code, max size is 5000.
	 * @example ```"A[KLRZ]|C[AOT]|D[CE]|FL"```
	 */
	state_code_regex?: string | null
	/** 
	 * The regex that will be evaluated as negative match for the shipping address state code, max size is 5000.
	 * @example ```"A[KLRZ]|C[AOT]"```
	 */
	not_state_code_regex?: string | null
	/** 
	 * The regex that will be evaluated to match the shipping address zip code, max size is 5000.
	 * @example ```"(?i)(JE1|JE2|JE3|JE4|JE5)"```
	 */
	zip_code_regex?: string | null
	/** 
	 * The regex that will be evaluated as negative match for the shipping zip country code, max size is 5000.
	 * @example ```"(?i)(JE1|JE2|JE3)"```
	 */
	not_zip_code_regex?: string | null

	manual_tax_calculator?: ManualTaxCalculatorRel | null

}


class TaxRules extends ApiResource<TaxRule> {

	static readonly TYPE: TaxRuleType = 'tax_rules' as const

	async create(resource: TaxRuleCreate, params?: QueryParamsRetrieve<TaxRule>, options?: ResourcesConfig): Promise<TaxRule> {
		return this.resources.create<TaxRuleCreate, TaxRule>({ ...resource, type: TaxRules.TYPE }, params, options)
	}

	async update(resource: TaxRuleUpdate, params?: QueryParamsRetrieve<TaxRule>, options?: ResourcesConfig): Promise<TaxRule> {
		return this.resources.update<TaxRuleUpdate, TaxRule>({ ...resource, type: TaxRules.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: TaxRules.TYPE } : id, options)
	}

	async manual_tax_calculator(taxRuleId: string | TaxRule, params?: QueryParamsRetrieve<ManualTaxCalculator>, options?: ResourcesConfig): Promise<ManualTaxCalculator> {
		const _taxRuleId = (taxRuleId as TaxRule).id || taxRuleId as string
		return this.resources.fetch<ManualTaxCalculator>({ type: 'manual_tax_calculators' }, `tax_rules/${_taxRuleId}/manual_tax_calculator`, params, options) as unknown as ManualTaxCalculator
	}

	async versions(taxRuleId: string | TaxRule, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _taxRuleId = (taxRuleId as TaxRule).id || taxRuleId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `tax_rules/${_taxRuleId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async event_stores(taxRuleId: string | TaxRule, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _taxRuleId = (taxRuleId as TaxRule).id || taxRuleId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `tax_rules/${_taxRuleId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}


	isTaxRule(resource: any): resource is TaxRule {
		return resource.type && (resource.type === TaxRules.TYPE)
	}


	relationship(id: string | ResourceId | null): TaxRuleRel {
		return super.relationshipOneToOne<TaxRuleRel>(id)
	}

	relationshipToMany(...ids: string[]): TaxRuleRel[] {
		return super.relationshipOneToMany<TaxRuleRel>(...ids)
	}


	type(): TaxRuleType {
		return TaxRules.TYPE
	}

}


export default TaxRules

export type { TaxRule, TaxRuleCreate, TaxRuleUpdate, TaxRuleType }
