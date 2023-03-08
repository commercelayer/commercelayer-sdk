import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'
import type { CustomerPaymentSource } from './customer_payment_sources'


type ExternalPaymentType = 'external_payments'
type ExternalPaymentRel = ResourceRel & { type: ExternalPaymentType }
type OrderRel = ResourceRel & { type: OrderType }


interface ExternalPayment extends Resource {
	
	readonly type: ExternalPaymentType

	payment_source_token?: string
	options?: object
	payment_instrument?: object

	order?: Order
	payment_gateway?: PaymentGateway
	wallet?: CustomerPaymentSource

}


interface ExternalPaymentCreate extends ResourceCreate {
	
	payment_source_token: string
	options?: object

	order: OrderRel

}


interface ExternalPaymentUpdate extends ResourceUpdate {
	
	options?: object

	order?: OrderRel

}


class ExternalPayments extends ApiResource<ExternalPayment> {

	static readonly TYPE: ExternalPaymentType = 'external_payments' as const
	// static readonly PATH = 'external_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ExternalPayment>> {
		return this.resources.list<ExternalPayment>({ type: ExternalPayments.TYPE }, params, options)
	}

	async create(resource: ExternalPaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPayment> {
		return this.resources.create<ExternalPaymentCreate, ExternalPayment>({ ...resource, type: ExternalPayments.TYPE }, params, options)
	}

	async update(resource: ExternalPaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPayment> {
		return this.resources.update<ExternalPaymentUpdate, ExternalPayment>({ ...resource, type: ExternalPayments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ExternalPayments.TYPE } : id, options)
	}

	async order(externalPaymentId: string | ExternalPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _externalPaymentId = (externalPaymentId as ExternalPayment).id || externalPaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `external_payments/${_externalPaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(externalPaymentId: string | ExternalPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _externalPaymentId = (externalPaymentId as ExternalPayment).id || externalPaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `external_payments/${_externalPaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async wallet(externalPaymentId: string | ExternalPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPaymentSource> {
		const _externalPaymentId = (externalPaymentId as ExternalPayment).id || externalPaymentId as string
		return this.resources.fetch<CustomerPaymentSource>({ type: 'customer_payment_sources' }, `external_payments/${_externalPaymentId}/wallet`, params, options) as unknown as CustomerPaymentSource
	}


	isExternalPayment(resource: any): resource is ExternalPayment {
		return resource.type && (resource.type === ExternalPayments.TYPE)
	}


	relationship(id: string | ResourceId | null): ExternalPaymentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ExternalPayments.TYPE } : { id: id.id, type: ExternalPayments.TYPE }
	}


	type(): ExternalPaymentType {
		return ExternalPayments.TYPE
	}

}


export default ExternalPayments

export type { ExternalPayment, ExternalPaymentCreate, ExternalPaymentUpdate, ExternalPaymentType }
