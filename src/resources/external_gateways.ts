/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { PaymentMethod } from './payment_methods'
import { ExternalPayment } from './external_payments'


type ExternalGatewayRel = ResourceId & { type: typeof ExternalGateways.TYPE }


interface ExternalGateway extends Resource {
	
	name?: string
	shared_secret?: string
	authorize_url?: string
	capture_url?: string
	void_url?: string
	refund_url?: string

	payment_methods?: PaymentMethod[]
	external_payments?: ExternalPayment[]

}


interface ExternalGatewayCreate extends ResourceCreate {
	
	name: string
	authorize_url?: string
	capture_url?: string
	void_url?: string
	refund_url?: string
	
}


interface ExternalGatewayUpdate extends ResourceUpdate {
	
	name?: string
	authorize_url?: string
	capture_url?: string
	void_url?: string
	refund_url?: string
	
}


class ExternalGateways extends ApiResource {

	static readonly TYPE: 'external_gateways' = 'external_gateways'
	// static readonly PATH = 'external_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ExternalGateway>> {
		return this.resources.list({ type: ExternalGateways.TYPE }, params, options)
	}

	async create(resource: ExternalGatewayCreate, options?: ResourcesConfig): Promise<ExternalGateway> {
		return this.resources.create(Object.assign(resource, { type: ExternalGateways.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalGateway> {
		return this.resources.retrieve<ExternalGateway>({ type: ExternalGateways.TYPE, id }, params, options)
	}

	async update(resource: ExternalGatewayUpdate, options?: ResourcesConfig): Promise<ExternalGateway> {
		return this.resources.update({ ...resource, type: ExternalGateways.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ExternalGateways.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isExternalGateway(resource: any): resource is ExternalGateway {
		return resource.type && (resource.type === ExternalGateways.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(ExternalGateways.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(ExternalGateways.TYPE)
	}
	*/

	relationship(id: string | ResourceId): ExternalGatewayRel {
		return (typeof id === 'string') ? { id, type: ExternalGateways.TYPE } : {id: id.id, type: ExternalGateways.TYPE }
	}

}


export default ExternalGateways

export { ExternalGateway, ExternalGatewayCreate, ExternalGatewayUpdate }
