import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType, OrderSortable } from './orders'
import type { PaymentGateway, PaymentGatewaySortable } from './payment_gateways'
import type { Version, VersionSortable } from './versions'


type SatispayPaymentType = 'satispay_payments'
type SatispayPaymentRel = ResourceRel & { type: SatispayPaymentType }
type OrderRel = ResourceRel & { type: OrderType }


export type SatispayPaymentSortable = Pick<SatispayPayment, 'id' | 'flow' | 'status'> & ResourceSortable
export type SatispayPaymentFilterable = Pick<SatispayPayment, 'id' | 'flow' | 'status'> & ResourceFilterable


interface SatispayPayment extends Resource {
	
	readonly type: SatispayPaymentType

	payment_id?: string | null
	flow?: string | null
	status?: string | null
	redirect_url?: string | null
	payment_url?: string | null
	intent_amount_cents: number
	intent_amount_float?: number | null
	formatted_intent_amount?: string | null
	payment_response?: Record<string, any> | null

	order?: Order | null
	payment_gateway?: PaymentGateway | null
	versions?: Version[] | null

}


interface SatispayPaymentCreate extends ResourceCreate {
	
	flow?: string | null
	redirect_url?: string | null

	order: OrderRel

}


interface SatispayPaymentUpdate extends ResourceUpdate {
	
	redirect_url?: string | null
	_refresh?: boolean | null

	order?: OrderRel | null

}


class SatispayPayments extends ApiResource<SatispayPayment, SatispayPaymentSortable> {

	static readonly TYPE: SatispayPaymentType = 'satispay_payments' as const

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
		return this.resources.fetch<Order, OrderSortable>({ type: 'orders' }, `satispay_payments/${_satispayPaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(satispayPaymentId: string | SatispayPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _satispayPaymentId = (satispayPaymentId as SatispayPayment).id || satispayPaymentId as string
		return this.resources.fetch<PaymentGateway, PaymentGatewaySortable>({ type: 'payment_gateways' }, `satispay_payments/${_satispayPaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async versions(satispayPaymentId: string | SatispayPayment, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _satispayPaymentId = (satispayPaymentId as SatispayPayment).id || satispayPaymentId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `satispay_payments/${_satispayPaymentId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _refresh(id: string | SatispayPayment, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SatispayPayment> {
		return this.resources.update<SatispayPaymentUpdate, SatispayPayment>({ id: (typeof id === 'string')? id: id.id, type: SatispayPayments.TYPE, _refresh: true }, params, options)
	}


	isSatispayPayment(resource: any): resource is SatispayPayment {
		return resource.type && (resource.type === SatispayPayments.TYPE)
	}


	relationship(id: string | ResourceId | null): SatispayPaymentRel {
		return super.relationshipOneToOne<SatispayPaymentRel>(id)
	}

	relationshipToMany(...ids: string[]): SatispayPaymentRel[] {
		return super.relationshipOneToMany<SatispayPaymentRel>(...ids)
	}


	type(): SatispayPaymentType {
		return SatispayPayments.TYPE
	}

}


export default SatispayPayments

export type { SatispayPayment, SatispayPaymentCreate, SatispayPaymentUpdate, SatispayPaymentType }

/*
export const SatispayPaymentsClient = (init: ResourceAdapter | ResourcesInitConfig): SatispayPayments => {
	return new SatispayPayments((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
