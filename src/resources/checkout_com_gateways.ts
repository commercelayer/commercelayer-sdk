/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { PaymentMethod } from './payment_methods'
import { CheckoutComPayment } from './checkout_com_payments'


type CheckoutComGatewayRel = ResourceId & { type: typeof CheckoutComGateways.TYPE }
type CheckoutComPaymentRel = ResourceId & { type: 'checkout_com_payments' }


interface CheckoutComGateway extends Resource {
	
	name?: string
	webhook_endpoint_id?: string
	webhook_endpoint_secret?: string
	webhook_endpoint_url?: string

	payment_methods?: PaymentMethod[]
	checkout_com_payments?: CheckoutComPayment[]

}


interface CheckoutComGatewayCreate extends ResourceCreate {
	
	name: string
	secret_key: string
	public_key: string

	checkout_com_payments?: CheckoutComPaymentRel[]

}


interface CheckoutComGatewayUpdate extends ResourceUpdate {
	
	name?: string
	secret_key?: string
	public_key?: string

	checkout_com_payments?: CheckoutComPaymentRel[]

}


class CheckoutComGateways extends ApiResource {

	static readonly TYPE: 'checkout_com_gateways' = 'checkout_com_gateways'
	// static readonly PATH = 'checkout_com_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CheckoutComGateway>> {
		return this.resources.list({ type: CheckoutComGateways.TYPE }, params, options)
	}

	async create(resource: CheckoutComGatewayCreate, options?: ResourcesConfig): Promise<CheckoutComGateway> {
		return this.resources.create(Object.assign(resource, { type: CheckoutComGateways.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComGateway> {
		return this.resources.retrieve<CheckoutComGateway>({ type: CheckoutComGateways.TYPE, id }, params, options)
	}

	async update(resource: CheckoutComGatewayUpdate, options?: ResourcesConfig): Promise<CheckoutComGateway> {
		return this.resources.update({ ...resource, type: CheckoutComGateways.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: CheckoutComGateways.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCheckoutComGateway(resource: any): resource is CheckoutComGateway {
		return resource.type && (resource.type === CheckoutComGateways.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(CheckoutComGateways.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(CheckoutComGateways.TYPE)
	}
	*/

	relationship(id: string | ResourceId): CheckoutComGatewayRel {
		return (typeof id === 'string') ? { id, type: CheckoutComGateways.TYPE } : {id: id.id, type: CheckoutComGateways.TYPE }
	}

}


export default CheckoutComGateways

export { CheckoutComGateway, CheckoutComGatewayCreate, CheckoutComGatewayUpdate }
