import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { PaymentMethod } from './payment_methods'
import { CheckoutComPayment } from './checkout_com_payments'


type CheckoutComGatewayRel = ResourceRel & { type: typeof CheckoutComGateways.TYPE }
type CheckoutComPaymentRel = ResourceRel & { type: 'checkout_com_payments' }


interface CheckoutComGateway extends Resource {
	
	name?: string
	webhook_endpoint_id?: string
	webhook_endpoint_secret?: string
	webhook_endpoint_url?: string

	payment_methods?: PaymentMethod[]
	checkout_com_payments?: CheckoutComPayment[]

}


interface CheckoutComGatewayCreate extends ResourceCreate {
	
	name: string
	secret_key: string
	public_key: string

	checkout_com_payments?: CheckoutComPaymentRel[]

}


interface CheckoutComGatewayUpdate extends ResourceUpdate {
	
	name?: string
	secret_key?: string
	public_key?: string

	checkout_com_payments?: CheckoutComPaymentRel[]

}


class CheckoutComGateways extends ApiResource {

	static readonly TYPE: 'checkout_com_gateways' = 'checkout_com_gateways'
	// static readonly PATH = 'checkout_com_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CheckoutComGateway>> {
		return this.resources.list<CheckoutComGateway>({ type: CheckoutComGateways.TYPE }, params, options)
	}

	async create(resource: CheckoutComGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComGateway> {
		return this.resources.create({ ...resource, type: CheckoutComGateways.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComGateway> {
		return this.resources.retrieve<CheckoutComGateway>({ type: CheckoutComGateways.TYPE, id }, params, options)
	}

	async update(resource: CheckoutComGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComGateway> {
		return this.resources.update({ ...resource, type: CheckoutComGateways.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: CheckoutComGateways.TYPE, id }, options)
	}

	async payment_methods(checkoutComGatewayId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `checkout_com_gateways/${checkoutComGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async checkout_com_payments(checkoutComGatewayId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CheckoutComPayment>> {
		return this.resources.fetch<CheckoutComPayment>({ type: 'checkout_com_payments' }, `checkout_com_gateways/${checkoutComGatewayId}/checkout_com_payments`, params, options) as unknown as ListResponse<CheckoutComPayment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCheckoutComGateway(resource: any): resource is CheckoutComGateway {
		return resource.type && (resource.type === CheckoutComGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): CheckoutComGatewayRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: CheckoutComGateways.TYPE } : { id: id.id, type: CheckoutComGateways.TYPE }
	}


	type(): string {
		return CheckoutComGateways.TYPE
	}

}


export default CheckoutComGateways

export { CheckoutComGateway, CheckoutComGatewayCreate, CheckoutComGatewayUpdate }
