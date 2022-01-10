import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Customer } from './customers'
import { Market } from './markets'
import { Attachment } from './attachments'


type CustomerGroupRel = ResourceId & { type: typeof CustomerGroups.TYPE }


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
		return this.resources.list({ type: CustomerGroups.TYPE }, params, options)
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
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCustomerGroup(resource: any): resource is CustomerGroup {
		return resource.type && (resource.type === CustomerGroups.TYPE)
	}


	relationship(id: string | ResourceId): CustomerGroupRel {
		return (typeof id === 'string') ? { id, type: CustomerGroups.TYPE } : { id: id.id, type: CustomerGroups.TYPE }
	}


	type(): string {
		return CustomerGroups.TYPE
	}

}


export default CustomerGroups

export { CustomerGroup, CustomerGroupCreate, CustomerGroupUpdate }
