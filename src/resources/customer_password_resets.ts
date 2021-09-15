/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Customer } from './customers'


type CustomerPasswordResetRel = ResourceId & { type: typeof CustomerPasswordResets.TYPE }


interface CustomerPasswordReset extends Resource {
	
	customer_email?: string
	reset_password_token?: string
	reset_password_at?: string

	customer?: Customer

}


interface CustomerPasswordResetCreate extends ResourceCreate {
	
	customer_email: string
	
}


interface CustomerPasswordResetUpdate extends ResourceUpdate {
	
	customer_password?: string
	_reset_password_token?: string
	
}


class CustomerPasswordResets extends ApiResource {

	static readonly TYPE: 'customer_password_resets' = 'customer_password_resets'
	// static readonly PATH = 'customer_password_resets'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerPasswordReset>> {
		return this.resources.list({ type: CustomerPasswordResets.TYPE }, params, options)
	}

	async create(resource: CustomerPasswordResetCreate, options?: ResourcesConfig): Promise<CustomerPasswordReset> {
		return this.resources.create(Object.assign(resource, { type: CustomerPasswordResets.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPasswordReset> {
		return this.resources.retrieve<CustomerPasswordReset>({ type: CustomerPasswordResets.TYPE, id }, params, options)
	}

	async update(resource: CustomerPasswordResetUpdate, options?: ResourcesConfig): Promise<CustomerPasswordReset> {
		return this.resources.update({ ...resource, type: CustomerPasswordResets.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: CustomerPasswordResets.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCustomerPasswordReset(resource: any): resource is CustomerPasswordReset {
		return resource.type && (resource.type === CustomerPasswordResets.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(CustomerPasswordResets.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(CustomerPasswordResets.TYPE)
	}
	*/

	relationship(id: string | ResourceId): CustomerPasswordResetRel {
		return (typeof id === 'string') ? { id, type: CustomerPasswordResets.TYPE } : {id: id.id, type: CustomerPasswordResets.TYPE }
	}

}


export default CustomerPasswordResets

export { CustomerPasswordReset, CustomerPasswordResetCreate, CustomerPasswordResetUpdate }
