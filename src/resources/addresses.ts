import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel } from '../resource'
import type { QueryParamsRetrieve } from '../query'

import type { Geocoder, GeocoderType } from './geocoders'


type AddressType = 'addresses'
type AddressRel = ResourceRel & { type: AddressType }
type GeocoderRel = ResourceRel & { type: GeocoderType }


interface Address extends Resource {
	
	readonly type: AddressType

	business?: boolean | null
	first_name?: string | null
	last_name?: string | null
	company?: string | null
	full_name?: string | null
	line_1: string
	line_2?: string | null
	city: string
	zip_code?: string | null
	state_code: string
	country_code: string
	phone: string
	full_address?: string | null
	name?: string | null
	email?: string | null
	notes?: string | null
	lat?: number | null
	lng?: number | null
	is_localized?: boolean | null
	is_geocoded?: boolean | null
	provider_name?: string | null
	map_url?: string | null
	static_map_url?: string | null
	billing_info?: string | null

	geocoder?: Geocoder | null

}


interface AddressCreate extends ResourceCreate {
	
	business?: boolean | null
	first_name?: string | null
	last_name?: string | null
	company?: string | null
	line_1: string
	line_2?: string | null
	city: string
	zip_code?: string | null
	state_code: string
	country_code: string
	phone: string
	email?: string | null
	notes?: string | null
	lat?: number | null
	lng?: number | null
	billing_info?: string | null

	geocoder?: GeocoderRel | null

}


interface AddressUpdate extends ResourceUpdate {
	
	business?: boolean | null
	first_name?: string | null
	last_name?: string | null
	company?: string | null
	line_1?: string | null
	line_2?: string | null
	city?: string | null
	zip_code?: string | null
	state_code?: string | null
	country_code?: string | null
	phone?: string | null
	email?: string | null
	notes?: string | null
	lat?: number | null
	lng?: number | null
	billing_info?: string | null

	geocoder?: GeocoderRel | null

}


class Addresses extends ApiResource<Address> {

	static readonly TYPE: AddressType = 'addresses' as const

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
