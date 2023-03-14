import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Attachment } from './attachments'


type ShippingZoneType = 'shipping_zones'
type ShippingZoneRel = ResourceRel & { type: ShippingZoneType }


interface ShippingZone extends Resource {
	
	readonly type: ShippingZoneType

	name: string
	country_code_regex?: string
	not_country_code_regex?: string
	state_code_regex?: string
	not_state_code_regex?: string
	zip_code_regex?: string
	not_zip_code_regex?: string

	attachments?: Attachment[]

}


interface ShippingZoneCreate extends ResourceCreate {
	
	name: string
	country_code_regex?: string
	not_country_code_regex?: string
	state_code_regex?: string
	not_state_code_regex?: string
	zip_code_regex?: string
	not_zip_code_regex?: string
	
}


interface ShippingZoneUpdate extends ResourceUpdate {
	
	name: string
	country_code_regex?: string
	not_country_code_regex?: string
	state_code_regex?: string
	not_state_code_regex?: string
	zip_code_regex?: string
	not_zip_code_regex?: string
	
}


class ShippingZones extends ApiResource<ShippingZone> {

	static readonly TYPE: ShippingZoneType = 'shipping_zones' as const
	// static readonly PATH = 'shipping_zones'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ShippingZone>> {
		return this.resources.list<ShippingZone>({ type: ShippingZones.TYPE }, params, options)
	}

	async create(resource: ShippingZoneCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingZone> {
		return this.resources.create<ShippingZoneCreate, ShippingZone>({ ...resource, type: ShippingZones.TYPE }, params, options)
	}

	async update(resource: ShippingZoneUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingZone> {
		return this.resources.update<ShippingZoneUpdate, ShippingZone>({ ...resource, type: ShippingZones.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: ShippingZones.TYPE } : id, options)
	}

	async attachments(shippingZoneId: string | ShippingZone, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _shippingZoneId = (shippingZoneId as ShippingZone).id || shippingZoneId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `shipping_zones/${_shippingZoneId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isShippingZone(resource: any): resource is ShippingZone {
		return resource.type && (resource.type === ShippingZones.TYPE)
	}


	relationship(id: string | ResourceId | null): ShippingZoneRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ShippingZones.TYPE } : { id: id.id, type: ShippingZones.TYPE }
	}


	type(): ShippingZoneType {
		return ShippingZones.TYPE
	}

}


export default ShippingZones

export type { ShippingZone, ShippingZoneCreate, ShippingZoneUpdate, ShippingZoneType }
