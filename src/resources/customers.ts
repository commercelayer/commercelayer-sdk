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
		return this.resources.list<Customer>({ type: Customers.TYPE }, params, options)
	}

	async create(resource: CustomerCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		return this.resources.create<CustomerCreate, Customer>({ ...resource, type: Customers.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		return this.resources.retrieve<Customer>({ type: Customers.TYPE, id }, params, options)
	}

	async update(resource: CustomerUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		return this.resources.update<CustomerUpdate, Customer>({ ...resource, type: Customers.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Customers.TYPE, id }, options)
	}

	async customer_group(customerId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerGroup> {
		return this.resources.fetch<CustomerGroup>({ type: 'customer_groups' }, `customers/${customerId}/customer_group`, params, options) as unknown as CustomerGroup
	}

	async customer_addresses(customerId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerAddress>> {
		return this.resources.fetch<CustomerAddress>({ type: 'customer_addresses' }, `customers/${customerId}/customer_addresses`, params, options) as unknown as ListResponse<CustomerAddress>
	}

	async customer_payment_sources(customerId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerPaymentSource>> {
		return this.resources.fetch<CustomerPaymentSource>({ type: 'customer_payment_sources' }, `customers/${customerId}/customer_payment_sources`, params, options) as unknown as ListResponse<CustomerPaymentSource>
	}

	async customer_subscriptions(customerId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerSubscription>> {
		return this.resources.fetch<CustomerSubscription>({ type: 'customer_subscriptions' }, `customers/${customerId}/customer_subscriptions`, params, options) as unknown as ListResponse<CustomerSubscription>
	}

	async orders(customerId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Order>> {
		return this.resources.fetch<Order>({ type: 'orders' }, `customers/${customerId}/orders`, params, options) as unknown as ListResponse<Order>
	}

	async order_subscriptions(customerId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderSubscription>> {
		return this.resources.fetch<OrderSubscription>({ type: 'order_subscriptions' }, `customers/${customerId}/order_subscriptions`, params, options) as unknown as ListResponse<OrderSubscription>
	}

	async returns(customerId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Return>> {
		return this.resources.fetch<Return>({ type: 'returns' }, `customers/${customerId}/returns`, params, options) as unknown as ListResponse<Return>
	}

	async attachments(customerId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `customers/${customerId}/attachments`, params, options) as unknown as ListResponse<Attachment>
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
