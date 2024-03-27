import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod, PaymentMethodSortable } from './payment_methods'
import type { Version, VersionSortable } from './versions'
import type { PaypalPayment, PaypalPaymentSortable } from './paypal_payments'


type PaypalGatewayType = 'paypal_gateways'
type PaypalGatewayRel = ResourceRel & { type: PaypalGatewayType }


export type PaypalGatewaySortable = Pick<PaypalGateway, 'id' | 'name'> & ResourceSortable
export type PaypalGatewayFilterable = Pick<PaypalGateway, 'id' | 'name'> & ResourceFilterable


interface PaypalGateway extends Resource {
	
	readonly type: PaypalGatewayType

	name: string

	payment_methods?: PaymentMethod[] | null
	versions?: Version[] | null
	paypal_payments?: PaypalPayment[] | null

}


interface PaypalGatewayCreate extends ResourceCreate {
	
	name: string
	client_id: string
	client_secret: string
	
}


interface PaypalGatewayUpdate extends ResourceUpdate {
	
	name?: string | null
	client_id?: string | null
	client_secret?: string | null
	
}


class PaypalGateways extends ApiResource<PaypalGateway, PaypalGatewaySortable> {

	static readonly TYPE: PaypalGatewayType = 'paypal_gateways' as const

	async create(resource: PaypalGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaypalGateway> {
		return this.resources.create<PaypalGatewayCreate, PaypalGateway>({ ...resource, type: PaypalGateways.TYPE }, params, options)
	}

	async update(resource: PaypalGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaypalGateway> {
		return this.resources.update<PaypalGatewayUpdate, PaypalGateway>({ ...resource, type: PaypalGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: PaypalGateways.TYPE } : id, options)
	}

	async payment_methods(paypalGatewayId: string | PaypalGateway, params?: QueryParamsList<PaymentMethodSortable>, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _paypalGatewayId = (paypalGatewayId as PaypalGateway).id || paypalGatewayId as string
		return this.resources.fetch<PaymentMethod, PaymentMethodSortable>({ type: 'payment_methods' }, `paypal_gateways/${_paypalGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async versions(paypalGatewayId: string | PaypalGateway, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _paypalGatewayId = (paypalGatewayId as PaypalGateway).id || paypalGatewayId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `paypal_gateways/${_paypalGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async paypal_payments(paypalGatewayId: string | PaypalGateway, params?: QueryParamsList<PaypalPaymentSortable>, options?: ResourcesConfig): Promise<ListResponse<PaypalPayment>> {
		const _paypalGatewayId = (paypalGatewayId as PaypalGateway).id || paypalGatewayId as string
		return this.resources.fetch<PaypalPayment, PaypalPaymentSortable>({ type: 'paypal_payments' }, `paypal_gateways/${_paypalGatewayId}/paypal_payments`, params, options) as unknown as ListResponse<PaypalPayment>
	}


	isPaypalGateway(resource: any): resource is PaypalGateway {
		return resource.type && (resource.type === PaypalGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): PaypalGatewayRel {
		return super.relationshipOneToOne<PaypalGatewayRel>(id)
	}

	relationshipToMany(...ids: string[]): PaypalGatewayRel[] {
		return super.relationshipOneToMany<PaypalGatewayRel>(...ids)
	}


	type(): PaypalGatewayType {
		return PaypalGateways.TYPE
	}

}


export default PaypalGateways

export type { PaypalGateway, PaypalGatewayCreate, PaypalGatewayUpdate, PaypalGatewayType }

/*
export const PaypalGatewaysClient = (init: ResourceAdapter | ResourcesInitConfig): PaypalGateways => {
	return new PaypalGateways((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
