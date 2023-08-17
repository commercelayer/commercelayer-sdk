import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { Return, ReturnType } from './returns'
import type { LineItem, LineItemType } from './line_items'


type ReturnLineItemType = 'return_line_items'
type ReturnLineItemRel = ResourceRel & { type: ReturnLineItemType }
type ReturnRel = ResourceRel & { type: ReturnType }
type LineItemRel = ResourceRel & { type: LineItemType }


interface ReturnLineItem extends Resource {
	
	readonly type: ReturnLineItemType

	sku_code?: string | null
	bundle_code?: string | null
	quantity: number
	name?: string | null
	image_url?: string | null
	return_reason?: Record<string, any> | null
	restocked_at?: string | null

	return?: Return | null
	line_item?: LineItem | null

}


interface ReturnLineItemCreate extends ResourceCreate {
	
	quantity: number
	return_reason?: Record<string, any> | null

	return: ReturnRel
	line_item: LineItemRel

}


interface ReturnLineItemUpdate extends ResourceUpdate {
	
	quantity?: number | null
	_restock?: boolean | null
	return_reason?: Record<string, any> | null
	
}


class ReturnLineItems extends ApiResource<ReturnLineItem> {

	static readonly TYPE: ReturnLineItemType = 'return_line_items' as const

	async create(resource: ReturnLineItemCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ReturnLineItem> {
		return this.resources.create<ReturnLineItemCreate, ReturnLineItem>({ ...resource, type: ReturnLineItems.TYPE }, params, options)
	}

	async update(resource: ReturnLineItemUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ReturnLineItem> {
		return this.resources.update<ReturnLineItemUpdate, ReturnLineItem>({ ...resource, type: ReturnLineItems.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ReturnLineItems.TYPE } : id, options)
	}

	async return(returnLineItemId: string | ReturnLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Return> {
		const _returnLineItemId = (returnLineItemId as ReturnLineItem).id || returnLineItemId as string
		return this.resources.fetch<Return>({ type: 'returns' }, `return_line_items/${_returnLineItemId}/return`, params, options) as unknown as Return
	}

	async line_item(returnLineItemId: string | ReturnLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
		const _returnLineItemId = (returnLineItemId as ReturnLineItem).id || returnLineItemId as string
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `return_line_items/${_returnLineItemId}/line_item`, params, options) as unknown as LineItem
	}

	async _restock(id: string | ReturnLineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ReturnLineItem> {
		return this.resources.update<ReturnLineItemUpdate, ReturnLineItem>({ id: (typeof id === 'string')? id: id.id, type: ReturnLineItems.TYPE, _restock: true }, params, options)
	}


	isReturnLineItem(resource: any): resource is ReturnLineItem {
		return resource.type && (resource.type === ReturnLineItems.TYPE)
	}


	relationship(id: string | ResourceId | null): ReturnLineItemRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ReturnLineItems.TYPE } : { id: id.id, type: ReturnLineItems.TYPE }
	}


	type(): ReturnLineItemType {
		return ReturnLineItems.TYPE
	}

}


export default ReturnLineItems

export type { ReturnLineItem, ReturnLineItemCreate, ReturnLineItemUpdate, ReturnLineItemType }
