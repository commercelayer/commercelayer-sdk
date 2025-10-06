import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { DiscountEngine } from './discount_engines'
import type { Order } from './orders'
import type { EventStore } from './event_stores'


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
	event_stores?: EventStore[] | null

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

	async event_stores(discountEngineItemId: string | DiscountEngineItem, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _discountEngineItemId = (discountEngineItemId as DiscountEngineItem).id || discountEngineItemId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `discount_engine_items/${_discountEngineItemId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
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


export default DiscountEngineItems

export type { DiscountEngineItem, DiscountEngineItemType }
