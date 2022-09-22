import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Customer } from './customers'
import type { Attachment } from './attachments'


type CouponRecipientRel = ResourceRel & { type: typeof CouponRecipients.TYPE }
type CustomerRel = ResourceRel & { type: 'customers' }


interface CouponRecipient extends Resource {
	
	email?: string
	first_name?: string
	last_name?: string

	customer?: Customer
	attachments?: Attachment[]

}


interface CouponRecipientCreate extends ResourceCreate {
	
	email: string
	first_name?: string
	last_name?: string

	customer?: CustomerRel

}


interface CouponRecipientUpdate extends ResourceUpdate {
	
	email?: string
	first_name?: string
	last_name?: string

	customer?: CustomerRel

}


class CouponRecipients extends ApiResource {

	static readonly TYPE: 'coupon_recipients' = 'coupon_recipients' as const
	// static readonly PATH = 'coupon_recipients'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CouponRecipient>> {
		return this.resources.list<CouponRecipient>({ type: CouponRecipients.TYPE }, params, options)
	}

	async create(resource: CouponRecipientCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponRecipient> {
		return this.resources.create<CouponRecipientCreate, CouponRecipient>({ ...resource, type: CouponRecipients.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponRecipient> {
		return this.resources.retrieve<CouponRecipient>({ type: CouponRecipients.TYPE, id }, params, options)
	}

	async update(resource: CouponRecipientUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponRecipient> {
		return this.resources.update<CouponRecipientUpdate, CouponRecipient>({ ...resource, type: CouponRecipients.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: CouponRecipients.TYPE, id }, options)
	}

	async customer(couponRecipientId: string | CouponRecipient, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		const _couponRecipientId = (couponRecipientId as CouponRecipient).id || couponRecipientId
		return this.resources.fetch<Customer>({ type: 'customers' }, `coupon_recipients/${_couponRecipientId}/customer`, params, options) as unknown as Customer
	}

	async attachments(couponRecipientId: string | CouponRecipient, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _couponRecipientId = (couponRecipientId as CouponRecipient).id || couponRecipientId
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `coupon_recipients/${_couponRecipientId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCouponRecipient(resource: any): resource is CouponRecipient {
		return resource.type && (resource.type === CouponRecipients.TYPE)
	}


	relationship(id: string | ResourceId | null): CouponRecipientRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: CouponRecipients.TYPE } : { id: id.id, type: CouponRecipients.TYPE }
	}


	type(): string {
		return CouponRecipients.TYPE
	}

}


export default CouponRecipients

export { CouponRecipient, CouponRecipientCreate, CouponRecipientUpdate }
