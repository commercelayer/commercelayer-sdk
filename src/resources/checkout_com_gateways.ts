import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { CheckoutComPayment, CheckoutComPaymentType } from './checkout_com_payments'


type CheckoutComGatewayType = 'checkout_com_gateways'
type CheckoutComGatewayRel = ResourceRel & { type: CheckoutComGatewayType }
type CheckoutComPaymentRel = ResourceRel & { type: CheckoutComPaymentType }


interface CheckoutComGateway extends Resource {
	
	readonly type: CheckoutComGatewayType

	name: string
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
	
	name: string
	secret_key?: string
	public_key?: string

	checkout_com_payments?: CheckoutComPaymentRel[]

}


class CheckoutComGateways extends ApiResource<CheckoutComGateway> {

	static readonly TYPE: CheckoutComGatewayType = 'checkout_com_gateways' as const

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CheckoutComGateway>> {
		return this.resources.list<CheckoutComGateway>({ type: CheckoutComGateways.TYPE }, params, options)
	}

	async create(resource: CheckoutComGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComGateway> {
		return this.resources.create<CheckoutComGatewayCreate, CheckoutComGateway>({ ...resource, type: CheckoutComGateways.TYPE }, params, options)
	}

	async update(resource: CheckoutComGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComGateway> {
		return this.resources.update<CheckoutComGatewayUpdate, CheckoutComGateway>({ ...resource, type: CheckoutComGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: CheckoutComGateways.TYPE } : id, options)
	}

	async payment_methods(checkoutComGatewayId: string | CheckoutComGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _checkoutComGatewayId = (checkoutComGatewayId as CheckoutComGateway).id || checkoutComGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `checkout_com_gateways/${_checkoutComGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async checkout_com_payments(checkoutComGatewayId: string | CheckoutComGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CheckoutComPayment>> {
		const _checkoutComGatewayId = (checkoutComGatewayId as CheckoutComGateway).id || checkoutComGatewayId as string
		return this.resources.fetch<CheckoutComPayment>({ type: 'checkout_com_payments' }, `checkout_com_gateways/${_checkoutComGatewayId}/checkout_com_payments`, params, options) as unknown as ListResponse<CheckoutComPayment>
	}


	isCheckoutComGateway(resource: any): resource is CheckoutComGateway {
		return resource.type && (resource.type === CheckoutComGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): CheckoutComGatewayRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: CheckoutComGateways.TYPE } : { id: id.id, type: CheckoutComGateways.TYPE }
	}


	type(): CheckoutComGatewayType {
		return CheckoutComGateways.TYPE
	}

}


export default CheckoutComGateways

export type { CheckoutComGateway, CheckoutComGatewayCreate, CheckoutComGatewayUpdate, CheckoutComGatewayType }
