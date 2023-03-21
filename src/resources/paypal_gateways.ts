import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { PaypalPayment } from './paypal_payments'


type PaypalGatewayType = 'paypal_gateways'
type PaypalGatewayRel = ResourceRel & { type: PaypalGatewayType }


interface PaypalGateway extends Resource {
	
	readonly type: PaypalGatewayType

	name: string

	payment_methods?: PaymentMethod[]
	paypal_payments?: PaypalPayment[]

}


interface PaypalGatewayCreate extends ResourceCreate {
	
	name: string
	client_id: string
	client_secret: string
	
}


interface PaypalGatewayUpdate extends ResourceUpdate {
	
	name: string
	client_id?: string
	client_secret?: string
	
}


class PaypalGateways extends ApiResource<PaypalGateway> {

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

	async payment_methods(paypalGatewayId: string | PaypalGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _paypalGatewayId = (paypalGatewayId as PaypalGateway).id || paypalGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `paypal_gateways/${_paypalGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async paypal_payments(paypalGatewayId: string | PaypalGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaypalPayment>> {
		const _paypalGatewayId = (paypalGatewayId as PaypalGateway).id || paypalGatewayId as string
		return this.resources.fetch<PaypalPayment>({ type: 'paypal_payments' }, `paypal_gateways/${_paypalGatewayId}/paypal_payments`, params, options) as unknown as ListResponse<PaypalPayment>
	}


	isPaypalGateway(resource: any): resource is PaypalGateway {
		return resource.type && (resource.type === PaypalGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): PaypalGatewayRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: PaypalGateways.TYPE } : { id: id.id, type: PaypalGateways.TYPE }
	}


	type(): PaypalGatewayType {
		return PaypalGateways.TYPE
	}

}


export default PaypalGateways

export type { PaypalGateway, PaypalGatewayCreate, PaypalGatewayUpdate, PaypalGatewayType }
