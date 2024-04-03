import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Customer, CustomerType } from './customers'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type CouponRecipientType = 'coupon_recipients'
type CouponRecipientRel = ResourceRel & { type: CouponRecipientType }
type CustomerRel = ResourceRel & { type: CustomerType }


export type CouponRecipientSort = Pick<CouponRecipient, 'id'> & ResourceSort
// export type CouponRecipientFilter = Pick<CouponRecipient, 'id' | 'email' | 'first_name' | 'last_name'> & ResourceFilter


interface CouponRecipient extends Resource {
	
	readonly type: CouponRecipientType

	email: string
	first_name?: Nullable<string>
	last_name?: Nullable<string>

	customer?: Nullable<Customer>
	attachments?: Nullable<Attachment[]>
	versions?: Nullable<Version[]>

}


interface CouponRecipientCreate extends ResourceCreate {
	
	email: string
	first_name?: Nullable<string>
	last_name?: Nullable<string>

	customer?: Nullable<CustomerRel>

}


interface CouponRecipientUpdate extends ResourceUpdate {
	
	email?: Nullable<string>
	first_name?: Nullable<string>
	last_name?: Nullable<string>

	customer?: Nullable<CustomerRel>

}


class CouponRecipients extends ApiResource<CouponRecipient> {

	static readonly TYPE: CouponRecipientType = 'coupon_recipients' as const

	async create(resource: CouponRecipientCreate, params?: QueryParamsRetrieve<CouponRecipient>, options?: ResourcesConfig): Promise<CouponRecipient> {
		return this.resources.create<CouponRecipientCreate, CouponRecipient>({ ...resource, type: CouponRecipients.TYPE }, params, options)
	}

	async update(resource: CouponRecipientUpdate, params?: QueryParamsRetrieve<CouponRecipient>, options?: ResourcesConfig): Promise<CouponRecipient> {
		return this.resources.update<CouponRecipientUpdate, CouponRecipient>({ ...resource, type: CouponRecipients.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: CouponRecipients.TYPE } : id, options)
	}

	async customer(couponRecipientId: string | CouponRecipient, params?: QueryParamsRetrieve<Customer>, options?: ResourcesConfig): Promise<Customer> {
		const _couponRecipientId = (couponRecipientId as CouponRecipient).id || couponRecipientId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `coupon_recipients/${_couponRecipientId}/customer`, params, options) as unknown as Customer
	}

	async attachments(couponRecipientId: string | CouponRecipient, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _couponRecipientId = (couponRecipientId as CouponRecipient).id || couponRecipientId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `coupon_recipients/${_couponRecipientId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(couponRecipientId: string | CouponRecipient, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _couponRecipientId = (couponRecipientId as CouponRecipient).id || couponRecipientId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `coupon_recipients/${_couponRecipientId}/versions`, params, options) as unknown as ListResponse<Version>
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
