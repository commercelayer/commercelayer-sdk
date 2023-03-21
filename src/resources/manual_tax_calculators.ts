import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market } from './markets'
import type { Attachment } from './attachments'
import type { TaxRule, TaxRuleType } from './tax_rules'


type ManualTaxCalculatorType = 'manual_tax_calculators'
type ManualTaxCalculatorRel = ResourceRel & { type: ManualTaxCalculatorType }
type TaxRuleRel = ResourceRel & { type: TaxRuleType }


interface ManualTaxCalculator extends Resource {
	
	readonly type: ManualTaxCalculatorType

	name: string

	markets?: Market[]
	attachments?: Attachment[]
	tax_rules?: TaxRule[]

}


interface ManualTaxCalculatorCreate extends ResourceCreate {
	
	name: string

	tax_rules?: TaxRuleRel[]

}


interface ManualTaxCalculatorUpdate extends ResourceUpdate {
	
	name: string

	tax_rules?: TaxRuleRel[]

}


class ManualTaxCalculators extends ApiResource<ManualTaxCalculator> {

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

	async markets(manualTaxCalculatorId: string | ManualTaxCalculator, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _manualTaxCalculatorId = (manualTaxCalculatorId as ManualTaxCalculator).id || manualTaxCalculatorId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `manual_tax_calculators/${_manualTaxCalculatorId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async attachments(manualTaxCalculatorId: string | ManualTaxCalculator, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _manualTaxCalculatorId = (manualTaxCalculatorId as ManualTaxCalculator).id || manualTaxCalculatorId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `manual_tax_calculators/${_manualTaxCalculatorId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async tax_rules(manualTaxCalculatorId: string | ManualTaxCalculator, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<TaxRule>> {
		const _manualTaxCalculatorId = (manualTaxCalculatorId as ManualTaxCalculator).id || manualTaxCalculatorId as string
		return this.resources.fetch<TaxRule>({ type: 'tax_rules' }, `manual_tax_calculators/${_manualTaxCalculatorId}/tax_rules`, params, options) as unknown as ListResponse<TaxRule>
	}


	isManualTaxCalculator(resource: any): resource is ManualTaxCalculator {
		return resource.type && (resource.type === ManualTaxCalculators.TYPE)
	}


	relationship(id: string | ResourceId | null): ManualTaxCalculatorRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ManualTaxCalculators.TYPE } : { id: id.id, type: ManualTaxCalculators.TYPE }
	}


	type(): ManualTaxCalculatorType {
		return ManualTaxCalculators.TYPE
	}

}


export default ManualTaxCalculators

export type { ManualTaxCalculator, ManualTaxCalculatorCreate, ManualTaxCalculatorUpdate, ManualTaxCalculatorType }
