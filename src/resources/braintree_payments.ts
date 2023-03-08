import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'


type BraintreePaymentType = 'braintree_payments'
type BraintreePaymentRel = ResourceRel & { type: BraintreePaymentType }
type OrderRel = ResourceRel & { type: OrderType }


interface BraintreePayment extends Resource {
	
	readonly type: BraintreePaymentType

	client_token?: string
	payment_method_nonce?: string
	payment_id?: string
	local?: boolean
	options?: object
	payment_instrument?: object

	order?: Order
	payment_gateway?: PaymentGateway

}


interface BraintreePaymentCreate extends ResourceCreate {
	
	payment_id?: string
	local?: boolean
	options?: object

	order: OrderRel

}


interface BraintreePaymentUpdate extends ResourceUpdate {
	
	payment_method_nonce?: string
	payment_id?: string
	local?: boolean
	options?: object

	order?: OrderRel

}


class BraintreePayments extends ApiResource<BraintreePayment> {

	static readonly TYPE: BraintreePaymentType = 'braintree_payments' as const
	// static readonly PATH = 'braintree_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<BraintreePayment>> {
		return this.resources.list<BraintreePayment>({ type: BraintreePayments.TYPE }, params, options)
	}

	async create(resource: BraintreePaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BraintreePayment> {
		return this.resources.create<BraintreePaymentCreate, BraintreePayment>({ ...resource, type: BraintreePayments.TYPE }, params, options)
	}

	async update(resource: BraintreePaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BraintreePayment> {
		return this.resources.update<BraintreePaymentUpdate, BraintreePayment>({ ...resource, type: BraintreePayments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: BraintreePayments.TYPE } : id, options)
	}

	async order(braintreePaymentId: string | BraintreePayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _braintreePaymentId = (braintreePaymentId as BraintreePayment).id || braintreePaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `braintree_payments/${_braintreePaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(braintreePaymentId: string | BraintreePayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _braintreePaymentId = (braintreePaymentId as BraintreePayment).id || braintreePaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `braintree_payments/${_braintreePaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}


	isBraintreePayment(resource: any): resource is BraintreePayment {
		return resource.type && (resource.type === BraintreePayments.TYPE)
	}


	relationship(id: string | ResourceId | null): BraintreePaymentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: BraintreePayments.TYPE } : { id: id.id, type: BraintreePayments.TYPE }
	}


	type(): BraintreePaymentType {
		return BraintreePayments.TYPE
	}

}


export default BraintreePayments

export type { BraintreePayment, BraintreePaymentCreate, BraintreePaymentUpdate, BraintreePaymentType }
