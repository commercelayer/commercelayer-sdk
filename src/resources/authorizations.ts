import { ApiResource, Resource, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order } from './orders'
import type { Capture } from './captures'
import type { Void } from './voids'
import type { Event } from './events'


type AuthorizationType = 'authorizations'
type AuthorizationRel = ResourceRel & { type: AuthorizationType }


interface Authorization extends Resource {
	
	readonly type: AuthorizationType

	number: string
	currency_code: string
	amount_cents: number
	amount_float: number
	formatted_amount: string
	succeeded: boolean
	message?: string
	error_code?: string
	error_detail?: string
	token?: string
	gateway_transaction_id?: string
	cvv_code?: string
	cvv_message?: string
	avs_code?: string
	avs_message?: string
	fraud_review?: string
	capture_amount_cents?: number
	capture_amount_float?: number
	formatted_capture_amount?: string
	capture_balance_cents?: number
	capture_balance_float?: number
	formatted_capture_balance?: string
	void_balance_cents?: number
	void_balance_float?: number
	formatted_void_balance?: string

	order?: Order
	captures?: Capture[]
	voids?: Void[]
	events?: Event[]

}


interface AuthorizationUpdate extends ResourceUpdate {
	
	_capture?: boolean
	_capture_amount_cents?: number
	_void?: boolean
	
}


class Authorizations extends ApiResource<Authorization> {

	static readonly TYPE: AuthorizationType = 'authorizations' as const
	// static readonly PATH = 'authorizations'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Authorization>> {
		return this.resources.list<Authorization>({ type: Authorizations.TYPE }, params, options)
	}

	async update(resource: AuthorizationUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Authorization> {
		return this.resources.update<AuthorizationUpdate, Authorization>({ ...resource, type: Authorizations.TYPE }, params, options)
	}

	async order(authorizationId: string | Authorization, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _authorizationId = (authorizationId as Authorization).id || authorizationId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `authorizations/${_authorizationId}/order`, params, options) as unknown as Order
	}

	async captures(authorizationId: string | Authorization, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Capture>> {
		const _authorizationId = (authorizationId as Authorization).id || authorizationId as string
		return this.resources.fetch<Capture>({ type: 'captures' }, `authorizations/${_authorizationId}/captures`, params, options) as unknown as ListResponse<Capture>
	}

	async voids(authorizationId: string | Authorization, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Void>> {
		const _authorizationId = (authorizationId as Authorization).id || authorizationId as string
		return this.resources.fetch<Void>({ type: 'voids' }, `authorizations/${_authorizationId}/voids`, params, options) as unknown as ListResponse<Void>
	}

	async events(authorizationId: string | Authorization, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _authorizationId = (authorizationId as Authorization).id || authorizationId as string
		return this.resources.fetch<Event>({ type: 'events' }, `authorizations/${_authorizationId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isAuthorization(resource: any): resource is Authorization {
		return resource.type && (resource.type === Authorizations.TYPE)
	}


	relationship(id: string | ResourceId | null): AuthorizationRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Authorizations.TYPE } : { id: id.id, type: Authorizations.TYPE }
	}


	type(): AuthorizationType {
		return Authorizations.TYPE
	}

}


export default Authorizations

export type { Authorization, AuthorizationUpdate, AuthorizationType }
