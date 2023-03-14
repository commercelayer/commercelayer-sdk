import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'


type AxervePaymentType = 'axerve_payments'
type AxervePaymentRel = ResourceRel & { type: AxervePaymentType }
type OrderRel = ResourceRel & { type: OrderType }


interface AxervePayment extends Resource {
	
	readonly type: AxervePaymentType

	login: string
	return_url: string
	payment_request_data?: object
	mismatched_amounts?: boolean
	intent_amount_cents: number
	intent_amount_float?: number
	formatted_intent_amount?: string
	payment_instrument?: object

	order?: Order
	payment_gateway?: PaymentGateway

}


interface AxervePaymentCreate extends ResourceCreate {
	
	return_url: string

	order: OrderRel

}


interface AxervePaymentUpdate extends ResourceUpdate {
	
	payment_request_data?: object
	_update?: boolean

	order?: OrderRel

}


class AxervePayments extends ApiResource<AxervePayment> {

	static readonly TYPE: AxervePaymentType = 'axerve_payments' as const
	// static readonly PATH = 'axerve_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<AxervePayment>> {
		return this.resources.list<AxervePayment>({ type: AxervePayments.TYPE }, params, options)
	}

	async create(resource: AxervePaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AxervePayment> {
		return this.resources.create<AxervePaymentCreate, AxervePayment>({ ...resource, type: AxervePayments.TYPE }, params, options)
	}

	async update(resource: AxervePaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AxervePayment> {
		return this.resources.update<AxervePaymentUpdate, AxervePayment>({ ...resource, type: AxervePayments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: AxervePayments.TYPE } : id, options)
	}

	async order(axervePaymentId: string | AxervePayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _axervePaymentId = (axervePaymentId as AxervePayment).id || axervePaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `axerve_payments/${_axervePaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(axervePaymentId: string | AxervePayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _axervePaymentId = (axervePaymentId as AxervePayment).id || axervePaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `axerve_payments/${_axervePaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}


	isAxervePayment(resource: any): resource is AxervePayment {
		return resource.type && (resource.type === AxervePayments.TYPE)
	}


	relationship(id: string | ResourceId | null): AxervePaymentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: AxervePayments.TYPE } : { id: id.id, type: AxervePayments.TYPE }
	}


	type(): AxervePaymentType {
		return AxervePayments.TYPE
	}

}


export default AxervePayments

export type { AxervePayment, AxervePaymentCreate, AxervePaymentUpdate, AxervePaymentType }
