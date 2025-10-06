import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Customer, CustomerType } from './customers'
import type { EventStore } from './event_stores'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type GiftCardRecipientType = 'gift_card_recipients'
type GiftCardRecipientRel = ResourceRel & { type: GiftCardRecipientType }
type CustomerRel = ResourceRel & { type: CustomerType }


export type GiftCardRecipientSort = Pick<GiftCardRecipient, 'id' | 'email'> & ResourceSort
// export type GiftCardRecipientFilter = Pick<GiftCardRecipient, 'id' | 'email' | 'first_name' | 'last_name'> & ResourceFilter


interface GiftCardRecipient extends Resource {
	
	readonly type: GiftCardRecipientType

	/** 
	 * The recipient email address.
	 * @example ```"john@example.com"```
	 */
	email: string
	/** 
	 * The recipient first name.
	 * @example ```"John"```
	 */
	first_name?: string | null
	/** 
	 * The recipient last name.
	 * @example ```"Smith"```
	 */
	last_name?: string | null

	customer?: Customer | null
	event_stores?: EventStore[] | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


interface GiftCardRecipientCreate extends ResourceCreate {
	
	/** 
	 * The recipient email address.
	 * @example ```"john@example.com"```
	 */
	email: string
	/** 
	 * The recipient first name.
	 * @example ```"John"```
	 */
	first_name?: string | null
	/** 
	 * The recipient last name.
	 * @example ```"Smith"```
	 */
	last_name?: string | null

	customer?: CustomerRel | null

}


interface GiftCardRecipientUpdate extends ResourceUpdate {
	
	/** 
	 * The recipient email address.
	 * @example ```"john@example.com"```
	 */
	email?: string | null
	/** 
	 * The recipient first name.
	 * @example ```"John"```
	 */
	first_name?: string | null
	/** 
	 * The recipient last name.
	 * @example ```"Smith"```
	 */
	last_name?: string | null

	customer?: CustomerRel | null

}


class GiftCardRecipients extends ApiResource<GiftCardRecipient> {

	static readonly TYPE: GiftCardRecipientType = 'gift_card_recipients' as const

	async create(resource: GiftCardRecipientCreate, params?: QueryParamsRetrieve<GiftCardRecipient>, options?: ResourcesConfig): Promise<GiftCardRecipient> {
		return this.resources.create<GiftCardRecipientCreate, GiftCardRecipient>({ ...resource, type: GiftCardRecipients.TYPE }, params, options)
	}

	async update(resource: GiftCardRecipientUpdate, params?: QueryParamsRetrieve<GiftCardRecipient>, options?: ResourcesConfig): Promise<GiftCardRecipient> {
		return this.resources.update<GiftCardRecipientUpdate, GiftCardRecipient>({ ...resource, type: GiftCardRecipients.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: GiftCardRecipients.TYPE } : id, options)
	}

	async customer(giftCardRecipientId: string | GiftCardRecipient, params?: QueryParamsRetrieve<Customer>, options?: ResourcesConfig): Promise<Customer> {
		const _giftCardRecipientId = (giftCardRecipientId as GiftCardRecipient).id || giftCardRecipientId as string
		return this.resources.fetch<Customer>({ type: 'customers' }, `gift_card_recipients/${_giftCardRecipientId}/customer`, params, options) as unknown as Customer
	}

	async event_stores(giftCardRecipientId: string | GiftCardRecipient, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _giftCardRecipientId = (giftCardRecipientId as GiftCardRecipient).id || giftCardRecipientId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `gift_card_recipients/${_giftCardRecipientId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}

	async attachments(giftCardRecipientId: string | GiftCardRecipient, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _giftCardRecipientId = (giftCardRecipientId as GiftCardRecipient).id || giftCardRecipientId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `gift_card_recipients/${_giftCardRecipientId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(giftCardRecipientId: string | GiftCardRecipient, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _giftCardRecipientId = (giftCardRecipientId as GiftCardRecipient).id || giftCardRecipientId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `gift_card_recipients/${_giftCardRecipientId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isGiftCardRecipient(resource: any): resource is GiftCardRecipient {
		return resource.type && (resource.type === GiftCardRecipients.TYPE)
	}


	relationship(id: string | ResourceId | null): GiftCardRecipientRel {
		return super.relationshipOneToOne<GiftCardRecipientRel>(id)
	}

	relationshipToMany(...ids: string[]): GiftCardRecipientRel[] {
		return super.relationshipOneToMany<GiftCardRecipientRel>(...ids)
	}


	type(): GiftCardRecipientType {
		return GiftCardRecipients.TYPE
	}

}


export default GiftCardRecipients

export type { GiftCardRecipient, GiftCardRecipientCreate, GiftCardRecipientUpdate, GiftCardRecipientType }
