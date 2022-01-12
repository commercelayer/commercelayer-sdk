import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Order } from './orders';
import { PaymentGateway } from './payment_gateways';
declare type AdyenPaymentRel = ResourceId & {
    type: typeof AdyenPayments.TYPE;
};
declare type OrderRel = ResourceId & {
    type: 'orders';
};
interface AdyenPayment extends Resource {
    public_key?: string;
    payment_methods?: object;
    payment_request_data?: object;
    payment_request_details?: object;
    payment_response?: object;
    order?: Order;
    payment_gateway?: PaymentGateway;
}
interface AdyenPaymentCreate extends ResourceCreate {
    order: OrderRel;
}
interface AdyenPaymentUpdate extends ResourceUpdate {
    payment_request_data?: object;
    payment_request_details?: object;
    payment_response?: object;
    _details?: boolean;
    order?: OrderRel;
}
declare class AdyenPayments extends ApiResource {
    static readonly TYPE: 'adyen_payments';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<AdyenPayment>>;
    create(resource: AdyenPaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenPayment>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenPayment>;
    update(resource: AdyenPaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<AdyenPayment>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isAdyenPayment(resource: any): resource is AdyenPayment;
    relationship(id: string | ResourceId): AdyenPaymentRel;
    type(): string;
}
export default AdyenPayments;
export { AdyenPayment, AdyenPaymentCreate, AdyenPaymentUpdate };
