/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { PaymentMethod } from './payment_methods'


type ManualGatewayRel = ResourceId & { type: typeof ManualGateways.TYPE }


interface ManualGateway extends Resource {
	
	name?: string
	require_capture?: boolean

	payment_methods?: PaymentMethod[]

}


interface ManualGatewayCreate extends ResourceCreate {
	
	name: string
	require_capture?: boolean
	
}


interface ManualGatewayUpdate extends ResourceUpdate {
	
	name?: string
	require_capture?: boolean
	
}


class ManualGateways extends ApiResource {

	static readonly TYPE: 'manual_gateways' = 'manual_gateways'
	// static readonly PATH = 'manual_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ManualGateway>> {
		return this.resources.list({ type: ManualGateways.TYPE }, params, options)
	}

	async create(resource: ManualGatewayCreate, options?: ResourcesConfig): Promise<ManualGateway> {
		return this.resources.create(Object.assign(resource, { type: ManualGateways.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualGateway> {
		return this.resources.retrieve<ManualGateway>({ type: ManualGateways.TYPE, id }, params, options)
	}

	async update(resource: ManualGatewayUpdate, options?: ResourcesConfig): Promise<ManualGateway> {
		return this.resources.update({ ...resource, type: ManualGateways.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ManualGateways.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isManualGateway(resource: any): resource is ManualGateway {
		return resource.type && (resource.type === ManualGateways.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(ManualGateways.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(ManualGateways.TYPE)
	}
	*/

	relationship(id: string | ResourceId): ManualGatewayRel {
		return (typeof id === 'string') ? { id, type: ManualGateways.TYPE } : {id: id.id, type: ManualGateways.TYPE }
	}

}


export default ManualGateways

export { ManualGateway, ManualGatewayCreate, ManualGatewayUpdate }
