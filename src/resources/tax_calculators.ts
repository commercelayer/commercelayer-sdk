/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { TaxCategory } from './tax_categories'
import { Attachment } from './attachments'


type TaxCalculatorRel = ResourceId & { type: typeof TaxCalculators.TYPE }
type TaxCategoryRel = ResourceId & { type: 'tax_categories' }


interface TaxCalculator extends Resource {
	
	name?: string

	tax_categories?: TaxCategory[]
	attachments?: Attachment[]

}


interface TaxCalculatorCreate extends ResourceCreate {
	
	name: string

	tax_categories?: TaxCategoryRel[]

}


interface TaxCalculatorUpdate extends ResourceUpdate {
	
	name?: string

	tax_categories?: TaxCategoryRel[]

}


class TaxCalculators extends ApiResource {

	static readonly TYPE: 'tax_calculators' = 'tax_calculators'
	// static readonly PATH = 'tax_calculators'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<TaxCalculator>> {
		return this.resources.list({ type: TaxCalculators.TYPE }, params, options)
	}

	async create(resource: TaxCalculatorCreate, options?: ResourcesConfig): Promise<TaxCalculator> {
		return this.resources.create(Object.assign(resource, { type: TaxCalculators.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxCalculator> {
		return this.resources.retrieve<TaxCalculator>({ type: TaxCalculators.TYPE, id }, params, options)
	}

	async update(resource: TaxCalculatorUpdate, options?: ResourcesConfig): Promise<TaxCalculator> {
		return this.resources.update({ ...resource, type: TaxCalculators.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: TaxCalculators.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isTaxCalculator(resource: any): resource is TaxCalculator {
		return resource.type && (resource.type === TaxCalculators.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(TaxCalculators.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(TaxCalculators.TYPE)
	}
	*/

	relationship(id: string | ResourceId): TaxCalculatorRel {
		return (typeof id === 'string') ? { id, type: TaxCalculators.TYPE } : {id: id.id, type: TaxCalculators.TYPE }
	}

}


export default TaxCalculators

export { TaxCalculator, TaxCalculatorCreate, TaxCalculatorUpdate }
