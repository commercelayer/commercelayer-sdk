import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, /* ResourceFilterable */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order } from './orders'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Version } from './versions'
import type { Capture } from './captures'


type RefundType = 'refunds'
type RefundRel = ResourceRel & { type: RefundType }


export type RefundSortable = Pick<Refund, 'id' | 'number' | 'amount_cents'> & ResourceSortable
// export type RefundFilterable = Pick<Refund, 'id' | 'number' | 'currency_code' | 'amount_cents' | 'succeeded' | 'message' | 'error_code' | 'error_detail' | 'token' | 'gateway_transaction_id'> & ResourceFilterable


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

}


class Refunds extends ApiResource<Refund> {

	static readonly TYPE: RefundType = 'refunds' as const

	async order(refundId: string | Refund, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _refundId = (refundId as Refund).id || refundId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `refunds/${_refundId}/order`, params, options) as unknown as Order
	}

	async attachments(refundId: string | Refund, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _refundId = (refundId as Refund).id || refundId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `refunds/${_refundId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(refundId: string | Refund, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _refundId = (refundId as Refund).id || refundId as string
		return this.resources.fetch<Event>({ type: 'events' }, `refunds/${_refundId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(refundId: string | Refund, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _refundId = (refundId as Refund).id || refundId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `refunds/${_refundId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async reference_capture(refundId: string | Refund, params?: QueryParamsRetrieve<Capture>, options?: ResourcesConfig): Promise<Capture> {
		const _refundId = (refundId as Refund).id || refundId as string
		return this.resources.fetch<Capture>({ type: 'captures' }, `refunds/${_refundId}/reference_capture`, params, options) as unknown as Capture
	}


	isRefund(resource: any): resource is Refund {
		return resource.type && (resource.type === Refunds.TYPE)
	}


	relationship(id: string | ResourceId | null): RefundRel {
		return super.relationshipOneToOne<RefundRel>(id)
	}

	relationshipToMany(...ids: string[]): RefundRel[] {
		return super.relationshipOneToMany<RefundRel>(...ids)
	}


	type(): RefundType {
		return Refunds.TYPE
	}

}


export default Refunds

export type { Refund, RefundType }

/*
export const RefundsClient = (init: ResourceAdapter | ResourcesInitConfig): Refunds => {
	return new Refunds((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
