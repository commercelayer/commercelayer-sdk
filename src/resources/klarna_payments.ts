import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'


type KlarnaPaymentType = 'klarna_payments'
type KlarnaPaymentRel = ResourceRel & { type: KlarnaPaymentType }
type OrderRel = ResourceRel & { type: OrderType }


interface KlarnaPayment extends Resource {
	
	readonly type: KlarnaPaymentType

	session_id?: string | null
	client_token?: string | null
	payment_methods: Array<Record<string, any>>
	auth_token?: string | null
	mismatched_amounts?: boolean | null
	intent_amount_cents: number
	intent_amount_float?: number | null
	formatted_intent_amount?: string | null
	payment_instrument?: Record<string, any> | null

	order?: Order | null
	payment_gateway?: PaymentGateway | null

}


interface KlarnaPaymentCreate extends ResourceCreate {
	
	order: OrderRel

}


interface KlarnaPaymentUpdate extends ResourceUpdate {
	
	auth_token?: string | null
	_update?: boolean | null

	order?: OrderRel | null

}


class KlarnaPayments extends ApiResource<KlarnaPayment> {

	static readonly TYPE: KlarnaPaymentType = 'klarna_payments' as const

	async create(resource: KlarnaPaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<KlarnaPayment> {
		return this.resources.create<KlarnaPaymentCreate, KlarnaPayment>({ ...resource, type: KlarnaPayments.TYPE }, params, options)
	}

	async update(resource: KlarnaPaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<KlarnaPayment> {
		return this.resources.update<KlarnaPaymentUpdate, KlarnaPayment>({ ...resource, type: KlarnaPayments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: KlarnaPayments.TYPE } : id, options)
	}

	async order(klarnaPaymentId: string | KlarnaPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _klarnaPaymentId = (klarnaPaymentId as KlarnaPayment).id || klarnaPaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `klarna_payments/${_klarnaPaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(klarnaPaymentId: string | KlarnaPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _klarnaPaymentId = (klarnaPaymentId as KlarnaPayment).id || klarnaPaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `klarna_payments/${_klarnaPaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}


	isKlarnaPayment(resource: any): resource is KlarnaPayment {
		return resource.type && (resource.type === KlarnaPayments.TYPE)
	}


	relationship(id: string | ResourceId | null): KlarnaPaymentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: KlarnaPayments.TYPE } : { id: id.id, type: KlarnaPayments.TYPE }
	}


	type(): KlarnaPaymentType {
		return KlarnaPayments.TYPE
	}

}


export default KlarnaPayments

export type { KlarnaPayment, KlarnaPaymentCreate, KlarnaPaymentUpdate, KlarnaPaymentType }
