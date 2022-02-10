import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { PaymentMethod } from './payment_methods'
import { ExternalPayment } from './external_payments'


type ExternalGatewayRel = ResourceRel & { type: typeof ExternalGateways.TYPE }


interface ExternalGateway extends Resource {
	
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


class ExternalGateways extends ApiResource {

	static readonly TYPE: 'external_gateways' = 'external_gateways'
	// static readonly PATH = 'external_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ExternalGateway>> {
		return this.resources.list<ExternalGateway>({ type: ExternalGateways.TYPE }, params, options)
	}

	async create(resource: ExternalGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalGateway> {
		return this.resources.create({ ...resource, type: ExternalGateways.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalGateway> {
		return this.resources.retrieve<ExternalGateway>({ type: ExternalGateways.TYPE, id }, params, options)
	}

	async update(resource: ExternalGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalGateway> {
		return this.resources.update({ ...resource, type: ExternalGateways.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ExternalGateways.TYPE, id }, options)
	}

	async payment_methods(externalGatewayId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `external_gateways/${externalGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async external_payments(externalGatewayId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ExternalPayment>> {
		return this.resources.fetch<ExternalPayment>({ type: 'external_payments' }, `external_gateways/${externalGatewayId}/external_payments`, params, options) as unknown as ListResponse<ExternalPayment>
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
