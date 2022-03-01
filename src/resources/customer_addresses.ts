import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Customer } from './customers'
import { Address } from './addresses'


type CustomerAddressRel = ResourceRel & { type: typeof CustomerAddresses.TYPE }
type CustomerRel = ResourceRel & { type: 'customers' }
type AddressRel = ResourceRel & { type: 'addresses' }


interface CustomerAddress extends Resource {
	
	name?: string

	customer?: Customer
	address?: Address

}


interface CustomerAddressCreate extends ResourceCreate {
	
	customer: CustomerRel
	address: AddressRel

}


interface CustomerAddressUpdate extends ResourceUpdate {
	
	customer?: CustomerRel
	address?: AddressRel

}


class CustomerAddresses extends ApiResource {

	static readonly TYPE: 'customer_addresses' = 'customer_addresses'
	// static readonly PATH = 'customer_addresses'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CustomerAddress>> {
		return this.resources.list<CustomerAddress>({ type: CustomerAddresses.TYPE }, params, options)
	}

	async create(resource: CustomerAddressCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerAddress> {
		return this.resources.create<CustomerAddressCreate, CustomerAddress>({ ...resource, type: CustomerAddresses.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerAddress> {
		return this.resources.retrieve<CustomerAddress>({ type: CustomerAddresses.TYPE, id }, params, options)
	}

	async update(resource: CustomerAddressUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerAddress> {
		return this.resources.update<CustomerAddressUpdate, CustomerAddress>({ ...resource, type: CustomerAddresses.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: CustomerAddresses.TYPE, id }, options)
	}

	async customer(customerAddressId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		return this.resources.fetch<Customer>({ type: 'customers' }, `customer_addresses/${customerAddressId}/customer`, params, options) as unknown as Customer
	}

	async address(customerAddressId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		return this.resources.fetch<Address>({ type: 'addresses' }, `customer_addresses/${customerAddressId}/address`, params, options) as unknown as Address
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCustomerAddress(resource: any): resource is CustomerAddress {
		return resource.type && (resource.type === CustomerAddresses.TYPE)
	}


	relationship(id: string | ResourceId | null): CustomerAddressRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: CustomerAddresses.TYPE } : { id: id.id, type: CustomerAddresses.TYPE }
	}


	type(): string {
		return CustomerAddresses.TYPE
	}

}


export default CustomerAddresses

export { CustomerAddress, CustomerAddressCreate, CustomerAddressUpdate }
