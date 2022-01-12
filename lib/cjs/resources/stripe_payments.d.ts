import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Order } from './orders';
import { PaymentGateway } from './payment_gateways';
declare type StripePaymentRel = ResourceId & {
    type: typeof StripePayments.TYPE;
};
declare type OrderRel = ResourceId & {
    type: 'orders';
};
interface StripePayment extends Resource {
    client_secret?: string;
    publishable_key?: string;
    options?: object;
    payment_method?: object;
    order?: Order;
    payment_gateway?: PaymentGateway;
}
interface StripePaymentCreate extends ResourceCreate {
    options?: object;
    order: OrderRel;
}
interface StripePaymentUpdate extends ResourceUpdate {
    options?: object;
    _refresh?: boolean;
    order?: OrderRel;
}
declare class StripePayments extends ApiResource {
    static readonly TYPE: 'stripe_payments';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StripePayment>>;
    create(resource: StripePaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StripePayment>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StripePayment>;
    update(resource: StripePaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<StripePayment>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isStripePayment(resource: any): resource is StripePayment;
    relationship(id: string | ResourceId): StripePaymentRel;
    type(): string;
}
export default StripePayments;
export { StripePayment, StripePaymentCreate, StripePaymentUpdate };
