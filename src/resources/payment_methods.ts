import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { PaymentGateway, PaymentGatewayType } from './payment_gateways'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type PaymentMethodType = 'payment_methods'
type PaymentMethodRel = ResourceRel & { type: PaymentMethodType }
type MarketRel = ResourceRel & { type: MarketType }
type PaymentGatewayRel = ResourceRel & { type: PaymentGatewayType }


export type PaymentMethodSort = Pick<PaymentMethod, 'id' | 'payment_source_type' | 'currency_code' | 'price_amount_cents' | 'disabled_at'> & ResourceSort
// export type PaymentMethodFilter = Pick<PaymentMethod, 'id' | 'payment_source_type' | 'currency_code' | 'price_amount_cents' | 'disabled_at'> & ResourceFilter


interface PaymentMethod extends Resource {
	
	readonly type: PaymentMethodType

	name?: Nullable<string>
	payment_source_type: 'adyen_payments' | 'axerve_payments' | 'braintree_payments' | 'checkout_com_payments' | 'credit_cards' | 'external_payments' | 'klarna_payments' | 'paypal_payments' | 'satispay_payments' | 'stripe_payments' | 'wire_transfers'
	currency_code?: Nullable<string>
	moto?: Nullable<boolean>
	require_capture?: Nullable<boolean>
	auto_place?: Nullable<boolean>
	auto_capture?: Nullable<boolean>
	price_amount_cents: number
	price_amount_float?: Nullable<number>
	formatted_price_amount?: Nullable<string>
	auto_capture_max_amount_cents?: Nullable<number>
	auto_capture_max_amount_float?: Nullable<number>
	formatted_auto_capture_max_amount?: Nullable<string>
	disabled_at?: Nullable<string>

	market?: Nullable<Market>
	payment_gateway?: Nullable<PaymentGateway>
	attachments?: Nullable<Attachment[]>
	versions?: Nullable<Version[]>

}


interface PaymentMethodCreate extends ResourceCreate {
	
	payment_source_type: 'adyen_payments' | 'axerve_payments' | 'braintree_payments' | 'checkout_com_payments' | 'credit_cards' | 'external_payments' | 'klarna_payments' | 'paypal_payments' | 'satispay_payments' | 'stripe_payments' | 'wire_transfers'
	currency_code?: Nullable<string>
	moto?: Nullable<boolean>
	require_capture?: Nullable<boolean>
	auto_place?: Nullable<boolean>
	auto_capture?: Nullable<boolean>
	price_amount_cents: number
	auto_capture_max_amount_cents?: Nullable<number>
	_disable?: Nullable<boolean>
	_enable?: Nullable<boolean>

	market?: Nullable<MarketRel>
	payment_gateway: PaymentGatewayRel

}


interface PaymentMethodUpdate extends ResourceUpdate {
	
	payment_source_type?: Nullable<'adyen_payments' | 'axerve_payments' | 'braintree_payments' | 'checkout_com_payments' | 'credit_cards' | 'external_payments' | 'klarna_payments' | 'paypal_payments' | 'satispay_payments' | 'stripe_payments' | 'wire_transfers'>
	currency_code?: Nullable<string>
	moto?: Nullable<boolean>
	require_capture?: Nullable<boolean>
	auto_place?: Nullable<boolean>
	auto_capture?: Nullable<boolean>
	price_amount_cents?: Nullable<number>
	auto_capture_max_amount_cents?: Nullable<number>
	_disable?: Nullable<boolean>
	_enable?: Nullable<boolean>

	market?: Nullable<MarketRel>
	payment_gateway?: Nullable<PaymentGatewayRel>

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


export default PaymentMethods

export type { PaymentMethod, PaymentMethodCreate, PaymentMethodUpdate, PaymentMethodType }
