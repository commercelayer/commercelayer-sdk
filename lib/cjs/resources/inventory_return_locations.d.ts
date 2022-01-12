import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { StockLocation } from './stock_locations';
import { InventoryModel } from './inventory_models';
declare type InventoryReturnLocationRel = ResourceId & {
    type: typeof InventoryReturnLocations.TYPE;
};
declare type StockLocationRel = ResourceId & {
    type: 'stock_locations';
};
declare type InventoryModelRel = ResourceId & {
    type: 'inventory_models';
};
interface InventoryReturnLocation extends Resource {
    priority?: number;
    stock_location?: StockLocation;
    inventory_model?: InventoryModel;
}
interface InventoryReturnLocationCreate extends ResourceCreate {
    priority: number;
    stock_location: StockLocationRel;
    inventory_model: InventoryModelRel;
}
interface InventoryReturnLocationUpdate extends ResourceUpdate {
    priority?: number;
    stock_location?: StockLocationRel;
    inventory_model?: InventoryModelRel;
}
declare class InventoryReturnLocations extends ApiResource {
    static readonly TYPE: 'inventory_return_locations';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<InventoryReturnLocation>>;
    create(resource: InventoryReturnLocationCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryReturnLocation>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryReturnLocation>;
    update(resource: InventoryReturnLocationUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryReturnLocation>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isInventoryReturnLocation(resource: any): resource is InventoryReturnLocation;
    relationship(id: string | ResourceId): InventoryReturnLocationRel;
    type(): string;
}
export default InventoryReturnLocations;
export { InventoryReturnLocation, InventoryReturnLocationCreate, InventoryReturnLocationUpdate };
