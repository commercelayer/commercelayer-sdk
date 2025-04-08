import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'
import type { ExternalPayment } from './external_payments'


type ExternalGatewayType = 'external_gateways'
type ExternalGatewayRel = ResourceRel & { type: ExternalGatewayType }


export type ExternalGatewaySort = Pick<ExternalGateway, 'id' | 'name' | 'circuit_state' | 'circuit_failure_count'> & ResourceSort
// export type ExternalGatewayFilter = Pick<ExternalGateway, 'id' | 'name' | 'circuit_state' | 'circuit_failure_count'> & ResourceFilter


interface ExternalGateway extends Resource {
	
	readonly type: ExternalGatewayType

	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name: string
	/** 
	 * The endpoint used by the external gateway to authorize payments.
	 * @example ```"https://external_gateway.com/authorize"```
	 */
	authorize_url?: string | null
	/** 
	 * The endpoint used by the external gateway to capture payments.
	 * @example ```"https://external_gateway.com/capture"```
	 */
	capture_url?: string | null
	/** 
	 * The endpoint used by the external gateway to void payments.
	 * @example ```"https://external_gateway.com/void"```
	 */
	void_url?: string | null
	/** 
	 * The endpoint used by the external gateway to refund payments.
	 * @example ```"https://external_gateway.com/refund"```
	 */
	refund_url?: string | null
	/** 
	 * The endpoint used by the external gateway to create a customer payment token.
	 * @example ```"https://external_gateway.com/token"```
	 */
	token_url?: string | null
	/** 
	 * The circuit breaker state, by default it is 'closed'. It can become 'open' once the number of consecutive failures overlaps the specified threshold, in such case no further calls to the failing callback are made.
	 * @example ```"closed"```
	 */
	circuit_state?: string | null
	/** 
	 * The number of consecutive failures recorded by the circuit breaker associated to this resource, will be reset on first successful call to callback.
	 * @example ```5```
	 */
	circuit_failure_count?: number | null
	/** 
	 * The shared secret used to sign the external request payload.
	 * @example ```"1c0994cc4e996e8c6ee56a2198f66f3c"```
	 */
	shared_secret: string

	payment_methods?: PaymentMethod[] | null
	versions?: Version[] | null
	external_payments?: ExternalPayment[] | null

}


interface ExternalGatewayCreate extends ResourceCreate {
	
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name: string
	/** 
	 * The endpoint used by the external gateway to authorize payments.
	 * @example ```"https://external_gateway.com/authorize"```
	 */
	authorize_url?: string | null
	/** 
	 * The endpoint used by the external gateway to capture payments.
	 * @example ```"https://external_gateway.com/capture"```
	 */
	capture_url?: string | null
	/** 
	 * The endpoint used by the external gateway to void payments.
	 * @example ```"https://external_gateway.com/void"```
	 */
	void_url?: string | null
	/** 
	 * The endpoint used by the external gateway to refund payments.
	 * @example ```"https://external_gateway.com/refund"```
	 */
	refund_url?: string | null
	/** 
	 * The endpoint used by the external gateway to create a customer payment token.
	 * @example ```"https://external_gateway.com/token"```
	 */
	token_url?: string | null
	
}


interface ExternalGatewayUpdate extends ResourceUpdate {
	
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name?: string | null
	/** 
	 * The endpoint used by the external gateway to authorize payments.
	 * @example ```"https://external_gateway.com/authorize"```
	 */
	authorize_url?: string | null
	/** 
	 * The endpoint used by the external gateway to capture payments.
	 * @example ```"https://external_gateway.com/capture"```
	 */
	capture_url?: string | null
	/** 
	 * The endpoint used by the external gateway to void payments.
	 * @example ```"https://external_gateway.com/void"```
	 */
	void_url?: string | null
	/** 
	 * The endpoint used by the external gateway to refund payments.
	 * @example ```"https://external_gateway.com/refund"```
	 */
	refund_url?: string | null
	/** 
	 * The endpoint used by the external gateway to create a customer payment token.
	 * @example ```"https://external_gateway.com/token"```
	 */
	token_url?: string | null
	/** 
	 * Send this attribute if you want to reset the circuit breaker associated to this resource to 'closed' state and zero failures count. Cannot be passed by sales channels.
	 * @example ```true```
	 */
	_reset_circuit?: boolean | null
	
}


class ExternalGateways extends ApiResource<ExternalGateway> {

	static readonly TYPE: ExternalGatewayType = 'external_gateways' as const

	async create(resource: ExternalGatewayCreate, params?: QueryParamsRetrieve<ExternalGateway>, options?: ResourcesConfig): Promise<ExternalGateway> {
		return this.resources.create<ExternalGatewayCreate, ExternalGateway>({ ...resource, type: ExternalGateways.TYPE }, params, options)
	}

	async update(resource: ExternalGatewayUpdate, params?: QueryParamsRetrieve<ExternalGateway>, options?: ResourcesConfig): Promise<ExternalGateway> {
		return this.resources.update<ExternalGatewayUpdate, ExternalGateway>({ ...resource, type: ExternalGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ExternalGateways.TYPE } : id, options)
	}

	async payment_methods(externalGatewayId: string | ExternalGateway, params?: QueryParamsList<PaymentMethod>, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _externalGatewayId = (externalGatewayId as ExternalGateway).id || externalGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `external_gateways/${_externalGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async versions(externalGatewayId: string | ExternalGateway, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _externalGatewayId = (externalGatewayId as ExternalGateway).id || externalGatewayId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `external_gateways/${_externalGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async external_payments(externalGatewayId: string | ExternalGateway, params?: QueryParamsList<ExternalPayment>, options?: ResourcesConfig): Promise<ListResponse<ExternalPayment>> {
		const _externalGatewayId = (externalGatewayId as ExternalGateway).id || externalGatewayId as string
		return this.resources.fetch<ExternalPayment>({ type: 'external_payments' }, `external_gateways/${_externalGatewayId}/external_payments`, params, options) as unknown as ListResponse<ExternalPayment>
	}

	async _reset_circuit(id: string | ExternalGateway, params?: QueryParamsRetrieve<ExternalGateway>, options?: ResourcesConfig): Promise<ExternalGateway> {
		return this.resources.update<ExternalGatewayUpdate, ExternalGateway>({ id: (typeof id === 'string')? id: id.id, type: ExternalGateways.TYPE, _reset_circuit: true }, params, options)
	}


	isExternalGateway(resource: any): resource is ExternalGateway {
		return resource.type && (resource.type === ExternalGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): ExternalGatewayRel {
		return super.relationshipOneToOne<ExternalGatewayRel>(id)
	}

	relationshipToMany(...ids: string[]): ExternalGatewayRel[] {
		return super.relationshipOneToMany<ExternalGatewayRel>(...ids)
	}


	type(): ExternalGatewayType {
		return ExternalGateways.TYPE
	}

}


const instance = new ExternalGateways()
export default instance

export type { ExternalGateways, ExternalGateway, ExternalGatewayCreate, ExternalGatewayUpdate, ExternalGatewayType }
