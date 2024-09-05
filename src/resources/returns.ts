import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Attachment } from './attachments'
import type { Customer } from './customers'
import type { Address } from './addresses'
import type { Event } from './events'
import type { Order, OrderType } from './orders'
import type { Capture, CaptureType } from './captures'
import type { Refund } from './refunds'
import type { ResourceError } from './resource_errors'
import type { ReturnLineItem } from './return_line_items'
import type { StockLocation, StockLocationType } from './stock_locations'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'


type ReturnType = 'returns'
type ReturnRel = ResourceRel & { type: ReturnType }
type OrderRel = ResourceRel & { type: OrderType }
type CaptureRel = ResourceRel & { type: CaptureType }
type StockLocationRel = ResourceRel & { type: StockLocationType }
type TagRel = ResourceRel & { type: TagType }


export type ReturnSort = Pick<Return, 'id' | 'approved_at' | 'archived_at' | 'cancelled_at' | 'number' | 'received_at' | 'refunded_at' | 'rejected_at' | 'shipped_at' | 'status'> & ResourceSort
// export type ReturnFilter = Pick<Return, 'id' | 'approved_at' | 'archived_at' | 'cancelled_at' | 'number' | 'received_at' | 'refunded_at' | 'rejected_at' | 'shipped_at' | 'skus_count' | 'status'> & ResourceFilter


interface Return extends Resource {
	
	readonly type: ReturnType

	/** 
	 * Time at which the return was approved.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	approved_at?: string | null
	/** 
	 * Time at which the resource has been archived.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	archived_at?: string | null
	/** 
	 * Time at which the return was cancelled.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	cancelled_at?: string | null
	/** 
	 * The email address of the associated customer.
	 * @example ```"john@example.com"```
	 */
	customer_email?: string | null
	/** 
	 * The amount to be refunded, estimated by associated return line items, in cents.
	 * @example ```"500"```
	 */
	estimated_refund_amount_cents?: number | null
	/** 
	 * The amount to be refunded, estimated by associated return line items, float.
	 * @example ```"5"```
	 */
	estimated_refund_amount_float?: number | null
	/** 
	 * The amount to be refunded, estimated by associated return line items, formatted.
	 * @example ```"€5,00"```
	 */
	formatted_estimated_refund_amount?: string | null
	/** 
	 * Unique identifier for the return.
	 * @example ```"#1234/R/001"```
	 */
	number?: string | null
	/** 
	 * Time at which the return was received.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	received_at?: string | null
	/** 
	 * Time at which the return was refunded.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	refunded_at?: string | null
	/** 
	 * Time at which the return was rejected.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	rejected_at?: string | null
	/** 
	 * Time at which the return was shipped.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	shipped_at?: string | null
	/** 
	 * The total number of SKUs in the return's line items. This can be useful to display a preview of the return content.
	 * @example ```"2"```
	 */
	skus_count?: number | null
	/** 
	 * The return status. One of 'draft' (default), 'requested', 'approved', 'cancelled', 'shipped', 'rejected', 'received', or 'refunded'.
	 * @example ```"draft"```
	 */
	status: 'draft' | 'requested' | 'approved' | 'cancelled' | 'shipped' | 'rejected' | 'received' | 'refunded'

	attachments?: Attachment[] | null
	customer?: Customer | null
	destination_address?: Address | null
	events?: Event[] | null
	order?: Order | null
	origin_address?: Address | null
	reference_capture?: Capture | null
	reference_refund?: Refund | null
	resource_errors?: ResourceError[] | null
	return_line_items?: ReturnLineItem[] | null
	stock_location?: StockLocation | null
	tags?: Tag[] | null
	versions?: Version[] | null

}


interface ReturnCreate extends ResourceCreate {
	
	order: OrderRel
	reference_capture?: CaptureRel | null
	stock_location?: StockLocationRel | null
	tags?: TagRel[] | null

}


interface ReturnUpdate extends ResourceUpdate {
	
	/** 
	 * Send this attribute if you want to mark this return as approved.
	 * @example ```"true"```
	 */
	_approve?: boolean | null
	/** 
	 * Send this attribute if you want to archive the return.
	 * @example ```"true"```
	 */
	_archive?: boolean | null
	/** 
	 * Send this attribute if you want to mark this return as cancelled.
	 * @example ```"true"```
	 */
	_cancel?: boolean | null
	/** 
	 * Send this attribute if you want to mark this return as received.
	 * @example ```"true"```
	 */
	_receive?: boolean | null
	/** 
	 * Send this attribute if you want to create a refund for this return.
	 * @example ```"true"```
	 */
	_refund?: boolean | null
	/** 
	 * Send this attribute as a value in cents to specify the amount to be refunded.
	 * @example ```"500"```
	 */
	_refund_amount_cents?: number | null
	/** 
	 * Send this attribute if you want to mark this return as rejected.
	 * @example ```"true"```
	 */
	_reject?: boolean | null
	/** 
	 * Send this attribute if you want to activate this return.
	 * @example ```"true"```
	 */
	_request?: boolean | null
	/** 
	 * Send this attribute if you want to restock all of the return line items.
	 * @example ```"true"```
	 */
	_restock?: boolean | null
	/** 
	 * Send this attribute if you want to mark this return as shipped.
	 * @example ```"true"```
	 */
	_ship?: boolean | null
	/** 
	 * Send this attribute if you want to unarchive the return.
	 * @example ```"true"```
	 */
	_unarchive?: boolean | null

