import { ApiResource, Resource, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Order } from './orders'
import type { Capture } from './captures'
import type { Void } from './voids'


type AuthorizationRel = ResourceRel & { type: typeof Authorizations.TYPE }


interface Authorization extends Resource {
	
	number?: string
	currency_code?: string
	amount_cents?: number
	amount_float?: number
	formatted_amount?: string
	succeeded?: boolean
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

}


interface AuthorizationUpdate extends ResourceUpdate {
	
	_capture?: boolean
	_capture_amount_cents?: number
	_void?: boolean
	
}


class Authorizations extends ApiResource {

	static readonly TYPE: 'authorizations' = 'authorizations'
	// static readonly PATH = 'authorizations'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Authorization>> {
		return this.resources.list<Authorization>({ type: Authorizations.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Authorization> {
		return this.resources.retrieve<Authorization>({ type: Authorizations.TYPE, id }, params, options)
	}

	async update(resource: AuthorizationUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Authorization> {
		return this.resources.update<AuthorizationUpdate, Authorization>({ ...resource, type: Authorizations.TYPE }, params, options)
	}

	async order(authorizationId: string | Authorization, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _authorizationId = (authorizationId as Authorization).id || authorizationId
		return this.resources.fetch<Order>({ type: 'orders' }, `authorizations/${_authorizationId}/order`, params, options) as unknown as Order
	}

	async captures(authorizationId: string | Authorization, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Capture>> {
		const _authorizationId = (authorizationId as Authorization).id || authorizationId
		return this.resources.fetch<Capture>({ type: 'captures' }, `authorizations/${_authorizationId}/captures`, params, options) as unknown as ListResponse<Capture>
	}

	async voids(authorizationId: string | Authorization, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Void>> {
		const _authorizationId = (authorizationId as Authorization).id || authorizationId
		return this.resources.fetch<Void>({ type: 'voids' }, `authorizations/${_authorizationId}/voids`, params, options) as unknown as ListResponse<Void>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isAuthorization(resource: any): resource is Authorization {
		return resource.type && (resource.type === Authorizations.TYPE)
	}


	relationship(id: string | ResourceId | null): AuthorizationRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Authorizations.TYPE } : { id: id.id, type: Authorizations.TYPE }
	}


	type(): string {
		return Authorizations.TYPE
	}

}


export default Authorizations

export { Authorization, AuthorizationUpdate }
