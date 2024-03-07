import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Merchant } from './merchants'
import type { PriceList } from './price_lists'
import type { InventoryModel } from './inventory_models'
import type { SubscriptionModel } from './subscription_models'
import type { TaxCalculator } from './tax_calculators'
import type { CustomerGroup } from './customer_groups'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type MarketRel = ResourceRel & { type: typeof Markets.TYPE }
type MerchantRel = ResourceRel & { type: 'merchants' }
type PriceListRel = ResourceRel & { type: 'price_lists' }
type InventoryModelRel = ResourceRel & { type: 'inventory_models' }
type SubscriptionModelRel = ResourceRel & { type: 'subscription_models' }
type TaxCalculatorRel = ResourceRel & { type: 'tax_calculators' }
type CustomerGroupRel = ResourceRel & { type: 'customer_groups' }


interface Market extends Resource {
	
	number?: number
	name?: string
	code?: string
	facebook_pixel_id?: string
	checkout_url?: string
	external_prices_url?: string
	external_order_validation_url?: string
	private?: boolean
	disabled_at?: string
	shared_secret?: string

	merchant?: Merchant
	price_list?: PriceList
	inventory_model?: InventoryModel
	subscription_model?: SubscriptionModel
	tax_calculator?: TaxCalculator
	customer_group?: CustomerGroup
	attachments?: Attachment[]
	versions?: Version[]

}


interface MarketCreate extends ResourceCreate {
	
	name: string
	code?: string
	facebook_pixel_id?: string
	checkout_url?: string
	external_prices_url?: string
	external_order_validation_url?: string
	_disable?: boolean
	_enable?: boolean

	merchant: MerchantRel
	price_list: PriceListRel
	inventory_model: InventoryModelRel
	subscription_model?: SubscriptionModelRel
	tax_calculator?: TaxCalculatorRel
	customer_group?: CustomerGroupRel

}


interface MarketUpdate extends ResourceUpdate {
	
	name?: string
	code?: string
	facebook_pixel_id?: string
	checkout_url?: string
	external_prices_url?: string
	external_order_validation_url?: string
	_disable?: boolean
	_enable?: boolean

	merchant?: MerchantRel
	price_list?: PriceListRel
	inventory_model?: InventoryModelRel
	subscription_model?: SubscriptionModelRel
	tax_calculator?: TaxCalculatorRel
	customer_group?: CustomerGroupRel

}


class Markets extends ApiResource {

	static readonly TYPE: 'markets' = 'markets' as const
	// static readonly PATH = 'markets'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		return this.resources.list<Market>({ type: Markets.TYPE }, params, options)
	}

	async create(resource: MarketCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		return this.resources.create<MarketCreate, Market>({ ...resource, type: Markets.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		return this.resources.retrieve<Market>({ type: Markets.TYPE, id }, params, options)
	}

	async update(resource: MarketUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		return this.resources.update<MarketUpdate, Market>({ ...resource, type: Markets.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Markets.TYPE, id }, options)
	}

	async merchant(marketId: string | Market, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Merchant> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<Merchant>({ type: 'merchants' }, `markets/${_marketId}/merchant`, params, options) as unknown as Merchant
	}

	async price_list(marketId: string | Market, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceList> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<PriceList>({ type: 'price_lists' }, `markets/${_marketId}/price_list`, params, options) as unknown as PriceList
	}

	async inventory_model(marketId: string | Market, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryModel> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<InventoryModel>({ type: 'inventory_models' }, `markets/${_marketId}/inventory_model`, params, options) as unknown as InventoryModel
	}

	async subscription_model(marketId: string | Market, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SubscriptionModel> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<SubscriptionModel>({ type: 'subscription_models' }, `markets/${_marketId}/subscription_model`, params, options) as unknown as SubscriptionModel
	}

	async tax_calculator(marketId: string | Market, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxCalculator> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<TaxCalculator>({ type: 'tax_calculators' }, `markets/${_marketId}/tax_calculator`, params, options) as unknown as TaxCalculator
	}

	async customer_group(marketId: string | Market, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerGroup> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<CustomerGroup>({ type: 'customer_groups' }, `markets/${_marketId}/customer_group`, params, options) as unknown as CustomerGroup
	}

	async attachments(marketId: string | Market, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `markets/${_marketId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(marketId: string | Market, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `markets/${_marketId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isMarket(resource: any): resource is Market {
		return resource.type && (resource.type === Markets.TYPE)
	}


	relationship(id: string | ResourceId | null): MarketRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Markets.TYPE } : { id: id.id, type: Markets.TYPE }
	}


	type(): string {
		return Markets.TYPE
	}

}


export default Markets

export { Market, MarketCreate, MarketUpdate }
