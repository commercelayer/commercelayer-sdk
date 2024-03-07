import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Version } from './versions'


type AdjustmentRel = ResourceRel & { type: typeof Adjustments.TYPE }


interface Adjustment extends Resource {
	
	name?: string
	currency_code?: string
	amount_cents?: number
	amount_float?: number
	formatted_amount?: string
	distribute_discount?: boolean

	versions?: Version[]

}


interface AdjustmentCreate extends ResourceCreate {
	
	name: string
	currency_code: string
	amount_cents: number
	distribute_discount?: boolean
	
}


interface AdjustmentUpdate extends ResourceUpdate {
	
	name?: string
	currency_code?: string
	amount_cents?: number
	distribute_discount?: boolean
	
}


class Adjustments extends ApiResource {

	static readonly TYPE: 'adjustments' = 'adjustments' as const
	// static readonly PATH = 'adjustments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Adjustment>> {
		return this.resources.list<Adjustment>({ type: Adjustments.TYPE }, params, options)
	}

	async create(resource: AdjustmentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Adjustment> {
		return this.resources.create<AdjustmentCreate, Adjustment>({ ...resource, type: Adjustments.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Adjustment> {
		return this.resources.retrieve<Adjustment>({ type: Adjustments.TYPE, id }, params, options)
	}

	async update(resource: AdjustmentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Adjustment> {
		return this.resources.update<AdjustmentUpdate, Adjustment>({ ...resource, type: Adjustments.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Adjustments.TYPE, id }, options)
	}

	async versions(adjustmentId: string | Adjustment, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _adjustmentId = (adjustmentId as Adjustment).id || adjustmentId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `adjustments/${_adjustmentId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isAdjustment(resource: any): resource is Adjustment {
		return resource.type && (resource.type === Adjustments.TYPE)
	}


	relationship(id: string | ResourceId | null): AdjustmentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Adjustments.TYPE } : { id: id.id, type: Adjustments.TYPE }
	}


	type(): string {
		return Adjustments.TYPE
	}

}


export default Adjustments

export { Adjustment, AdjustmentCreate, AdjustmentUpdate }
