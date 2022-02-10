import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Attachment } from './attachments'


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

	static readonly TYPE: 'shipping_zones' = 'shipping_zones'
	// static readonly PATH = 'shipping_zones'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ShippingZone>> {
		return this.resources.list<ShippingZone>({ type: ShippingZones.TYPE }, params, options)
	}

	async create(resource: ShippingZoneCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingZone> {
		return this.resources.create({ ...resource, type: ShippingZones.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingZone> {
		return this.resources.retrieve<ShippingZone>({ type: ShippingZones.TYPE, id }, params, options)
	}

	async update(resource: ShippingZoneUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingZone> {
		return this.resources.update({ ...resource, type: ShippingZones.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ShippingZones.TYPE, id }, options)
	}

	async attachments(shippingZoneId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `shipping_zones/${shippingZoneId}/attachments`, params, options) as unknown as ListResponse<Attachment>
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
