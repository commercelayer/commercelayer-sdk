import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market } from './markets'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Version } from './versions'
import type { TaxRule, TaxRuleType } from './tax_rules'


type ManualTaxCalculatorType = 'manual_tax_calculators'
type ManualTaxCalculatorRel = ResourceRel & { type: ManualTaxCalculatorType }
type TaxRuleRel = ResourceRel & { type: TaxRuleType }


export type ManualTaxCalculatorSort = Pick<ManualTaxCalculator, 'id' | 'name'> & ResourceSort
// export type ManualTaxCalculatorFilter = Pick<ManualTaxCalculator, 'id' | 'name'> & ResourceFilter


interface ManualTaxCalculator extends Resource {
	
	readonly type: ManualTaxCalculatorType

	/** 
	 * The tax calculator's internal name.
	 * @example ```"Personal tax calculator"```
	 */
	name: string

	markets?: Market[] | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	versions?: Version[] | null
	tax_rules?: TaxRule[] | null

}


interface ManualTaxCalculatorCreate extends ResourceCreate {
	
	/** 
	 * The tax calculator's internal name.
	 * @example ```"Personal tax calculator"```
	 */
	name: string

	tax_rules?: TaxRuleRel[] | null

}


interface ManualTaxCalculatorUpdate extends ResourceUpdate {
	
	/** 
	 * The tax calculator's internal name.
	 * @example ```"Personal tax calculator"```
	 */
	name?: string | null

	tax_rules?: TaxRuleRel[] | null

}


class ManualTaxCalculators extends ApiResource<ManualTaxCalculator> {

	static readonly TYPE: ManualTaxCalculatorType = 'manual_tax_calculators' as const

	async create(resource: ManualTaxCalculatorCreate, params?: QueryParamsRetrieve<ManualTaxCalculator>, options?: ResourcesConfig): Promise<ManualTaxCalculator> {
		return this.resources.create<ManualTaxCalculatorCreate, ManualTaxCalculator>({ ...resource, type: ManualTaxCalculators.TYPE }, params, options)
	}

	async update(resource: ManualTaxCalculatorUpdate, params?: QueryParamsRetrieve<ManualTaxCalculator>, options?: ResourcesConfig): Promise<ManualTaxCalculator> {
		return this.resources.update<ManualTaxCalculatorUpdate, ManualTaxCalculator>({ ...resource, type: ManualTaxCalculators.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ManualTaxCalculators.TYPE } : id, options)
	}

	async markets(manualTaxCalculatorId: string | ManualTaxCalculator, params?: QueryParamsList<Market>, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _manualTaxCalculatorId = (manualTaxCalculatorId as ManualTaxCalculator).id || manualTaxCalculatorId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `manual_tax_calculators/${_manualTaxCalculatorId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async attachments(manualTaxCalculatorId: string | ManualTaxCalculator, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _manualTaxCalculatorId = (manualTaxCalculatorId as ManualTaxCalculator).id || manualTaxCalculatorId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `manual_tax_calculators/${_manualTaxCalculatorId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(manualTaxCalculatorId: string | ManualTaxCalculator, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _manualTaxCalculatorId = (manualTaxCalculatorId as ManualTaxCalculator).id || manualTaxCalculatorId as string
		return this.resources.fetch<Event>({ type: 'events' }, `manual_tax_calculators/${_manualTaxCalculatorId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(manualTaxCalculatorId: string | ManualTaxCalculator, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _manualTaxCalculatorId = (manualTaxCalculatorId as ManualTaxCalculator).id || manualTaxCalculatorId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `manual_tax_calculators/${_manualTaxCalculatorId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async tax_rules(manualTaxCalculatorId: string | ManualTaxCalculator, params?: QueryParamsList<TaxRule>, options?: ResourcesConfig): Promise<ListResponse<TaxRule>> {
		const _manualTaxCalculatorId = (manualTaxCalculatorId as ManualTaxCalculator).id || manualTaxCalculatorId as string
		return this.resources.fetch<TaxRule>({ type: 'tax_rules' }, `manual_tax_calculators/${_manualTaxCalculatorId}/tax_rules`, params, options) as unknown as ListResponse<TaxRule>
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


const instance = new ManualTaxCalculators()
export default instance

export type { ManualTaxCalculator, ManualTaxCalculatorCreate, ManualTaxCalculatorUpdate, ManualTaxCalculatorType }
