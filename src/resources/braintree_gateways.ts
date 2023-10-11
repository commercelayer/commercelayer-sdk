import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'
import type { BraintreePayment, BraintreePaymentType } from './braintree_payments'


type BraintreeGatewayType = 'braintree_gateways'
type BraintreeGatewayRel = ResourceRel & { type: BraintreeGatewayType }
type BraintreePaymentRel = ResourceRel & { type: BraintreePaymentType }


interface BraintreeGateway extends Resource {
	
	readonly type: BraintreeGatewayType

	name: string
	descriptor_name?: string | null
	descriptor_phone?: string | null
	descriptor_url?: string | null
	webhook_endpoint_url?: string | null

	payment_methods?: PaymentMethod[] | null
	versions?: Version[] | null
	braintree_payments?: BraintreePayment[] | null

}


interface BraintreeGatewayCreate extends ResourceCreate {
	
	name: string
	merchant_account_id: string
	merchant_id: string
	public_key: string
	private_key: string
	descriptor_name?: string | null
	descriptor_phone?: string | null
	descriptor_url?: string | null

	braintree_payments?: BraintreePaymentRel[] | null

}


interface BraintreeGatewayUpdate extends ResourceUpdate {
	
	name?: string | null
	merchant_account_id?: string | null
	merchant_id?: string | null
	public_key?: string | null
	private_key?: string | null
	descriptor_name?: string | null
	descriptor_phone?: string | null
	descriptor_url?: string | null

	braintree_payments?: BraintreePaymentRel[] | null

}


class BraintreeGateways extends ApiResource<BraintreeGateway> {

	static readonly TYPE: BraintreeGatewayType = 'braintree_gateways' as const

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

	async versions(braintreeGatewayId: string | BraintreeGateway, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _braintreeGatewayId = (braintreeGatewayId as BraintreeGateway).id || braintreeGatewayId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `braintree_gateways/${_braintreeGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
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


	parse(payload: any): BraintreeGateway | BraintreeGateway[] {
		return super.parse(payload)
	}

}


export default BraintreeGateways

export type { BraintreeGateway, BraintreeGatewayCreate, BraintreeGatewayUpdate, BraintreeGatewayType }
