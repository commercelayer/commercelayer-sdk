import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Geocoder, GeocoderType } from './geocoders'


type AddressType = 'addresses'
type AddressRel = ResourceRel & { type: AddressType }
type GeocoderRel = ResourceRel & { type: GeocoderType }


interface Address extends Resource {
	
	readonly type: AddressType

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


class Addresses extends ApiResource<Address> {

	static readonly TYPE: AddressType = 'addresses' as const
	// static readonly PATH = 'addresses'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Address>> {
		return this.resources.list<Address>({ type: Addresses.TYPE }, params, options)
	}

	async create(resource: AddressCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		return this.resources.create<AddressCreate, Address>({ ...resource, type: Addresses.TYPE }, params, options)
	}

	async update(resource: AddressUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		return this.resources.update<AddressUpdate, Address>({ ...resource, type: Addresses.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Addresses.TYPE } : id, options)
	}

	async geocoder(addressId: string | Address, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Geocoder> {
		const _addressId = (addressId as Address).id || addressId as string
		return this.resources.fetch<Geocoder>({ type: 'geocoders' }, `addresses/${_addressId}/geocoder`, params, options) as unknown as Geocoder
	}


	isAddress(resource: any): resource is Address {
		return resource.type && (resource.type === Addresses.TYPE)
	}


	relationship(id: string | ResourceId | null): AddressRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Addresses.TYPE } : { id: id.id, type: Addresses.TYPE }
	}


	type(): AddressType {
		return Addresses.TYPE
	}

}


export default Addresses

export type { Address, AddressCreate, AddressUpdate, AddressType }
