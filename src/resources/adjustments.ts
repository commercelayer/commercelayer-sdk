import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Version } from './versions'


type AdjustmentType = 'adjustments'
type AdjustmentRel = ResourceRel & { type: AdjustmentType }


interface Adjustment extends Resource {
	
	readonly type: AdjustmentType

	name: string
	currency_code: string
	amount_cents: number
	amount_float: number
	formatted_amount: string

	versions?: Version[] | null

}


interface AdjustmentCreate extends ResourceCreate {
	
	name: string
	currency_code: string
	amount_cents: number
	
}


interface AdjustmentUpdate extends ResourceUpdate {
	
	name?: string | null
	currency_code?: string | null
	amount_cents?: number | null
	
}


class Adjustments extends ApiResource<Adjustment> {

	static readonly TYPE: AdjustmentType = 'adjustments' as const

	async create(resource: AdjustmentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Adjustment> {
		return this.resources.create<AdjustmentCreate, Adjustment>({ ...resource, type: Adjustments.TYPE }, params, options)
	}

	async update(resource: AdjustmentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Adjustment> {
		return this.resources.update<AdjustmentUpdate, Adjustment>({ ...resource, type: Adjustments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Adjustments.TYPE } : id, options)
	}

	async versions(adjustmentId: string | Adjustment, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _adjustmentId = (adjustmentId as Adjustment).id || adjustmentId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `adjustments/${_adjustmentId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isAdjustment(resource: any): resource is Adjustment {
		return resource.type && (resource.type === Adjustments.TYPE)
	}


	relationship(id: string | ResourceId | null): AdjustmentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Adjustments.TYPE } : { id: id.id, type: Adjustments.TYPE }
	}


	type(): AdjustmentType {
		return Adjustments.TYPE
	}

}


export default Adjustments

export type { Adjustment, AdjustmentCreate, AdjustmentUpdate, AdjustmentType }
