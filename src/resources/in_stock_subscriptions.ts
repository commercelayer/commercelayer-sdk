import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Market } from './markets'
import { Customer } from './customers'
import { Sku } from './skus'


type InStockSubscriptionRel = ResourceRel & { type: typeof InStockSubscriptions.TYPE }
type MarketRel = ResourceRel & { type: 'markets' }
type CustomerRel = ResourceRel & { type: 'customers' }
type SkuRel = ResourceRel & { type: 'skus' }


interface InStockSubscription extends Resource {
	
	status?: string
	customer_email?: string
	sku_code?: string
	stock_threshold?: number

	market?: Market
	customer?: Customer
	sku?: Sku

}


interface InStockSubscriptionCreate extends ResourceCreate {
	
	customer_email?: string
	sku_code?: string
	stock_threshold?: number

	market: MarketRel
	customer: CustomerRel
	sku: SkuRel

}


interface InStockSubscriptionUpdate extends ResourceUpdate {
	
	sku_code?: string
	stock_threshold?: number
	_activate?: boolean
	_deactivate?: boolean

	market?: MarketRel
	customer?: CustomerRel
	sku?: SkuRel

}


class InStockSubscriptions extends ApiResource {

	static readonly TYPE: 'in_stock_subscriptions' = 'in_stock_subscriptions'
	// static readonly PATH = 'in_stock_subscriptions'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<InStockSubscription>> {
		return this.resources.list<InStockSubscription>({ type: InStockSubscriptions.TYPE }, params, options)
	}

	async create(resource: InStockSubscriptionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InStockSubscription> {
		return this.resources.create({ ...resource, type: InStockSubscriptions.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InStockSubscription> {
		return this.resources.retrieve<InStockSubscription>({ type: InStockSubscriptions.TYPE, id }, params, options)
	}

	async update(resource: InStockSubscriptionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InStockSubscription> {
		return this.resources.update({ ...resource, type: InStockSubscriptions.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: InStockSubscriptions.TYPE, id }, options)
	}

	async market(inStockSubscriptionId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		return this.resources.fetch<Market>({ type: 'markets' }, `in_stock_subscriptions/${inStockSubscriptionId}/market`, params, options) as unknown as Market
	}

	async customer(inStockSubscriptionId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		return this.resources.fetch<Customer>({ type: 'customers' }, `in_stock_subscriptions/${inStockSubscriptionId}/customer`, params, options) as unknown as Customer
	}

	async sku(inStockSubscriptionId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Sku> {
		return this.resources.fetch<Sku>({ type: 'skus' }, `in_stock_subscriptions/${inStockSubscriptionId}/sku`, params, options) as unknown as Sku
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isInStockSubscription(resource: any): resource is InStockSubscription {
		return resource.type && (resource.type === InStockSubscriptions.TYPE)
	}


	relationship(id: string | ResourceId | null): InStockSubscriptionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: InStockSubscriptions.TYPE } : { id: id.id, type: InStockSubscriptions.TYPE }
	}


	type(): string {
		return InStockSubscriptions.TYPE
	}

}


export default InStockSubscriptions

export { InStockSubscription, InStockSubscriptionCreate, InStockSubscriptionUpdate }
