import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Customer, CustomerType } from './customers'
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

	name?: string
	customer_token?: string
	payment_source_token?: string

	customer?: Customer
	payment_source?: AdyenPayment | AxervePayment | BraintreePayment | CheckoutComPayment | ExternalPayment | KlarnaPayment | PaypalPayment | SatispayPayment | StripePayment | WireTransfer

}


interface CustomerPaymentSourceCreate extends ResourceCreate {
	
	customer: CustomerRel
	payment_source: AdyenPaymentRel | AxervePaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | PaypalPaymentRel | SatispayPaymentRel | StripePaymentRel | WireTransferRel

}


interface CustomerPaymentSourceUpdate extends ResourceUpdate {
	
	customer?: CustomerRel
	payment_source?: AdyenPaymentRel | AxervePaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | PaypalPaymentRel | SatispayPaymentRel | StripePaymentRel | WireTransferRel

}


class CustomerPaymentSources extends ApiResource<CustomerPaymentSource> {

	static readonly TYPE: CustomerPaymentSourceType = 'customer_payment_sources' as const

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerPaymentSource>> {
		return this.resources.list<CustomerPaymentSource>({ type: CustomerPaymentSources.TYPE }, params, options)
	}

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
