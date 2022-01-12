import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { TaxCategory } from './tax_categories';
import { Market } from './markets';
import { Attachment } from './attachments';
declare type AvalaraAccountRel = ResourceId & {
    type: typeof AvalaraAccounts.TYPE;
};
declare type TaxCategoryRel = ResourceId & {
    type: 'tax_categories';
};
interface AvalaraAccount extends Resource {
    name?: string;
    username?: string;
    company_code?: string;
    ddp?: string;
    tax_categories?: TaxCategory[];
    markets?: Market[];
    attachments?: Attachment[];
}
interface AvalaraAccountCreate extends ResourceCreate {
    name: string;
    username: string;
    password: string;
    company_code: string;
    ddp?: string;
    tax_categories?: TaxCategoryRel[];
}
interface AvalaraAccountUpdate extends ResourceUpdate {
    name?: string;
    username?: string;
    password?: string;
    company_code?: string;
    ddp?: string;
    tax_categories?: TaxCategoryRel[];
}
declare class AvalaraAccounts extends ApiResource {
    static readonly TYPE: 'avalara_accounts';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<AvalaraAccount>>;
    create(resource: AvalaraAccountCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AvalaraAccount>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AvalaraAccount>;
    update(resource: AvalaraAccountUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AvalaraAccount>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isAvalaraAccount(resource: any): resource is AvalaraAccount;
    relationship(id: string | ResourceId): AvalaraAccountRel;
    type(): string;
}
export default AvalaraAccounts;
export { AvalaraAccount, AvalaraAccountCreate, AvalaraAccountUpdate };
