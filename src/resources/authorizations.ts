import { ApiResource } from '../resource'
import type { Resource, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order } from './orders'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Version } from './versions'
import type { EventStore } from './event_stores'
import type { Capture } from './captures'
import type { Void } from './voids'
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


type AuthorizationType = 'authorizations'
type AuthorizationRel = ResourceRel & { type: AuthorizationType }


export type AuthorizationSort = Pick<Authorization, 'id' | 'number' | 'amount_cents'> & ResourceSort
// export type AuthorizationFilter = Pick<Authorization, 'id' | 'number' | 'currency_code' | 'amount_cents' | 'succeeded' | 'message' | 'error_code' | 'error_detail' | 'token' | 'gateway_transaction_id'> & ResourceFilter


interface Authorization extends Resource {
	
	readonly type: AuthorizationType

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
	 * The CVV code returned by the payment gateway.
	 * @example ```"000"```
	 */
	cvv_code?: string | null
	/** 
	 * The CVV message returned by the payment gateway.
	 * @example ```"validated"```
	 */
	cvv_message?: string | null
	/** 
	 * The AVS code returned by the payment gateway.
	 * @example ```"000"```
	 */
	avs_code?: string | null
	/** 
	 * The AVS message returned by the payment gateway.
	 * @example ```"validated"```
	 */
	avs_message?: string | null
	/** 
	 * The fraud review message, if any, returned by the payment gateway.
	 * @example ```"passed"```
	 */
	fraud_review?: string | null
	/** 
	 * The amount to be captured, in cents.
	 * @example ```500```
	 */
	capture_amount_cents?: number | null
	/** 
	 * The amount to be captured, float.
	 * @example ```5```
	 */
	capture_amount_float?: number | null
	/** 
	 * The amount to be captured, formatted.
	 * @example ```"€5,00"```
	 */
	formatted_capture_amount?: string | null
	/** 
	 * The balance to be captured, in cents.
	 * @example ```1000```
	 */
	capture_balance_cents?: number | null
	/** 
	 * The balance to be captured, float.
	 * @example ```10```
	 */
	capture_balance_float?: number | null
	/** 
	 * The balance to be captured, formatted.
	 * @example ```"€10,00"```
	 */
	formatted_capture_balance?: string | null
	/** 
	 * The balance to be voided, in cents.
	 * @example ```1500```
	 */
	void_balance_cents?: number | null
	/** 
	 * The balance to be voided, float.
	 * @example ```15```
	 */
	void_balance_float?: number | null
	/** 
	 * The balance to be voided, formatted.
	 * @example ```"€15,00"```
	 */
	formatted_void_balance?: string | null

	order?: Order | null
	payment_source?: AdyenPayment | AxervePayment | BraintreePayment | CheckoutComPayment | ExternalPayment | KlarnaPayment | PaypalPayment | SatispayPayment | StripePayment | WireTransfer | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	versions?: Version[] | null
	event_stores?: EventStore[] | null
	captures?: Capture[] | null
	voids?: Void[] | null

}


interface AuthorizationUpdate extends ResourceUpdate {
	
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
	 * Send this attribute if you want to create a capture for this authorization.
	 * @example ```true```
	 */
	_capture?: boolean | null
	/** 
	 * Send this attribute as a value in cents if you want to overwrite the amount to be captured.
	 * @example ```500```
	 */
	_capture_amount_cents?: number | null
	/** 
	 * Send this attribute if you want to create a void for this authorization.
	 * @example ```true```
	 */
	_void?: boolean | null
	/** 
	 * Send this attribute if you want to void a succeeded authorization of a pending order (which is left unpaid).
	 * @example ```true```
	 */
	_cancel?: boolean | null
	
}


class Authorizations extends ApiResource<Authorization> {

	static readonly TYPE: AuthorizationType = 'authorizations' as const

	async update(resource: AuthorizationUpdate, params?: QueryParamsRetrieve<Authorization>, options?: ResourcesConfig): Promise<Authorization> {
		return this.resources.update<AuthorizationUpdate, Authorization>({ ...resource, type: Authorizations.TYPE }, params, options)
	}

