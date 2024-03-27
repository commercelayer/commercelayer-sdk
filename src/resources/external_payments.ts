import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType, OrderSortable } from './orders'
import type { PaymentGateway, PaymentGatewaySortable } from './payment_gateways'
import type { CustomerPaymentSource, CustomerPaymentSourceSortable } from './customer_payment_sources'
import type { Version, VersionSortable } from './versions'


type ExternalPaymentType = 'external_payments'
type ExternalPaymentRel = ResourceRel & { type: ExternalPaymentType }
type OrderRel = ResourceRel & { type: OrderType }


export type ExternalPaymentSortable = Pick<ExternalPayment, 'id'> & ResourceSortable
export type ExternalPaymentFilterable = Pick<ExternalPayment, 'id' | 'payment_source_token'> & ResourceFilterable


interface ExternalPayment extends Resource {
	
	readonly type: ExternalPaymentType

	payment_source_token: string
	options?: Record<string, any> | null
	payment_instrument?: Record<string, any> | null

	order?: Order | null
	payment_gateway?: PaymentGateway | null
	wallet?: CustomerPaymentSource | null
	versions?: Version[] | null

}


interface ExternalPaymentCreate extends ResourceCreate {
	
	payment_source_token: string
	options?: Record<string, any> | null

	order: OrderRel

}


interface ExternalPaymentUpdate extends ResourceUpdate {
	
	options?: Record<string, any> | null

	order?: OrderRel | null

}


class ExternalPayments extends ApiResource<ExternalPayment, ExternalPaymentSortable> {

	static readonly TYPE: ExternalPaymentType = 'external_payments' as const

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
		return this.resources.fetch<Order, OrderSortable>({ type: 'orders' }, `external_payments/${_externalPaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(externalPaymentId: string | ExternalPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _externalPaymentId = (externalPaymentId as ExternalPayment).id || externalPaymentId as string
		return this.resources.fetch<PaymentGateway, PaymentGatewaySortable>({ type: 'payment_gateways' }, `external_payments/${_externalPaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async wallet(externalPaymentId: string | ExternalPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPaymentSource> {
		const _externalPaymentId = (externalPaymentId as ExternalPayment).id || externalPaymentId as string
		return this.resources.fetch<CustomerPaymentSource, CustomerPaymentSourceSortable>({ type: 'customer_payment_sources' }, `external_payments/${_externalPaymentId}/wallet`, params, options) as unknown as CustomerPaymentSource
	}

	async versions(externalPaymentId: string | ExternalPayment, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _externalPaymentId = (externalPaymentId as ExternalPayment).id || externalPaymentId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `external_payments/${_externalPaymentId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isExternalPayment(resource: any): resource is ExternalPayment {
		return resource.type && (resource.type === ExternalPayments.TYPE)
	}


	relationship(id: string | ResourceId | null): ExternalPaymentRel {
		return super.relationshipOneToOne<ExternalPaymentRel>(id)
	}

	relationshipToMany(...ids: string[]): ExternalPaymentRel[] {
		return super.relationshipOneToMany<ExternalPaymentRel>(...ids)
	}


	type(): ExternalPaymentType {
		return ExternalPayments.TYPE
	}

}


export default ExternalPayments

export type { ExternalPayment, ExternalPaymentCreate, ExternalPaymentUpdate, ExternalPaymentType }

/*
export const ExternalPaymentsClient = (init: ResourceAdapter | ResourcesInitConfig): ExternalPayments => {
	return new ExternalPayments((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
