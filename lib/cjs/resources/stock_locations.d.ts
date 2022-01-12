import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Address } from './addresses';
import { InventoryStockLocation } from './inventory_stock_locations';
import { InventoryReturnLocation } from './inventory_return_locations';
import { StockItem } from './stock_items';
import { StockTransfer } from './stock_transfers';
import { Attachment } from './attachments';
declare type StockLocationRel = ResourceId & {
    type: typeof StockLocations.TYPE;
};
declare type AddressRel = ResourceId & {
    type: 'addresses';
};
interface StockLocation extends Resource {
    number?: number;
    name?: string;
    label_format?: string;
    suppress_etd?: boolean;
    address?: Address;
    inventory_stock_locations?: InventoryStockLocation[];
    inventory_return_locations?: InventoryReturnLocation[];
    stock_items?: StockItem[];
    stock_transfers?: StockTransfer[];
    attachments?: Attachment[];
}
interface StockLocationCreate extends ResourceCreate {
    name: string;
    label_format?: string;
    suppress_etd?: boolean;
    address: AddressRel;
}
interface StockLocationUpdate extends ResourceUpdate {
    name?: string;
    label_format?: string;
    suppress_etd?: boolean;
    address?: AddressRel;
}
declare class StockLocations extends ApiResource {
    static readonly TYPE: 'stock_locations';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockLocation>>;
    create(resource: StockLocationCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation>;
    update(resource: StockLocationUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StockLocation>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isStockLocation(resource: any): resource is StockLocation;
    relationship(id: string | ResourceId): StockLocationRel;
    type(): string;
}
export default StockLocations;
export { StockLocation, StockLocationCreate, StockLocationUpdate };
