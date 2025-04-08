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

	/** 
	 * The payment unique identifier.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	payment_id?: string | null
	/** 
	 * The Satispay payment flow, inspect gateway API details for more information.
	 * @example ```"MATCH_CODE"```
	 */
	flow?: string | null
	/** 
	 * The Satispay payment status.
	 * @example ```"PENDING"```
	 */
	status?: string | null
	/** 
	 * The url to redirect the customer after the payment flow is completed.
	 * @example ```"http://commercelayer.dev/satispay/redirect"```
	 */
	redirect_url?: string | null
	/** 
	 * Redirect url to the payment page.
	 * @example ```"https://online.satispay.com/pay/xxxx-yyyy-zzzz?redirect_url={redirect_url}"```
	 */
	payment_url?: string | null
	/** 
	 * The Satispay payment response, used to fetch internal data.
	 * @example ```{"foo":"bar"}```
	 */
	payment_response?: Record<string, any> | null
	/** 
	 * Information about the payment instrument used in the transaction.
	 * @example ```{"issuer":"cl bank","card_type":"visa"}```
	 */
	payment_instrument?: Record<string, any> | null

	order?: Order | null
	payment_gateway?: PaymentGateway | null
	versions?: Version[] | null

}


interface SatispayPaymentCreate extends ResourceCreate {
	
	/** 
	 * The Satispay payment flow, inspect gateway API details for more information.
	 * @example ```"MATCH_CODE"```
	 */
	flow?: string | null
	/** 
	 * The url to redirect the customer after the payment flow is completed.
	 * @example ```"http://commercelayer.dev/satispay/redirect"```
	 */
	redirect_url?: string | null

	order: OrderRel

}


interface SatispayPaymentUpdate extends ResourceUpdate {
	
	/** 
	 * The url to redirect the customer after the payment flow is completed.
	 * @example ```"http://commercelayer.dev/satispay/redirect"```
	 */
	redirect_url?: string | null
	/** 
	 * Send this attribute if you want to refresh all the pending transactions, can be used as webhooks fallback logic.
	 * @example ```true```
	 */
	_refresh?: boolean | null

	order?: OrderRel | null

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


const instance = new SatispayPayments()
export default instance

export type { SatispayPayments, SatispayPayment, SatispayPaymentCreate, SatispayPaymentUpdate, SatispayPaymentType }
