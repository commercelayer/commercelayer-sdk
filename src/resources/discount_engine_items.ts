import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { DiscountEngine } from './discount_engines'
import type { Order } from './orders'


type DiscountEngineItemType = 'discount_engine_items'
type DiscountEngineItemRel = ResourceRel & { type: DiscountEngineItemType }


export type DiscountEngineItemSort = Pick<DiscountEngineItem, 'id'> & ResourceSort
// export type DiscountEngineItemFilter = Pick<DiscountEngineItem, 'id' | 'body'> & ResourceFilter


interface DiscountEngineItem extends Resource {
	
	readonly type: DiscountEngineItemType

	/** 
	 * The body of the external discount engine response.
	 * @example ```{"foo":"bar"}```
	 */
	body: Record<string, any>

	discount_engine?: DiscountEngine | null
	order?: Order | null

}


class DiscountEngineItems extends ApiResource<DiscountEngineItem> {

	static readonly TYPE: DiscountEngineItemType = 'discount_engine_items' as const

	async discount_engine(discountEngineItemId: string | DiscountEngineItem, params?: QueryParamsRetrieve<DiscountEngine>, options?: ResourcesConfig): Promise<DiscountEngine> {
		const _discountEngineItemId = (discountEngineItemId as DiscountEngineItem).id || discountEngineItemId as string
		return this.resources.fetch<DiscountEngine>({ type: 'discount_engines' }, `discount_engine_items/${_discountEngineItemId}/discount_engine`, params, options) as unknown as DiscountEngine
	}

	async order(discountEngineItemId: string | DiscountEngineItem, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _discountEngineItemId = (discountEngineItemId as DiscountEngineItem).id || discountEngineItemId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `discount_engine_items/${_discountEngineItemId}/order`, params, options) as unknown as Order
	}


	isDiscountEngineItem(resource: any): resource is DiscountEngineItem {
		return resource.type && (resource.type === DiscountEngineItems.TYPE)
	}


	relationship(id: string | ResourceId | null): DiscountEngineItemRel {
		return super.relationshipOneToOne<DiscountEngineItemRel>(id)
	}

	relationshipToMany(...ids: string[]): DiscountEngineItemRel[] {
		return super.relationshipOneToMany<DiscountEngineItemRel>(...ids)
	}


	type(): DiscountEngineItemType {
		return DiscountEngineItems.TYPE
	}

}


const instance = new DiscountEngineItems()
export default instance

export type { DiscountEngineItems, DiscountEngineItem, DiscountEngineItemType }
