import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Order } from './orders'
import { PaymentGateway } from './payment_gateways'


type CheckoutComPaymentRel = ResourceRel & { type: typeof CheckoutComPayments.TYPE }
type OrderRel = ResourceRel & { type: 'orders' }


interface CheckoutComPayment extends Resource {
	
	payment_type?: string
	token?: string
	session_id?: string
	source_id?: string
	customer_token?: string
	redirect_uri?: string
	payment_response?: object

	order?: Order
	payment_gateway?: PaymentGateway

}


interface CheckoutComPaymentCreate extends ResourceCreate {
	
	payment_type: string
	token: string
	session_id?: string

	order: OrderRel

}


interface CheckoutComPaymentUpdate extends ResourceUpdate {
	
	payment_type?: string
	token?: string
	session_id?: string
	_details?: boolean
	_refresh?: boolean

	order?: OrderRel

}


class CheckoutComPayments extends ApiResource {

	static readonly TYPE: 'checkout_com_payments' = 'checkout_com_payments'
	// static readonly PATH = 'checkout_com_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CheckoutComPayment>> {
		return this.resources.list<CheckoutComPayment>({ type: CheckoutComPayments.TYPE }, params, options)
	}

	async create(resource: CheckoutComPaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComPayment> {
		return this.resources.create({ ...resource, type: CheckoutComPayments.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComPayment> {
		return this.resources.retrieve<CheckoutComPayment>({ type: CheckoutComPayments.TYPE, id }, params, options)
	}

	async update(resource: CheckoutComPaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComPayment> {
		return this.resources.update({ ...resource, type: CheckoutComPayments.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: CheckoutComPayments.TYPE, id }, options)
	}

	async order(checkoutComPaymentId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		return this.resources.fetch<Order>({ type: 'orders' }, `checkout_com_payments/${checkoutComPaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(checkoutComPaymentId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `checkout_com_payments/${checkoutComPaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCheckoutComPayment(resource: any): resource is CheckoutComPayment {
		return resource.type && (resource.type === CheckoutComPayments.TYPE)
	}


	relationship(id: string | ResourceId | null): CheckoutComPaymentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: CheckoutComPayments.TYPE } : { id: id.id, type: CheckoutComPayments.TYPE }
	}


	type(): string {
		return CheckoutComPayments.TYPE
	}

}


export default CheckoutComPayments

export { CheckoutComPayment, CheckoutComPaymentCreate, CheckoutComPaymentUpdate }
