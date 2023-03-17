import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { KlarnaPayment, KlarnaPaymentType } from './klarna_payments'


type KlarnaGatewayType = 'klarna_gateways'
type KlarnaGatewayRel = ResourceRel & { type: KlarnaGatewayType }
type KlarnaPaymentRel = ResourceRel & { type: KlarnaPaymentType }


interface KlarnaGateway extends Resource {
	
	readonly type: KlarnaGatewayType

	name: string

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
	
	name: string
	country_code?: string
	api_key?: string
	api_secret?: string

	klarna_payments?: KlarnaPaymentRel[]

}


class KlarnaGateways extends ApiResource<KlarnaGateway> {

	static readonly TYPE: KlarnaGatewayType = 'klarna_gateways' as const

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<KlarnaGateway>> {
		return this.resources.list<KlarnaGateway>({ type: KlarnaGateways.TYPE }, params, options)
	}

	async create(resource: KlarnaGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<KlarnaGateway> {
		return this.resources.create<KlarnaGatewayCreate, KlarnaGateway>({ ...resource, type: KlarnaGateways.TYPE }, params, options)
	}

	async update(resource: KlarnaGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<KlarnaGateway> {
		return this.resources.update<KlarnaGatewayUpdate, KlarnaGateway>({ ...resource, type: KlarnaGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: KlarnaGateways.TYPE } : id, options)
	}

	async payment_methods(klarnaGatewayId: string | KlarnaGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _klarnaGatewayId = (klarnaGatewayId as KlarnaGateway).id || klarnaGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `klarna_gateways/${_klarnaGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async klarna_payments(klarnaGatewayId: string | KlarnaGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<KlarnaPayment>> {
		const _klarnaGatewayId = (klarnaGatewayId as KlarnaGateway).id || klarnaGatewayId as string
		return this.resources.fetch<KlarnaPayment>({ type: 'klarna_payments' }, `klarna_gateways/${_klarnaGatewayId}/klarna_payments`, params, options) as unknown as ListResponse<KlarnaPayment>
	}


	isKlarnaGateway(resource: any): resource is KlarnaGateway {
		return resource.type && (resource.type === KlarnaGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): KlarnaGatewayRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: KlarnaGateways.TYPE } : { id: id.id, type: KlarnaGateways.TYPE }
	}


	type(): KlarnaGatewayType {
		return KlarnaGateways.TYPE
	}

}


export default KlarnaGateways

export type { KlarnaGateway, KlarnaGatewayCreate, KlarnaGatewayUpdate, KlarnaGatewayType }
