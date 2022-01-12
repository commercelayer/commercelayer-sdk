import { ApiResource, Resource, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { PaymentMethod } from './payment_methods';
declare type PaymentGatewayRel = ResourceId & {
    type: typeof PaymentGateways.TYPE;
};
interface PaymentGateway extends Resource {
    name?: string;
    payment_methods?: PaymentMethod[];
}
declare class PaymentGateways extends ApiResource {
    static readonly TYPE: 'payment_gateways';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentGateway>>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentGateway>;
    isPaymentGateway(resource: any): resource is PaymentGateway;
    relationship(id: string | ResourceId): PaymentGatewayRel;
    type(): string;
}
export default PaymentGateways;
export { PaymentGateway };
