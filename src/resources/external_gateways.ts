import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'
import type { ExternalPayment } from './external_payments'


type ExternalGatewayType = 'external_gateways'
type ExternalGatewayRel = ResourceRel & { type: ExternalGatewayType }


interface ExternalGateway extends Resource {
	
	readonly type: ExternalGatewayType

	name: string
	authorize_url?: string | null
	capture_url?: string | null
	void_url?: string | null
	refund_url?: string | null
	token_url?: string | null
	circuit_state?: string | null
	circuit_failure_count?: number | null
	shared_secret: string

	payment_methods?: PaymentMethod[] | null
	versions?: Version[] | null
	external_payments?: ExternalPayment[] | null

}


interface ExternalGatewayCreate extends ResourceCreate {
	
	name: string
	authorize_url?: string | null
	capture_url?: string | null
	void_url?: string | null
	refund_url?: string | null
	token_url?: string | null
	
}


interface ExternalGatewayUpdate extends ResourceUpdate {
	
	name?: string | null
	authorize_url?: string | null
	capture_url?: string | null
	void_url?: string | null
	refund_url?: string | null
	token_url?: string | null
	_reset_circuit?: boolean | null
	
}


class ExternalGateways extends ApiResource<ExternalGateway> {

	static readonly TYPE: ExternalGatewayType = 'external_gateways' as const

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

	async versions(externalGatewayId: string | ExternalGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _externalGatewayId = (externalGatewayId as ExternalGateway).id || externalGatewayId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `external_gateways/${_externalGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async external_payments(externalGatewayId: string | ExternalGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ExternalPayment>> {
		const _externalGatewayId = (externalGatewayId as ExternalGateway).id || externalGatewayId as string
		return this.resources.fetch<ExternalPayment>({ type: 'external_payments' }, `external_gateways/${_externalGatewayId}/external_payments`, params, options) as unknown as ListResponse<ExternalPayment>
	}

	async _reset_circuit(id: string | ExternalGateway, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalGateway> {
		return this.resources.update<ExternalGatewayUpdate, ExternalGateway>({ id: (typeof id === 'string')? id: id.id, type: ExternalGateways.TYPE, _reset_circuit: true }, params, options)
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
