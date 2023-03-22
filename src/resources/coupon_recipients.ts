import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Customer, CustomerType } from './customers'
import type { Attachment } from './attachments'


type CouponRecipientType = 'coupon_recipients'
type CouponRecipientRel = ResourceRel & { type: CouponRecipientType }
type CustomerRel = ResourceRel & { type: CustomerType }


interface CouponRecipient extends Resource {
	
	readonly type: CouponRecipientType

	email: string
	first_name?: string | null
	last_name?: string | null

	customer?: Customer | null
	attachments?: Attachment[] | null

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


class CouponRecipients extends ApiResource<CouponRecipient> {

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
		return this.resources.fetch<Customer>({ type: 'customers' }, `coupon_recipients/${_couponRecipientId}/customer`, params, options) as unknown as Customer
	}

	async attachments(couponRecipientId: string | CouponRecipient, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _couponRecipientId = (couponRecipientId as CouponRecipient).id || couponRecipientId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `coupon_recipients/${_couponRecipientId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isCouponRecipient(resource: any): resource is CouponRecipient {
		return resource.type && (resource.type === CouponRecipients.TYPE)
	}


	relationship(id: string | ResourceId | null): CouponRecipientRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: CouponRecipients.TYPE } : { id: id.id, type: CouponRecipients.TYPE }
	}


	type(): CouponRecipientType {
		return CouponRecipients.TYPE
	}

}


export default CouponRecipients

export type { CouponRecipient, CouponRecipientCreate, CouponRecipientUpdate, CouponRecipientType }
