import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod, PaymentMethodSortable } from './payment_methods'
import type { Version, VersionSortable } from './versions'
import type { KlarnaPayment, KlarnaPaymentType, KlarnaPaymentSortable } from './klarna_payments'


type KlarnaGatewayType = 'klarna_gateways'
type KlarnaGatewayRel = ResourceRel & { type: KlarnaGatewayType }
type KlarnaPaymentRel = ResourceRel & { type: KlarnaPaymentType }


export type KlarnaGatewaySortable = Pick<KlarnaGateway, 'id' | 'name'> & ResourceSortable
export type KlarnaGatewayFilterable = Pick<KlarnaGateway, 'id' | 'name'> & ResourceFilterable


interface KlarnaGateway extends Resource {
	
	readonly type: KlarnaGatewayType

	name: string

	payment_methods?: PaymentMethod[] | null
	versions?: Version[] | null
	klarna_payments?: KlarnaPayment[] | null

}


interface KlarnaGatewayCreate extends ResourceCreate {
	
	name: string
	country_code: string
	api_key: string
	api_secret: string

	klarna_payments?: KlarnaPaymentRel[] | null

}


interface KlarnaGatewayUpdate extends ResourceUpdate {
	
	name?: string | null
	country_code?: string | null
	api_key?: string | null
	api_secret?: string | null

	klarna_payments?: KlarnaPaymentRel[] | null

}


class KlarnaGateways extends ApiResource<KlarnaGateway, KlarnaGatewaySortable> {

	static readonly TYPE: KlarnaGatewayType = 'klarna_gateways' as const

	async create(resource: KlarnaGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<KlarnaGateway> {
		return this.resources.create<KlarnaGatewayCreate, KlarnaGateway>({ ...resource, type: KlarnaGateways.TYPE }, params, options)
	}

	async update(resource: KlarnaGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<KlarnaGateway> {
		return this.resources.update<KlarnaGatewayUpdate, KlarnaGateway>({ ...resource, type: KlarnaGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: KlarnaGateways.TYPE } : id, options)
	}

	async payment_methods(klarnaGatewayId: string | KlarnaGateway, params?: QueryParamsList<PaymentMethodSortable>, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _klarnaGatewayId = (klarnaGatewayId as KlarnaGateway).id || klarnaGatewayId as string
		return this.resources.fetch<PaymentMethod, PaymentMethodSortable>({ type: 'payment_methods' }, `klarna_gateways/${_klarnaGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async versions(klarnaGatewayId: string | KlarnaGateway, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _klarnaGatewayId = (klarnaGatewayId as KlarnaGateway).id || klarnaGatewayId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `klarna_gateways/${_klarnaGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async klarna_payments(klarnaGatewayId: string | KlarnaGateway, params?: QueryParamsList<KlarnaPaymentSortable>, options?: ResourcesConfig): Promise<ListResponse<KlarnaPayment>> {
		const _klarnaGatewayId = (klarnaGatewayId as KlarnaGateway).id || klarnaGatewayId as string
		return this.resources.fetch<KlarnaPayment, KlarnaPaymentSortable>({ type: 'klarna_payments' }, `klarna_gateways/${_klarnaGatewayId}/klarna_payments`, params, options) as unknown as ListResponse<KlarnaPayment>
	}


	isKlarnaGateway(resource: any): resource is KlarnaGateway {
		return resource.type && (resource.type === KlarnaGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): KlarnaGatewayRel {
		return super.relationshipOneToOne<KlarnaGatewayRel>(id)
	}

	relationshipToMany(...ids: string[]): KlarnaGatewayRel[] {
		return super.relationshipOneToMany<KlarnaGatewayRel>(...ids)
	}


	type(): KlarnaGatewayType {
		return KlarnaGateways.TYPE
	}

}


export default KlarnaGateways

export type { KlarnaGateway, KlarnaGatewayCreate, KlarnaGatewayUpdate, KlarnaGatewayType }

/*
export const KlarnaGatewaysClient = (init: ResourceAdapter | ResourcesInitConfig): KlarnaGateways => {
	return new KlarnaGateways((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
