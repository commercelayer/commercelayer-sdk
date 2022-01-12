import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { PaymentMethod } from './payment_methods';
declare type ManualGatewayRel = ResourceId & {
    type: typeof ManualGateways.TYPE;
};
interface ManualGateway extends Resource {
    name?: string;
    require_capture?: boolean;
    payment_methods?: PaymentMethod[];
}
interface ManualGatewayCreate extends ResourceCreate {
    name: string;
    require_capture?: boolean;
}
interface ManualGatewayUpdate extends ResourceUpdate {
    name?: string;
    require_capture?: boolean;
}
declare class ManualGateways extends ApiResource {
    static readonly TYPE: 'manual_gateways';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ManualGateway>>;
    create(resource: ManualGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualGateway>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualGateway>;
    update(resource: ManualGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ManualGateway>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isManualGateway(resource: any): resource is ManualGateway;
    relationship(id: string | ResourceId): ManualGatewayRel;
    type(): string;
}
export default ManualGateways;
export { ManualGateway, ManualGatewayCreate, ManualGatewayUpdate };
