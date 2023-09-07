import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'
import type { SatispayPayment } from './satispay_payments'


type SatispayGatewayRel = ResourceRel & { type: typeof SatispayGateways.TYPE }
type SatispayPaymentRel = ResourceRel & { type: 'satispay_payments' }


interface SatispayGateway extends Resource {
	
	name?: string
	token?: string
	key_id?: string
	webhook_endpoint_url?: string

	payment_methods?: PaymentMethod[]
	versions?: Version[]
	satispay_payments?: SatispayPayment[]

}


interface SatispayGatewayCreate extends ResourceCreate {
	
	name: string
	token: string

	satispay_payments?: SatispayPaymentRel[]

}


interface SatispayGatewayUpdate extends ResourceUpdate {
	
	name?: string

	satispay_payments?: SatispayPaymentRel[]

}


class SatispayGateways extends ApiResource {

	static readonly TYPE: 'satispay_gateways' = 'satispay_gateways' as const
	// static readonly PATH = 'satispay_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SatispayGateway>> {
		return this.resources.list<SatispayGateway>({ type: SatispayGateways.TYPE }, params, options)
	}

	async create(resource: SatispayGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SatispayGateway> {
		return this.resources.create<SatispayGatewayCreate, SatispayGateway>({ ...resource, type: SatispayGateways.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SatispayGateway> {
		return this.resources.retrieve<SatispayGateway>({ type: SatispayGateways.TYPE, id }, params, options)
	}

	async update(resource: SatispayGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SatispayGateway> {
		return this.resources.update<SatispayGatewayUpdate, SatispayGateway>({ ...resource, type: SatispayGateways.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: SatispayGateways.TYPE, id }, options)
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


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isSatispayGateway(resource: any): resource is SatispayGateway {
		return resource.type && (resource.type === SatispayGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): SatispayGatewayRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: SatispayGateways.TYPE } : { id: id.id, type: SatispayGateways.TYPE }
	}


	type(): string {
		return SatispayGateways.TYPE
	}

}


export default SatispayGateways

export { SatispayGateway, SatispayGatewayCreate, SatispayGatewayUpdate }
