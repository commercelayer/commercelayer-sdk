import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { PaymentMethod } from './payment_methods'
import { StripePayment } from './stripe_payments'


type StripeGatewayRel = ResourceRel & { type: typeof StripeGateways.TYPE }


interface StripeGateway extends Resource {
	
	name?: string
	webhook_endpoint_id?: string
	webhook_endpoint_secret?: string
	webhook_endpoint_url?: string

	payment_methods?: PaymentMethod[]
	stripe_payments?: StripePayment[]

}


interface StripeGatewayCreate extends ResourceCreate {
	
	name: string
	login: string
	publishable_key?: string
	
}


interface StripeGatewayUpdate extends ResourceUpdate {
	
	name?: string
	
}


class StripeGateways extends ApiResource {

	static readonly TYPE: 'stripe_gateways' = 'stripe_gateways'
	// static readonly PATH = 'stripe_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StripeGateway>> {
		return this.resources.list({ type: StripeGateways.TYPE }, params, options)
	}

	async create(resource: StripeGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StripeGateway> {
		return this.resources.create({ ...resource, type: StripeGateways.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StripeGateway> {
		return this.resources.retrieve<StripeGateway>({ type: StripeGateways.TYPE, id }, params, options)
	}

	async update(resource: StripeGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StripeGateway> {
		return this.resources.update({ ...resource, type: StripeGateways.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: StripeGateways.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isStripeGateway(resource: any): resource is StripeGateway {
		return resource.type && (resource.type === StripeGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): StripeGatewayRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: StripeGateways.TYPE } : { id: id.id, type: StripeGateways.TYPE }
	}


	type(): string {
		return StripeGateways.TYPE
	}

}


export default StripeGateways

export { StripeGateway, StripeGatewayCreate, StripeGatewayUpdate }
