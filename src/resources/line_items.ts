/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 21-07-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, DocWithData, ResourceId } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Order } from './orders'
import { Sku } from './skus'
import { LineItemOption } from './line_item_options'
import { StockLineItem } from './stock_line_items'
import { StockTransfer } from './stock_transfers'


type OrderRel = ResourceId & { type: 'orders' }
type SkuRel = ResourceId & { type: 'skus' }
type LineItemRel = ResourceId & { type: 'line_items' }


interface LineItem extends Resource {
	
	sku_code?: string
	quantity?: number
	currency_code?: string
	unit_amount_cents?: number
	unit_amount_float?: number
	formatted_unit_amount?: string
	options_amount_cents?: number
	options_amount_float?: number
	formatted_options_amount?: string
	discount_cents?: number
	discount_float?: number
	formatted_discount?: string
	total_amount_cents?: number
	total_amount_float?: number
	formatted_total_amount?: string
	tax_amount_cents?: number
	tax_amount_float?: number
	formatted_tax_amount?: string
	name?: string
	image_url?: string
	discount_breakdown?: object
	tax_rate?: number
	tax_breakdown?: object
	item_type?: string

	order?: Order
	item?: Sku | LineItem
	line_item_options?: LineItemOption[]
	/**
	* @deprecated The field should not be used
	*/
	shipment_line_items?: object[]
	stock_line_items?: StockLineItem[]
	stock_transfers?: StockTransfer[]

}


interface LineItemCreate extends ResourceCreate {
	
	sku_code?: string
	quantity: number
	_external_price?: boolean
	_update_quantity?: boolean
	unit_amount_cents?: number
	name?: string
	image_url?: string
	item_type?: string

	order?: OrderRel
	item?: SkuRel | LineItemRel

}


interface LineItemUpdate extends ResourceUpdate {
	
	sku_code?: string
	quantity?: number
	name?: string
	image_url?: string
	
}


class LineItems extends ApiResource {

	static readonly TYPE: 'line_items' = 'line_items'
	// static readonly PATH = 'line_items'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<LineItem[] | DocWithData<LineItem>> {
		return this.resources.list({ type: LineItems.TYPE }, params, options)
	}

	async create(resource: LineItemCreate, options?: ResourcesConfig): Promise<LineItem | DocWithData<LineItem>> {
		return this.resources.create(Object.assign(resource, { type: LineItems.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem | DocWithData<LineItem>> {
		return this.resources.retrieve<LineItem>({ type: LineItems.TYPE, id }, params, options)
	}

	async update(resource: LineItemUpdate, options?: ResourcesConfig): Promise<LineItem | DocWithData<LineItem>> {
		return this.resources.update({ ...resource, type: LineItems.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: LineItems.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isLineItem(resource: any): resource is LineItem {
		return resource.type && (resource.type === LineItems.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(LineItems.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(LineItems.TYPE)
	}
	*/

	relationship(id: string): ResourceId & { type: typeof LineItems.TYPE } {
		return { id, type: LineItems.TYPE }
	}

}


export default LineItems

export { LineItem, LineItemCreate, LineItemUpdate }
