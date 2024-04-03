import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'
import type { Version } from './versions'


type SatispayPaymentType = 'satispay_payments'
type SatispayPaymentRel = ResourceRel & { type: SatispayPaymentType }
type OrderRel = ResourceRel & { type: OrderType }


export type SatispayPaymentSort = Pick<SatispayPayment, 'id' | 'flow' | 'status'> & ResourceSort
// export type SatispayPaymentFilter = Pick<SatispayPayment, 'id' | 'flow' | 'status'> & ResourceFilter


interface SatispayPayment extends Resource {
	
	readonly type: SatispayPaymentType

	payment_id?: Nullable<string>
	flow?: Nullable<string>
	status?: Nullable<string>
	redirect_url?: Nullable<string>
	payment_url?: Nullable<string>
	intent_amount_cents: number
	intent_amount_float?: Nullable<number>
	formatted_intent_amount?: Nullable<string>
	payment_response?: Nullable<Record<string, any>>

	order?: Nullable<Order>
	payment_gateway?: Nullable<PaymentGateway>
	versions?: Nullable<Version[]>

}


interface SatispayPaymentCreate extends ResourceCreate {
	
	flow?: Nullable<string>
	redirect_url?: Nullable<string>

	order: OrderRel

}


interface SatispayPaymentUpdate extends ResourceUpdate {
	
	redirect_url?: Nullable<string>
	_refresh?: Nullable<boolean>

	order?: Nullable<OrderRel>

}


class SatispayPayments extends ApiResource<SatispayPayment> {

	static readonly TYPE: SatispayPaymentType = 'satispay_payments' as const

	async create(resource: SatispayPaymentCreate, params?: QueryParamsRetrieve<SatispayPayment>, options?: ResourcesConfig): Promise<SatispayPayment> {
		return this.resources.create<SatispayPaymentCreate, SatispayPayment>({ ...resource, type: SatispayPayments.TYPE }, params, options)
	}

	async update(resource: SatispayPaymentUpdate, params?: QueryParamsRetrieve<SatispayPayment>, options?: ResourcesConfig): Promise<SatispayPayment> {
		return this.resources.update<SatispayPaymentUpdate, SatispayPayment>({ ...resource, type: SatispayPayments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: SatispayPayments.TYPE } : id, options)
	}

	async order(satispayPaymentId: string | SatispayPayment, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _satispayPaymentId = (satispayPaymentId as SatispayPayment).id || satispayPaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `satispay_payments/${_satispayPaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(satispayPaymentId: string | SatispayPayment, params?: QueryParamsRetrieve<PaymentGateway>, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _satispayPaymentId = (satispayPaymentId as SatispayPayment).id || satispayPaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `satispay_payments/${_satispayPaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async versions(satispayPaymentId: string | SatispayPayment, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _satispayPaymentId = (satispayPaymentId as SatispayPayment).id || satispayPaymentId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `satispay_payments/${_satispayPaymentId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _refresh(id: string | SatispayPayment, params?: QueryParamsRetrieve<SatispayPayment>, options?: ResourcesConfig): Promise<SatispayPayment> {
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
