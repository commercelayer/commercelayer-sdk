import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Geocoder } from './geocoders';
declare type AddressRel = ResourceId & {
    type: typeof Addresses.TYPE;
};
declare type GeocoderRel = ResourceId & {
    type: 'geocoders';
};
interface Address extends Resource {
    business?: boolean;
    first_name?: string;
    last_name?: string;
    company?: string;
    full_name?: string;
    line_1?: string;
    line_2?: string;
    city?: string;
    zip_code?: string;
    state_code?: string;
    country_code?: string;
    phone?: string;
    full_address?: string;
    name?: string;
    email?: string;
    notes?: string;
    lat?: number;
    lng?: number;
    is_localized?: boolean;
    is_geocoded?: boolean;
    provider_name?: string;
    map_url?: string;
    static_map_url?: string;
    billing_info?: string;
    geocoder?: Geocoder;
}
interface AddressCreate extends ResourceCreate {
    business?: boolean;
    first_name?: string;
    last_name?: string;
    company?: string;
    line_1: string;
    line_2?: string;
    city: string;
    zip_code?: string;
    state_code: string;
    country_code: string;
    phone: string;
    email?: string;
    notes?: string;
    lat?: number;
    lng?: number;
    billing_info?: string;
    geocoder?: GeocoderRel;
}
interface AddressUpdate extends ResourceUpdate {
    business?: boolean;
    first_name?: string;
    last_name?: string;
    company?: string;
    line_1?: string;
    line_2?: string;
    city?: string;
    zip_code?: string;
    state_code?: string;
    country_code?: string;
    phone?: string;
    email?: string;
    notes?: string;
    lat?: number;
    lng?: number;
    billing_info?: string;
    geocoder?: GeocoderRel;
}
declare class Addresses extends ApiResource {
    static readonly TYPE: 'addresses';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Address>>;
    create(resource: AddressCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address>;
    update(resource: AddressUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isAddress(resource: any): resource is Address;
    relationship(id: string | ResourceId): AddressRel;
    type(): string;
}
export default Addresses;
export { Address, AddressCreate, AddressUpdate };
