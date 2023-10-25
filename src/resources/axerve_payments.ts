import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Order } from './orders'
import type { PaymentGateway } from './payment_gateways'
import type { Version } from './versions'


type AxervePaymentRel = ResourceRel & { type: typeof AxervePayments.TYPE }
type OrderRel = ResourceRel & { type: 'orders' }


interface AxervePayment extends Resource {
	
	login?: string
	return_url?: string
	payment_request_data?: object
	client_ip?: string
	buyer_details?: object
	mismatched_amounts?: boolean
	intent_amount_cents?: number
	intent_amount_float?: number
	formatted_intent_amount?: string
	payment_instrument?: object

	order?: Order
	payment_gateway?: PaymentGateway
	versions?: Version[]

}


interface AxervePaymentCreate extends ResourceCreate {
	
	return_url: string
	client_ip?: string
	buyer_details?: object

	order: OrderRel

}


interface AxervePaymentUpdate extends ResourceUpdate {
	
	payment_request_data?: object
	_update?: boolean

	order?: OrderRel

}


class AxervePayments extends ApiResource {

	static readonly TYPE: 'axerve_payments' = 'axerve_payments' as const
	// static readonly PATH = 'axerve_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<AxervePayment>> {
		return this.resources.list<AxervePayment>({ type: AxervePayments.TYPE }, params, options)
	}

	async create(resource: AxervePaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AxervePayment> {
		return this.resources.create<AxervePaymentCreate, AxervePayment>({ ...resource, type: AxervePayments.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AxervePayment> {
		return this.resources.retrieve<AxervePayment>({ type: AxervePayments.TYPE, id }, params, options)
	}

	async update(resource: AxervePaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AxervePayment> {
		return this.resources.update<AxervePaymentUpdate, AxervePayment>({ ...resource, type: AxervePayments.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: AxervePayments.TYPE, id }, options)
	}

	async order(axervePaymentId: string | AxervePayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _axervePaymentId = (axervePaymentId as AxervePayment).id || axervePaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `axerve_payments/${_axervePaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(axervePaymentId: string | AxervePayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _axervePaymentId = (axervePaymentId as AxervePayment).id || axervePaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `axerve_payments/${_axervePaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async versions(axervePaymentId: string | AxervePayment, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _axervePaymentId = (axervePaymentId as AxervePayment).id || axervePaymentId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `axerve_payments/${_axervePaymentId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isAxervePayment(resource: any): resource is AxervePayment {
		return resource.type && (resource.type === AxervePayments.TYPE)
	}


	relationship(id: string | ResourceId | null): AxervePaymentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: AxervePayments.TYPE } : { id: id.id, type: AxervePayments.TYPE }
	}


	type(): string {
		return AxervePayments.TYPE
	}

}


export default AxervePayments

export { AxervePayment, AxervePaymentCreate, AxervePaymentUpdate }
