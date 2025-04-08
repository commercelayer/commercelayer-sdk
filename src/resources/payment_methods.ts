import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { PaymentGateway, PaymentGatewayType } from './payment_gateways'
import type { Store, StoreType } from './stores'
import type { Order } from './orders'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type PaymentMethodType = 'payment_methods'
type PaymentMethodRel = ResourceRel & { type: PaymentMethodType }
type MarketRel = ResourceRel & { type: MarketType }
type PaymentGatewayRel = ResourceRel & { type: PaymentGatewayType }
type StoreRel = ResourceRel & { type: StoreType }


export type PaymentMethodSort = Pick<PaymentMethod, 'id' | 'name' | 'payment_source_type' | 'currency_code' | 'price_amount_cents' | 'disabled_at'> & ResourceSort
// export type PaymentMethodFilter = Pick<PaymentMethod, 'id' | 'name' | 'payment_source_type' | 'currency_code' | 'price_amount_cents' | 'disabled_at'> & ResourceFilter


interface PaymentMethod extends Resource {
	
	readonly type: PaymentMethodType

	/** 
	 * The payment method's internal name.
	 * @example ```"Stripe Payment"```
	 */
	name?: string | null
	/** 
	 * The payment source type. One of 'adyen_payments', 'axerve_payments', 'braintree_payments', 'checkout_com_payments', 'credit_cards', 'external_payments', 'klarna_payments', 'paypal_payments', 'satispay_payments', 'stripe_payments', or 'wire_transfers'.
	 * @example ```"stripe_payments"```
	 */
	payment_source_type: 'adyen_payments' | 'axerve_payments' | 'braintree_payments' | 'checkout_com_payments' | 'credit_cards' | 'external_payments' | 'klarna_payments' | 'paypal_payments' | 'satispay_payments' | 'stripe_payments' | 'wire_transfers'
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * Send this attribute if you want to mark the payment as MOTO, must be supported by payment gateway.
	 */
	moto?: boolean | null
	/** 
	 * Send this attribute if you want to require the payment capture before fulfillment.
	 * @example ```true```
	 */
	require_capture?: boolean | null
	/** 
	 * Send this attribute if you want to automatically place the order upon authorization performed asynchronously.
	 * @example ```true```
	 */
	auto_place?: boolean | null
	/** 
	 * Send this attribute if you want to automatically capture the payment upon authorization.
	 */
	auto_capture?: boolean | null
	/** 
	 * The payment method's price, in cents.
	 */
	price_amount_cents: number
	/** 
	 * The payment method's price, float.
	 */
	price_amount_float?: number | null
	/** 
	 * The payment method's price, formatted.
	 * @example ```"€0,00"```
	 */
	formatted_price_amount?: string | null
	/** 
	 * Send this attribute if you want to limit automatic capture to orders for which the total amount is equal or less than the specified value, in cents.
	 */
	auto_capture_max_amount_cents?: number | null
	/** 
	 * The automatic capture max amount, float.
	 */
	auto_capture_max_amount_float?: number | null
	/** 
	 * The automatic capture max amount, formatted.
	 * @example ```"€0,00"```
	 */
	formatted_auto_capture_max_amount?: string | null
	/** 
	 * Time at which this resource was disabled.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	disabled_at?: string | null

	market?: Market | null
	payment_gateway?: PaymentGateway | null
	store?: Store | null
	orders?: Order[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface PaymentMethodCreate extends ResourceCreate {
	
	/** 
	 * The payment method's internal name.
	 * @example ```"Stripe Payment"```
	 */
	name?: string | null
	/** 
	 * The payment source type. One of 'adyen_payments', 'axerve_payments', 'braintree_payments', 'checkout_com_payments', 'credit_cards', 'external_payments', 'klarna_payments', 'paypal_payments', 'satispay_payments', 'stripe_payments', or 'wire_transfers'.
	 * @example ```"stripe_payments"```
	 */
	payment_source_type: 'adyen_payments' | 'axerve_payments' | 'braintree_payments' | 'checkout_com_payments' | 'credit_cards' | 'external_payments' | 'klarna_payments' | 'paypal_payments' | 'satispay_payments' | 'stripe_payments' | 'wire_transfers'
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * Send this attribute if you want to mark the payment as MOTO, must be supported by payment gateway.
	 */
	moto?: boolean | null
	/** 
	 * Send this attribute if you want to require the payment capture before fulfillment.
	 * @example ```true```
	 */
	require_capture?: boolean | null
	/** 
	 * Send this attribute if you want to automatically place the order upon authorization performed asynchronously.
	 * @example ```true```
	 */
	auto_place?: boolean | null
	/** 
	 * Send this attribute if you want to automatically capture the payment upon authorization.
	 */
	auto_capture?: boolean | null
	/** 
	 * The payment method's price, in cents.
	 */
	price_amount_cents: number
	/** 
	 * Send this attribute if you want to limit automatic capture to orders for which the total amount is equal or less than the specified value, in cents.
	 */
	auto_capture_max_amount_cents?: number | null
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```true```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```true```
	 */
	_enable?: boolean | null

	market?: MarketRel | null
	payment_gateway: PaymentGatewayRel
	store?: StoreRel | null

}


interface PaymentMethodUpdate extends ResourceUpdate {
	
