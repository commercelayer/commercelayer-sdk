/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { CustomerGroup } from './customer_groups'
import { CustomerAddress } from './customer_addresses'
import { CustomerPaymentSource } from './customer_payment_sources'
import { CustomerSubscription } from './customer_subscriptions'
import { Order } from './orders'
import { Return } from './returns'
import { Attachment } from './attachments'


type CustomerRel = ResourceId & { type: typeof Customers.TYPE }
type CustomerGroupRel = ResourceId & { type: 'customer_groups' }


interface Customer extends Resource {
	
	email?: string
	status?: string
	has_password?: boolean

	customer_group?: CustomerGroup
	customer_addresses?: CustomerAddress[]
	customer_payment_sources?: CustomerPaymentSource[]
	customer_subscriptions?: CustomerSubscription[]
	orders?: Order[]
	returns?: Return[]
	attachments?: Attachment[]

}


interface CustomerCreate extends ResourceCreate {
	
	email: string
	password?: string

	customer_group?: CustomerGroupRel

}


interface CustomerUpdate extends ResourceUpdate {
	
	email?: string
	password?: string

	customer_group?: CustomerGroupRel

}


class Customers extends ApiResource {

	static readonly TYPE: 'customers' = 'customers'
	// static readonly PATH = 'customers'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Customer>> {
		return this.resources.list({ type: Customers.TYPE }, params, options)
	}

	async create(resource: CustomerCreate, options?: ResourcesConfig): Promise<Customer> {
		return this.resources.create(Object.assign(resource, { type: Customers.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		return this.resources.retrieve<Customer>({ type: Customers.TYPE, id }, params, options)
	}

	async update(resource: CustomerUpdate, options?: ResourcesConfig): Promise<Customer> {
		return this.resources.update({ ...resource, type: Customers.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Customers.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCustomer(resource: any): resource is Customer {
		return resource.type && (resource.type === Customers.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(Customers.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(Customers.TYPE)
	}
	*/

	relationship(id: string | ResourceId): CustomerRel {
		return (typeof id === 'string') ? { id, type: Customers.TYPE } : {id: id.id, type: Customers.TYPE }
	}

}


export default Customers

export { Customer, CustomerCreate, CustomerUpdate }
