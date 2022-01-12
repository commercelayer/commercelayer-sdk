import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Price } from './prices';
import { Attachment } from './attachments';
declare type PriceListRel = ResourceId & {
    type: typeof PriceLists.TYPE;
};
interface PriceList extends Resource {
    name?: string;
    currency_code?: string;
    tax_included?: boolean;
    prices?: Price[];
    attachments?: Attachment[];
}
interface PriceListCreate extends ResourceCreate {
    name: string;
    currency_code: string;
    tax_included?: boolean;
}
interface PriceListUpdate extends ResourceUpdate {
    name?: string;
    currency_code?: string;
    tax_included?: boolean;
}
declare class PriceLists extends ApiResource {
    static readonly TYPE: 'price_lists';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PriceList>>;
    create(resource: PriceListCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceList>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceList>;
    update(resource: PriceListUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceList>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isPriceList(resource: any): resource is PriceList;
    relationship(id: string | ResourceId): PriceListRel;
    type(): string;
}
export default PriceLists;
export { PriceList, PriceListCreate, PriceListUpdate };
