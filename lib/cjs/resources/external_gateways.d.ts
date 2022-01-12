import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { PaymentMethod } from './payment_methods';
import { ExternalPayment } from './external_payments';
declare type ExternalGatewayRel = ResourceId & {
    type: typeof ExternalGateways.TYPE;
};
interface ExternalGateway extends Resource {
    name?: string;
    shared_secret?: string;
    authorize_url?: string;
    capture_url?: string;
    void_url?: string;
    refund_url?: string;
    payment_methods?: PaymentMethod[];
    external_payments?: ExternalPayment[];
}
interface ExternalGatewayCreate extends ResourceCreate {
    name: string;
    authorize_url?: string;
    capture_url?: string;
    void_url?: string;
    refund_url?: string;
}
interface ExternalGatewayUpdate extends ResourceUpdate {
    name?: string;
    authorize_url?: string;
    capture_url?: string;
    void_url?: string;
    refund_url?: string;
}
declare class ExternalGateways extends ApiResource {
    static readonly TYPE: 'external_gateways';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ExternalGateway>>;
    create(resource: ExternalGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalGateway>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalGateway>;
    update(resource: ExternalGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalGateway>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isExternalGateway(resource: any): resource is ExternalGateway;
    relationship(id: string | ResourceId): ExternalGatewayRel;
    type(): string;
}
export default ExternalGateways;
export { ExternalGateway, ExternalGatewayCreate, ExternalGatewayUpdate };
