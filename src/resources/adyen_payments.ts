import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'


type AdyenPaymentType = 'adyen_payments'
type AdyenPaymentRel = ResourceRel & { type: AdyenPaymentType }
type OrderRel = ResourceRel & { type: OrderType }


interface AdyenPayment extends Resource {
	
	readonly type: AdyenPaymentType

	public_key?: string
	payment_methods: object
	payment_request_data?: object
	payment_request_details?: object
	payment_response?: object
	mismatched_amounts?: boolean
	payment_instrument?: object

	order?: Order
	payment_gateway?: PaymentGateway

}


interface AdyenPaymentCreate extends ResourceCreate {
	
	order: OrderRel

}


interface AdyenPaymentUpdate extends ResourceUpdate {
	
	payment_request_data?: object
	payment_request_details?: object
	payment_response?: object
	_details?: boolean

	order?: OrderRel

}


class AdyenPayments extends ApiResource<AdyenPayment> {

	static readonly TYPE: AdyenPaymentType = 'adyen_payments' as const
	// static readonly PATH = 'adyen_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<AdyenPayment>> {
		return this.resources.list<AdyenPayment>({ type: AdyenPayments.TYPE }, params, options)
	}

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
