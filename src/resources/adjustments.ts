import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Version } from './versions'


type AdjustmentType = 'adjustments'
type AdjustmentRel = ResourceRel & { type: AdjustmentType }


export type AdjustmentSort = Pick<Adjustment, 'id' | 'name' | 'currency_code' | 'amount_cents'> & ResourceSort
// export type AdjustmentFilter = Pick<Adjustment, 'id' | 'name' | 'currency_code' | 'amount_cents'> & ResourceFilter


interface Adjustment extends Resource {
	
	readonly type: AdjustmentType

	/** 
	 * The adjustment name.
	 * @example ```"Additional service"```
	 */
	name: string
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code: string
	/** 
	 * The adjustment amount, in cents.
	 * @example ```1500```
	 */
	amount_cents: number
	/** 
	 * The adjustment amount, float.
	 * @example ```15```
	 */
	amount_float: number
	/** 
	 * The adjustment amount, formatted.
	 * @example ```"€15,00"```
	 */
	formatted_amount: string
	/** 
	 * Indicates if negative adjustment amount is distributed for tax calculation.
	 * @example ```true```
	 */
	distribute_discount?: boolean | null

	versions?: Version[] | null

}


interface AdjustmentCreate extends ResourceCreate {
	
	/** 
	 * The adjustment name.
	 * @example ```"Additional service"```
	 */
	name: string
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code: string
	/** 
	 * The adjustment amount, in cents.
	 * @example ```1500```
	 */
	amount_cents: number
	/** 
	 * Indicates if negative adjustment amount is distributed for tax calculation.
	 * @example ```true```
	 */
	distribute_discount?: boolean | null
	
}


interface AdjustmentUpdate extends ResourceUpdate {
	
	/** 
	 * The adjustment name.
	 * @example ```"Additional service"```
	 */
	name?: string | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * The adjustment amount, in cents.
	 * @example ```1500```
	 */
	amount_cents?: number | null
	/** 
	 * Indicates if negative adjustment amount is distributed for tax calculation.
	 * @example ```true```
	 */
	distribute_discount?: boolean | null
	
}


class Adjustments extends ApiResource<Adjustment> {

	static readonly TYPE: AdjustmentType = 'adjustments' as const

	async create(resource: AdjustmentCreate, params?: QueryParamsRetrieve<Adjustment>, options?: ResourcesConfig): Promise<Adjustment> {
		return this.resources.create<AdjustmentCreate, Adjustment>({ ...resource, type: Adjustments.TYPE }, params, options)
	}

	async update(resource: AdjustmentUpdate, params?: QueryParamsRetrieve<Adjustment>, options?: ResourcesConfig): Promise<Adjustment> {
		return this.resources.update<AdjustmentUpdate, Adjustment>({ ...resource, type: Adjustments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Adjustments.TYPE } : id, options)
	}

	async versions(adjustmentId: string | Adjustment, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _adjustmentId = (adjustmentId as Adjustment).id || adjustmentId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `adjustments/${_adjustmentId}/versions`, params, options) as unknown as ListResponse<Version>
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


const instance = new Adjustments()
export default instance

export type { Adjustment, AdjustmentCreate, AdjustmentUpdate, AdjustmentType }
