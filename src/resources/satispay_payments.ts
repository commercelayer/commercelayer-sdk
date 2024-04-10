import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Order } from './orders'
import type { PaymentGateway } from './payment_gateways'
import type { Version } from './versions'


type SatispayPaymentRel = ResourceRel & { type: typeof SatispayPayments.TYPE }
type OrderRel = ResourceRel & { type: 'orders' }


interface SatispayPayment extends Resource {
	
	payment_id?: string
	flow?: string
	status?: string
	redirect_url?: string
	payment_url?: string
	payment_response?: object

	order?: Order
	payment_gateway?: PaymentGateway
	versions?: Version[]

}


interface SatispayPaymentCreate extends ResourceCreate {
	
	flow?: string
	redirect_url?: string

	order: OrderRel

}


interface SatispayPaymentUpdate extends ResourceUpdate {
	
	redirect_url?: string
	_refresh?: boolean

	order?: OrderRel

}


class SatispayPayments extends ApiResource {

	static readonly TYPE: 'satispay_payments' = 'satispay_payments' as const
	// static readonly PATH = 'satispay_payments'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SatispayPayment>> {
		return this.resources.list<SatispayPayment>({ type: SatispayPayments.TYPE }, params, options)
	}

	async create(resource: SatispayPaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SatispayPayment> {
		return this.resources.create<SatispayPaymentCreate, SatispayPayment>({ ...resource, type: SatispayPayments.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SatispayPayment> {
		return this.resources.retrieve<SatispayPayment>({ type: SatispayPayments.TYPE, id }, params, options)
	}

	async update(resource: SatispayPaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SatispayPayment> {
		return this.resources.update<SatispayPaymentUpdate, SatispayPayment>({ ...resource, type: SatispayPayments.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: SatispayPayments.TYPE, id }, options)
	}

	async order(satispayPaymentId: string | SatispayPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _satispayPaymentId = (satispayPaymentId as SatispayPayment).id || satispayPaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `satispay_payments/${_satispayPaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(satispayPaymentId: string | SatispayPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _satispayPaymentId = (satispayPaymentId as SatispayPayment).id || satispayPaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `satispay_payments/${_satispayPaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async versions(satispayPaymentId: string | SatispayPayment, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _satispayPaymentId = (satispayPaymentId as SatispayPayment).id || satispayPaymentId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `satispay_payments/${_satispayPaymentId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isSatispayPayment(resource: any): resource is SatispayPayment {
		return resource.type && (resource.type === SatispayPayments.TYPE)
	}


	relationship(id: string | ResourceId | null): SatispayPaymentRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: SatispayPayments.TYPE } : { id: id.id, type: SatispayPayments.TYPE }
	}


	type(): string {
		return SatispayPayments.TYPE
	}

}


export default SatispayPayments

export { SatispayPayment, SatispayPaymentCreate, SatispayPaymentUpdate }
