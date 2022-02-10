import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Customer } from './customers'
import { Market } from './markets'
import { Attachment } from './attachments'


type CustomerGroupRel = ResourceRel & { type: typeof CustomerGroups.TYPE }


interface CustomerGroup extends Resource {
	
	name?: string

	customers?: Customer[]
	markets?: Market[]
	attachments?: Attachment[]

}


interface CustomerGroupCreate extends ResourceCreate {
	
	name: string
	
}


interface CustomerGroupUpdate extends ResourceUpdate {
	
	name?: string
	
}


class CustomerGroups extends ApiResource {

	static readonly TYPE: 'customer_groups' = 'customer_groups'
	// static readonly PATH = 'customer_groups'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerGroup>> {
		return this.resources.list<CustomerGroup>({ type: CustomerGroups.TYPE }, params, options)
	}

	async create(resource: CustomerGroupCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerGroup> {
		return this.resources.create({ ...resource, type: CustomerGroups.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerGroup> {
		return this.resources.retrieve<CustomerGroup>({ type: CustomerGroups.TYPE, id }, params, options)
	}

	async update(resource: CustomerGroupUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerGroup> {
		return this.resources.update({ ...resource, type: CustomerGroups.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: CustomerGroups.TYPE, id }, options)
	}

	async customers(customerGroupId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Customer>> {
		return this.resources.fetch<Customer>({ type: 'customers' }, `customer_groups/${customerGroupId}/customers`, params, options) as unknown as ListResponse<Customer>
	}

	async markets(customerGroupId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Market>> {
		return this.resources.fetch<Market>({ type: 'markets' }, `customer_groups/${customerGroupId}/markets`, params, options) as unknown as ListResponse<Market>
	}

	async attachments(customerGroupId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `customer_groups/${customerGroupId}/attachments`, params, options) as unknown as ListResponse<Attachment>
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
