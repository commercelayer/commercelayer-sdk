import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { PaymentMethod } from './payment_methods';
import { StripePayment } from './stripe_payments';
declare type StripeGatewayRel = ResourceId & {
    type: typeof StripeGateways.TYPE;
};
interface StripeGateway extends Resource {
    name?: string;
    webhook_endpoint_id?: string;
    webhook_endpoint_secret?: string;
    webhook_endpoint_url?: string;
    payment_methods?: PaymentMethod[];
    stripe_payments?: StripePayment[];
}
interface StripeGatewayCreate extends ResourceCreate {
    name: string;
    login: string;
    publishable_key?: string;
}
interface StripeGatewayUpdate extends ResourceUpdate {
    name?: string;
}
declare class StripeGateways extends ApiResource {
    static readonly TYPE: 'stripe_gateways';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StripeGateway>>;
    create(resource: StripeGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StripeGateway>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StripeGateway>;
    update(resource: StripeGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StripeGateway>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isStripeGateway(resource: any): resource is StripeGateway;
    relationship(id: string | ResourceId): StripeGatewayRel;
    type(): string;
}
export default StripeGateways;
export { StripeGateway, StripeGatewayCreate, StripeGatewayUpdate };
