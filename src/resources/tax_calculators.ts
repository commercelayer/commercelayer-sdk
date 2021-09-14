/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList } from '../query'

import { TaxCategory } from './tax_categories'
import { Market } from './markets'
import { Attachment } from './attachments'


type TaxCalculatorRel = ResourceId & { type: typeof TaxCalculators.TYPE }


interface TaxCalculator extends Resource {
	
	name?: string

	tax_categories?: TaxCategory[]
	markets?: Market[]
	attachments?: Attachment[]

}


class TaxCalculators extends ApiResource {

	static readonly TYPE: 'tax_calculators' = 'tax_calculators'
	// static readonly PATH = 'tax_calculators'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<TaxCalculator>> {
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

	relationship(id: string | ResourceId): TaxCalculatorRel {
		return (typeof id === 'string') ? { id, type: TaxCalculators.TYPE } : {id: id.id, type: TaxCalculators.TYPE }
	}

}


export default TaxCalculators

export { TaxCalculator }
