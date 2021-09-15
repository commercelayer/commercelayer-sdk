/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Order } from './orders'
import { PaymentGateway } from './payment_gateways'


type ExternalPaymentRel = ResourceId & { type: typeof ExternalPayments.TYPE }
type OrderRel = ResourceId & { type: 'orders' }


interface ExternalPayment extends Resource {
	
	payment_source_token?: string
	options?: object

	order?: Order
	payment_gateway?: PaymentGateway

}


interface ExternalPaymentCreate extends ResourceCreate {
	
	payment_source_token: string
	options?: object

	order?: OrderRel

}


interface ExternalPaymentUpdate extends ResourceUpdate {
	
	options?: object

	order?: OrderRel

}


class ExternalPayments extends ApiResource {

	static readonly TYPE: 'external_payments' = 'external_payments'
	// static readonly PATH = 'external_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ExternalPayment>> {
		return this.resources.list({ type: ExternalPayments.TYPE }, params, options)
	}

	async create(resource: ExternalPaymentCreate, options?: ResourcesConfig): Promise<ExternalPayment> {
		return this.resources.create(Object.assign(resource, { type: ExternalPayments.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPayment> {
		return this.resources.retrieve<ExternalPayment>({ type: ExternalPayments.TYPE, id }, params, options)
	}

	async update(resource: ExternalPaymentUpdate, options?: ResourcesConfig): Promise<ExternalPayment> {
		return this.resources.update({ ...resource, type: ExternalPayments.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ExternalPayments.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isExternalPayment(resource: any): resource is ExternalPayment {
		return resource.type && (resource.type === ExternalPayments.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(ExternalPayments.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(ExternalPayments.TYPE)
	}
	*/

	relationship(id: string | ResourceId): ExternalPaymentRel {
		return (typeof id === 'string') ? { id, type: ExternalPayments.TYPE } : {id: id.id, type: ExternalPayments.TYPE }
	}

}


export default ExternalPayments

export { ExternalPayment, ExternalPaymentCreate, ExternalPaymentUpdate }
