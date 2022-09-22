import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Return } from './returns'
import type { LineItem } from './line_items'


type ReturnLineItemRel = ResourceRel & { type: typeof ReturnLineItems.TYPE }
type ReturnRel = ResourceRel & { type: 'returns' }
type LineItemRel = ResourceRel & { type: 'line_items' }


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

	return: ReturnRel
	line_item: LineItemRel

}


interface ReturnLineItemUpdate extends ResourceUpdate {
	
	quantity?: number
	_restock?: boolean
	return_reason?: object
	
}


class ReturnLineItems extends ApiResource {

	static readonly TYPE: 'return_line_items' = 'return_line_items' as const
	// static readonly PATH = 'return_line_items'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ReturnLineItem>> {
		return this.resources.list<ReturnLineItem>({ type: ReturnLineItems.TYPE }, params, options)
	}

	async create(resource: ReturnLineItemCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ReturnLineItem> {
		return this.resources.create<ReturnLineItemCreate, ReturnLineItem>({ ...resource, type: ReturnLineItems.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ReturnLineItem> {
		return this.resources.retrieve<ReturnLineItem>({ type: ReturnLineItems.TYPE, id }, params, options)
	}

	async update(resource: ReturnLineItemUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ReturnLineItem> {
		return this.resources.update<ReturnLineItemUpdate, ReturnLineItem>({ ...resource, type: ReturnLineItems.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ReturnLineItems.TYPE, id }, options)
	}

	async return(returnLineItemId: string | ReturnLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Return> {
		const _returnLineItemId = (returnLineItemId as ReturnLineItem).id || returnLineItemId
		return this.resources.fetch<Return>({ type: 'returns' }, `return_line_items/${_returnLineItemId}/return`, params, options) as unknown as Return
	}

	async line_item(returnLineItemId: string | ReturnLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
		const _returnLineItemId = (returnLineItemId as ReturnLineItem).id || returnLineItemId
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `return_line_items/${_returnLineItemId}/line_item`, params, options) as unknown as LineItem
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isReturnLineItem(resource: any): resource is ReturnLineItem {
		return resource.type && (resource.type === ReturnLineItems.TYPE)
	}


	relationship(id: string | ResourceId | null): ReturnLineItemRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ReturnLineItems.TYPE } : { id: id.id, type: ReturnLineItems.TYPE }
	}


	type(): string {
		return ReturnLineItems.TYPE
	}

}


export default ReturnLineItems

export { ReturnLineItem, ReturnLineItemCreate, ReturnLineItemUpdate }
