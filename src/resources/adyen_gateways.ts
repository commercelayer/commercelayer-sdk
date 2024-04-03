import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'
import type { AdyenPayment, AdyenPaymentType } from './adyen_payments'


type AdyenGatewayType = 'adyen_gateways'
type AdyenGatewayRel = ResourceRel & { type: AdyenGatewayType }
type AdyenPaymentRel = ResourceRel & { type: AdyenPaymentType }


export type AdyenGatewaySort = Pick<AdyenGateway, 'id' | 'name'> & ResourceSort
// export type AdyenGatewayFilter = Pick<AdyenGateway, 'id' | 'name'> & ResourceFilter


interface AdyenGateway extends Resource {
	
	readonly type: AdyenGatewayType

	name: string
	live_url_prefix: string
	async_api?: Nullable<boolean>
	webhook_endpoint_secret?: Nullable<string>
	webhook_endpoint_url?: Nullable<string>

	payment_methods?: Nullable<PaymentMethod[]>
	versions?: Nullable<Version[]>
	adyen_payments?: Nullable<AdyenPayment[]>

}


interface AdyenGatewayCreate extends ResourceCreate {
	
	name: string
	merchant_account: string
	api_key: string
	public_key?: Nullable<string>
	live_url_prefix: string
	api_version?: Nullable<number>
	async_api?: Nullable<boolean>
	webhook_endpoint_secret?: Nullable<string>

	adyen_payments?: Nullable<AdyenPaymentRel[]>

}


interface AdyenGatewayUpdate extends ResourceUpdate {
	
	name?: Nullable<string>
	merchant_account?: Nullable<string>
	api_key?: Nullable<string>
	public_key?: Nullable<string>
	live_url_prefix?: Nullable<string>
	api_version?: Nullable<number>
	async_api?: Nullable<boolean>
	webhook_endpoint_secret?: Nullable<string>

	adyen_payments?: Nullable<AdyenPaymentRel[]>

}


class AdyenGateways extends ApiResource<AdyenGateway> {

	static readonly TYPE: AdyenGatewayType = 'adyen_gateways' as const

	async create(resource: AdyenGatewayCreate, params?: QueryParamsRetrieve<AdyenGateway>, options?: ResourcesConfig): Promise<AdyenGateway> {
		return this.resources.create<AdyenGatewayCreate, AdyenGateway>({ ...resource, type: AdyenGateways.TYPE }, params, options)
	}

	async update(resource: AdyenGatewayUpdate, params?: QueryParamsRetrieve<AdyenGateway>, options?: ResourcesConfig): Promise<AdyenGateway> {
		return this.resources.update<AdyenGatewayUpdate, AdyenGateway>({ ...resource, type: AdyenGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: AdyenGateways.TYPE } : id, options)
	}

	async payment_methods(adyenGatewayId: string | AdyenGateway, params?: QueryParamsList<PaymentMethod>, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _adyenGatewayId = (adyenGatewayId as AdyenGateway).id || adyenGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `adyen_gateways/${_adyenGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async versions(adyenGatewayId: string | AdyenGateway, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _adyenGatewayId = (adyenGatewayId as AdyenGateway).id || adyenGatewayId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `adyen_gateways/${_adyenGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async adyen_payments(adyenGatewayId: string | AdyenGateway, params?: QueryParamsList<AdyenPayment>, options?: ResourcesConfig): Promise<ListResponse<AdyenPayment>> {
		const _adyenGatewayId = (adyenGatewayId as AdyenGateway).id || adyenGatewayId as string
		return this.resources.fetch<AdyenPayment>({ type: 'adyen_payments' }, `adyen_gateways/${_adyenGatewayId}/adyen_payments`, params, options) as unknown as ListResponse<AdyenPayment>
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
