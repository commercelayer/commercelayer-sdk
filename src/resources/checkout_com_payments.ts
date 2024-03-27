import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType, OrderSortable } from './orders'
import type { PaymentGateway, PaymentGatewaySortable } from './payment_gateways'
import type { Version, VersionSortable } from './versions'


type CheckoutComPaymentType = 'checkout_com_payments'
type CheckoutComPaymentRel = ResourceRel & { type: CheckoutComPaymentType }
type OrderRel = ResourceRel & { type: OrderType }


export type CheckoutComPaymentSortable = Pick<CheckoutComPayment, 'id'> & ResourceSortable
export type CheckoutComPaymentFilterable = Pick<CheckoutComPayment, 'id'> & ResourceFilterable


interface CheckoutComPayment extends Resource {
	
	readonly type: CheckoutComPaymentType

	public_key?: string | null
	payment_type: string
	token: string
	session_id?: string | null
	success_url?: string | null
	failure_url?: string | null
	source_id?: string | null
	customer_token?: string | null
	redirect_uri?: string | null
	payment_response?: Record<string, any> | null
	mismatched_amounts?: boolean | null
	payment_instrument?: Record<string, any> | null

	order?: Order | null
	payment_gateway?: PaymentGateway | null
	versions?: Version[] | null

}


interface CheckoutComPaymentCreate extends ResourceCreate {
	
	payment_type: string
	token: string
	session_id?: string | null
	success_url?: string | null
	failure_url?: string | null

	order: OrderRel

}


interface CheckoutComPaymentUpdate extends ResourceUpdate {
	
	payment_type?: string | null
	token?: string | null
	session_id?: string | null
	success_url?: string | null
	failure_url?: string | null
	_details?: boolean | null
	_refresh?: boolean | null

	order?: OrderRel | null

}


class CheckoutComPayments extends ApiResource<CheckoutComPayment, CheckoutComPaymentSortable> {

	static readonly TYPE: CheckoutComPaymentType = 'checkout_com_payments' as const

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
		return this.resources.fetch<Order, OrderSortable>({ type: 'orders' }, `checkout_com_payments/${_checkoutComPaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(checkoutComPaymentId: string | CheckoutComPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _checkoutComPaymentId = (checkoutComPaymentId as CheckoutComPayment).id || checkoutComPaymentId as string
		return this.resources.fetch<PaymentGateway, PaymentGatewaySortable>({ type: 'payment_gateways' }, `checkout_com_payments/${_checkoutComPaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async versions(checkoutComPaymentId: string | CheckoutComPayment, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _checkoutComPaymentId = (checkoutComPaymentId as CheckoutComPayment).id || checkoutComPaymentId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `checkout_com_payments/${_checkoutComPaymentId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _details(id: string | CheckoutComPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComPayment> {
		return this.resources.update<CheckoutComPaymentUpdate, CheckoutComPayment>({ id: (typeof id === 'string')? id: id.id, type: CheckoutComPayments.TYPE, _details: true }, params, options)
	}

	async _refresh(id: string | CheckoutComPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComPayment> {
		return this.resources.update<CheckoutComPaymentUpdate, CheckoutComPayment>({ id: (typeof id === 'string')? id: id.id, type: CheckoutComPayments.TYPE, _refresh: true }, params, options)
	}


	isCheckoutComPayment(resource: any): resource is CheckoutComPayment {
		return resource.type && (resource.type === CheckoutComPayments.TYPE)
	}


	relationship(id: string | ResourceId | null): CheckoutComPaymentRel {
		return super.relationshipOneToOne<CheckoutComPaymentRel>(id)
	}

	relationshipToMany(...ids: string[]): CheckoutComPaymentRel[] {
		return super.relationshipOneToMany<CheckoutComPaymentRel>(...ids)
	}


	type(): CheckoutComPaymentType {
		return CheckoutComPayments.TYPE
	}

}


export default CheckoutComPayments

export type { CheckoutComPayment, CheckoutComPaymentCreate, CheckoutComPaymentUpdate, CheckoutComPaymentType }

/*
export const CheckoutComPaymentsClient = (init: ResourceAdapter | ResourcesInitConfig): CheckoutComPayments => {
	return new CheckoutComPayments((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
