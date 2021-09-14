/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Order } from './orders'
import { PaymentGateway } from './payment_gateways'


type BraintreePaymentRel = ResourceId & { type: typeof BraintreePayments.TYPE }
type OrderRel = ResourceId & { type: 'orders' }


interface BraintreePayment extends Resource {
	
	client_token?: string
	payment_method_nonce?: string
	payment_id?: string
	local?: boolean
	options?: object

	order?: Order
	payment_gateway?: PaymentGateway

}


interface BraintreePaymentCreate extends ResourceCreate {
	
	payment_id?: string
	local?: boolean
	options?: object

	order?: OrderRel

}


interface BraintreePaymentUpdate extends ResourceUpdate {
	
	payment_method_nonce?: string
	payment_id?: string
	local?: boolean
	options?: object

	order?: OrderRel

}


class BraintreePayments extends ApiResource {

	static readonly TYPE: 'braintree_payments' = 'braintree_payments'
	// static readonly PATH = 'braintree_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<BraintreePayment>> {
		return this.resources.list({ type: BraintreePayments.TYPE }, params, options)
	}

	async create(resource: BraintreePaymentCreate, options?: ResourcesConfig): Promise<BraintreePayment> {
		return this.resources.create(Object.assign(resource, { type: BraintreePayments.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BraintreePayment> {
		return this.resources.retrieve<BraintreePayment>({ type: BraintreePayments.TYPE, id }, params, options)
	}

	async update(resource: BraintreePaymentUpdate, options?: ResourcesConfig): Promise<BraintreePayment> {
		return this.resources.update({ ...resource, type: BraintreePayments.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: BraintreePayments.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isBraintreePayment(resource: any): resource is BraintreePayment {
		return resource.type && (resource.type === BraintreePayments.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(BraintreePayments.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(BraintreePayments.TYPE)
	}
	*/

	relationship(id: string | ResourceId): BraintreePaymentRel {
		return (typeof id === 'string') ? { id, type: BraintreePayments.TYPE } : {id: id.id, type: BraintreePayments.TYPE }
	}

}


export default BraintreePayments

export { BraintreePayment, BraintreePaymentCreate, BraintreePaymentUpdate }
