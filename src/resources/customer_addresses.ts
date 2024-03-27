import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Customer, CustomerType, CustomerSortable } from './customers'
import type { Address, AddressType, AddressSortable } from './addresses'
import type { Event, EventSortable } from './events'
import type { Version, VersionSortable } from './versions'


type CustomerAddressType = 'customer_addresses'
type CustomerAddressRel = ResourceRel & { type: CustomerAddressType }
type CustomerRel = ResourceRel & { type: CustomerType }
type AddressRel = ResourceRel & { type: AddressType }


export type CustomerAddressSortable = Pick<CustomerAddress, 'id'> & ResourceSortable
export type CustomerAddressFilterable = Pick<CustomerAddress, 'id'> & ResourceFilterable


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


class CustomerAddresses extends ApiResource<CustomerAddress, CustomerAddressSortable> {

	static readonly TYPE: CustomerAddressType = 'customer_addresses' as const

	async create(resource: CustomerAddressCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerAddress> {
		return this.resources.create<CustomerAddressCreate, CustomerAddress>({ ...resource, type: CustomerAddresses.TYPE }, params, options)
	}

	async update(resource: CustomerAddressUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CustomerAddress> {
		return this.resources.update<CustomerAddressUpdate, CustomerAddress>({ ...resource, type: CustomerAddresses.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: CustomerAddresses.TYPE } : id, options)
	}

	async customer(customerAddressId: string | CustomerAddress, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		const _customerAddressId = (customerAddressId as CustomerAddress).id || customerAddressId as string
		return this.resources.fetch<Customer, CustomerSortable>({ type: 'customers' }, `customer_addresses/${_customerAddressId}/customer`, params, options) as unknown as Customer
	}

	async address(customerAddressId: string | CustomerAddress, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		const _customerAddressId = (customerAddressId as CustomerAddress).id || customerAddressId as string
		return this.resources.fetch<Address, AddressSortable>({ type: 'addresses' }, `customer_addresses/${_customerAddressId}/address`, params, options) as unknown as Address
	}

	async events(customerAddressId: string | CustomerAddress, params?: QueryParamsList<EventSortable>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _customerAddressId = (customerAddressId as CustomerAddress).id || customerAddressId as string
		return this.resources.fetch<Event, EventSortable>({ type: 'events' }, `customer_addresses/${_customerAddressId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async versions(customerAddressId: string | CustomerAddress, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _customerAddressId = (customerAddressId as CustomerAddress).id || customerAddressId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `customer_addresses/${_customerAddressId}/versions`, params, options) as unknown as ListResponse<Version>
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

/*
export const CustomerAddressesClient = (init: ResourceAdapter | ResourcesInitConfig): CustomerAddresses => {
	return new CustomerAddresses((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
