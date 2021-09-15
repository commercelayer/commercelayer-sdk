/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Attachment } from './attachments'


type ShippingZoneRel = ResourceId & { type: typeof ShippingZones.TYPE }


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
		return this.resources.list({ type: ShippingZones.TYPE }, params, options)
	}

	async create(resource: ShippingZoneCreate, options?: ResourcesConfig): Promise<ShippingZone> {
		return this.resources.create(Object.assign(resource, { type: ShippingZones.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingZone> {
		return this.resources.retrieve<ShippingZone>({ type: ShippingZones.TYPE, id }, params, options)
	}

	async update(resource: ShippingZoneUpdate, options?: ResourcesConfig): Promise<ShippingZone> {
		return this.resources.update({ ...resource, type: ShippingZones.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: ShippingZones.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isShippingZone(resource: any): resource is ShippingZone {
		return resource.type && (resource.type === ShippingZones.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(ShippingZones.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(ShippingZones.TYPE)
	}
	*/

	relationship(id: string | ResourceId): ShippingZoneRel {
		return (typeof id === 'string') ? { id, type: ShippingZones.TYPE } : {id: id.id, type: ShippingZones.TYPE }
	}

}


export default ShippingZones

export { ShippingZone, ShippingZoneCreate, ShippingZoneUpdate }
