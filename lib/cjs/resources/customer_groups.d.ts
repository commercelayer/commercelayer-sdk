import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Customer } from './customers';
import { Market } from './markets';
import { Attachment } from './attachments';
declare type CustomerGroupRel = ResourceId & {
    type: typeof CustomerGroups.TYPE;
};
interface CustomerGroup extends Resource {
    name?: string;
    customers?: Customer[];
    markets?: Market[];
    attachments?: Attachment[];
}
interface CustomerGroupCreate extends ResourceCreate {
    name: string;
}
interface CustomerGroupUpdate extends ResourceUpdate {
    name?: string;
}
declare class CustomerGroups extends ApiResource {
    static readonly TYPE: 'customer_groups';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerGroup>>;
    create(resource: CustomerGroupCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerGroup>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerGroup>;
    update(resource: CustomerGroupUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerGroup>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isCustomerGroup(resource: any): resource is CustomerGroup;
    relationship(id: string | ResourceId): CustomerGroupRel;
    type(): string;
}
export default CustomerGroups;
export { CustomerGroup, CustomerGroupCreate, CustomerGroupUpdate };
