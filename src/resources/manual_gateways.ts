import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'


type ManualGatewayType = 'manual_gateways'
type ManualGatewayRel = ResourceRel & { type: ManualGatewayType }


interface ManualGateway extends Resource {
	
	readonly type: ManualGatewayType

	name: string

	payment_methods?: PaymentMethod[] | null
	versions?: Version[] | null

}


interface ManualGatewayCreate extends ResourceCreate {
	
	name: string
	
}


interface ManualGatewayUpdate extends ResourceUpdate {
	
	name?: string | null
	
}


class ManualGateways extends ApiResource<ManualGateway> {

	static readonly TYPE: ManualGatewayType = 'manual_gateways' as const

	async create(resource: ManualGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualGateway> {
		return this.resources.create<ManualGatewayCreate, ManualGateway>({ ...resource, type: ManualGateways.TYPE }, params, options)
	}

	async update(resource: ManualGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualGateway> {
		return this.resources.update<ManualGatewayUpdate, ManualGateway>({ ...resource, type: ManualGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ManualGateways.TYPE } : id, options)
	}

	async payment_methods(manualGatewayId: string | ManualGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _manualGatewayId = (manualGatewayId as ManualGateway).id || manualGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `manual_gateways/${_manualGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async versions(manualGatewayId: string | ManualGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _manualGatewayId = (manualGatewayId as ManualGateway).id || manualGatewayId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `manual_gateways/${_manualGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isManualGateway(resource: any): resource is ManualGateway {
		return resource.type && (resource.type === ManualGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): ManualGatewayRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ManualGateways.TYPE } : { id: id.id, type: ManualGateways.TYPE }
	}


	type(): ManualGatewayType {
		return ManualGateways.TYPE
	}

}


export default ManualGateways

export type { ManualGateway, ManualGatewayCreate, ManualGatewayUpdate, ManualGatewayType }
