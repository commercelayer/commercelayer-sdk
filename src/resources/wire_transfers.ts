/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Order } from './orders'


type WireTransferRel = ResourceId & { type: typeof WireTransfers.TYPE }
type OrderRel = ResourceId & { type: 'orders' }


interface WireTransfer extends Resource {
	
	order?: Order

}


interface WireTransferCreate extends ResourceCreate {
	
	order?: OrderRel

}


interface WireTransferUpdate extends ResourceUpdate {
	
	order?: OrderRel

}


class WireTransfers extends ApiResource {

	static readonly TYPE: 'wire_transfers' = 'wire_transfers'
	// static readonly PATH = 'wire_transfers'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<WireTransfer>> {
		return this.resources.list({ type: WireTransfers.TYPE }, params, options)
	}

	async create(resource: WireTransferCreate, options?: ResourcesConfig): Promise<WireTransfer> {
		return this.resources.create(Object.assign(resource, { type: WireTransfers.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<WireTransfer> {
		return this.resources.retrieve<WireTransfer>({ type: WireTransfers.TYPE, id }, params, options)
	}

	async update(resource: WireTransferUpdate, options?: ResourcesConfig): Promise<WireTransfer> {
		return this.resources.update({ ...resource, type: WireTransfers.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: WireTransfers.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isWireTransfer(resource: any): resource is WireTransfer {
		return resource.type && (resource.type === WireTransfers.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(WireTransfers.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(WireTransfers.TYPE)
	}
	*/

	relationship(id: string | ResourceId): WireTransferRel {
		return (typeof id === 'string') ? { id, type: WireTransfers.TYPE } : {id: id.id, type: WireTransfers.TYPE }
	}

}


export default WireTransfers

export { WireTransfer, WireTransferCreate, WireTransferUpdate }
