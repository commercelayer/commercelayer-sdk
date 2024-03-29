import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'


type PaymentGatewayType = 'payment_gateways'
type PaymentGatewayRel = ResourceRel & { type: PaymentGatewayType }


export type PaymentGatewaySort = Pick<PaymentGateway, 'id' | 'name'> & ResourceSort
// export type PaymentGatewayFilter = Pick<PaymentGateway, 'id' | 'name'> & ResourceFilter


interface PaymentGateway extends Resource {
	
	readonly type: PaymentGatewayType

	name: string

	payment_methods?: PaymentMethod[] | null
	versions?: Version[] | null

}


class PaymentGateways extends ApiResource<PaymentGateway> {

	static readonly TYPE: PaymentGatewayType = 'payment_gateways' as const

	async payment_methods(paymentGatewayId: string | PaymentGateway, params?: QueryParamsList<PaymentMethod>, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _paymentGatewayId = (paymentGatewayId as PaymentGateway).id || paymentGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `payment_gateways/${_paymentGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async versions(paymentGatewayId: string | PaymentGateway, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _paymentGatewayId = (paymentGatewayId as PaymentGateway).id || paymentGatewayId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `payment_gateways/${_paymentGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isPaymentGateway(resource: any): resource is PaymentGateway {
		return resource.type && (resource.type === PaymentGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): PaymentGatewayRel {
		return super.relationshipOneToOne<PaymentGatewayRel>(id)
	}

	relationshipToMany(...ids: string[]): PaymentGatewayRel[] {
		return super.relationshipOneToMany<PaymentGatewayRel>(...ids)
	}


	type(): PaymentGatewayType {
		return PaymentGateways.TYPE
	}

}


export default PaymentGateways

export type { PaymentGateway, PaymentGatewayType }
