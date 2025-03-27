import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'
import type { KlarnaPayment, KlarnaPaymentType } from './klarna_payments'


type KlarnaGatewayType = 'klarna_gateways'
type KlarnaGatewayRel = ResourceRel & { type: KlarnaGatewayType }
type KlarnaPaymentRel = ResourceRel & { type: KlarnaPaymentType }


export type KlarnaGatewaySort = Pick<KlarnaGateway, 'id' | 'name'> & ResourceSort
// export type KlarnaGatewayFilter = Pick<KlarnaGateway, 'id' | 'name'> & ResourceFilter


interface KlarnaGateway extends Resource {
	
	readonly type: KlarnaGatewayType

	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name: string

	payment_methods?: PaymentMethod[] | null
	versions?: Version[] | null
	klarna_payments?: KlarnaPayment[] | null

}


interface KlarnaGatewayCreate extends ResourceCreate {
	
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name: string
	/** 
	 * The gateway country code one of EU, US, or OC.
	 * @example ```"EU"```
	 */
	country_code: string
	/** 
	 * The public key linked to your API credential.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	api_key: string
	/** 
	 * The gateway API key.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	api_secret: string

	klarna_payments?: KlarnaPaymentRel[] | null

}


interface KlarnaGatewayUpdate extends ResourceUpdate {
	
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name?: string | null
	/** 
	 * The gateway country code one of EU, US, or OC.
	 * @example ```"EU"```
	 */
	country_code?: string | null
	/** 
	 * The public key linked to your API credential.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	api_key?: string | null
	/** 
	 * The gateway API key.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	api_secret?: string | null

	klarna_payments?: KlarnaPaymentRel[] | null

}


class KlarnaGateways extends ApiResource<KlarnaGateway> {

	static readonly TYPE: KlarnaGatewayType = 'klarna_gateways' as const

	async create(resource: KlarnaGatewayCreate, params?: QueryParamsRetrieve<KlarnaGateway>, options?: ResourcesConfig): Promise<KlarnaGateway> {
		return this.resources.create<KlarnaGatewayCreate, KlarnaGateway>({ ...resource, type: KlarnaGateways.TYPE }, params, options)
	}

	async update(resource: KlarnaGatewayUpdate, params?: QueryParamsRetrieve<KlarnaGateway>, options?: ResourcesConfig): Promise<KlarnaGateway> {
		return this.resources.update<KlarnaGatewayUpdate, KlarnaGateway>({ ...resource, type: KlarnaGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: KlarnaGateways.TYPE } : id, options)
	}

	async payment_methods(klarnaGatewayId: string | KlarnaGateway, params?: QueryParamsList<PaymentMethod>, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _klarnaGatewayId = (klarnaGatewayId as KlarnaGateway).id || klarnaGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `klarna_gateways/${_klarnaGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async versions(klarnaGatewayId: string | KlarnaGateway, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _klarnaGatewayId = (klarnaGatewayId as KlarnaGateway).id || klarnaGatewayId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `klarna_gateways/${_klarnaGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async klarna_payments(klarnaGatewayId: string | KlarnaGateway, params?: QueryParamsList<KlarnaPayment>, options?: ResourcesConfig): Promise<ListResponse<KlarnaPayment>> {
		const _klarnaGatewayId = (klarnaGatewayId as KlarnaGateway).id || klarnaGatewayId as string
		return this.resources.fetch<KlarnaPayment>({ type: 'klarna_payments' }, `klarna_gateways/${_klarnaGatewayId}/klarna_payments`, params, options) as unknown as ListResponse<KlarnaPayment>
	}


	isKlarnaGateway(resource: any): resource is KlarnaGateway {
		return resource.type && (resource.type === KlarnaGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): KlarnaGatewayRel {
		return super.relationshipOneToOne<KlarnaGatewayRel>(id)
	}

	relationshipToMany(...ids: string[]): KlarnaGatewayRel[] {
		return super.relationshipOneToMany<KlarnaGatewayRel>(...ids)
	}


	type(): KlarnaGatewayType {
		return KlarnaGateways.TYPE
	}

}


const instance = new KlarnaGateways()
export default instance

export type { KlarnaGateway, KlarnaGatewayCreate, KlarnaGatewayUpdate, KlarnaGatewayType }
