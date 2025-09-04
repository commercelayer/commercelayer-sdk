import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'
import type { EventStore } from './event_stores'
import type { CheckoutComPayment, CheckoutComPaymentType } from './checkout_com_payments'


type CheckoutComGatewayType = 'checkout_com_gateways'
type CheckoutComGatewayRel = ResourceRel & { type: CheckoutComGatewayType }
type CheckoutComPaymentRel = ResourceRel & { type: CheckoutComPaymentType }


export type CheckoutComGatewaySort = Pick<CheckoutComGateway, 'id' | 'name'> & ResourceSort
// export type CheckoutComGatewayFilter = Pick<CheckoutComGateway, 'id' | 'name'> & ResourceFilter


interface CheckoutComGateway extends Resource {
	
	readonly type: CheckoutComGatewayType

	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name: string
	/** 
	 * The gateway webhook endpoint ID, generated automatically.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	webhook_endpoint_id?: string | null
	/** 
	 * The gateway webhook endpoint secret, generated automatically.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	webhook_endpoint_secret?: string | null
	/** 
	 * The gateway webhook URL, generated automatically.
	 * @example ```"https://core.commercelayer.co/webhook_callbacks/checkout_com_gateways/xxxxx"```
	 */
	webhook_endpoint_url?: string | null

	payment_methods?: PaymentMethod[] | null
	versions?: Version[] | null
	event_stores?: EventStore[] | null
	checkout_com_payments?: CheckoutComPayment[] | null

}


interface CheckoutComGatewayCreate extends ResourceCreate {
	
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name: string
	/** 
	 * The gateway secret key.
	 * @example ```"sk_test_xxxx-yyyy-zzzz"```
	 */
	secret_key: string
	/** 
	 * The gateway public key.
	 * @example ```"pk_test_xxxx-yyyy-zzzz"```
	 */
	public_key: string

	checkout_com_payments?: CheckoutComPaymentRel[] | null

}


interface CheckoutComGatewayUpdate extends ResourceUpdate {
	
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name?: string | null
	/** 
	 * The gateway secret key.
	 * @example ```"sk_test_xxxx-yyyy-zzzz"```
	 */
	secret_key?: string | null
	/** 
	 * The gateway public key.
	 * @example ```"pk_test_xxxx-yyyy-zzzz"```
	 */
	public_key?: string | null

	checkout_com_payments?: CheckoutComPaymentRel[] | null

}


class CheckoutComGateways extends ApiResource<CheckoutComGateway> {

	static readonly TYPE: CheckoutComGatewayType = 'checkout_com_gateways' as const

	async create(resource: CheckoutComGatewayCreate, params?: QueryParamsRetrieve<CheckoutComGateway>, options?: ResourcesConfig): Promise<CheckoutComGateway> {
		return this.resources.create<CheckoutComGatewayCreate, CheckoutComGateway>({ ...resource, type: CheckoutComGateways.TYPE }, params, options)
	}

	async update(resource: CheckoutComGatewayUpdate, params?: QueryParamsRetrieve<CheckoutComGateway>, options?: ResourcesConfig): Promise<CheckoutComGateway> {
		return this.resources.update<CheckoutComGatewayUpdate, CheckoutComGateway>({ ...resource, type: CheckoutComGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: CheckoutComGateways.TYPE } : id, options)
	}

	async payment_methods(checkoutComGatewayId: string | CheckoutComGateway, params?: QueryParamsList<PaymentMethod>, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _checkoutComGatewayId = (checkoutComGatewayId as CheckoutComGateway).id || checkoutComGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `checkout_com_gateways/${_checkoutComGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async versions(checkoutComGatewayId: string | CheckoutComGateway, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _checkoutComGatewayId = (checkoutComGatewayId as CheckoutComGateway).id || checkoutComGatewayId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `checkout_com_gateways/${_checkoutComGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async event_stores(checkoutComGatewayId: string | CheckoutComGateway, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _checkoutComGatewayId = (checkoutComGatewayId as CheckoutComGateway).id || checkoutComGatewayId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `checkout_com_gateways/${_checkoutComGatewayId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}

	async checkout_com_payments(checkoutComGatewayId: string | CheckoutComGateway, params?: QueryParamsList<CheckoutComPayment>, options?: ResourcesConfig): Promise<ListResponse<CheckoutComPayment>> {
		const _checkoutComGatewayId = (checkoutComGatewayId as CheckoutComGateway).id || checkoutComGatewayId as string
		return this.resources.fetch<CheckoutComPayment>({ type: 'checkout_com_payments' }, `checkout_com_gateways/${_checkoutComGatewayId}/checkout_com_payments`, params, options) as unknown as ListResponse<CheckoutComPayment>
	}


	isCheckoutComGateway(resource: any): resource is CheckoutComGateway {
		return resource.type && (resource.type === CheckoutComGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): CheckoutComGatewayRel {
		return super.relationshipOneToOne<CheckoutComGatewayRel>(id)
	}

	relationshipToMany(...ids: string[]): CheckoutComGatewayRel[] {
		return super.relationshipOneToMany<CheckoutComGatewayRel>(...ids)
	}


	type(): CheckoutComGatewayType {
		return CheckoutComGateways.TYPE
	}

}


export default CheckoutComGateways

export type { CheckoutComGateway, CheckoutComGatewayCreate, CheckoutComGatewayUpdate, CheckoutComGatewayType }
