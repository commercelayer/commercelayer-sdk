import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'
import type { EventStore } from './event_stores'
import type { SatispayPayment, SatispayPaymentType } from './satispay_payments'


type SatispayGatewayType = 'satispay_gateways'
type SatispayGatewayRel = ResourceRel & { type: SatispayGatewayType }
type SatispayPaymentRel = ResourceRel & { type: SatispayPaymentType }


export type SatispayGatewaySort = Pick<SatispayGateway, 'id' | 'name' | 'disabled_at'> & ResourceSort
// export type SatispayGatewayFilter = Pick<SatispayGateway, 'id' | 'name' | 'disabled_at'> & ResourceFilter


interface SatispayGateway extends Resource {
	
	readonly type: SatispayGatewayType

	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name: string
	/** 
	 * Indicates if the payment source is forced on the editable order upon receiving a successful event from the gateway.
	 * @example ```true```
	 */
	force_payments?: boolean | null
	/** 
	 * Time at which this resource was disabled.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	disabled_at?: string | null
	/** 
	 * Activation code generated from the Satispay Dashboard.
	 * @example ```"623ECX"```
	 */
	token: string
	/** 
	 * The Satispay API key auto generated basing on activation code.
	 * @example ```"xxxx-yyyy-zzzz"```
	 */
	key_id: string
	/** 
	 * The gateway webhook URL, generated automatically.
	 * @example ```"https://core.commercelayer.co/webhook_callbacks/satispay_gateways/xxxxx"```
	 */
	webhook_endpoint_url?: string | null

	payment_methods?: PaymentMethod[] | null
	versions?: Version[] | null
	event_stores?: EventStore[] | null
	satispay_payments?: SatispayPayment[] | null

}


interface SatispayGatewayCreate extends ResourceCreate {
	
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name: string
	/** 
	 * Indicates if the payment source is forced on the editable order upon receiving a successful event from the gateway.
	 * @example ```true```
	 */
	force_payments?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```true```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```true```
	 */
	_enable?: boolean | null
	/** 
	 * Activation code generated from the Satispay Dashboard.
	 * @example ```"623ECX"```
	 */
	token: string

	satispay_payments?: SatispayPaymentRel[] | null

}


interface SatispayGatewayUpdate extends ResourceUpdate {
	
	/** 
	 * The payment gateway's internal name.
	 * @example ```"US payment gateway"```
	 */
	name?: string | null
	/** 
	 * Indicates if the payment source is forced on the editable order upon receiving a successful event from the gateway.
	 * @example ```true```
	 */
	force_payments?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as disabled.
	 * @example ```true```
	 */
	_disable?: boolean | null
	/** 
	 * Send this attribute if you want to mark this resource as enabled.
	 * @example ```true```
	 */
	_enable?: boolean | null

	satispay_payments?: SatispayPaymentRel[] | null

}


class SatispayGateways extends ApiResource<SatispayGateway> {

	static readonly TYPE: SatispayGatewayType = 'satispay_gateways' as const

	async create(resource: SatispayGatewayCreate, params?: QueryParamsRetrieve<SatispayGateway>, options?: ResourcesConfig): Promise<SatispayGateway> {
		return this.resources.create<SatispayGatewayCreate, SatispayGateway>({ ...resource, type: SatispayGateways.TYPE }, params, options)
	}

	async update(resource: SatispayGatewayUpdate, params?: QueryParamsRetrieve<SatispayGateway>, options?: ResourcesConfig): Promise<SatispayGateway> {
		return this.resources.update<SatispayGatewayUpdate, SatispayGateway>({ ...resource, type: SatispayGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: SatispayGateways.TYPE } : id, options)
	}

	async payment_methods(satispayGatewayId: string | SatispayGateway, params?: QueryParamsList<PaymentMethod>, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _satispayGatewayId = (satispayGatewayId as SatispayGateway).id || satispayGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `satispay_gateways/${_satispayGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async versions(satispayGatewayId: string | SatispayGateway, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _satispayGatewayId = (satispayGatewayId as SatispayGateway).id || satispayGatewayId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `satispay_gateways/${_satispayGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async event_stores(satispayGatewayId: string | SatispayGateway, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _satispayGatewayId = (satispayGatewayId as SatispayGateway).id || satispayGatewayId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `satispay_gateways/${_satispayGatewayId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}

	async satispay_payments(satispayGatewayId: string | SatispayGateway, params?: QueryParamsList<SatispayPayment>, options?: ResourcesConfig): Promise<ListResponse<SatispayPayment>> {
		const _satispayGatewayId = (satispayGatewayId as SatispayGateway).id || satispayGatewayId as string
		return this.resources.fetch<SatispayPayment>({ type: 'satispay_payments' }, `satispay_gateways/${_satispayGatewayId}/satispay_payments`, params, options) as unknown as ListResponse<SatispayPayment>
	}

	async _disable(id: string | SatispayGateway, params?: QueryParamsRetrieve<SatispayGateway>, options?: ResourcesConfig): Promise<SatispayGateway> {
		return this.resources.update<SatispayGatewayUpdate, SatispayGateway>({ id: (typeof id === 'string')? id: id.id, type: SatispayGateways.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | SatispayGateway, params?: QueryParamsRetrieve<SatispayGateway>, options?: ResourcesConfig): Promise<SatispayGateway> {
		return this.resources.update<SatispayGatewayUpdate, SatispayGateway>({ id: (typeof id === 'string')? id: id.id, type: SatispayGateways.TYPE, _enable: true }, params, options)
	}


	isSatispayGateway(resource: any): resource is SatispayGateway {
		return resource.type && (resource.type === SatispayGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): SatispayGatewayRel {
		return super.relationshipOneToOne<SatispayGatewayRel>(id)
	}

	relationshipToMany(...ids: string[]): SatispayGatewayRel[] {
		return super.relationshipOneToMany<SatispayGatewayRel>(...ids)
	}


	type(): SatispayGatewayType {
		return SatispayGateways.TYPE
	}

}


export default SatispayGateways

export type { SatispayGateway, SatispayGatewayCreate, SatispayGatewayUpdate, SatispayGatewayType }
