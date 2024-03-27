import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Customer, CustomerType, CustomerSortable } from './customers'
import type { Attachment, AttachmentSortable } from './attachments'
import type { Version, VersionSortable } from './versions'


type CouponRecipientType = 'coupon_recipients'
type CouponRecipientRel = ResourceRel & { type: CouponRecipientType }
type CustomerRel = ResourceRel & { type: CustomerType }


export type CouponRecipientSortable = Pick<CouponRecipient, 'id'> & ResourceSortable
export type CouponRecipientFilterable = Pick<CouponRecipient, 'id' | 'email' | 'first_name' | 'last_name'> & ResourceFilterable


interface CouponRecipient extends Resource {
	
	readonly type: CouponRecipientType

	email: string
	first_name?: string | null
	last_name?: string | null

	customer?: Customer | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface CouponRecipientCreate extends ResourceCreate {
	
	email: string
	first_name?: string | null
	last_name?: string | null

	customer?: CustomerRel | null

}


interface CouponRecipientUpdate extends ResourceUpdate {
	
	email?: string | null
	first_name?: string | null
	last_name?: string | null

	customer?: CustomerRel | null

}


class CouponRecipients extends ApiResource<CouponRecipient, CouponRecipientSortable> {

	static readonly TYPE: CouponRecipientType = 'coupon_recipients' as const

	async create(resource: CouponRecipientCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponRecipient> {
		return this.resources.create<CouponRecipientCreate, CouponRecipient>({ ...resource, type: CouponRecipients.TYPE }, params, options)
	}

	async update(resource: CouponRecipientUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponRecipient> {
		return this.resources.update<CouponRecipientUpdate, CouponRecipient>({ ...resource, type: CouponRecipients.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: CouponRecipients.TYPE } : id, options)
	}

	async customer(couponRecipientId: string | CouponRecipient, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		const _couponRecipientId = (couponRecipientId as CouponRecipient).id || couponRecipientId as string
		return this.resources.fetch<Customer, CustomerSortable>({ type: 'customers' }, `coupon_recipients/${_couponRecipientId}/customer`, params, options) as unknown as Customer
	}

	async attachments(couponRecipientId: string | CouponRecipient, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _couponRecipientId = (couponRecipientId as CouponRecipient).id || couponRecipientId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `coupon_recipients/${_couponRecipientId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(couponRecipientId: string | CouponRecipient, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _couponRecipientId = (couponRecipientId as CouponRecipient).id || couponRecipientId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `coupon_recipients/${_couponRecipientId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isCouponRecipient(resource: any): resource is CouponRecipient {
		return resource.type && (resource.type === CouponRecipients.TYPE)
	}


	relationship(id: string | ResourceId | null): CouponRecipientRel {
		return super.relationshipOneToOne<CouponRecipientRel>(id)
	}

	relationshipToMany(...ids: string[]): CouponRecipientRel[] {
		return super.relationshipOneToMany<CouponRecipientRel>(...ids)
	}


	type(): CouponRecipientType {
		return CouponRecipients.TYPE
	}

}


export default CouponRecipients

export type { CouponRecipient, CouponRecipientCreate, CouponRecipientUpdate, CouponRecipientType }

/*
export const CouponRecipientsClient = (init: ResourceAdapter | ResourcesInitConfig): CouponRecipients => {
	return new CouponRecipients((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
