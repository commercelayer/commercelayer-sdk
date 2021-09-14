/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Order } from './orders'
import { Authorization } from './authorizations'
import { Refund } from './refunds'


type CaptureRel = ResourceId & { type: typeof Captures.TYPE }


interface Capture extends Resource {
	
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
	refund_amount_cents?: number
	refund_amount_float?: number
	formatted_refund_amount?: string
	refund_balance_cents?: number
	refund_balance_float?: number
	formatted_refund_balance?: string

	order?: Order
	reference_authorization?: Authorization
	refunds?: Refund[]

}


interface CaptureUpdate extends ResourceUpdate {
	
	_refund?: boolean
	_refund_amount_cents?: number
	
}


class Captures extends ApiResource {

	static readonly TYPE: 'captures' = 'captures'
	// static readonly PATH = 'captures'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Capture>> {
		return this.resources.list({ type: Captures.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Capture> {
		return this.resources.retrieve<Capture>({ type: Captures.TYPE, id }, params, options)
	}

	async update(resource: CaptureUpdate, options?: ResourcesConfig): Promise<Capture> {
		return this.resources.update({ ...resource, type: Captures.TYPE }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCapture(resource: any): resource is Capture {
		return resource.type && (resource.type === Captures.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Captures.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Captures.TYPE)
	}
	*/

	relationship(id: string | ResourceId): CaptureRel {
		return (typeof id === 'string') ? { id, type: Captures.TYPE } : {id: id.id, type: Captures.TYPE }
	}

}


export default Captures

export { Capture, CaptureUpdate }
