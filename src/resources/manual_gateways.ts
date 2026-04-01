import type { QueryParamsList, QueryParamsRetrieve } from '../query'
import type { ListResponse, Resource, ResourceCreate, ResourceId, ResourceRel, ResourceSort, /* ResourceFilter */ ResourcesConfig, ResourceUpdate, } from '../resource'
import { ApiResource } from '../resource'
import type { EventStore } from './event_stores'
import type { PaymentMethod } from './payment_methods'
import type { Version } from './versions'


type ManualGatewayType = 'manual_gateways'
type ManualGatewayRel = ResourceRel & { type: ManualGatewayType }


export type ManualGatewaySort = Pick<ManualGateway, 'id' | 'name' | 'disabled_at'> & ResourceSort
// export type ManualGatewayFilter = Pick<ManualGateway, 'id' | 'name' | 'disabled_at'> & ResourceFilter


interface ManualGateway extends Resource {
	
	readonly type: ManualGatewayType

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

	payment_methods?: PaymentMethod[] | null
	versions?: Version[] | null
	event_stores?: EventStore[] | null

}


interface ManualGatewayCreate extends ResourceCreate {
	
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
	
}


interface ManualGatewayUpdate extends ResourceUpdate {
	
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
	
}


class ManualGateways extends ApiResource<ManualGateway> {

	static readonly TYPE: ManualGatewayType = 'manual_gateways' as const

	async create(resource: ManualGatewayCreate, params?: QueryParamsRetrieve<ManualGateway>, options?: ResourcesConfig): Promise<ManualGateway> {
		return this.resources.create<ManualGatewayCreate, ManualGateway>({ ...resource, type: ManualGateways.TYPE }, params, options)
	}

	async update(resource: ManualGatewayUpdate, params?: QueryParamsRetrieve<ManualGateway>, options?: ResourcesConfig): Promise<ManualGateway> {
		return this.resources.update<ManualGatewayUpdate, ManualGateway>({ ...resource, type: ManualGateways.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ManualGateways.TYPE } : id, options)
	}

	async payment_methods(manualGatewayId: string | ManualGateway, params?: QueryParamsList<PaymentMethod>, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>> {
		const _manualGatewayId = (manualGatewayId as ManualGateway).id || manualGatewayId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `manual_gateways/${_manualGatewayId}/payment_methods`, params, options) as unknown as ListResponse<PaymentMethod>
	}

	async versions(manualGatewayId: string | ManualGateway, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _manualGatewayId = (manualGatewayId as ManualGateway).id || manualGatewayId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `manual_gateways/${_manualGatewayId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async event_stores(manualGatewayId: string | ManualGateway, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _manualGatewayId = (manualGatewayId as ManualGateway).id || manualGatewayId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `manual_gateways/${_manualGatewayId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}

	async _disable(id: string | ManualGateway, params?: QueryParamsRetrieve<ManualGateway>, options?: ResourcesConfig): Promise<ManualGateway> {
		return this.resources.update<ManualGatewayUpdate, ManualGateway>({ id: (typeof id === 'string')? id: id.id, type: ManualGateways.TYPE, _disable: true }, params, options)
	}

	async _enable(id: string | ManualGateway, params?: QueryParamsRetrieve<ManualGateway>, options?: ResourcesConfig): Promise<ManualGateway> {
		return this.resources.update<ManualGatewayUpdate, ManualGateway>({ id: (typeof id === 'string')? id: id.id, type: ManualGateways.TYPE, _enable: true }, params, options)
	}


	isManualGateway(resource: any): resource is ManualGateway {
		return resource.type && (resource.type === ManualGateways.TYPE)
	}


	relationship(id: string | ResourceId | null): ManualGatewayRel {
		return super.relationshipOneToOne<ManualGatewayRel>(id)
	}

	relationshipToMany(...ids: string[]): ManualGatewayRel[] {
		return super.relationshipOneToMany<ManualGatewayRel>(...ids)
	}


	type(): ManualGatewayType {
		return ManualGateways.TYPE
	}

}


const instance = new ManualGateways()
export default instance

export type { ManualGateway, ManualGatewayCreate, ManualGateways, ManualGatewayType, ManualGatewayUpdate }
