/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 22-07-2021
 **/

import { ApiResource, Resource, ResourcesConfig, ResourceId } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList } from '../query'

import { TaxCategory } from './tax_categories'
import { Attachment } from './attachments'




interface TaxCalculator extends Resource {
	
	name?: string

	tax_categories?: TaxCategory[]
	attachments?: Attachment[]

}


class TaxCalculators extends ApiResource {

	static readonly TYPE: 'tax_calculators' = 'tax_calculators'
	// static readonly PATH = 'tax_calculators'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<TaxCalculator[]> {
		return this.resources.list({ type: TaxCalculators.TYPE }, params, options)
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

	relationship(id: string): ResourceId & { type: typeof TaxCalculators.TYPE } {
		return { id, type: TaxCalculators.TYPE }
	}

}


export default TaxCalculators

export { TaxCalculator }
