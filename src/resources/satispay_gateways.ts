import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'
import type { SatispayPayment, SatispayPaymentType } from './satispay_payments'


type SatispayGatewayType = 'satispay_gateways'
type SatispayGatewayRel = ResourceRel & { type: SatispayGatewayType }
type SatispayPaymentRel = ResourceRel & { type: SatispayPaymentType }


interface SatispayGateway extends Resource {
	
	readonly type: SatispayGatewayType

	name: string
	token: string
	key_id: string
	webhook_endpoint_url?: string | null

	payment_methods?: PaymentMethod[] | null
	versions?: Version[] | null
	satispay_payments?: SatispayPayment[] | null

}


interface SatispayGatewayCreate extends ResourceCreate {
	
	name: string
	token: string

	satispay_payments?: SatispayPaymentRel[] | null

}


interface SatispayGatewayUpdate extends ResourceUpdate {
	
	name?: string | null

	satispay_payments?: SatispayPaymentRel[] | null

}


class SatispayGateways extends ApiResource<SatispayGateway> {

	static readonly TYPE: SatispayGatewayType = 'satispay_gateways' as const

	async create(resource: SatispayGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SatispayGateway> {
		return this.resources.create<SatispayGatewayCreate, SatispayGateway>({ ...resource, type: SatispayGateways.TYPE }, params, options)
	}

	async update(resource: SatispayGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SatispayGateway> {
		return this.resources.update<SatispayGatewayUpdate, SatispayGateway>({ ...resource, type: SatispayGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: SatispayGateways.TYPE } : id, options)
	}

	async payment_methods(satispayGatewayId: string | SatispayGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _satispayGatewayId = (satispayGatewayId as SatispayGateway).id || satispayGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `satispay_gateways/${_satispayGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async versions(satispayGatewayId: string | SatispayGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _satispayGatewayId = (satispayGatewayId as SatispayGateway).id || satispayGatewayId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `satispay_gateways/${_satispayGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async satispay_payments(satispayGatewayId: string | SatispayGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SatispayPayment>> {
		const _satispayGatewayId = (satispayGatewayId as SatispayGateway).id || satispayGatewayId as string
		return this.resources.fetch<SatispayPayment>({ type: 'satispay_payments' }, `satispay_gateways/${_satispayGatewayId}/satispay_payments`, params, options) as unknown as ListResponse<SatispayPayment>
	}


	isSatispayGateway(resource: any): resource is SatispayGateway {
		return resource.type && (resource.type === SatispayGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): SatispayGatewayRel {
		return super.relationshipOneToOne<SatispayGatewayRel>(id)
	}

	relationshipToMany(...ids: string[]): SatispayGatewayRel[] {
		return super.relationshipOneToMany<SatispayGatewayRel>(...ids)
	}


	type(): SatispayGatewayType {
		return SatispayGateways.TYPE
	}

}


export default SatispayGateways

export type { SatispayGateway, SatispayGatewayCreate, SatispayGatewayUpdate, SatispayGatewayType }
