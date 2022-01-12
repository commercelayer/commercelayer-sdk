import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Customer } from './customers';
import { Address } from './addresses';
declare type CustomerAddressRel = ResourceId & {
    type: typeof CustomerAddresses.TYPE;
};
declare type CustomerRel = ResourceId & {
    type: 'customers';
};
declare type AddressRel = ResourceId & {
    type: 'addresses';
};
interface CustomerAddress extends Resource {
    name?: string;
    customer?: Customer;
    address?: Address;
}
interface CustomerAddressCreate extends ResourceCreate {
    customer: CustomerRel;
    address: AddressRel;
}
interface CustomerAddressUpdate extends ResourceUpdate {
    customer?: CustomerRel;
    address?: AddressRel;
}
declare class CustomerAddresses extends ApiResource {
    static readonly TYPE: 'customer_addresses';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerAddress>>;
    create(resource: CustomerAddressCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerAddress>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerAddress>;
    update(resource: CustomerAddressUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerAddress>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isCustomerAddress(resource: any): resource is CustomerAddress;
    relationship(id: string | ResourceId): CustomerAddressRel;
    type(): string;
}
export default CustomerAddresses;
export { CustomerAddress, CustomerAddressCreate, CustomerAddressUpdate };
