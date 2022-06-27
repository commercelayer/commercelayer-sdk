import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { CustomerGroup } from './customer_groups'
import { CustomerAddress } from './customer_addresses'
import { CustomerPaymentSource } from './customer_payment_sources'
import { CustomerSubscription } from './customer_subscriptions'
import { Order } from './orders'
import { OrderSubscription } from './order_subscriptions'
import { Return } from './returns'
import { Attachment } from './attachments'
import { Event } from './events'


type CustomerRel = ResourceRel & { type: typeof Customers.TYPE }
type CustomerGroupRel = ResourceRel & { type: 'customer_groups' }


interface Customer extends Resource {
	
	email?: string
	status?: string
	has_password?: boolean

	customer_group?: CustomerGroup
	customer_addresses?: CustomerAddress[]
	customer_payment_sources?: CustomerPaymentSource[]
	customer_subscriptions?: CustomerSubscription[]
	orders?: Order[]
	order_subscriptions?: OrderSubscription[]
	returns?: Return[]
	attachments?: Attachment[]
	events?: Event[]

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

	async create(resource: CustomerCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		return this.resources.create({ ...resource, type: Customers.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		return this.resources.retrieve<Customer>({ type: Customers.TYPE, id }, params, options)
	}

	async update(resource: CustomerUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		return this.resources.update({ ...resource, type: Customers.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Customers.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCustomer(resource: any): resource is Customer {
		return resource.type && (resource.type === Customers.TYPE)
	}


	relationship(id: string | ResourceId | null): CustomerRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Customers.TYPE } : { id: id.id, type: Customers.TYPE }
	}


	type(): string {
		return Customers.TYPE
	}

}


export default Customers

export { Customer, CustomerCreate, CustomerUpdate }
