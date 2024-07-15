import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order } from './orders'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Version } from './versions'
import type { Capture } from './captures'
import type { Return } from './returns'


type RefundType = 'refunds'
type RefundRel = ResourceRel & { type: RefundType }


interface Refund extends Resource {
	
	readonly type: RefundType

	number: string
	currency_code: string
	amount_cents: number
	amount_float: number
	formatted_amount: string
	succeeded: boolean
	message?: string | null
	error_code?: string | null
	error_detail?: string | null
	token?: string | null
	gateway_transaction_id?: string | null

	order?: Order | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	versions?: Version[] | null
	reference_capture?: Capture | null
	return?: Return | null

}


class Refunds extends ApiResource<Refund> {

	static readonly TYPE: RefundType = 'refunds' as const

	async order(refundId: string | Refund, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _refundId = (refundId as Refund).id || refundId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `refunds/${_refundId}/order`, params, options) as unknown as Order
	}

	async attachments(refundId: string | Refund, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _refundId = (refundId as Refund).id || refundId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `refunds/${_refundId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(refundId: string | Refund, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _refundId = (refundId as Refund).id || refundId as string
		return this.resources.fetch<Event>({ type: 'events' }, `refunds/${_refundId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(refundId: string | Refund, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _refundId = (refundId as Refund).id || refundId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `refunds/${_refundId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async reference_capture(refundId: string | Refund, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Capture> {
		const _refundId = (refundId as Refund).id || refundId as string
		return this.resources.fetch<Capture>({ type: 'captures' }, `refunds/${_refundId}/reference_capture`, params, options) as unknown as Capture
	}

	async return(refundId: string | Refund, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Return> {
		const _refundId = (refundId as Refund).id || refundId as string
		return this.resources.fetch<Return>({ type: 'returns' }, `refunds/${_refundId}/return`, params, options) as unknown as Return
	}


	isRefund(resource: any): resource is Refund {
		return resource.type && (resource.type === Refunds.TYPE)
	}


	relationship(id: string | ResourceId | null): RefundRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Refunds.TYPE } : { id: id.id, type: Refunds.TYPE }
	}


	type(): RefundType {
		return Refunds.TYPE
	}

}


export default Refunds

export type { Refund, RefundType }