	reference_capture?: CaptureRel | null
	stock_location?: StockLocationRel | null
	tags?: TagRel[] | null

}


class Returns extends ApiResource<Return> {

	static readonly TYPE: ReturnType = 'returns' as const

	async create(resource: ReturnCreate, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.create<ReturnCreate, Return>({ ...resource, type: Returns.TYPE }, params, options)
	}

	async update(resource: ReturnUpdate, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ ...resource, type: Returns.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Returns.TYPE } : id, options)
	}

	async attachments(returnId: string | Return, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `returns/${_returnId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async customer(returnId: string | Return, params?: QueryParamsRetrieve<Customer>, options?: ResourcesConfig): Promise<Customer> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `returns/${_returnId}/customer`, params, options) as unknown as Customer
	}

	async destination_address(returnId: string | Return, params?: QueryParamsRetrieve<Address>, options?: ResourcesConfig): Promise<Address> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `returns/${_returnId}/destination_address`, params, options) as unknown as Address
	}

	async events(returnId: string | Return, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Event>({ type: 'events' }, `returns/${_returnId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async order(returnId: string | Return, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `returns/${_returnId}/order`, params, options) as unknown as Order
	}

	async origin_address(returnId: string | Return, params?: QueryParamsRetrieve<Address>, options?: ResourcesConfig): Promise<Address> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `returns/${_returnId}/origin_address`, params, options) as unknown as Address
	}

	async reference_capture(returnId: string | Return, params?: QueryParamsRetrieve<Capture>, options?: ResourcesConfig): Promise<Capture> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Capture>({ type: 'captures' }, `returns/${_returnId}/reference_capture`, params, options) as unknown as Capture
	}

	async reference_refund(returnId: string | Return, params?: QueryParamsRetrieve<Refund>, options?: ResourcesConfig): Promise<Refund> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Refund>({ type: 'refunds' }, `returns/${_returnId}/reference_refund`, params, options) as unknown as Refund
	}

	async resource_errors(returnId: string | Return, params?: QueryParamsList<ResourceError>, options?: ResourcesConfig): Promise<ListResponse<ResourceError>> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<ResourceError>({ type: 'resource_errors' }, `returns/${_returnId}/resource_errors`, params, options) as unknown as ListResponse<ResourceError>
	}

	async return_line_items(returnId: string | Return, params?: QueryParamsList<ReturnLineItem>, options?: ResourcesConfig): Promise<ListResponse<ReturnLineItem>> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<ReturnLineItem>({ type: 'return_line_items' }, `returns/${_returnId}/return_line_items`, params, options) as unknown as ListResponse<ReturnLineItem>
	}

	async stock_location(returnId: string | Return, params?: QueryParamsRetrieve<StockLocation>, options?: ResourcesConfig): Promise<StockLocation> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `returns/${_returnId}/stock_location`, params, options) as unknown as StockLocation
	}

	async tags(returnId: string | Return, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `returns/${_returnId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(returnId: string | Return, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `returns/${_returnId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _approve(id: string | Return, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ id: (typeof id === 'string')? id: id.id, type: Returns.TYPE, _approve: true }, params, options)
	}

	async _archive(id: string | Return, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ id: (typeof id === 'string')? id: id.id, type: Returns.TYPE, _archive: true }, params, options)
	}

	async _cancel(id: string | Return, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ id: (typeof id === 'string')? id: id.id, type: Returns.TYPE, _cancel: true }, params, options)
	}

	async _receive(id: string | Return, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ id: (typeof id === 'string')? id: id.id, type: Returns.TYPE, _receive: true }, params, options)
	}

	async _refund(id: string | Return, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ id: (typeof id === 'string')? id: id.id, type: Returns.TYPE, _refund: true }, params, options)
	}

	async _refund_amount_cents(id: string | Return, triggerValue: number, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ id: (typeof id === 'string')? id: id.id, type: Returns.TYPE, _refund_amount_cents: triggerValue }, params, options)
	}

	async _reject(id: string | Return, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ id: (typeof id === 'string')? id: id.id, type: Returns.TYPE, _reject: true }, params, options)
	}

	async _request(id: string | Return, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ id: (typeof id === 'string')? id: id.id, type: Returns.TYPE, _request: true }, params, options)
	}

	async _restock(id: string | Return, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ id: (typeof id === 'string')? id: id.id, type: Returns.TYPE, _restock: true }, params, options)
	}

	async _ship(id: string | Return, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ id: (typeof id === 'string')? id: id.id, type: Returns.TYPE, _ship: true }, params, options)
	}

	async _unarchive(id: string | Return, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ id: (typeof id === 'string')? id: id.id, type: Returns.TYPE, _unarchive: true }, params, options)
	}


	isReturn(resource: any): resource is Return {
		return resource.type && (resource.type === Returns.TYPE)
	}


	relationship(id: string | ResourceId | null): ReturnRel {
		return super.relationshipOneToOne<ReturnRel>(id)
	}

	relationshipToMany(...ids: string[]): ReturnRel[] {
		return super.relationshipOneToMany<ReturnRel>(...ids)
	}


	type(): ReturnType {
		return Returns.TYPE
	}

}


export default Returns

export type { Return, ReturnCreate, ReturnUpdate, ReturnType }
