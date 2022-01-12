import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Return } from './returns';
import { LineItem } from './line_items';
declare type ReturnLineItemRel = ResourceId & {
    type: typeof ReturnLineItems.TYPE;
};
declare type ReturnRel = ResourceId & {
    type: 'returns';
};
declare type LineItemRel = ResourceId & {
    type: 'line_items';
};
interface ReturnLineItem extends Resource {
    sku_code?: string;
    bundle_code?: string;
    name?: string;
    quantity?: number;
    return_reason?: object;
    restocked_at?: string;
    return?: Return;
    line_item?: LineItem;
}
interface ReturnLineItemCreate extends ResourceCreate {
    quantity: number;
    return_reason?: object;
    return: ReturnRel;
    line_item: LineItemRel;
}
interface ReturnLineItemUpdate extends ResourceUpdate {
    quantity?: number;
    _restock?: boolean;
    return_reason?: object;
}
declare class ReturnLineItems extends ApiResource {
    static readonly TYPE: 'return_line_items';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ReturnLineItem>>;
    create(resource: ReturnLineItemCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ReturnLineItem>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ReturnLineItem>;
    update(resource: ReturnLineItemUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ReturnLineItem>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isReturnLineItem(resource: any): resource is ReturnLineItem;
    relationship(id: string | ResourceId): ReturnLineItemRel;
    type(): string;
}
export default ReturnLineItems;
export { ReturnLineItem, ReturnLineItemCreate, ReturnLineItemUpdate };
