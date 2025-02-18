import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { Merchant, MerchantType } from './merchants'
import type { StockLocation, StockLocationType } from './stock_locations'
import type { Order } from './orders'
import type { PaymentMethod } from './payment_methods'
import type { Event } from './events'
import type { Version } from './versions'


type StoreType = 'stores'
type StoreRel = ResourceRel & { type: StoreType }
type MarketRel = ResourceRel & { type: MarketType }
type MerchantRel = ResourceRel & { type: MerchantType }
type StockLocationRel = ResourceRel & { type: StockLocationType }


export type StoreSort = Pick<Store, 'id' | 'name' | 'code'> & ResourceSort
// export type StoreFilter = Pick<Store, 'id' | 'name' | 'code'> & ResourceFilter


interface Store extends Resource {
	
	readonly type: StoreType

	/** 
	 * The store's internal name.
	 * @example ```"Rome Shop"```
	 */
	name: string
	/** 
	 * A string that you can use to identify the store (must be unique within the environment).
	 * @example ```"europe1"```
	 */
	code?: string | null

	market?: Market | null
	merchant?: Merchant | null
	stock_location?: StockLocation | null
	orders?: Order[] | null
	payment_methods?: PaymentMethod[] | null
	events?: Event[] | null
	versions?: Version[] | null

}


interface StoreCreate extends ResourceCreate {
	
	/** 
	 * The store's internal name.
	 * @example ```"Rome Shop"```
	 */
	name: string
	/** 
	 * A string that you can use to identify the store (must be unique within the environment).
	 * @example ```"europe1"```
	 */
	code?: string | null

	market: MarketRel
	merchant?: MerchantRel | null
	stock_location?: StockLocationRel | null

}


interface StoreUpdate extends ResourceUpdate {
	
	/** 
	 * The store's internal name.
	 * @example ```"Rome Shop"```
	 */
	name?: string | null
	/** 
	 * A string that you can use to identify the store (must be unique within the environment).
	 * @example ```"europe1"```
	 */
	code?: string | null

	market?: MarketRel | null
	merchant?: MerchantRel | null
	stock_location?: StockLocationRel | null

}


class Stores extends ApiResource<Store> {

	static readonly TYPE: StoreType = 'stores' as const

	async create(resource: StoreCreate, params?: QueryParamsRetrieve<Store>, options?: ResourcesConfig): Promise<Store> {
		return this.resources.create<StoreCreate, Store>({ ...resource, type: Stores.TYPE }, params, options)
	}

	async update(resource: StoreUpdate, params?: QueryParamsRetrieve<Store>, options?: ResourcesConfig): Promise<Store> {
		return this.resources.update<StoreUpdate, Store>({ ...resource, type: Stores.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Stores.TYPE } : id, options)
	}

	async market(storeId: string | Store, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _storeId = (storeId as Store).id || storeId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `stores/${_storeId}/market`, params, options) as unknown as Market
	}

	async merchant(storeId: string | Store, params?: QueryParamsRetrieve<Merchant>, options?: ResourcesConfig): Promise<Merchant> {
		const _storeId = (storeId as Store).id || storeId as string
		return this.resources.fetch<Merchant>({ type: 'merchants' }, `stores/${_storeId}/merchant`, params, options) as unknown as Merchant
	}

	async stock_location(storeId: string | Store, params?: QueryParamsRetrieve<StockLocation>, options?: ResourcesConfig): Promise<StockLocation> {
		const _storeId = (storeId as Store).id || storeId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `stores/${_storeId}/stock_location`, params, options) as unknown as StockLocation
	}

	async orders(storeId: string | Store, params?: QueryParamsList<Order>, options?: ResourcesConfig): Promise<ListResponse<Order>> {
		const _storeId = (storeId as Store).id || storeId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `stores/${_storeId}/orders`, params, options) as unknown as ListResponse<Order>
	}

	async payment_methods(storeId: string | Store, params?: QueryParamsList<PaymentMethod>, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _storeId = (storeId as Store).id || storeId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `stores/${_storeId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async events(storeId: string | Store, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _storeId = (storeId as Store).id || storeId as string
		return this.resources.fetch<Event>({ type: 'events' }, `stores/${_storeId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(storeId: string | Store, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _storeId = (storeId as Store).id || storeId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `stores/${_storeId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isStore(resource: any): resource is Store {
		return resource.type && (resource.type === Stores.TYPE)
	}


	relationship(id: string | ResourceId | null): StoreRel {
		return super.relationshipOneToOne<StoreRel>(id)
	}

	relationshipToMany(...ids: string[]): StoreRel[] {
		return super.relationshipOneToMany<StoreRel>(...ids)
	}


	type(): StoreType {
		return Stores.TYPE
	}

}


export default Stores

export type { Store, StoreCreate, StoreUpdate, StoreType }
