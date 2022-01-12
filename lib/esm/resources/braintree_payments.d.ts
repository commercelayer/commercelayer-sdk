import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Order } from './orders';
import { PaymentGateway } from './payment_gateways';
declare type BraintreePaymentRel = ResourceId & {
    type: typeof BraintreePayments.TYPE;
};
declare type OrderRel = ResourceId & {
    type: 'orders';
};
interface BraintreePayment extends Resource {
    client_token?: string;
    payment_method_nonce?: string;
    payment_id?: string;
    local?: boolean;
    options?: object;
    order?: Order;
    payment_gateway?: PaymentGateway;
}
interface BraintreePaymentCreate extends ResourceCreate {
    payment_id?: string;
    local?: boolean;
    options?: object;
    order: OrderRel;
}
interface BraintreePaymentUpdate extends ResourceUpdate {
    payment_method_nonce?: string;
    payment_id?: string;
    local?: boolean;
    options?: object;
    order?: OrderRel;
}
declare class BraintreePayments extends ApiResource {
    static readonly TYPE: 'braintree_payments';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<BraintreePayment>>;
    create(resource: BraintreePaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BraintreePayment>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BraintreePayment>;
    update(resource: BraintreePaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<BraintreePayment>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isBraintreePayment(resource: any): resource is BraintreePayment;
    relationship(id: string | ResourceId): BraintreePaymentRel;
    type(): string;
}
export default BraintreePayments;
export { BraintreePayment, BraintreePaymentCreate, BraintreePaymentUpdate };
