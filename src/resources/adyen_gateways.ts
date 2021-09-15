/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { PaymentMethod } from './payment_methods'
import { AdyenPayment } from './adyen_payments'


type AdyenGatewayRel = ResourceId & { type: typeof AdyenGateways.TYPE }
type AdyenPaymentRel = ResourceId & { type: 'adyen_payments' }


interface AdyenGateway extends Resource {
	
	name?: string
	live_url_prefix?: string

	payment_methods?: PaymentMethod[]
	adyen_payments?: AdyenPayment[]

}


interface AdyenGatewayCreate extends ResourceCreate {
	
	name: string
	merchant_account: string
	api_key: string
	public_key?: string
	live_url_prefix: string

	adyen_payments?: AdyenPaymentRel[]

}


interface AdyenGatewayUpdate extends ResourceUpdate {
	
	name?: string
	merchant_account?: string
	api_key?: string
	live_url_prefix?: string

	adyen_payments?: AdyenPaymentRel[]

}


class AdyenGateways extends ApiResource {

	static readonly TYPE: 'adyen_gateways' = 'adyen_gateways'
	// static readonly PATH = 'adyen_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<AdyenGateway>> {
		return this.resources.list({ type: AdyenGateways.TYPE }, params, options)
	}

	async create(resource: AdyenGatewayCreate, options?: ResourcesConfig): Promise<AdyenGateway> {
		return this.resources.create(Object.assign(resource, { type: AdyenGateways.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenGateway> {
		return this.resources.retrieve<AdyenGateway>({ type: AdyenGateways.TYPE, id }, params, options)
	}

	async update(resource: AdyenGatewayUpdate, options?: ResourcesConfig): Promise<AdyenGateway> {
		return this.resources.update({ ...resource, type: AdyenGateways.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: AdyenGateways.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isAdyenGateway(resource: any): resource is AdyenGateway {
		return resource.type && (resource.type === AdyenGateways.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(AdyenGateways.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(AdyenGateways.TYPE)
	}
	*/

	relationship(id: string | ResourceId): AdyenGatewayRel {
		return (typeof id === 'string') ? { id, type: AdyenGateways.TYPE } : {id: id.id, type: AdyenGateways.TYPE }
	}

}


export default AdyenGateways

export { AdyenGateway, AdyenGatewayCreate, AdyenGatewayUpdate }
