import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Customer } from './customers'
import type { AdyenPayment } from './adyen_payments'
import type { BraintreePayment } from './braintree_payments'
import type { CheckoutComPayment } from './checkout_com_payments'
import type { ExternalPayment } from './external_payments'
import type { KlarnaPayment } from './klarna_payments'
import type { PaypalPayment } from './paypal_payments'
import type { StripePayment } from './stripe_payments'
import type { WireTransfer } from './wire_transfers'


type CustomerPaymentSourceRel = ResourceRel & { type: typeof CustomerPaymentSources.TYPE }
type CustomerRel = ResourceRel & { type: 'customers' }
type AdyenPaymentRel = ResourceRel & { type: 'adyen_payments' }
type BraintreePaymentRel = ResourceRel & { type: 'braintree_payments' }
type CheckoutComPaymentRel = ResourceRel & { type: 'checkout_com_payments' }
type ExternalPaymentRel = ResourceRel & { type: 'external_payments' }
type KlarnaPaymentRel = ResourceRel & { type: 'klarna_payments' }
type PaypalPaymentRel = ResourceRel & { type: 'paypal_payments' }
type StripePaymentRel = ResourceRel & { type: 'stripe_payments' }
type WireTransferRel = ResourceRel & { type: 'wire_transfers' }


interface CustomerPaymentSource extends Resource {
	
	name?: string
	customer_token?: string
	payment_source_token?: string

	customer?: Customer
	payment_source?: AdyenPayment | BraintreePayment | CheckoutComPayment | ExternalPayment | KlarnaPayment | PaypalPayment | StripePayment | WireTransfer

}


interface CustomerPaymentSourceCreate extends ResourceCreate {
	
	customer: CustomerRel
	payment_source: AdyenPaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | PaypalPaymentRel | StripePaymentRel | WireTransferRel

}


interface CustomerPaymentSourceUpdate extends ResourceUpdate {
	
	customer?: CustomerRel
	payment_source?: AdyenPaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | PaypalPaymentRel | StripePaymentRel | WireTransferRel

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
