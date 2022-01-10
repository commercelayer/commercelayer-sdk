import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Order } from './orders'
import { PaymentGateway } from './payment_gateways'


type AdyenPaymentRel = ResourceId & { type: typeof AdyenPayments.TYPE }
type OrderRel = ResourceId & { type: 'orders' }


interface AdyenPayment extends Resource {
	
	public_key?: string
	payment_methods?: object
	payment_request_data?: object
	payment_request_details?: object
	payment_response?: object

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

	static readonly TYPE: 'adyen_payments' = 'adyen_payments'
	// static readonly PATH = 'adyen_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<AdyenPayment>> {
		return this.resources.list({ type: AdyenPayments.TYPE }, params, options)
	}

	async create(resource: AdyenPaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenPayment> {
		return this.resources.create({ ...resource, type: AdyenPayments.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenPayment> {
		return this.resources.retrieve<AdyenPayment>({ type: AdyenPayments.TYPE, id }, params, options)
	}

	async update(resource: AdyenPaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenPayment> {
		return this.resources.update({ ...resource, type: AdyenPayments.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: AdyenPayments.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isAdyenPayment(resource: any): resource is AdyenPayment {
		return resource.type && (resource.type === AdyenPayments.TYPE)
	}


	relationship(id: string | ResourceId): AdyenPaymentRel {
		return (typeof id === 'string') ? { id, type: AdyenPayments.TYPE } : { id: id.id, type: AdyenPayments.TYPE }
	}


	type(): string {
		return AdyenPayments.TYPE
	}

}


export default AdyenPayments

export { AdyenPayment, AdyenPaymentCreate, AdyenPaymentUpdate }
