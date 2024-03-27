import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Customer, CustomerType, CustomerSortable } from './customers'
import type { PaymentMethod, PaymentMethodType, PaymentMethodSortable } from './payment_methods'
import type { AdyenPayment, AdyenPaymentType, AdyenPaymentSortable } from './adyen_payments'
import type { AxervePayment, AxervePaymentType, AxervePaymentSortable } from './axerve_payments'
import type { BraintreePayment, BraintreePaymentType, BraintreePaymentSortable } from './braintree_payments'
import type { CheckoutComPayment, CheckoutComPaymentType, CheckoutComPaymentSortable } from './checkout_com_payments'
import type { ExternalPayment, ExternalPaymentType, ExternalPaymentSortable } from './external_payments'
import type { KlarnaPayment, KlarnaPaymentType, KlarnaPaymentSortable } from './klarna_payments'
import type { SatispayPayment, SatispayPaymentType, SatispayPaymentSortable } from './satispay_payments'
import type { StripePayment, StripePaymentType, StripePaymentSortable } from './stripe_payments'
import type { Version, VersionSortable } from './versions'


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
type SatispayPaymentRel = ResourceRel & { type: SatispayPaymentType }
type StripePaymentRel = ResourceRel & { type: StripePaymentType }


export type CustomerPaymentSourceSortable = Pick<CustomerPaymentSource, 'id'> & ResourceSortable
export type CustomerPaymentSourceFilterable = Pick<CustomerPaymentSource, 'id' | 'name' | 'payment_source_token'> & ResourceFilterable


interface CustomerPaymentSource extends Resource {
	
	readonly type: CustomerPaymentSourceType

	name?: string | null
	customer_token?: string | null
	payment_source_token?: string | null

	customer?: Customer | null
	payment_method?: PaymentMethod | null
	payment_source?: AdyenPayment | AxervePayment | BraintreePayment | CheckoutComPayment | ExternalPayment | KlarnaPayment | SatispayPayment | StripePayment | null
	versions?: Version[] | null

}


interface CustomerPaymentSourceCreate extends ResourceCreate {
	
	customer_token?: string | null
	payment_source_token?: string | null

	customer: CustomerRel
	payment_method?: PaymentMethodRel | null
	payment_source?: AdyenPaymentRel | AxervePaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | SatispayPaymentRel | StripePaymentRel | null

}


interface CustomerPaymentSourceUpdate extends ResourceUpdate {
	
	customer_token?: string | null
	payment_source_token?: string | null

	customer?: CustomerRel | null
	payment_method?: PaymentMethodRel | null
	payment_source?: AdyenPaymentRel | AxervePaymentRel | BraintreePaymentRel | CheckoutComPaymentRel | ExternalPaymentRel | KlarnaPaymentRel | SatispayPaymentRel | StripePaymentRel | null

}


class CustomerPaymentSources extends ApiResource<CustomerPaymentSource, CustomerPaymentSourceSortable> {

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
		return this.resources.fetch<Customer, CustomerSortable>({ type: 'customers' }, `customer_payment_sources/${_customerPaymentSourceId}/customer`, params, options) as unknown as Customer
	}

	async payment_method(customerPaymentSourceId: string | CustomerPaymentSource, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PaymentMethod> {
		const _customerPaymentSourceId = (customerPaymentSourceId as CustomerPaymentSource).id || customerPaymentSourceId as string
		return this.resources.fetch<PaymentMethod, PaymentMethodSortable>({ type: 'payment_methods' }, `customer_payment_sources/${_customerPaymentSourceId}/payment_method`, params, options) as unknown as PaymentMethod
	}

	async versions(customerPaymentSourceId: string | CustomerPaymentSource, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _customerPaymentSourceId = (customerPaymentSourceId as CustomerPaymentSource).id || customerPaymentSourceId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `customer_payment_sources/${_customerPaymentSourceId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isCustomerPaymentSource(resource: any): resource is CustomerPaymentSource {
		return resource.type && (resource.type === CustomerPaymentSources.TYPE)
	}


	relationship(id: string | ResourceId | null): CustomerPaymentSourceRel {
		return super.relationshipOneToOne<CustomerPaymentSourceRel>(id)
	}

	relationshipToMany(...ids: string[]): CustomerPaymentSourceRel[] {
		return super.relationshipOneToMany<CustomerPaymentSourceRel>(...ids)
	}


	type(): CustomerPaymentSourceType {
		return CustomerPaymentSources.TYPE
	}

}


export default CustomerPaymentSources

export type { CustomerPaymentSource, CustomerPaymentSourceCreate, CustomerPaymentSourceUpdate, CustomerPaymentSourceType }

/*
export const CustomerPaymentSourcesClient = (init: ResourceAdapter | ResourcesInitConfig): CustomerPaymentSources => {
	return new CustomerPaymentSources((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
