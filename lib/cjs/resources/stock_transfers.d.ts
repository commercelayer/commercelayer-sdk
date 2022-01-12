import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Sku } from './skus';
import { StockLocation } from './stock_locations';
import { Shipment } from './shipments';
import { LineItem } from './line_items';
declare type StockTransferRel = ResourceId & {
    type: typeof StockTransfers.TYPE;
};
declare type SkuRel = ResourceId & {
    type: 'skus';
};
declare type StockLocationRel = ResourceId & {
    type: 'stock_locations';
};
declare type ShipmentRel = ResourceId & {
    type: 'shipments';
};
declare type LineItemRel = ResourceId & {
    type: 'line_items';
};
interface StockTransfer extends Resource {
    sku_code?: string;
    status?: string;
    quantity?: number;
    completed_at?: string;
    cancelled_at?: string;
    sku?: Sku;
    origin_stock_location?: StockLocation;
    destination_stock_location?: StockLocation;
    shipment?: Shipment;
    line_item?: LineItem;
}
interface StockTransferCreate extends ResourceCreate {
    sku_code?: string;
    quantity: number;
    sku: SkuRel;
    origin_stock_location: StockLocationRel;
    destination_stock_location: StockLocationRel;
    shipment?: ShipmentRel;
    line_item?: LineItemRel;
}
interface StockTransferUpdate extends ResourceUpdate {
    sku_code?: string;
    _upcoming?: boolean;
    _picking?: boolean;
    _in_transit?: boolean;
    _complete?: boolean;
    _cancel?: boolean;
    sku?: SkuRel;
    origin_stock_location?: StockLocationRel;
    destination_stock_location?: StockLocationRel;
}
declare class StockTransfers extends ApiResource {
    static readonly TYPE: 'stock_transfers';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockTransfer>>;
    create(resource: StockTransferCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockTransfer>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockTransfer>;
    update(resource: StockTransferUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockTransfer>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isStockTransfer(resource: any): resource is StockTransfer;
    relationship(id: string | ResourceId): StockTransferRel;
    type(): string;
}
export default StockTransfers;
export { StockTransfer, StockTransferCreate, StockTransferUpdate };
