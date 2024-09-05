import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsList } from '../query'

import type { Attachment } from './attachments'
import type { Market } from './markets'
import type { Version } from './versions'


type TaxCalculatorType = 'tax_calculators'
type TaxCalculatorRel = ResourceRel & { type: TaxCalculatorType }


export type TaxCalculatorSort = Pick<TaxCalculator, 'id' | 'name'> & ResourceSort
// export type TaxCalculatorFilter = Pick<TaxCalculator, 'id' | 'name'> & ResourceFilter


interface TaxCalculator extends Resource {
	
	readonly type: TaxCalculatorType

	/** 
	 * The tax calculator's internal name.
	 * @example ```"Personal tax calculator"```
	 */
	name: string

	attachments?: Attachment[] | null
	markets?: Market[] | null
	versions?: Version[] | null

}


class TaxCalculators extends ApiResource<TaxCalculator> {

	static readonly TYPE: TaxCalculatorType = 'tax_calculators' as const

	async attachments(taxCalculatorId: string | TaxCalculator, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _taxCalculatorId = (taxCalculatorId as TaxCalculator).id || taxCalculatorId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `tax_calculators/${_taxCalculatorId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async markets(taxCalculatorId: string | TaxCalculator, params?: QueryParamsList<Market>, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _taxCalculatorId = (taxCalculatorId as TaxCalculator).id || taxCalculatorId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `tax_calculators/${_taxCalculatorId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async versions(taxCalculatorId: string | TaxCalculator, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _taxCalculatorId = (taxCalculatorId as TaxCalculator).id || taxCalculatorId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `tax_calculators/${_taxCalculatorId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isTaxCalculator(resource: any): resource is TaxCalculator {
		return resource.type && (resource.type === TaxCalculators.TYPE)
	}


	relationship(id: string | ResourceId | null): TaxCalculatorRel {
		return super.relationshipOneToOne<TaxCalculatorRel>(id)
	}

	relationshipToMany(...ids: string[]): TaxCalculatorRel[] {
		return super.relationshipOneToMany<TaxCalculatorRel>(...ids)
	}


	type(): TaxCalculatorType {
		return TaxCalculators.TYPE
	}

}


export default TaxCalculators

export type { TaxCalculator, TaxCalculatorType }
