import { ApiResource } from '../resource'
import type { Resource, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, /* ResourceFilterable */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order } from './orders'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Version } from './versions'
import type { Capture } from './captures'
import type { Void } from './voids'


type AuthorizationType = 'authorizations'
type AuthorizationRel = ResourceRel & { type: AuthorizationType }


export type AuthorizationSortable = Pick<Authorization, 'id' | 'number' | 'amount_cents'> & ResourceSortable
// export type AuthorizationFilterable = Pick<Authorization, 'id' | 'number' | 'currency_code' | 'amount_cents' | 'succeeded' | 'message' | 'error_code' | 'error_detail' | 'token' | 'gateway_transaction_id'> & ResourceFilterable


interface Authorization extends Resource {
	
	readonly type: AuthorizationType

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
	cvv_code?: string | null
	cvv_message?: string | null
	avs_code?: string | null
	avs_message?: string | null
	fraud_review?: string | null
	capture_amount_cents?: number | null
	capture_amount_float?: number | null
	formatted_capture_amount?: string | null
	capture_balance_cents?: number | null
	capture_balance_float?: number | null
	formatted_capture_balance?: string | null
	void_balance_cents?: number | null
	void_balance_float?: number | null
	formatted_void_balance?: string | null

	order?: Order | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	versions?: Version[] | null
	captures?: Capture[] | null
	voids?: Void[] | null

}


interface AuthorizationUpdate extends ResourceUpdate {
	
	_capture?: boolean | null
	_capture_amount_cents?: number | null
	_void?: boolean | null
	
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

/*
export const AuthorizationsClient = (init: ResourceAdapter | ResourcesInitConfig): Authorizations => {
	return new Authorizations((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
