import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Attachment } from './attachments'
import type { Version } from './versions'


type ShippingZoneRel = ResourceRel & { type: typeof ShippingZones.TYPE }


interface ShippingZone extends Resource {
	
	name?: string
	country_code_regex?: string
	not_country_code_regex?: string
	state_code_regex?: string
	not_state_code_regex?: string
	zip_code_regex?: string
	not_zip_code_regex?: string

	attachments?: Attachment[]
	versions?: Version[]

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
	
	name?: string
	country_code_regex?: string
	not_country_code_regex?: string
	state_code_regex?: string
	not_state_code_regex?: string
	zip_code_regex?: string
	not_zip_code_regex?: string
	
}


class ShippingZones extends ApiResource {

	static readonly TYPE: 'shipping_zones' = 'shipping_zones' as const
	// static readonly PATH = 'shipping_zones'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ShippingZone>> {
		return this.resources.list<ShippingZone>({ type: ShippingZones.TYPE }, params, options)
	}

	async create(resource: ShippingZoneCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingZone> {
		return this.resources.create<ShippingZoneCreate, ShippingZone>({ ...resource, type: ShippingZones.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingZone> {
		return this.resources.retrieve<ShippingZone>({ type: ShippingZones.TYPE, id }, params, options)
	}

	async update(resource: ShippingZoneUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingZone> {
		return this.resources.update<ShippingZoneUpdate, ShippingZone>({ ...resource, type: ShippingZones.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ShippingZones.TYPE, id }, options)
	}

	async attachments(shippingZoneId: string | ShippingZone, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _shippingZoneId = (shippingZoneId as ShippingZone).id || shippingZoneId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `shipping_zones/${_shippingZoneId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(shippingZoneId: string | ShippingZone, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _shippingZoneId = (shippingZoneId as ShippingZone).id || shippingZoneId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `shipping_zones/${_shippingZoneId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isShippingZone(resource: any): resource is ShippingZone {
		return resource.type && (resource.type === ShippingZones.TYPE)
	}


	relationship(id: string | ResourceId | null): ShippingZoneRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: ShippingZones.TYPE } : { id: id.id, type: ShippingZones.TYPE }
	}


	type(): string {
		return ShippingZones.TYPE
	}

}


export default ShippingZones

export { ShippingZone, ShippingZoneCreate, ShippingZoneUpdate }
