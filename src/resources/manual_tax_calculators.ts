import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketSortable } from './markets'
import type { Attachment, AttachmentSortable } from './attachments'
import type { Version, VersionSortable } from './versions'
import type { TaxRule, TaxRuleType, TaxRuleSortable } from './tax_rules'


type ManualTaxCalculatorType = 'manual_tax_calculators'
type ManualTaxCalculatorRel = ResourceRel & { type: ManualTaxCalculatorType }
type TaxRuleRel = ResourceRel & { type: TaxRuleType }


export type ManualTaxCalculatorSortable = Pick<ManualTaxCalculator, 'id' | 'name'> & ResourceSortable
export type ManualTaxCalculatorFilterable = Pick<ManualTaxCalculator, 'id' | 'name'> & ResourceFilterable


interface ManualTaxCalculator extends Resource {
	
	readonly type: ManualTaxCalculatorType

	name: string

	markets?: Market[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null
	tax_rules?: TaxRule[] | null

}


interface ManualTaxCalculatorCreate extends ResourceCreate {
	
	name: string

	tax_rules?: TaxRuleRel[] | null

}


interface ManualTaxCalculatorUpdate extends ResourceUpdate {
	
	name?: string | null

	tax_rules?: TaxRuleRel[] | null

}


class ManualTaxCalculators extends ApiResource<ManualTaxCalculator, ManualTaxCalculatorSortable> {

	static readonly TYPE: ManualTaxCalculatorType = 'manual_tax_calculators' as const

	async create(resource: ManualTaxCalculatorCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualTaxCalculator> {
		return this.resources.create<ManualTaxCalculatorCreate, ManualTaxCalculator>({ ...resource, type: ManualTaxCalculators.TYPE }, params, options)
	}

	async update(resource: ManualTaxCalculatorUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualTaxCalculator> {
		return this.resources.update<ManualTaxCalculatorUpdate, ManualTaxCalculator>({ ...resource, type: ManualTaxCalculators.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ManualTaxCalculators.TYPE } : id, options)
	}

	async markets(manualTaxCalculatorId: string | ManualTaxCalculator, params?: QueryParamsList<MarketSortable>, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _manualTaxCalculatorId = (manualTaxCalculatorId as ManualTaxCalculator).id || manualTaxCalculatorId as string
		return this.resources.fetch<Market, MarketSortable>({ type: 'markets' }, `manual_tax_calculators/${_manualTaxCalculatorId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async attachments(manualTaxCalculatorId: string | ManualTaxCalculator, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _manualTaxCalculatorId = (manualTaxCalculatorId as ManualTaxCalculator).id || manualTaxCalculatorId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `manual_tax_calculators/${_manualTaxCalculatorId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(manualTaxCalculatorId: string | ManualTaxCalculator, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _manualTaxCalculatorId = (manualTaxCalculatorId as ManualTaxCalculator).id || manualTaxCalculatorId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `manual_tax_calculators/${_manualTaxCalculatorId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async tax_rules(manualTaxCalculatorId: string | ManualTaxCalculator, params?: QueryParamsList<TaxRuleSortable>, options?: ResourcesConfig): Promise<ListResponse<TaxRule>> {
		const _manualTaxCalculatorId = (manualTaxCalculatorId as ManualTaxCalculator).id || manualTaxCalculatorId as string
		return this.resources.fetch<TaxRule, TaxRuleSortable>({ type: 'tax_rules' }, `manual_tax_calculators/${_manualTaxCalculatorId}/tax_rules`, params, options) as unknown as ListResponse<TaxRule>
	}


	isManualTaxCalculator(resource: any): resource is ManualTaxCalculator {
		return resource.type && (resource.type === ManualTaxCalculators.TYPE)
	}


	relationship(id: string | ResourceId | null): ManualTaxCalculatorRel {
		return super.relationshipOneToOne<ManualTaxCalculatorRel>(id)
	}

	relationshipToMany(...ids: string[]): ManualTaxCalculatorRel[] {
		return super.relationshipOneToMany<ManualTaxCalculatorRel>(...ids)
	}


	type(): ManualTaxCalculatorType {
		return ManualTaxCalculators.TYPE
	}

}


export default ManualTaxCalculators

export type { ManualTaxCalculator, ManualTaxCalculatorCreate, ManualTaxCalculatorUpdate, ManualTaxCalculatorType }

/*
export const ManualTaxCalculatorsClient = (init: ResourceAdapter | ResourcesInitConfig): ManualTaxCalculators => {
	return new ManualTaxCalculators((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
