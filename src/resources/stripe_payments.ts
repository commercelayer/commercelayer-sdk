import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'
import type { Version } from './versions'


type StripePaymentType = 'stripe_payments'
type StripePaymentRel = ResourceRel & { type: StripePaymentType }
type OrderRel = ResourceRel & { type: OrderType }


export type StripePaymentSort = Pick<StripePayment, 'id'> & ResourceSort
// export type StripePaymentFilter = Pick<StripePayment, 'id'> & ResourceFilter


interface StripePayment extends Resource {
	
	readonly type: StripePaymentType

	stripe_id?: Nullable<string>
	client_secret?: Nullable<string>
	publishable_key?: Nullable<string>
	options?: Nullable<Record<string, any>>
	payment_method?: Nullable<Record<string, any>>
	mismatched_amounts?: Nullable<boolean>
	intent_amount_cents: number
	intent_amount_float?: Nullable<number>
	formatted_intent_amount?: Nullable<string>
	return_url?: Nullable<string>
	receipt_email?: Nullable<string>
	payment_instrument?: Nullable<Record<string, any>>

	order?: Nullable<Order>
	payment_gateway?: Nullable<PaymentGateway>
	versions?: Nullable<Version[]>

}


interface StripePaymentCreate extends ResourceCreate {
	
	stripe_id?: Nullable<string>
	client_secret?: Nullable<string>
	options?: Nullable<Record<string, any>>
	return_url?: Nullable<string>
	receipt_email?: Nullable<string>

	order: OrderRel

}


interface StripePaymentUpdate extends ResourceUpdate {
	
	options?: Nullable<Record<string, any>>
	return_url?: Nullable<string>
	_update?: Nullable<boolean>
	_refresh?: Nullable<boolean>

	order?: Nullable<OrderRel>

}


class StripePayments extends ApiResource<StripePayment> {

	static readonly TYPE: StripePaymentType = 'stripe_payments' as const

	async create(resource: StripePaymentCreate, params?: QueryParamsRetrieve<StripePayment>, options?: ResourcesConfig): Promise<StripePayment> {
		return this.resources.create<StripePaymentCreate, StripePayment>({ ...resource, type: StripePayments.TYPE }, params, options)
	}

	async update(resource: StripePaymentUpdate, params?: QueryParamsRetrieve<StripePayment>, options?: ResourcesConfig): Promise<StripePayment> {
		return this.resources.update<StripePaymentUpdate, StripePayment>({ ...resource, type: StripePayments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: StripePayments.TYPE } : id, options)
	}

	async order(stripePaymentId: string | StripePayment, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _stripePaymentId = (stripePaymentId as StripePayment).id || stripePaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `stripe_payments/${_stripePaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(stripePaymentId: string | StripePayment, params?: QueryParamsRetrieve<PaymentGateway>, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _stripePaymentId = (stripePaymentId as StripePayment).id || stripePaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `stripe_payments/${_stripePaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async versions(stripePaymentId: string | StripePayment, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _stripePaymentId = (stripePaymentId as StripePayment).id || stripePaymentId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `stripe_payments/${_stripePaymentId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _update(id: string | StripePayment, params?: QueryParamsRetrieve<StripePayment>, options?: ResourcesConfig): Promise<StripePayment> {
		return this.resources.update<StripePaymentUpdate, StripePayment>({ id: (typeof id === 'string')? id: id.id, type: StripePayments.TYPE, _update: true }, params, options)
	}

	async _refresh(id: string | StripePayment, params?: QueryParamsRetrieve<StripePayment>, options?: ResourcesConfig): Promise<StripePayment> {
		return this.resources.update<StripePaymentUpdate, StripePayment>({ id: (typeof id === 'string')? id: id.id, type: StripePayments.TYPE, _refresh: true }, params, options)
	}


	isStripePayment(resource: any): resource is StripePayment {
		return resource.type && (resource.type === StripePayments.TYPE)
	}


	relationship(id: string | ResourceId | null): StripePaymentRel {
		return super.relationshipOneToOne<StripePaymentRel>(id)
	}

	relationshipToMany(...ids: string[]): StripePaymentRel[] {
		return super.relationshipOneToMany<StripePaymentRel>(...ids)
	}


	type(): StripePaymentType {
		return StripePayments.TYPE
	}

}


export default StripePayments

export type { StripePayment, StripePaymentCreate, StripePaymentUpdate, StripePaymentType }
