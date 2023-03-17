import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Customer } from './customers'
import type { Market } from './markets'
import type { Attachment } from './attachments'


type CustomerGroupType = 'customer_groups'
type CustomerGroupRel = ResourceRel & { type: CustomerGroupType }


interface CustomerGroup extends Resource {
	
	readonly type: CustomerGroupType

	name: string

	customers?: Customer[]
	markets?: Market[]
	attachments?: Attachment[]

}


interface CustomerGroupCreate extends ResourceCreate {
	
	name: string
	
}


interface CustomerGroupUpdate extends ResourceUpdate {
	
	name: string
	
}


class CustomerGroups extends ApiResource<CustomerGroup> {

	static readonly TYPE: CustomerGroupType = 'customer_groups' as const

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerGroup>> {
		return this.resources.list<CustomerGroup>({ type: CustomerGroups.TYPE }, params, options)
	}

	async create(resource: CustomerGroupCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerGroup> {
		return this.resources.create<CustomerGroupCreate, CustomerGroup>({ ...resource, type: CustomerGroups.TYPE }, params, options)
	}

	async update(resource: CustomerGroupUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerGroup> {
		return this.resources.update<CustomerGroupUpdate, CustomerGroup>({ ...resource, type: CustomerGroups.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: CustomerGroups.TYPE } : id, options)
	}

	async customers(customerGroupId: string | CustomerGroup, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Customer>> {
		const _customerGroupId = (customerGroupId as CustomerGroup).id || customerGroupId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `customer_groups/${_customerGroupId}/customers`, params, options) as unknown as ListResponse<Customer>
	}

	async markets(customerGroupId: string | CustomerGroup, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		const _customerGroupId = (customerGroupId as CustomerGroup).id || customerGroupId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `customer_groups/${_customerGroupId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async attachments(customerGroupId: string | CustomerGroup, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _customerGroupId = (customerGroupId as CustomerGroup).id || customerGroupId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `customer_groups/${_customerGroupId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isCustomerGroup(resource: any): resource is CustomerGroup {
		return resource.type && (resource.type === CustomerGroups.TYPE)
	}


	relationship(id: string | ResourceId | null): CustomerGroupRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: CustomerGroups.TYPE } : { id: id.id, type: CustomerGroups.TYPE }
	}


	type(): CustomerGroupType {
		return CustomerGroups.TYPE
	}

}


export default CustomerGroups

export type { CustomerGroup, CustomerGroupCreate, CustomerGroupUpdate, CustomerGroupType }
