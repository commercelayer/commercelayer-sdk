import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { AxervePayment, AxervePaymentType } from './axerve_payments'
import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'


type AxerveGatewayType = 'axerve_gateways'
type AxerveGatewayRel = ResourceRel & { type: AxerveGatewayType }
type AxervePaymentRel = ResourceRel & { type: AxervePaymentType }


export type AxerveGatewaySort = Pick<AxerveGateway, 'id' | 'name'> & ResourceSort
// export type AxerveGatewayFilter = Pick<AxerveGateway, 'id' | 'name'> & ResourceFilter


interface AxerveGateway extends Resource {
	
	readonly type: AxerveGatewayType

	/** 
	 * The merchant login code.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	login: string
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name: string
	/** 
	 * The gateway webhook URL, generated automatically.
	 * @example ```"https://core.commercelayer.co/webhook_callbacks/axerve_gateways/xxxxx"```
	 */
	webhook_endpoint_url?: string | null

	axerve_payments?: AxervePayment[] | null
	payment_methods?: PaymentMethod[] | null
	versions?: Version[] | null

}


interface AxerveGatewayCreate extends ResourceCreate {
	
	/** 
	 * The gateway API key.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	api_key: string
	/** 
	 * The merchant login code.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	login: string
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name: string

	axerve_payments?: AxervePaymentRel[] | null

}


interface AxerveGatewayUpdate extends ResourceUpdate {
	
	/** 
	 * The gateway API key.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	api_key?: string | null
	/** 
	 * The merchant login code.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	login?: string | null
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name?: string | null

	axerve_payments?: AxervePaymentRel[] | null

}


class AxerveGateways extends ApiResource<AxerveGateway> {

	static readonly TYPE: AxerveGatewayType = 'axerve_gateways' as const

	async create(resource: AxerveGatewayCreate, params?: QueryParamsRetrieve<AxerveGateway>, options?: ResourcesConfig): Promise<AxerveGateway> {
		return this.resources.create<AxerveGatewayCreate, AxerveGateway>({ ...resource, type: AxerveGateways.TYPE }, params, options)
	}

	async update(resource: AxerveGatewayUpdate, params?: QueryParamsRetrieve<AxerveGateway>, options?: ResourcesConfig): Promise<AxerveGateway> {
		return this.resources.update<AxerveGatewayUpdate, AxerveGateway>({ ...resource, type: AxerveGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: AxerveGateways.TYPE } : id, options)
	}

	async axerve_payments(axerveGatewayId: string | AxerveGateway, params?: QueryParamsList<AxervePayment>, options?: ResourcesConfig): Promise<ListResponse<AxervePayment>> {
		const _axerveGatewayId = (axerveGatewayId as AxerveGateway).id || axerveGatewayId as string
		return this.resources.fetch<AxervePayment>({ type: 'axerve_payments' }, `axerve_gateways/${_axerveGatewayId}/axerve_payments`, params, options) as unknown as ListResponse<AxervePayment>
	}

	async payment_methods(axerveGatewayId: string | AxerveGateway, params?: QueryParamsList<PaymentMethod>, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _axerveGatewayId = (axerveGatewayId as AxerveGateway).id || axerveGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `axerve_gateways/${_axerveGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async versions(axerveGatewayId: string | AxerveGateway, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _axerveGatewayId = (axerveGatewayId as AxerveGateway).id || axerveGatewayId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `axerve_gateways/${_axerveGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isAxerveGateway(resource: any): resource is AxerveGateway {
		return resource.type && (resource.type === AxerveGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): AxerveGatewayRel {
		return super.relationshipOneToOne<AxerveGatewayRel>(id)
	}

	relationshipToMany(...ids: string[]): AxerveGatewayRel[] {
		return super.relationshipOneToMany<AxerveGatewayRel>(...ids)
	}


	type(): AxerveGatewayType {
		return AxerveGateways.TYPE
	}

}


export default AxerveGateways

export type { AxerveGateway, AxerveGatewayCreate, AxerveGatewayUpdate, AxerveGatewayType }
