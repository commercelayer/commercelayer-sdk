import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Market } from './markets';
import { SkuList } from './sku_lists';
import { Sku } from './skus';
import { Attachment } from './attachments';
declare type BundleRel = ResourceId & {
    type: typeof Bundles.TYPE;
};
declare type MarketRel = ResourceId & {
    type: 'markets';
};
declare type SkuListRel = ResourceId & {
    type: 'sku_lists';
};
interface Bundle extends Resource {
    code?: string;
    name?: string;
    description?: string;
    image_url?: string;
    price_amount_cents?: number;
    price_amount_float?: number;
    formatted_price_amount?: string;
    compare_at_amount_cents?: number;
    compare_at_amount_float?: number;
    formatted_compare_at_amount?: string;
    skus_count?: number;
    market?: Market;
    sku_list?: SkuList;
    skus?: Sku[];
    attachments?: Attachment[];
}
interface BundleCreate extends ResourceCreate {
    code: string;
    name: string;
    description?: string;
    image_url?: string;
    price_amount_cents: number;
    compare_at_amount_cents: number;
    _compute_compare_at_amount?: boolean;
    market?: MarketRel;
    sku_list: SkuListRel;
}
interface BundleUpdate extends ResourceUpdate {
    code?: string;
    name?: string;
    description?: string;
    image_url?: string;
    price_amount_cents?: number;
    compare_at_amount_cents?: number;
    _compute_compare_at_amount?: boolean;
}
declare class Bundles extends ApiResource {
    static readonly TYPE: 'bundles';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Bundle>>;
    create(resource: BundleCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Bundle>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Bundle>;
    update(resource: BundleUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Bundle>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isBundle(resource: any): resource is Bundle;
    relationship(id: string | ResourceId): BundleRel;
    type(): string;
}
export default Bundles;
export { Bundle, BundleCreate, BundleUpdate };
