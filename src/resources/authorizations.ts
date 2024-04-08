import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order } from './orders'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Version } from './versions'
import type { Capture } from './captures'
import type { Void } from './voids'


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
	message?: Nullable<string>
	/** 
	 * The error code, if any, returned by the payment gateway.
	 * @example ```"00001"```
	 */
	error_code?: Nullable<string>
	/** 
	 * The error detail, if any, returned by the payment gateway.
	 * @example ```"Already settled"```
	 */
	error_detail?: Nullable<string>
	/** 
	 * The token identifying the transaction, returned by the payment gateway.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	token?: Nullable<string>
	/** 
	 * The ID identifying the transaction, returned by the payment gateway.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	gateway_transaction_id?: Nullable<string>
	/** 
	 * The CVV code returned by the payment gateway.
	 * @example ```"000"```
	 */
	cvv_code?: Nullable<string>
	/** 
	 * The CVV message returned by the payment gateway.
	 * @example ```"validated"```
	 */
	cvv_message?: Nullable<string>
	/** 
	 * The AVS code returned by the payment gateway.
	 * @example ```"000"```
	 */
	avs_code?: Nullable<string>
	/** 
	 * The AVS message returned by the payment gateway.
	 * @example ```"validated"```
	 */
	avs_message?: Nullable<string>
	/** 
	 * The fraud review message, if any, returned by the payment gateway.
	 * @example ```"passed"```
	 */
	fraud_review?: Nullable<string>
	/** 
	 * The amount to be captured, in cents..
	 * @example ```"500"```
	 */
	capture_amount_cents?: Nullable<number>
	/** 
	 * The amount to be captured, float..
	 * @example ```"5"```
	 */
	capture_amount_float?: Nullable<number>
	/** 
	 * The amount to be captured, formatted..
	 * @example ```"€5,00"```
	 */
	formatted_capture_amount?: Nullable<string>
	/** 
	 * The balance to be captured, in cents..
	 * @example ```"1000"```
	 */
	capture_balance_cents?: Nullable<number>
	/** 
	 * The balance to be captured, float..
	 * @example ```"10"```
	 */
	capture_balance_float?: Nullable<number>
	/** 
	 * The balance to be captured, formatted..
	 * @example ```"€10,00"```
	 */
	formatted_capture_balance?: Nullable<string>
	/** 
	 * The balance to be voided, in cents..
	 * @example ```"1500"```
	 */
	void_balance_cents?: Nullable<number>
	/** 
	 * The balance to be voided, float..
	 * @example ```"15"```
	 */
	void_balance_float?: Nullable<number>
	/** 
	 * The balance to be voided, formatted..
	 * @example ```"€15,00"```
	 */
	formatted_void_balance?: Nullable<string>

	order?: Nullable<Order>
	attachments?: Nullable<Attachment[]>
	events?: Nullable<Event[]>
	versions?: Nullable<Version[]>
	captures?: Nullable<Capture[]>
	voids?: Nullable<Void[]>

}


interface AuthorizationUpdate extends ResourceUpdate {
	
	/** 
	 * Send this attribute if you want to create a capture for this authorization..
	 * @example ```"true"```
	 */
	_capture?: Nullable<boolean>
	/** 
	 * The associated capture amount, in cents..
	 * @example ```"500"```
	 */
	_capture_amount_cents?: Nullable<number>
	/** 
	 * Send this attribute if you want to create a void for this authorization..
	 * @example ```"true"```
	 */
	_void?: Nullable<boolean>
	
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

	async captures(authorizationId: string | Authorization, params?: QueryParamsList<Capture>, options?: ResourcesConfig): Promise<ListResponse<Capture>> {
		const _authorizationId = (authorizationId as Authorization).id || authorizationId as string
		return this.resources.fetch<Capture>({ type: 'captures' }, `authorizations/${_authorizationId}/captures`, params, options) as unknown as ListResponse<Capture>
	}

	async voids(authorizationId: string | Authorization, params?: QueryParamsList<Void>, options?: ResourcesConfig): Promise<ListResponse<Void>> {
		const _authorizationId = (authorizationId as Authorization).id || authorizationId as string
		return this.resources.fetch<Void>({ type: 'voids' }, `authorizations/${_authorizationId}/voids`, params, options) as unknown as ListResponse<Void>
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


export default Authorizations

export type { Authorization, AuthorizationUpdate, AuthorizationType }
