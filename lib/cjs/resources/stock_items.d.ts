import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { StockLocation } from './stock_locations';
import { Sku } from './skus';
import { Attachment } from './attachments';
declare type StockItemRel = ResourceId & {
    type: typeof StockItems.TYPE;
};
declare type StockLocationRel = ResourceId & {
    type: 'stock_locations';
};
declare type SkuRel = ResourceId & {
    type: 'skus';
};
interface StockItem extends Resource {
    sku_code?: string;
    quantity?: number;
    stock_location?: StockLocation;
    sku?: Sku;
    attachments?: Attachment[];
}
interface StockItemCreate extends ResourceCreate {
    sku_code?: string;
    quantity: number;
    stock_location: StockLocationRel;
    sku?: SkuRel;
}
interface StockItemUpdate extends ResourceUpdate {
    sku_code?: string;
    quantity?: number;
    stock_location?: StockLocationRel;
    sku?: SkuRel;
}
declare class StockItems extends ApiResource {
    static readonly TYPE: 'stock_items';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockItem>>;
    create(resource: StockItemCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockItem>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockItem>;
    update(resource: StockItemUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockItem>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isStockItem(resource: any): resource is StockItem;
    relationship(id: string | ResourceId): StockItemRel;
    type(): string;
}
export default StockItems;
export { StockItem, StockItemCreate, StockItemUpdate };
