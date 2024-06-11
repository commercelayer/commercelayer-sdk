import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'
import type { AdyenPayment } from './adyen_payments'


type AdyenGatewayRel = ResourceRel & { type: typeof AdyenGateways.TYPE }
type AdyenPaymentRel = ResourceRel & { type: 'adyen_payments' }


interface AdyenGateway extends Resource {
	
	name?: string
	live_url_prefix?: string
	async_api?: boolean
	native_customer_payment_sources?: boolean
	webhook_endpoint_secret?: string
	webhook_endpoint_url?: string

	payment_methods?: PaymentMethod[]
	versions?: Version[]
	adyen_payments?: AdyenPayment[]

}


interface AdyenGatewayCreate extends ResourceCreate {
	
	name: string
	merchant_account: string
	api_key: string
	public_key?: string
	live_url_prefix: string
	api_version?: number
	async_api?: boolean
	native_customer_payment_sources?: boolean
	webhook_endpoint_secret?: string

	adyen_payments?: AdyenPaymentRel[]

}


interface AdyenGatewayUpdate extends ResourceUpdate {
	
	name?: string
	merchant_account?: string
	api_key?: string
	public_key?: string
	live_url_prefix?: string
	api_version?: number
	async_api?: boolean
	native_customer_payment_sources?: boolean
	webhook_endpoint_secret?: string

	adyen_payments?: AdyenPaymentRel[]

}


class AdyenGateways extends ApiResource {

	static readonly TYPE: 'adyen_gateways' = 'adyen_gateways' as const
	// static readonly PATH = 'adyen_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<AdyenGateway>> {
		return this.resources.list<AdyenGateway>({ type: AdyenGateways.TYPE }, params, options)
	}

	async create(resource: AdyenGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenGateway> {
		return this.resources.create<AdyenGatewayCreate, AdyenGateway>({ ...resource, type: AdyenGateways.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenGateway> {
		return this.resources.retrieve<AdyenGateway>({ type: AdyenGateways.TYPE, id }, params, options)
	}

	async update(resource: AdyenGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenGateway> {
		return this.resources.update<AdyenGatewayUpdate, AdyenGateway>({ ...resource, type: AdyenGateways.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: AdyenGateways.TYPE, id }, options)
	}

	async payment_methods(adyenGatewayId: string | AdyenGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _adyenGatewayId = (adyenGatewayId as AdyenGateway).id || adyenGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `adyen_gateways/${_adyenGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async versions(adyenGatewayId: string | AdyenGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _adyenGatewayId = (adyenGatewayId as AdyenGateway).id || adyenGatewayId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `adyen_gateways/${_adyenGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async adyen_payments(adyenGatewayId: string | AdyenGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<AdyenPayment>> {
		const _adyenGatewayId = (adyenGatewayId as AdyenGateway).id || adyenGatewayId as string
		return this.resources.fetch<AdyenPayment>({ type: 'adyen_payments' }, `adyen_gateways/${_adyenGatewayId}/adyen_payments`, params, options) as unknown as ListResponse<AdyenPayment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isAdyenGateway(resource: any): resource is AdyenGateway {
		return resource.type && (resource.type === AdyenGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): AdyenGatewayRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: AdyenGateways.TYPE } : { id: id.id, type: AdyenGateways.TYPE }
	}


	type(): string {
		return AdyenGateways.TYPE
	}

}


export default AdyenGateways

export { AdyenGateway, AdyenGatewayCreate, AdyenGatewayUpdate }
