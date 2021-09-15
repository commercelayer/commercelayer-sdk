/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Order } from './orders'
import { Capture } from './captures'
import { Void } from './voids'


type AuthorizationRel = ResourceId & { type: typeof Authorizations.TYPE }


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
		return this.resources.list({ type: Authorizations.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Authorization> {
		return this.resources.retrieve<Authorization>({ type: Authorizations.TYPE, id }, params, options)
	}

	async update(resource: AuthorizationUpdate, options?: ResourcesConfig): Promise<Authorization> {
		return this.resources.update({ ...resource, type: Authorizations.TYPE }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isAuthorization(resource: any): resource is Authorization {
		return resource.type && (resource.type === Authorizations.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Authorizations.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Authorizations.TYPE)
	}
	*/

	relationship(id: string | ResourceId): AuthorizationRel {
		return (typeof id === 'string') ? { id, type: Authorizations.TYPE } : {id: id.id, type: Authorizations.TYPE }
	}

}


export default Authorizations

export { Authorization, AuthorizationUpdate }
