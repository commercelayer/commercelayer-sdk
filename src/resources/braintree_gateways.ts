import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { BraintreePayment, BraintreePaymentType } from './braintree_payments'


type BraintreeGatewayType = 'braintree_gateways'
type BraintreeGatewayRel = ResourceRel & { type: BraintreeGatewayType }
type BraintreePaymentRel = ResourceRel & { type: BraintreePaymentType }


interface BraintreeGateway extends Resource {
	
	readonly type: BraintreeGatewayType

	name: string
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
	
	name: string
	merchant_account_id?: string
	merchant_id?: string
	public_key?: string
	private_key?: string
	descriptor_name?: string
	descriptor_phone?: string
	descriptor_url?: string

	braintree_payments?: BraintreePaymentRel[]

}


class BraintreeGateways extends ApiResource<BraintreeGateway> {

	static readonly TYPE: BraintreeGatewayType = 'braintree_gateways' as const

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<BraintreeGateway>> {
		return this.resources.list<BraintreeGateway>({ type: BraintreeGateways.TYPE }, params, options)
	}

	async create(resource: BraintreeGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BraintreeGateway> {
		return this.resources.create<BraintreeGatewayCreate, BraintreeGateway>({ ...resource, type: BraintreeGateways.TYPE }, params, options)
	}

	async update(resource: BraintreeGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BraintreeGateway> {
		return this.resources.update<BraintreeGatewayUpdate, BraintreeGateway>({ ...resource, type: BraintreeGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: BraintreeGateways.TYPE } : id, options)
	}

	async payment_methods(braintreeGatewayId: string | BraintreeGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _braintreeGatewayId = (braintreeGatewayId as BraintreeGateway).id || braintreeGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `braintree_gateways/${_braintreeGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async braintree_payments(braintreeGatewayId: string | BraintreeGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<BraintreePayment>> {
		const _braintreeGatewayId = (braintreeGatewayId as BraintreeGateway).id || braintreeGatewayId as string
		return this.resources.fetch<BraintreePayment>({ type: 'braintree_payments' }, `braintree_gateways/${_braintreeGatewayId}/braintree_payments`, params, options) as unknown as ListResponse<BraintreePayment>
	}


	isBraintreeGateway(resource: any): resource is BraintreeGateway {
		return resource.type && (resource.type === BraintreeGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): BraintreeGatewayRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: BraintreeGateways.TYPE } : { id: id.id, type: BraintreeGateways.TYPE }
	}


	type(): BraintreeGatewayType {
		return BraintreeGateways.TYPE
	}

}


export default BraintreeGateways

export type { BraintreeGateway, BraintreeGatewayCreate, BraintreeGatewayUpdate, BraintreeGatewayType }
