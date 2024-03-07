import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'
import type { ExternalPayment } from './external_payments'


type ExternalGatewayRel = ResourceRel & { type: typeof ExternalGateways.TYPE }


interface ExternalGateway extends Resource {
	
	name?: string
	authorize_url?: string
	capture_url?: string
	void_url?: string
	refund_url?: string
	token_url?: string
	circuit_state?: string
	circuit_failure_count?: number
	shared_secret?: string

	payment_methods?: PaymentMethod[]
	versions?: Version[]
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
	_reset_circuit?: boolean
	
}


class ExternalGateways extends ApiResource {

	static readonly TYPE: 'external_gateways' = 'external_gateways' as const
	// static readonly PATH = 'external_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ExternalGateway>> {
		return this.resources.list<ExternalGateway>({ type: ExternalGateways.TYPE }, params, options)
	}

	async create(resource: ExternalGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalGateway> {
		return this.resources.create<ExternalGatewayCreate, ExternalGateway>({ ...resource, type: ExternalGateways.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalGateway> {
		return this.resources.retrieve<ExternalGateway>({ type: ExternalGateways.TYPE, id }, params, options)
	}

	async update(resource: ExternalGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalGateway> {
		return this.resources.update<ExternalGatewayUpdate, ExternalGateway>({ ...resource, type: ExternalGateways.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ExternalGateways.TYPE, id }, options)
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


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isExternalGateway(resource: any): resource is ExternalGateway {
		return resource.type && (resource.type === ExternalGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): ExternalGatewayRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ExternalGateways.TYPE } : { id: id.id, type: ExternalGateways.TYPE }
	}


	type(): string {
		return ExternalGateways.TYPE
	}

}


export default ExternalGateways

export { ExternalGateway, ExternalGatewayCreate, ExternalGatewayUpdate }
