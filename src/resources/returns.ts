import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Order } from './orders'
import type { Customer } from './customers'
import type { StockLocation } from './stock_locations'
import type { Address } from './addresses'
import type { ReturnLineItem } from './return_line_items'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag } from './tags'
import type { Version } from './versions'


type ReturnRel = ResourceRel & { type: typeof Returns.TYPE }
type OrderRel = ResourceRel & { type: 'orders' }
type StockLocationRel = ResourceRel & { type: 'stock_locations' }
type TagRel = ResourceRel & { type: 'tags' }


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
	events?: Event[]
	tags?: Tag[]
	versions?: Version[]

}


interface ReturnCreate extends ResourceCreate {
	
	order: OrderRel
	stock_location?: StockLocationRel
	tags?: TagRel[]

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
	tags?: TagRel[]

}


class Returns extends ApiResource {

	static readonly TYPE: 'returns' = 'returns' as const
	// static readonly PATH = 'returns'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Return>> {
		return this.resources.list<Return>({ type: Returns.TYPE }, params, options)
	}

	async create(resource: ReturnCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Return> {
		return this.resources.create<ReturnCreate, Return>({ ...resource, type: Returns.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Return> {
		return this.resources.retrieve<Return>({ type: Returns.TYPE, id }, params, options)
	}

	async update(resource: ReturnUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Return> {
		return this.resources.update<ReturnUpdate, Return>({ ...resource, type: Returns.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Returns.TYPE, id }, options)
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

	async tags(returnId: string | Return, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `returns/${_returnId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(returnId: string | Return, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _returnId = (returnId as Return).id || returnId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `returns/${_returnId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isReturn(resource: any): resource is Return {
		return resource.type && (resource.type === Returns.TYPE)
	}


	relationship(id: string | ResourceId | null): ReturnRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Returns.TYPE } : { id: id.id, type: Returns.TYPE }
	}


	type(): string {
		return Returns.TYPE
	}

}


export default Returns

export { Return, ReturnCreate, ReturnUpdate }
