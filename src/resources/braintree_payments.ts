import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType, OrderSortable } from './orders'
import type { PaymentGateway, PaymentGatewaySortable } from './payment_gateways'
import type { Version, VersionSortable } from './versions'


type BraintreePaymentType = 'braintree_payments'
type BraintreePaymentRel = ResourceRel & { type: BraintreePaymentType }
type OrderRel = ResourceRel & { type: OrderType }


export type BraintreePaymentSortable = Pick<BraintreePayment, 'id'> & ResourceSortable
export type BraintreePaymentFilterable = Pick<BraintreePayment, 'id'> & ResourceFilterable


interface BraintreePayment extends Resource {
	
	readonly type: BraintreePaymentType

	client_token: string
	payment_method_nonce?: string | null
	payment_id?: string | null
	local?: boolean | null
	options?: Record<string, any> | null
	payment_instrument?: Record<string, any> | null

	order?: Order | null
	payment_gateway?: PaymentGateway | null
	versions?: Version[] | null

}


interface BraintreePaymentCreate extends ResourceCreate {
	
	payment_id?: string | null
	local?: boolean | null
	options?: Record<string, any> | null

	order: OrderRel

}


interface BraintreePaymentUpdate extends ResourceUpdate {
	
	payment_method_nonce?: string | null
	payment_id?: string | null
	local?: boolean | null
	options?: Record<string, any> | null

	order?: OrderRel | null

}


class BraintreePayments extends ApiResource<BraintreePayment, BraintreePaymentSortable> {

	static readonly TYPE: BraintreePaymentType = 'braintree_payments' as const

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
		return this.resources.fetch<Order, OrderSortable>({ type: 'orders' }, `braintree_payments/${_braintreePaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(braintreePaymentId: string | BraintreePayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _braintreePaymentId = (braintreePaymentId as BraintreePayment).id || braintreePaymentId as string
		return this.resources.fetch<PaymentGateway, PaymentGatewaySortable>({ type: 'payment_gateways' }, `braintree_payments/${_braintreePaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async versions(braintreePaymentId: string | BraintreePayment, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _braintreePaymentId = (braintreePaymentId as BraintreePayment).id || braintreePaymentId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `braintree_payments/${_braintreePaymentId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isBraintreePayment(resource: any): resource is BraintreePayment {
		return resource.type && (resource.type === BraintreePayments.TYPE)
	}


	relationship(id: string | ResourceId | null): BraintreePaymentRel {
		return super.relationshipOneToOne<BraintreePaymentRel>(id)
	}

	relationshipToMany(...ids: string[]): BraintreePaymentRel[] {
		return super.relationshipOneToMany<BraintreePaymentRel>(...ids)
	}


	type(): BraintreePaymentType {
		return BraintreePayments.TYPE
	}

}


export default BraintreePayments

export type { BraintreePayment, BraintreePaymentCreate, BraintreePaymentUpdate, BraintreePaymentType }

/*
export const BraintreePaymentsClient = (init: ResourceAdapter | ResourcesInitConfig): BraintreePayments => {
	return new BraintreePayments((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