	/** 
	 * The payment method's internal name.
	 * @example ```"Stripe Payment"```
	 */
	name?: string | null
	/** 
	 * The payment source type. One of 'adyen_payments', 'axerve_payments', 'braintree_payments', 'checkout_com_payments', 'credit_cards', 'external_payments', 'klarna_payments', 'paypal_payments', 'satispay_payments', 'stripe_payments', or 'wire_transfers'.
	 * @example ```"stripe_payments"```
	 */
	payment_source_type?: 'adyen_payments' | 'axerve_payments' | 'braintree_payments' | 'checkout_com_payments' | 'credit_cards' | 'external_payments' | 'klarna_payments' | 'paypal_payments' | 'satispay_payments' | 'stripe_payments' | 'wire_transfers' | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * Send this attribute if you want to mark the payment as MOTO, must be supported by payment gateway.
	 */
	moto?: boolean | null
	/** 
	 * Send this attribute if you want to require the payment capture before fulfillment.
	 * @example ```true```
	 */
	require_capture?: boolean | null
	/** 
	 * Send this attribute if you want to automatically place the order upon authorization performed asynchronously.
	 * @example ```true```
	 */
	auto_place?: boolean | null
	/** 
	 * Send this attribute if you want to automatically capture the payment upon authorization.
	 */
	auto_capture?: boolean | null
	/** 
	 * The payment method's price, in cents.
	 */
	price_amount_cents?: number | null
	/** 
	 * Send this attribute if you want to limit automatic capture to orders for which the total amount is equal or less than the specified value, in cents.
	 */
	auto_capture_max_amount_cents?: number | null
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```true```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```true```
	 */
	_enable?: boolean | null

	market?: MarketRel | null
	payment_gateway?: PaymentGatewayRel | null
	store?: StoreRel | null

}


class PaymentMethods extends ApiResource<PaymentMethod> {

	static readonly TYPE: PaymentMethodType = 'payment_methods' as const

	async create(resource: PaymentMethodCreate, params?: QueryParamsRetrieve<PaymentMethod>, options?: ResourcesConfig): Promise<PaymentMethod> {
		return this.resources.create<PaymentMethodCreate, PaymentMethod>({ ...resource, type: PaymentMethods.TYPE }, params, options)
	}

	async update(resource: PaymentMethodUpdate, params?: QueryParamsRetrieve<PaymentMethod>, options?: ResourcesConfig): Promise<PaymentMethod> {
		return this.resources.update<PaymentMethodUpdate, PaymentMethod>({ ...resource, type: PaymentMethods.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: PaymentMethods.TYPE } : id, options)
	}

	async market(paymentMethodId: string | PaymentMethod, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _paymentMethodId = (paymentMethodId as PaymentMethod).id || paymentMethodId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `payment_methods/${_paymentMethodId}/market`, params, options) as unknown as Market
	}

	async payment_gateway(paymentMethodId: string | PaymentMethod, params?: QueryParamsRetrieve<PaymentGateway>, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _paymentMethodId = (paymentMethodId as PaymentMethod).id || paymentMethodId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `payment_methods/${_paymentMethodId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async store(paymentMethodId: string | PaymentMethod, params?: QueryParamsRetrieve<Store>, options?: ResourcesConfig): Promise<Store> {
		const _paymentMethodId = (paymentMethodId as PaymentMethod).id || paymentMethodId as string
		return this.resources.fetch<Store>({ type: 'stores' }, `payment_methods/${_paymentMethodId}/store`, params, options) as unknown as Store
	}

	async orders(paymentMethodId: string | PaymentMethod, params?: QueryParamsList<Order>, options?: ResourcesConfig): Promise<ListResponse<Order>> {
		const _paymentMethodId = (paymentMethodId as PaymentMethod).id || paymentMethodId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `payment_methods/${_paymentMethodId}/orders`, params, options) as unknown as ListResponse<Order>
	}

	async attachments(paymentMethodId: string | PaymentMethod, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _paymentMethodId = (paymentMethodId as PaymentMethod).id || paymentMethodId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `payment_methods/${_paymentMethodId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(paymentMethodId: string | PaymentMethod, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _paymentMethodId = (paymentMethodId as PaymentMethod).id || paymentMethodId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `payment_methods/${_paymentMethodId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _disable(id: string | PaymentMethod, params?: QueryParamsRetrieve<PaymentMethod>, options?: ResourcesConfig): Promise<PaymentMethod> {
		return this.resources.update<PaymentMethodUpdate, PaymentMethod>({ id: (typeof id === 'string')? id: id.id, type: PaymentMethods.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | PaymentMethod, params?: QueryParamsRetrieve<PaymentMethod>, options?: ResourcesConfig): Promise<PaymentMethod> {
		return this.resources.update<PaymentMethodUpdate, PaymentMethod>({ id: (typeof id === 'string')? id: id.id, type: PaymentMethods.TYPE, _enable: true }, params, options)
	}


	isPaymentMethod(resource: any): resource is PaymentMethod {
		return resource.type && (resource.type === PaymentMethods.TYPE)
	}


	relationship(id: string | ResourceId | null): PaymentMethodRel {
		return super.relationshipOneToOne<PaymentMethodRel>(id)
	}

	relationshipToMany(...ids: string[]): PaymentMethodRel[] {
		return super.relationshipOneToMany<PaymentMethodRel>(...ids)
	}


	type(): PaymentMethodType {
		return PaymentMethods.TYPE
	}

}


const instance = new PaymentMethods()
export default instance

export type { PaymentMethods, PaymentMethod, PaymentMethodCreate, PaymentMethodUpdate, PaymentMethodType }
