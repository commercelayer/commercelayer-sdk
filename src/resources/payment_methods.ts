import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { PaymentGateway, PaymentGatewayType } from './payment_gateways'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type PaymentMethodType = 'payment_methods'
type PaymentMethodRel = ResourceRel & { type: PaymentMethodType }
type MarketRel = ResourceRel & { type: MarketType }
type PaymentGatewayRel = ResourceRel & { type: PaymentGatewayType }


interface PaymentMethod extends Resource {
	
	readonly type: PaymentMethodType

	name?: string | null
	payment_source_type: 'adyen_payments' | 'axerve_payments' | 'braintree_payments' | 'checkout_com_payments' | 'credit_cards' | 'external_payments' | 'klarna_payments' | 'paypal_payments' | 'satispay_payments' | 'stripe_payments' | 'wire_transfers'
	currency_code?: string | null
	moto?: boolean | null
	require_capture?: boolean | null
	auto_place?: boolean | null
	auto_capture?: boolean | null
	price_amount_cents: number
	price_amount_float?: number | null
	formatted_price_amount?: string | null
	auto_capture_max_amount_cents?: number | null
	auto_capture_max_amount_float?: number | null
	formatted_auto_capture_max_amount?: string | null
	disabled_at?: string | null

	market?: Market | null
	payment_gateway?: PaymentGateway | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface PaymentMethodCreate extends ResourceCreate {
	
	payment_source_type: 'adyen_payments' | 'axerve_payments' | 'braintree_payments' | 'checkout_com_payments' | 'credit_cards' | 'external_payments' | 'klarna_payments' | 'paypal_payments' | 'satispay_payments' | 'stripe_payments' | 'wire_transfers'
	currency_code?: string | null
	moto?: boolean | null
	require_capture?: boolean | null
	auto_place?: boolean | null
	auto_capture?: boolean | null
	price_amount_cents: number
	auto_capture_max_amount_cents?: number | null
	_disable?: boolean | null
	_enable?: boolean | null

	market?: MarketRel | null
	payment_gateway: PaymentGatewayRel

}


interface PaymentMethodUpdate extends ResourceUpdate {
	
	payment_source_type?: 'adyen_payments' | 'axerve_payments' | 'braintree_payments' | 'checkout_com_payments' | 'credit_cards' | 'external_payments' | 'klarna_payments' | 'paypal_payments' | 'satispay_payments' | 'stripe_payments' | 'wire_transfers' | null
	currency_code?: string | null
	moto?: boolean | null
	require_capture?: boolean | null
	auto_place?: boolean | null
	auto_capture?: boolean | null
	price_amount_cents?: number | null
	auto_capture_max_amount_cents?: number | null
	_disable?: boolean | null
	_enable?: boolean | null

	market?: MarketRel | null
	payment_gateway?: PaymentGatewayRel | null

}


class PaymentMethods extends ApiResource<PaymentMethod> {

	static readonly TYPE: PaymentMethodType = 'payment_methods' as const

	async create(resource: PaymentMethodCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentMethod> {
		return this.resources.create<PaymentMethodCreate, PaymentMethod>({ ...resource, type: PaymentMethods.TYPE }, params, options)
	}

	async update(resource: PaymentMethodUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentMethod> {
		return this.resources.update<PaymentMethodUpdate, PaymentMethod>({ ...resource, type: PaymentMethods.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: PaymentMethods.TYPE } : id, options)
	}

	async market(paymentMethodId: string | PaymentMethod, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _paymentMethodId = (paymentMethodId as PaymentMethod).id || paymentMethodId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `payment_methods/${_paymentMethodId}/market`, params, options) as unknown as Market
	}

	async payment_gateway(paymentMethodId: string | PaymentMethod, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _paymentMethodId = (paymentMethodId as PaymentMethod).id || paymentMethodId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `payment_methods/${_paymentMethodId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async attachments(paymentMethodId: string | PaymentMethod, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _paymentMethodId = (paymentMethodId as PaymentMethod).id || paymentMethodId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `payment_methods/${_paymentMethodId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(paymentMethodId: string | PaymentMethod, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _paymentMethodId = (paymentMethodId as PaymentMethod).id || paymentMethodId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `payment_methods/${_paymentMethodId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _disable(id: string | PaymentMethod, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentMethod> {
		return this.resources.update<PaymentMethodUpdate, PaymentMethod>({ id: (typeof id === 'string')? id: id.id, type: PaymentMethods.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | PaymentMethod, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentMethod> {
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


export default PaymentMethods

export type { PaymentMethod, PaymentMethodCreate, PaymentMethodUpdate, PaymentMethodType }
