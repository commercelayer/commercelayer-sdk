import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { PaymentMethod } from './payment_methods';
import { CheckoutComPayment } from './checkout_com_payments';
declare type CheckoutComGatewayRel = ResourceId & {
    type: typeof CheckoutComGateways.TYPE;
};
declare type CheckoutComPaymentRel = ResourceId & {
    type: 'checkout_com_payments';
};
interface CheckoutComGateway extends Resource {
    name?: string;
    webhook_endpoint_id?: string;
    webhook_endpoint_secret?: string;
    webhook_endpoint_url?: string;
    payment_methods?: PaymentMethod[];
    checkout_com_payments?: CheckoutComPayment[];
}
interface CheckoutComGatewayCreate extends ResourceCreate {
    name: string;
    secret_key: string;
    public_key: string;
    checkout_com_payments?: CheckoutComPaymentRel[];
}
interface CheckoutComGatewayUpdate extends ResourceUpdate {
    name?: string;
    secret_key?: string;
    public_key?: string;
    checkout_com_payments?: CheckoutComPaymentRel[];
}
declare class CheckoutComGateways extends ApiResource {
    static readonly TYPE: 'checkout_com_gateways';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CheckoutComGateway>>;
    create(resource: CheckoutComGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComGateway>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComGateway>;
    update(resource: CheckoutComGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComGateway>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isCheckoutComGateway(resource: any): resource is CheckoutComGateway;
    relationship(id: string | ResourceId): CheckoutComGatewayRel;
    type(): string;
}
export default CheckoutComGateways;
export { CheckoutComGateway, CheckoutComGatewayCreate, CheckoutComGatewayUpdate };
