import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Geocoder, GeocoderType } from './geocoders'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'


type AddressType = 'addresses'
type AddressRel = ResourceRel & { type: AddressType }
type GeocoderRel = ResourceRel & { type: GeocoderType }
type TagRel = ResourceRel & { type: TagType }


export type AddressSort = Pick<Address, 'id' | 'city' | 'state_code' | 'country_code'> & ResourceSort
// export type AddressFilter = Pick<Address, 'id' | 'business' | 'first_name' | 'last_name' | 'company' | 'line_1' | 'line_2' | 'city' | 'zip_code' | 'state_code' | 'country_code' | 'phone' | 'email' | 'notes' | 'lat' | 'lng' | 'billing_info'> & ResourceFilter


interface Address extends Resource {
	
	readonly type: AddressType

	business?: Nullable<boolean>
	first_name?: Nullable<string>
	last_name?: Nullable<string>
	company?: Nullable<string>
	full_name?: Nullable<string>
	line_1: string
	line_2?: Nullable<string>
	city: string
	zip_code?: Nullable<string>
	state_code: string
	country_code: string
	phone: string
	full_address?: Nullable<string>
	name?: Nullable<string>
	email?: Nullable<string>
	notes?: Nullable<string>
	lat?: Nullable<number>
	lng?: Nullable<number>
	is_localized?: Nullable<boolean>
	is_geocoded?: Nullable<boolean>
	provider_name?: Nullable<string>
	map_url?: Nullable<string>
	static_map_url?: Nullable<string>
	billing_info?: Nullable<string>

	geocoder?: Nullable<Geocoder>
	events?: Nullable<Event[]>
	tags?: Nullable<Tag[]>
	versions?: Nullable<Version[]>

}


interface AddressCreate extends ResourceCreate {
	
	business?: Nullable<boolean>
	first_name?: Nullable<string>
	last_name?: Nullable<string>
	company?: Nullable<string>
	line_1: string
	line_2?: Nullable<string>
	city: string
	zip_code?: Nullable<string>
	state_code: string
	country_code: string
	phone: string
	email?: Nullable<string>
	notes?: Nullable<string>
	lat?: Nullable<number>
	lng?: Nullable<number>
	billing_info?: Nullable<string>

	geocoder?: Nullable<GeocoderRel>
	tags?: Nullable<TagRel[]>

}


interface AddressUpdate extends ResourceUpdate {
	
	business?: Nullable<boolean>
	first_name?: Nullable<string>
	last_name?: Nullable<string>
	company?: Nullable<string>
	line_1?: Nullable<string>
	line_2?: Nullable<string>
	city?: Nullable<string>
	zip_code?: Nullable<string>
	state_code?: Nullable<string>
	country_code?: Nullable<string>
	phone?: Nullable<string>
	email?: Nullable<string>
	notes?: Nullable<string>
	lat?: Nullable<number>
	lng?: Nullable<number>
	billing_info?: Nullable<string>

	geocoder?: Nullable<GeocoderRel>
	tags?: Nullable<TagRel[]>

}


class Addresses extends ApiResource<Address> {

	static readonly TYPE: AddressType = 'addresses' as const

	async create(resource: AddressCreate, params?: QueryParamsRetrieve<Address>, options?: ResourcesConfig): Promise<Address> {
		return this.resources.create<AddressCreate, Address>({ ...resource, type: Addresses.TYPE }, params, options)
	}

	async update(resource: AddressUpdate, params?: QueryParamsRetrieve<Address>, options?: ResourcesConfig): Promise<Address> {
		return this.resources.update<AddressUpdate, Address>({ ...resource, type: Addresses.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Addresses.TYPE } : id, options)
	}

	async geocoder(addressId: string | Address, params?: QueryParamsRetrieve<Geocoder>, options?: ResourcesConfig): Promise<Geocoder> {
		const _addressId = (addressId as Address).id || addressId as string
		return this.resources.fetch<Geocoder>({ type: 'geocoders' }, `addresses/${_addressId}/geocoder`, params, options) as unknown as Geocoder
	}

	async events(addressId: string | Address, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _addressId = (addressId as Address).id || addressId as string
		return this.resources.fetch<Event>({ type: 'events' }, `addresses/${_addressId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(addressId: string | Address, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _addressId = (addressId as Address).id || addressId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `addresses/${_addressId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(addressId: string | Address, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _addressId = (addressId as Address).id || addressId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `addresses/${_addressId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isAddress(resource: any): resource is Address {
		return resource.type && (resource.type === Addresses.TYPE)
	}


	relationship(id: string | ResourceId | null): AddressRel {
		return super.relationshipOneToOne<AddressRel>(id)
	}

	relationshipToMany(...ids: string[]): AddressRel[] {
		return super.relationshipOneToMany<AddressRel>(...ids)
	}


	type(): AddressType {
		return Addresses.TYPE
	}

}


export default Addresses

export type { Address, AddressCreate, AddressUpdate, AddressType }
