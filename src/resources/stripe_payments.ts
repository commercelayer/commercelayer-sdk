import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'
import type { Version } from './versions'


type StripePaymentType = 'stripe_payments'
type StripePaymentRel = ResourceRel & { type: StripePaymentType }
type OrderRel = ResourceRel & { type: OrderType }


export type StripePaymentSort = Pick<StripePayment, 'id'> & ResourceSort
// export type StripePaymentFilter = Pick<StripePayment, 'id'> & ResourceFilter


interface StripePayment extends Resource {
	
	readonly type: StripePaymentType

	/** 
	 * The Stripe payment intent ID. Required to identify a payment session on stripe.
	 * @example ```"pi_1234XXX"```
	 */
	stripe_id?: string | null
	/** 
	 * The Stripe payment intent client secret. Required to create a charge through Stripe.js.
	 * @example ```"pi_1234XXX_secret_5678YYY"```
	 */
	client_secret?: string | null
	/** 
	 * The Stripe charge ID. Identifies money movement upon the payment intent confirmation.
	 * @example ```"ch_1234XXX"```
	 */
	charge_id?: string | null
	/** 
	 * The Stripe publishable API key.
	 * @example ```"pk_live_xxxx-yyyy-zzzz"```
	 */
	publishable_key?: string | null
	/** 
	 * The Stripe account ID that these funds are intended for.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	on_behalf_of?: string | null
	/** 
	 * A string that identifies the resulting payment as part of a group.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	transfer_group?: string | null
	/** 
	 * Stripe payment options: 'customer', 'payment_method', 'return_url', etc. Check Stripe payment intent API for more details.
	 * @example ```{"customer":"cus_xxx","payment_method":"pm_xxx"}```
	 */
	options?: Record<string, any> | null
	/** 
	 * Stripe 'payment_method', set by webhook.
	 * @example ```{"id":"pm_xxx"}```
	 */
	payment_method?: Record<string, any> | null
	/** 
	 * Indicates if the order current amount differs form the one of the created payment intent.
	 */
	mismatched_amounts?: boolean | null
	/** 
	 * The URL to return to when a redirect payment is completed.
	 * @example ```"https://yourdomain.com/thankyou"```
	 */
	return_url?: string | null
	/** 
	 * The email address to send the receipt to.
	 * @example ```"john@example.com"```
	 */
	receipt_email?: string | null
	/** 
	 * Information about the payment instrument used in the transaction.
	 * @example ```{"issuer":"cl bank","card_type":"visa"}```
	 */
	payment_instrument?: Record<string, any> | null

	order?: Order | null
	payment_gateway?: PaymentGateway | null
	versions?: Version[] | null

}


interface StripePaymentCreate extends ResourceCreate {
	
	/** 
	 * The Stripe payment intent ID. Required to identify a payment session on stripe.
	 * @example ```"pi_1234XXX"```
	 */
	stripe_id?: string | null
	/** 
	 * The Stripe payment intent client secret. Required to create a charge through Stripe.js.
	 * @example ```"pi_1234XXX_secret_5678YYY"```
	 */
	client_secret?: string | null
	/** 
	 * Stripe payment options: 'customer', 'payment_method', 'return_url', etc. Check Stripe payment intent API for more details.
	 * @example ```{"customer":"cus_xxx","payment_method":"pm_xxx"}```
	 */
	options?: Record<string, any> | null
	/** 
	 * The URL to return to when a redirect payment is completed.
	 * @example ```"https://yourdomain.com/thankyou"```
	 */
	return_url?: string | null
	/** 
	 * The email address to send the receipt to.
	 * @example ```"john@example.com"```
	 */
	receipt_email?: string | null

	order: OrderRel

}


interface StripePaymentUpdate extends ResourceUpdate {
	
	/** 
	 * Stripe payment options: 'customer', 'payment_method', 'return_url', etc. Check Stripe payment intent API for more details.
	 * @example ```{"customer":"cus_xxx","payment_method":"pm_xxx"}```
	 */
	options?: Record<string, any> | null
	/** 
	 * The URL to return to when a redirect payment is completed.
	 * @example ```"https://yourdomain.com/thankyou"```
	 */
	return_url?: string | null
	/** 
	 * Send this attribute if you want to update the created payment intent with fresh order data.
	 * @example ```true```
	 */
	_update?: boolean | null
	/** 
	 * Send this attribute if you want to refresh the payment status, can be used as webhooks fallback logic.
	 * @example ```true```
	 */
	_refresh?: boolean | null

	order?: OrderRel | null

}


class StripePayments extends ApiResource<StripePayment> {

	static readonly TYPE: StripePaymentType = 'stripe_payments' as const

	async create(resource: StripePaymentCreate, params?: QueryParamsRetrieve<StripePayment>, options?: ResourcesConfig): Promise<StripePayment> {
		return this.resources.create<StripePaymentCreate, StripePayment>({ ...resource, type: StripePayments.TYPE }, params, options)
	}

	async update(resource: StripePaymentUpdate, params?: QueryParamsRetrieve<StripePayment>, options?: ResourcesConfig): Promise<StripePayment> {
		return this.resources.update<StripePaymentUpdate, StripePayment>({ ...resource, type: StripePayments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: StripePayments.TYPE } : id, options)
	}

	async order(stripePaymentId: string | StripePayment, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _stripePaymentId = (stripePaymentId as StripePayment).id || stripePaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `stripe_payments/${_stripePaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(stripePaymentId: string | StripePayment, params?: QueryParamsRetrieve<PaymentGateway>, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _stripePaymentId = (stripePaymentId as StripePayment).id || stripePaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `stripe_payments/${_stripePaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async versions(stripePaymentId: string | StripePayment, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _stripePaymentId = (stripePaymentId as StripePayment).id || stripePaymentId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `stripe_payments/${_stripePaymentId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _update(id: string | StripePayment, params?: QueryParamsRetrieve<StripePayment>, options?: ResourcesConfig): Promise<StripePayment> {
		return this.resources.update<StripePaymentUpdate, StripePayment>({ id: (typeof id === 'string')? id: id.id, type: StripePayments.TYPE, _update: true }, params, options)
	}

	async _refresh(id: string | StripePayment, params?: QueryParamsRetrieve<StripePayment>, options?: ResourcesConfig): Promise<StripePayment> {
		return this.resources.update<StripePaymentUpdate, StripePayment>({ id: (typeof id === 'string')? id: id.id, type: StripePayments.TYPE, _refresh: true }, params, options)
	}


	isStripePayment(resource: any): resource is StripePayment {
		return resource.type && (resource.type === StripePayments.TYPE)
	}


	relationship(id: string | ResourceId | null): StripePaymentRel {
		return super.relationshipOneToOne<StripePaymentRel>(id)
	}

	relationshipToMany(...ids: string[]): StripePaymentRel[] {
		return super.relationshipOneToMany<StripePaymentRel>(...ids)
	}


	type(): StripePaymentType {
		return StripePayments.TYPE
	}

}


const instance = new StripePayments()
export default instance

export type { StripePayment, StripePaymentCreate, StripePaymentUpdate, StripePaymentType }
