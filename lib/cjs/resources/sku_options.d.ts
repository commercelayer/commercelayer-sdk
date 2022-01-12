import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Market } from './markets';
import { Attachment } from './attachments';
declare type SkuOptionRel = ResourceId & {
    type: typeof SkuOptions.TYPE;
};
declare type MarketRel = ResourceId & {
    type: 'markets';
};
interface SkuOption extends Resource {
    name?: string;
    description?: string;
    price_amount_cents?: number;
    price_amount_float?: number;
    formatted_price_amount?: string;
    delay_hours?: number;
    delay_days?: number;
    sku_code_regex?: string;
    market?: Market;
    attachments?: Attachment[];
}
interface SkuOptionCreate extends ResourceCreate {
    name: string;
    description?: string;
    price_amount_cents?: number;
    delay_hours?: number;
    sku_code_regex?: string;
    market: MarketRel;
}
interface SkuOptionUpdate extends ResourceUpdate {
    name?: string;
    description?: string;
    price_amount_cents?: number;
    delay_hours?: number;
    sku_code_regex?: string;
    market?: MarketRel;
}
declare class SkuOptions extends ApiResource {
    static readonly TYPE: 'sku_options';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SkuOption>>;
    create(resource: SkuOptionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuOption>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuOption>;
    update(resource: SkuOptionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuOption>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isSkuOption(resource: any): resource is SkuOption;
    relationship(id: string | ResourceId): SkuOptionRel;
    type(): string;
}
export default SkuOptions;
export { SkuOption, SkuOptionCreate, SkuOptionUpdate };
