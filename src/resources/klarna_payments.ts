import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'
import type { Version } from './versions'


type KlarnaPaymentType = 'klarna_payments'
type KlarnaPaymentRel = ResourceRel & { type: KlarnaPaymentType }
type OrderRel = ResourceRel & { type: OrderType }


export type KlarnaPaymentSort = Pick<KlarnaPayment, 'id'> & ResourceSort
// export type KlarnaPaymentFilter = Pick<KlarnaPayment, 'id' | 'mismatched_amounts'> & ResourceFilter


interface KlarnaPayment extends Resource {
	
	readonly type: KlarnaPaymentType

	/** 
	 * The identifier of the payment session.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	session_id?: string | null
	/** 
	 * The public token linked to your API credential. Available upon session creation.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	client_token?: string | null
	/** 
	 * The merchant available payment methods for the assoiated order. Available upon session creation.
	 * @example ```"[object Object]"```
	 */
	payment_methods: Array<Record<string, any>>
	/** 
	 * The token returned by a successful client authorization, mandatory to place the order.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	auth_token?: string | null
	/** 
	 * Indicates if the order current amount differs form the one of the created payment intent.
	 */
	mismatched_amounts?: boolean | null
	/** 
	 * Information about the payment instrument used in the transaction.
	 * @example ```"[object Object]"```
	 */
	payment_instrument?: Record<string, any> | null

	order?: Order | null
	payment_gateway?: PaymentGateway | null
	versions?: Version[] | null

}


interface KlarnaPaymentCreate extends ResourceCreate {
	
	order: OrderRel

}


interface KlarnaPaymentUpdate extends ResourceUpdate {
	
	/** 
	 * The token returned by a successful client authorization, mandatory to place the order.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	auth_token?: string | null
	/** 
	 * Send this attribute if you want to update the payment session with fresh order data.
	 * @example ```"true"```
	 */
	_update?: boolean | null

	order?: OrderRel | null

}


class KlarnaPayments extends ApiResource<KlarnaPayment> {

	static readonly TYPE: KlarnaPaymentType = 'klarna_payments' as const

	async create(resource: KlarnaPaymentCreate, params?: QueryParamsRetrieve<KlarnaPayment>, options?: ResourcesConfig): Promise<KlarnaPayment> {
		return this.resources.create<KlarnaPaymentCreate, KlarnaPayment>({ ...resource, type: KlarnaPayments.TYPE }, params, options)
	}

	async update(resource: KlarnaPaymentUpdate, params?: QueryParamsRetrieve<KlarnaPayment>, options?: ResourcesConfig): Promise<KlarnaPayment> {
		return this.resources.update<KlarnaPaymentUpdate, KlarnaPayment>({ ...resource, type: KlarnaPayments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: KlarnaPayments.TYPE } : id, options)
	}

	async order(klarnaPaymentId: string | KlarnaPayment, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _klarnaPaymentId = (klarnaPaymentId as KlarnaPayment).id || klarnaPaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `klarna_payments/${_klarnaPaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(klarnaPaymentId: string | KlarnaPayment, params?: QueryParamsRetrieve<PaymentGateway>, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _klarnaPaymentId = (klarnaPaymentId as KlarnaPayment).id || klarnaPaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `klarna_payments/${_klarnaPaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async versions(klarnaPaymentId: string | KlarnaPayment, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _klarnaPaymentId = (klarnaPaymentId as KlarnaPayment).id || klarnaPaymentId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `klarna_payments/${_klarnaPaymentId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _update(id: string | KlarnaPayment, params?: QueryParamsRetrieve<KlarnaPayment>, options?: ResourcesConfig): Promise<KlarnaPayment> {
		return this.resources.update<KlarnaPaymentUpdate, KlarnaPayment>({ id: (typeof id === 'string')? id: id.id, type: KlarnaPayments.TYPE, _update: true }, params, options)
	}


	isKlarnaPayment(resource: any): resource is KlarnaPayment {
		return resource.type && (resource.type === KlarnaPayments.TYPE)
	}


	relationship(id: string | ResourceId | null): KlarnaPaymentRel {
		return super.relationshipOneToOne<KlarnaPaymentRel>(id)
	}

	relationshipToMany(...ids: string[]): KlarnaPaymentRel[] {
		return super.relationshipOneToMany<KlarnaPaymentRel>(...ids)
	}


	type(): KlarnaPaymentType {
		return KlarnaPayments.TYPE
	}

}


export default KlarnaPayments

export type { KlarnaPayment, KlarnaPaymentCreate, KlarnaPaymentUpdate, KlarnaPaymentType }
