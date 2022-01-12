import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Sku } from './skus';
import { SkuListItem } from './sku_list_items';
import { Bundle } from './bundles';
declare type SkuListRel = ResourceId & {
    type: typeof SkuLists.TYPE;
};
interface SkuList extends Resource {
    name?: string;
    slug?: string;
    description?: string;
    image_url?: string;
    manual?: boolean;
    sku_code_regex?: string;
    skus?: Sku[];
    sku_list_items?: SkuListItem[];
    bundles?: Bundle[];
}
interface SkuListCreate extends ResourceCreate {
    name: string;
    description?: string;
    image_url?: string;
    manual?: boolean;
    sku_code_regex?: string;
}
interface SkuListUpdate extends ResourceUpdate {
    name?: string;
    description?: string;
    image_url?: string;
    manual?: boolean;
    sku_code_regex?: string;
}
declare class SkuLists extends ApiResource {
    static readonly TYPE: 'sku_lists';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SkuList>>;
    create(resource: SkuListCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList>;
    update(resource: SkuListUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuList>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isSkuList(resource: any): resource is SkuList;
    relationship(id: string | ResourceId): SkuListRel;
    type(): string;
}
export default SkuLists;
export { SkuList, SkuListCreate, SkuListUpdate };
