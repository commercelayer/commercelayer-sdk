import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Order } from './orders'
import type { PaymentGateway } from './payment_gateways'


type StripePaymentRel = ResourceRel & { type: typeof StripePayments.TYPE }
type OrderRel = ResourceRel & { type: 'orders' }


interface StripePayment extends Resource {
	
	client_secret?: string
	publishable_key?: string
	options?: object
	payment_method?: object
	mismatched_amounts?: boolean
	intent_amount_cents?: number
	intent_amount_float?: number
	formatted_intent_amount?: string

	order?: Order
	payment_gateway?: PaymentGateway

}


interface StripePaymentCreate extends ResourceCreate {
	
	options?: object

	order: OrderRel

}


interface StripePaymentUpdate extends ResourceUpdate {
	
	options?: object
	_refresh?: boolean

	order?: OrderRel

}


class StripePayments extends ApiResource {

	static readonly TYPE: 'stripe_payments' = 'stripe_payments'
	// static readonly PATH = 'stripe_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StripePayment>> {
		return this.resources.list<StripePayment>({ type: StripePayments.TYPE }, params, options)
	}

	async create(resource: StripePaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StripePayment> {
		return this.resources.create<StripePaymentCreate, StripePayment>({ ...resource, type: StripePayments.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StripePayment> {
		return this.resources.retrieve<StripePayment>({ type: StripePayments.TYPE, id }, params, options)
	}

	async update(resource: StripePaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StripePayment> {
		return this.resources.update<StripePaymentUpdate, StripePayment>({ ...resource, type: StripePayments.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: StripePayments.TYPE, id }, options)
	}

	async order(stripePaymentId: string | StripePayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _stripePaymentId = (stripePaymentId as StripePayment).id || stripePaymentId
		return this.resources.fetch<Order>({ type: 'orders' }, `stripe_payments/${_stripePaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(stripePaymentId: string | StripePayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _stripePaymentId = (stripePaymentId as StripePayment).id || stripePaymentId
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `stripe_payments/${_stripePaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isStripePayment(resource: any): resource is StripePayment {
		return resource.type && (resource.type === StripePayments.TYPE)
	}


	relationship(id: string | ResourceId | null): StripePaymentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: StripePayments.TYPE } : { id: id.id, type: StripePayments.TYPE }
	}


	type(): string {
		return StripePayments.TYPE
	}

}


export default StripePayments

export { StripePayment, StripePaymentCreate, StripePaymentUpdate }
