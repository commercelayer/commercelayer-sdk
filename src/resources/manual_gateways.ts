import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { PaymentMethod } from './payment_methods'


type ManualGatewayRel = ResourceRel & { type: typeof ManualGateways.TYPE }


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

	static readonly TYPE: 'manual_gateways' = 'manual_gateways' as const
	// static readonly PATH = 'manual_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ManualGateway>> {
		return this.resources.list<ManualGateway>({ type: ManualGateways.TYPE }, params, options)
	}

	async create(resource: ManualGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualGateway> {
		return this.resources.create<ManualGatewayCreate, ManualGateway>({ ...resource, type: ManualGateways.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualGateway> {
		return this.resources.retrieve<ManualGateway>({ type: ManualGateways.TYPE, id }, params, options)
	}

	async update(resource: ManualGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualGateway> {
		return this.resources.update<ManualGatewayUpdate, ManualGateway>({ ...resource, type: ManualGateways.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ManualGateways.TYPE, id }, options)
	}

	async payment_methods(manualGatewayId: string | ManualGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _manualGatewayId = (manualGatewayId as ManualGateway).id || manualGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `manual_gateways/${_manualGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isManualGateway(resource: any): resource is ManualGateway {
		return resource.type && (resource.type === ManualGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): ManualGatewayRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ManualGateways.TYPE } : { id: id.id, type: ManualGateways.TYPE }
	}


	type(): string {
		return ManualGateways.TYPE
	}

}


export default ManualGateways

export { ManualGateway, ManualGatewayCreate, ManualGatewayUpdate }
