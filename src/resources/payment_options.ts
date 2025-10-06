import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { Attachment } from './attachments'
import type { EventStore } from './event_stores'


type PaymentOptionType = 'payment_options'
type PaymentOptionRel = ResourceRel & { type: PaymentOptionType }
type OrderRel = ResourceRel & { type: OrderType }


export type PaymentOptionSort = Pick<PaymentOption, 'id' | 'name' | 'payment_source_type'> & ResourceSort
// export type PaymentOptionFilter = Pick<PaymentOption, 'id' | 'name' | 'payment_source_type' | 'data'> & ResourceFilter


interface PaymentOption extends Resource {
	
	readonly type: PaymentOptionType

	/** 
	 * The payment option's name. Wehn blank is inherited by payment source type.
	 * @example ```"Stripe Payment Option"```
	 */
	name?: string | null
	/** 
	 * The payment source type. One of 'adyen_payments', 'axerve_payments', 'braintree_payments', 'checkout_com_payments', 'external_payments', 'klarna_payments', 'paypal_payments', 'satispay_payments', 'stripe_payments', or 'wire_transfers'.
	 * @example ```"stripe_payments"```
	 */
	payment_source_type: 'adyen_payments' | 'axerve_payments' | 'braintree_payments' | 'checkout_com_payments' | 'external_payments' | 'klarna_payments' | 'paypal_payments' | 'satispay_payments' | 'stripe_payments' | 'wire_transfers'
	/** 
	 * The payment options data to be added to the payment source payload. Check payment specific API for more details.
	 * @example ```{"application_fee_amount":1000,"on_behalf_of":"pm_xxx"}```
	 */
	data: Record<string, any>

	order?: Order | null
	attachments?: Attachment[] | null
	event_stores?: EventStore[] | null

}


interface PaymentOptionCreate extends ResourceCreate {
	
	/** 
	 * The payment option's name. Wehn blank is inherited by payment source type.
	 * @example ```"Stripe Payment Option"```
	 */
	name?: string | null
	/** 
	 * The payment source type. One of 'adyen_payments', 'axerve_payments', 'braintree_payments', 'checkout_com_payments', 'external_payments', 'klarna_payments', 'paypal_payments', 'satispay_payments', 'stripe_payments', or 'wire_transfers'.
	 * @example ```"stripe_payments"```
	 */
	payment_source_type: 'adyen_payments' | 'axerve_payments' | 'braintree_payments' | 'checkout_com_payments' | 'external_payments' | 'klarna_payments' | 'paypal_payments' | 'satispay_payments' | 'stripe_payments' | 'wire_transfers'
	/** 
	 * The payment options data to be added to the payment source payload. Check payment specific API for more details.
	 * @example ```{"application_fee_amount":1000,"on_behalf_of":"pm_xxx"}```
	 */
	data: Record<string, any>

	order: OrderRel

}


interface PaymentOptionUpdate extends ResourceUpdate {
	
	/** 
	 * The payment option's name. Wehn blank is inherited by payment source type.
	 * @example ```"Stripe Payment Option"```
	 */
	name?: string | null
	/** 
	 * The payment options data to be added to the payment source payload. Check payment specific API for more details.
	 * @example ```{"application_fee_amount":1000,"on_behalf_of":"pm_xxx"}```
	 */
	data?: Record<string, any> | null

	order?: OrderRel | null

}


class PaymentOptions extends ApiResource<PaymentOption> {

	static readonly TYPE: PaymentOptionType = 'payment_options' as const

	async create(resource: PaymentOptionCreate, params?: QueryParamsRetrieve<PaymentOption>, options?: ResourcesConfig): Promise<PaymentOption> {
		return this.resources.create<PaymentOptionCreate, PaymentOption>({ ...resource, type: PaymentOptions.TYPE }, params, options)
	}

	async update(resource: PaymentOptionUpdate, params?: QueryParamsRetrieve<PaymentOption>, options?: ResourcesConfig): Promise<PaymentOption> {
		return this.resources.update<PaymentOptionUpdate, PaymentOption>({ ...resource, type: PaymentOptions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: PaymentOptions.TYPE } : id, options)
	}

	async order(paymentOptionId: string | PaymentOption, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _paymentOptionId = (paymentOptionId as PaymentOption).id || paymentOptionId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `payment_options/${_paymentOptionId}/order`, params, options) as unknown as Order
	}

	async attachments(paymentOptionId: string | PaymentOption, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _paymentOptionId = (paymentOptionId as PaymentOption).id || paymentOptionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `payment_options/${_paymentOptionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async event_stores(paymentOptionId: string | PaymentOption, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _paymentOptionId = (paymentOptionId as PaymentOption).id || paymentOptionId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `payment_options/${_paymentOptionId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}


	isPaymentOption(resource: any): resource is PaymentOption {
		return resource.type && (resource.type === PaymentOptions.TYPE)
	}


	relationship(id: string | ResourceId | null): PaymentOptionRel {
		return super.relationshipOneToOne<PaymentOptionRel>(id)
	}

	relationshipToMany(...ids: string[]): PaymentOptionRel[] {
		return super.relationshipOneToMany<PaymentOptionRel>(...ids)
	}


	type(): PaymentOptionType {
		return PaymentOptions.TYPE
	}

}


const instance = new PaymentOptions()
export default instance

export type { PaymentOptions, PaymentOption, PaymentOptionCreate, PaymentOptionUpdate, PaymentOptionType }
