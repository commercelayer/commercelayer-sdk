import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { Attachment } from './attachments'


type PaymentOptionType = 'payment_options'
type PaymentOptionRel = ResourceRel & { type: PaymentOptionType }
type OrderRel = ResourceRel & { type: OrderType }


interface PaymentOption extends Resource {
	
	readonly type: PaymentOptionType

	name?: string | null
	payment_source_type: 'adyen_payments' | 'axerve_payments' | 'braintree_payments' | 'checkout_com_payments' | 'credit_cards' | 'external_payments' | 'klarna_payments' | 'paypal_payments' | 'satispay_payments' | 'stripe_payments' | 'wire_transfers'
	data: Record<string, any>

	order?: Order | null
	attachments?: Attachment[] | null

}


interface PaymentOptionCreate extends ResourceCreate {
	
	name?: string | null
	payment_source_type: 'adyen_payments' | 'axerve_payments' | 'braintree_payments' | 'checkout_com_payments' | 'credit_cards' | 'external_payments' | 'klarna_payments' | 'paypal_payments' | 'satispay_payments' | 'stripe_payments' | 'wire_transfers'
	data: Record<string, any>

	order: OrderRel

}


interface PaymentOptionUpdate extends ResourceUpdate {
	
	name?: string | null
	data?: Record<string, any> | null

	order?: OrderRel | null

}


class PaymentOptions extends ApiResource<PaymentOption> {

	static readonly TYPE: PaymentOptionType = 'payment_options' as const

	async create(resource: PaymentOptionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentOption> {
		return this.resources.create<PaymentOptionCreate, PaymentOption>({ ...resource, type: PaymentOptions.TYPE }, params, options)
	}

	async update(resource: PaymentOptionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentOption> {
		return this.resources.update<PaymentOptionUpdate, PaymentOption>({ ...resource, type: PaymentOptions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: PaymentOptions.TYPE } : id, options)
	}

	async order(paymentOptionId: string | PaymentOption, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _paymentOptionId = (paymentOptionId as PaymentOption).id || paymentOptionId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `payment_options/${_paymentOptionId}/order`, params, options) as unknown as Order
	}

	async attachments(paymentOptionId: string | PaymentOption, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _paymentOptionId = (paymentOptionId as PaymentOption).id || paymentOptionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `payment_options/${_paymentOptionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
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


export default PaymentOptions

export type { PaymentOption, PaymentOptionCreate, PaymentOptionUpdate, PaymentOptionType }
