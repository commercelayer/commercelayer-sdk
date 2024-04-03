import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Merchant, MerchantType } from './merchants'
import type { PriceList, PriceListType } from './price_lists'
import type { InventoryModel, InventoryModelType } from './inventory_models'
import type { SubscriptionModel, SubscriptionModelType } from './subscription_models'
import type { TaxCalculator, TaxCalculatorType } from './tax_calculators'
import type { CustomerGroup, CustomerGroupType } from './customer_groups'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type MarketType = 'markets'
type MarketRel = ResourceRel & { type: MarketType }
type MerchantRel = ResourceRel & { type: MerchantType }
type PriceListRel = ResourceRel & { type: PriceListType }
type InventoryModelRel = ResourceRel & { type: InventoryModelType }
type SubscriptionModelRel = ResourceRel & { type: SubscriptionModelType }
type TaxCalculatorRel = ResourceRel & { type: TaxCalculatorType }
type CustomerGroupRel = ResourceRel & { type: CustomerGroupType }


export type MarketSort = Pick<Market, 'id' | 'name' | 'code' | 'disabled_at'> & ResourceSort
// export type MarketFilter = Pick<Market, 'id' | 'name' | 'code' | 'disabled_at'> & ResourceFilter


interface Market extends Resource {
	
	readonly type: MarketType

	number?: Nullable<number>
	name: string
	code?: Nullable<string>
	facebook_pixel_id?: Nullable<string>
	checkout_url?: Nullable<string>
	external_prices_url?: Nullable<string>
	external_order_validation_url?: Nullable<string>
	private?: Nullable<boolean>
	disabled_at?: Nullable<string>
	shared_secret: string

	merchant?: Nullable<Merchant>
	price_list?: Nullable<PriceList>
	inventory_model?: Nullable<InventoryModel>
	subscription_model?: Nullable<SubscriptionModel>
	tax_calculator?: Nullable<TaxCalculator>
	customer_group?: Nullable<CustomerGroup>
	attachments?: Nullable<Attachment[]>
	versions?: Nullable<Version[]>

}


interface MarketCreate extends ResourceCreate {
	
	name: string
	code?: Nullable<string>
	facebook_pixel_id?: Nullable<string>
	checkout_url?: Nullable<string>
	external_prices_url?: Nullable<string>
	external_order_validation_url?: Nullable<string>
	_disable?: Nullable<boolean>
	_enable?: Nullable<boolean>

	merchant: MerchantRel
	price_list: PriceListRel
	inventory_model: InventoryModelRel
	subscription_model?: Nullable<SubscriptionModelRel>
	tax_calculator?: Nullable<TaxCalculatorRel>
	customer_group?: Nullable<CustomerGroupRel>

}


interface MarketUpdate extends ResourceUpdate {
	
	name?: Nullable<string>
	code?: Nullable<string>
	facebook_pixel_id?: Nullable<string>
	checkout_url?: Nullable<string>
	external_prices_url?: Nullable<string>
	external_order_validation_url?: Nullable<string>
	_disable?: Nullable<boolean>
	_enable?: Nullable<boolean>

	merchant?: Nullable<MerchantRel>
	price_list?: Nullable<PriceListRel>
	inventory_model?: Nullable<InventoryModelRel>
	subscription_model?: Nullable<SubscriptionModelRel>
	tax_calculator?: Nullable<TaxCalculatorRel>
	customer_group?: Nullable<CustomerGroupRel>

}


class Markets extends ApiResource<Market> {

	static readonly TYPE: MarketType = 'markets' as const

	async create(resource: MarketCreate, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		return this.resources.create<MarketCreate, Market>({ ...resource, type: Markets.TYPE }, params, options)
	}

	async update(resource: MarketUpdate, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		return this.resources.update<MarketUpdate, Market>({ ...resource, type: Markets.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Markets.TYPE } : id, options)
	}

	async merchant(marketId: string | Market, params?: QueryParamsRetrieve<Merchant>, options?: ResourcesConfig): Promise<Merchant> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<Merchant>({ type: 'merchants' }, `markets/${_marketId}/merchant`, params, options) as unknown as Merchant
	}

	async price_list(marketId: string | Market, params?: QueryParamsRetrieve<PriceList>, options?: ResourcesConfig): Promise<PriceList> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<PriceList>({ type: 'price_lists' }, `markets/${_marketId}/price_list`, params, options) as unknown as PriceList
	}

	async inventory_model(marketId: string | Market, params?: QueryParamsRetrieve<InventoryModel>, options?: ResourcesConfig): Promise<InventoryModel> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<InventoryModel>({ type: 'inventory_models' }, `markets/${_marketId}/inventory_model`, params, options) as unknown as InventoryModel
	}

	async subscription_model(marketId: string | Market, params?: QueryParamsRetrieve<SubscriptionModel>, options?: ResourcesConfig): Promise<SubscriptionModel> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<SubscriptionModel>({ type: 'subscription_models' }, `markets/${_marketId}/subscription_model`, params, options) as unknown as SubscriptionModel
	}

	async tax_calculator(marketId: string | Market, params?: QueryParamsRetrieve<TaxCalculator>, options?: ResourcesConfig): Promise<TaxCalculator> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<TaxCalculator>({ type: 'tax_calculators' }, `markets/${_marketId}/tax_calculator`, params, options) as unknown as TaxCalculator
	}

	async customer_group(marketId: string | Market, params?: QueryParamsRetrieve<CustomerGroup>, options?: ResourcesConfig): Promise<CustomerGroup> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<CustomerGroup>({ type: 'customer_groups' }, `markets/${_marketId}/customer_group`, params, options) as unknown as CustomerGroup
	}

	async attachments(marketId: string | Market, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `markets/${_marketId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(marketId: string | Market, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _marketId = (marketId as Market).id || marketId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `markets/${_marketId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _disable(id: string | Market, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		return this.resources.update<MarketUpdate, Market>({ id: (typeof id === 'string')? id: id.id, type: Markets.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | Market, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		return this.resources.update<MarketUpdate, Market>({ id: (typeof id === 'string')? id: id.id, type: Markets.TYPE, _enable: true }, params, options)
	}


	isMarket(resource: any): resource is Market {
		return resource.type && (resource.type === Markets.TYPE)
	}


	relationship(id: string | ResourceId | null): MarketRel {
		return super.relationshipOneToOne<MarketRel>(id)
	}

	relationshipToMany(...ids: string[]): MarketRel[] {
		return super.relationshipOneToMany<MarketRel>(...ids)
	}


	type(): MarketType {
		return Markets.TYPE
	}

}


export default Markets

export type { Market, MarketCreate, MarketUpdate, MarketType }
