import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order } from './orders'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Version } from './versions'
import type { Capture } from './captures'


type RefundType = 'refunds'
type RefundRel = ResourceRel & { type: RefundType }


export type RefundSort = Pick<Refund, 'id' | 'number' | 'amount_cents'> & ResourceSort
// export type RefundFilter = Pick<Refund, 'id' | 'number' | 'currency_code' | 'amount_cents' | 'succeeded' | 'message' | 'error_code' | 'error_detail' | 'token' | 'gateway_transaction_id'> & ResourceFilter


interface Refund extends Resource {
	
	readonly type: RefundType

	/** 
	 * The transaction number, auto generated.
	 * @example ```"42/T/001"```
	 */
	number: string
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard, inherited from the associated order..
	 * @example ```"EUR"```
	 */
	currency_code: string
	/** 
	 * The transaction amount, in cents..
	 * @example ```"1500"```
	 */
	amount_cents: number
	/** 
	 * The transaction amount, float..
	 * @example ```"15"```
	 */
	amount_float: number
	/** 
	 * The transaction amount, formatted..
	 * @example ```"€15,00"```
	 */
	formatted_amount: string
	/** 
	 * Indicates if the transaction is successful.
	 */
	succeeded: boolean
	/** 
	 * The message returned by the payment gateway.
	 * @example ```"Accepted"```
	 */
	message?: string | null
	/** 
	 * The error code, if any, returned by the payment gateway.
	 * @example ```"00001"```
	 */
	error_code?: string | null
	/** 
	 * The error detail, if any, returned by the payment gateway.
	 * @example ```"Already settled"```
	 */
	error_detail?: string | null
	/** 
	 * The token identifying the transaction, returned by the payment gateway.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	token?: string | null
	/** 
	 * The ID identifying the transaction, returned by the payment gateway.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
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
