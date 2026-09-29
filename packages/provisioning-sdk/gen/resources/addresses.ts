import type { Resource, ResourceId, ResourceRel, ResourceSort /* ResourceFilter */ } from '@runtime/resource'
import { ApiResource } from '@runtime/resource'

type AddressType = 'addresses'
type AddressRel = ResourceRel & { type: AddressType }

export type AddressSort = Pick<Address, 'id' | 'city' | 'state_code' | 'country_code'> & ResourceSort
// export type AddressFilter = Pick<Address, 'id' | 'business' | 'first_name' | 'last_name' | 'company' | 'line_1' | 'line_2' | 'city' | 'zip_code' | 'state_code' | 'country_code' | 'phone' | 'email' | 'notes' | 'lat' | 'lng' | 'billing_info'> & ResourceFilter

/**
 * The Address object is returned as part of the response body of each successful list, retrieve, create, update or delete API call to the /api/addresses endpoint.
 *
 * @link https://docs.commercelayer.io/provisioning-api-reference/addresses/object
 */
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
  state_code?: string | null
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
}

class Addresses extends ApiResource<Address> {
  static readonly TYPE: AddressType = 'addresses' as const

  isAddress(resource: any): resource is Address {
    return resource.type && resource.type === Addresses.TYPE
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

export type { Address, Addresses, AddressType }
