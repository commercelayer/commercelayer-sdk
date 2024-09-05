import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { BraintreePayment, BraintreePaymentType } from './braintree_payments'
import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'


type BraintreeGatewayType = 'braintree_gateways'
type BraintreeGatewayRel = ResourceRel & { type: BraintreeGatewayType }
type BraintreePaymentRel = ResourceRel & { type: BraintreePaymentType }


export type BraintreeGatewaySort = Pick<BraintreeGateway, 'id' | 'name'> & ResourceSort
// export type BraintreeGatewayFilter = Pick<BraintreeGateway, 'id' | 'name'> & ResourceFilter


interface BraintreeGateway extends Resource {
	
	readonly type: BraintreeGatewayType

	/** 
	 * The dynamic descriptor name. Must be composed by business name (3, 7 or 12 chars), an asterisk (*) and the product name (18, 14 or 9 chars), for a total length of 22 chars.
	 * @example ```"company*productabc1234"```
	 */
	descriptor_name?: string | null
	/** 
	 * The dynamic descriptor phone number. Must be 10-14 characters and can only contain numbers, dashes, parentheses and periods.
	 * @example ```"3125551212"```
	 */
	descriptor_phone?: string | null
	/** 
	 * The dynamic descriptor URL.
	 * @example ```"company.com"```
	 */
	descriptor_url?: string | null
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name: string
	/** 
	 * The gateway webhook URL, generated automatically.
	 * @example ```"https://core.commercelayer.co/webhook_callbacks/braintree_gateways/xxxxx"```
	 */
	webhook_endpoint_url?: string | null

	braintree_payments?: BraintreePayment[] | null
	payment_methods?: PaymentMethod[] | null
	versions?: Version[] | null

}


interface BraintreeGatewayCreate extends ResourceCreate {
	
	/** 
	 * The dynamic descriptor name. Must be composed by business name (3, 7 or 12 chars), an asterisk (*) and the product name (18, 14 or 9 chars), for a total length of 22 chars.
	 * @example ```"company*productabc1234"```
	 */
	descriptor_name?: string | null
	/** 
	 * The dynamic descriptor phone number. Must be 10-14 characters and can only contain numbers, dashes, parentheses and periods.
	 * @example ```"3125551212"```
	 */
	descriptor_phone?: string | null
	/** 
	 * The dynamic descriptor URL.
	 * @example ```"company.com"```
	 */
	descriptor_url?: string | null
	/** 
	 * The gateway merchant account ID.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	merchant_account_id: string
	/** 
	 * The gateway merchant ID.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	merchant_id: string
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name: string
	/** 
	 * The gateway API private key.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	private_key: string
	/** 
	 * The gateway API public key.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	public_key: string

	braintree_payments?: BraintreePaymentRel[] | null

}


interface BraintreeGatewayUpdate extends ResourceUpdate {
	
	/** 
	 * The dynamic descriptor name. Must be composed by business name (3, 7 or 12 chars), an asterisk (*) and the product name (18, 14 or 9 chars), for a total length of 22 chars.
	 * @example ```"company*productabc1234"```
	 */
	descriptor_name?: string | null
	/** 
	 * The dynamic descriptor phone number. Must be 10-14 characters and can only contain numbers, dashes, parentheses and periods.
	 * @example ```"3125551212"```
	 */
	descriptor_phone?: string | null
	/** 
	 * The dynamic descriptor URL.
	 * @example ```"company.com"```
	 */
	descriptor_url?: string | null
	/** 
	 * The gateway merchant account ID.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	merchant_account_id?: string | null
	/** 
	 * The gateway merchant ID.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	merchant_id?: string | null
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name?: string | null
	/** 
	 * The gateway API private key.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	private_key?: string | null
	/** 
	 * The gateway API public key.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	public_key?: string | null

	braintree_payments?: BraintreePaymentRel[] | null

}


class BraintreeGateways extends ApiResource<BraintreeGateway> {

	static readonly TYPE: BraintreeGatewayType = 'braintree_gateways' as const

	async create(resource: BraintreeGatewayCreate, params?: QueryParamsRetrieve<BraintreeGateway>, options?: ResourcesConfig): Promise<BraintreeGateway> {
		return this.resources.create<BraintreeGatewayCreate, BraintreeGateway>({ ...resource, type: BraintreeGateways.TYPE }, params, options)
	}

	async update(resource: BraintreeGatewayUpdate, params?: QueryParamsRetrieve<BraintreeGateway>, options?: ResourcesConfig): Promise<BraintreeGateway> {
		return this.resources.update<BraintreeGatewayUpdate, BraintreeGateway>({ ...resource, type: BraintreeGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: BraintreeGateways.TYPE } : id, options)
	}

	async braintree_payments(braintreeGatewayId: string | BraintreeGateway, params?: QueryParamsList<BraintreePayment>, options?: ResourcesConfig): Promise<ListResponse<BraintreePayment>> {
		const _braintreeGatewayId = (braintreeGatewayId as BraintreeGateway).id || braintreeGatewayId as string
		return this.resources.fetch<BraintreePayment>({ type: 'braintree_payments' }, `braintree_gateways/${_braintreeGatewayId}/braintree_payments`, params, options) as unknown as ListResponse<BraintreePayment>
	}

	async payment_methods(braintreeGatewayId: string | BraintreeGateway, params?: QueryParamsList<PaymentMethod>, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _braintreeGatewayId = (braintreeGatewayId as BraintreeGateway).id || braintreeGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `braintree_gateways/${_braintreeGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async versions(braintreeGatewayId: string | BraintreeGateway, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _braintreeGatewayId = (braintreeGatewayId as BraintreeGateway).id || braintreeGatewayId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `braintree_gateways/${_braintreeGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isBraintreeGateway(resource: any): resource is BraintreeGateway {
		return resource.type && (resource.type === BraintreeGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): BraintreeGatewayRel {
		return super.relationshipOneToOne<BraintreeGatewayRel>(id)
	}

	relationshipToMany(...ids: string[]): BraintreeGatewayRel[] {
		return super.relationshipOneToMany<BraintreeGatewayRel>(...ids)
	}


	type(): BraintreeGatewayType {
		return BraintreeGateways.TYPE
	}

}


export default BraintreeGateways

export type { BraintreeGateway, BraintreeGatewayCreate, BraintreeGatewayUpdate, BraintreeGatewayType }
