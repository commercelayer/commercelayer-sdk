import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Address, AddressType } from './addresses'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type MerchantType = 'merchants'
type MerchantRel = ResourceRel & { type: MerchantType }
type AddressRel = ResourceRel & { type: AddressType }


interface Merchant extends Resource {
	
	readonly type: MerchantType

	name: string

	address?: Address | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface MerchantCreate extends ResourceCreate {
	
	name: string

	address: AddressRel

}


interface MerchantUpdate extends ResourceUpdate {
	
	name?: string | null

	address?: AddressRel | null

}


class Merchants extends ApiResource<Merchant> {

	static readonly TYPE: MerchantType = 'merchants' as const

	async create(resource: MerchantCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Merchant> {
		return this.resources.create<MerchantCreate, Merchant>({ ...resource, type: Merchants.TYPE }, params, options)
	}

	async update(resource: MerchantUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Merchant> {
		return this.resources.update<MerchantUpdate, Merchant>({ ...resource, type: Merchants.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: Merchants.TYPE } : id, options)
	}

	async address(merchantId: string | Merchant, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Address> {
		const _merchantId = (merchantId as Merchant).id || merchantId as string
		return this.resources.fetch<Address>({ type: 'addresses' }, `merchants/${_merchantId}/address`, params, options) as unknown as Address
	}

	async attachments(merchantId: string | Merchant, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _merchantId = (merchantId as Merchant).id || merchantId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `merchants/${_merchantId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(merchantId: string | Merchant, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _merchantId = (merchantId as Merchant).id || merchantId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `merchants/${_merchantId}/versions`, params, options) as unknown as ListResponse<Version>
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


export default Merchants

export type { Merchant, MerchantCreate, MerchantUpdate, MerchantType }
