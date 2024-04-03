import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'
import type { Version } from './versions'


type AxervePaymentType = 'axerve_payments'
type AxervePaymentRel = ResourceRel & { type: AxervePaymentType }
type OrderRel = ResourceRel & { type: OrderType }


export type AxervePaymentSort = Pick<AxervePayment, 'id'> & ResourceSort
// export type AxervePaymentFilter = Pick<AxervePayment, 'id'> & ResourceFilter


interface AxervePayment extends Resource {
	
	readonly type: AxervePaymentType

	login: string
	return_url: string
	payment_request_data?: Nullable<Record<string, any>>
	client_ip?: Nullable<string>
	buyer_details?: Nullable<Record<string, any>>
	request_token?: Nullable<boolean>
	mismatched_amounts?: Nullable<boolean>
	intent_amount_cents: number
	intent_amount_float?: Nullable<number>
	formatted_intent_amount?: Nullable<string>
	payment_instrument?: Nullable<Record<string, any>>

	order?: Nullable<Order>
	payment_gateway?: Nullable<PaymentGateway>
	versions?: Nullable<Version[]>

}


interface AxervePaymentCreate extends ResourceCreate {
	
	return_url: string
	client_ip?: Nullable<string>
	buyer_details?: Nullable<Record<string, any>>
	request_token?: Nullable<boolean>

	order: OrderRel

}


interface AxervePaymentUpdate extends ResourceUpdate {
	
	payment_request_data?: Nullable<Record<string, any>>
	_update?: Nullable<boolean>

	order?: Nullable<OrderRel>

}


class AxervePayments extends ApiResource<AxervePayment> {

	static readonly TYPE: AxervePaymentType = 'axerve_payments' as const

	async create(resource: AxervePaymentCreate, params?: QueryParamsRetrieve<AxervePayment>, options?: ResourcesConfig): Promise<AxervePayment> {
		return this.resources.create<AxervePaymentCreate, AxervePayment>({ ...resource, type: AxervePayments.TYPE }, params, options)
	}

	async update(resource: AxervePaymentUpdate, params?: QueryParamsRetrieve<AxervePayment>, options?: ResourcesConfig): Promise<AxervePayment> {
		return this.resources.update<AxervePaymentUpdate, AxervePayment>({ ...resource, type: AxervePayments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: AxervePayments.TYPE } : id, options)
	}

	async order(axervePaymentId: string | AxervePayment, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _axervePaymentId = (axervePaymentId as AxervePayment).id || axervePaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `axerve_payments/${_axervePaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(axervePaymentId: string | AxervePayment, params?: QueryParamsRetrieve<PaymentGateway>, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _axervePaymentId = (axervePaymentId as AxervePayment).id || axervePaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `axerve_payments/${_axervePaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async versions(axervePaymentId: string | AxervePayment, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _axervePaymentId = (axervePaymentId as AxervePayment).id || axervePaymentId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `axerve_payments/${_axervePaymentId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _update(id: string | AxervePayment, params?: QueryParamsRetrieve<AxervePayment>, options?: ResourcesConfig): Promise<AxervePayment> {
		return this.resources.update<AxervePaymentUpdate, AxervePayment>({ id: (typeof id === 'string')? id: id.id, type: AxervePayments.TYPE, _update: true }, params, options)
	}


	isAxervePayment(resource: any): resource is AxervePayment {
		return resource.type && (resource.type === AxervePayments.TYPE)
	}


	relationship(id: string | ResourceId | null): AxervePaymentRel {
		return super.relationshipOneToOne<AxervePaymentRel>(id)
	}

	relationshipToMany(...ids: string[]): AxervePaymentRel[] {
		return super.relationshipOneToMany<AxervePaymentRel>(...ids)
	}


	type(): AxervePaymentType {
		return AxervePayments.TYPE
	}

}


export default AxervePayments

export type { AxervePayment, AxervePaymentCreate, AxervePaymentUpdate, AxervePaymentType }
