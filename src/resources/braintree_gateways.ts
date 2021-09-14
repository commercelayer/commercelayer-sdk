/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { PaymentMethod } from './payment_methods'
import { BraintreePayment } from './braintree_payments'


type BraintreeGatewayRel = ResourceId & { type: typeof BraintreeGateways.TYPE }
type BraintreePaymentRel = ResourceId & { type: 'braintree_payments' }


interface BraintreeGateway extends Resource {
	
	name?: string
	descriptor_name?: string
	descriptor_phone?: string
	descriptor_url?: string
	webhook_endpoint_url?: string

	payment_methods?: PaymentMethod[]
	braintree_payments?: BraintreePayment[]

}


interface BraintreeGatewayCreate extends ResourceCreate {
	
	name: string
	merchant_account_id: string
	merchant_id: string
	public_key: string
	private_key: string
	descriptor_name?: string
	descriptor_phone?: string
	descriptor_url?: string

	braintree_payments?: BraintreePaymentRel[]

}


interface BraintreeGatewayUpdate extends ResourceUpdate {
	
	name?: string
	merchant_account_id?: string
	merchant_id?: string
	public_key?: string
	private_key?: string
	descriptor_name?: string
	descriptor_phone?: string
	descriptor_url?: string

	braintree_payments?: BraintreePaymentRel[]

}


class BraintreeGateways extends ApiResource {

	static readonly TYPE: 'braintree_gateways' = 'braintree_gateways'
	// static readonly PATH = 'braintree_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<BraintreeGateway>> {
		return this.resources.list({ type: BraintreeGateways.TYPE }, params, options)
	}

	async create(resource: BraintreeGatewayCreate, options?: ResourcesConfig): Promise<BraintreeGateway> {
		return this.resources.create(Object.assign(resource, { type: BraintreeGateways.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BraintreeGateway> {
		return this.resources.retrieve<BraintreeGateway>({ type: BraintreeGateways.TYPE, id }, params, options)
	}

	async update(resource: BraintreeGatewayUpdate, options?: ResourcesConfig): Promise<BraintreeGateway> {
		return this.resources.update({ ...resource, type: BraintreeGateways.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: BraintreeGateways.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isBraintreeGateway(resource: any): resource is BraintreeGateway {
		return resource.type && (resource.type === BraintreeGateways.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(BraintreeGateways.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(BraintreeGateways.TYPE)
	}
	*/

	relationship(id: string | ResourceId): BraintreeGatewayRel {
		return (typeof id === 'string') ? { id, type: BraintreeGateways.TYPE } : {id: id.id, type: BraintreeGateways.TYPE }
	}

}


export default BraintreeGateways

export { BraintreeGateway, BraintreeGatewayCreate, BraintreeGatewayUpdate }
