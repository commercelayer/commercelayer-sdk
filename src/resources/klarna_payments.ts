import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Order } from './orders'
import { PaymentGateway } from './payment_gateways'


type KlarnaPaymentRel = ResourceId & { type: typeof KlarnaPayments.TYPE }
type OrderRel = ResourceId & { type: 'orders' }


interface KlarnaPayment extends Resource {
	
	session_id?: string
	client_token?: string
	payment_methods?: object[]
	auth_token?: string

	order?: Order
	payment_gateway?: PaymentGateway

}


interface KlarnaPaymentCreate extends ResourceCreate {
	
	order: OrderRel

}


interface KlarnaPaymentUpdate extends ResourceUpdate {
	
	auth_token?: string
	_update?: boolean

	order?: OrderRel

}


class KlarnaPayments extends ApiResource {

	static readonly TYPE: 'klarna_payments' = 'klarna_payments'
	// static readonly PATH = 'klarna_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<KlarnaPayment>> {
		return this.resources.list({ type: KlarnaPayments.TYPE }, params, options)
	}

	async create(resource: KlarnaPaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<KlarnaPayment> {
		return this.resources.create({ ...resource, type: KlarnaPayments.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<KlarnaPayment> {
		return this.resources.retrieve<KlarnaPayment>({ type: KlarnaPayments.TYPE, id }, params, options)
	}

	async update(resource: KlarnaPaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<KlarnaPayment> {
		return this.resources.update({ ...resource, type: KlarnaPayments.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: KlarnaPayments.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isKlarnaPayment(resource: any): resource is KlarnaPayment {
		return resource.type && (resource.type === KlarnaPayments.TYPE)
	}


	relationship(id: string | ResourceId): KlarnaPaymentRel {
		return (typeof id === 'string') ? { id, type: KlarnaPayments.TYPE } : { id: id.id, type: KlarnaPayments.TYPE }
	}


	type(): string {
		return KlarnaPayments.TYPE
	}

}


export default KlarnaPayments

export { KlarnaPayment, KlarnaPaymentCreate, KlarnaPaymentUpdate }
