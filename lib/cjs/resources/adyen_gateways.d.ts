import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { PaymentMethod } from './payment_methods';
import { AdyenPayment } from './adyen_payments';
declare type AdyenGatewayRel = ResourceId & {
    type: typeof AdyenGateways.TYPE;
};
declare type AdyenPaymentRel = ResourceId & {
    type: 'adyen_payments';
};
interface AdyenGateway extends Resource {
    name?: string;
    live_url_prefix?: string;
    payment_methods?: PaymentMethod[];
    adyen_payments?: AdyenPayment[];
}
interface AdyenGatewayCreate extends ResourceCreate {
    name: string;
    merchant_account: string;
    api_key: string;
    public_key?: string;
    live_url_prefix: string;
    adyen_payments?: AdyenPaymentRel[];
}
interface AdyenGatewayUpdate extends ResourceUpdate {
    name?: string;
    merchant_account?: string;
    api_key?: string;
    public_key?: string;
    live_url_prefix?: string;
    adyen_payments?: AdyenPaymentRel[];
}
declare class AdyenGateways extends ApiResource {
    static readonly TYPE: 'adyen_gateways';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<AdyenGateway>>;
    create(resource: AdyenGatewayCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenGateway>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenGateway>;
    update(resource: AdyenGatewayUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenGateway>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isAdyenGateway(resource: any): resource is AdyenGateway;
    relationship(id: string | ResourceId): AdyenGatewayRel;
    type(): string;
}
export default AdyenGateways;
export { AdyenGateway, AdyenGatewayCreate, AdyenGatewayUpdate };
