import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { CustomerGroup, CustomerGroupType } from './customer_groups'
import type { CustomerAddress } from './customer_addresses'
import type { CustomerPaymentSource } from './customer_payment_sources'
import type { CustomerSubscription } from './customer_subscriptions'
import type { Order } from './orders'
import type { OrderSubscription } from './order_subscriptions'
import type { Return } from './returns'
import type { SkuList } from './sku_lists'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag, TagType } from './tags'


type CustomerType = 'customers'
type CustomerRel = ResourceRel & { type: CustomerType }
type CustomerGroupRel = ResourceRel & { type: CustomerGroupType }
type TagRel = ResourceRel & { type: TagType }


export type CustomerSort = Pick<Customer, 'id' | 'email' | 'status' | 'total_orders_count'> & ResourceSort
// export type CustomerFilter = Pick<Customer, 'id' | 'email' | 'status' | 'total_orders_count'> & ResourceFilter


interface Customer extends Resource {
	
	readonly type: CustomerType

	/** 
	 * The customer's email address.
	 * @example ```"john@example.com"```
	 */
	email: string
	/** 
	 * The customer's status. One of 'prospect' (default), 'acquired', or 'repeat'.
	 * @example ```"prospect"```
	 */
	status: 'prospect' | 'acquired' | 'repeat'
	/** 
	 * Indicates if the customer has a password.
	 */
	has_password?: boolean | null
	/** 
	 * The total number of orders for the customer.
	 * @example ```6```
	 */
	total_orders_count?: number | null
	/** 
	 * A reference to uniquely identify the shopper during payment sessions.
	 * @example ```"xxx-yyy-zzz"```
	 */
	shopper_reference?: string | null
	/** 
	 * A reference to uniquely identify the customer on any connected external services.
	 * @example ```"xxx-yyy-zzz"```
	 */
	profile_id?: string | null
	/** 
	 * A specific code to identify the tax exemption reason for this customer.
	 * @example ```"xxx-yyy-zzz"```
	 */
	tax_exemption_code?: string | null

	customer_group?: CustomerGroup | null
	customer_addresses?: CustomerAddress[] | null
	customer_payment_sources?: CustomerPaymentSource[] | null
	customer_subscriptions?: CustomerSubscription[] | null
	orders?: Order[] | null
	order_subscriptions?: OrderSubscription[] | null
	returns?: Return[] | null
	sku_lists?: SkuList[] | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	tags?: Tag[] | null

}


interface CustomerCreate extends ResourceCreate {
	
	/** 
	 * The customer's email address.
	 * @example ```"john@example.com"```
	 */
	email: string
	/** 
	 * The customer's password. Initiate a customer password reset flow if you need to change it.
	 * @example ```"secret"```
	 */
	password?: string | null
	/** 
	 * A reference to uniquely identify the shopper during payment sessions.
	 * @example ```"xxx-yyy-zzz"```
	 */
	shopper_reference?: string | null
	/** 
	 * A reference to uniquely identify the customer on any connected external services.
	 * @example ```"xxx-yyy-zzz"```
	 */
	profile_id?: string | null
	/** 
	 * A specific code to identify the tax exemption reason for this customer.
	 * @example ```"xxx-yyy-zzz"```
	 */
	tax_exemption_code?: string | null

	customer_group?: CustomerGroupRel | null
	tags?: TagRel[] | null

}


interface CustomerUpdate extends ResourceUpdate {
	
	/** 
	 * The customer's email address.
	 * @example ```"john@example.com"```
	 */
	email?: string | null
	/** 
	 * The customer's password. Initiate a customer password reset flow if you need to change it.
	 * @example ```"secret"```
	 */
	password?: string | null
	/** 
	 * A reference to uniquely identify the shopper during payment sessions.
	 * @example ```"xxx-yyy-zzz"```
	 */
	shopper_reference?: string | null
	/** 
	 * A reference to uniquely identify the customer on any connected external services.
	 * @example ```"xxx-yyy-zzz"```
	 */
	profile_id?: string | null
	/** 
	 * A specific code to identify the tax exemption reason for this customer.
	 * @example ```"xxx-yyy-zzz"```
	 */
	tax_exemption_code?: string | null
	/** 
	 * Comma separated list of tags to be added. Duplicates, invalid and non existing ones are discarded. Cannot be passed by sales channels.
	 */
	_add_tags?: string | null
	/** 
	 * Comma separated list of tags to be removed. Duplicates, invalid and non existing ones are discarded. Cannot be passed by sales channels.
	 */
	_remove_tags?: string | null

	customer_group?: CustomerGroupRel | null
	tags?: TagRel[] | null

}


class Customers extends ApiResource<Customer> {

