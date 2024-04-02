import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Customer, CustomerType } from './customers'
import type { Address, AddressType } from './addresses'
import type { Event } from './events'
import type { Version } from './versions'


type CustomerAddressType = 'customer_addresses'
type CustomerAddressRel = ResourceRel & { type: CustomerAddressType }
type CustomerRel = ResourceRel & { type: CustomerType }
type AddressRel = ResourceRel & { type: AddressType }


export type CustomerAddressSort = Pick<CustomerAddress, 'id'> & ResourceSort
// export type CustomerAddressFilter = Pick<CustomerAddress, 'id'> & ResourceFilter


interface CustomerAddress extends Resource {
	
	readonly type: CustomerAddressType

	name?: string | null
	customer_email: string

	customer?: Customer | null
	address?: Address | null
	events?: Event[] | null
	versions?: Version[] | null

}


interface CustomerAddressCreate extends ResourceCreate {
	
	customer_email: string

	customer: CustomerRel
	address: AddressRel

}


interface CustomerAddressUpdate extends ResourceUpdate {
	
	customer?: CustomerRel | null
	address?: AddressRel | null

}


class CustomerAddresses extends ApiResource<CustomerAddress> {

	static readonly TYPE: CustomerAddressType = 'customer_addresses' as const

	async create(resource: CustomerAddressCreate, params?: QueryParamsRetrieve<CustomerAddress>, options?: ResourcesConfig): Promise<CustomerAddress> {
		return this.resources.create<CustomerAddressCreate, CustomerAddress>({ ...resource, type: CustomerAddresses.TYPE }, params, options)
	}

	async update(resource: CustomerAddressUpdate, params?: QueryParamsRetrieve<CustomerAddress>, options?: ResourcesConfig): Promise<CustomerAddress> {
		return this.resources.update<CustomerAddressUpdate, CustomerAddress>({ ...resource, type: CustomerAddresses.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: CustomerAddresses.TYPE } : id, options)
	}

	async customer(customerAddressId: string | CustomerAddress, params?: QueryParamsRetrieve<Customer>, options?: ResourcesConfig): Promise<Customer> {
		const _customerAddressId = (customerAddressId as CustomerAddress).id || customerAddressId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `customer_addresses/${_customerAddressId}/customer`, params, options) as unknown as Customer
	}

	async address(customerAddressId: string | CustomerAddress, params?: QueryParamsRetrieve<Address>, options?: ResourcesConfig): Promise<Address> {
		const _customerAddressId = (customerAddressId as CustomerAddress).id || customerAddressId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `customer_addresses/${_customerAddressId}/address`, params, options) as unknown as Address
	}

	async events(customerAddressId: string | CustomerAddress, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _customerAddressId = (customerAddressId as CustomerAddress).id || customerAddressId as string
		return this.resources.fetch<Event>({ type: 'events' }, `customer_addresses/${_customerAddressId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(customerAddressId: string | CustomerAddress, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _customerAddressId = (customerAddressId as CustomerAddress).id || customerAddressId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `customer_addresses/${_customerAddressId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isCustomerAddress(resource: any): resource is CustomerAddress {
		return resource.type && (resource.type === CustomerAddresses.TYPE)
	}


	relationship(id: string | ResourceId | null): CustomerAddressRel {
		return super.relationshipOneToOne<CustomerAddressRel>(id)
	}

	relationshipToMany(...ids: string[]): CustomerAddressRel[] {
		return super.relationshipOneToMany<CustomerAddressRel>(...ids)
	}


	type(): CustomerAddressType {
		return CustomerAddresses.TYPE
	}

}


export default CustomerAddresses

export type { CustomerAddress, CustomerAddressCreate, CustomerAddressUpdate, CustomerAddressType }
