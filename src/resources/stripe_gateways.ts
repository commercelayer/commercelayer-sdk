import type { QueryParamsList, QueryParamsRetrieve } from '../query'
import type { ListResponse, Resource, ResourceCreate, ResourceId, ResourceRel, ResourceSort, /* ResourceFilter */ ResourcesConfig, ResourceUpdate, } from '../resource'
import { ApiResource } from '../resource'
import type { EventStore } from './event_stores'
import type { PaymentMethod } from './payment_methods'
import type { StripePayment } from './stripe_payments'
import type { Version } from './versions'


type StripeGatewayType = 'stripe_gateways'
type StripeGatewayRel = ResourceRel & { type: StripeGatewayType }


export type StripeGatewaySort = Pick<StripeGateway, 'id' | 'name' | 'disabled_at'> & ResourceSort
// export type StripeGatewayFilter = Pick<StripeGateway, 'id' | 'name' | 'disabled_at'> & ResourceFilter


interface StripeGateway extends Resource {
	
	readonly type: StripeGatewayType

	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name: string
	force_payments?: boolean | null
	/** 
	 * Time at which this resource was disabled.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	disabled_at?: string | null
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
	event_stores?: EventStore[] | null
	stripe_payments?: StripePayment[] | null

}


interface StripeGatewayCreate extends ResourceCreate {
	
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name: string
	force_payments?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```true```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```true```
	 */
	_enable?: boolean | null
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
	
}


interface StripeGatewayUpdate extends ResourceUpdate {
	
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name?: string | null
	force_payments?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```true```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```true```
	 */
	_enable?: boolean | null
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

	async event_stores(stripeGatewayId: string | StripeGateway, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _stripeGatewayId = (stripeGatewayId as StripeGateway).id || stripeGatewayId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `stripe_gateways/${_stripeGatewayId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}

	async stripe_payments(stripeGatewayId: string | StripeGateway, params?: QueryParamsList<StripePayment>, options?: ResourcesConfig): Promise<ListResponse<StripePayment>> {
		const _stripeGatewayId = (stripeGatewayId as StripeGateway).id || stripeGatewayId as string
		return this.resources.fetch<StripePayment>({ type: 'stripe_payments' }, `stripe_gateways/${_stripeGatewayId}/stripe_payments`, params, options) as unknown as ListResponse<StripePayment>
	}

	async _disable(id: string | StripeGateway, params?: QueryParamsRetrieve<StripeGateway>, options?: ResourcesConfig): Promise<StripeGateway> {
		return this.resources.update<StripeGatewayUpdate, StripeGateway>({ id: (typeof id === 'string')? id: id.id, type: StripeGateways.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | StripeGateway, params?: QueryParamsRetrieve<StripeGateway>, options?: ResourcesConfig): Promise<StripeGateway> {
		return this.resources.update<StripeGatewayUpdate, StripeGateway>({ id: (typeof id === 'string')? id: id.id, type: StripeGateways.TYPE, _enable: true }, params, options)
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

export type { StripeGateway, StripeGatewayCreate, StripeGateways, StripeGatewayType, StripeGatewayUpdate }
