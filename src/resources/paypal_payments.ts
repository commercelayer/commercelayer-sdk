import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'
import type { Version } from './versions'


type PaypalPaymentType = 'paypal_payments'
type PaypalPaymentRel = ResourceRel & { type: PaypalPaymentType }
type OrderRel = ResourceRel & { type: OrderType }


export type PaypalPaymentSort = Pick<PaypalPayment, 'id'> & ResourceSort
// export type PaypalPaymentFilter = Pick<PaypalPayment, 'id'> & ResourceFilter


interface PaypalPayment extends Resource {
	
	readonly type: PaypalPaymentType

	/** 
	 * The URL where the payer is redirected after they approve the payment..
	 * @example ```"https://yourdomain.com/thankyou"```
	 */
	return_url: string
	/** 
	 * The URL where the payer is redirected after they cancel the payment..
	 * @example ```"https://yourdomain.com/checkout/payment"```
	 */
	cancel_url: string
	/** 
	 * A free-form field that you can use to send a note to the payer on PayPal..
	 * @example ```"Thank you for shopping with us!"```
	 */
	note_to_payer?: string | null
	/** 
	 * The id of the payer that PayPal passes in the return_url..
	 * @example ```"ABCDEFGHG123456"```
	 */
	paypal_payer_id?: string | null
	/** 
	 * The PayPal payer id (if present).
	 * @example ```"ABCDEFGHG123456"```
	 */
	name?: string | null
	/** 
	 * The id of the PayPal payment object..
	 * @example ```"1234567890"```
	 */
	paypal_id?: string | null
	/** 
	 * The PayPal payment status. One of 'created' (default) or 'approved'..
	 * @example ```"created"```
	 */
	status: 'created' | 'approved'
	/** 
	 * The URL the customer should be redirected to approve the payment..
	 * @example ```"https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-1234567890ABCDEFGHG"```
	 */
	approval_url?: string | null
	/** 
	 * Indicates if the order current amount differs form the one of the created payment intent..
	 */
	mismatched_amounts?: boolean | null
	/** 
	 * Information about the payment instrument used in the transaction.
	 * @example ```"[object Object]"```
	 */
	payment_instrument?: Record<string, any> | null

	order?: Order | null
	payment_gateway?: PaymentGateway | null
	versions?: Version[] | null

}


interface PaypalPaymentCreate extends ResourceCreate {
	
	/** 
	 * The URL where the payer is redirected after they approve the payment..
	 * @example ```"https://yourdomain.com/thankyou"```
	 */
	return_url: string
	/** 
	 * The URL where the payer is redirected after they cancel the payment..
	 * @example ```"https://yourdomain.com/checkout/payment"```
	 */
	cancel_url: string
	/** 
	 * A free-form field that you can use to send a note to the payer on PayPal..
	 * @example ```"Thank you for shopping with us!"```
	 */
	note_to_payer?: string | null

	order: OrderRel

}


interface PaypalPaymentUpdate extends ResourceUpdate {
	
	/** 
	 * The id of the payer that PayPal passes in the return_url..
	 * @example ```"ABCDEFGHG123456"```
	 */
	paypal_payer_id?: string | null

	order?: OrderRel | null

}


class PaypalPayments extends ApiResource<PaypalPayment> {

	static readonly TYPE: PaypalPaymentType = 'paypal_payments' as const

	async create(resource: PaypalPaymentCreate, params?: QueryParamsRetrieve<PaypalPayment>, options?: ResourcesConfig): Promise<PaypalPayment> {
		return this.resources.create<PaypalPaymentCreate, PaypalPayment>({ ...resource, type: PaypalPayments.TYPE }, params, options)
	}

	async update(resource: PaypalPaymentUpdate, params?: QueryParamsRetrieve<PaypalPayment>, options?: ResourcesConfig): Promise<PaypalPayment> {
		return this.resources.update<PaypalPaymentUpdate, PaypalPayment>({ ...resource, type: PaypalPayments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: PaypalPayments.TYPE } : id, options)
	}

	async order(paypalPaymentId: string | PaypalPayment, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _paypalPaymentId = (paypalPaymentId as PaypalPayment).id || paypalPaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `paypal_payments/${_paypalPaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(paypalPaymentId: string | PaypalPayment, params?: QueryParamsRetrieve<PaymentGateway>, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _paypalPaymentId = (paypalPaymentId as PaypalPayment).id || paypalPaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `paypal_payments/${_paypalPaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async versions(paypalPaymentId: string | PaypalPayment, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _paypalPaymentId = (paypalPaymentId as PaypalPayment).id || paypalPaymentId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `paypal_payments/${_paypalPaymentId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isPaypalPayment(resource: any): resource is PaypalPayment {
		return resource.type && (resource.type === PaypalPayments.TYPE)
	}


	relationship(id: string | ResourceId | null): PaypalPaymentRel {
		return super.relationshipOneToOne<PaypalPaymentRel>(id)
	}

	relationshipToMany(...ids: string[]): PaypalPaymentRel[] {
		return super.relationshipOneToMany<PaypalPaymentRel>(...ids)
	}


	type(): PaypalPaymentType {
		return PaypalPayments.TYPE
	}

}


export default PaypalPayments

export type { PaypalPayment, PaypalPaymentCreate, PaypalPaymentUpdate, PaypalPaymentType }
