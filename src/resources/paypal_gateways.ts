/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { PaymentMethod } from './payment_methods'
import { PaypalPayment } from './paypal_payments'


type PaypalGatewayRel = ResourceId & { type: typeof PaypalGateways.TYPE }


interface PaypalGateway extends Resource {
	
	name?: string

	payment_methods?: PaymentMethod[]
	paypal_payments?: PaypalPayment[]

}


interface PaypalGatewayCreate extends ResourceCreate {
	
	name: string
	client_id: string
	client_secret: string
	mode: string
	
}


interface PaypalGatewayUpdate extends ResourceUpdate {
	
	name?: string
	client_id?: string
	client_secret?: string
	mode?: string
	
}


class PaypalGateways extends ApiResource {

	static readonly TYPE: 'paypal_gateways' = 'paypal_gateways'
	// static readonly PATH = 'paypal_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaypalGateway>> {
		return this.resources.list({ type: PaypalGateways.TYPE }, params, options)
	}

	async create(resource: PaypalGatewayCreate, options?: ResourcesConfig): Promise<PaypalGateway> {
		return this.resources.create(Object.assign(resource, { type: PaypalGateways.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaypalGateway> {
		return this.resources.retrieve<PaypalGateway>({ type: PaypalGateways.TYPE, id }, params, options)
	}

	async update(resource: PaypalGatewayUpdate, options?: ResourcesConfig): Promise<PaypalGateway> {
		return this.resources.update({ ...resource, type: PaypalGateways.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: PaypalGateways.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPaypalGateway(resource: any): resource is PaypalGateway {
		return resource.type && (resource.type === PaypalGateways.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(PaypalGateways.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(PaypalGateways.TYPE)
	}
	*/

	relationship(id: string | ResourceId): PaypalGatewayRel {
		return (typeof id === 'string') ? { id, type: PaypalGateways.TYPE } : {id: id.id, type: PaypalGateways.TYPE }
	}

}


export default PaypalGateways

export { PaypalGateway, PaypalGatewayCreate, PaypalGatewayUpdate }
