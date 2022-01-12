import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Customer } from './customers';
declare type CustomerPasswordResetRel = ResourceId & {
    type: typeof CustomerPasswordResets.TYPE;
};
interface CustomerPasswordReset extends Resource {
    customer_email?: string;
    reset_password_token?: string;
    reset_password_at?: string;
    customer?: Customer;
}
interface CustomerPasswordResetCreate extends ResourceCreate {
    customer_email: string;
}
interface CustomerPasswordResetUpdate extends ResourceUpdate {
    customer_password?: string;
    _reset_password_token?: string;
}
declare class CustomerPasswordResets extends ApiResource {
    static readonly TYPE: 'customer_password_resets';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerPasswordReset>>;
    create(resource: CustomerPasswordResetCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPasswordReset>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPasswordReset>;
    update(resource: CustomerPasswordResetUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPasswordReset>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isCustomerPasswordReset(resource: any): resource is CustomerPasswordReset;
    relationship(id: string | ResourceId): CustomerPasswordResetRel;
    type(): string;
}
export default CustomerPasswordResets;
export { CustomerPasswordReset, CustomerPasswordResetCreate, CustomerPasswordResetUpdate };
