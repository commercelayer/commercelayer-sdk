import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Order } from './orders'
import type { PaymentGateway } from './payment_gateways'


type PaypalPaymentRel = ResourceRel & { type: typeof PaypalPayments.TYPE }
type OrderRel = ResourceRel & { type: 'orders' }


interface PaypalPayment extends Resource {
	
	return_url?: string
	cancel_url?: string
	note_to_payer?: string
	paypal_payer_id?: string
	name?: string
	paypal_id?: string
	status?: string
	approval_url?: string
	mismatched_amounts?: boolean
	intent_amount_cents?: number
	intent_amount_float?: number
	formatted_intent_amount?: string
	payment_instrument?: object

	order?: Order
	payment_gateway?: PaymentGateway

}


interface PaypalPaymentCreate extends ResourceCreate {
	
	return_url: string
	cancel_url: string
	note_to_payer?: string

	order: OrderRel

}


interface PaypalPaymentUpdate extends ResourceUpdate {
	
	paypal_payer_id?: string

	order?: OrderRel

}


class PaypalPayments extends ApiResource {

	static readonly TYPE: 'paypal_payments' = 'paypal_payments' as const
	// static readonly PATH = 'paypal_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaypalPayment>> {
		return this.resources.list<PaypalPayment>({ type: PaypalPayments.TYPE }, params, options)
	}

	async create(resource: PaypalPaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaypalPayment> {
		return this.resources.create<PaypalPaymentCreate, PaypalPayment>({ ...resource, type: PaypalPayments.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaypalPayment> {
		return this.resources.retrieve<PaypalPayment>({ type: PaypalPayments.TYPE, id }, params, options)
	}

	async update(resource: PaypalPaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaypalPayment> {
		return this.resources.update<PaypalPaymentUpdate, PaypalPayment>({ ...resource, type: PaypalPayments.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: PaypalPayments.TYPE, id }, options)
	}

	async order(paypalPaymentId: string | PaypalPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _paypalPaymentId = (paypalPaymentId as PaypalPayment).id || paypalPaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `paypal_payments/${_paypalPaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(paypalPaymentId: string | PaypalPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _paypalPaymentId = (paypalPaymentId as PaypalPayment).id || paypalPaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `paypal_payments/${_paypalPaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPaypalPayment(resource: any): resource is PaypalPayment {
		return resource.type && (resource.type === PaypalPayments.TYPE)
	}


	relationship(id: string | ResourceId | null): PaypalPaymentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: PaypalPayments.TYPE } : { id: id.id, type: PaypalPayments.TYPE }
	}


	type(): string {
		return PaypalPayments.TYPE
	}

}


export default PaypalPayments

export { PaypalPayment, PaypalPaymentCreate, PaypalPaymentUpdate }
