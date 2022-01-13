/**
 * ©2022 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.8.0
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { PaymentMethod } from './payment_methods'
import { KlarnaPayment } from './klarna_payments'


type KlarnaGatewayRel = ResourceId & { type: typeof KlarnaGateways.TYPE }
type KlarnaPaymentRel = ResourceId & { type: 'klarna_payments' }


interface KlarnaGateway extends Resource {
	
	name?: string

	payment_methods?: PaymentMethod[]
	klarna_payments?: KlarnaPayment[]

}


interface KlarnaGatewayCreate extends ResourceCreate {
	
	name: string
	country_code: string
	api_key: string
	api_secret: string

	klarna_payments?: KlarnaPaymentRel[]

}


interface KlarnaGatewayUpdate extends ResourceUpdate {
	
	name?: string
	country_code?: string
	api_key?: string
	api_secret?: string

	klarna_payments?: KlarnaPaymentRel[]

}


class KlarnaGateways extends ApiResource {

	static readonly TYPE: 'klarna_gateways' = 'klarna_gateways'
	// static readonly PATH = 'klarna_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<KlarnaGateway>> {
		return this.resources.list({ type: KlarnaGateways.TYPE }, params, options)
	}

	async create(resource: KlarnaGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<KlarnaGateway> {
		return this.resources.create({ ...resource, type: KlarnaGateways.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<KlarnaGateway> {
		return this.resources.retrieve<KlarnaGateway>({ type: KlarnaGateways.TYPE, id }, params, options)
	}

	async update(resource: KlarnaGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<KlarnaGateway> {
		return this.resources.update({ ...resource, type: KlarnaGateways.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: KlarnaGateways.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isKlarnaGateway(resource: any): resource is KlarnaGateway {
		return resource.type && (resource.type === KlarnaGateways.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(KlarnaGateways.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(KlarnaGateways.TYPE)
	}
	*/

	relationship(id: string | ResourceId): KlarnaGatewayRel {
		return (typeof id === 'string') ? { id, type: KlarnaGateways.TYPE } : { id: id.id, type: KlarnaGateways.TYPE }
	}

	type(): string {
		return KlarnaGateways.TYPE
	}

}


export default KlarnaGateways

export { KlarnaGateway, KlarnaGatewayCreate, KlarnaGatewayUpdate }
