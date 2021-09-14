/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { PriceList } from './price_lists'
import { Sku } from './skus'
import { Attachment } from './attachments'


type PriceRel = ResourceId & { type: typeof Prices.TYPE }
type PriceListRel = ResourceId & { type: 'price_lists' }
type SkuRel = ResourceId & { type: 'skus' }


interface Price extends Resource {
	
	currency_code?: string
	sku_code?: string
	amount_cents?: number
	amount_float?: number
	formatted_amount?: string
	compare_at_amount_cents?: number
	compare_at_amount_float?: number
	formatted_compare_at_amount?: string

	price_list?: PriceList
	sku?: Sku
	attachments?: Attachment[]

}


interface PriceCreate extends ResourceCreate {
	
	sku_code?: string
	amount_cents: number
	compare_at_amount_cents: number

	price_list?: PriceListRel
	sku?: SkuRel

}


interface PriceUpdate extends ResourceUpdate {
	
	sku_code?: string
	amount_cents?: number
	compare_at_amount_cents?: number

	price_list?: PriceListRel
	sku?: SkuRel

}


class Prices extends ApiResource {

	static readonly TYPE: 'prices' = 'prices'
	// static readonly PATH = 'prices'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Price>> {
		return this.resources.list({ type: Prices.TYPE }, params, options)
	}

	async create(resource: PriceCreate, options?: ResourcesConfig): Promise<Price> {
		return this.resources.create(Object.assign(resource, { type: Prices.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Price> {
		return this.resources.retrieve<Price>({ type: Prices.TYPE, id }, params, options)
	}

	async update(resource: PriceUpdate, options?: ResourcesConfig): Promise<Price> {
		return this.resources.update({ ...resource, type: Prices.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Prices.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPrice(resource: any): resource is Price {
		return resource.type && (resource.type === Prices.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Prices.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Prices.TYPE)
	}
	*/

	relationship(id: string | ResourceId): PriceRel {
		return (typeof id === 'string') ? { id, type: Prices.TYPE } : {id: id.id, type: Prices.TYPE }
	}

}


export default Prices

export { Price, PriceCreate, PriceUpdate }
