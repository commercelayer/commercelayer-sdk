import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { Customer, CustomerType } from './customers'
import type { Sku, SkuType } from './skus'
import type { Event } from './events'
import type { Version } from './versions'


type InStockSubscriptionType = 'in_stock_subscriptions'
type InStockSubscriptionRel = ResourceRel & { type: InStockSubscriptionType }
type MarketRel = ResourceRel & { type: MarketType }
type CustomerRel = ResourceRel & { type: CustomerType }
type SkuRel = ResourceRel & { type: SkuType }


export type InStockSubscriptionSort = Pick<InStockSubscription, 'id' | 'status' | 'stock_threshold'> & ResourceSort
// export type InStockSubscriptionFilter = Pick<InStockSubscription, 'id' | 'status' | 'stock_threshold'> & ResourceFilter


interface InStockSubscription extends Resource {
	
	readonly type: InStockSubscriptionType

	status: 'active' | 'inactive' | 'notified'
	customer_email?: string | null
	sku_code?: string | null
	stock_threshold?: number | null

	market?: Market | null
	customer?: Customer | null
	sku?: Sku | null
	events?: Event[] | null
	versions?: Version[] | null

}


interface InStockSubscriptionCreate extends ResourceCreate {
	
	customer_email?: string | null
	sku_code?: string | null
	stock_threshold?: number | null

	market: MarketRel
	customer: CustomerRel
	sku: SkuRel

}


interface InStockSubscriptionUpdate extends ResourceUpdate {
	
	sku_code?: string | null
	stock_threshold?: number | null
	_activate?: boolean | null
	_deactivate?: boolean | null

	market?: MarketRel | null
	customer?: CustomerRel | null
	sku?: SkuRel | null

}


class InStockSubscriptions extends ApiResource<InStockSubscription> {

	static readonly TYPE: InStockSubscriptionType = 'in_stock_subscriptions' as const

	async create(resource: InStockSubscriptionCreate, params?: QueryParamsRetrieve<InStockSubscription>, options?: ResourcesConfig): Promise<InStockSubscription> {
		return this.resources.create<InStockSubscriptionCreate, InStockSubscription>({ ...resource, type: InStockSubscriptions.TYPE }, params, options)
	}

	async update(resource: InStockSubscriptionUpdate, params?: QueryParamsRetrieve<InStockSubscription>, options?: ResourcesConfig): Promise<InStockSubscription> {
		return this.resources.update<InStockSubscriptionUpdate, InStockSubscription>({ ...resource, type: InStockSubscriptions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: InStockSubscriptions.TYPE } : id, options)
	}

	async market(inStockSubscriptionId: string | InStockSubscription, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _inStockSubscriptionId = (inStockSubscriptionId as InStockSubscription).id || inStockSubscriptionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `in_stock_subscriptions/${_inStockSubscriptionId}/market`, params, options) as unknown as Market
	}

	async customer(inStockSubscriptionId: string | InStockSubscription, params?: QueryParamsRetrieve<Customer>, options?: ResourcesConfig): Promise<Customer> {
		const _inStockSubscriptionId = (inStockSubscriptionId as InStockSubscription).id || inStockSubscriptionId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `in_stock_subscriptions/${_inStockSubscriptionId}/customer`, params, options) as unknown as Customer
	}

	async sku(inStockSubscriptionId: string | InStockSubscription, params?: QueryParamsRetrieve<Sku>, options?: ResourcesConfig): Promise<Sku> {
		const _inStockSubscriptionId = (inStockSubscriptionId as InStockSubscription).id || inStockSubscriptionId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `in_stock_subscriptions/${_inStockSubscriptionId}/sku`, params, options) as unknown as Sku
	}

	async events(inStockSubscriptionId: string | InStockSubscription, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _inStockSubscriptionId = (inStockSubscriptionId as InStockSubscription).id || inStockSubscriptionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `in_stock_subscriptions/${_inStockSubscriptionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(inStockSubscriptionId: string | InStockSubscription, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _inStockSubscriptionId = (inStockSubscriptionId as InStockSubscription).id || inStockSubscriptionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `in_stock_subscriptions/${_inStockSubscriptionId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _activate(id: string | InStockSubscription, params?: QueryParamsRetrieve<InStockSubscription>, options?: ResourcesConfig): Promise<InStockSubscription> {
		return this.resources.update<InStockSubscriptionUpdate, InStockSubscription>({ id: (typeof id === 'string')? id: id.id, type: InStockSubscriptions.TYPE, _activate: true }, params, options)
	}

	async _deactivate(id: string | InStockSubscription, params?: QueryParamsRetrieve<InStockSubscription>, options?: ResourcesConfig): Promise<InStockSubscription> {
		return this.resources.update<InStockSubscriptionUpdate, InStockSubscription>({ id: (typeof id === 'string')? id: id.id, type: InStockSubscriptions.TYPE, _deactivate: true }, params, options)
	}


	isInStockSubscription(resource: any): resource is InStockSubscription {
		return resource.type && (resource.type === InStockSubscriptions.TYPE)
	}


	relationship(id: string | ResourceId | null): InStockSubscriptionRel {
		return super.relationshipOneToOne<InStockSubscriptionRel>(id)
	}

	relationshipToMany(...ids: string[]): InStockSubscriptionRel[] {
		return super.relationshipOneToMany<InStockSubscriptionRel>(...ids)
	}


	type(): InStockSubscriptionType {
		return InStockSubscriptions.TYPE
	}

}


export default InStockSubscriptions

export type { InStockSubscription, InStockSubscriptionCreate, InStockSubscriptionUpdate, InStockSubscriptionType }
