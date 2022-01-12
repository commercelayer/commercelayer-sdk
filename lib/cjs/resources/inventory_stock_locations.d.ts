import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { StockLocation } from './stock_locations';
import { InventoryModel } from './inventory_models';
declare type InventoryStockLocationRel = ResourceId & {
    type: typeof InventoryStockLocations.TYPE;
};
declare type StockLocationRel = ResourceId & {
    type: 'stock_locations';
};
declare type InventoryModelRel = ResourceId & {
    type: 'inventory_models';
};
interface InventoryStockLocation extends Resource {
    priority?: number;
    on_hold?: boolean;
    stock_location?: StockLocation;
    inventory_model?: InventoryModel;
}
interface InventoryStockLocationCreate extends ResourceCreate {
    priority: number;
    on_hold?: boolean;
    stock_location: StockLocationRel;
    inventory_model: InventoryModelRel;
}
interface InventoryStockLocationUpdate extends ResourceUpdate {
    priority?: number;
    on_hold?: boolean;
    stock_location?: StockLocationRel;
    inventory_model?: InventoryModelRel;
}
declare class InventoryStockLocations extends ApiResource {
    static readonly TYPE: 'inventory_stock_locations';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<InventoryStockLocation>>;
    create(resource: InventoryStockLocationCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryStockLocation>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryStockLocation>;
    update(resource: InventoryStockLocationUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryStockLocation>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isInventoryStockLocation(resource: any): resource is InventoryStockLocation;
    relationship(id: string | ResourceId): InventoryStockLocationRel;
    type(): string;
}
export default InventoryStockLocations;
export { InventoryStockLocation, InventoryStockLocationCreate, InventoryStockLocationUpdate };
