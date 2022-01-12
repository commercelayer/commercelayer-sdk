import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Order } from './orders';
import { PaymentGateway } from './payment_gateways';
declare type PaypalPaymentRel = ResourceId & {
    type: typeof PaypalPayments.TYPE;
};
declare type OrderRel = ResourceId & {
    type: 'orders';
};
interface PaypalPayment extends Resource {
    return_url?: string;
    cancel_url?: string;
    note_to_payer?: string;
    paypal_payer_id?: string;
    name?: string;
    paypal_id?: string;
    status?: string;
    approval_url?: string;
    order?: Order;
    payment_gateway?: PaymentGateway;
}
interface PaypalPaymentCreate extends ResourceCreate {
    return_url: string;
    cancel_url: string;
    note_to_payer?: string;
    order: OrderRel;
}
interface PaypalPaymentUpdate extends ResourceUpdate {
    paypal_payer_id?: string;
    order?: OrderRel;
}
declare class PaypalPayments extends ApiResource {
    static readonly TYPE: 'paypal_payments';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaypalPayment>>;
    create(resource: PaypalPaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaypalPayment>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaypalPayment>;
    update(resource: PaypalPaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaypalPayment>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isPaypalPayment(resource: any): resource is PaypalPayment;
    relationship(id: string | ResourceId): PaypalPaymentRel;
    type(): string;
}
export default PaypalPayments;
export { PaypalPayment, PaypalPaymentCreate, PaypalPaymentUpdate };
