import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, /* ResourceFilterable */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { Version } from './versions'


type WireTransferType = 'wire_transfers'
type WireTransferRel = ResourceRel & { type: WireTransferType }
type OrderRel = ResourceRel & { type: OrderType }


export type WireTransferSortable = Pick<WireTransfer, 'id'> & ResourceSortable
// export type WireTransferFilterable = Pick<WireTransfer, 'id'> & ResourceFilterable


interface WireTransfer extends Resource {
	
	readonly type: WireTransferType

	payment_instrument?: Record<string, any> | null

	order?: Order | null
	versions?: Version[] | null

}


interface WireTransferCreate extends ResourceCreate {
	
	order: OrderRel

}


interface WireTransferUpdate extends ResourceUpdate {
	
	order?: OrderRel | null

}


class WireTransfers extends ApiResource<WireTransfer> {

	static readonly TYPE: WireTransferType = 'wire_transfers' as const

	async create(resource: WireTransferCreate, params?: QueryParamsRetrieve<WireTransfer>, options?: ResourcesConfig): Promise<WireTransfer> {
		return this.resources.create<WireTransferCreate, WireTransfer>({ ...resource, type: WireTransfers.TYPE }, params, options)
	}

	async update(resource: WireTransferUpdate, params?: QueryParamsRetrieve<WireTransfer>, options?: ResourcesConfig): Promise<WireTransfer> {
		return this.resources.update<WireTransferUpdate, WireTransfer>({ ...resource, type: WireTransfers.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: WireTransfers.TYPE } : id, options)
	}

	async order(wireTransferId: string | WireTransfer, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _wireTransferId = (wireTransferId as WireTransfer).id || wireTransferId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `wire_transfers/${_wireTransferId}/order`, params, options) as unknown as Order
	}

	async versions(wireTransferId: string | WireTransfer, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _wireTransferId = (wireTransferId as WireTransfer).id || wireTransferId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `wire_transfers/${_wireTransferId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isWireTransfer(resource: any): resource is WireTransfer {
		return resource.type && (resource.type === WireTransfers.TYPE)
	}


	relationship(id: string | ResourceId | null): WireTransferRel {
		return super.relationshipOneToOne<WireTransferRel>(id)
	}

	relationshipToMany(...ids: string[]): WireTransferRel[] {
		return super.relationshipOneToMany<WireTransferRel>(...ids)
	}


	type(): WireTransferType {
		return WireTransfers.TYPE
	}

}


export default WireTransfers

export type { WireTransfer, WireTransferCreate, WireTransferUpdate, WireTransferType }

/*
export const WireTransfersClient = (init: ResourceAdapter | ResourcesInitConfig): WireTransfers => {
	return new WireTransfers((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