	static readonly TYPE: CustomerType = 'customers' as const

	async create(resource: CustomerCreate, params?: QueryParamsRetrieve<Customer>, options?: ResourcesConfig): Promise<Customer> {
		return this.resources.create<CustomerCreate, Customer>({ ...resource, type: Customers.TYPE }, params, options)
	}

	async update(resource: CustomerUpdate, params?: QueryParamsRetrieve<Customer>, options?: ResourcesConfig): Promise<Customer> {
		return this.resources.update<CustomerUpdate, Customer>({ ...resource, type: Customers.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Customers.TYPE } : id, options)
	}

	async customer_group(customerId: string | Customer, params?: QueryParamsRetrieve<CustomerGroup>, options?: ResourcesConfig): Promise<CustomerGroup> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<CustomerGroup>({ type: 'customer_groups' }, `customers/${_customerId}/customer_group`, params, options) as unknown as CustomerGroup
	}

	async customer_addresses(customerId: string | Customer, params?: QueryParamsList<CustomerAddress>, options?: ResourcesConfig): Promise<ListResponse<CustomerAddress>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<CustomerAddress>({ type: 'customer_addresses' }, `customers/${_customerId}/customer_addresses`, params, options) as unknown as ListResponse<CustomerAddress>
	}

	async customer_payment_sources(customerId: string | Customer, params?: QueryParamsList<CustomerPaymentSource>, options?: ResourcesConfig): Promise<ListResponse<CustomerPaymentSource>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<CustomerPaymentSource>({ type: 'customer_payment_sources' }, `customers/${_customerId}/customer_payment_sources`, params, options) as unknown as ListResponse<CustomerPaymentSource>
	}

	async customer_subscriptions(customerId: string | Customer, params?: QueryParamsList<CustomerSubscription>, options?: ResourcesConfig): Promise<ListResponse<CustomerSubscription>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<CustomerSubscription>({ type: 'customer_subscriptions' }, `customers/${_customerId}/customer_subscriptions`, params, options) as unknown as ListResponse<CustomerSubscription>
	}

	async orders(customerId: string | Customer, params?: QueryParamsList<Order>, options?: ResourcesConfig): Promise<ListResponse<Order>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `customers/${_customerId}/orders`, params, options) as unknown as ListResponse<Order>
	}

	async order_subscriptions(customerId: string | Customer, params?: QueryParamsList<OrderSubscription>, options?: ResourcesConfig): Promise<ListResponse<OrderSubscription>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<OrderSubscription>({ type: 'order_subscriptions' }, `customers/${_customerId}/order_subscriptions`, params, options) as unknown as ListResponse<OrderSubscription>
	}

	async returns(customerId: string | Customer, params?: QueryParamsList<Return>, options?: ResourcesConfig): Promise<ListResponse<Return>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<Return>({ type: 'returns' }, `customers/${_customerId}/returns`, params, options) as unknown as ListResponse<Return>
	}

	async sku_lists(customerId: string | Customer, params?: QueryParamsList<SkuList>, options?: ResourcesConfig): Promise<ListResponse<SkuList>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<SkuList>({ type: 'sku_lists' }, `customers/${_customerId}/sku_lists`, params, options) as unknown as ListResponse<SkuList>
	}

	async attachments(customerId: string | Customer, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `customers/${_customerId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(customerId: string | Customer, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<Event>({ type: 'events' }, `customers/${_customerId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(customerId: string | Customer, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `customers/${_customerId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async _add_tags(id: string | Customer, triggerValue: string, params?: QueryParamsRetrieve<Customer>, options?: ResourcesConfig): Promise<Customer> {
		return this.resources.update<CustomerUpdate, Customer>({ id: (typeof id === 'string')? id: id.id, type: Customers.TYPE, _add_tags: triggerValue }, params, options)
	}

	async _remove_tags(id: string | Customer, triggerValue: string, params?: QueryParamsRetrieve<Customer>, options?: ResourcesConfig): Promise<Customer> {
		return this.resources.update<CustomerUpdate, Customer>({ id: (typeof id === 'string')? id: id.id, type: Customers.TYPE, _remove_tags: triggerValue }, params, options)
	}


	isCustomer(resource: any): resource is Customer {
		return resource.type && (resource.type === Customers.TYPE)
	}


	relationship(id: string | ResourceId | null): CustomerRel {
		return super.relationshipOneToOne<CustomerRel>(id)
	}

	relationshipToMany(...ids: string[]): CustomerRel[] {
		return super.relationshipOneToMany<CustomerRel>(...ids)
	}


	type(): CustomerType {
		return Customers.TYPE
	}

}


const instance = new Customers()
export default instance

export type { Customers, Customer, CustomerCreate, CustomerUpdate, CustomerType }
