import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { KlarnaPayment } from './klarna_payments'


type KlarnaGatewayRel = ResourceRel & { type: typeof KlarnaGateways.TYPE }
type KlarnaPaymentRel = ResourceRel & { type: 'klarna_payments' }


interface KlarnaGateway extends Resource {
	
	name?: string

	payment_methods?: PaymentMethod[]
	klarna_payments?: KlarnaPayment[]

}


interface KlarnaGatewayCreate extends ResourceCreate {
	
	name: string
	country_code: string
	api_key: string
	api_secret: string

	klarna_payments?: KlarnaPaymentRel[]

}


interface KlarnaGatewayUpdate extends ResourceUpdate {
	
	name?: string
	country_code?: string
	api_key?: string
	api_secret?: string

	klarna_payments?: KlarnaPaymentRel[]

}


class KlarnaGateways extends ApiResource {

	static readonly TYPE: 'klarna_gateways' = 'klarna_gateways' as const
	// static readonly PATH = 'klarna_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<KlarnaGateway>> {
		return this.resources.list<KlarnaGateway>({ type: KlarnaGateways.TYPE }, params, options)
	}

	async create(resource: KlarnaGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<KlarnaGateway> {
		return this.resources.create<KlarnaGatewayCreate, KlarnaGateway>({ ...resource, type: KlarnaGateways.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<KlarnaGateway> {
		return this.resources.retrieve<KlarnaGateway>({ type: KlarnaGateways.TYPE, id }, params, options)
	}

	async update(resource: KlarnaGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<KlarnaGateway> {
		return this.resources.update<KlarnaGatewayUpdate, KlarnaGateway>({ ...resource, type: KlarnaGateways.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: KlarnaGateways.TYPE, id }, options)
	}

	async payment_methods(klarnaGatewayId: string | KlarnaGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _klarnaGatewayId = (klarnaGatewayId as KlarnaGateway).id || klarnaGatewayId
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `klarna_gateways/${_klarnaGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async klarna_payments(klarnaGatewayId: string | KlarnaGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<KlarnaPayment>> {
		const _klarnaGatewayId = (klarnaGatewayId as KlarnaGateway).id || klarnaGatewayId
		return this.resources.fetch<KlarnaPayment>({ type: 'klarna_payments' }, `klarna_gateways/${_klarnaGatewayId}/klarna_payments`, params, options) as unknown as ListResponse<KlarnaPayment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isKlarnaGateway(resource: any): resource is KlarnaGateway {
		return resource.type && (resource.type === KlarnaGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): KlarnaGatewayRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: KlarnaGateways.TYPE } : { id: id.id, type: KlarnaGateways.TYPE }
	}


	type(): string {
		return KlarnaGateways.TYPE
	}

}


export default KlarnaGateways

export { KlarnaGateway, KlarnaGatewayCreate, KlarnaGatewayUpdate }
