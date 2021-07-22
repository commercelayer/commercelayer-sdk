/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 21-07-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, DocWithData, ResourceId } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Order } from './orders'
import { PaymentGateway } from './payment_gateways'


type OrderRel = ResourceId & { type: 'orders' }


interface PaypalPayment extends Resource {
	
	return_url?: string
	cancel_url?: string
	note_to_payer?: string
	paypal_payer_id?: string
	name?: string
	paypal_id?: string
	status?: string
	approval_url?: string

	order?: Order
	payment_gateway?: PaymentGateway

}


interface PaypalPaymentCreate extends ResourceCreate {
	
	return_url: string
	cancel_url: string
	note_to_payer?: string

	order?: OrderRel

}


interface PaypalPaymentUpdate extends ResourceUpdate {
	
	paypal_payer_id?: string

	order?: OrderRel

}


class PaypalPayments extends ApiResource {

	static readonly TYPE: 'paypal_payments' = 'paypal_payments'
	// static readonly PATH = 'paypal_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<PaypalPayment[] | DocWithData<PaypalPayment>> {
		return this.resources.list({ type: PaypalPayments.TYPE }, params, options)
	}

	async create(resource: PaypalPaymentCreate, options?: ResourcesConfig): Promise<PaypalPayment | DocWithData<PaypalPayment>> {
		return this.resources.create(Object.assign(resource, { type: PaypalPayments.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaypalPayment | DocWithData<PaypalPayment>> {
		return this.resources.retrieve<PaypalPayment>({ type: PaypalPayments.TYPE, id }, params, options)
	}

	async update(resource: PaypalPaymentUpdate, options?: ResourcesConfig): Promise<PaypalPayment | DocWithData<PaypalPayment>> {
		return this.resources.update({ ...resource, type: PaypalPayments.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: PaypalPayments.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPaypalPayment(resource: any): resource is PaypalPayment {
		return resource.type && (resource.type === PaypalPayments.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(PaypalPayments.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(PaypalPayments.TYPE)
	}
	*/

	relationship(id: string): ResourceId & { type: typeof PaypalPayments.TYPE } {
		return { id, type: PaypalPayments.TYPE }
	}

}


export default PaypalPayments

export { PaypalPayment, PaypalPaymentCreate, PaypalPaymentUpdate }
