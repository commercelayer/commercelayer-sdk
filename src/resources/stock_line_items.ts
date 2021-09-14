/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Shipment } from './shipments'
import { LineItem } from './line_items'
import { StockItem } from './stock_items'


type StockLineItemRel = ResourceId & { type: typeof StockLineItems.TYPE }


interface StockLineItem extends Resource {
	
	sku_code?: string
	quantity?: number

	shipment?: Shipment
	line_item?: LineItem
	stock_item?: StockItem

}


type StockLineItemCreate = ResourceCreate


type StockLineItemUpdate = ResourceUpdate


class StockLineItems extends ApiResource {

	static readonly TYPE: 'stock_line_items' = 'stock_line_items'
	// static readonly PATH = 'stock_line_items'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockLineItem>> {
		return this.resources.list({ type: StockLineItems.TYPE }, params, options)
	}

	async create(resource: StockLineItemCreate, options?: ResourcesConfig): Promise<StockLineItem> {
		return this.resources.create(Object.assign(resource, { type: StockLineItems.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLineItem> {
		return this.resources.retrieve<StockLineItem>({ type: StockLineItems.TYPE, id }, params, options)
	}

	async update(resource: StockLineItemUpdate, options?: ResourcesConfig): Promise<StockLineItem> {
		return this.resources.update({ ...resource, type: StockLineItems.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: StockLineItems.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isStockLineItem(resource: any): resource is StockLineItem {
		return resource.type && (resource.type === StockLineItems.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(StockLineItems.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(StockLineItems.TYPE)
	}
	*/

	relationship(id: string | ResourceId): StockLineItemRel {
		return (typeof id === 'string') ? { id, type: StockLineItems.TYPE } : {id: id.id, type: StockLineItems.TYPE }
	}

}


export default StockLineItems

export { StockLineItem, StockLineItemCreate, StockLineItemUpdate }
