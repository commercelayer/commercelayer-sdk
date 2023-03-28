import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Customer } from './customers'
import type { Event } from './events'


type CustomerSubscriptionType = 'customer_subscriptions'
type CustomerSubscriptionRel = ResourceRel & { type: CustomerSubscriptionType }


interface CustomerSubscription extends Resource {
	
	readonly type: CustomerSubscriptionType

	customer_email: string

	customer?: Customer | null
	events?: Event[] | null

}


interface CustomerSubscriptionCreate extends ResourceCreate {
	
	customer_email: string
	
}


type CustomerSubscriptionUpdate = ResourceUpdate


class CustomerSubscriptions extends ApiResource<CustomerSubscription> {

	static readonly TYPE: CustomerSubscriptionType = 'customer_subscriptions' as const

	async create(resource: CustomerSubscriptionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerSubscription> {
		return this.resources.create<CustomerSubscriptionCreate, CustomerSubscription>({ ...resource, type: CustomerSubscriptions.TYPE }, params, options)
	}

	async update(resource: CustomerSubscriptionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerSubscription> {
		return this.resources.update<CustomerSubscriptionUpdate, CustomerSubscription>({ ...resource, type: CustomerSubscriptions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: CustomerSubscriptions.TYPE } : id, options)
	}

	async customer(customerSubscriptionId: string | CustomerSubscription, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		const _customerSubscriptionId = (customerSubscriptionId as CustomerSubscription).id || customerSubscriptionId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `customer_subscriptions/${_customerSubscriptionId}/customer`, params, options) as unknown as Customer
	}

	async events(customerSubscriptionId: string | CustomerSubscription, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _customerSubscriptionId = (customerSubscriptionId as CustomerSubscription).id || customerSubscriptionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `customer_subscriptions/${_customerSubscriptionId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isCustomerSubscription(resource: any): resource is CustomerSubscription {
		return resource.type && (resource.type === CustomerSubscriptions.TYPE)
	}


	relationship(id: string | ResourceId | null): CustomerSubscriptionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: CustomerSubscriptions.TYPE } : { id: id.id, type: CustomerSubscriptions.TYPE }
	}


	type(): CustomerSubscriptionType {
		return CustomerSubscriptions.TYPE
	}

}


export default CustomerSubscriptions

export type { CustomerSubscription, CustomerSubscriptionCreate, CustomerSubscriptionUpdate, CustomerSubscriptionType }
