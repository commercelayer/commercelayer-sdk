import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { PaymentGateway, PaymentGatewayType } from './payment_gateways'
import type { Attachment } from './attachments'


type PaymentMethodType = 'payment_methods'
type PaymentMethodRel = ResourceRel & { type: PaymentMethodType }
type MarketRel = ResourceRel & { type: MarketType }
type PaymentGatewayRel = ResourceRel & { type: PaymentGatewayType }


interface PaymentMethod extends Resource {
	
	readonly type: PaymentMethodType

	payment_source_type: string
	name?: string | null
	currency_code?: string | null
	moto?: boolean | null
	require_capture?: boolean | null
	auto_capture?: boolean | null
	disabled_at?: string | null
	price_amount_cents: number
	price_amount_float?: number | null
	formatted_price_amount?: string | null
	auto_capture_max_amount_cents?: number | null
	auto_capture_max_amount_float?: number | null
	formatted_auto_capture_max_amount?: string | null

	market?: Market | null
	payment_gateway?: PaymentGateway | null
	attachments?: Attachment[] | null

}


interface PaymentMethodCreate extends ResourceCreate {
	
	payment_source_type: string
	currency_code?: string | null
	moto?: boolean | null
	require_capture?: boolean | null
	auto_capture?: boolean | null
	price_amount_cents: number
	auto_capture_max_amount_cents?: number | null

	market?: MarketRel | null
	payment_gateway: PaymentGatewayRel

}


interface PaymentMethodUpdate extends ResourceUpdate {
	
	payment_source_type?: string | null
	currency_code?: string | null
	moto?: boolean | null
	require_capture?: boolean | null
	auto_capture?: boolean | null
	_disable?: boolean | null
	_enable?: boolean | null
	price_amount_cents?: number | null
	auto_capture_max_amount_cents?: number | null

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


	isPaymentMethod(resource: any): resource is PaymentMethod {
		return resource.type && (resource.type === PaymentMethods.TYPE)
	}


	relationship(id: string | ResourceId | null): PaymentMethodRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: PaymentMethods.TYPE } : { id: id.id, type: PaymentMethods.TYPE }
	}


	type(): PaymentMethodType {
		return PaymentMethods.TYPE
	}

}


export default PaymentMethods

export type { PaymentMethod, PaymentMethodCreate, PaymentMethodUpdate, PaymentMethodType }
