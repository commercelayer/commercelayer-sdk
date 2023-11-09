import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Customer } from './customers'
import type { PaymentMethod } from './payment_methods'
import type { AdyenPayment } from './adyen_payments'
import type { AxervePayment } from './axerve_payments'
import type { BraintreePayment } from './braintree_payments'
import type { CheckoutComPayment } from './checkout_com_payments'
import type { ExternalPayment } from './external_payments'
import type { KlarnaPayment } from './klarna_payments'
import type { SatispayPayment } from './satispay_payments'
import type { StripePayment } from './stripe_payments'
import type { Version } from './versions'


type CustomerPaymentSourceRel = ResourceRel & { type: typeof CustomerPaymentSources.TYPE }
type CustomerRel = ResourceRel & { type: 'customers' }
type PaymentMethodRel = ResourceRel & { type: 'payment_methods' }
type AdyenPaymentRel = ResourceRel & { type: 'adyen_payments' }
type AxervePaymentRel = ResourceRel & { type: 'axerve_payments' }
type BraintreePaymentRel = ResourceRel & { type: 'braintree_payments' }
type CheckoutComPaymentRel = ResourceRel & { type: 'checkout_com_payments' }
type ExternalPaymentRel = ResourceRel & { type: 'external_payments' }
type KlarnaPaymentRel = ResourceRel & { type: 'klarna_payments' }
type SatispayPaymentRel = ResourceRel & { type: 'satispay_payments' }
type StripePaymentRel = ResourceRel & { type: 'stripe_payments' }


interface CustomerPaymentSource extends Resource {
	
	name?: string
	customer_token?: string
	payment_source_token?: string

	customer?: Customer
	payment_method?: PaymentMethod
	payment_source?: AdyenPayment | AxervePayment | BraintreePayment | CheckoutComPayment | ExternalPayment | KlarnaPayment | SatispayPayment | StripePayment
	versions?: Version[]

}


interface CustomerPaymentSourceCreate extends ResourceCreate {
	
	customer_token?: string
	payment_source_token?: string

	customer: CustomerRel
	payment_method?: PaymentMethodRel
	payment_source?: AdyenPaymentRel | AxervePaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | SatispayPaymentRel | StripePaymentRel

}


interface CustomerPaymentSourceUpdate extends ResourceUpdate {
	
	customer_token?: string
	payment_source_token?: string

	customer?: CustomerRel
	payment_method?: PaymentMethodRel
	payment_source?: AdyenPaymentRel | AxervePaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | SatispayPaymentRel | StripePaymentRel

}


class CustomerPaymentSources extends ApiResource {

	static readonly TYPE: 'customer_payment_sources' = 'customer_payment_sources' as const
	// static readonly PATH = 'customer_payment_sources'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerPaymentSource>> {
		return this.resources.list<CustomerPaymentSource>({ type: CustomerPaymentSources.TYPE }, params, options)
	}

	async create(resource: CustomerPaymentSourceCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPaymentSource> {
		return this.resources.create<CustomerPaymentSourceCreate, CustomerPaymentSource>({ ...resource, type: CustomerPaymentSources.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPaymentSource> {
		return this.resources.retrieve<CustomerPaymentSource>({ type: CustomerPaymentSources.TYPE, id }, params, options)
	}

	async update(resource: CustomerPaymentSourceUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPaymentSource> {
		return this.resources.update<CustomerPaymentSourceUpdate, CustomerPaymentSource>({ ...resource, type: CustomerPaymentSources.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: CustomerPaymentSources.TYPE, id }, options)
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


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCustomerPaymentSource(resource: any): resource is CustomerPaymentSource {
		return resource.type && (resource.type === CustomerPaymentSources.TYPE)
	}


	relationship(id: string | ResourceId | null): CustomerPaymentSourceRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: CustomerPaymentSources.TYPE } : { id: id.id, type: CustomerPaymentSources.TYPE }
	}


	type(): string {
		return CustomerPaymentSources.TYPE
	}

}


export default CustomerPaymentSources

export { CustomerPaymentSource, CustomerPaymentSourceCreate, CustomerPaymentSourceUpdate }
