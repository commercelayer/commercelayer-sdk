/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Customer } from './customers'
import { Address } from './addresses'


type CustomerAddressRel = ResourceId & { type: typeof CustomerAddresses.TYPE }
type CustomerRel = ResourceId & { type: 'customers' }
type AddressRel = ResourceId & { type: 'addresses' }


interface CustomerAddress extends Resource {
	
	name?: string

	customer?: Customer
	address?: Address

}


interface CustomerAddressCreate extends ResourceCreate {
	
	customer?: CustomerRel
	address?: AddressRel

}


interface CustomerAddressUpdate extends ResourceUpdate {
	
	customer?: CustomerRel
	address?: AddressRel

}


class CustomerAddresses extends ApiResource {

	static readonly TYPE: 'customer_addresses' = 'customer_addresses'
	// static readonly PATH = 'customer_addresses'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerAddress>> {
		return this.resources.list({ type: CustomerAddresses.TYPE }, params, options)
	}

	async create(resource: CustomerAddressCreate, options?: ResourcesConfig): Promise<CustomerAddress> {
		return this.resources.create(Object.assign(resource, { type: CustomerAddresses.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerAddress> {
		return this.resources.retrieve<CustomerAddress>({ type: CustomerAddresses.TYPE, id }, params, options)
	}

	async update(resource: CustomerAddressUpdate, options?: ResourcesConfig): Promise<CustomerAddress> {
		return this.resources.update({ ...resource, type: CustomerAddresses.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: CustomerAddresses.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCustomerAddress(resource: any): resource is CustomerAddress {
		return resource.type && (resource.type === CustomerAddresses.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(CustomerAddresses.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(CustomerAddresses.TYPE)
	}
	*/

	relationship(id: string | ResourceId): CustomerAddressRel {
		return (typeof id === 'string') ? { id, type: CustomerAddresses.TYPE } : {id: id.id, type: CustomerAddresses.TYPE }
	}

}


export default CustomerAddresses

export { CustomerAddress, CustomerAddressCreate, CustomerAddressUpdate }
