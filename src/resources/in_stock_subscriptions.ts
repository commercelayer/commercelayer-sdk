import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { Customer, CustomerType } from './customers'
import type { Sku, SkuType } from './skus'
import type { Event } from './events'


type InStockSubscriptionType = 'in_stock_subscriptions'
type InStockSubscriptionRel = ResourceRel & { type: InStockSubscriptionType }
type MarketRel = ResourceRel & { type: MarketType }
type CustomerRel = ResourceRel & { type: CustomerType }
type SkuRel = ResourceRel & { type: SkuType }


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

	async create(resource: InStockSubscriptionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InStockSubscription> {
		return this.resources.create<InStockSubscriptionCreate, InStockSubscription>({ ...resource, type: InStockSubscriptions.TYPE }, params, options)
	}

	async update(resource: InStockSubscriptionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InStockSubscription> {
		return this.resources.update<InStockSubscriptionUpdate, InStockSubscription>({ ...resource, type: InStockSubscriptions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: InStockSubscriptions.TYPE } : id, options)
	}

	async market(inStockSubscriptionId: string | InStockSubscription, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _inStockSubscriptionId = (inStockSubscriptionId as InStockSubscription).id || inStockSubscriptionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `in_stock_subscriptions/${_inStockSubscriptionId}/market`, params, options) as unknown as Market
	}

	async customer(inStockSubscriptionId: string | InStockSubscription, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		const _inStockSubscriptionId = (inStockSubscriptionId as InStockSubscription).id || inStockSubscriptionId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `in_stock_subscriptions/${_inStockSubscriptionId}/customer`, params, options) as unknown as Customer
	}

	async sku(inStockSubscriptionId: string | InStockSubscription, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku> {
		const _inStockSubscriptionId = (inStockSubscriptionId as InStockSubscription).id || inStockSubscriptionId as string
		return this.resources.fetch<Sku>({ type: 'skus' }, `in_stock_subscriptions/${_inStockSubscriptionId}/sku`, params, options) as unknown as Sku
	}

	async events(inStockSubscriptionId: string | InStockSubscription, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _inStockSubscriptionId = (inStockSubscriptionId as InStockSubscription).id || inStockSubscriptionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `in_stock_subscriptions/${_inStockSubscriptionId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isInStockSubscription(resource: any): resource is InStockSubscription {
		return resource.type && (resource.type === InStockSubscriptions.TYPE)
	}


	relationship(id: string | ResourceId | null): InStockSubscriptionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: InStockSubscriptions.TYPE } : { id: id.id, type: InStockSubscriptions.TYPE }
	}


	type(): InStockSubscriptionType {
		return InStockSubscriptions.TYPE
	}

}


export default InStockSubscriptions

export type { InStockSubscription, InStockSubscriptionCreate, InStockSubscriptionUpdate, InStockSubscriptionType }
