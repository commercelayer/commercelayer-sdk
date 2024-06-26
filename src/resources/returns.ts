import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { Customer } from './customers'
import type { StockLocation, StockLocationType } from './stock_locations'
import type { Address } from './addresses'
import type { ReturnLineItem } from './return_line_items'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'


type ReturnType = 'returns'
type ReturnRel = ResourceRel & { type: ReturnType }
type OrderRel = ResourceRel & { type: OrderType }
type StockLocationRel = ResourceRel & { type: StockLocationType }
type TagRel = ResourceRel & { type: TagType }


export type ReturnSort = Pick<Return, 'id' | 'number' | 'status' | 'approved_at' | 'cancelled_at' | 'shipped_at' | 'rejected_at' | 'received_at' | 'archived_at'> & ResourceSort
// export type ReturnFilter = Pick<Return, 'id' | 'number' | 'status' | 'skus_count' | 'approved_at' | 'cancelled_at' | 'shipped_at' | 'rejected_at' | 'received_at' | 'archived_at'> & ResourceFilter


interface Return extends Resource {
	
	readonly type: ReturnType

	/** 
	 * Unique identifier for the return.
	 * @example ```"#1234/R/001"```
	 */
	number?: string | null
	/** 
	 * The return status, one of 'draft', 'requested', 'approved', 'cancelled', 'shipped', 'rejected' or 'received'.
	 * @example ```"draft"```
	 */
	status: 'draft' | 'requested' | 'approved' | 'cancelled' | 'shipped' | 'rejected' | 'received'
	/** 
	 * The email address of the associated customer..
	 * @example ```"john@example.com"```
	 */
	customer_email?: string | null
	/** 
	 * The total number of SKUs in the return's line items. This can be useful to display a preview of the return content..
	 * @example ```"2"```
	 */
	skus_count?: number | null
	/** 
	 * Time at which the return was approved..
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	approved_at?: string | null
	/** 
	 * Time at which the return was cancelled..
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	cancelled_at?: string | null
	/** 
	 * Time at which the return was shipped..
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	shipped_at?: string | null
	/** 
	 * Time at which the return was rejected..
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	rejected_at?: string | null
	/** 
	 * Time at which the return was received..
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	received_at?: string | null
	/** 
	 * Time at which the resource has been archived..
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	archived_at?: string | null

	order?: Order | null
	customer?: Customer | null
	stock_location?: StockLocation | null
	origin_address?: Address | null
	destination_address?: Address | null
	return_line_items?: ReturnLineItem[] | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	tags?: Tag[] | null
	versions?: Version[] | null

}


interface ReturnCreate extends ResourceCreate {
	
	order: OrderRel
	stock_location?: StockLocationRel | null
	tags?: TagRel[] | null

}


interface ReturnUpdate extends ResourceUpdate {
	
	/** 
	 * Send this attribute if you want to activate this return..
	 * @example ```"true"```
	 */
	_request?: boolean | null
	/** 
	 * Send this attribute if you want to mark this return as approved..
	 * @example ```"true"```
	 */
	_approve?: boolean | null
	/** 
	 * Send this attribute if you want to mark this return as cancelled..
	 * @example ```"true"```
	 */
	_cancel?: boolean | null
	/** 
	 * Send this attribute if you want to mark this return as shipped..
	 * @example ```"true"```
	 */
	_ship?: boolean | null
	/** 
	 * Send this attribute if you want to mark this return as rejected..
	 * @example ```"true"```
	 */
	_reject?: boolean | null
	/** 
	 * Send this attribute if you want to mark this return as received..
	 * @example ```"true"```
	 */
	_receive?: boolean | null
	/** 
	 * Send this attribute if you want to restock all of the return line items..
	 * @example ```"true"```
	 */
	_restock?: boolean | null
	/** 
	 * Send this attribute if you want to archive the return..
	 * @example ```"true"```
	 */
	_archive?: boolean | null
	/** 
	 * Send this attribute if you want to unarchive the return..
	 * @example ```"true"```
	 */
	_unarchive?: boolean | null

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

	async order(returnId: string | Return, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `returns/${_returnId}/order`, params, options) as unknown as Order
	}

	async customer(returnId: string | Return, params?: QueryParamsRetrieve<Customer>, options?: ResourcesConfig): Promise<Customer> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `returns/${_returnId}/customer`, params, options) as unknown as Customer
	}

	async stock_location(returnId: string | Return, params?: QueryParamsRetrieve<StockLocation>, options?: ResourcesConfig): Promise<StockLocation> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `returns/${_returnId}/stock_location`, params, options) as unknown as StockLocation
	}

	async origin_address(returnId: string | Return, params?: QueryParamsRetrieve<Address>, options?: ResourcesConfig): Promise<Address> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `returns/${_returnId}/origin_address`, params, options) as unknown as Address
	}

	async destination_address(returnId: string | Return, params?: QueryParamsRetrieve<Address>, options?: ResourcesConfig): Promise<Address> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `returns/${_returnId}/destination_address`, params, options) as unknown as Address
	}

	async return_line_items(returnId: string | Return, params?: QueryParamsList<ReturnLineItem>, options?: ResourcesConfig): Promise<ListResponse<ReturnLineItem>> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<ReturnLineItem>({ type: 'return_line_items' }, `returns/${_returnId}/return_line_items`, params, options) as unknown as ListResponse<ReturnLineItem>
	}

	async attachments(returnId: string | Return, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `returns/${_returnId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(returnId: string | Return, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Event>({ type: 'events' }, `returns/${_returnId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(returnId: string | Return, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `returns/${_returnId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(returnId: string | Return, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `returns/${_returnId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _request(id: string | Return, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ id: (typeof id === 'string')? id: id.id, type: Returns.TYPE, _request: true }, params, options)
	}

	async _approve(id: string | Return, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ id: (typeof id === 'string')? id: id.id, type: Returns.TYPE, _approve: true }, params, options)
	}

	async _cancel(id: string | Return, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ id: (typeof id === 'string')? id: id.id, type: Returns.TYPE, _cancel: true }, params, options)
	}

	async _ship(id: string | Return, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ id: (typeof id === 'string')? id: id.id, type: Returns.TYPE, _ship: true }, params, options)
	}

	async _reject(id: string | Return, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ id: (typeof id === 'string')? id: id.id, type: Returns.TYPE, _reject: true }, params, options)
	}

	async _receive(id: string | Return, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ id: (typeof id === 'string')? id: id.id, type: Returns.TYPE, _receive: true }, params, options)
	}

	async _restock(id: string | Return, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ id: (typeof id === 'string')? id: id.id, type: Returns.TYPE, _restock: true }, params, options)
	}

	async _archive(id: string | Return, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ id: (typeof id === 'string')? id: id.id, type: Returns.TYPE, _archive: true }, params, options)
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
