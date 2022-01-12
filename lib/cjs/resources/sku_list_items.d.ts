import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { SkuList } from './sku_lists';
import { Sku } from './skus';
declare type SkuListItemRel = ResourceId & {
    type: typeof SkuListItems.TYPE;
};
declare type SkuListRel = ResourceId & {
    type: 'sku_lists';
};
declare type SkuRel = ResourceId & {
    type: 'skus';
};
interface SkuListItem extends Resource {
    position?: number;
    sku_code?: string;
    quantity?: number;
    sku_list?: SkuList;
    sku?: Sku;
}
interface SkuListItemCreate extends ResourceCreate {
    position?: number;
    sku_code?: string;
    quantity?: number;
    sku_list: SkuListRel;
    sku: SkuRel;
}
interface SkuListItemUpdate extends ResourceUpdate {
    position?: number;
    sku_code?: string;
    quantity?: number;
}
declare class SkuListItems extends ApiResource {
    static readonly TYPE: 'sku_list_items';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SkuListItem>>;
    create(resource: SkuListItemCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListItem>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListItem>;
    update(resource: SkuListItemUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuListItem>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isSkuListItem(resource: any): resource is SkuListItem;
    relationship(id: string | ResourceId): SkuListItemRel;
    type(): string;
}
export default SkuListItems;
export { SkuListItem, SkuListItemCreate, SkuListItemUpdate };
