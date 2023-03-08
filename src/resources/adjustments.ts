import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'



type AdjustmentType = 'adjustments'
type AdjustmentRel = ResourceRel & { type: AdjustmentType }


interface Adjustment extends Resource {
	
	readonly type: AdjustmentType

	name?: string
	currency_code?: string
	amount_cents?: number
	amount_float?: number
	formatted_amount?: string
	
}


interface AdjustmentCreate extends ResourceCreate {
	
	name: string
	currency_code: string
	amount_cents: number
	
}


interface AdjustmentUpdate extends ResourceUpdate {
	
	name?: string
	currency_code?: string
	amount_cents?: number
	
}


class Adjustments extends ApiResource<Adjustment> {

	static readonly TYPE: AdjustmentType = 'adjustments' as const
	// static readonly PATH = 'adjustments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Adjustment>> {
		return this.resources.list<Adjustment>({ type: Adjustments.TYPE }, params, options)
	}

	async create(resource: AdjustmentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Adjustment> {
		return this.resources.create<AdjustmentCreate, Adjustment>({ ...resource, type: Adjustments.TYPE }, params, options)
	}

	async update(resource: AdjustmentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Adjustment> {
		return this.resources.update<AdjustmentUpdate, Adjustment>({ ...resource, type: Adjustments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Adjustments.TYPE } : id, options)
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
