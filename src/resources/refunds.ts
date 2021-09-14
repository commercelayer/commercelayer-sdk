/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Order } from './orders'
import { Capture } from './captures'


type RefundRel = ResourceId & { type: typeof Refunds.TYPE }


interface Refund extends Resource {
	
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
	reference_capture?: Capture

}


class Refunds extends ApiResource {

	static readonly TYPE: 'refunds' = 'refunds'
	// static readonly PATH = 'refunds'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Refund>> {
		return this.resources.list({ type: Refunds.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Refund> {
		return this.resources.retrieve<Refund>({ type: Refunds.TYPE, id }, params, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isRefund(resource: any): resource is Refund {
		return resource.type && (resource.type === Refunds.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Refunds.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Refunds.TYPE)
	}
	*/

	relationship(id: string | ResourceId): RefundRel {
		return (typeof id === 'string') ? { id, type: Refunds.TYPE } : {id: id.id, type: Refunds.TYPE }
	}

}


export default Refunds

export { Refund }
