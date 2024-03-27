import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { CustomerGroup, CustomerGroupType, CustomerGroupSortable } from './customer_groups'
import type { CustomerAddress, CustomerAddressSortable } from './customer_addresses'
import type { CustomerPaymentSource, CustomerPaymentSourceSortable } from './customer_payment_sources'
import type { CustomerSubscription, CustomerSubscriptionSortable } from './customer_subscriptions'
import type { Order, OrderSortable } from './orders'
import type { OrderSubscription, OrderSubscriptionSortable } from './order_subscriptions'
import type { Return, ReturnSortable } from './returns'
import type { SkuList, SkuListSortable } from './sku_lists'
import type { Attachment, AttachmentSortable } from './attachments'
import type { Event, EventSortable } from './events'
import type { Tag, TagType, TagSortable } from './tags'


type CustomerType = 'customers'
type CustomerRel = ResourceRel & { type: CustomerType }
type CustomerGroupRel = ResourceRel & { type: CustomerGroupType }
type TagRel = ResourceRel & { type: TagType }


export type CustomerSortable = Pick<Customer, 'id' | 'status' | 'total_orders_count'> & ResourceSortable
export type CustomerFilterable = Pick<Customer, 'id' | 'email' | 'status' | 'has_password' | 'total_orders_count'> & ResourceFilterable


interface Customer extends Resource {
	
	readonly type: CustomerType

	email: string
	status: 'prospect' | 'acquired' | 'repeat'
	has_password?: boolean | null
	total_orders_count?: number | null

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
	
	email: string
	password?: string | null

	customer_group?: CustomerGroupRel | null
	tags?: TagRel[] | null

}


interface CustomerUpdate extends ResourceUpdate {
	
	email?: string | null
	password?: string | null

	customer_group?: CustomerGroupRel | null
	tags?: TagRel[] | null

}


class Customers extends ApiResource<Customer, CustomerSortable> {

	static readonly TYPE: CustomerType = 'customers' as const

	async create(resource: CustomerCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		return this.resources.create<CustomerCreate, Customer>({ ...resource, type: Customers.TYPE }, params, options)
	}

	async update(resource: CustomerUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		return this.resources.update<CustomerUpdate, Customer>({ ...resource, type: Customers.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Customers.TYPE } : id, options)
	}

	async customer_group(customerId: string | Customer, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerGroup> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<CustomerGroup, CustomerGroupSortable>({ type: 'customer_groups' }, `customers/${_customerId}/customer_group`, params, options) as unknown as CustomerGroup
	}

	async customer_addresses(customerId: string | Customer, params?: QueryParamsList<CustomerAddressSortable>, options?: ResourcesConfig): Promise<ListResponse<CustomerAddress>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<CustomerAddress, CustomerAddressSortable>({ type: 'customer_addresses' }, `customers/${_customerId}/customer_addresses`, params, options) as unknown as ListResponse<CustomerAddress>
	}

	async customer_payment_sources(customerId: string | Customer, params?: QueryParamsList<CustomerPaymentSourceSortable>, options?: ResourcesConfig): Promise<ListResponse<CustomerPaymentSource>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<CustomerPaymentSource, CustomerPaymentSourceSortable>({ type: 'customer_payment_sources' }, `customers/${_customerId}/customer_payment_sources`, params, options) as unknown as ListResponse<CustomerPaymentSource>
	}

	async customer_subscriptions(customerId: string | Customer, params?: QueryParamsList<CustomerSubscriptionSortable>, options?: ResourcesConfig): Promise<ListResponse<CustomerSubscription>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<CustomerSubscription, CustomerSubscriptionSortable>({ type: 'customer_subscriptions' }, `customers/${_customerId}/customer_subscriptions`, params, options) as unknown as ListResponse<CustomerSubscription>
	}

	async orders(customerId: string | Customer, params?: QueryParamsList<OrderSortable>, options?: ResourcesConfig): Promise<ListResponse<Order>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<Order, OrderSortable>({ type: 'orders' }, `customers/${_customerId}/orders`, params, options) as unknown as ListResponse<Order>
	}

	async order_subscriptions(customerId: string | Customer, params?: QueryParamsList<OrderSubscriptionSortable>, options?: ResourcesConfig): Promise<ListResponse<OrderSubscription>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<OrderSubscription, OrderSubscriptionSortable>({ type: 'order_subscriptions' }, `customers/${_customerId}/order_subscriptions`, params, options) as unknown as ListResponse<OrderSubscription>
	}

	async returns(customerId: string | Customer, params?: QueryParamsList<ReturnSortable>, options?: ResourcesConfig): Promise<ListResponse<Return>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<Return, ReturnSortable>({ type: 'returns' }, `customers/${_customerId}/returns`, params, options) as unknown as ListResponse<Return>
	}

	async sku_lists(customerId: string | Customer, params?: QueryParamsList<SkuListSortable>, options?: ResourcesConfig): Promise<ListResponse<SkuList>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<SkuList, SkuListSortable>({ type: 'sku_lists' }, `customers/${_customerId}/sku_lists`, params, options) as unknown as ListResponse<SkuList>
	}

	async attachments(customerId: string | Customer, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `customers/${_customerId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(customerId: string | Customer, params?: QueryParamsList<EventSortable>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<Event, EventSortable>({ type: 'events' }, `customers/${_customerId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(customerId: string | Customer, params?: QueryParamsList<TagSortable>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _customerId = (customerId as Customer).id || customerId as string
		return this.resources.fetch<Tag, TagSortable>({ type: 'tags' }, `customers/${_customerId}/tags`, params, options) as unknown as ListResponse<Tag>
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


export default Customers

export type { Customer, CustomerCreate, CustomerUpdate, CustomerType }

/*
export const CustomersClient = (init: ResourceAdapter | ResourcesInitConfig): Customers => {
	return new Customers((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