	async order(authorizationId: string | Authorization, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _authorizationId = (authorizationId as Authorization).id || authorizationId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `authorizations/${_authorizationId}/order`, params, options) as unknown as Order
	}

	async attachments(authorizationId: string | Authorization, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _authorizationId = (authorizationId as Authorization).id || authorizationId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `authorizations/${_authorizationId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(authorizationId: string | Authorization, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _authorizationId = (authorizationId as Authorization).id || authorizationId as string
		return this.resources.fetch<Event>({ type: 'events' }, `authorizations/${_authorizationId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(authorizationId: string | Authorization, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _authorizationId = (authorizationId as Authorization).id || authorizationId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `authorizations/${_authorizationId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async event_stores(authorizationId: string | Authorization, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _authorizationId = (authorizationId as Authorization).id || authorizationId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `authorizations/${_authorizationId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}

	async captures(authorizationId: string | Authorization, params?: QueryParamsList<Capture>, options?: ResourcesConfig): Promise<ListResponse<Capture>> {
		const _authorizationId = (authorizationId as Authorization).id || authorizationId as string
		return this.resources.fetch<Capture>({ type: 'captures' }, `authorizations/${_authorizationId}/captures`, params, options) as unknown as ListResponse<Capture>
	}

	async voids(authorizationId: string | Authorization, params?: QueryParamsList<Void>, options?: ResourcesConfig): Promise<ListResponse<Void>> {
		const _authorizationId = (authorizationId as Authorization).id || authorizationId as string
		return this.resources.fetch<Void>({ type: 'voids' }, `authorizations/${_authorizationId}/voids`, params, options) as unknown as ListResponse<Void>
	}

	async _forward(id: string | Authorization, params?: QueryParamsRetrieve<Authorization>, options?: ResourcesConfig): Promise<Authorization> {
		return this.resources.update<AuthorizationUpdate, Authorization>({ id: (typeof id === 'string')? id: id.id, type: Authorizations.TYPE, _forward: true }, params, options)
	}

	async _capture(id: string | Authorization, params?: QueryParamsRetrieve<Authorization>, options?: ResourcesConfig): Promise<Authorization> {
		return this.resources.update<AuthorizationUpdate, Authorization>({ id: (typeof id === 'string')? id: id.id, type: Authorizations.TYPE, _capture: true }, params, options)
	}

	async _capture_amount_cents(id: string | Authorization, triggerValue: number, params?: QueryParamsRetrieve<Authorization>, options?: ResourcesConfig): Promise<Authorization> {
		return this.resources.update<AuthorizationUpdate, Authorization>({ id: (typeof id === 'string')? id: id.id, type: Authorizations.TYPE, _capture_amount_cents: triggerValue }, params, options)
	}

	async _void(id: string | Authorization, params?: QueryParamsRetrieve<Authorization>, options?: ResourcesConfig): Promise<Authorization> {
		return this.resources.update<AuthorizationUpdate, Authorization>({ id: (typeof id === 'string')? id: id.id, type: Authorizations.TYPE, _void: true }, params, options)
	}

	async _cancel(id: string | Authorization, params?: QueryParamsRetrieve<Authorization>, options?: ResourcesConfig): Promise<Authorization> {
		return this.resources.update<AuthorizationUpdate, Authorization>({ id: (typeof id === 'string')? id: id.id, type: Authorizations.TYPE, _cancel: true }, params, options)
	}


	isAuthorization(resource: any): resource is Authorization {
		return resource.type && (resource.type === Authorizations.TYPE)
	}


	relationship(id: string | ResourceId | null): AuthorizationRel {
		return super.relationshipOneToOne<AuthorizationRel>(id)
	}

	relationshipToMany(...ids: string[]): AuthorizationRel[] {
		return super.relationshipOneToMany<AuthorizationRel>(...ids)
	}


	type(): AuthorizationType {
		return Authorizations.TYPE
	}

}


const instance = new Authorizations()
export default instance

export type { Authorizations, Authorization, AuthorizationUpdate, AuthorizationType }
