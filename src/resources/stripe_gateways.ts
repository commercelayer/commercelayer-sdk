import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'
import type { StripePayment } from './stripe_payments'


type StripeGatewayType = 'stripe_gateways'
type StripeGatewayRel = ResourceRel & { type: StripeGatewayType }


export type StripeGatewaySort = Pick<StripeGateway, 'id' | 'name'> & ResourceSort
// export type StripeGatewayFilter = Pick<StripeGateway, 'id' | 'name'> & ResourceFilter


interface StripeGateway extends Resource {
	
	readonly type: StripeGatewayType

	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name: string
	/** 
	 * The account (if any) for which the funds of the PaymentIntent are intended.
	 * @example ```"acct_xxxx-yyyy-zzzz"```
	 */
	connected_account?: string | null
	/** 
	 * Indicates if the gateway will accept payment methods enabled in the Stripe dashboard.
	 * @example ```true```
	 */
	auto_payments?: boolean | null
	/** 
	 * Indicates if the payment source is forced on the editable order upon receiving a successful event from Stripe.
	 * @example ```true```
	 */
	force_payments?: boolean | null
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
	 * @example ```"https://core.commercelayer.co/webhook_callbacks/stripe_gateways/xxxxx"```
	 */
	webhook_endpoint_url?: string | null

	payment_methods?: PaymentMethod[] | null
	versions?: Version[] | null
	stripe_payments?: StripePayment[] | null

}


interface StripeGatewayCreate extends ResourceCreate {
	
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name: string
	/** 
	 * The gateway login.
	 * @example ```"sk_live_xxxx-yyyy-zzzz"```
	 */
	login: string
	/** 
	 * The gateway publishable API key.
	 * @example ```"pk_live_xxxx-yyyy-zzzz"```
	 */
	publishable_key?: string | null
	/** 
	 * The account (if any) for which the funds of the PaymentIntent are intended.
	 * @example ```"acct_xxxx-yyyy-zzzz"```
	 */
	connected_account?: string | null
	/** 
	 * Indicates if the gateway will accept payment methods enabled in the Stripe dashboard.
	 * @example ```true```
	 */
	auto_payments?: boolean | null
	/** 
	 * Indicates if the payment source is forced on the editable order upon receiving a successful event from Stripe.
	 * @example ```true```
	 */
	force_payments?: boolean | null
	
}


interface StripeGatewayUpdate extends ResourceUpdate {
	
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name?: string | null
	/** 
	 * The account (if any) for which the funds of the PaymentIntent are intended.
	 * @example ```"acct_xxxx-yyyy-zzzz"```
	 */
	connected_account?: string | null
	/** 
	 * Indicates if the gateway will accept payment methods enabled in the Stripe dashboard.
	 * @example ```true```
	 */
	auto_payments?: boolean | null
	/** 
	 * Indicates if the payment source is forced on the editable order upon receiving a successful event from Stripe.
	 * @example ```true```
	 */
	force_payments?: boolean | null
	
}


class StripeGateways extends ApiResource<StripeGateway> {

	static readonly TYPE: StripeGatewayType = 'stripe_gateways' as const

	async create(resource: StripeGatewayCreate, params?: QueryParamsRetrieve<StripeGateway>, options?: ResourcesConfig): Promise<StripeGateway> {
		return this.resources.create<StripeGatewayCreate, StripeGateway>({ ...resource, type: StripeGateways.TYPE }, params, options)
	}

	async update(resource: StripeGatewayUpdate, params?: QueryParamsRetrieve<StripeGateway>, options?: ResourcesConfig): Promise<StripeGateway> {
		return this.resources.update<StripeGatewayUpdate, StripeGateway>({ ...resource, type: StripeGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: StripeGateways.TYPE } : id, options)
	}

	async payment_methods(stripeGatewayId: string | StripeGateway, params?: QueryParamsList<PaymentMethod>, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _stripeGatewayId = (stripeGatewayId as StripeGateway).id || stripeGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `stripe_gateways/${_stripeGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async versions(stripeGatewayId: string | StripeGateway, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _stripeGatewayId = (stripeGatewayId as StripeGateway).id || stripeGatewayId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `stripe_gateways/${_stripeGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async stripe_payments(stripeGatewayId: string | StripeGateway, params?: QueryParamsList<StripePayment>, options?: ResourcesConfig): Promise<ListResponse<StripePayment>> {
		const _stripeGatewayId = (stripeGatewayId as StripeGateway).id || stripeGatewayId as string
		return this.resources.fetch<StripePayment>({ type: 'stripe_payments' }, `stripe_gateways/${_stripeGatewayId}/stripe_payments`, params, options) as unknown as ListResponse<StripePayment>
	}


	isStripeGateway(resource: any): resource is StripeGateway {
		return resource.type && (resource.type === StripeGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): StripeGatewayRel {
		return super.relationshipOneToOne<StripeGatewayRel>(id)
	}

	relationshipToMany(...ids: string[]): StripeGatewayRel[] {
		return super.relationshipOneToMany<StripeGatewayRel>(...ids)
	}


	type(): StripeGatewayType {
		return StripeGateways.TYPE
	}

}


const instance = new StripeGateways()
export default instance

export type { StripeGateways, StripeGateway, StripeGatewayCreate, StripeGatewayUpdate, StripeGatewayType }
