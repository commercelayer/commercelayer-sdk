import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'


type CheckoutComPaymentType = 'checkout_com_payments'
type CheckoutComPaymentRel = ResourceRel & { type: CheckoutComPaymentType }
type OrderRel = ResourceRel & { type: OrderType }


interface CheckoutComPayment extends Resource {
	
	readonly type: CheckoutComPaymentType

	public_key?: string
	payment_type?: string
	token?: string
	session_id?: string
	success_url?: string
	failure_url?: string
	source_id?: string
	customer_token?: string
	redirect_uri?: string
	payment_response?: object
	mismatched_amounts?: boolean
	payment_instrument?: object

	order?: Order
	payment_gateway?: PaymentGateway

}


interface CheckoutComPaymentCreate extends ResourceCreate {
	
	payment_type: string
	token: string
	session_id?: string
	success_url?: string
	failure_url?: string

	order: OrderRel

}


interface CheckoutComPaymentUpdate extends ResourceUpdate {
	
	payment_type?: string
	token?: string
	session_id?: string
	success_url?: string
	failure_url?: string
	_details?: boolean
	_refresh?: boolean

	order?: OrderRel

}


class CheckoutComPayments extends ApiResource<CheckoutComPayment> {

	static readonly TYPE: CheckoutComPaymentType = 'checkout_com_payments' as const
	// static readonly PATH = 'checkout_com_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CheckoutComPayment>> {
		return this.resources.list<CheckoutComPayment>({ type: CheckoutComPayments.TYPE }, params, options)
	}

	async create(resource: CheckoutComPaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComPayment> {
		return this.resources.create<CheckoutComPaymentCreate, CheckoutComPayment>({ ...resource, type: CheckoutComPayments.TYPE }, params, options)
	}

	async update(resource: CheckoutComPaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComPayment> {
		return this.resources.update<CheckoutComPaymentUpdate, CheckoutComPayment>({ ...resource, type: CheckoutComPayments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: CheckoutComPayments.TYPE } : id, options)
	}

	async order(checkoutComPaymentId: string | CheckoutComPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _checkoutComPaymentId = (checkoutComPaymentId as CheckoutComPayment).id || checkoutComPaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `checkout_com_payments/${_checkoutComPaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(checkoutComPaymentId: string | CheckoutComPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _checkoutComPaymentId = (checkoutComPaymentId as CheckoutComPayment).id || checkoutComPaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `checkout_com_payments/${_checkoutComPaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}


	isCheckoutComPayment(resource: any): resource is CheckoutComPayment {
		return resource.type && (resource.type === CheckoutComPayments.TYPE)
	}


	relationship(id: string | ResourceId | null): CheckoutComPaymentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: CheckoutComPayments.TYPE } : { id: id.id, type: CheckoutComPayments.TYPE }
	}


	type(): CheckoutComPaymentType {
		return CheckoutComPayments.TYPE
	}

}


export default CheckoutComPayments

export type { CheckoutComPayment, CheckoutComPaymentCreate, CheckoutComPaymentUpdate, CheckoutComPaymentType }
