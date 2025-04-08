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

	/** 
	 * Indicates if it's a business or a personal address.
	 */
	business?: boolean | null
	/** 
	 * Address first name (personal).
	 * @example ```"John"```
	 */
	first_name?: string | null
	/** 
	 * Address last name (personal).
	 * @example ```"Smith"```
	 */
	last_name?: string | null
	/** 
	 * Address company name (business).
	 * @example ```"The Red Brand Inc."```
	 */
	company?: string | null
	/** 
	 * Company name (business) of first name and last name (personal).
	 * @example ```"John Smith"```
	 */
	full_name?: string | null
	/** 
	 * Address line 1, i.e. Street address, PO Box.
	 * @example ```"2883 Geraldine Lane"```
	 */
	line_1: string
	/** 
	 * Address line 2, i.e. Apartment, Suite, Building.
	 * @example ```"Apt.23"```
	 */
	line_2?: string | null
	/** 
	 * Address city.
	 * @example ```"New York"```
	 */
	city: string
	/** 
	 * ZIP or postal code.
	 * @example ```"10013"```
	 */
	zip_code?: string | null
	/** 
	 * State, province or region code.
	 * @example ```"NY"```
	 */
	state_code: string
	/** 
	 * The international 2-letter country code as defined by the ISO 3166-1 standard.
	 * @example ```"US"```
	 */
	country_code: string
	/** 
	 * Phone number (including extension).
	 * @example ```"(212) 646-338-1228"```
	 */
	phone: string
	/** 
	 * Compact description of the address location, without the full name.
	 * @example ```"2883 Geraldine Lane Apt.23, 10013 New York NY (US) (212) 646-338-1228"```
	 */
	full_address?: string | null
	/** 
	 * Compact description of the address location, including the full name.
	 * @example ```"John Smith, 2883 Geraldine Lane Apt.23, 10013 New York NY (US) (212) 646-338-1228"```
	 */
	name?: string | null
	/** 
	 * Email address.
	 * @example ```"john@example.com"```
	 */
	email?: string | null
	/** 
	 * A free notes attached to the address. When used as a shipping address, this can be useful to let the customers add specific delivery instructions.
	 * @example ```"Please ring the bell twice"```
	 */
	notes?: string | null
	/** 
	 * The address geocoded latitude. This is automatically generated when creating a shipping/billing address for an order and a valid geocoder is attached to the order's market.
	 * @example ```40.6971494```
	 */
	lat?: number | null
	/** 
	 * The address geocoded longitude. This is automatically generated when creating a shipping/billing address for an order and a valid geocoder is attached to the order's market.
	 * @example ```-74.2598672```
	 */
	lng?: number | null
	/** 
	 * Indicates if the latitude and logitude are present, either geocoded or manually updated.
	 * @example ```true```
	 */
	is_localized?: boolean | null
	/** 
	 * Indicates if the address has been successfully geocoded.
	 * @example ```true```
	 */
	is_geocoded?: boolean | null
	/** 
	 * The geocoder provider name (either Google or Bing).
	 * @example ```"google"```
	 */
	provider_name?: string | null
	/** 
	 * The map url of the geocoded address (if geocoded).
	 * @example ```"https://www.google.com/maps/search/?api=1&query=40.6971494,-74.2598672"```
	 */
	map_url?: string | null
	/** 
	 * The static map image url of the geocoded address (if geocoded).
	 * @example ```"https://maps.googleapis.com/maps/api/staticmap?center=40.6971494,-74.2598672&size=640x320&zoom=15"```
	 */
	static_map_url?: string | null
	/** 
	 * Customer's billing information (i.e. VAT number, codice fiscale).
	 * @example ```"VAT ID IT02382940977"```
	 */
	billing_info?: string | null

	geocoder?: Geocoder | null
	events?: Event[] | null
	tags?: Tag[] | null
	versions?: Version[] | null

}


interface AddressCreate extends ResourceCreate {
	
