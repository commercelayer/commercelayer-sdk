import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order } from './orders'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Version } from './versions'
import type { Authorization } from './authorizations'


type VoidType = 'voids'
type VoidRel = ResourceRel & { type: VoidType }


export type VoidSort = Pick<Void, 'id' | 'number' | 'amount_cents'> & ResourceSort
// export type VoidFilter = Pick<Void, 'id' | 'number' | 'currency_code' | 'amount_cents' | 'succeeded' | 'message' | 'error_code' | 'error_detail' | 'token' | 'gateway_transaction_id'> & ResourceFilter


interface Void extends Resource {
	
	readonly type: VoidType

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
	 * @example ```"1500"```
	 */
	amount_cents: number
	/** 
	 * The transaction amount, float.
	 * @example ```"15"```
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

	order?: Order | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	versions?: Version[] | null
	reference_authorization?: Authorization | null

}


class Voids extends ApiResource<Void> {

	static readonly TYPE: VoidType = 'voids' as const

	async order(voidId: string | Void, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _voidId = (voidId as Void).id || voidId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `voids/${_voidId}/order`, params, options) as unknown as Order
	}

	async attachments(voidId: string | Void, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _voidId = (voidId as Void).id || voidId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `voids/${_voidId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(voidId: string | Void, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _voidId = (voidId as Void).id || voidId as string
		return this.resources.fetch<Event>({ type: 'events' }, `voids/${_voidId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(voidId: string | Void, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _voidId = (voidId as Void).id || voidId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `voids/${_voidId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async reference_authorization(voidId: string | Void, params?: QueryParamsRetrieve<Authorization>, options?: ResourcesConfig): Promise<Authorization> {
		const _voidId = (voidId as Void).id || voidId as string
		return this.resources.fetch<Authorization>({ type: 'authorizations' }, `voids/${_voidId}/reference_authorization`, params, options) as unknown as Authorization
	}


	isVoid(resource: any): resource is Void {
		return resource.type && (resource.type === Voids.TYPE)
	}


	relationship(id: string | ResourceId | null): VoidRel {
		return super.relationshipOneToOne<VoidRel>(id)
	}

	relationshipToMany(...ids: string[]): VoidRel[] {
		return super.relationshipOneToMany<VoidRel>(...ids)
	}


	type(): VoidType {
		return Voids.TYPE
	}

}


export default Voids

export type { Void, VoidType }
