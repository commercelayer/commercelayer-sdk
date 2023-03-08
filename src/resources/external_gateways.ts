import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { ExternalPayment } from './external_payments'


type ExternalGatewayType = 'external_gateways'
type ExternalGatewayRel = ResourceRel & { type: ExternalGatewayType }


interface ExternalGateway extends Resource {
	
	readonly type: ExternalGatewayType

	name?: string
	shared_secret?: string
	authorize_url?: string
	capture_url?: string
	void_url?: string
	refund_url?: string
	token_url?: string

	payment_methods?: PaymentMethod[]
	external_payments?: ExternalPayment[]

}


interface ExternalGatewayCreate extends ResourceCreate {
	
	name: string
	authorize_url?: string
	capture_url?: string
	void_url?: string
	refund_url?: string
	token_url?: string
	
}


interface ExternalGatewayUpdate extends ResourceUpdate {
	
	name?: string
	authorize_url?: string
	capture_url?: string
	void_url?: string
	refund_url?: string
	token_url?: string
	
}


class ExternalGateways extends ApiResource<ExternalGateway> {

	static readonly TYPE: ExternalGatewayType = 'external_gateways' as const
	// static readonly PATH = 'external_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ExternalGateway>> {
		return this.resources.list<ExternalGateway>({ type: ExternalGateways.TYPE }, params, options)
	}

	async create(resource: ExternalGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalGateway> {
		return this.resources.create<ExternalGatewayCreate, ExternalGateway>({ ...resource, type: ExternalGateways.TYPE }, params, options)
	}

	async update(resource: ExternalGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalGateway> {
		return this.resources.update<ExternalGatewayUpdate, ExternalGateway>({ ...resource, type: ExternalGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ExternalGateways.TYPE } : id, options)
	}

	async payment_methods(externalGatewayId: string | ExternalGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _externalGatewayId = (externalGatewayId as ExternalGateway).id || externalGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `external_gateways/${_externalGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async external_payments(externalGatewayId: string | ExternalGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ExternalPayment>> {
		const _externalGatewayId = (externalGatewayId as ExternalGateway).id || externalGatewayId as string
		return this.resources.fetch<ExternalPayment>({ type: 'external_payments' }, `external_gateways/${_externalGatewayId}/external_payments`, params, options) as unknown as ListResponse<ExternalPayment>
	}


	isExternalGateway(resource: any): resource is ExternalGateway {
		return resource.type && (resource.type === ExternalGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): ExternalGatewayRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ExternalGateways.TYPE } : { id: id.id, type: ExternalGateways.TYPE }
	}


	type(): ExternalGatewayType {
		return ExternalGateways.TYPE
	}

}


export default ExternalGateways

export type { ExternalGateway, ExternalGatewayCreate, ExternalGatewayUpdate, ExternalGatewayType }
