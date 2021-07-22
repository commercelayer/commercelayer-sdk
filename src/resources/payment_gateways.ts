/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 21-07-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, DocWithData, ResourceId } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { PaymentMethod } from './payment_methods'




interface PaymentGateway extends Resource {
	
	name?: string

	payment_methods?: PaymentMethod[]

}


interface PaymentGatewayCreate extends ResourceCreate {
	
	name: string
	
}


interface PaymentGatewayUpdate extends ResourceUpdate {
	
	name?: string
	
}


class PaymentGateways extends ApiResource {

	static readonly TYPE: 'payment_gateways' = 'payment_gateways'
	// static readonly PATH = 'payment_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<PaymentGateway[] | DocWithData<PaymentGateway>> {
		return this.resources.list({ type: PaymentGateways.TYPE }, params, options)
	}

	async create(resource: PaymentGatewayCreate, options?: ResourcesConfig): Promise<PaymentGateway | DocWithData<PaymentGateway>> {
		return this.resources.create(Object.assign(resource, { type: PaymentGateways.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway | DocWithData<PaymentGateway>> {
		return this.resources.retrieve<PaymentGateway>({ type: PaymentGateways.TYPE, id }, params, options)
	}

	async update(resource: PaymentGatewayUpdate, options?: ResourcesConfig): Promise<PaymentGateway | DocWithData<PaymentGateway>> {
		return this.resources.update({ ...resource, type: PaymentGateways.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: PaymentGateways.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPaymentGateway(resource: any): resource is PaymentGateway {
		return resource.type && (resource.type === PaymentGateways.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(PaymentGateways.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(PaymentGateways.TYPE)
	}
	*/

	relationship(id: string): ResourceId & { type: typeof PaymentGateways.TYPE } {
		return { id, type: PaymentGateways.TYPE }
	}

}


export default PaymentGateways

export { PaymentGateway, PaymentGatewayCreate, PaymentGatewayUpdate }
