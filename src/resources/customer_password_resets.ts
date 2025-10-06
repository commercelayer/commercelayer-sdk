import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Customer } from './customers'
import type { Event } from './events'
import type { EventStore } from './event_stores'


type CustomerPasswordResetType = 'customer_password_resets'
type CustomerPasswordResetRel = ResourceRel & { type: CustomerPasswordResetType }


export type CustomerPasswordResetSort = Pick<CustomerPasswordReset, 'id'> & ResourceSort
// export type CustomerPasswordResetFilter = Pick<CustomerPasswordReset, 'id' | 'reset_password_token' | 'reset_password_at'> & ResourceFilter


interface CustomerPasswordReset extends Resource {
	
	readonly type: CustomerPasswordResetType

	/** 
	 * The email of the customer that requires a password reset.
	 * @example ```"john@example.com"```
	 */
	customer_email: string
	/** 
	 * Automatically generated on create. Send its value as the '_reset_password_token' argument when updating the customer password.
	 * @example ```"xhFfkmfybsLxzaAP6xcs"```
	 */
	reset_password_token?: string | null
	/** 
	 * Time at which the password was reset.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	reset_password_at?: string | null

	customer?: Customer | null
	events?: Event[] | null
	event_stores?: EventStore[] | null

}


interface CustomerPasswordResetCreate extends ResourceCreate {
	
	/** 
	 * The email of the customer that requires a password reset.
	 * @example ```"john@example.com"```
	 */
	customer_email: string
	
}


interface CustomerPasswordResetUpdate extends ResourceUpdate {
	
	/** 
	 * The customer new password. This will be accepted only if a valid '_reset_password_token' is sent with the request.
	 * @example ```"secret"```
	 */
	customer_password?: string | null
	/** 
	 * Send the 'reset_password_token' that you got on create when updating the customer password.
	 * @example ```"xhFfkmfybsLxzaAP6xcs"```
	 */
	_reset_password_token?: string | null
	
}


class CustomerPasswordResets extends ApiResource<CustomerPasswordReset> {

	static readonly TYPE: CustomerPasswordResetType = 'customer_password_resets' as const

	async create(resource: CustomerPasswordResetCreate, params?: QueryParamsRetrieve<CustomerPasswordReset>, options?: ResourcesConfig): Promise<CustomerPasswordReset> {
		return this.resources.create<CustomerPasswordResetCreate, CustomerPasswordReset>({ ...resource, type: CustomerPasswordResets.TYPE }, params, options)
	}

	async update(resource: CustomerPasswordResetUpdate, params?: QueryParamsRetrieve<CustomerPasswordReset>, options?: ResourcesConfig): Promise<CustomerPasswordReset> {
		return this.resources.update<CustomerPasswordResetUpdate, CustomerPasswordReset>({ ...resource, type: CustomerPasswordResets.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: CustomerPasswordResets.TYPE } : id, options)
	}

	async customer(customerPasswordResetId: string | CustomerPasswordReset, params?: QueryParamsRetrieve<Customer>, options?: ResourcesConfig): Promise<Customer> {
		const _customerPasswordResetId = (customerPasswordResetId as CustomerPasswordReset).id || customerPasswordResetId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `customer_password_resets/${_customerPasswordResetId}/customer`, params, options) as unknown as Customer
	}

	async events(customerPasswordResetId: string | CustomerPasswordReset, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _customerPasswordResetId = (customerPasswordResetId as CustomerPasswordReset).id || customerPasswordResetId as string
		return this.resources.fetch<Event>({ type: 'events' }, `customer_password_resets/${_customerPasswordResetId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async event_stores(customerPasswordResetId: string | CustomerPasswordReset, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _customerPasswordResetId = (customerPasswordResetId as CustomerPasswordReset).id || customerPasswordResetId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `customer_password_resets/${_customerPasswordResetId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}

	async _reset_password_token(id: string | CustomerPasswordReset, triggerValue: string, params?: QueryParamsRetrieve<CustomerPasswordReset>, options?: ResourcesConfig): Promise<CustomerPasswordReset> {
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


const instance = new CustomerPasswordResets()
export default instance

export type { CustomerPasswordResets, CustomerPasswordReset, CustomerPasswordResetCreate, CustomerPasswordResetUpdate, CustomerPasswordResetType }
