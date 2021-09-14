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


type ExternalTaxCalculatorRel = ResourceId & { type: typeof ExternalTaxCalculators.TYPE }
type TaxCategoryRel = ResourceId & { type: 'tax_categories' }


interface ExternalTaxCalculator extends Resource {
	
	name?: string
	tax_calculator_url?: string

	tax_categories?: TaxCategory[]
	markets?: Market[]
	attachments?: Attachment[]

}


interface ExternalTaxCalculatorCreate extends ResourceCreate {
	
	name: string
	tax_calculator_url: string

	tax_categories?: TaxCategoryRel[]

}


interface ExternalTaxCalculatorUpdate extends ResourceUpdate {
	
	name?: string
	tax_calculator_url?: string

	tax_categories?: TaxCategoryRel[]

}


class ExternalTaxCalculators extends ApiResource {

	static readonly TYPE: 'external_tax_calculators' = 'external_tax_calculators'
	// static readonly PATH = 'external_tax_calculators'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ExternalTaxCalculator>> {
		return this.resources.list({ type: ExternalTaxCalculators.TYPE }, params, options)
	}

	async create(resource: ExternalTaxCalculatorCreate, options?: ResourcesConfig): Promise<ExternalTaxCalculator> {
		return this.resources.create(Object.assign(resource, { type: ExternalTaxCalculators.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalTaxCalculator> {
		return this.resources.retrieve<ExternalTaxCalculator>({ type: ExternalTaxCalculators.TYPE, id }, params, options)
	}

	async update(resource: ExternalTaxCalculatorUpdate, options?: ResourcesConfig): Promise<ExternalTaxCalculator> {
		return this.resources.update({ ...resource, type: ExternalTaxCalculators.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ExternalTaxCalculators.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isExternalTaxCalculator(resource: any): resource is ExternalTaxCalculator {
		return resource.type && (resource.type === ExternalTaxCalculators.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(ExternalTaxCalculators.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(ExternalTaxCalculators.TYPE)
	}
	*/

	relationship(id: string | ResourceId): ExternalTaxCalculatorRel {
		return (typeof id === 'string') ? { id, type: ExternalTaxCalculators.TYPE } : {id: id.id, type: ExternalTaxCalculators.TYPE }
	}

}


export default ExternalTaxCalculators

export { ExternalTaxCalculator, ExternalTaxCalculatorCreate, ExternalTaxCalculatorUpdate }
