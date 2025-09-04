import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Return, ReturnType } from './returns'
import type { LineItem, LineItemType } from './line_items'
import type { EventStore } from './event_stores'


type ReturnLineItemType = 'return_line_items'
type ReturnLineItemRel = ResourceRel & { type: ReturnLineItemType }
type ReturnRel = ResourceRel & { type: ReturnType }
type LineItemRel = ResourceRel & { type: LineItemType }


export type ReturnLineItemSort = Pick<ReturnLineItem, 'id' | 'quantity' | 'total_amount_cents' | 'restocked_at'> & ResourceSort
// export type ReturnLineItemFilter = Pick<ReturnLineItem, 'id' | 'quantity' | 'total_amount_cents' | 'return_reason' | 'restocked_at'> & ResourceFilter


interface ReturnLineItem extends Resource {
	
	readonly type: ReturnLineItemType

	/** 
	 * The code of the associated SKU.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null
	/** 
	 * The code of the associated bundle.
	 * @example ```"BUNDLEMM000000FFFFFFXLXX"```
	 */
	bundle_code?: string | null
	/** 
	 * The return line item quantity.
	 * @example ```4```
	 */
	quantity: number
	/** 
	 * The name of the line item.
	 * @example ```"Men's Black T-shirt with White Logo (XL)"```
	 */
	name?: string | null
	/** 
	 * The image_url of the associated line item.
	 * @example ```"https://img.yourdomain.com/skus/xYZkjABcde.png"```
	 */
	image_url?: string | null
	/** 
	 * Calculated as line item unit amount x returned quantity and applied discounts, if any.
	 * @example ```8800```
	 */
	total_amount_cents?: number | null
	/** 
	 * The return line item total amount, float. This can be useful to track the purchase on thrid party systems, e.g Google Analyitcs Enhanced Ecommerce.
	 * @example ```88```
	 */
	total_amount_float: number
	/** 
	 * The return line item total amount, formatted. This can be useful to display the amount with currency in you views.
	 * @example ```"€88,00"```
	 */
	formatted_total_amount?: string | null
	/** 
	 * Set of key-value pairs that you can use to add details about return reason.
	 * @example ```{"size":"was wrong"}```
	 */
	return_reason?: Record<string, any> | null
	/** 
	 * Time at which the return line item was restocked.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	restocked_at?: string | null

	return?: Return | null
	line_item?: LineItem | null
	event_stores?: EventStore[] | null

}


interface ReturnLineItemCreate extends ResourceCreate {
	
	/** 
	 * The return line item quantity.
	 * @example ```4```
	 */
	quantity: number
	/** 
	 * Set of key-value pairs that you can use to add details about return reason.
	 * @example ```{"size":"was wrong"}```
	 */
	return_reason?: Record<string, any> | null

	return: ReturnRel
	line_item: LineItemRel

}


interface ReturnLineItemUpdate extends ResourceUpdate {
	
	/** 
	 * The return line item quantity.
	 * @example ```4```
	 */
	quantity?: number | null
	/** 
	 * Send this attribute if you want to restock the line item.
	 * @example ```true```
	 */
	_restock?: boolean | null
	/** 
	 * Set of key-value pairs that you can use to add details about return reason.
	 * @example ```{"size":"was wrong"}```
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

	async return(returnLineItemId: string | ReturnLineItem, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		const _returnLineItemId = (returnLineItemId as ReturnLineItem).id || returnLineItemId as string
		return this.resources.fetch<Return>({ type: 'returns' }, `return_line_items/${_returnLineItemId}/return`, params, options) as unknown as Return
	}

	async line_item(returnLineItemId: string | ReturnLineItem, params?: QueryParamsRetrieve<LineItem>, options?: ResourcesConfig): Promise<LineItem> {
		const _returnLineItemId = (returnLineItemId as ReturnLineItem).id || returnLineItemId as string
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `return_line_items/${_returnLineItemId}/line_item`, params, options) as unknown as LineItem
	}

	async event_stores(returnLineItemId: string | ReturnLineItem, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _returnLineItemId = (returnLineItemId as ReturnLineItem).id || returnLineItemId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `return_line_items/${_returnLineItemId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
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
