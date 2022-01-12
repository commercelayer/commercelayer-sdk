import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Order } from './orders';
declare type WireTransferRel = ResourceId & {
    type: typeof WireTransfers.TYPE;
};
declare type OrderRel = ResourceId & {
    type: 'orders';
};
interface WireTransfer extends Resource {
    order?: Order;
}
interface WireTransferCreate extends ResourceCreate {
    order: OrderRel;
}
interface WireTransferUpdate extends ResourceUpdate {
    order?: OrderRel;
}
declare class WireTransfers extends ApiResource {
    static readonly TYPE: 'wire_transfers';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<WireTransfer>>;
    create(resource: WireTransferCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<WireTransfer>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<WireTransfer>;
    update(resource: WireTransferUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<WireTransfer>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isWireTransfer(resource: any): resource is WireTransfer;
    relationship(id: string | ResourceId): WireTransferRel;
    type(): string;
}
export default WireTransfers;
export { WireTransfer, WireTransferCreate, WireTransferUpdate };
