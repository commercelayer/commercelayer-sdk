import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsList } from '../query'

import type { Market, MarketSortable } from './markets'
import type { Attachment, AttachmentSortable } from './attachments'
import type { Version, VersionSortable } from './versions'


type TaxCalculatorType = 'tax_calculators'
type TaxCalculatorRel = ResourceRel & { type: TaxCalculatorType }


export type TaxCalculatorSortable = Pick<TaxCalculator, 'id' | 'name'> & ResourceSortable
export type TaxCalculatorFilterable = Pick<TaxCalculator, 'id' | 'name'> & ResourceFilterable


interface TaxCalculator extends Resource {
	
	readonly type: TaxCalculatorType

	name: string

	markets?: Market[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


class TaxCalculators extends ApiResource<TaxCalculator, TaxCalculatorSortable> {

	static readonly TYPE: TaxCalculatorType = 'tax_calculators' as const

	async markets(taxCalculatorId: string | TaxCalculator, params?: QueryParamsList<MarketSortable>, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _taxCalculatorId = (taxCalculatorId as TaxCalculator).id || taxCalculatorId as string
		return this.resources.fetch<Market, MarketSortable>({ type: 'markets' }, `tax_calculators/${_taxCalculatorId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async attachments(taxCalculatorId: string | TaxCalculator, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _taxCalculatorId = (taxCalculatorId as TaxCalculator).id || taxCalculatorId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `tax_calculators/${_taxCalculatorId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(taxCalculatorId: string | TaxCalculator, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _taxCalculatorId = (taxCalculatorId as TaxCalculator).id || taxCalculatorId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `tax_calculators/${_taxCalculatorId}/versions`, params, options) as unknown as ListResponse<Version>
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

/*
export const TaxCalculatorsClient = (init: ResourceAdapter | ResourcesInitConfig): TaxCalculators => {
	return new TaxCalculators((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
