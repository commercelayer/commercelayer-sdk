import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Order } from './orders';
import { Customer } from './customers';
import { StockLocation } from './stock_locations';
import { Address } from './addresses';
import { ReturnLineItem } from './return_line_items';
import { Attachment } from './attachments';
declare type ReturnRel = ResourceId & {
    type: typeof Returns.TYPE;
};
declare type OrderRel = ResourceId & {
    type: 'orders';
};
declare type StockLocationRel = ResourceId & {
    type: 'stock_locations';
};
interface Return extends Resource {
    number?: string;
    status?: string;
    customer_email?: string;
    skus_count?: number;
    approved_at?: string;
    cancelled_at?: string;
    shipped_at?: string;
    rejected_at?: string;
    received_at?: string;
    archived_at?: string;
    order?: Order;
    customer?: Customer;
    stock_location?: StockLocation;
    origin_address?: Address;
    destination_address?: Address;
    return_line_items?: ReturnLineItem[];
    attachments?: Attachment[];
}
interface ReturnCreate extends ResourceCreate {
    order: OrderRel;
    stock_location?: StockLocationRel;
}
interface ReturnUpdate extends ResourceUpdate {
    _request?: boolean;
    _approve?: boolean;
    _cancel?: boolean;
    _ship?: boolean;
    _reject?: boolean;
    _receive?: boolean;
    _restock?: boolean;
    _archive?: boolean;
    _unarchive?: boolean;
    stock_location?: StockLocationRel;
}
declare class Returns extends ApiResource {
    static readonly TYPE: 'returns';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Return>>;
    create(resource: ReturnCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Return>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Return>;
    update(resource: ReturnUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Return>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isReturn(resource: any): resource is Return;
    relationship(id: string | ResourceId): ReturnRel;
    type(): string;
}
export default Returns;
export { Return, ReturnCreate, ReturnUpdate };
