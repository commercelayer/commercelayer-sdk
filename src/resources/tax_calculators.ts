import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Market } from './markets'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type TaxCalculatorRel = ResourceRel & { type: typeof TaxCalculators.TYPE }


interface TaxCalculator extends Resource {
	
	name?: string

	markets?: Market[]
	attachments?: Attachment[]
	versions?: Version[]

}


class TaxCalculators extends ApiResource {

	static readonly TYPE: 'tax_calculators' = 'tax_calculators' as const
	// static readonly PATH = 'tax_calculators'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<TaxCalculator>> {
		return this.resources.list<TaxCalculator>({ type: TaxCalculators.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxCalculator> {
		return this.resources.retrieve<TaxCalculator>({ type: TaxCalculators.TYPE, id }, params, options)
	}

	async markets(taxCalculatorId: string | TaxCalculator, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _taxCalculatorId = (taxCalculatorId as TaxCalculator).id || taxCalculatorId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `tax_calculators/${_taxCalculatorId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async attachments(taxCalculatorId: string | TaxCalculator, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _taxCalculatorId = (taxCalculatorId as TaxCalculator).id || taxCalculatorId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `tax_calculators/${_taxCalculatorId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(taxCalculatorId: string | TaxCalculator, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _taxCalculatorId = (taxCalculatorId as TaxCalculator).id || taxCalculatorId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `tax_calculators/${_taxCalculatorId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isTaxCalculator(resource: any): resource is TaxCalculator {
		return resource.type && (resource.type === TaxCalculators.TYPE)
	}


	relationship(id: string | ResourceId | null): TaxCalculatorRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: TaxCalculators.TYPE } : { id: id.id, type: TaxCalculators.TYPE }
	}


	type(): string {
		return TaxCalculators.TYPE
	}

}


export default TaxCalculators

export { TaxCalculator }
