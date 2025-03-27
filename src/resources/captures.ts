import { ApiResource } from '../resource'
import type { Resource, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order } from './orders'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Version } from './versions'
import type { Authorization } from './authorizations'
import type { Refund } from './refunds'
import type { Return } from './returns'
import type { AdyenPayment } from './adyen_payments'
import type { AxervePayment } from './axerve_payments'
import type { BraintreePayment } from './braintree_payments'
import type { CheckoutComPayment } from './checkout_com_payments'
import type { ExternalPayment } from './external_payments'
import type { KlarnaPayment } from './klarna_payments'
import type { PaypalPayment } from './paypal_payments'
import type { SatispayPayment } from './satispay_payments'
import type { StripePayment } from './stripe_payments'
import type { WireTransfer } from './wire_transfers'


type CaptureType = 'captures'
type CaptureRel = ResourceRel & { type: CaptureType }


export type CaptureSort = Pick<Capture, 'id' | 'number' | 'amount_cents'> & ResourceSort
// export type CaptureFilter = Pick<Capture, 'id' | 'number' | 'currency_code' | 'amount_cents' | 'succeeded' | 'message' | 'error_code' | 'error_detail' | 'token' | 'gateway_transaction_id'> & ResourceFilter


interface Capture extends Resource {
	
	readonly type: CaptureType

	/** 
	 * The transaction number, auto generated.
	 * @example ```"42/T/001"```
	 */
	number: string
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard, inherited from the associated order.
	 * @example ```"EUR"```
	 */
	currency_code: string
	/** 
	 * The transaction amount, in cents.
	 * @example ```1500```
	 */
	amount_cents: number
	/** 
	 * The transaction amount, float.
	 * @example ```15```
	 */
	amount_float: number
	/** 
	 * The transaction amount, formatted.
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
	/** 
	 * The amount to be refunded, in cents.
	 * @example ```500```
	 */
	refund_amount_cents?: number | null
	/** 
	 * The amount to be refunded, float.
	 * @example ```5```
	 */
	refund_amount_float?: number | null
	/** 
	 * The amount to be refunded, formatted.
	 * @example ```"€5,00"```
	 */
	formatted_refund_amount?: string | null
	/** 
	 * The balance to be refunded, in cents.
	 * @example ```1000```
	 */
	refund_balance_cents?: number | null
	/** 
	 * The balance to be refunded, float.
	 * @example ```10```
	 */
	refund_balance_float?: number | null
	/** 
	 * The balance to be refunded, formatted.
	 * @example ```"€10,00"```
	 */
	formatted_refund_balance?: string | null

	order?: Order | null
	payment_source?: AdyenPayment | AxervePayment | BraintreePayment | CheckoutComPayment | ExternalPayment | KlarnaPayment | PaypalPayment | SatispayPayment | StripePayment | WireTransfer | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	versions?: Version[] | null
	reference_authorization?: Authorization | null
	refunds?: Refund[] | null
	return?: Return | null

}


interface CaptureUpdate extends ResourceUpdate {
	
	/** 
	 * Indicates if the transaction is successful.
	 */
	succeeded?: boolean | null
	/** 
	 * Send this attribute if you want to forward a stuck transaction to succeeded and update associated order states accordingly.
	 * @example ```true```
	 */
	_forward?: boolean | null
	/** 
	 * Send this attribute if you want to create a refund for this capture.
	 * @example ```true```
	 */
	_refund?: boolean | null
	/** 
	 * Send this attribute as a value in cents if you want to overwrite the amount to be refunded.
	 * @example ```500```
	 */
	_refund_amount_cents?: number | null
	/** 
	 * Send this attribute if you want to refund a succeeded capture of a pending order (which is left unpaid).
	 * @example ```true```
	 */
	_cancel?: boolean | null
	
}


class Captures extends ApiResource<Capture> {

	static readonly TYPE: CaptureType = 'captures' as const

	async update(resource: CaptureUpdate, params?: QueryParamsRetrieve<Capture>, options?: ResourcesConfig): Promise<Capture> {
		return this.resources.update<CaptureUpdate, Capture>({ ...resource, type: Captures.TYPE }, params, options)
	}

	async order(captureId: string | Capture, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _captureId = (captureId as Capture).id || captureId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `captures/${_captureId}/order`, params, options) as unknown as Order
	}

	async attachments(captureId: string | Capture, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _captureId = (captureId as Capture).id || captureId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `captures/${_captureId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(captureId: string | Capture, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _captureId = (captureId as Capture).id || captureId as string
		return this.resources.fetch<Event>({ type: 'events' }, `captures/${_captureId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(captureId: string | Capture, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _captureId = (captureId as Capture).id || captureId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `captures/${_captureId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async reference_authorization(captureId: string | Capture, params?: QueryParamsRetrieve<Authorization>, options?: ResourcesConfig): Promise<Authorization> {
		const _captureId = (captureId as Capture).id || captureId as string
		return this.resources.fetch<Authorization>({ type: 'authorizations' }, `captures/${_captureId}/reference_authorization`, params, options) as unknown as Authorization
	}

	async refunds(captureId: string | Capture, params?: QueryParamsList<Refund>, options?: ResourcesConfig): Promise<ListResponse<Refund>> {
		const _captureId = (captureId as Capture).id || captureId as string
		return this.resources.fetch<Refund>({ type: 'refunds' }, `captures/${_captureId}/refunds`, params, options) as unknown as ListResponse<Refund>
	}

	async return(captureId: string | Capture, params?: QueryParamsRetrieve<Return>, options?: ResourcesConfig): Promise<Return> {
		const _captureId = (captureId as Capture).id || captureId as string
		return this.resources.fetch<Return>({ type: 'returns' }, `captures/${_captureId}/return`, params, options) as unknown as Return
	}

	async _forward(id: string | Capture, params?: QueryParamsRetrieve<Capture>, options?: ResourcesConfig): Promise<Capture> {
		return this.resources.update<CaptureUpdate, Capture>({ id: (typeof id === 'string')? id: id.id, type: Captures.TYPE, _forward: true }, params, options)
	}

	async _refund(id: string | Capture, params?: QueryParamsRetrieve<Capture>, options?: ResourcesConfig): Promise<Capture> {
		return this.resources.update<CaptureUpdate, Capture>({ id: (typeof id === 'string')? id: id.id, type: Captures.TYPE, _refund: true }, params, options)
	}

	async _refund_amount_cents(id: string | Capture, triggerValue: number, params?: QueryParamsRetrieve<Capture>, options?: ResourcesConfig): Promise<Capture> {
		return this.resources.update<CaptureUpdate, Capture>({ id: (typeof id === 'string')? id: id.id, type: Captures.TYPE, _refund_amount_cents: triggerValue }, params, options)
	}

	async _cancel(id: string | Capture, params?: QueryParamsRetrieve<Capture>, options?: ResourcesConfig): Promise<Capture> {
		return this.resources.update<CaptureUpdate, Capture>({ id: (typeof id === 'string')? id: id.id, type: Captures.TYPE, _cancel: true }, params, options)
	}


	isCapture(resource: any): resource is Capture {
		return resource.type && (resource.type === Captures.TYPE)
	}


	relationship(id: string | ResourceId | null): CaptureRel {
		return super.relationshipOneToOne<CaptureRel>(id)
	}

	relationshipToMany(...ids: string[]): CaptureRel[] {
		return super.relationshipOneToMany<CaptureRel>(...ids)
	}


	type(): CaptureType {
		return Captures.TYPE
	}

}


const instance = new Captures()
export default instance

export type { Capture, CaptureUpdate, CaptureType }
