/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Sku } from './skus'
import { StockLocation } from './stock_locations'
import { Shipment } from './shipments'
import { LineItem } from './line_items'


type StockTransferRel = ResourceId & { type: typeof StockTransfers.TYPE }
type SkuRel = ResourceId & { type: 'skus' }
type StockLocationRel = ResourceId & { type: 'stock_locations' }
type ShipmentRel = ResourceId & { type: 'shipments' }
type LineItemRel = ResourceId & { type: 'line_items' }


interface StockTransfer extends Resource {
	
	sku_code?: string
	status?: string
	quantity?: number
	completed_at?: string
	cancelled_at?: string

	sku?: Sku
	origin_stock_location?: StockLocation
	destination_stock_location?: StockLocation
	shipment?: Shipment
	line_item?: LineItem

}


interface StockTransferCreate extends ResourceCreate {
	
	sku_code?: string
	quantity: number

	sku?: SkuRel
	origin_stock_location?: StockLocationRel
	destination_stock_location?: StockLocationRel
	shipment?: ShipmentRel
	line_item?: LineItemRel

}


interface StockTransferUpdate extends ResourceUpdate {
	
	sku_code?: string
	_upcoming?: boolean
	_picking?: boolean
	_in_transit?: boolean
	_complete?: boolean
	_cancel?: boolean

	sku?: SkuRel
	origin_stock_location?: StockLocationRel
	destination_stock_location?: StockLocationRel

}


class StockTransfers extends ApiResource {

	static readonly TYPE: 'stock_transfers' = 'stock_transfers'
	// static readonly PATH = 'stock_transfers'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockTransfer>> {
		return this.resources.list({ type: StockTransfers.TYPE }, params, options)
	}

	async create(resource: StockTransferCreate, options?: ResourcesConfig): Promise<StockTransfer> {
		return this.resources.create(Object.assign(resource, { type: StockTransfers.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockTransfer> {
		return this.resources.retrieve<StockTransfer>({ type: StockTransfers.TYPE, id }, params, options)
	}

	async update(resource: StockTransferUpdate, options?: ResourcesConfig): Promise<StockTransfer> {
		return this.resources.update({ ...resource, type: StockTransfers.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: StockTransfers.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isStockTransfer(resource: any): resource is StockTransfer {
		return resource.type && (resource.type === StockTransfers.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(StockTransfers.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(StockTransfers.TYPE)
	}
	*/

	relationship(id: string | ResourceId): StockTransferRel {
		return (typeof id === 'string') ? { id, type: StockTransfers.TYPE } : {id: id.id, type: StockTransfers.TYPE }
	}

}


export default StockTransfers

export { StockTransfer, StockTransferCreate, StockTransferUpdate }
