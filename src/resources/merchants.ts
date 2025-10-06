import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Address, AddressType } from './addresses'
import type { Attachment } from './attachments'
import type { Version } from './versions'
import type { EventStore } from './event_stores'


type MerchantType = 'merchants'
type MerchantRel = ResourceRel & { type: MerchantType }
type AddressRel = ResourceRel & { type: AddressType }


export type MerchantSort = Pick<Merchant, 'id' | 'name'> & ResourceSort
// export type MerchantFilter = Pick<Merchant, 'id' | 'name'> & ResourceFilter


interface Merchant extends Resource {
	
	readonly type: MerchantType

	/** 
	 * The merchant's internal name.
	 * @example ```"The Brand Inc."```
	 */
	name: string

	address?: Address | null
	attachments?: Attachment[] | null
	versions?: Version[] | null
	event_stores?: EventStore[] | null

}


interface MerchantCreate extends ResourceCreate {
	
	/** 
	 * The merchant's internal name.
	 * @example ```"The Brand Inc."```
	 */
	name: string

	address: AddressRel

}


interface MerchantUpdate extends ResourceUpdate {
	
	/** 
	 * The merchant's internal name.
	 * @example ```"The Brand Inc."```
	 */
	name?: string | null

	address?: AddressRel | null

}


class Merchants extends ApiResource<Merchant> {

	static readonly TYPE: MerchantType = 'merchants' as const

	async create(resource: MerchantCreate, params?: QueryParamsRetrieve<Merchant>, options?: ResourcesConfig): Promise<Merchant> {
		return this.resources.create<MerchantCreate, Merchant>({ ...resource, type: Merchants.TYPE }, params, options)
	}

	async update(resource: MerchantUpdate, params?: QueryParamsRetrieve<Merchant>, options?: ResourcesConfig): Promise<Merchant> {
		return this.resources.update<MerchantUpdate, Merchant>({ ...resource, type: Merchants.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Merchants.TYPE } : id, options)
	}

	async address(merchantId: string | Merchant, params?: QueryParamsRetrieve<Address>, options?: ResourcesConfig): Promise<Address> {
		const _merchantId = (merchantId as Merchant).id || merchantId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `merchants/${_merchantId}/address`, params, options) as unknown as Address
	}

	async attachments(merchantId: string | Merchant, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _merchantId = (merchantId as Merchant).id || merchantId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `merchants/${_merchantId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(merchantId: string | Merchant, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _merchantId = (merchantId as Merchant).id || merchantId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `merchants/${_merchantId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async event_stores(merchantId: string | Merchant, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _merchantId = (merchantId as Merchant).id || merchantId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `merchants/${_merchantId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}


	isMerchant(resource: any): resource is Merchant {
		return resource.type && (resource.type === Merchants.TYPE)
	}


	relationship(id: string | ResourceId | null): MerchantRel {
		return super.relationshipOneToOne<MerchantRel>(id)
	}

	relationshipToMany(...ids: string[]): MerchantRel[] {
		return super.relationshipOneToMany<MerchantRel>(...ids)
	}


	type(): MerchantType {
		return Merchants.TYPE
	}

}


const instance = new Merchants()
export default instance

export type { Merchants, Merchant, MerchantCreate, MerchantUpdate, MerchantType }