	/** 
	 * Indicates if it's a business or a personal address.
	 */
	business?: boolean | null
	/** 
	 * Address first name (personal).
	 * @example ```"John"```
	 */
	first_name?: string | null
	/** 
	 * Address last name (personal).
	 * @example ```"Smith"```
	 */
	last_name?: string | null
	/** 
	 * Address company name (business).
	 * @example ```"The Red Brand Inc."```
	 */
	company?: string | null
	/** 
	 * Address line 1, i.e. Street address, PO Box.
	 * @example ```"2883 Geraldine Lane"```
	 */
	line_1: string
	/** 
	 * Address line 2, i.e. Apartment, Suite, Building.
	 * @example ```"Apt.23"```
	 */
	line_2?: string | null
	/** 
	 * Address city.
	 * @example ```"New York"```
	 */
	city: string
	/** 
	 * ZIP or postal code.
	 * @example ```"10013"```
	 */
	zip_code?: string | null
	/** 
	 * State, province or region code.
	 * @example ```"NY"```
	 */
	state_code: string
	/** 
	 * The international 2-letter country code as defined by the ISO 3166-1 standard.
	 * @example ```"US"```
	 */
	country_code: string
	/** 
	 * Phone number (including extension).
	 * @example ```"(212) 646-338-1228"```
	 */
	phone: string
	/** 
	 * Email address.
	 * @example ```"john@example.com"```
	 */
	email?: string | null
	/** 
	 * A free notes attached to the address. When used as a shipping address, this can be useful to let the customers add specific delivery instructions.
	 * @example ```"Please ring the bell twice"```
	 */
	notes?: string | null
	/** 
	 * The address geocoded latitude. This is automatically generated when creating a shipping/billing address for an order and a valid geocoder is attached to the order's market.
	 * @example ```40.6971494```
	 */
	lat?: number | null
	/** 
	 * The address geocoded longitude. This is automatically generated when creating a shipping/billing address for an order and a valid geocoder is attached to the order's market.
	 * @example ```-74.2598672```
	 */
	lng?: number | null
	/** 
	 * Customer's billing information (i.e. VAT number, codice fiscale).
	 * @example ```"VAT ID IT02382940977"```
	 */
	billing_info?: string | null

	geocoder?: GeocoderRel | null
	tags?: TagRel[] | null

}


interface AddressUpdate extends ResourceUpdate {
	
	/** 
	 * Indicates if it's a business or a personal address.
	 */
	business?: boolean | null
	/** 
	 * Address first name (personal).
	 * @example ```"John"```
	 */
	first_name?: string | null
	/** 
	 * Address last name (personal).
	 * @example ```"Smith"```
	 */
	last_name?: string | null
	/** 
	 * Address company name (business).
	 * @example ```"The Red Brand Inc."```
	 */
	company?: string | null
	/** 
	 * Address line 1, i.e. Street address, PO Box.
	 * @example ```"2883 Geraldine Lane"```
	 */
	line_1?: string | null
	/** 
	 * Address line 2, i.e. Apartment, Suite, Building.
	 * @example ```"Apt.23"```
	 */
	line_2?: string | null
	/** 
	 * Address city.
	 * @example ```"New York"```
	 */
	city?: string | null
	/** 
	 * ZIP or postal code.
	 * @example ```"10013"```
	 */
	zip_code?: string | null
	/** 
	 * State, province or region code.
	 * @example ```"NY"```
	 */
	state_code?: string | null
	/** 
	 * The international 2-letter country code as defined by the ISO 3166-1 standard.
	 * @example ```"US"```
	 */
	country_code?: string | null
	/** 
	 * Phone number (including extension).
	 * @example ```"(212) 646-338-1228"```
	 */
	phone?: string | null
	/** 
	 * Email address.
	 * @example ```"john@example.com"```
	 */
	email?: string | null
	/** 
	 * A free notes attached to the address. When used as a shipping address, this can be useful to let the customers add specific delivery instructions.
	 * @example ```"Please ring the bell twice"```
	 */
	notes?: string | null
	/** 
	 * The address geocoded latitude. This is automatically generated when creating a shipping/billing address for an order and a valid geocoder is attached to the order's market.
	 * @example ```40.6971494```
	 */
	lat?: number | null
	/** 
	 * The address geocoded longitude. This is automatically generated when creating a shipping/billing address for an order and a valid geocoder is attached to the order's market.
	 * @example ```-74.2598672```
	 */
	lng?: number | null
	/** 
	 * Customer's billing information (i.e. VAT number, codice fiscale).
	 * @example ```"VAT ID IT02382940977"```
	 */
	billing_info?: string | null
	/** 
	 * Comma separated list of tags to be added. Duplicates, invalid and non existing ones are discarded. Cannot be passed by sales channels.
	 */
	_add_tags?: string | null
	/** 
	 * Comma separated list of tags to be removed. Duplicates, invalid and non existing ones are discarded. Cannot be passed by sales channels.
	 */
	_remove_tags?: string | null

	geocoder?: GeocoderRel | null
	tags?: TagRel[] | null

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

	async _add_tags(id: string | Address, triggerValue: string, params?: QueryParamsRetrieve<Address>, options?: ResourcesConfig): Promise<Address> {
		return this.resources.update<AddressUpdate, Address>({ id: (typeof id === 'string')? id: id.id, type: Addresses.TYPE, _add_tags: triggerValue }, params, options)
	}

	async _remove_tags(id: string | Address, triggerValue: string, params?: QueryParamsRetrieve<Address>, options?: ResourcesConfig): Promise<Address> {
		return this.resources.update<AddressUpdate, Address>({ id: (typeof id === 'string')? id: id.id, type: Addresses.TYPE, _remove_tags: triggerValue }, params, options)
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


const instance = new Addresses()
export default instance

export type { Addresses, Address, AddressCreate, AddressUpdate, AddressType }
