/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { TaxCategory } from './tax_categories'
import { Market } from './markets'
import { Attachment } from './attachments'
import { TaxRule } from './tax_rules'


type ManualTaxCalculatorRel = ResourceId & { type: typeof ManualTaxCalculators.TYPE }
type TaxCategoryRel = ResourceId & { type: 'tax_categories' }
type TaxRuleRel = ResourceId & { type: 'tax_rules' }


interface ManualTaxCalculator extends Resource {
	
	name?: string

	tax_categories?: TaxCategory[]
	markets?: Market[]
	attachments?: Attachment[]
	tax_rules?: TaxRule[]

}


interface ManualTaxCalculatorCreate extends ResourceCreate {
	
	name: string

	tax_categories?: TaxCategoryRel[]
	tax_rules?: TaxRuleRel[]

}


interface ManualTaxCalculatorUpdate extends ResourceUpdate {
	
	name?: string

	tax_categories?: TaxCategoryRel[]
	tax_rules?: TaxRuleRel[]

}


class ManualTaxCalculators extends ApiResource {

	static readonly TYPE: 'manual_tax_calculators' = 'manual_tax_calculators'
	// static readonly PATH = 'manual_tax_calculators'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ManualTaxCalculator>> {
		return this.resources.list({ type: ManualTaxCalculators.TYPE }, params, options)
	}

	async create(resource: ManualTaxCalculatorCreate, options?: ResourcesConfig): Promise<ManualTaxCalculator> {
		return this.resources.create(Object.assign(resource, { type: ManualTaxCalculators.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualTaxCalculator> {
		return this.resources.retrieve<ManualTaxCalculator>({ type: ManualTaxCalculators.TYPE, id }, params, options)
	}

	async update(resource: ManualTaxCalculatorUpdate, options?: ResourcesConfig): Promise<ManualTaxCalculator> {
		return this.resources.update({ ...resource, type: ManualTaxCalculators.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ManualTaxCalculators.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isManualTaxCalculator(resource: any): resource is ManualTaxCalculator {
		return resource.type && (resource.type === ManualTaxCalculators.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(ManualTaxCalculators.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(ManualTaxCalculators.TYPE)
	}
	*/

	relationship(id: string | ResourceId): ManualTaxCalculatorRel {
		return (typeof id === 'string') ? { id, type: ManualTaxCalculators.TYPE } : {id: id.id, type: ManualTaxCalculators.TYPE }
	}

}


export default ManualTaxCalculators

export { ManualTaxCalculator, ManualTaxCalculatorCreate, ManualTaxCalculatorUpdate }
