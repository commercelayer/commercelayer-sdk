import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { PriceList } from './price_lists';
import { Sku } from './skus';
import { Attachment } from './attachments';
declare type PriceRel = ResourceId & {
    type: typeof Prices.TYPE;
};
declare type PriceListRel = ResourceId & {
    type: 'price_lists';
};
declare type SkuRel = ResourceId & {
    type: 'skus';
};
interface Price extends Resource {
    currency_code?: string;
    sku_code?: string;
    amount_cents?: number;
    amount_float?: number;
    formatted_amount?: string;
    compare_at_amount_cents?: number;
    compare_at_amount_float?: number;
    formatted_compare_at_amount?: string;
    price_list?: PriceList;
    sku?: Sku;
    attachments?: Attachment[];
}
interface PriceCreate extends ResourceCreate {
    sku_code?: string;
    amount_cents: number;
    compare_at_amount_cents: number;
    price_list: PriceListRel;
    sku?: SkuRel;
}
interface PriceUpdate extends ResourceUpdate {
    sku_code?: string;
    amount_cents?: number;
    compare_at_amount_cents?: number;
    price_list?: PriceListRel;
    sku?: SkuRel;
}
declare class Prices extends ApiResource {
    static readonly TYPE: 'prices';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Price>>;
    create(resource: PriceCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Price>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Price>;
    update(resource: PriceUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Price>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isPrice(resource: any): resource is Price;
    relationship(id: string | ResourceId): PriceRel;
    type(): string;
}
export default Prices;
export { Price, PriceCreate, PriceUpdate };
