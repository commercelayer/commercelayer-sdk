import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { PriceList, PriceListType } from './price_lists'
import type { Event } from './events'
import type { Version } from './versions'


type PriceListSchedulerType = 'price_list_schedulers'
type PriceListSchedulerRel = ResourceRel & { type: PriceListSchedulerType }
type MarketRel = ResourceRel & { type: MarketType }
type PriceListRel = ResourceRel & { type: PriceListType }


export type PriceListSchedulerSort = Pick<PriceListScheduler, 'id' | 'name' | 'starts_at' | 'expires_at' | 'disabled_at'> & ResourceSort
// export type PriceListSchedulerFilter = Pick<PriceListScheduler, 'id' | 'name' | 'starts_at' | 'expires_at' | 'disabled_at'> & ResourceFilter


interface PriceListScheduler extends Resource {
	
	readonly type: PriceListSchedulerType

	/** 
	 * The price list scheduler's internal name.
	 * @example ```"FW SALE 2023"```
	 */
	name: string
	/** 
	 * The activation date/time of this price list scheduler.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	starts_at: string
	/** 
	 * The expiration date/time of this price list scheduler (must be after starts_at).
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at: string
	/** 
	 * Indicates if the price list scheduler is active (enabled and not expired).
	 * @example ```true```
	 */
	active?: boolean | null
	/** 
	 * The price list scheduler status. One of 'disabled', 'expired', 'pending', or 'active'.
	 * @example ```"pending"```
	 */
	status?: 'disabled' | 'expired' | 'pending' | 'active' | null
	/** 
	 * Time at which this resource was disabled.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	disabled_at?: string | null

	market?: Market | null
	price_list?: PriceList | null
	events?: Event[] | null
	versions?: Version[] | null

}


interface PriceListSchedulerCreate extends ResourceCreate {
	
	/** 
	 * The price list scheduler's internal name.
	 * @example ```"FW SALE 2023"```
	 */
	name: string
	/** 
	 * The activation date/time of this price list scheduler.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	starts_at: string
	/** 
	 * The expiration date/time of this price list scheduler (must be after starts_at).
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at: string
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```true```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```true```
	 */
	_enable?: boolean | null

	market: MarketRel
	price_list: PriceListRel

}


interface PriceListSchedulerUpdate extends ResourceUpdate {
	
	/** 
	 * The price list scheduler's internal name.
	 * @example ```"FW SALE 2023"```
	 */
	name?: string | null
	/** 
	 * The activation date/time of this price list scheduler.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	starts_at?: string | null
	/** 
	 * The expiration date/time of this price list scheduler (must be after starts_at).
	 * @example ```"2018-01-02T12:00:00.000Z"```
	 */
	expires_at?: string | null
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```true```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```true```
	 */
	_enable?: boolean | null

	market?: MarketRel | null
	price_list?: PriceListRel | null

}


class PriceListSchedulers extends ApiResource<PriceListScheduler> {

	static readonly TYPE: PriceListSchedulerType = 'price_list_schedulers' as const

	async create(resource: PriceListSchedulerCreate, params?: QueryParamsRetrieve<PriceListScheduler>, options?: ResourcesConfig): Promise<PriceListScheduler> {
		return this.resources.create<PriceListSchedulerCreate, PriceListScheduler>({ ...resource, type: PriceListSchedulers.TYPE }, params, options)
	}

	async update(resource: PriceListSchedulerUpdate, params?: QueryParamsRetrieve<PriceListScheduler>, options?: ResourcesConfig): Promise<PriceListScheduler> {
		return this.resources.update<PriceListSchedulerUpdate, PriceListScheduler>({ ...resource, type: PriceListSchedulers.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: PriceListSchedulers.TYPE } : id, options)
	}

	async market(priceListSchedulerId: string | PriceListScheduler, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _priceListSchedulerId = (priceListSchedulerId as PriceListScheduler).id || priceListSchedulerId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `price_list_schedulers/${_priceListSchedulerId}/market`, params, options) as unknown as Market
	}

	async price_list(priceListSchedulerId: string | PriceListScheduler, params?: QueryParamsRetrieve<PriceList>, options?: ResourcesConfig): Promise<PriceList> {
		const _priceListSchedulerId = (priceListSchedulerId as PriceListScheduler).id || priceListSchedulerId as string
		return this.resources.fetch<PriceList>({ type: 'price_lists' }, `price_list_schedulers/${_priceListSchedulerId}/price_list`, params, options) as unknown as PriceList
	}

	async events(priceListSchedulerId: string | PriceListScheduler, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _priceListSchedulerId = (priceListSchedulerId as PriceListScheduler).id || priceListSchedulerId as string
		return this.resources.fetch<Event>({ type: 'events' }, `price_list_schedulers/${_priceListSchedulerId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(priceListSchedulerId: string | PriceListScheduler, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _priceListSchedulerId = (priceListSchedulerId as PriceListScheduler).id || priceListSchedulerId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `price_list_schedulers/${_priceListSchedulerId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _disable(id: string | PriceListScheduler, params?: QueryParamsRetrieve<PriceListScheduler>, options?: ResourcesConfig): Promise<PriceListScheduler> {
		return this.resources.update<PriceListSchedulerUpdate, PriceListScheduler>({ id: (typeof id === 'string')? id: id.id, type: PriceListSchedulers.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | PriceListScheduler, params?: QueryParamsRetrieve<PriceListScheduler>, options?: ResourcesConfig): Promise<PriceListScheduler> {
		return this.resources.update<PriceListSchedulerUpdate, PriceListScheduler>({ id: (typeof id === 'string')? id: id.id, type: PriceListSchedulers.TYPE, _enable: true }, params, options)
	}


	isPriceListScheduler(resource: any): resource is PriceListScheduler {
		return resource.type && (resource.type === PriceListSchedulers.TYPE)
	}


	relationship(id: string | ResourceId | null): PriceListSchedulerRel {
		return super.relationshipOneToOne<PriceListSchedulerRel>(id)
	}

	relationshipToMany(...ids: string[]): PriceListSchedulerRel[] {
		return super.relationshipOneToMany<PriceListSchedulerRel>(...ids)
	}


	type(): PriceListSchedulerType {
		return PriceListSchedulers.TYPE
	}

}


const instance = new PriceListSchedulers()
export default instance

export type { PriceListScheduler, PriceListSchedulerCreate, PriceListSchedulerUpdate, PriceListSchedulerType }
