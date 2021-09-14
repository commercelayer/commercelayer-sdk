/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Customer } from './customers'
import { CreditCard } from './credit_cards'


type CustomerPaymentSourceRel = ResourceId & { type: typeof CustomerPaymentSources.TYPE }
type CustomerRel = ResourceId & { type: 'customers' }
type CreditCardRel = ResourceId & { type: 'credit_cards' }


interface CustomerPaymentSource extends Resource {
	
	name?: string
	customer_token?: string
	payment_source_token?: string

	customer?: Customer
	payment_source?: CreditCard

}


interface CustomerPaymentSourceCreate extends ResourceCreate {
	
	customer?: CustomerRel
	payment_source?: CreditCardRel

}


interface CustomerPaymentSourceUpdate extends ResourceUpdate {
	
	customer?: CustomerRel
	payment_source?: CreditCardRel

}


class CustomerPaymentSources extends ApiResource {

	static readonly TYPE: 'customer_payment_sources' = 'customer_payment_sources'
	// static readonly PATH = 'customer_payment_sources'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerPaymentSource>> {
		return this.resources.list({ type: CustomerPaymentSources.TYPE }, params, options)
	}

	async create(resource: CustomerPaymentSourceCreate, options?: ResourcesConfig): Promise<CustomerPaymentSource> {
		return this.resources.create(Object.assign(resource, { type: CustomerPaymentSources.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPaymentSource> {
		return this.resources.retrieve<CustomerPaymentSource>({ type: CustomerPaymentSources.TYPE, id }, params, options)
	}

	async update(resource: CustomerPaymentSourceUpdate, options?: ResourcesConfig): Promise<CustomerPaymentSource> {
		return this.resources.update({ ...resource, type: CustomerPaymentSources.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: CustomerPaymentSources.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCustomerPaymentSource(resource: any): resource is CustomerPaymentSource {
		return resource.type && (resource.type === CustomerPaymentSources.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(CustomerPaymentSources.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(CustomerPaymentSources.TYPE)
	}
	*/

	relationship(id: string | ResourceId): CustomerPaymentSourceRel {
		return (typeof id === 'string') ? { id, type: CustomerPaymentSources.TYPE } : {id: id.id, type: CustomerPaymentSources.TYPE }
	}

}


export default CustomerPaymentSources

export { CustomerPaymentSource, CustomerPaymentSourceCreate, CustomerPaymentSourceUpdate }
