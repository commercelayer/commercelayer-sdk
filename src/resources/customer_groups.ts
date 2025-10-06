import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Customer } from './customers'
import type { Market } from './markets'
import type { Attachment } from './attachments'
import type { Version } from './versions'
import type { EventStore } from './event_stores'


type CustomerGroupType = 'customer_groups'
type CustomerGroupRel = ResourceRel & { type: CustomerGroupType }


export type CustomerGroupSort = Pick<CustomerGroup, 'id' | 'name' | 'code'> & ResourceSort
// export type CustomerGroupFilter = Pick<CustomerGroup, 'id' | 'name' | 'code'> & ResourceFilter


interface CustomerGroup extends Resource {
	
	readonly type: CustomerGroupType

	/** 
	 * The customer group's internal name.
	 * @example ```"VIP"```
	 */
	name: string
	/** 
	 * A string that you can use to identify the customer group (must be unique within the environment).
	 * @example ```"vip1"```
	 */
	code?: string | null

	customers?: Customer[] | null
	markets?: Market[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null
	event_stores?: EventStore[] | null

}


interface CustomerGroupCreate extends ResourceCreate {
	
	/** 
	 * The customer group's internal name.
	 * @example ```"VIP"```
	 */
	name: string
	/** 
	 * A string that you can use to identify the customer group (must be unique within the environment).
	 * @example ```"vip1"```
	 */
	code?: string | null
	
}


interface CustomerGroupUpdate extends ResourceUpdate {
	
	/** 
	 * The customer group's internal name.
	 * @example ```"VIP"```
	 */
	name?: string | null
	/** 
	 * A string that you can use to identify the customer group (must be unique within the environment).
	 * @example ```"vip1"```
	 */
	code?: string | null
	
}


class CustomerGroups extends ApiResource<CustomerGroup> {

	static readonly TYPE: CustomerGroupType = 'customer_groups' as const

	async create(resource: CustomerGroupCreate, params?: QueryParamsRetrieve<CustomerGroup>, options?: ResourcesConfig): Promise<CustomerGroup> {
		return this.resources.create<CustomerGroupCreate, CustomerGroup>({ ...resource, type: CustomerGroups.TYPE }, params, options)
	}

	async update(resource: CustomerGroupUpdate, params?: QueryParamsRetrieve<CustomerGroup>, options?: ResourcesConfig): Promise<CustomerGroup> {
		return this.resources.update<CustomerGroupUpdate, CustomerGroup>({ ...resource, type: CustomerGroups.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: CustomerGroups.TYPE } : id, options)
	}

	async customers(customerGroupId: string | CustomerGroup, params?: QueryParamsList<Customer>, options?: ResourcesConfig): Promise<ListResponse<Customer>> {
		const _customerGroupId = (customerGroupId as CustomerGroup).id || customerGroupId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `customer_groups/${_customerGroupId}/customers`, params, options) as unknown as ListResponse<Customer>
	}

	async markets(customerGroupId: string | CustomerGroup, params?: QueryParamsList<Market>, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _customerGroupId = (customerGroupId as CustomerGroup).id || customerGroupId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `customer_groups/${_customerGroupId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async attachments(customerGroupId: string | CustomerGroup, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _customerGroupId = (customerGroupId as CustomerGroup).id || customerGroupId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `customer_groups/${_customerGroupId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(customerGroupId: string | CustomerGroup, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _customerGroupId = (customerGroupId as CustomerGroup).id || customerGroupId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `customer_groups/${_customerGroupId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async event_stores(customerGroupId: string | CustomerGroup, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _customerGroupId = (customerGroupId as CustomerGroup).id || customerGroupId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `customer_groups/${_customerGroupId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}


	isCustomerGroup(resource: any): resource is CustomerGroup {
		return resource.type && (resource.type === CustomerGroups.TYPE)
	}


	relationship(id: string | ResourceId | null): CustomerGroupRel {
		return super.relationshipOneToOne<CustomerGroupRel>(id)
	}

	relationshipToMany(...ids: string[]): CustomerGroupRel[] {
		return super.relationshipOneToMany<CustomerGroupRel>(...ids)
	}


	type(): CustomerGroupType {
		return CustomerGroups.TYPE
	}

}


export default CustomerGroups

export type { CustomerGroup, CustomerGroupCreate, CustomerGroupUpdate, CustomerGroupType }
