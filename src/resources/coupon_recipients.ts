/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.3
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Customer } from './customers'
import { Attachment } from './attachments'


type CouponRecipientRel = ResourceId & { type: typeof CouponRecipients.TYPE }
type CustomerRel = ResourceId & { type: 'customers' }


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

	static readonly TYPE: 'coupon_recipients' = 'coupon_recipients'
	// static readonly PATH = 'coupon_recipients'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<CouponRecipient>> {
		return this.resources.list({ type: CouponRecipients.TYPE }, params, options)
	}

	async create(resource: CouponRecipientCreate, options?: ResourcesConfig): Promise<CouponRecipient> {
		return this.resources.create({ ...resource, type: CouponRecipients.TYPE } , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<CouponRecipient> {
		return this.resources.retrieve<CouponRecipient>({ type: CouponRecipients.TYPE, id }, params, options)
	}

	async update(resource: CouponRecipientUpdate, options?: ResourcesConfig): Promise<CouponRecipient> {
		return this.resources.update({ ...resource, type: CouponRecipients.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: CouponRecipients.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isCouponRecipient(resource: any): resource is CouponRecipient {
		return resource.type && (resource.type === CouponRecipients.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(CouponRecipients.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(CouponRecipients.TYPE)
	}
	*/

	relationship(id: string | ResourceId): CouponRecipientRel {
		return (typeof id === 'string') ? { id, type: CouponRecipients.TYPE } : {id: id.id, type: CouponRecipients.TYPE }
	}

	type(): string {
		return CouponRecipients.TYPE
	}

}


export default CouponRecipients

export { CouponRecipient, CouponRecipientCreate, CouponRecipientUpdate }
