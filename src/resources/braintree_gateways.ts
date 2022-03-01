import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { PaymentMethod } from './payment_methods'
import { BraintreePayment } from './braintree_payments'


type BraintreeGatewayRel = ResourceRel & { type: typeof BraintreeGateways.TYPE }
type BraintreePaymentRel = ResourceRel & { type: 'braintree_payments' }


interface BraintreeGateway extends Resource {
	
	name?: string
	descriptor_name?: string
	descriptor_phone?: string
	descriptor_url?: string
	webhook_endpoint_url?: string

	payment_methods?: PaymentMethod[]
	braintree_payments?: BraintreePayment[]

}


interface BraintreeGatewayCreate extends ResourceCreate {
	
	name: string
	merchant_account_id: string
	merchant_id: string
	public_key: string
	private_key: string
	descriptor_name?: string
	descriptor_phone?: string
	descriptor_url?: string

	braintree_payments?: BraintreePaymentRel[]

}


interface BraintreeGatewayUpdate extends ResourceUpdate {
	
	name?: string
	merchant_account_id?: string
	merchant_id?: string
	public_key?: string
	private_key?: string
	descriptor_name?: string
	descriptor_phone?: string
	descriptor_url?: string

	braintree_payments?: BraintreePaymentRel[]

}


class BraintreeGateways extends ApiResource {

	static readonly TYPE: 'braintree_gateways' = 'braintree_gateways'
	// static readonly PATH = 'braintree_gateways'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<BraintreeGateway>> {
		return this.resources.list<BraintreeGateway>({ type: BraintreeGateways.TYPE }, params, options)
	}

	async create(resource: BraintreeGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BraintreeGateway> {
		return this.resources.create<BraintreeGatewayCreate, BraintreeGateway>({ ...resource, type: BraintreeGateways.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BraintreeGateway> {
		return this.resources.retrieve<BraintreeGateway>({ type: BraintreeGateways.TYPE, id }, params, options)
	}

	async update(resource: BraintreeGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BraintreeGateway> {
		return this.resources.update<BraintreeGatewayUpdate, BraintreeGateway>({ ...resource, type: BraintreeGateways.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: BraintreeGateways.TYPE, id }, options)
	}

	async payment_methods(braintreeGatewayId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `braintree_gateways/${braintreeGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async braintree_payments(braintreeGatewayId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<BraintreePayment>> {
		return this.resources.fetch<BraintreePayment>({ type: 'braintree_payments' }, `braintree_gateways/${braintreeGatewayId}/braintree_payments`, params, options) as unknown as ListResponse<BraintreePayment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isBraintreeGateway(resource: any): resource is BraintreeGateway {
		return resource.type && (resource.type === BraintreeGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): BraintreeGatewayRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: BraintreeGateways.TYPE } : { id: id.id, type: BraintreeGateways.TYPE }
	}


	type(): string {
		return BraintreeGateways.TYPE
	}

}


export default BraintreeGateways

export { BraintreeGateway, BraintreeGatewayCreate, BraintreeGatewayUpdate }
