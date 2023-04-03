import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { Customer } from './customers'
import type { StockLocation, StockLocationType } from './stock_locations'
import type { Address } from './addresses'
import type { ReturnLineItem } from './return_line_items'
import type { Attachment } from './attachments'
import type { Event } from './events'


type ReturnType = 'returns'
type ReturnRel = ResourceRel & { type: ReturnType }
type OrderRel = ResourceRel & { type: OrderType }
type StockLocationRel = ResourceRel & { type: StockLocationType }


interface Return extends Resource {
	
	readonly type: ReturnType

	number?: string | null
	status: 'draft' | 'requested' | 'approved' | 'cancelled' | 'shipped' | 'rejected' | 'received'
	customer_email?: string | null
	skus_count?: number | null
	approved_at?: string | null
	cancelled_at?: string | null
	shipped_at?: string | null
	rejected_at?: string | null
	received_at?: string | null
	archived_at?: string | null

	order?: Order | null
	customer?: Customer | null
	stock_location?: StockLocation | null
	origin_address?: Address | null
	destination_address?: Address | null
	return_line_items?: ReturnLineItem[] | null
	attachments?: Attachment[] | null
	events?: Event[] | null

}


interface ReturnCreate extends ResourceCreate {
	
	order: OrderRel
	stock_location?: StockLocationRel | null

}


interface ReturnUpdate extends ResourceUpdate {
	
	_request?: boolean | null
	_approve?: boolean | null
	_cancel?: boolean | null
	_ship?: boolean | null
	_reject?: boolean | null
	_receive?: boolean | null
	_restock?: boolean | null
	_archive?: boolean | null
	_unarchive?: boolean | null

	stock_location?: StockLocationRel | null

}


class Returns extends ApiResource<Return> {

	static readonly TYPE: ReturnType = 'returns' as const

	async create(resource: ReturnCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Return> {
		return this.resources.create<ReturnCreate, Return>({ ...resource, type: Returns.TYPE }, params, options)
	}

	async update(resource: ReturnUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ ...resource, type: Returns.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Returns.TYPE } : id, options)
	}

	async order(returnId: string | Return, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `returns/${_returnId}/order`, params, options) as unknown as Order
	}

	async customer(returnId: string | Return, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `returns/${_returnId}/customer`, params, options) as unknown as Customer
	}

	async stock_location(returnId: string | Return, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<StockLocation>({ type: 'stock_locations' }, `returns/${_returnId}/stock_location`, params, options) as unknown as StockLocation
	}

	async origin_address(returnId: string | Return, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `returns/${_returnId}/origin_address`, params, options) as unknown as Address
	}

	async destination_address(returnId: string | Return, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `returns/${_returnId}/destination_address`, params, options) as unknown as Address
	}

	async return_line_items(returnId: string | Return, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ReturnLineItem>> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<ReturnLineItem>({ type: 'return_line_items' }, `returns/${_returnId}/return_line_items`, params, options) as unknown as ListResponse<ReturnLineItem>
	}

	async attachments(returnId: string | Return, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `returns/${_returnId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(returnId: string | Return, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Event>({ type: 'events' }, `returns/${_returnId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isReturn(resource: any): resource is Return {
		return resource.type && (resource.type === Returns.TYPE)
	}


	relationship(id: string | ResourceId | null): ReturnRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Returns.TYPE } : { id: id.id, type: Returns.TYPE }
	}


	type(): ReturnType {
		return Returns.TYPE
	}

}


export default Returns

export type { Return, ReturnCreate, ReturnUpdate, ReturnType }
