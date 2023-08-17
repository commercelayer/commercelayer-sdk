import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'


type AdyenPaymentType = 'adyen_payments'
type AdyenPaymentRel = ResourceRel & { type: AdyenPaymentType }
type OrderRel = ResourceRel & { type: OrderType }


interface AdyenPayment extends Resource {
	
	readonly type: AdyenPaymentType

	public_key?: string | null
	payment_methods: Record<string, any>
	payment_request_data?: Record<string, any> | null
	payment_request_details?: Record<string, any> | null
	payment_response?: Record<string, any> | null
	mismatched_amounts?: boolean | null
	payment_instrument?: Record<string, any> | null

	order?: Order | null
	payment_gateway?: PaymentGateway | null

}


interface AdyenPaymentCreate extends ResourceCreate {
	
	order: OrderRel

}


interface AdyenPaymentUpdate extends ResourceUpdate {
	
	payment_request_data?: Record<string, any> | null
	payment_request_details?: Record<string, any> | null
	payment_response?: Record<string, any> | null
	_details?: boolean | null

	order?: OrderRel | null

}


class AdyenPayments extends ApiResource<AdyenPayment> {

	static readonly TYPE: AdyenPaymentType = 'adyen_payments' as const

	async create(resource: AdyenPaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenPayment> {
		return this.resources.create<AdyenPaymentCreate, AdyenPayment>({ ...resource, type: AdyenPayments.TYPE }, params, options)
	}

	async update(resource: AdyenPaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenPayment> {
		return this.resources.update<AdyenPaymentUpdate, AdyenPayment>({ ...resource, type: AdyenPayments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: AdyenPayments.TYPE } : id, options)
	}

	async order(adyenPaymentId: string | AdyenPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _adyenPaymentId = (adyenPaymentId as AdyenPayment).id || adyenPaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `adyen_payments/${_adyenPaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(adyenPaymentId: string | AdyenPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _adyenPaymentId = (adyenPaymentId as AdyenPayment).id || adyenPaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `adyen_payments/${_adyenPaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async _details(id: string | AdyenPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenPayment> {
		return this.resources.update<AdyenPaymentUpdate, AdyenPayment>({ id: (typeof id === 'string')? id: id.id, type: AdyenPayments.TYPE, _details: true }, params, options)
	}


	isAdyenPayment(resource: any): resource is AdyenPayment {
		return resource.type && (resource.type === AdyenPayments.TYPE)
	}


	relationship(id: string | ResourceId | null): AdyenPaymentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: AdyenPayments.TYPE } : { id: id.id, type: AdyenPayments.TYPE }
	}


	type(): AdyenPaymentType {
		return AdyenPayments.TYPE
	}

}


export default AdyenPayments

export type { AdyenPayment, AdyenPaymentCreate, AdyenPaymentUpdate, AdyenPaymentType }
