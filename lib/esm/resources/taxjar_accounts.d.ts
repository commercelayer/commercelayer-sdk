import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { TaxCategory } from './tax_categories';
import { Market } from './markets';
import { Attachment } from './attachments';
declare type TaxjarAccountRel = ResourceId & {
    type: typeof TaxjarAccounts.TYPE;
};
declare type TaxCategoryRel = ResourceId & {
    type: 'tax_categories';
};
interface TaxjarAccount extends Resource {
    name?: string;
    tax_categories?: TaxCategory[];
    markets?: Market[];
    attachments?: Attachment[];
}
interface TaxjarAccountCreate extends ResourceCreate {
    name: string;
    api_key: string;
    tax_categories?: TaxCategoryRel[];
}
interface TaxjarAccountUpdate extends ResourceUpdate {
    name?: string;
    api_key?: string;
    tax_categories?: TaxCategoryRel[];
}
declare class TaxjarAccounts extends ApiResource {
    static readonly TYPE: 'taxjar_accounts';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<TaxjarAccount>>;
    create(resource: TaxjarAccountCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxjarAccount>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxjarAccount>;
    update(resource: TaxjarAccountUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<TaxjarAccount>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isTaxjarAccount(resource: any): resource is TaxjarAccount;
    relationship(id: string | ResourceId): TaxjarAccountRel;
    type(): string;
}
export default TaxjarAccounts;
export { TaxjarAccount, TaxjarAccountCreate, TaxjarAccountUpdate };
