import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'
import type { Version } from './versions'


type CheckoutComPaymentType = 'checkout_com_payments'
type CheckoutComPaymentRel = ResourceRel & { type: CheckoutComPaymentType }
type OrderRel = ResourceRel & { type: OrderType }


export type CheckoutComPaymentSort = Pick<CheckoutComPayment, 'id'> & ResourceSort
// export type CheckoutComPaymentFilter = Pick<CheckoutComPayment, 'id'> & ResourceFilter


interface CheckoutComPayment extends Resource {
	
	readonly type: CheckoutComPaymentType

	/** 
	 * The Checkout.com publishable API key.
	 * @example ```"pk_test_xxxx-yyyy-zzzz"```
	 */
	public_key?: string | null
	/** 
	 * The payment source type.
	 * @example ```"token"```
	 */
	payment_type: string
	/** 
	 * The Checkout.com card or digital wallet token.
	 * @example ```"tok_4gzeau5o2uqubbk6fufs3m7p54"```
	 */
	token: string
	/** 
	 * The session object which initializes payment.
	 * @example ```{"id":"ps_xxxx_yyyy_zzzz","payment_session_secret":"pss_xxxx_yyy_zzzz","payment_session_token":"xxxxx_yyyyy_zzzzz","_links":{"self":{"href":"https://api.sandbox.checkout.com/payment-sessions/ps_xxxx_yyyy_zzzz"}}}```
	 */
	payment_session: Record<string, any>
	/** 
	 * The URL to redirect your customer upon 3DS succeeded authentication.
	 * @example ```"http://commercelayer.dev/checkout_com/success"```
	 */
	success_url: string
	/** 
	 * The URL to redirect your customer upon 3DS failed authentication.
	 * @example ```"http://commercelayer.dev/checkout_com/failure"```
	 */
	failure_url: string
	/** 
	 * The payment source identifier that can be used for subsequent payments.
	 * @example ```"src_nwd3m4in3hkuddfpjsaevunhdy"```
	 */
	source_id?: string | null
	/** 
	 * The customer's unique identifier. This can be passed as a source when making a payment.
	 * @example ```"cus_udst2tfldj6upmye2reztkmm4i"```
	 */
	customer_token?: string | null
	/** 
	 * The URI that the customer should be redirected to in order to complete the payment.
	 * @example ```"https://api.checkout.com/3ds/pay_mbabizu24mvu3mela5njyhpit4"```
	 */
	redirect_uri?: string | null
	/** 
	 * The Checkout.com payment response, used to fetch internal data.
	 * @example ```{"foo":"bar"}```
	 */
	payment_response?: Record<string, any> | null
	/** 
	 * Indicates if the order current amount differs form the one of the associated authorization.
	 */
	mismatched_amounts?: boolean | null
	/** 
	 * Information about the payment instrument used in the transaction.
	 * @example ```{"issuer":"cl bank","card_type":"visa"}```
	 */
	payment_instrument?: Record<string, any> | null

	order?: Order | null
	payment_gateway?: PaymentGateway | null
	versions?: Version[] | null

}


interface CheckoutComPaymentCreate extends ResourceCreate {
	
	/** 
	 * The payment source type.
	 * @example ```"token"```
	 */
	payment_type: string
	/** 
	 * The Checkout.com card or digital wallet token.
	 * @example ```"tok_4gzeau5o2uqubbk6fufs3m7p54"```
	 */
	token: string
	/** 
	 * The URL to redirect your customer upon 3DS succeeded authentication.
	 * @example ```"http://commercelayer.dev/checkout_com/success"```
	 */
	success_url: string
	/** 
	 * The URL to redirect your customer upon 3DS failed authentication.
	 * @example ```"http://commercelayer.dev/checkout_com/failure"```
	 */
	failure_url: string

	order: OrderRel

}


interface CheckoutComPaymentUpdate extends ResourceUpdate {
	
