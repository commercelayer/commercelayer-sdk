import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { PaymentMethod } from './payment_methods';
import { BraintreePayment } from './braintree_payments';
declare type BraintreeGatewayRel = ResourceId & {
    type: typeof BraintreeGateways.TYPE;
};
declare type BraintreePaymentRel = ResourceId & {
    type: 'braintree_payments';
};
interface BraintreeGateway extends Resource {
    name?: string;
    descriptor_name?: string;
    descriptor_phone?: string;
    descriptor_url?: string;
    webhook_endpoint_url?: string;
    payment_methods?: PaymentMethod[];
    braintree_payments?: BraintreePayment[];
}
interface BraintreeGatewayCreate extends ResourceCreate {
    name: string;
    merchant_account_id: string;
    merchant_id: string;
    public_key: string;
    private_key: string;
    descriptor_name?: string;
    descriptor_phone?: string;
    descriptor_url?: string;
    braintree_payments?: BraintreePaymentRel[];
}
interface BraintreeGatewayUpdate extends ResourceUpdate {
    name?: string;
    merchant_account_id?: string;
    merchant_id?: string;
    public_key?: string;
    private_key?: string;
    descriptor_name?: string;
    descriptor_phone?: string;
    descriptor_url?: string;
    braintree_payments?: BraintreePaymentRel[];
}
declare class BraintreeGateways extends ApiResource {
    static readonly TYPE: 'braintree_gateways';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<BraintreeGateway>>;
    create(resource: BraintreeGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BraintreeGateway>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BraintreeGateway>;
    update(resource: BraintreeGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BraintreeGateway>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isBraintreeGateway(resource: any): resource is BraintreeGateway;
    relationship(id: string | ResourceId): BraintreeGatewayRel;
    type(): string;
}
export default BraintreeGateways;
export { BraintreeGateway, BraintreeGatewayCreate, BraintreeGatewayUpdate };
