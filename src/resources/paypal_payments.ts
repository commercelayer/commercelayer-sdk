import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'
import type { Version } from './versions'


type PaypalPaymentType = 'paypal_payments'
type PaypalPaymentRel = ResourceRel & { type: PaypalPaymentType }
type OrderRel = ResourceRel & { type: OrderType }


interface PaypalPayment extends Resource {
	
	readonly type: PaypalPaymentType

	return_url: string
	cancel_url: string
	note_to_payer?: string | null
	paypal_payer_id?: string | null
	name?: string | null
	paypal_id?: string | null
	status: 'created' | 'approved'
	approval_url?: string | null
	mismatched_amounts?: boolean | null
	intent_amount_cents: number
	intent_amount_float?: number | null
	formatted_intent_amount?: string | null
	payment_instrument?: Record<string, any> | null

	order?: Order | null
	payment_gateway?: PaymentGateway | null
	versions?: Version[] | null

}


interface PaypalPaymentCreate extends ResourceCreate {
	
	return_url: string
	cancel_url: string
	note_to_payer?: string | null

	order: OrderRel

}


interface PaypalPaymentUpdate extends ResourceUpdate {
	
	paypal_payer_id?: string | null

	order?: OrderRel | null

}


class PaypalPayments extends ApiResource<PaypalPayment> {

	static readonly TYPE: PaypalPaymentType = 'paypal_payments' as const

	async create(resource: PaypalPaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaypalPayment> {
		return this.resources.create<PaypalPaymentCreate, PaypalPayment>({ ...resource, type: PaypalPayments.TYPE }, params, options)
	}

	async update(resource: PaypalPaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaypalPayment> {
		return this.resources.update<PaypalPaymentUpdate, PaypalPayment>({ ...resource, type: PaypalPayments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: PaypalPayments.TYPE } : id, options)
	}

	async order(paypalPaymentId: string | PaypalPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _paypalPaymentId = (paypalPaymentId as PaypalPayment).id || paypalPaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `paypal_payments/${_paypalPaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(paypalPaymentId: string | PaypalPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _paypalPaymentId = (paypalPaymentId as PaypalPayment).id || paypalPaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `paypal_payments/${_paypalPaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async versions(paypalPaymentId: string | PaypalPayment, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _paypalPaymentId = (paypalPaymentId as PaypalPayment).id || paypalPaymentId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `paypal_payments/${_paypalPaymentId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isPaypalPayment(resource: any): resource is PaypalPayment {
		return resource.type && (resource.type === PaypalPayments.TYPE)
	}


	relationship(id: string | ResourceId | null): PaypalPaymentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: PaypalPayments.TYPE } : { id: id.id, type: PaypalPayments.TYPE }
	}


	type(): PaypalPaymentType {
		return PaypalPayments.TYPE
	}

}


export default PaypalPayments

export type { PaypalPayment, PaypalPaymentCreate, PaypalPaymentUpdate, PaypalPaymentType }