	/** 
	 * The payment source type.
	 * @example ```"token"```
	 */
	payment_type?: string | null
	/** 
	 * The Checkout.com card or digital wallet token.
	 * @example ```"tok_4gzeau5o2uqubbk6fufs3m7p54"```
	 */
	token?: string | null
	/** 
	 * Send this attribute if you want to send additional details the payment request (i.e. upon 3DS check).
	 * @example ```true```
	 */
	_details?: boolean | null
	/** 
	 * Send this attribute if you want to refresh all the pending transactions, can be used as webhooks fallback logic.
	 * @example ```true```
	 */
	_refresh?: boolean | null

	order?: OrderRel | null

}


class CheckoutComPayments extends ApiResource<CheckoutComPayment> {

	static readonly TYPE: CheckoutComPaymentType = 'checkout_com_payments' as const

	async create(resource: CheckoutComPaymentCreate, params?: QueryParamsRetrieve<CheckoutComPayment>, options?: ResourcesConfig): Promise<CheckoutComPayment> {
		return this.resources.create<CheckoutComPaymentCreate, CheckoutComPayment>({ ...resource, type: CheckoutComPayments.TYPE }, params, options)
	}

	async update(resource: CheckoutComPaymentUpdate, params?: QueryParamsRetrieve<CheckoutComPayment>, options?: ResourcesConfig): Promise<CheckoutComPayment> {
		return this.resources.update<CheckoutComPaymentUpdate, CheckoutComPayment>({ ...resource, type: CheckoutComPayments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: CheckoutComPayments.TYPE } : id, options)
	}

	async order(checkoutComPaymentId: string | CheckoutComPayment, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _checkoutComPaymentId = (checkoutComPaymentId as CheckoutComPayment).id || checkoutComPaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `checkout_com_payments/${_checkoutComPaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(checkoutComPaymentId: string | CheckoutComPayment, params?: QueryParamsRetrieve<PaymentGateway>, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _checkoutComPaymentId = (checkoutComPaymentId as CheckoutComPayment).id || checkoutComPaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `checkout_com_payments/${_checkoutComPaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async versions(checkoutComPaymentId: string | CheckoutComPayment, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _checkoutComPaymentId = (checkoutComPaymentId as CheckoutComPayment).id || checkoutComPaymentId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `checkout_com_payments/${_checkoutComPaymentId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _details(id: string | CheckoutComPayment, params?: QueryParamsRetrieve<CheckoutComPayment>, options?: ResourcesConfig): Promise<CheckoutComPayment> {
		return this.resources.update<CheckoutComPaymentUpdate, CheckoutComPayment>({ id: (typeof id === 'string')? id: id.id, type: CheckoutComPayments.TYPE, _details: true }, params, options)
	}

	async _refresh(id: string | CheckoutComPayment, params?: QueryParamsRetrieve<CheckoutComPayment>, options?: ResourcesConfig): Promise<CheckoutComPayment> {
		return this.resources.update<CheckoutComPaymentUpdate, CheckoutComPayment>({ id: (typeof id === 'string')? id: id.id, type: CheckoutComPayments.TYPE, _refresh: true }, params, options)
	}


	isCheckoutComPayment(resource: any): resource is CheckoutComPayment {
		return resource.type && (resource.type === CheckoutComPayments.TYPE)
	}


	relationship(id: string | ResourceId | null): CheckoutComPaymentRel {
		return super.relationshipOneToOne<CheckoutComPaymentRel>(id)
	}

	relationshipToMany(...ids: string[]): CheckoutComPaymentRel[] {
		return super.relationshipOneToMany<CheckoutComPaymentRel>(...ids)
	}


	type(): CheckoutComPaymentType {
		return CheckoutComPayments.TYPE
	}

}


const instance = new CheckoutComPayments()
export default instance

export type { CheckoutComPayments, CheckoutComPayment, CheckoutComPaymentCreate, CheckoutComPaymentUpdate, CheckoutComPaymentType }
