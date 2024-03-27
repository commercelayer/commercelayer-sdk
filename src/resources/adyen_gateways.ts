import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod, PaymentMethodSortable } from './payment_methods'
import type { Version, VersionSortable } from './versions'
import type { AdyenPayment, AdyenPaymentType, AdyenPaymentSortable } from './adyen_payments'


type AdyenGatewayType = 'adyen_gateways'
type AdyenGatewayRel = ResourceRel & { type: AdyenGatewayType }
type AdyenPaymentRel = ResourceRel & { type: AdyenPaymentType }


export type AdyenGatewaySortable = Pick<AdyenGateway, 'id' | 'name'> & ResourceSortable
export type AdyenGatewayFilterable = Pick<AdyenGateway, 'id' | 'name'> & ResourceFilterable


interface AdyenGateway extends Resource {
	
	readonly type: AdyenGatewayType

	name: string
	live_url_prefix: string
	async_api?: boolean | null
	webhook_endpoint_secret?: string | null
	webhook_endpoint_url?: string | null

	payment_methods?: PaymentMethod[] | null
	versions?: Version[] | null
	adyen_payments?: AdyenPayment[] | null

}


interface AdyenGatewayCreate extends ResourceCreate {
	
	name: string
	merchant_account: string
	api_key: string
	public_key?: string | null
	live_url_prefix: string
	api_version?: number | null
	async_api?: boolean | null
	webhook_endpoint_secret?: string | null

	adyen_payments?: AdyenPaymentRel[] | null

}


interface AdyenGatewayUpdate extends ResourceUpdate {
	
	name?: string | null
	merchant_account?: string | null
	api_key?: string | null
	public_key?: string | null
	live_url_prefix?: string | null
	api_version?: number | null
	async_api?: boolean | null
	webhook_endpoint_secret?: string | null

	adyen_payments?: AdyenPaymentRel[] | null

}


class AdyenGateways extends ApiResource<AdyenGateway, AdyenGatewaySortable> {

	static readonly TYPE: AdyenGatewayType = 'adyen_gateways' as const

	async create(resource: AdyenGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenGateway> {
		return this.resources.create<AdyenGatewayCreate, AdyenGateway>({ ...resource, type: AdyenGateways.TYPE }, params, options)
	}

	async update(resource: AdyenGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenGateway> {
		return this.resources.update<AdyenGatewayUpdate, AdyenGateway>({ ...resource, type: AdyenGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: AdyenGateways.TYPE } : id, options)
	}

	async payment_methods(adyenGatewayId: string | AdyenGateway, params?: QueryParamsList<PaymentMethodSortable>, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _adyenGatewayId = (adyenGatewayId as AdyenGateway).id || adyenGatewayId as string
		return this.resources.fetch<PaymentMethod, PaymentMethodSortable>({ type: 'payment_methods' }, `adyen_gateways/${_adyenGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async versions(adyenGatewayId: string | AdyenGateway, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _adyenGatewayId = (adyenGatewayId as AdyenGateway).id || adyenGatewayId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `adyen_gateways/${_adyenGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async adyen_payments(adyenGatewayId: string | AdyenGateway, params?: QueryParamsList<AdyenPaymentSortable>, options?: ResourcesConfig): Promise<ListResponse<AdyenPayment>> {
		const _adyenGatewayId = (adyenGatewayId as AdyenGateway).id || adyenGatewayId as string
		return this.resources.fetch<AdyenPayment, AdyenPaymentSortable>({ type: 'adyen_payments' }, `adyen_gateways/${_adyenGatewayId}/adyen_payments`, params, options) as unknown as ListResponse<AdyenPayment>
	}


	isAdyenGateway(resource: any): resource is AdyenGateway {
		return resource.type && (resource.type === AdyenGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): AdyenGatewayRel {
		return super.relationshipOneToOne<AdyenGatewayRel>(id)
	}

	relationshipToMany(...ids: string[]): AdyenGatewayRel[] {
		return super.relationshipOneToMany<AdyenGatewayRel>(...ids)
	}


	type(): AdyenGatewayType {
		return AdyenGateways.TYPE
	}

}


export default AdyenGateways

export type { AdyenGateway, AdyenGatewayCreate, AdyenGatewayUpdate, AdyenGatewayType }

/*
export const AdyenGatewaysClient = (init: ResourceAdapter | ResourcesInitConfig): AdyenGateways => {
	return new AdyenGateways((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
