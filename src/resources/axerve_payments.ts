import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, /* ResourceFilterable */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'
import type { Version } from './versions'


type AxervePaymentType = 'axerve_payments'
type AxervePaymentRel = ResourceRel & { type: AxervePaymentType }
type OrderRel = ResourceRel & { type: OrderType }


export type AxervePaymentSortable = Pick<AxervePayment, 'id'> & ResourceSortable
// export type AxervePaymentFilterable = Pick<AxervePayment, 'id'> & ResourceFilterable


interface AxervePayment extends Resource {
	
	readonly type: AxervePaymentType

	login: string
	return_url: string
	payment_request_data?: Record<string, any> | null
	client_ip?: string | null
	buyer_details?: Record<string, any> | null
	request_token?: boolean | null
	mismatched_amounts?: boolean | null
	intent_amount_cents: number
	intent_amount_float?: number | null
	formatted_intent_amount?: string | null
	payment_instrument?: Record<string, any> | null

	order?: Order | null
	payment_gateway?: PaymentGateway | null
	versions?: Version[] | null

}


interface AxervePaymentCreate extends ResourceCreate {
	
	return_url: string
	client_ip?: string | null
	buyer_details?: Record<string, any> | null
	request_token?: boolean | null

	order: OrderRel

}


interface AxervePaymentUpdate extends ResourceUpdate {
	
	payment_request_data?: Record<string, any> | null
	_update?: boolean | null

	order?: OrderRel | null

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

/*
export const AxervePaymentsClient = (init: ResourceAdapter | ResourcesInitConfig): AxervePayments => {
	return new AxervePayments((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
