import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { AdyenPayment, AdyenPaymentType } from './adyen_payments'


type AdyenGatewayType = 'adyen_gateways'
type AdyenGatewayRel = ResourceRel & { type: AdyenGatewayType }
type AdyenPaymentRel = ResourceRel & { type: AdyenPaymentType }


interface AdyenGateway extends Resource {
	
	readonly type: AdyenGatewayType

	name?: string
	live_url_prefix?: string
	async_api?: boolean
	webhook_endpoint_secret?: string
	webhook_endpoint_url?: string

	payment_methods?: PaymentMethod[]
	adyen_payments?: AdyenPayment[]

}


interface AdyenGatewayCreate extends ResourceCreate {
	
	name: string
	merchant_account: string
	api_key: string
	public_key?: string
	live_url_prefix: string
	api_version?: string
	async_api?: boolean
	webhook_endpoint_secret?: string

	adyen_payments?: AdyenPaymentRel[]

}


interface AdyenGatewayUpdate extends ResourceUpdate {
	
	name?: string
	merchant_account?: string
	api_key?: string
	public_key?: string
	live_url_prefix?: string
	api_version?: string
	async_api?: boolean
	webhook_endpoint_secret?: string

	adyen_payments?: AdyenPaymentRel[]

}


class AdyenGateways extends ApiResource<AdyenGateway> {

	static readonly TYPE: AdyenGatewayType = 'adyen_gateways' as const
	// static readonly PATH = 'adyen_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<AdyenGateway>> {
		return this.resources.list<AdyenGateway>({ type: AdyenGateways.TYPE }, params, options)
	}

	async create(resource: AdyenGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenGateway> {
		return this.resources.create<AdyenGatewayCreate, AdyenGateway>({ ...resource, type: AdyenGateways.TYPE }, params, options)
	}

	async update(resource: AdyenGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenGateway> {
		return this.resources.update<AdyenGatewayUpdate, AdyenGateway>({ ...resource, type: AdyenGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: AdyenGateways.TYPE } : id, options)
	}

	async payment_methods(adyenGatewayId: string | AdyenGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _adyenGatewayId = (adyenGatewayId as AdyenGateway).id || adyenGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `adyen_gateways/${_adyenGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async adyen_payments(adyenGatewayId: string | AdyenGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<AdyenPayment>> {
		const _adyenGatewayId = (adyenGatewayId as AdyenGateway).id || adyenGatewayId as string
		return this.resources.fetch<AdyenPayment>({ type: 'adyen_payments' }, `adyen_gateways/${_adyenGatewayId}/adyen_payments`, params, options) as unknown as ListResponse<AdyenPayment>
	}


	isAdyenGateway(resource: any): resource is AdyenGateway {
		return resource.type && (resource.type === AdyenGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): AdyenGatewayRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: AdyenGateways.TYPE } : { id: id.id, type: AdyenGateways.TYPE }
	}


	type(): AdyenGatewayType {
		return AdyenGateways.TYPE
	}

}


export default AdyenGateways

export type { AdyenGateway, AdyenGatewayCreate, AdyenGatewayUpdate, AdyenGatewayType }
