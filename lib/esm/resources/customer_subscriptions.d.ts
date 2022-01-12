import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Customer } from './customers';
declare type CustomerSubscriptionRel = ResourceId & {
    type: typeof CustomerSubscriptions.TYPE;
};
interface CustomerSubscription extends Resource {
    customer_email?: string;
    customer?: Customer;
}
interface CustomerSubscriptionCreate extends ResourceCreate {
    customer_email: string;
}
declare type CustomerSubscriptionUpdate = ResourceUpdate;
declare class CustomerSubscriptions extends ApiResource {
    static readonly TYPE: 'customer_subscriptions';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerSubscription>>;
    create(resource: CustomerSubscriptionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerSubscription>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerSubscription>;
    update(resource: CustomerSubscriptionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerSubscription>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isCustomerSubscription(resource: any): resource is CustomerSubscription;
    relationship(id: string | ResourceId): CustomerSubscriptionRel;
    type(): string;
}
export default CustomerSubscriptions;
export { CustomerSubscription, CustomerSubscriptionCreate, CustomerSubscriptionUpdate };
