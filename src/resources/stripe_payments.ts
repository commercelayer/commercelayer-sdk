import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'
import type { Version } from './versions'


type StripePaymentType = 'stripe_payments'
type StripePaymentRel = ResourceRel & { type: StripePaymentType }
type OrderRel = ResourceRel & { type: OrderType }


interface StripePayment extends Resource {
	
	readonly type: StripePaymentType

	stripe_id?: string | null
	client_secret?: string | null
	charge_id?: string | null
	publishable_key?: string | null
	options?: Record<string, any> | null
	payment_method?: Record<string, any> | null
	mismatched_amounts?: boolean | null
	return_url?: string | null
	receipt_email?: string | null
	payment_instrument?: Record<string, any> | null

	order?: Order | null
	payment_gateway?: PaymentGateway | null
	versions?: Version[] | null

}


interface StripePaymentCreate extends ResourceCreate {
	
	stripe_id?: string | null
	client_secret?: string | null
	options?: Record<string, any> | null
	return_url?: string | null
	receipt_email?: string | null

	order: OrderRel

}


interface StripePaymentUpdate extends ResourceUpdate {
	
	options?: Record<string, any> | null
	return_url?: string | null
	_update?: boolean | null
	_refresh?: boolean | null

	order?: OrderRel | null

}


class StripePayments extends ApiResource<StripePayment> {

	static readonly TYPE: StripePaymentType = 'stripe_payments' as const

	async create(resource: StripePaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StripePayment> {
		return this.resources.create<StripePaymentCreate, StripePayment>({ ...resource, type: StripePayments.TYPE }, params, options)
	}

	async update(resource: StripePaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StripePayment> {
		return this.resources.update<StripePaymentUpdate, StripePayment>({ ...resource, type: StripePayments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: StripePayments.TYPE } : id, options)
	}

	async order(stripePaymentId: string | StripePayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _stripePaymentId = (stripePaymentId as StripePayment).id || stripePaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `stripe_payments/${_stripePaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(stripePaymentId: string | StripePayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _stripePaymentId = (stripePaymentId as StripePayment).id || stripePaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `stripe_payments/${_stripePaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async versions(stripePaymentId: string | StripePayment, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _stripePaymentId = (stripePaymentId as StripePayment).id || stripePaymentId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `stripe_payments/${_stripePaymentId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _update(id: string | StripePayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StripePayment> {
		return this.resources.update<StripePaymentUpdate, StripePayment>({ id: (typeof id === 'string')? id: id.id, type: StripePayments.TYPE, _update: true }, params, options)
	}

	async _refresh(id: string | StripePayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StripePayment> {
		return this.resources.update<StripePaymentUpdate, StripePayment>({ id: (typeof id === 'string')? id: id.id, type: StripePayments.TYPE, _refresh: true }, params, options)
	}


	isStripePayment(resource: any): resource is StripePayment {
		return resource.type && (resource.type === StripePayments.TYPE)
	}


	relationship(id: string | ResourceId | null): StripePaymentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: StripePayments.TYPE } : { id: id.id, type: StripePayments.TYPE }
	}


	type(): StripePaymentType {
		return StripePayments.TYPE
	}

}


export default StripePayments

export type { StripePayment, StripePaymentCreate, StripePaymentUpdate, StripePaymentType }
