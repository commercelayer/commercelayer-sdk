import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Customer } from './customers'
import { Attachment } from './attachments'


type GiftCardRecipientRel = ResourceRel & { type: typeof GiftCardRecipients.TYPE }
type CustomerRel = ResourceRel & { type: 'customers' }


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
		return this.resources.list<GiftCardRecipient>({ type: GiftCardRecipients.TYPE }, params, options)
	}

	async create(resource: GiftCardRecipientCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCardRecipient> {
		return this.resources.create<GiftCardRecipientCreate, GiftCardRecipient>({ ...resource, type: GiftCardRecipients.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCardRecipient> {
		return this.resources.retrieve<GiftCardRecipient>({ type: GiftCardRecipients.TYPE, id }, params, options)
	}

	async update(resource: GiftCardRecipientUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCardRecipient> {
		return this.resources.update<GiftCardRecipientUpdate, GiftCardRecipient>({ ...resource, type: GiftCardRecipients.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: GiftCardRecipients.TYPE, id }, options)
	}

	async customer(giftCardRecipientId: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Customer> {
		return this.resources.fetch<Customer>({ type: 'customers' }, `gift_card_recipients/${giftCardRecipientId}/customer`, params, options) as unknown as Customer
	}

	async attachments(giftCardRecipientId: string, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `gift_card_recipients/${giftCardRecipientId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isGiftCardRecipient(resource: any): resource is GiftCardRecipient {
		return resource.type && (resource.type === GiftCardRecipients.TYPE)
	}


	relationship(id: string | ResourceId | null): GiftCardRecipientRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: GiftCardRecipients.TYPE } : { id: id.id, type: GiftCardRecipients.TYPE }
	}


	type(): string {
		return GiftCardRecipients.TYPE
	}

}


export default GiftCardRecipients

export { GiftCardRecipient, GiftCardRecipientCreate, GiftCardRecipientUpdate }
