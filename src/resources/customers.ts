import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { CustomerGroup } from './customer_groups'
import type { CustomerAddress } from './customer_addresses'
import type { CustomerPaymentSource } from './customer_payment_sources'
import type { CustomerSubscription } from './customer_subscriptions'
import type { Order } from './orders'
import type { OrderSubscription } from './order_subscriptions'
import type { Return } from './returns'
import type { SkuList } from './sku_lists'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag } from './tags'


type CustomerRel = ResourceRel & { type: typeof Customers.TYPE }
type CustomerGroupRel = ResourceRel & { type: 'customer_groups' }
type TagRel = ResourceRel & { type: 'tags' }


interface Customer extends Resource {
	
	email?: string
	status?: string
	has_password?: boolean
	total_orders_count?: number
	shopper_reference?: string

	customer_group?: CustomerGroup
	customer_addresses?: CustomerAddress[]
	customer_payment_sources?: CustomerPaymentSource[]
	customer_subscriptions?: CustomerSubscription[]
	orders?: Order[]
	order_subscriptions?: OrderSubscription[]
	returns?: Return[]
	sku_lists?: SkuList[]
	attachments?: Attachment[]
	events?: Event[]
	tags?: Tag[]

}


interface CustomerCreate extends ResourceCreate {
	
	email: string
	password?: string
	shopper_reference?: string

	customer_group?: CustomerGroupRel
	tags?: TagRel[]

}


interface CustomerUpdate extends ResourceUpdate {
	
	email?: string
	password?: string
	shopper_reference?: string

	customer_group?: CustomerGroupRel
	tags?: TagRel[]

}


class Customers extends ApiResource {

	static readonly TYPE: 'customers' = 'customers' as const
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

	async customer_group(customerId: string | Customer, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerGroup> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<CustomerGroup>({ type: 'customer_groups' }, `customers/${_customerId}/customer_group`, params, options) as unknown as CustomerGroup
	}

	async customer_addresses(customerId: string | Customer, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerAddress>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<CustomerAddress>({ type: 'customer_addresses' }, `customers/${_customerId}/customer_addresses`, params, options) as unknown as ListResponse<CustomerAddress>
	}

	async customer_payment_sources(customerId: string | Customer, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerPaymentSource>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<CustomerPaymentSource>({ type: 'customer_payment_sources' }, `customers/${_customerId}/customer_payment_sources`, params, options) as unknown as ListResponse<CustomerPaymentSource>
	}

	async customer_subscriptions(customerId: string | Customer, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerSubscription>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<CustomerSubscription>({ type: 'customer_subscriptions' }, `customers/${_customerId}/customer_subscriptions`, params, options) as unknown as ListResponse<CustomerSubscription>
	}

	async orders(customerId: string | Customer, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Order>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `customers/${_customerId}/orders`, params, options) as unknown as ListResponse<Order>
	}

	async order_subscriptions(customerId: string | Customer, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<OrderSubscription>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<OrderSubscription>({ type: 'order_subscriptions' }, `customers/${_customerId}/order_subscriptions`, params, options) as unknown as ListResponse<OrderSubscription>
	}

	async returns(customerId: string | Customer, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Return>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<Return>({ type: 'returns' }, `customers/${_customerId}/returns`, params, options) as unknown as ListResponse<Return>
	}

	async sku_lists(customerId: string | Customer, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SkuList>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `customers/${_customerId}/sku_lists`, params, options) as unknown as ListResponse<SkuList>
	}

	async attachments(customerId: string | Customer, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `customers/${_customerId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(customerId: string | Customer, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<Event>({ type: 'events' }, `customers/${_customerId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(customerId: string | Customer, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `customers/${_customerId}/tags`, params, options) as unknown as ListResponse<Tag>
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
