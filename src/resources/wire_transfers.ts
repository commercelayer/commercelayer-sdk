import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Order } from './orders'


type WireTransferRel = ResourceRel & { type: typeof WireTransfers.TYPE }
type OrderRel = ResourceRel & { type: 'orders' }


interface WireTransfer extends Resource {
	
	order?: Order

}


interface WireTransferCreate extends ResourceCreate {
	
	order: OrderRel

}


interface WireTransferUpdate extends ResourceUpdate {
	
	order?: OrderRel

}


class WireTransfers extends ApiResource {

	static readonly TYPE: 'wire_transfers' = 'wire_transfers'
	// static readonly PATH = 'wire_transfers'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<WireTransfer>> {
		return this.resources.list<WireTransfer>({ type: WireTransfers.TYPE }, params, options)
	}

	async create(resource: WireTransferCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<WireTransfer> {
		return this.resources.create<WireTransferCreate, WireTransfer>({ ...resource, type: WireTransfers.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<WireTransfer> {
		return this.resources.retrieve<WireTransfer>({ type: WireTransfers.TYPE, id }, params, options)
	}

	async update(resource: WireTransferUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<WireTransfer> {
		return this.resources.update<WireTransferUpdate, WireTransfer>({ ...resource, type: WireTransfers.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: WireTransfers.TYPE, id }, options)
	}

	async order(wireTransferId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		return this.resources.fetch<Order>({ type: 'orders' }, `wire_transfers/${wireTransferId}/order`, params, options) as unknown as Order
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isWireTransfer(resource: any): resource is WireTransfer {
		return resource.type && (resource.type === WireTransfers.TYPE)
	}


	relationship(id: string | ResourceId | null): WireTransferRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: WireTransfers.TYPE } : { id: id.id, type: WireTransfers.TYPE }
	}


	type(): string {
		return WireTransfers.TYPE
	}

}


export default WireTransfers

export { WireTransfer, WireTransferCreate, WireTransferUpdate }
