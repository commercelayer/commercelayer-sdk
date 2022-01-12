import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { InventoryStockLocation } from './inventory_stock_locations';
import { InventoryReturnLocation } from './inventory_return_locations';
import { Attachment } from './attachments';
declare type InventoryModelRel = ResourceId & {
    type: typeof InventoryModels.TYPE;
};
interface InventoryModel extends Resource {
    name?: string;
    strategy?: string;
    stock_locations_cutoff?: number;
    inventory_stock_locations?: InventoryStockLocation[];
    inventory_return_locations?: InventoryReturnLocation[];
    attachments?: Attachment[];
}
interface InventoryModelCreate extends ResourceCreate {
    name: string;
    strategy: string;
    stock_locations_cutoff?: number;
}
interface InventoryModelUpdate extends ResourceUpdate {
    name?: string;
    strategy?: string;
    stock_locations_cutoff?: number;
}
declare class InventoryModels extends ApiResource {
    static readonly TYPE: 'inventory_models';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<InventoryModel>>;
    create(resource: InventoryModelCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryModel>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryModel>;
    update(resource: InventoryModelUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<InventoryModel>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isInventoryModel(resource: any): resource is InventoryModel;
    relationship(id: string | ResourceId): InventoryModelRel;
    type(): string;
}
export default InventoryModels;
export { InventoryModel, InventoryModelCreate, InventoryModelUpdate };
