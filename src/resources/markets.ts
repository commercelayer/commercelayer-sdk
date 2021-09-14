/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Merchant } from './merchants'
import { PriceList } from './price_lists'
import { InventoryModel } from './inventory_models'
import { TaxCalculator } from './tax_calculators'
import { CustomerGroup } from './customer_groups'
import { Attachment } from './attachments'


type MarketRel = ResourceId & { type: typeof Markets.TYPE }
type MerchantRel = ResourceId & { type: 'merchants' }
type PriceListRel = ResourceId & { type: 'price_lists' }
type InventoryModelRel = ResourceId & { type: 'inventory_models' }
type TaxCalculatorRel = ResourceId & { type: 'tax_calculators' }
type CustomerGroupRel = ResourceId & { type: 'customer_groups' }


interface Market extends Resource {
	
	number?: number
	name?: string
	facebook_pixel_id?: string
	checkout_url?: string
	external_prices_url?: string
	private?: boolean

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

	merchant?: MerchantRel
	price_list?: PriceListRel
	inventory_model?: InventoryModelRel
	tax_calculator?: TaxCalculatorRel
	customer_group?: CustomerGroupRel

}


interface MarketUpdate extends ResourceUpdate {
	
	name?: string
	facebook_pixel_id?: string
	checkout_url?: string
	external_prices_url?: string

	merchant?: MerchantRel
	price_list?: PriceListRel
	inventory_model?: InventoryModelRel
	tax_calculator?: TaxCalculatorRel
	customer_group?: CustomerGroupRel

}


class Markets extends ApiResource {

	static readonly TYPE: 'markets' = 'markets'
	// static readonly PATH = 'markets'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		return this.resources.list({ type: Markets.TYPE }, params, options)
	}

	async create(resource: MarketCreate, options?: ResourcesConfig): Promise<Market> {
		return this.resources.create(Object.assign(resource, { type: Markets.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		return this.resources.retrieve<Market>({ type: Markets.TYPE, id }, params, options)
	}

	async update(resource: MarketUpdate, options?: ResourcesConfig): Promise<Market> {
		return this.resources.update({ ...resource, type: Markets.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Markets.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isMarket(resource: any): resource is Market {
		return resource.type && (resource.type === Markets.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Markets.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Markets.TYPE)
	}
	*/

	relationship(id: string | ResourceId): MarketRel {
		return (typeof id === 'string') ? { id, type: Markets.TYPE } : {id: id.id, type: Markets.TYPE }
	}

}


export default Markets

export { Market, MarketCreate, MarketUpdate }
