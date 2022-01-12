import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Market } from './markets';
import { PaymentGateway } from './payment_gateways';
import { Attachment } from './attachments';
declare type PaymentMethodRel = ResourceId & {
    type: typeof PaymentMethods.TYPE;
};
declare type MarketRel = ResourceId & {
    type: 'markets';
};
declare type PaymentGatewayRel = ResourceId & {
    type: 'payment_gateways';
};
interface PaymentMethod extends Resource {
    payment_source_type?: string;
    name?: string;
    moto?: boolean;
    disabled_at?: string;
    price_amount_cents?: number;
    price_amount_float?: number;
    formatted_price_amount?: string;
    market?: Market;
    payment_gateway?: PaymentGateway;
    attachments?: Attachment[];
}
interface PaymentMethodCreate extends ResourceCreate {
    payment_source_type: string;
    moto?: boolean;
    price_amount_cents: number;
    market: MarketRel;
    payment_gateway: PaymentGatewayRel;
}
interface PaymentMethodUpdate extends ResourceUpdate {
    payment_source_type?: string;
    moto?: boolean;
    price_amount_cents?: number;
    market?: MarketRel;
    payment_gateway?: PaymentGatewayRel;
}
declare class PaymentMethods extends ApiResource {
    static readonly TYPE: 'payment_methods';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PaymentMethod>>;
    create(resource: PaymentMethodCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentMethod>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentMethod>;
    update(resource: PaymentMethodUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentMethod>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isPaymentMethod(resource: any): resource is PaymentMethod;
    relationship(id: string | ResourceId): PaymentMethodRel;
    type(): string;
}
export default PaymentMethods;
export { PaymentMethod, PaymentMethodCreate, PaymentMethodUpdate };
