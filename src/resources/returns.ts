/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Order } from './orders'
import { Customer } from './customers'
import { StockLocation } from './stock_locations'
import { Address } from './addresses'
import { ReturnLineItem } from './return_line_items'
import { Attachment } from './attachments'


type ReturnRel = ResourceId & { type: typeof Returns.TYPE }
type OrderRel = ResourceId & { type: 'orders' }
type StockLocationRel = ResourceId & { type: 'stock_locations' }


interface Return extends Resource {
	
	number?: string
	status?: string
	customer_email?: string
	skus_count?: number
	approved_at?: string
	cancelled_at?: string
	shipped_at?: string
	rejected_at?: string
	received_at?: string
	archived_at?: string

	order?: Order
	customer?: Customer
	stock_location?: StockLocation
	origin_address?: Address
	destination_address?: Address
	return_line_items?: ReturnLineItem[]
	attachments?: Attachment[]

}


interface ReturnCreate extends ResourceCreate {
	
	order?: OrderRel
	stock_location?: StockLocationRel

}


interface ReturnUpdate extends ResourceUpdate {
	
	_request?: boolean
	_approve?: boolean
	_cancel?: boolean
	_ship?: boolean
	_reject?: boolean
	_receive?: boolean
	_restock?: boolean
	_archive?: boolean
	_unarchive?: boolean

	stock_location?: StockLocationRel

}


class Returns extends ApiResource {

	static readonly TYPE: 'returns' = 'returns'
	// static readonly PATH = 'returns'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Return>> {
		return this.resources.list({ type: Returns.TYPE }, params, options)
	}

	async create(resource: ReturnCreate, options?: ResourcesConfig): Promise<Return> {
		return this.resources.create(Object.assign(resource, { type: Returns.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Return> {
		return this.resources.retrieve<Return>({ type: Returns.TYPE, id }, params, options)
	}

	async update(resource: ReturnUpdate, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update({ ...resource, type: Returns.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Returns.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isReturn(resource: any): resource is Return {
		return resource.type && (resource.type === Returns.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Returns.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Returns.TYPE)
	}
	*/

	relationship(id: string | ResourceId): ReturnRel {
		return (typeof id === 'string') ? { id, type: Returns.TYPE } : {id: id.id, type: Returns.TYPE }
	}

}


export default Returns

export { Return, ReturnCreate, ReturnUpdate }
