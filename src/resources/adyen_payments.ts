import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Order } from './orders'
import type { PaymentGateway } from './payment_gateways'


type AdyenPaymentRel = ResourceRel & { type: typeof AdyenPayments.TYPE }
type OrderRel = ResourceRel & { type: 'orders' }


interface AdyenPayment extends Resource {
	
	public_key?: string
	payment_methods?: object
	payment_request_data?: object
	payment_request_details?: object
	payment_response?: object
	mismatched_amounts?: boolean

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


class AdyenPayments extends ApiResource {

	static readonly TYPE: 'adyen_payments' = 'adyen_payments' as const
	// static readonly PATH = 'adyen_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<AdyenPayment>> {
		return this.resources.list<AdyenPayment>({ type: AdyenPayments.TYPE }, params, options)
	}

	async create(resource: AdyenPaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenPayment> {
		return this.resources.create<AdyenPaymentCreate, AdyenPayment>({ ...resource, type: AdyenPayments.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenPayment> {
		return this.resources.retrieve<AdyenPayment>({ type: AdyenPayments.TYPE, id }, params, options)
	}

	async update(resource: AdyenPaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenPayment> {
		return this.resources.update<AdyenPaymentUpdate, AdyenPayment>({ ...resource, type: AdyenPayments.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: AdyenPayments.TYPE, id }, options)
	}

	async order(adyenPaymentId: string | AdyenPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _adyenPaymentId = (adyenPaymentId as AdyenPayment).id || adyenPaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `adyen_payments/${_adyenPaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(adyenPaymentId: string | AdyenPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _adyenPaymentId = (adyenPaymentId as AdyenPayment).id || adyenPaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `adyen_payments/${_adyenPaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isAdyenPayment(resource: any): resource is AdyenPayment {
		return resource.type && (resource.type === AdyenPayments.TYPE)
	}


	relationship(id: string | ResourceId | null): AdyenPaymentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: AdyenPayments.TYPE } : { id: id.id, type: AdyenPayments.TYPE }
	}


	type(): string {
		return AdyenPayments.TYPE
	}

}


export default AdyenPayments

export { AdyenPayment, AdyenPaymentCreate, AdyenPaymentUpdate }
