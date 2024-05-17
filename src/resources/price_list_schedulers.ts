import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { PriceList, PriceListType } from './price_lists'
import type { Event } from './events'
import type { Version } from './versions'


type PriceListSchedulerType = 'price_list_schedulers'
type PriceListSchedulerRel = ResourceRel & { type: PriceListSchedulerType }
type MarketRel = ResourceRel & { type: MarketType }
type PriceListRel = ResourceRel & { type: PriceListType }


interface PriceListScheduler extends Resource {
	
	readonly type: PriceListSchedulerType

	name: string
	starts_at: string
	expires_at: string
	active?: boolean | null
	status?: 'expired' | 'pending' | 'active' | 'disabled' | null
	disabled_at?: string | null

	market?: Market | null
	price_list?: PriceList | null
	events?: Event[] | null
	versions?: Version[] | null

}


interface PriceListSchedulerCreate extends ResourceCreate {
	
	name: string
	starts_at: string
	expires_at: string
	_disable?: boolean | null
	_enable?: boolean | null

	market: MarketRel
	price_list: PriceListRel

}


interface PriceListSchedulerUpdate extends ResourceUpdate {
	
	name?: string | null
	starts_at?: string | null
	expires_at?: string | null
	_disable?: boolean | null
	_enable?: boolean | null

	market?: MarketRel | null
	price_list?: PriceListRel | null

}


class PriceListSchedulers extends ApiResource<PriceListScheduler> {

	static readonly TYPE: PriceListSchedulerType = 'price_list_schedulers' as const

	async create(resource: PriceListSchedulerCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceListScheduler> {
		return this.resources.create<PriceListSchedulerCreate, PriceListScheduler>({ ...resource, type: PriceListSchedulers.TYPE }, params, options)
	}

	async update(resource: PriceListSchedulerUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceListScheduler> {
		return this.resources.update<PriceListSchedulerUpdate, PriceListScheduler>({ ...resource, type: PriceListSchedulers.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: PriceListSchedulers.TYPE } : id, options)
	}

	async market(priceListSchedulerId: string | PriceListScheduler, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _priceListSchedulerId = (priceListSchedulerId as PriceListScheduler).id || priceListSchedulerId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `price_list_schedulers/${_priceListSchedulerId}/market`, params, options) as unknown as Market
	}

	async price_list(priceListSchedulerId: string | PriceListScheduler, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceList> {
		const _priceListSchedulerId = (priceListSchedulerId as PriceListScheduler).id || priceListSchedulerId as string
		return this.resources.fetch<PriceList>({ type: 'price_lists' }, `price_list_schedulers/${_priceListSchedulerId}/price_list`, params, options) as unknown as PriceList
	}

	async events(priceListSchedulerId: string | PriceListScheduler, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _priceListSchedulerId = (priceListSchedulerId as PriceListScheduler).id || priceListSchedulerId as string
		return this.resources.fetch<Event>({ type: 'events' }, `price_list_schedulers/${_priceListSchedulerId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(priceListSchedulerId: string | PriceListScheduler, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _priceListSchedulerId = (priceListSchedulerId as PriceListScheduler).id || priceListSchedulerId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `price_list_schedulers/${_priceListSchedulerId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _disable(id: string | PriceListScheduler, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceListScheduler> {
		return this.resources.update<PriceListSchedulerUpdate, PriceListScheduler>({ id: (typeof id === 'string')? id: id.id, type: PriceListSchedulers.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | PriceListScheduler, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceListScheduler> {
		return this.resources.update<PriceListSchedulerUpdate, PriceListScheduler>({ id: (typeof id === 'string')? id: id.id, type: PriceListSchedulers.TYPE, _enable: true }, params, options)
	}


	isPriceListScheduler(resource: any): resource is PriceListScheduler {
		return resource.type && (resource.type === PriceListSchedulers.TYPE)
	}


	relationship(id: string | ResourceId | null): PriceListSchedulerRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: PriceListSchedulers.TYPE } : { id: id.id, type: PriceListSchedulers.TYPE }
	}


	type(): PriceListSchedulerType {
		return PriceListSchedulers.TYPE
	}

}


export default PriceListSchedulers

export type { PriceListScheduler, PriceListSchedulerCreate, PriceListSchedulerUpdate, PriceListSchedulerType }
