/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Customer } from './customers'
import { Attachment } from './attachments'


type GiftCardRecipientRel = ResourceId & { type: typeof GiftCardRecipients.TYPE }
type CustomerRel = ResourceId & { type: 'customers' }


interface GiftCardRecipient extends Resource {
	
	email?: string
	first_name?: string
	last_name?: string

	customer?: Customer
	attachments?: Attachment[]

}


interface GiftCardRecipientCreate extends ResourceCreate {
	
	email: string
	first_name?: string
	last_name?: string

	customer?: CustomerRel

}


interface GiftCardRecipientUpdate extends ResourceUpdate {
	
	email?: string
	first_name?: string
	last_name?: string

	customer?: CustomerRel

}


class GiftCardRecipients extends ApiResource {

	static readonly TYPE: 'gift_card_recipients' = 'gift_card_recipients'
	// static readonly PATH = 'gift_card_recipients'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<GiftCardRecipient>> {
		return this.resources.list({ type: GiftCardRecipients.TYPE }, params, options)
	}

	async create(resource: GiftCardRecipientCreate, options?: ResourcesConfig): Promise<GiftCardRecipient> {
		return this.resources.create(Object.assign(resource, { type: GiftCardRecipients.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCardRecipient> {
		return this.resources.retrieve<GiftCardRecipient>({ type: GiftCardRecipients.TYPE, id }, params, options)
	}

	async update(resource: GiftCardRecipientUpdate, options?: ResourcesConfig): Promise<GiftCardRecipient> {
		return this.resources.update({ ...resource, type: GiftCardRecipients.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: GiftCardRecipients.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isGiftCardRecipient(resource: any): resource is GiftCardRecipient {
		return resource.type && (resource.type === GiftCardRecipients.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(GiftCardRecipients.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(GiftCardRecipients.TYPE)
	}
	*/

	relationship(id: string | ResourceId): GiftCardRecipientRel {
		return (typeof id === 'string') ? { id, type: GiftCardRecipients.TYPE } : {id: id.id, type: GiftCardRecipients.TYPE }
	}

}


export default GiftCardRecipients

export { GiftCardRecipient, GiftCardRecipientCreate, GiftCardRecipientUpdate }
