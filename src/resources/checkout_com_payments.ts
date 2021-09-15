/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Order } from './orders'
import { PaymentGateway } from './payment_gateways'


type CheckoutComPaymentRel = ResourceId & { type: typeof CheckoutComPayments.TYPE }
type OrderRel = ResourceId & { type: 'orders' }


interface CheckoutComPayment extends Resource {
	
	payment_type?: string
	token?: string
	session_id?: string
	source_id?: string
	customer_token?: string
	redirect_uri?: string
	payment_response?: object

	order?: Order
	payment_gateway?: PaymentGateway

}


interface CheckoutComPaymentCreate extends ResourceCreate {
	
	payment_type: string
	token: string
	session_id?: string

	order?: OrderRel

}


interface CheckoutComPaymentUpdate extends ResourceUpdate {
	
	payment_type?: string
	token?: string
	session_id?: string
	_authorize?: boolean
	_details?: boolean
	_refresh?: boolean

	order?: OrderRel

}


class CheckoutComPayments extends ApiResource {

	static readonly TYPE: 'checkout_com_payments' = 'checkout_com_payments'
	// static readonly PATH = 'checkout_com_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CheckoutComPayment>> {
		return this.resources.list({ type: CheckoutComPayments.TYPE }, params, options)
	}

	async create(resource: CheckoutComPaymentCreate, options?: ResourcesConfig): Promise<CheckoutComPayment> {
		return this.resources.create(Object.assign(resource, { type: CheckoutComPayments.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComPayment> {
		return this.resources.retrieve<CheckoutComPayment>({ type: CheckoutComPayments.TYPE, id }, params, options)
	}

	async update(resource: CheckoutComPaymentUpdate, options?: ResourcesConfig): Promise<CheckoutComPayment> {
		return this.resources.update({ ...resource, type: CheckoutComPayments.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: CheckoutComPayments.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCheckoutComPayment(resource: any): resource is CheckoutComPayment {
		return resource.type && (resource.type === CheckoutComPayments.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(CheckoutComPayments.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(CheckoutComPayments.TYPE)
	}
	*/

	relationship(id: string | ResourceId): CheckoutComPaymentRel {
		return (typeof id === 'string') ? { id, type: CheckoutComPayments.TYPE } : {id: id.id, type: CheckoutComPayments.TYPE }
	}

}


export default CheckoutComPayments

export { CheckoutComPayment, CheckoutComPaymentCreate, CheckoutComPaymentUpdate }
