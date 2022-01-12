import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Parcel } from './parcels';
import { StockLineItem } from './stock_line_items';
declare type ParcelLineItemRel = ResourceId & {
    type: typeof ParcelLineItems.TYPE;
};
declare type ParcelRel = ResourceId & {
    type: 'parcels';
};
declare type StockLineItemRel = ResourceId & {
    type: 'stock_line_items';
};
interface ParcelLineItem extends Resource {
    sku_code?: string;
    quantity?: number;
    parcel?: Parcel;
    stock_line_item?: StockLineItem;
    /**
    * @deprecated This field should not be used as it may be removed in the future without notice
    */
    shipment_line_item?: object;
}
interface ParcelLineItemCreate extends ResourceCreate {
    sku_code?: string;
    quantity: number;
    parcel: ParcelRel;
    stock_line_item: StockLineItemRel;
    /**
    * @deprecated This field should not be used as it may be removed in the future without notice
    */
    shipment_line_item?: object;
}
declare type ParcelLineItemUpdate = ResourceUpdate;
declare class ParcelLineItems extends ApiResource {
    static readonly TYPE: 'parcel_line_items';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ParcelLineItem>>;
    create(resource: ParcelLineItemCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ParcelLineItem>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ParcelLineItem>;
    update(resource: ParcelLineItemUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ParcelLineItem>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isParcelLineItem(resource: any): resource is ParcelLineItem;
    relationship(id: string | ResourceId): ParcelLineItemRel;
    type(): string;
}
export default ParcelLineItems;
export { ParcelLineItem, ParcelLineItemCreate, ParcelLineItemUpdate };
