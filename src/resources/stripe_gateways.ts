import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { StripePayment } from './stripe_payments'


type StripeGatewayType = 'stripe_gateways'
type StripeGatewayRel = ResourceRel & { type: StripeGatewayType }


interface StripeGateway extends Resource {
	
	readonly type: StripeGatewayType

	name: string
	auto_payments?: boolean | null
	webhook_endpoint_id?: string | null
	webhook_endpoint_secret?: string | null
	webhook_endpoint_url?: string | null

	payment_methods?: PaymentMethod[] | null
	stripe_payments?: StripePayment[] | null

}


interface StripeGatewayCreate extends ResourceCreate {
	
	name: string
	login: string
	publishable_key?: string | null
	auto_payments?: boolean | null
	
}


interface StripeGatewayUpdate extends ResourceUpdate {
	
	name?: string | null
	auto_payments?: boolean | null
	
}


class StripeGateways extends ApiResource<StripeGateway> {

	static readonly TYPE: StripeGatewayType = 'stripe_gateways' as const

	async create(resource: StripeGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StripeGateway> {
		return this.resources.create<StripeGatewayCreate, StripeGateway>({ ...resource, type: StripeGateways.TYPE }, params, options)
	}

	async update(resource: StripeGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StripeGateway> {
		return this.resources.update<StripeGatewayUpdate, StripeGateway>({ ...resource, type: StripeGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: StripeGateways.TYPE } : id, options)
	}

	async payment_methods(stripeGatewayId: string | StripeGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _stripeGatewayId = (stripeGatewayId as StripeGateway).id || stripeGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `stripe_gateways/${_stripeGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async stripe_payments(stripeGatewayId: string | StripeGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StripePayment>> {
		const _stripeGatewayId = (stripeGatewayId as StripeGateway).id || stripeGatewayId as string
		return this.resources.fetch<StripePayment>({ type: 'stripe_payments' }, `stripe_gateways/${_stripeGatewayId}/stripe_payments`, params, options) as unknown as ListResponse<StripePayment>
	}


	isStripeGateway(resource: any): resource is StripeGateway {
		return resource.type && (resource.type === StripeGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): StripeGatewayRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: StripeGateways.TYPE } : { id: id.id, type: StripeGateways.TYPE }
	}


	type(): StripeGatewayType {
		return StripeGateways.TYPE
	}

}


export default StripeGateways

export type { StripeGateway, StripeGatewayCreate, StripeGatewayUpdate, StripeGatewayType }
