/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.3.0
 * Generation date: 22-07-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Customer } from './customers'
import { Market } from './markets'
import { Attachment } from './attachments'




interface CustomerGroup extends Resource {
	
	name?: string

	customers?: Customer[]
	markets?: Market[]
	attachments?: Attachment[]

}


interface CustomerGroupCreate extends ResourceCreate {
	
	name: string
	
}


interface CustomerGroupUpdate extends ResourceUpdate {
	
	name?: string
	
}


class CustomerGroups extends ApiResource {

	static readonly TYPE: 'customer_groups' = 'customer_groups'
	// static readonly PATH = 'customer_groups'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<CustomerGroup[]> {
		return this.resources.list({ type: CustomerGroups.TYPE }, params, options)
	}

	async create(resource: CustomerGroupCreate, options?: ResourcesConfig): Promise<CustomerGroup> {
		return this.resources.create(Object.assign(resource, { type: CustomerGroups.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerGroup> {
		return this.resources.retrieve<CustomerGroup>({ type: CustomerGroups.TYPE, id }, params, options)
	}

	async update(resource: CustomerGroupUpdate, options?: ResourcesConfig): Promise<CustomerGroup> {
		return this.resources.update({ ...resource, type: CustomerGroups.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		this.resources.delete({ type: CustomerGroups.TYPE, id }, options)
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCustomerGroup(resource: any): resource is CustomerGroup {
		return resource.type && (resource.type === CustomerGroups.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(CustomerGroups.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(CustomerGroups.TYPE)
	}
	*/

	relationship(id: string): ResourceId & { type: typeof CustomerGroups.TYPE } {
		return { id, type: CustomerGroups.TYPE }
	}

}


export default CustomerGroups

export { CustomerGroup, CustomerGroupCreate, CustomerGroupUpdate }
