import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { TaxCategory } from './tax_categories'
import type { Market } from './markets'
import type { Attachment } from './attachments'


type ExternalTaxCalculatorRel = ResourceRel & { type: typeof ExternalTaxCalculators.TYPE }
type TaxCategoryRel = ResourceRel & { type: 'tax_categories' }


interface ExternalTaxCalculator extends Resource {
	
	name?: string
	tax_calculator_url?: string
	shared_secret?: string

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

	static readonly TYPE: 'external_tax_calculators' = 'external_tax_calculators' as const
	// static readonly PATH = 'external_tax_calculators'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ExternalTaxCalculator>> {
		return this.resources.list<ExternalTaxCalculator>({ type: ExternalTaxCalculators.TYPE }, params, options)
	}

	async create(resource: ExternalTaxCalculatorCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalTaxCalculator> {
		return this.resources.create<ExternalTaxCalculatorCreate, ExternalTaxCalculator>({ ...resource, type: ExternalTaxCalculators.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalTaxCalculator> {
		return this.resources.retrieve<ExternalTaxCalculator>({ type: ExternalTaxCalculators.TYPE, id }, params, options)
	}

	async update(resource: ExternalTaxCalculatorUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalTaxCalculator> {
		return this.resources.update<ExternalTaxCalculatorUpdate, ExternalTaxCalculator>({ ...resource, type: ExternalTaxCalculators.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ExternalTaxCalculators.TYPE, id }, options)
	}

	async tax_categories(externalTaxCalculatorId: string | ExternalTaxCalculator, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<TaxCategory>> {
		const _externalTaxCalculatorId = (externalTaxCalculatorId as ExternalTaxCalculator).id || externalTaxCalculatorId
		return this.resources.fetch<TaxCategory>({ type: 'tax_categories' }, `external_tax_calculators/${_externalTaxCalculatorId}/tax_categories`, params, options) as unknown as ListResponse<TaxCategory>
	}

	async markets(externalTaxCalculatorId: string | ExternalTaxCalculator, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _externalTaxCalculatorId = (externalTaxCalculatorId as ExternalTaxCalculator).id || externalTaxCalculatorId
		return this.resources.fetch<Market>({ type: 'markets' }, `external_tax_calculators/${_externalTaxCalculatorId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async attachments(externalTaxCalculatorId: string | ExternalTaxCalculator, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _externalTaxCalculatorId = (externalTaxCalculatorId as ExternalTaxCalculator).id || externalTaxCalculatorId
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `external_tax_calculators/${_externalTaxCalculatorId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isExternalTaxCalculator(resource: any): resource is ExternalTaxCalculator {
		return resource.type && (resource.type === ExternalTaxCalculators.TYPE)
	}


	relationship(id: string | ResourceId | null): ExternalTaxCalculatorRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ExternalTaxCalculators.TYPE } : { id: id.id, type: ExternalTaxCalculators.TYPE }
	}


	type(): string {
		return ExternalTaxCalculators.TYPE
	}

}


export default ExternalTaxCalculators

export { ExternalTaxCalculator, ExternalTaxCalculatorCreate, ExternalTaxCalculatorUpdate }
