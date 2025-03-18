import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { PaymentGateway } from './payment_gateways'
import type { Version } from './versions'


type AxervePaymentType = 'axerve_payments'
type AxervePaymentRel = ResourceRel & { type: AxervePaymentType }
type OrderRel = ResourceRel & { type: OrderType }


export type AxervePaymentSort = Pick<AxervePayment, 'id'> & ResourceSort
// export type AxervePaymentFilter = Pick<AxervePayment, 'id'> & ResourceFilter


interface AxervePayment extends Resource {
	
	readonly type: AxervePaymentType

	/** 
	 * The merchant login code.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	login: string
	/** 
	 * The URL where the payer is redirected after they approve the payment.
	 * @example ```"https://yourdomain.com/thankyou"```
	 */
	return_url: string
	/** 
	 * The Axerve payment request data, collected by client.
	 * @example ```{"foo":"bar"}```
	 */
	payment_request_data?: Record<string, any> | null
	/** 
	 * The IP adress of the client creating the payment.
	 * @example ```"213.45.120.5"```
	 */
	client_ip?: string | null
	/** 
	 * The details of the buyer creating the payment.
	 * @example ```{"cardHolder":{"email":"george.harrison@gmail.com"},"shippingAddress":{"firstName":"George"}}```
	 */
	buyer_details?: Record<string, any> | null
	/** 
	 * Requires the creation of a token to represent this payment, mandatory to use customer's wallet and order subscriptions.
	 * @example ```true```
	 */
	request_token?: boolean | null
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


interface AxervePaymentCreate extends ResourceCreate {
	
	/** 
	 * The URL where the payer is redirected after they approve the payment.
	 * @example ```"https://yourdomain.com/thankyou"```
	 */
	return_url: string
	/** 
	 * The IP adress of the client creating the payment.
	 * @example ```"213.45.120.5"```
	 */
	client_ip?: string | null
	/** 
	 * The details of the buyer creating the payment.
	 * @example ```{"cardHolder":{"email":"george.harrison@gmail.com"},"shippingAddress":{"firstName":"George"}}```
	 */
	buyer_details?: Record<string, any> | null
	/** 
	 * Requires the creation of a token to represent this payment, mandatory to use customer's wallet and order subscriptions.
	 * @example ```true```
	 */
	request_token?: boolean | null

	order: OrderRel

}


interface AxervePaymentUpdate extends ResourceUpdate {
	
	/** 
	 * The Axerve payment request data, collected by client.
	 * @example ```{"foo":"bar"}```
	 */
	payment_request_data?: Record<string, any> | null
	/** 
	 * Send this attribute if you want to update the payment with fresh order data.
	 * @example ```true```
	 */
	_update?: boolean | null

	order?: OrderRel | null

}


class AxervePayments extends ApiResource<AxervePayment> {

	static readonly TYPE: AxervePaymentType = 'axerve_payments' as const

	async create(resource: AxervePaymentCreate, params?: QueryParamsRetrieve<AxervePayment>, options?: ResourcesConfig): Promise<AxervePayment> {
		return this.resources.create<AxervePaymentCreate, AxervePayment>({ ...resource, type: AxervePayments.TYPE }, params, options)
	}

	async update(resource: AxervePaymentUpdate, params?: QueryParamsRetrieve<AxervePayment>, options?: ResourcesConfig): Promise<AxervePayment> {
		return this.resources.update<AxervePaymentUpdate, AxervePayment>({ ...resource, type: AxervePayments.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: AxervePayments.TYPE } : id, options)
	}

	async order(axervePaymentId: string | AxervePayment, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _axervePaymentId = (axervePaymentId as AxervePayment).id || axervePaymentId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `axerve_payments/${_axervePaymentId}/order`, params, options) as unknown as Order
	}

	async payment_gateway(axervePaymentId: string | AxervePayment, params?: QueryParamsRetrieve<PaymentGateway>, options?: ResourcesConfig): Promise<PaymentGateway> {
		const _axervePaymentId = (axervePaymentId as AxervePayment).id || axervePaymentId as string
		return this.resources.fetch<PaymentGateway>({ type: 'payment_gateways' }, `axerve_payments/${_axervePaymentId}/payment_gateway`, params, options) as unknown as PaymentGateway
	}

	async versions(axervePaymentId: string | AxervePayment, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _axervePaymentId = (axervePaymentId as AxervePayment).id || axervePaymentId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `axerve_payments/${_axervePaymentId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _update(id: string | AxervePayment, params?: QueryParamsRetrieve<AxervePayment>, options?: ResourcesConfig): Promise<AxervePayment> {
		return this.resources.update<AxervePaymentUpdate, AxervePayment>({ id: (typeof id === 'string')? id: id.id, type: AxervePayments.TYPE, _update: true }, params, options)
	}


	isAxervePayment(resource: any): resource is AxervePayment {
		return resource.type && (resource.type === AxervePayments.TYPE)
	}


	relationship(id: string | ResourceId | null): AxervePaymentRel {
		return super.relationshipOneToOne<AxervePaymentRel>(id)
	}

	relationshipToMany(...ids: string[]): AxervePaymentRel[] {
		return super.relationshipOneToMany<AxervePaymentRel>(...ids)
	}


	type(): AxervePaymentType {
		return AxervePayments.TYPE
	}

}


const instance = new AxervePayments()
export default instance

export type { AxervePayment, AxervePaymentCreate, AxervePaymentUpdate, AxervePaymentType }
