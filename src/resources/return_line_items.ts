import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { LineItem, LineItemType } from './line_items'
import type { Return, ReturnType } from './returns'


type ReturnLineItemType = 'return_line_items'
type ReturnLineItemRel = ResourceRel & { type: ReturnLineItemType }
type LineItemRel = ResourceRel & { type: LineItemType }
type ReturnRel = ResourceRel & { type: ReturnType }


export type ReturnLineItemSort = Pick<ReturnLineItem, 'id' | 'quantity' | 'restocked_at' | 'total_amount_cents'> & ResourceSort
// export type ReturnLineItemFilter = Pick<ReturnLineItem, 'id' | 'quantity' | 'restocked_at' | 'return_reason' | 'total_amount_cents'> & ResourceFilter


interface ReturnLineItem extends Resource {
	
	readonly type: ReturnLineItemType

	/** 
	 * The code of the associated bundle.
	 * @example ```"BUNDLEMM000000FFFFFFXLXX"```
	 */
	bundle_code?: string | null
	/** 
	 * The return line item total amount, formatted. This can be useful to display the amount with currency in you views.
	 * @example ```"€88,00"```
	 */
	formatted_total_amount?: string | null
	/** 
	 * The image_url of the associated line item.
	 * @example ```"https://img.yourdomain.com/skus/xYZkjABcde.png"```
	 */
	image_url?: string | null
	/** 
	 * The name of the line item.
	 * @example ```"Men's Black T-shirt with White Logo (XL)"```
	 */
	name?: string | null
	/** 
	 * The return line item quantity.
	 * @example ```"4"```
	 */
	quantity: number
	/** 
	 * Time at which the return line item was restocked.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	restocked_at?: string | null
	/** 
	 * Set of key-value pairs that you can use to add details about return reason.
	 * @example ```"[object Object]"```
	 */
	return_reason?: Record<string, any> | null
	/** 
	 * The code of the associated SKU.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null
	/** 
	 * Calculated as line item unit amount x returned quantity and applied discounts, if any.
	 * @example ```"8800"```
	 */
	total_amount_cents?: number | null
	/** 
	 * The return line item total amount, float. This can be useful to track the purchase on thrid party systems, e.g Google Analyitcs Enhanced Ecommerce.
	 * @example ```"88"```
	 */
	total_amount_float: number

	line_item?: LineItem | null
	return?: Return | null

}


interface ReturnLineItemCreate extends ResourceCreate {
	
	/** 
	 * The return line item quantity.
	 * @example ```"4"```
	 */
	quantity: number
	/** 
	 * Set of key-value pairs that you can use to add details about return reason.
	 * @example ```"[object Object]"```
	 */
	return_reason?: Record<string, any> | null

	line_item: LineItemRel
	return: ReturnRel

}


interface ReturnLineItemUpdate extends ResourceUpdate {
	
	/** 
	 * Send this attribute if you want to restock the line item.
	 * @example ```"true"```
	 */
	_restock?: boolean | null
	/** 
	 * The return line item quantity.
	 * @example ```"4"```
	 */
	quantity?: number | null
	/** 
	 * Set of key-value pairs that you can use to add details about return reason.
	 * @example ```"[object Object]"```
	 */
	return_reason?: Record<string, any> | null
	
}


class ReturnLineItems extends ApiResource<ReturnLineItem> {

	static readonly TYPE: ReturnLineItemType = 'return_line_items' as const

	async create(resource: ReturnLineItemCreate, params?: QueryParamsRetrieve<ReturnLineItem>, options?: ResourcesConfig): Promise<ReturnLineItem> {
		return this.resources.create<ReturnLineItemCreate, ReturnLineItem>({ ...resource, type: ReturnLineItems.TYPE }, params, options)
	}

	async update(resource: ReturnLineItemUpdate, params?: QueryParamsRetrieve<ReturnLineItem>, options?: ResourcesConfig): Promise<ReturnLineItem> {
		return this.resources.update<ReturnLineItemUpdate, ReturnLineItem>({ ...resource, type: ReturnLineItems.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ReturnLineItems.TYPE } : id, options)
	}

	async line_item(returnLineItemId: string | ReturnLineItem, params?: QueryParamsRetrieve<LineItem>, options?: ResourcesConfig): Promise<LineItem> {
		const _returnLineItemId = (returnLineItemId as ReturnLineItem).id || returnLineItemId as string
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `return_line_items/${_returnLineItemId}/line_item`, params, options) as unknown as LineItem
	}

	async return(returnLineItemId: string | ReturnLineItem, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		const _returnLineItemId = (returnLineItemId as ReturnLineItem).id || returnLineItemId as string
		return this.resources.fetch<Return>({ type: 'returns' }, `return_line_items/${_returnLineItemId}/return`, params, options) as unknown as Return
	}

	async _restock(id: string | ReturnLineItem, params?: QueryParamsRetrieve<ReturnLineItem>, options?: ResourcesConfig): Promise<ReturnLineItem> {
		return this.resources.update<ReturnLineItemUpdate, ReturnLineItem>({ id: (typeof id === 'string')? id: id.id, type: ReturnLineItems.TYPE, _restock: true }, params, options)
	}


	isReturnLineItem(resource: any): resource is ReturnLineItem {
		return resource.type && (resource.type === ReturnLineItems.TYPE)
	}


	relationship(id: string | ResourceId | null): ReturnLineItemRel {
		return super.relationshipOneToOne<ReturnLineItemRel>(id)
	}

	relationshipToMany(...ids: string[]): ReturnLineItemRel[] {
		return super.relationshipOneToMany<ReturnLineItemRel>(...ids)
	}


	type(): ReturnLineItemType {
		return ReturnLineItems.TYPE
	}

}


export default ReturnLineItems

export type { ReturnLineItem, ReturnLineItemCreate, ReturnLineItemUpdate, ReturnLineItemType }
