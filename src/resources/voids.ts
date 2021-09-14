/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Order } from './orders'
import { ReferenceAuthorization } from './reference_authorizations'


type VoidRel = ResourceId & { type: typeof Voids.TYPE }


interface Void extends Resource {
	
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

	order?: Order
	reference_authorization?: ReferenceAuthorization

}


type VoidCreate = ResourceCreate


type VoidUpdate = ResourceUpdate


class Voids extends ApiResource {

	static readonly TYPE: 'voids' = 'voids'
	// static readonly PATH = 'voids'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Void>> {
		return this.resources.list({ type: Voids.TYPE }, params, options)
	}

	async create(resource: VoidCreate, options?: ResourcesConfig): Promise<Void> {
		return this.resources.create(Object.assign(resource, { type: Voids.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Void> {
		return this.resources.retrieve<Void>({ type: Voids.TYPE, id }, params, options)
	}

	async update(resource: VoidUpdate, options?: ResourcesConfig): Promise<Void> {
		return this.resources.update({ ...resource, type: Voids.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: Voids.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isVoid(resource: any): resource is Void {
		return resource.type && (resource.type === Voids.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Voids.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Voids.TYPE)
	}
	*/

	relationship(id: string | ResourceId): VoidRel {
		return (typeof id === 'string') ? { id, type: Voids.TYPE } : {id: id.id, type: Voids.TYPE }
	}

}


export default Voids

export { Void, VoidCreate, VoidUpdate }
