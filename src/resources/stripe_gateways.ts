import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, /* ResourceFilterable */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'
import type { StripePayment } from './stripe_payments'


type StripeGatewayType = 'stripe_gateways'
type StripeGatewayRel = ResourceRel & { type: StripeGatewayType }


export type StripeGatewaySortable = Pick<StripeGateway, 'id' | 'name'> & ResourceSortable
// export type StripeGatewayFilterable = Pick<StripeGateway, 'id' | 'name'> & ResourceFilterable


interface StripeGateway extends Resource {
	
	readonly type: StripeGatewayType

	name: string
	auto_payments?: boolean | null
	webhook_endpoint_id?: string | null
	webhook_endpoint_secret?: string | null
	webhook_endpoint_url?: string | null

	payment_methods?: PaymentMethod[] | null
	versions?: Version[] | null
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


export default StripeGateways

export type { StripeGateway, StripeGatewayCreate, StripeGatewayUpdate, StripeGatewayType }

/*
export const StripeGatewaysClient = (init: ResourceAdapter | ResourcesInitConfig): StripeGateways => {
	return new StripeGateways((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
