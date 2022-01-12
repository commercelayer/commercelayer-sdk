import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { CustomerGroup } from './customer_groups';
import { CustomerAddress } from './customer_addresses';
import { CustomerPaymentSource } from './customer_payment_sources';
import { CustomerSubscription } from './customer_subscriptions';
import { Order } from './orders';
import { OrderSubscription } from './order_subscriptions';
import { Return } from './returns';
import { Attachment } from './attachments';
declare type CustomerRel = ResourceId & {
    type: typeof Customers.TYPE;
};
declare type CustomerGroupRel = ResourceId & {
    type: 'customer_groups';
};
interface Customer extends Resource {
    email?: string;
    status?: string;
    has_password?: boolean;
    customer_group?: CustomerGroup;
    customer_addresses?: CustomerAddress[];
    customer_payment_sources?: CustomerPaymentSource[];
    customer_subscriptions?: CustomerSubscription[];
    orders?: Order[];
    order_subscriptions?: OrderSubscription[];
    returns?: Return[];
    attachments?: Attachment[];
}
interface CustomerCreate extends ResourceCreate {
    email: string;
    password?: string;
    customer_group?: CustomerGroupRel;
}
interface CustomerUpdate extends ResourceUpdate {
    email?: string;
    password?: string;
    customer_group?: CustomerGroupRel;
}
declare class Customers extends ApiResource {
    static readonly TYPE: 'customers';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Customer>>;
    create(resource: CustomerCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer>;
    update(resource: CustomerUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isCustomer(resource: any): resource is Customer;
    relationship(id: string | ResourceId): CustomerRel;
    type(): string;
}
export default Customers;
export { Customer, CustomerCreate, CustomerUpdate };
