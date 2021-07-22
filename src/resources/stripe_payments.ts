/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 22-07-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Order } from './orders'
import { PaymentGateway } from './payment_gateways'


type OrderRel = ResourceId & { type: 'orders' }


interface StripePayment extends Resource {
	
	client_secret?: string
	publishable_key?: string
	options?: object
	payment_method?: object

	order?: Order
	payment_gateway?: PaymentGateway

}


interface StripePaymentCreate extends ResourceCreate {
	
	options?: object

	order?: OrderRel

}


interface StripePaymentUpdate extends ResourceUpdate {
	
	options?: object

	order?: OrderRel

}


class StripePayments extends ApiResource {

	static readonly TYPE: 'stripe_payments' = 'stripe_payments'
	// static readonly PATH = 'stripe_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<StripePayment[]> {
		return this.resources.list({ type: StripePayments.TYPE }, params, options)
	}

	async create(resource: StripePaymentCreate, options?: ResourcesConfig): Promise<StripePayment> {
		return this.resources.create(Object.assign(resource, { type: StripePayments.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StripePayment> {
		return this.resources.retrieve<StripePayment>({ type: StripePayments.TYPE, id }, params, options)
	}

	async update(resource: StripePaymentUpdate, options?: ResourcesConfig): Promise<StripePayment> {
		return this.resources.update({ ...resource, type: StripePayments.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: StripePayments.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isStripePayment(resource: any): resource is StripePayment {
		return resource.type && (resource.type === StripePayments.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(StripePayments.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(StripePayments.TYPE)
	}
	*/

	relationship(id: string): ResourceId & { type: typeof StripePayments.TYPE } {
		return { id, type: StripePayments.TYPE }
	}

}


export default StripePayments

export { StripePayment, StripePaymentCreate, StripePaymentUpdate }
