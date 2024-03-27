import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Version, VersionSortable } from './versions'


type AdjustmentType = 'adjustments'
type AdjustmentRel = ResourceRel & { type: AdjustmentType }


export type AdjustmentSortable = Pick<Adjustment, 'id' | 'name' | 'currency_code' | 'amount_cents'> & ResourceSortable
export type AdjustmentFilterable = Pick<Adjustment, 'id' | 'name' | 'currency_code' | 'amount_cents'> & ResourceFilterable


interface Adjustment extends Resource {
	
	readonly type: AdjustmentType

	name: string
	currency_code: string
	amount_cents: number
	amount_float: number
	formatted_amount: string
	distribute_discount?: boolean | null

	versions?: Version[] | null

}


interface AdjustmentCreate extends ResourceCreate {
	
	name: string
	currency_code: string
	amount_cents: number
	distribute_discount?: boolean | null
	
}


interface AdjustmentUpdate extends ResourceUpdate {
	
	name?: string | null
	currency_code?: string | null
	amount_cents?: number | null
	distribute_discount?: boolean | null
	
}


class Adjustments extends ApiResource<Adjustment, AdjustmentSortable> {

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

	async versions(adjustmentId: string | Adjustment, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _adjustmentId = (adjustmentId as Adjustment).id || adjustmentId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `adjustments/${_adjustmentId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isAdjustment(resource: any): resource is Adjustment {
		return resource.type && (resource.type === Adjustments.TYPE)
	}


	relationship(id: string | ResourceId | null): AdjustmentRel {
		return super.relationshipOneToOne<AdjustmentRel>(id)
	}

	relationshipToMany(...ids: string[]): AdjustmentRel[] {
		return super.relationshipOneToMany<AdjustmentRel>(...ids)
	}


	type(): AdjustmentType {
		return Adjustments.TYPE
	}

}


export default Adjustments

export type { Adjustment, AdjustmentCreate, AdjustmentUpdate, AdjustmentType }

/*
export const AdjustmentsClient = (init: ResourceAdapter | ResourcesInitConfig): Adjustments => {
	return new Adjustments((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
