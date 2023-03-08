import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Order } from './orders'
import type { PaymentGateway } from './payment_gateways'


type KlarnaPaymentRel = ResourceRel & { type: typeof KlarnaPayments.TYPE }
type OrderRel = ResourceRel & { type: 'orders' }


interface KlarnaPayment extends Resource {
	
	session_id?: string
	client_token?: string
	payment_methods?: object[]
	auth_token?: string
	mismatched_amounts?: boolean
	intent_amount_cents?: number
	intent_amount_float?: number
	formatted_intent_amount?: string
	payment_instrument?: object

	order?: Order
	payment_gateway?: PaymentGateway

}


interface KlarnaPaymentCreate extends ResourceCreate {
	
	order: OrderRel

}


interface KlarnaPaymentUpdate extends ResourceUpdate {
	
	auth_token?: string
	_update?: boolean

	order?: OrderRel

}


class KlarnaPayments extends ApiResource {

	static readonly TYPE: 'klarna_payments' = 'klarna_payments' as const
	// static readonly PATH = 'klarna_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<KlarnaPayment>> {
		return this.resources.list<KlarnaPayment>({ type: KlarnaPayments.TYPE }, params, options)
	}

	async create(resource: KlarnaPaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<KlarnaPayment> {
		return this.resources.create<KlarnaPaymentCreate, KlarnaPayment>({ ...resource, type: KlarnaPayments.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<KlarnaPayment> {
		return this.resources.retrieve<KlarnaPayment>({ type: KlarnaPayments.TYPE, id }, params, options)
	}

	async update(resource: KlarnaPaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<KlarnaPayment> {
		return this.resources.update<KlarnaPaymentUpdate, KlarnaPayment>({ ...resource, type: KlarnaPayments.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: KlarnaPayments.TYPE, id }, options)
	}

	async order(klarnaPaymentId: string | KlarnaPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _klarnaPaymentId = (klarnaPaymentId as KlarnaPayment).id || klarnaPaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `klarna_payments/${_klarnaPaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(klarnaPaymentId: string | KlarnaPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _klarnaPaymentId = (klarnaPaymentId as KlarnaPayment).id || klarnaPaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `klarna_payments/${_klarnaPaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isKlarnaPayment(resource: any): resource is KlarnaPayment {
		return resource.type && (resource.type === KlarnaPayments.TYPE)
	}


	relationship(id: string | ResourceId | null): KlarnaPaymentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: KlarnaPayments.TYPE } : { id: id.id, type: KlarnaPayments.TYPE }
	}


	type(): string {
		return KlarnaPayments.TYPE
	}

}


export default KlarnaPayments

export { KlarnaPayment, KlarnaPaymentCreate, KlarnaPaymentUpdate }
