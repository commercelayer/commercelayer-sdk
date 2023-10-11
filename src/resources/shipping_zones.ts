import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Attachment } from './attachments'
import type { Version } from './versions'


type ShippingZoneType = 'shipping_zones'
type ShippingZoneRel = ResourceRel & { type: ShippingZoneType }


interface ShippingZone extends Resource {
	
	readonly type: ShippingZoneType

	name: string
	country_code_regex?: string | null
	not_country_code_regex?: string | null
	state_code_regex?: string | null
	not_state_code_regex?: string | null
	zip_code_regex?: string | null
	not_zip_code_regex?: string | null

	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface ShippingZoneCreate extends ResourceCreate {
	
	name: string
	country_code_regex?: string | null
	not_country_code_regex?: string | null
	state_code_regex?: string | null
	not_state_code_regex?: string | null
	zip_code_regex?: string | null
	not_zip_code_regex?: string | null
	
}


interface ShippingZoneUpdate extends ResourceUpdate {
	
	name?: string | null
	country_code_regex?: string | null
	not_country_code_regex?: string | null
	state_code_regex?: string | null
	not_state_code_regex?: string | null
	zip_code_regex?: string | null
	not_zip_code_regex?: string | null
	
}


class ShippingZones extends ApiResource<ShippingZone> {

	static readonly TYPE: ShippingZoneType = 'shipping_zones' as const

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

	async versions(shippingZoneId: string | ShippingZone, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _shippingZoneId = (shippingZoneId as ShippingZone).id || shippingZoneId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `shipping_zones/${_shippingZoneId}/versions`, params, options) as unknown as ListResponse<Version>
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


	parse(payload: any): ShippingZone | ShippingZone[] {
		return super.parse(payload)
	}

}


export default ShippingZones

export type { ShippingZone, ShippingZoneCreate, ShippingZoneUpdate, ShippingZoneType }
