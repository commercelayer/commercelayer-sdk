import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Order } from './orders'
import { PaymentGateway } from './payment_gateways'
import { CustomerPaymentSource } from './customer_payment_sources'


type ExternalPaymentRel = ResourceRel & { type: typeof ExternalPayments.TYPE }
type OrderRel = ResourceRel & { type: 'orders' }


interface ExternalPayment extends Resource {
	
	payment_source_token?: string
	options?: object

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


class ExternalPayments extends ApiResource {

	static readonly TYPE: 'external_payments' = 'external_payments'
	// static readonly PATH = 'external_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ExternalPayment>> {
		return this.resources.list({ type: ExternalPayments.TYPE }, params, options)
	}

	async create(resource: ExternalPaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPayment> {
		return this.resources.create({ ...resource, type: ExternalPayments.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPayment> {
		return this.resources.retrieve<ExternalPayment>({ type: ExternalPayments.TYPE, id }, params, options)
	}

	async update(resource: ExternalPaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPayment> {
		return this.resources.update({ ...resource, type: ExternalPayments.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ExternalPayments.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isExternalPayment(resource: any): resource is ExternalPayment {
		return resource.type && (resource.type === ExternalPayments.TYPE)
	}


	relationship(id: string | ResourceId | null): ExternalPaymentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ExternalPayments.TYPE } : { id: id.id, type: ExternalPayments.TYPE }
	}


	type(): string {
		return ExternalPayments.TYPE
	}

}


export default ExternalPayments

export { ExternalPayment, ExternalPaymentCreate, ExternalPaymentUpdate }
