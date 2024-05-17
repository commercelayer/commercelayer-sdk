import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Customer } from './customers'
import type { Market } from './markets'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type CustomerGroupRel = ResourceRel & { type: typeof CustomerGroups.TYPE }


interface CustomerGroup extends Resource {
	
	name?: string
	code?: string

	customers?: Customer[]
	markets?: Market[]
	attachments?: Attachment[]
	versions?: Version[]

}


interface CustomerGroupCreate extends ResourceCreate {
	
	name: string
	code?: string
	
}


interface CustomerGroupUpdate extends ResourceUpdate {
	
	name?: string
	code?: string
	
}


class CustomerGroups extends ApiResource {

	static readonly TYPE: 'customer_groups' = 'customer_groups' as const
	// static readonly PATH = 'customer_groups'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerGroup>> {
		return this.resources.list<CustomerGroup>({ type: CustomerGroups.TYPE }, params, options)
	}

	async create(resource: CustomerGroupCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerGroup> {
		return this.resources.create<CustomerGroupCreate, CustomerGroup>({ ...resource, type: CustomerGroups.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerGroup> {
		return this.resources.retrieve<CustomerGroup>({ type: CustomerGroups.TYPE, id }, params, options)
	}

	async update(resource: CustomerGroupUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerGroup> {
		return this.resources.update<CustomerGroupUpdate, CustomerGroup>({ ...resource, type: CustomerGroups.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: CustomerGroups.TYPE, id }, options)
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

	async versions(customerGroupId: string | CustomerGroup, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _customerGroupId = (customerGroupId as CustomerGroup).id || customerGroupId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `customer_groups/${_customerGroupId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCustomerGroup(resource: any): resource is CustomerGroup {
		return resource.type && (resource.type === CustomerGroups.TYPE)
	}


	relationship(id: string | ResourceId | null): CustomerGroupRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: CustomerGroups.TYPE } : { id: id.id, type: CustomerGroups.TYPE }
	}


	type(): string {
		return CustomerGroups.TYPE
	}

}


export default CustomerGroups

export { CustomerGroup, CustomerGroupCreate, CustomerGroupUpdate }
