import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'
import type { Version } from './versions'


type AdyenPaymentType = 'adyen_payments'
type AdyenPaymentRel = ResourceRel & { type: AdyenPaymentType }
type OrderRel = ResourceRel & { type: OrderType }


export type AdyenPaymentSort = Pick<AdyenPayment, 'id'> & ResourceSort
// export type AdyenPaymentFilter = Pick<AdyenPayment, 'id'> & ResourceFilter


interface AdyenPayment extends Resource {
	
	readonly type: AdyenPaymentType

	/** 
	 * The public key linked to your API credential.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	public_key?: string | null
	/** 
	 * The merchant available payment methods for the assoiated order (i.e. country and amount). Required by the Adyen JS SDK.
	 * @example ```{"foo":"bar"}```
	 */
	payment_methods: Record<string, any>
	/** 
	 * The Adyen payment request data, collected by client.
	 * @example ```{"foo":"bar"}```
	 */
	payment_request_data?: Record<string, any> | null
	/** 
	 * The Adyen additional details request data, collected by client.
	 * @example ```{"foo":"bar"}```
	 */
	payment_request_details?: Record<string, any> | null
	/** 
	 * The Adyen payment response, used by client (includes 'resultCode' and 'action').
	 * @example ```{"foo":"bar"}```
	 */
	payment_response?: Record<string, any> | null
	/** 
	 * Indicates if the order current amount differs form the one of the associated authorization.
	 */
	mismatched_amounts?: boolean | null
	/** 
	 * Information about the payment instrument used in the transaction.
	 * @example ```{"issuer":"cl bank","card_type":"visa"}```
	 */
	payment_instrument?: Record<string, any> | null

	order?: Order | null
	payment_gateway?: PaymentGateway | null
	versions?: Version[] | null

}


interface AdyenPaymentCreate extends ResourceCreate {
	
	order: OrderRel

}


interface AdyenPaymentUpdate extends ResourceUpdate {
	
	/** 
	 * The Adyen payment request data, collected by client.
	 * @example ```{"foo":"bar"}```
	 */
	payment_request_data?: Record<string, any> | null
	/** 
	 * The Adyen additional details request data, collected by client.
	 * @example ```{"foo":"bar"}```
	 */
	payment_request_details?: Record<string, any> | null
	/** 
	 * Send this attribute if you want to authorize the payment.
	 * @example ```true```
	 */
	_authorize?: boolean | null
	/** 
	 * Send this attribute if you want to send additional details the payment request.
	 * @example ```true```
	 */
	_details?: boolean | null

	order?: OrderRel | null

}


class AdyenPayments extends ApiResource<AdyenPayment> {

	static readonly TYPE: AdyenPaymentType = 'adyen_payments' as const

	async create(resource: AdyenPaymentCreate, params?: QueryParamsRetrieve<AdyenPayment>, options?: ResourcesConfig): Promise<AdyenPayment> {
		return this.resources.create<AdyenPaymentCreate, AdyenPayment>({ ...resource, type: AdyenPayments.TYPE }, params, options)
	}

	async update(resource: AdyenPaymentUpdate, params?: QueryParamsRetrieve<AdyenPayment>, options?: ResourcesConfig): Promise<AdyenPayment> {
		return this.resources.update<AdyenPaymentUpdate, AdyenPayment>({ ...resource, type: AdyenPayments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: AdyenPayments.TYPE } : id, options)
	}

	async order(adyenPaymentId: string | AdyenPayment, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _adyenPaymentId = (adyenPaymentId as AdyenPayment).id || adyenPaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `adyen_payments/${_adyenPaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(adyenPaymentId: string | AdyenPayment, params?: QueryParamsRetrieve<PaymentGateway>, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _adyenPaymentId = (adyenPaymentId as AdyenPayment).id || adyenPaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `adyen_payments/${_adyenPaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async versions(adyenPaymentId: string | AdyenPayment, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _adyenPaymentId = (adyenPaymentId as AdyenPayment).id || adyenPaymentId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `adyen_payments/${_adyenPaymentId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _authorize(id: string | AdyenPayment, params?: QueryParamsRetrieve<AdyenPayment>, options?: ResourcesConfig): Promise<AdyenPayment> {
		return this.resources.update<AdyenPaymentUpdate, AdyenPayment>({ id: (typeof id === 'string')? id: id.id, type: AdyenPayments.TYPE, _authorize: true }, params, options)
	}

	async _details(id: string | AdyenPayment, params?: QueryParamsRetrieve<AdyenPayment>, options?: ResourcesConfig): Promise<AdyenPayment> {
		return this.resources.update<AdyenPaymentUpdate, AdyenPayment>({ id: (typeof id === 'string')? id: id.id, type: AdyenPayments.TYPE, _details: true }, params, options)
	}


	isAdyenPayment(resource: any): resource is AdyenPayment {
		return resource.type && (resource.type === AdyenPayments.TYPE)
	}


	relationship(id: string | ResourceId | null): AdyenPaymentRel {
		return super.relationshipOneToOne<AdyenPaymentRel>(id)
	}

	relationshipToMany(...ids: string[]): AdyenPaymentRel[] {
		return super.relationshipOneToMany<AdyenPaymentRel>(...ids)
	}


	type(): AdyenPaymentType {
		return AdyenPayments.TYPE
	}

}


const instance = new AdyenPayments()
export default instance

export type { AdyenPayments, AdyenPayment, AdyenPaymentCreate, AdyenPaymentUpdate, AdyenPaymentType }
