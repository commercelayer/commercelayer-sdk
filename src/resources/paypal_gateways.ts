import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'
import type { PaypalPayment } from './paypal_payments'


type PaypalGatewayRel = ResourceRel & { type: typeof PaypalGateways.TYPE }


interface PaypalGateway extends Resource {
	
	name?: string

	payment_methods?: PaymentMethod[]
	versions?: Version[]
	paypal_payments?: PaypalPayment[]

}


interface PaypalGatewayCreate extends ResourceCreate {
	
	name: string
	client_id: string
	client_secret: string
	
}


interface PaypalGatewayUpdate extends ResourceUpdate {
	
	name?: string
	client_id?: string
	client_secret?: string
	
}


class PaypalGateways extends ApiResource {

	static readonly TYPE: 'paypal_gateways' = 'paypal_gateways' as const
	// static readonly PATH = 'paypal_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaypalGateway>> {
		return this.resources.list<PaypalGateway>({ type: PaypalGateways.TYPE }, params, options)
	}

	async create(resource: PaypalGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaypalGateway> {
		return this.resources.create<PaypalGatewayCreate, PaypalGateway>({ ...resource, type: PaypalGateways.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaypalGateway> {
		return this.resources.retrieve<PaypalGateway>({ type: PaypalGateways.TYPE, id }, params, options)
	}

	async update(resource: PaypalGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaypalGateway> {
		return this.resources.update<PaypalGatewayUpdate, PaypalGateway>({ ...resource, type: PaypalGateways.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: PaypalGateways.TYPE, id }, options)
	}

	async payment_methods(paypalGatewayId: string | PaypalGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _paypalGatewayId = (paypalGatewayId as PaypalGateway).id || paypalGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `paypal_gateways/${_paypalGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async versions(paypalGatewayId: string | PaypalGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _paypalGatewayId = (paypalGatewayId as PaypalGateway).id || paypalGatewayId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `paypal_gateways/${_paypalGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async paypal_payments(paypalGatewayId: string | PaypalGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaypalPayment>> {
		const _paypalGatewayId = (paypalGatewayId as PaypalGateway).id || paypalGatewayId as string
		return this.resources.fetch<PaypalPayment>({ type: 'paypal_payments' }, `paypal_gateways/${_paypalGatewayId}/paypal_payments`, params, options) as unknown as ListResponse<PaypalPayment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPaypalGateway(resource: any): resource is PaypalGateway {
		return resource.type && (resource.type === PaypalGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): PaypalGatewayRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: PaypalGateways.TYPE } : { id: id.id, type: PaypalGateways.TYPE }
	}


	type(): string {
		return PaypalGateways.TYPE
	}

}


export default PaypalGateways

export { PaypalGateway, PaypalGatewayCreate, PaypalGatewayUpdate }
