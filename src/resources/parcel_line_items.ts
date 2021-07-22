/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 21-07-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, DocWithData, ResourceId } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Parcel } from './parcels'
import { StockLineItem } from './stock_line_items'


type ParcelRel = ResourceId & { type: 'parcels' }
type StockLineItemRel = ResourceId & { type: 'stock_line_items' }


interface ParcelLineItem extends Resource {
	
	sku_code?: string
	quantity?: number

	parcel?: Parcel
	stock_line_item?: StockLineItem
	/**
	* @deprecated The field should not be used
	*/
	shipment_line_item?: object

}


interface ParcelLineItemCreate extends ResourceCreate {
	
	sku_code?: string
	quantity: number

	parcel?: ParcelRel
	stock_line_item?: StockLineItemRel
	/**
	* @deprecated The field should not be used
	*/
	shipment_line_item?: object

}


interface ParcelLineItemUpdate extends ResourceUpdate {
	
	
}


class ParcelLineItems extends ApiResource {

	static readonly TYPE: 'parcel_line_items' = 'parcel_line_items'
	// static readonly PATH = 'parcel_line_items'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ParcelLineItem[] | DocWithData<ParcelLineItem>> {
		return this.resources.list({ type: ParcelLineItems.TYPE }, params, options)
	}

	async create(resource: ParcelLineItemCreate, options?: ResourcesConfig): Promise<ParcelLineItem | DocWithData<ParcelLineItem>> {
		return this.resources.create(Object.assign(resource, { type: ParcelLineItems.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ParcelLineItem | DocWithData<ParcelLineItem>> {
		return this.resources.retrieve<ParcelLineItem>({ type: ParcelLineItems.TYPE, id }, params, options)
	}

	async update(resource: ParcelLineItemUpdate, options?: ResourcesConfig): Promise<ParcelLineItem | DocWithData<ParcelLineItem>> {
		return this.resources.update({ ...resource, type: ParcelLineItems.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: ParcelLineItems.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isParcelLineItem(resource: any): resource is ParcelLineItem {
		return resource.type && (resource.type === ParcelLineItems.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(ParcelLineItems.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(ParcelLineItems.TYPE)
	}
	*/

	relationship(id: string): ResourceId & { type: typeof ParcelLineItems.TYPE } {
		return { id, type: ParcelLineItems.TYPE }
	}

}


export default ParcelLineItems

export { ParcelLineItem, ParcelLineItemCreate, ParcelLineItemUpdate }
