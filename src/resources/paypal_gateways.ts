import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'
import type { EventStore } from './event_stores'
import type { PaypalPayment } from './paypal_payments'


type PaypalGatewayType = 'paypal_gateways'
type PaypalGatewayRel = ResourceRel & { type: PaypalGatewayType }


export type PaypalGatewaySort = Pick<PaypalGateway, 'id' | 'name'> & ResourceSort
// export type PaypalGatewayFilter = Pick<PaypalGateway, 'id' | 'name'> & ResourceFilter


interface PaypalGateway extends Resource {
	
	readonly type: PaypalGatewayType

	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name: string

	payment_methods?: PaymentMethod[] | null
	versions?: Version[] | null
	event_stores?: EventStore[] | null
	paypal_payments?: PaypalPayment[] | null

}


interface PaypalGatewayCreate extends ResourceCreate {
	
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name: string
	/** 
	 * The gateway client ID.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	client_id: string
	/** 
	 * The gateway client secret.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	client_secret: string
	
}


interface PaypalGatewayUpdate extends ResourceUpdate {
	
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name?: string | null
	/** 
	 * The gateway client ID.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	client_id?: string | null
	/** 
	 * The gateway client secret.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	client_secret?: string | null
	
}


class PaypalGateways extends ApiResource<PaypalGateway> {

	static readonly TYPE: PaypalGatewayType = 'paypal_gateways' as const

	async create(resource: PaypalGatewayCreate, params?: QueryParamsRetrieve<PaypalGateway>, options?: ResourcesConfig): Promise<PaypalGateway> {
		return this.resources.create<PaypalGatewayCreate, PaypalGateway>({ ...resource, type: PaypalGateways.TYPE }, params, options)
	}

	async update(resource: PaypalGatewayUpdate, params?: QueryParamsRetrieve<PaypalGateway>, options?: ResourcesConfig): Promise<PaypalGateway> {
		return this.resources.update<PaypalGatewayUpdate, PaypalGateway>({ ...resource, type: PaypalGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: PaypalGateways.TYPE } : id, options)
	}

	async payment_methods(paypalGatewayId: string | PaypalGateway, params?: QueryParamsList<PaymentMethod>, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _paypalGatewayId = (paypalGatewayId as PaypalGateway).id || paypalGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `paypal_gateways/${_paypalGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async versions(paypalGatewayId: string | PaypalGateway, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _paypalGatewayId = (paypalGatewayId as PaypalGateway).id || paypalGatewayId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `paypal_gateways/${_paypalGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async event_stores(paypalGatewayId: string | PaypalGateway, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _paypalGatewayId = (paypalGatewayId as PaypalGateway).id || paypalGatewayId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `paypal_gateways/${_paypalGatewayId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}

	async paypal_payments(paypalGatewayId: string | PaypalGateway, params?: QueryParamsList<PaypalPayment>, options?: ResourcesConfig): Promise<ListResponse<PaypalPayment>> {
		const _paypalGatewayId = (paypalGatewayId as PaypalGateway).id || paypalGatewayId as string
		return this.resources.fetch<PaypalPayment>({ type: 'paypal_payments' }, `paypal_gateways/${_paypalGatewayId}/paypal_payments`, params, options) as unknown as ListResponse<PaypalPayment>
	}


	isPaypalGateway(resource: any): resource is PaypalGateway {
		return resource.type && (resource.type === PaypalGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): PaypalGatewayRel {
		return super.relationshipOneToOne<PaypalGatewayRel>(id)
	}

	relationshipToMany(...ids: string[]): PaypalGatewayRel[] {
		return super.relationshipOneToMany<PaypalGatewayRel>(...ids)
	}


	type(): PaypalGatewayType {
		return PaypalGateways.TYPE
	}

}


const instance = new PaypalGateways()
export default instance

export type { PaypalGateways, PaypalGateway, PaypalGatewayCreate, PaypalGatewayUpdate, PaypalGatewayType }
