import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Customer, CustomerSortable } from './customers'
import type { Event, EventSortable } from './events'


type CustomerPasswordResetType = 'customer_password_resets'
type CustomerPasswordResetRel = ResourceRel & { type: CustomerPasswordResetType }


export type CustomerPasswordResetSortable = Pick<CustomerPasswordReset, 'id'> & ResourceSortable
export type CustomerPasswordResetFilterable = Pick<CustomerPasswordReset, 'id' | 'reset_password_token' | 'reset_password_at'> & ResourceFilterable


interface CustomerPasswordReset extends Resource {
	
	readonly type: CustomerPasswordResetType

	customer_email: string
	reset_password_token?: string | null
	reset_password_at?: string | null

	customer?: Customer | null
	events?: Event[] | null

}


interface CustomerPasswordResetCreate extends ResourceCreate {
	
	customer_email: string
	
}


interface CustomerPasswordResetUpdate extends ResourceUpdate {
	
	customer_password?: string | null
	_reset_password_token?: string | null
	
}


class CustomerPasswordResets extends ApiResource<CustomerPasswordReset, CustomerPasswordResetSortable> {

	static readonly TYPE: CustomerPasswordResetType = 'customer_password_resets' as const

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
		return this.resources.fetch<Customer, CustomerSortable>({ type: 'customers' }, `customer_password_resets/${_customerPasswordResetId}/customer`, params, options) as unknown as Customer
	}

	async events(customerPasswordResetId: string | CustomerPasswordReset, params?: QueryParamsList<EventSortable>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _customerPasswordResetId = (customerPasswordResetId as CustomerPasswordReset).id || customerPasswordResetId as string
		return this.resources.fetch<Event, EventSortable>({ type: 'events' }, `customer_password_resets/${_customerPasswordResetId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async _reset_password_token(id: string | CustomerPasswordReset, triggerValue: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPasswordReset> {
		return this.resources.update<CustomerPasswordResetUpdate, CustomerPasswordReset>({ id: (typeof id === 'string')? id: id.id, type: CustomerPasswordResets.TYPE, _reset_password_token: triggerValue }, params, options)
	}


	isCustomerPasswordReset(resource: any): resource is CustomerPasswordReset {
		return resource.type && (resource.type === CustomerPasswordResets.TYPE)
	}


	relationship(id: string | ResourceId | null): CustomerPasswordResetRel {
		return super.relationshipOneToOne<CustomerPasswordResetRel>(id)
	}

	relationshipToMany(...ids: string[]): CustomerPasswordResetRel[] {
		return super.relationshipOneToMany<CustomerPasswordResetRel>(...ids)
	}


	type(): CustomerPasswordResetType {
		return CustomerPasswordResets.TYPE
	}

}


export default CustomerPasswordResets

export type { CustomerPasswordReset, CustomerPasswordResetCreate, CustomerPasswordResetUpdate, CustomerPasswordResetType }

/*
export const CustomerPasswordResetsClient = (init: ResourceAdapter | ResourcesInitConfig): CustomerPasswordResets => {
	return new CustomerPasswordResets((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
