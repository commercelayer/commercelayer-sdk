import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { PaymentMethod } from './payment_methods';
import { PaypalPayment } from './paypal_payments';
declare type PaypalGatewayRel = ResourceId & {
    type: typeof PaypalGateways.TYPE;
};
interface PaypalGateway extends Resource {
    name?: string;
    payment_methods?: PaymentMethod[];
    paypal_payments?: PaypalPayment[];
}
interface PaypalGatewayCreate extends ResourceCreate {
    name: string;
    client_id: string;
    client_secret: string;
    mode: string;
}
interface PaypalGatewayUpdate extends ResourceUpdate {
    name?: string;
    client_id?: string;
    client_secret?: string;
    mode?: string;
}
declare class PaypalGateways extends ApiResource {
    static readonly TYPE: 'paypal_gateways';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaypalGateway>>;
    create(resource: PaypalGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaypalGateway>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaypalGateway>;
    update(resource: PaypalGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaypalGateway>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isPaypalGateway(resource: any): resource is PaypalGateway;
    relationship(id: string | ResourceId): PaypalGatewayRel;
    type(): string;
}
export default PaypalGateways;
export { PaypalGateway, PaypalGatewayCreate, PaypalGatewayUpdate };
