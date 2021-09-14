/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Geocoder } from './geocoders'


type AddressRel = ResourceId & { type: typeof Addresses.TYPE }
type GeocoderRel = ResourceId & { type: 'geocoders' }


interface Address extends Resource {
	
	business?: boolean
	first_name?: string
	last_name?: string
	company?: string
	full_name?: string
	line_1?: string
	line_2?: string
	city?: string
	zip_code?: string
	state_code?: string
	country_code?: string
	phone?: string
	full_address?: string
	name?: string
	email?: string
	notes?: string
	lat?: number
	lng?: number
	is_localized?: boolean
	is_geocoded?: boolean
	provider_name?: string
	map_url?: string
	static_map_url?: string
	billing_info?: string

	geocoder?: Geocoder

}


interface AddressCreate extends ResourceCreate {
	
	business?: boolean
	first_name?: string
	last_name?: string
	company?: string
	line_1: string
	line_2?: string
	city: string
	zip_code?: string
	state_code: string
	country_code: string
	phone: string
	email?: string
	notes?: string
	lat?: number
	lng?: number
	billing_info?: string

	geocoder?: GeocoderRel

}


interface AddressUpdate extends ResourceUpdate {
	
	business?: boolean
	first_name?: string
	last_name?: string
	company?: string
	line_1?: string
	line_2?: string
	city?: string
	zip_code?: string
	state_code?: string
	country_code?: string
	phone?: string
	email?: string
	notes?: string
	lat?: number
	lng?: number
	billing_info?: string

	geocoder?: GeocoderRel

}


class Addresses extends ApiResource {

	static readonly TYPE: 'addresses' = 'addresses'
	// static readonly PATH = 'addresses'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Address>> {
		return this.resources.list({ type: Addresses.TYPE }, params, options)
	}

	async create(resource: AddressCreate, options?: ResourcesConfig): Promise<Address> {
		return this.resources.create(Object.assign(resource, { type: Addresses.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		return this.resources.retrieve<Address>({ type: Addresses.TYPE, id }, params, options)
	}

	async update(resource: AddressUpdate, options?: ResourcesConfig): Promise<Address> {
		return this.resources.update({ ...resource, type: Addresses.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Addresses.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isAddress(resource: any): resource is Address {
		return resource.type && (resource.type === Addresses.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Addresses.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Addresses.TYPE)
	}
	*/

	relationship(id: string | ResourceId): AddressRel {
		return (typeof id === 'string') ? { id, type: Addresses.TYPE } : {id: id.id, type: Addresses.TYPE }
	}

}


export default Addresses

export { Address, AddressCreate, AddressUpdate }
