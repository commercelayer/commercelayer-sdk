/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Return } from './returns'
import { LineItem } from './line_items'


type ReturnLineItemRel = ResourceId & { type: typeof ReturnLineItems.TYPE }
type ReturnRel = ResourceId & { type: 'returns' }
type LineItemRel = ResourceId & { type: 'line_items' }


interface ReturnLineItem extends Resource {
	
	sku_code?: string
	bundle_code?: string
	name?: string
	quantity?: number
	return_reason?: object
	restocked_at?: string

	return?: Return
	line_item?: LineItem

}


interface ReturnLineItemCreate extends ResourceCreate {
	
	quantity: number
	return_reason?: object

	return?: ReturnRel
	line_item?: LineItemRel

}


interface ReturnLineItemUpdate extends ResourceUpdate {
	
	quantity?: number
	_restock?: boolean
	return_reason?: object
	
}


class ReturnLineItems extends ApiResource {

	static readonly TYPE: 'return_line_items' = 'return_line_items'
	// static readonly PATH = 'return_line_items'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ReturnLineItem>> {
		return this.resources.list({ type: ReturnLineItems.TYPE }, params, options)
	}

	async create(resource: ReturnLineItemCreate, options?: ResourcesConfig): Promise<ReturnLineItem> {
		return this.resources.create(Object.assign(resource, { type: ReturnLineItems.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ReturnLineItem> {
		return this.resources.retrieve<ReturnLineItem>({ type: ReturnLineItems.TYPE, id }, params, options)
	}

	async update(resource: ReturnLineItemUpdate, options?: ResourcesConfig): Promise<ReturnLineItem> {
		return this.resources.update({ ...resource, type: ReturnLineItems.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ReturnLineItems.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isReturnLineItem(resource: any): resource is ReturnLineItem {
		return resource.type && (resource.type === ReturnLineItems.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(ReturnLineItems.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(ReturnLineItems.TYPE)
	}
	*/

	relationship(id: string | ResourceId): ReturnLineItemRel {
		return (typeof id === 'string') ? { id, type: ReturnLineItems.TYPE } : {id: id.id, type: ReturnLineItems.TYPE }
	}

}


export default ReturnLineItems

export { ReturnLineItem, ReturnLineItemCreate, ReturnLineItemUpdate }
