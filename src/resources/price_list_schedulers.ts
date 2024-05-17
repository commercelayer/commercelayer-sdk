import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Market } from './markets'
import type { PriceList } from './price_lists'
import type { Event } from './events'
import type { Version } from './versions'


type PriceListSchedulerRel = ResourceRel & { type: typeof PriceListSchedulers.TYPE }
type MarketRel = ResourceRel & { type: 'markets' }
type PriceListRel = ResourceRel & { type: 'price_lists' }


interface PriceListScheduler extends Resource {
	
	name?: string
	starts_at?: string
	expires_at?: string
	active?: boolean
	status?: string
	disabled_at?: string

	market?: Market
	price_list?: PriceList
	events?: Event[]
	versions?: Version[]

}


interface PriceListSchedulerCreate extends ResourceCreate {
	
	name: string
	starts_at: string
	expires_at: string
	_disable?: boolean
	_enable?: boolean

	market: MarketRel
	price_list: PriceListRel

}


interface PriceListSchedulerUpdate extends ResourceUpdate {
	
	name?: string
	starts_at?: string
	expires_at?: string
	_disable?: boolean
	_enable?: boolean

	market?: MarketRel
	price_list?: PriceListRel

}


class PriceListSchedulers extends ApiResource {

	static readonly TYPE: 'price_list_schedulers' = 'price_list_schedulers' as const
	// static readonly PATH = 'price_list_schedulers'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PriceListScheduler>> {
		return this.resources.list<PriceListScheduler>({ type: PriceListSchedulers.TYPE }, params, options)
	}

	async create(resource: PriceListSchedulerCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceListScheduler> {
		return this.resources.create<PriceListSchedulerCreate, PriceListScheduler>({ ...resource, type: PriceListSchedulers.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceListScheduler> {
		return this.resources.retrieve<PriceListScheduler>({ type: PriceListSchedulers.TYPE, id }, params, options)
	}

	async update(resource: PriceListSchedulerUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceListScheduler> {
		return this.resources.update<PriceListSchedulerUpdate, PriceListScheduler>({ ...resource, type: PriceListSchedulers.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: PriceListSchedulers.TYPE, id }, options)
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


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPriceListScheduler(resource: any): resource is PriceListScheduler {
		return resource.type && (resource.type === PriceListSchedulers.TYPE)
	}


	relationship(id: string | ResourceId | null): PriceListSchedulerRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: PriceListSchedulers.TYPE } : { id: id.id, type: PriceListSchedulers.TYPE }
	}


	type(): string {
		return PriceListSchedulers.TYPE
	}

}


export default PriceListSchedulers

export { PriceListScheduler, PriceListSchedulerCreate, PriceListSchedulerUpdate }
