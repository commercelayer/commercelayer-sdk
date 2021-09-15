/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { StockLocation } from './stock_locations'
import { Sku } from './skus'
import { Attachment } from './attachments'


type StockItemRel = ResourceId & { type: typeof StockItems.TYPE }
type StockLocationRel = ResourceId & { type: 'stock_locations' }
type SkuRel = ResourceId & { type: 'skus' }


interface StockItem extends Resource {
	
	sku_code?: string
	quantity?: number

	stock_location?: StockLocation
	sku?: Sku
	attachments?: Attachment[]

}


interface StockItemCreate extends ResourceCreate {
	
	sku_code?: string
	quantity: number

	stock_location?: StockLocationRel
	sku?: SkuRel

}


interface StockItemUpdate extends ResourceUpdate {
	
	sku_code?: string
	quantity?: number

	stock_location?: StockLocationRel
	sku?: SkuRel

}


class StockItems extends ApiResource {

	static readonly TYPE: 'stock_items' = 'stock_items'
	// static readonly PATH = 'stock_items'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockItem>> {
		return this.resources.list({ type: StockItems.TYPE }, params, options)
	}

	async create(resource: StockItemCreate, options?: ResourcesConfig): Promise<StockItem> {
		return this.resources.create(Object.assign(resource, { type: StockItems.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockItem> {
		return this.resources.retrieve<StockItem>({ type: StockItems.TYPE, id }, params, options)
	}

	async update(resource: StockItemUpdate, options?: ResourcesConfig): Promise<StockItem> {
		return this.resources.update({ ...resource, type: StockItems.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: StockItems.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isStockItem(resource: any): resource is StockItem {
		return resource.type && (resource.type === StockItems.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(StockItems.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(StockItems.TYPE)
	}
	*/

	relationship(id: string | ResourceId): StockItemRel {
		return (typeof id === 'string') ? { id, type: StockItems.TYPE } : {id: id.id, type: StockItems.TYPE }
	}

}


export default StockItems

export { StockItem, StockItemCreate, StockItemUpdate }
