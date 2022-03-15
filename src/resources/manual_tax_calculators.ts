import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { TaxCategory } from './tax_categories'
import type { Market } from './markets'
import type { Attachment } from './attachments'
import type { TaxRule } from './tax_rules'


type ManualTaxCalculatorRel = ResourceRel & { type: typeof ManualTaxCalculators.TYPE }
type TaxCategoryRel = ResourceRel & { type: 'tax_categories' }
type TaxRuleRel = ResourceRel & { type: 'tax_rules' }


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
		return this.resources.list<ManualTaxCalculator>({ type: ManualTaxCalculators.TYPE }, params, options)
	}

	async create(resource: ManualTaxCalculatorCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualTaxCalculator> {
		return this.resources.create<ManualTaxCalculatorCreate, ManualTaxCalculator>({ ...resource, type: ManualTaxCalculators.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualTaxCalculator> {
		return this.resources.retrieve<ManualTaxCalculator>({ type: ManualTaxCalculators.TYPE, id }, params, options)
	}

	async update(resource: ManualTaxCalculatorUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualTaxCalculator> {
		return this.resources.update<ManualTaxCalculatorUpdate, ManualTaxCalculator>({ ...resource, type: ManualTaxCalculators.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ManualTaxCalculators.TYPE, id }, options)
	}

	async tax_categories(manualTaxCalculatorId: string | ManualTaxCalculator, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<TaxCategory>> {
		const _manualTaxCalculatorId = (manualTaxCalculatorId as ManualTaxCalculator).id || manualTaxCalculatorId
		return this.resources.fetch<TaxCategory>({ type: 'tax_categories' }, `manual_tax_calculators/${_manualTaxCalculatorId}/tax_categories`, params, options) as unknown as ListResponse<TaxCategory>
	}

	async markets(manualTaxCalculatorId: string | ManualTaxCalculator, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _manualTaxCalculatorId = (manualTaxCalculatorId as ManualTaxCalculator).id || manualTaxCalculatorId
		return this.resources.fetch<Market>({ type: 'markets' }, `manual_tax_calculators/${_manualTaxCalculatorId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async attachments(manualTaxCalculatorId: string | ManualTaxCalculator, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _manualTaxCalculatorId = (manualTaxCalculatorId as ManualTaxCalculator).id || manualTaxCalculatorId
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `manual_tax_calculators/${_manualTaxCalculatorId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async tax_rules(manualTaxCalculatorId: string | ManualTaxCalculator, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<TaxRule>> {
		const _manualTaxCalculatorId = (manualTaxCalculatorId as ManualTaxCalculator).id || manualTaxCalculatorId
		return this.resources.fetch<TaxRule>({ type: 'tax_rules' }, `manual_tax_calculators/${_manualTaxCalculatorId}/tax_rules`, params, options) as unknown as ListResponse<TaxRule>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isManualTaxCalculator(resource: any): resource is ManualTaxCalculator {
		return resource.type && (resource.type === ManualTaxCalculators.TYPE)
	}


	relationship(id: string | ResourceId | null): ManualTaxCalculatorRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ManualTaxCalculators.TYPE } : { id: id.id, type: ManualTaxCalculators.TYPE }
	}


	type(): string {
		return ManualTaxCalculators.TYPE
	}

}


export default ManualTaxCalculators

export { ManualTaxCalculator, ManualTaxCalculatorCreate, ManualTaxCalculatorUpdate }
