import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Order } from './orders';
import { PaymentGateway } from './payment_gateways';
declare type CheckoutComPaymentRel = ResourceId & {
    type: typeof CheckoutComPayments.TYPE;
};
declare type OrderRel = ResourceId & {
    type: 'orders';
};
interface CheckoutComPayment extends Resource {
    payment_type?: string;
    token?: string;
    session_id?: string;
    source_id?: string;
    customer_token?: string;
    redirect_uri?: string;
    payment_response?: object;
    order?: Order;
    payment_gateway?: PaymentGateway;
}
interface CheckoutComPaymentCreate extends ResourceCreate {
    payment_type: string;
    token: string;
    session_id?: string;
    order: OrderRel;
}
interface CheckoutComPaymentUpdate extends ResourceUpdate {
    payment_type?: string;
    token?: string;
    session_id?: string;
    _details?: boolean;
    _refresh?: boolean;
    order?: OrderRel;
}
declare class CheckoutComPayments extends ApiResource {
    static readonly TYPE: 'checkout_com_payments';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CheckoutComPayment>>;
    create(resource: CheckoutComPaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComPayment>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComPayment>;
    update(resource: CheckoutComPaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CheckoutComPayment>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isCheckoutComPayment(resource: any): resource is CheckoutComPayment;
    relationship(id: string | ResourceId): CheckoutComPaymentRel;
    type(): string;
}
export default CheckoutComPayments;
export { CheckoutComPayment, CheckoutComPaymentCreate, CheckoutComPaymentUpdate };
