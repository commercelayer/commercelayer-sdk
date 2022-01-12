import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Sku } from './skus';
import { Attachment } from './attachments';
declare type ShippingCategoryRel = ResourceId & {
    type: typeof ShippingCategories.TYPE;
};
interface ShippingCategory extends Resource {
    name?: string;
    skus?: Sku[];
    attachments?: Attachment[];
}
interface ShippingCategoryCreate extends ResourceCreate {
    name: string;
}
interface ShippingCategoryUpdate extends ResourceUpdate {
    name?: string;
}
declare class ShippingCategories extends ApiResource {
    static readonly TYPE: 'shipping_categories';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ShippingCategory>>;
    create(resource: ShippingCategoryCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingCategory>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingCategory>;
    update(resource: ShippingCategoryUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ShippingCategory>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isShippingCategory(resource: any): resource is ShippingCategory;
    relationship(id: string | ResourceId): ShippingCategoryRel;
    type(): string;
}
export default ShippingCategories;
export { ShippingCategory, ShippingCategoryCreate, ShippingCategoryUpdate };
