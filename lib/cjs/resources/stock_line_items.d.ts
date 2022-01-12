import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Shipment } from './shipments';
import { LineItem } from './line_items';
import { StockItem } from './stock_items';
declare type StockLineItemRel = ResourceId & {
    type: typeof StockLineItems.TYPE;
};
interface StockLineItem extends Resource {
    sku_code?: string;
    bundle_code?: string;
    quantity?: number;
    shipment?: Shipment;
    line_item?: LineItem;
    stock_item?: StockItem;
}
declare class StockLineItems extends ApiResource {
    static readonly TYPE: 'stock_line_items';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockLineItem>>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLineItem>;
    isStockLineItem(resource: any): resource is StockLineItem;
    relationship(id: string | ResourceId): StockLineItemRel;
    type(): string;
}
export default StockLineItems;
export { StockLineItem };
