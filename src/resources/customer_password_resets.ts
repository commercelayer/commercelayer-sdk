import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Customer } from './customers'
import type { Event } from './events'


type CustomerPasswordResetType = 'customer_password_resets'
type CustomerPasswordResetRel = ResourceRel & { type: CustomerPasswordResetType }


interface CustomerPasswordReset extends Resource {
	
	readonly type: CustomerPasswordResetType

	customer_email?: string
	reset_password_token?: string
	reset_password_at?: string

	customer?: Customer
	events?: Event[]

}


interface CustomerPasswordResetCreate extends ResourceCreate {
	
	customer_email: string
	
}


interface CustomerPasswordResetUpdate extends ResourceUpdate {
	
	customer_password?: string
	_reset_password_token?: string
	
}


class CustomerPasswordResets extends ApiResource<CustomerPasswordReset> {

	static readonly TYPE: CustomerPasswordResetType = 'customer_password_resets' as const
	// static readonly PATH = 'customer_password_resets'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerPasswordReset>> {
		return this.resources.list<CustomerPasswordReset>({ type: CustomerPasswordResets.TYPE }, params, options)
	}

	async create(resource: CustomerPasswordResetCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPasswordReset> {
		return this.resources.create<CustomerPasswordResetCreate, CustomerPasswordReset>({ ...resource, type: CustomerPasswordResets.TYPE }, params, options)
	}

	async update(resource: CustomerPasswordResetUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPasswordReset> {
		return this.resources.update<CustomerPasswordResetUpdate, CustomerPasswordReset>({ ...resource, type: CustomerPasswordResets.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: CustomerPasswordResets.TYPE } : id, options)
	}

	async customer(customerPasswordResetId: string | CustomerPasswordReset, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		const _customerPasswordResetId = (customerPasswordResetId as CustomerPasswordReset).id || customerPasswordResetId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `customer_password_resets/${_customerPasswordResetId}/customer`, params, options) as unknown as Customer
	}

	async events(customerPasswordResetId: string | CustomerPasswordReset, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _customerPasswordResetId = (customerPasswordResetId as CustomerPasswordReset).id || customerPasswordResetId as string
		return this.resources.fetch<Event>({ type: 'events' }, `customer_password_resets/${_customerPasswordResetId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isCustomerPasswordReset(resource: any): resource is CustomerPasswordReset {
		return resource.type && (resource.type === CustomerPasswordResets.TYPE)
	}


	relationship(id: string | ResourceId | null): CustomerPasswordResetRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: CustomerPasswordResets.TYPE } : { id: id.id, type: CustomerPasswordResets.TYPE }
	}


	type(): CustomerPasswordResetType {
		return CustomerPasswordResets.TYPE
	}

}


export default CustomerPasswordResets

export type { CustomerPasswordReset, CustomerPasswordResetCreate, CustomerPasswordResetUpdate, CustomerPasswordResetType }
