import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Customer } from './customers';
import { AdyenPayment } from './adyen_payments';
import { BraintreePayment } from './braintree_payments';
import { CheckoutComPayment } from './checkout_com_payments';
import { ExternalPayment } from './external_payments';
import { PaypalPayment } from './paypal_payments';
import { StripePayment } from './stripe_payments';
import { WireTransfer } from './wire_transfers';
declare type CustomerPaymentSourceRel = ResourceId & {
    type: typeof CustomerPaymentSources.TYPE;
};
declare type CustomerRel = ResourceId & {
    type: 'customers';
};
declare type AdyenPaymentRel = ResourceId & {
    type: 'adyen_payments';
};
declare type BraintreePaymentRel = ResourceId & {
    type: 'braintree_payments';
};
declare type CheckoutComPaymentRel = ResourceId & {
    type: 'checkout_com_payments';
};
declare type ExternalPaymentRel = ResourceId & {
    type: 'external_payments';
};
declare type PaypalPaymentRel = ResourceId & {
    type: 'paypal_payments';
};
declare type StripePaymentRel = ResourceId & {
    type: 'stripe_payments';
};
declare type WireTransferRel = ResourceId & {
    type: 'wire_transfers';
};
interface CustomerPaymentSource extends Resource {
    name?: string;
    customer_token?: string;
    payment_source_token?: string;
    customer?: Customer;
    payment_source?: AdyenPayment | BraintreePayment | CheckoutComPayment | ExternalPayment | PaypalPayment | StripePayment | WireTransfer;
}
interface CustomerPaymentSourceCreate extends ResourceCreate {
    customer: CustomerRel;
    payment_source: AdyenPaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | PaypalPaymentRel | StripePaymentRel | WireTransferRel;
}
interface CustomerPaymentSourceUpdate extends ResourceUpdate {
    customer?: CustomerRel;
    payment_source?: AdyenPaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | PaypalPaymentRel | StripePaymentRel | WireTransferRel;
}
declare class CustomerPaymentSources extends ApiResource {
    static readonly TYPE: 'customer_payment_sources';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerPaymentSource>>;
    create(resource: CustomerPaymentSourceCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPaymentSource>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPaymentSource>;
    update(resource: CustomerPaymentSourceUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPaymentSource>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isCustomerPaymentSource(resource: any): resource is CustomerPaymentSource;
    relationship(id: string | ResourceId): CustomerPaymentSourceRel;
    type(): string;
}
export default CustomerPaymentSources;
export { CustomerPaymentSource, CustomerPaymentSourceCreate, CustomerPaymentSourceUpdate };
