import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Merchant, MerchantType } from './merchants'
import type { PriceList, PriceListType } from './price_lists'
import type { InventoryModel, InventoryModelType } from './inventory_models'
import type { TaxCalculator, TaxCalculatorType } from './tax_calculators'
import type { CustomerGroup, CustomerGroupType } from './customer_groups'
import type { Attachment } from './attachments'


type MarketType = 'markets'
type MarketRel = ResourceRel & { type: MarketType }
type MerchantRel = ResourceRel & { type: MerchantType }
type PriceListRel = ResourceRel & { type: PriceListType }
type InventoryModelRel = ResourceRel & { type: InventoryModelType }
type TaxCalculatorRel = ResourceRel & { type: TaxCalculatorType }
type CustomerGroupRel = ResourceRel & { type: CustomerGroupType }


interface Market extends Resource {
	
	readonly type: MarketType

	number?: number
	name: string
	facebook_pixel_id?: string
	checkout_url?: string
	external_prices_url?: string
	external_order_validation_url?: string
	shared_secret: string
	private?: boolean
	disabled_at?: string

	merchant?: Merchant
	price_list?: PriceList
	inventory_model?: InventoryModel
	tax_calculator?: TaxCalculator
	customer_group?: CustomerGroup
	attachments?: Attachment[]

}


interface MarketCreate extends ResourceCreate {
	
	name: string
	facebook_pixel_id?: string
	checkout_url?: string
	external_prices_url?: string
	external_order_validation_url?: string

	merchant: MerchantRel
	price_list: PriceListRel
	inventory_model: InventoryModelRel
	tax_calculator?: TaxCalculatorRel
	customer_group?: CustomerGroupRel

}


interface MarketUpdate extends ResourceUpdate {
	
	name: string
	facebook_pixel_id?: string
	checkout_url?: string
	external_prices_url?: string
	external_order_validation_url?: string
	_disable?: boolean
	_enable?: boolean

	merchant?: MerchantRel
	price_list?: PriceListRel
	inventory_model?: InventoryModelRel
	tax_calculator?: TaxCalculatorRel
	customer_group?: CustomerGroupRel

}


class Markets extends ApiResource<Market> {

	static readonly TYPE: MarketType = 'markets' as const
	// static readonly PATH = 'markets'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		return this.resources.list<Market>({ type: Markets.TYPE }, params, options)
	}

	async create(resource: MarketCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		return this.resources.create<MarketCreate, Market>({ ...resource, type: Markets.TYPE }, params, options)
	}

	async update(resource: MarketUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		return this.resources.update<MarketUpdate, Market>({ ...resource, type: Markets.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Markets.TYPE } : id, options)
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


	isMarket(resource: any): resource is Market {
		return resource.type && (resource.type === Markets.TYPE)
	}


	relationship(id: string | ResourceId | null): MarketRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Markets.TYPE } : { id: id.id, type: Markets.TYPE }
	}


	type(): MarketType {
		return Markets.TYPE
	}

}


export default Markets

export type { Market, MarketCreate, MarketUpdate, MarketType }
