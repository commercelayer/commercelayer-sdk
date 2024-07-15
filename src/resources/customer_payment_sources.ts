import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Customer, CustomerType } from './customers'
import type { PaymentMethod, PaymentMethodType } from './payment_methods'
import type { Version } from './versions'
import type { AdyenPayment, AdyenPaymentType } from './adyen_payments'
import type { AxervePayment, AxervePaymentType } from './axerve_payments'
import type { BraintreePayment, BraintreePaymentType } from './braintree_payments'
import type { CheckoutComPayment, CheckoutComPaymentType } from './checkout_com_payments'
import type { ExternalPayment, ExternalPaymentType } from './external_payments'
import type { KlarnaPayment, KlarnaPaymentType } from './klarna_payments'
import type { PaypalPayment, PaypalPaymentType } from './paypal_payments'
import type { SatispayPayment, SatispayPaymentType } from './satispay_payments'
import type { StripePayment, StripePaymentType } from './stripe_payments'
import type { WireTransfer, WireTransferType } from './wire_transfers'


type CustomerPaymentSourceType = 'customer_payment_sources'
type CustomerPaymentSourceRel = ResourceRel & { type: CustomerPaymentSourceType }
type CustomerRel = ResourceRel & { type: CustomerType }
type PaymentMethodRel = ResourceRel & { type: PaymentMethodType }
type AdyenPaymentRel = ResourceRel & { type: AdyenPaymentType }
type AxervePaymentRel = ResourceRel & { type: AxervePaymentType }
type BraintreePaymentRel = ResourceRel & { type: BraintreePaymentType }
type CheckoutComPaymentRel = ResourceRel & { type: CheckoutComPaymentType }
type ExternalPaymentRel = ResourceRel & { type: ExternalPaymentType }
type KlarnaPaymentRel = ResourceRel & { type: KlarnaPaymentType }
type PaypalPaymentRel = ResourceRel & { type: PaypalPaymentType }
type SatispayPaymentRel = ResourceRel & { type: SatispayPaymentType }
type StripePaymentRel = ResourceRel & { type: StripePaymentType }
type WireTransferRel = ResourceRel & { type: WireTransferType }


interface CustomerPaymentSource extends Resource {
	
	readonly type: CustomerPaymentSourceType

	name?: string | null
	customer_token?: string | null
	payment_source_token?: string | null

	customer?: Customer | null
	payment_method?: PaymentMethod | null
	payment_source?: AdyenPayment | AxervePayment | BraintreePayment | CheckoutComPayment | ExternalPayment | KlarnaPayment | PaypalPayment | SatispayPayment | StripePayment | WireTransfer | null
	versions?: Version[] | null

}


interface CustomerPaymentSourceCreate extends ResourceCreate {
	
	customer_token?: string | null
	payment_source_token?: string | null

	customer: CustomerRel
	payment_method?: PaymentMethodRel | null
	payment_source?: AdyenPaymentRel | AxervePaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | PaypalPaymentRel | SatispayPaymentRel | StripePaymentRel | WireTransferRel | null

}


interface CustomerPaymentSourceUpdate extends ResourceUpdate {
	
	customer_token?: string | null
	payment_source_token?: string | null

	customer?: CustomerRel | null
	payment_method?: PaymentMethodRel | null
	payment_source?: AdyenPaymentRel | AxervePaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | PaypalPaymentRel | SatispayPaymentRel | StripePaymentRel | WireTransferRel | null

}


class CustomerPaymentSources extends ApiResource<CustomerPaymentSource> {

	static readonly TYPE: CustomerPaymentSourceType = 'customer_payment_sources' as const

	async create(resource: CustomerPaymentSourceCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPaymentSource> {
		return this.resources.create<CustomerPaymentSourceCreate, CustomerPaymentSource>({ ...resource, type: CustomerPaymentSources.TYPE }, params, options)
	}

	async update(resource: CustomerPaymentSourceUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPaymentSource> {
		return this.resources.update<CustomerPaymentSourceUpdate, CustomerPaymentSource>({ ...resource, type: CustomerPaymentSources.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: CustomerPaymentSources.TYPE } : id, options)
	}

	async customer(customerPaymentSourceId: string | CustomerPaymentSource, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		const _customerPaymentSourceId = (customerPaymentSourceId as CustomerPaymentSource).id || customerPaymentSourceId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `customer_payment_sources/${_customerPaymentSourceId}/customer`, params, options) as unknown as Customer
	}

	async payment_method(customerPaymentSourceId: string | CustomerPaymentSource, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentMethod> {
		const _customerPaymentSourceId = (customerPaymentSourceId as CustomerPaymentSource).id || customerPaymentSourceId as string
		return this.resources.fetch<PaymentMethod>({ type: 'payment_methods' }, `customer_payment_sources/${_customerPaymentSourceId}/payment_method`, params, options) as unknown as PaymentMethod
	}

	async versions(customerPaymentSourceId: string | CustomerPaymentSource, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _customerPaymentSourceId = (customerPaymentSourceId as CustomerPaymentSource).id || customerPaymentSourceId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `customer_payment_sources/${_customerPaymentSourceId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isCustomerPaymentSource(resource: any): resource is CustomerPaymentSource {
		return resource.type && (resource.type === CustomerPaymentSources.TYPE)
	}


	relationship(id: string | ResourceId | null): CustomerPaymentSourceRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: CustomerPaymentSources.TYPE } : { id: id.id, type: CustomerPaymentSources.TYPE }
	}


	type(): CustomerPaymentSourceType {
		return CustomerPaymentSources.TYPE
	}

}


export default CustomerPaymentSources

export type { CustomerPaymentSource, CustomerPaymentSourceCreate, CustomerPaymentSourceUpdate, CustomerPaymentSourceType }
