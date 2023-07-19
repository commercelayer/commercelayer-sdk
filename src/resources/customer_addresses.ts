import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Customer } from './customers'
import type { Address } from './addresses'
import type { Event } from './events'


type CustomerAddressRel = ResourceRel & { type: typeof CustomerAddresses.TYPE }
type CustomerRel = ResourceRel & { type: 'customers' }
type AddressRel = ResourceRel & { type: 'addresses' }


interface CustomerAddress extends Resource {
	
	name?: string
	customer_email?: string

	customer?: Customer
	address?: Address
	events?: Event[]

}


interface CustomerAddressCreate extends ResourceCreate {
	
	customer_email: string

	customer: CustomerRel
	address: AddressRel

}


interface CustomerAddressUpdate extends ResourceUpdate {
	
	customer?: CustomerRel
	address?: AddressRel

}


class CustomerAddresses extends ApiResource {

	static readonly TYPE: 'customer_addresses' = 'customer_addresses' as const
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

	async customer(customerAddressId: string | CustomerAddress, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		const _customerAddressId = (customerAddressId as CustomerAddress).id || customerAddressId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `customer_addresses/${_customerAddressId}/customer`, params, options) as unknown as Customer
	}

	async address(customerAddressId: string | CustomerAddress, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		const _customerAddressId = (customerAddressId as CustomerAddress).id || customerAddressId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `customer_addresses/${_customerAddressId}/address`, params, options) as unknown as Address
	}

	async events(customerAddressId: string | CustomerAddress, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _customerAddressId = (customerAddressId as CustomerAddress).id || customerAddressId as string
		return this.resources.fetch<Event>({ type: 'events' }, `customer_addresses/${_customerAddressId}/events`, params, options) as unknown as ListResponse<Event>
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
