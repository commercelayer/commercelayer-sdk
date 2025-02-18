import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsList } from '../query'

import type { Market } from './markets'
import type { DiscountEngineItem } from './discount_engine_items'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type DiscountEngineType = 'discount_engines'
type DiscountEngineRel = ResourceRel & { type: DiscountEngineType }


export type DiscountEngineSort = Pick<DiscountEngine, 'id' | 'name'> & ResourceSort
// export type DiscountEngineFilter = Pick<DiscountEngine, 'id' | 'name'> & ResourceFilter


interface DiscountEngine extends Resource {
	
	readonly type: DiscountEngineType

	/** 
	 * The discount engine's internal name.
	 * @example ```"Personal discount engine"```
	 */
	name: string
	/** 
	 * Indicates if the discount engine manages both promotions and gift cards application at once.
	 */
	manage_gift_cards?: boolean | null

	markets?: Market[] | null
	discount_engine_items?: DiscountEngineItem[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


class DiscountEngines extends ApiResource<DiscountEngine> {

	static readonly TYPE: DiscountEngineType = 'discount_engines' as const

	async markets(discountEngineId: string | DiscountEngine, params?: QueryParamsList<Market>, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _discountEngineId = (discountEngineId as DiscountEngine).id || discountEngineId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `discount_engines/${_discountEngineId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async discount_engine_items(discountEngineId: string | DiscountEngine, params?: QueryParamsList<DiscountEngineItem>, options?: ResourcesConfig): Promise<ListResponse<DiscountEngineItem>> {
		const _discountEngineId = (discountEngineId as DiscountEngine).id || discountEngineId as string
		return this.resources.fetch<DiscountEngineItem>({ type: 'discount_engine_items' }, `discount_engines/${_discountEngineId}/discount_engine_items`, params, options) as unknown as ListResponse<DiscountEngineItem>
	}

	async attachments(discountEngineId: string | DiscountEngine, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _discountEngineId = (discountEngineId as DiscountEngine).id || discountEngineId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `discount_engines/${_discountEngineId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(discountEngineId: string | DiscountEngine, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _discountEngineId = (discountEngineId as DiscountEngine).id || discountEngineId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `discount_engines/${_discountEngineId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isDiscountEngine(resource: any): resource is DiscountEngine {
		return resource.type && (resource.type === DiscountEngines.TYPE)
	}


	relationship(id: string | ResourceId | null): DiscountEngineRel {
		return super.relationshipOneToOne<DiscountEngineRel>(id)
	}

	relationshipToMany(...ids: string[]): DiscountEngineRel[] {
		return super.relationshipOneToMany<DiscountEngineRel>(...ids)
	}


	type(): DiscountEngineType {
		return DiscountEngines.TYPE
	}

}


export default DiscountEngines

export type { DiscountEngine, DiscountEngineType }
