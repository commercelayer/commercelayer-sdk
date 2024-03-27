import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Attachment, AttachmentSortable } from './attachments'
import type { Version, VersionSortable } from './versions'


type ShippingZoneType = 'shipping_zones'
type ShippingZoneRel = ResourceRel & { type: ShippingZoneType }


export type ShippingZoneSortable = Pick<ShippingZone, 'id' | 'name'> & ResourceSortable
export type ShippingZoneFilterable = Pick<ShippingZone, 'id' | 'name'> & ResourceFilterable


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


class ShippingZones extends ApiResource<ShippingZone, ShippingZoneSortable> {

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

	async attachments(shippingZoneId: string | ShippingZone, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _shippingZoneId = (shippingZoneId as ShippingZone).id || shippingZoneId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `shipping_zones/${_shippingZoneId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(shippingZoneId: string | ShippingZone, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _shippingZoneId = (shippingZoneId as ShippingZone).id || shippingZoneId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `shipping_zones/${_shippingZoneId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isShippingZone(resource: any): resource is ShippingZone {
		return resource.type && (resource.type === ShippingZones.TYPE)
	}


	relationship(id: string | ResourceId | null): ShippingZoneRel {
		return super.relationshipOneToOne<ShippingZoneRel>(id)
	}

	relationshipToMany(...ids: string[]): ShippingZoneRel[] {
		return super.relationshipOneToMany<ShippingZoneRel>(...ids)
	}


	type(): ShippingZoneType {
		return ShippingZones.TYPE
	}

}


export default ShippingZones

export type { ShippingZone, ShippingZoneCreate, ShippingZoneUpdate, ShippingZoneType }

/*
export const ShippingZonesClient = (init: ResourceAdapter | ResourcesInitConfig): ShippingZones => {
	return new ShippingZones((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
