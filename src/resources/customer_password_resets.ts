import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Customer } from './customers'


type CustomerPasswordResetRel = ResourceRel & { type: typeof CustomerPasswordResets.TYPE }


interface CustomerPasswordReset extends Resource {
	
	customer_email?: string
	reset_password_token?: string
	reset_password_at?: string

	customer?: Customer

}


interface CustomerPasswordResetCreate extends ResourceCreate {
	
	customer_email: string
	
}


interface CustomerPasswordResetUpdate extends ResourceUpdate {
	
	customer_password?: string
	_reset_password_token?: string
	
}


class CustomerPasswordResets extends ApiResource {

	static readonly TYPE: 'customer_password_resets' = 'customer_password_resets'
	// static readonly PATH = 'customer_password_resets'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerPasswordReset>> {
		return this.resources.list({ type: CustomerPasswordResets.TYPE }, params, options)
	}

	async create(resource: CustomerPasswordResetCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPasswordReset> {
		return this.resources.create({ ...resource, type: CustomerPasswordResets.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPasswordReset> {
		return this.resources.retrieve<CustomerPasswordReset>({ type: CustomerPasswordResets.TYPE, id }, params, options)
	}

	async update(resource: CustomerPasswordResetUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerPasswordReset> {
		return this.resources.update({ ...resource, type: CustomerPasswordResets.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: CustomerPasswordResets.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCustomerPasswordReset(resource: any): resource is CustomerPasswordReset {
		return resource.type && (resource.type === CustomerPasswordResets.TYPE)
	}


	relationship(id: string | ResourceId | null): CustomerPasswordResetRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: CustomerPasswordResets.TYPE } : { id: id.id, type: CustomerPasswordResets.TYPE }
	}


	type(): string {
		return CustomerPasswordResets.TYPE
	}

}


export default CustomerPasswordResets

export { CustomerPasswordReset, CustomerPasswordResetCreate, CustomerPasswordResetUpdate }
