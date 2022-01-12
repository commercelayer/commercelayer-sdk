import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Order } from './orders';
import { PaymentGateway } from './payment_gateways';
declare type ExternalPaymentRel = ResourceId & {
    type: typeof ExternalPayments.TYPE;
};
declare type OrderRel = ResourceId & {
    type: 'orders';
};
interface ExternalPayment extends Resource {
    payment_source_token?: string;
    options?: object;
    order?: Order;
    payment_gateway?: PaymentGateway;
}
interface ExternalPaymentCreate extends ResourceCreate {
    payment_source_token: string;
    options?: object;
    order: OrderRel;
}
interface ExternalPaymentUpdate extends ResourceUpdate {
    options?: object;
    order?: OrderRel;
}
declare class ExternalPayments extends ApiResource {
    static readonly TYPE: 'external_payments';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ExternalPayment>>;
    create(resource: ExternalPaymentCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPayment>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPayment>;
    update(resource: ExternalPaymentUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<ExternalPayment>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isExternalPayment(resource: any): resource is ExternalPayment;
    relationship(id: string | ResourceId): ExternalPaymentRel;
    type(): string;
}
export default ExternalPayments;
export { ExternalPayment, ExternalPaymentCreate, ExternalPaymentUpdate };
