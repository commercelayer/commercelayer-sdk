import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'


type SatispayPaymentType = 'satispay_payments'
type SatispayPaymentRel = ResourceRel & { type: SatispayPaymentType }
type OrderRel = ResourceRel & { type: OrderType }


interface SatispayPayment extends Resource {
	
	readonly type: SatispayPaymentType

	token?: string
	key_id: string
	payment_id?: string
	redirect_url?: string

	order?: Order
	payment_gateway?: PaymentGateway

}


interface SatispayPaymentCreate extends ResourceCreate {
	
	token?: string
	redirect_url?: string

	order: OrderRel

}


interface SatispayPaymentUpdate extends ResourceUpdate {
	
	redirect_url?: string
	_refresh?: boolean

	order?: OrderRel

}


class SatispayPayments extends ApiResource<SatispayPayment> {

	static readonly TYPE: SatispayPaymentType = 'satispay_payments' as const

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SatispayPayment>> {
		return this.resources.list<SatispayPayment>({ type: SatispayPayments.TYPE }, params, options)
	}

	async create(resource: SatispayPaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SatispayPayment> {
		return this.resources.create<SatispayPaymentCreate, SatispayPayment>({ ...resource, type: SatispayPayments.TYPE }, params, options)
	}

	async update(resource: SatispayPaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SatispayPayment> {
		return this.resources.update<SatispayPaymentUpdate, SatispayPayment>({ ...resource, type: SatispayPayments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: SatispayPayments.TYPE } : id, options)
	}

	async order(satispayPaymentId: string | SatispayPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _satispayPaymentId = (satispayPaymentId as SatispayPayment).id || satispayPaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `satispay_payments/${_satispayPaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(satispayPaymentId: string | SatispayPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _satispayPaymentId = (satispayPaymentId as SatispayPayment).id || satispayPaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `satispay_payments/${_satispayPaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}


	isSatispayPayment(resource: any): resource is SatispayPayment {
		return resource.type && (resource.type === SatispayPayments.TYPE)
	}


	relationship(id: string | ResourceId | null): SatispayPaymentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: SatispayPayments.TYPE } : { id: id.id, type: SatispayPayments.TYPE }
	}


	type(): SatispayPaymentType {
		return SatispayPayments.TYPE
	}

}


export default SatispayPayments

export type { SatispayPayment, SatispayPaymentCreate, SatispayPaymentUpdate, SatispayPaymentType }
