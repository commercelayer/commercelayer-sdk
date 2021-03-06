import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Market } from './markets'
import type { GiftCardRecipient } from './gift_card_recipients'
import type { Attachment } from './attachments'
import type { Event } from './events'


type GiftCardRel = ResourceRel & { type: typeof GiftCards.TYPE }
type MarketRel = ResourceRel & { type: 'markets' }
type GiftCardRecipientRel = ResourceRel & { type: 'gift_card_recipients' }


interface GiftCard extends Resource {
	
	status?: string
	code?: string
	currency_code?: string
	initial_balance_cents?: number
	initial_balance_float?: number
	formatted_initial_balance?: string
	balance_cents?: number
	balance_float?: number
	formatted_balance?: string
	balance_max_cents?: string
	balance_max_float?: number
	formatted_balance_max?: string
	balance_log?: object[]
	single_use?: boolean
	rechargeable?: boolean
	image_url?: string
	expires_at?: string
	recipient_email?: string

	market?: Market
	gift_card_recipient?: GiftCardRecipient
	attachments?: Attachment[]
	events?: Event[]

}


interface GiftCardCreate extends ResourceCreate {
	
	code?: string
	currency_code?: string
	balance_cents: number
	balance_max_cents?: string
	single_use?: boolean
	rechargeable?: boolean
	image_url?: string
	expires_at?: string
	recipient_email?: string

	market?: MarketRel
	gift_card_recipient?: GiftCardRecipientRel

}


interface GiftCardUpdate extends ResourceUpdate {
	
	currency_code?: string
	balance_cents?: number
	balance_max_cents?: string
	single_use?: boolean
	rechargeable?: boolean
	image_url?: string
	expires_at?: string
	recipient_email?: string
	_purchase?: boolean
	_activate?: boolean
	_deactivate?: boolean
	_balance_change_cents?: number

	market?: MarketRel
	gift_card_recipient?: GiftCardRecipientRel

}


class GiftCards extends ApiResource {

	static readonly TYPE: 'gift_cards' = 'gift_cards'
	// static readonly PATH = 'gift_cards'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<GiftCard>> {
		return this.resources.list<GiftCard>({ type: GiftCards.TYPE }, params, options)
	}

	async create(resource: GiftCardCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.create<GiftCardCreate, GiftCard>({ ...resource, type: GiftCards.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.retrieve<GiftCard>({ type: GiftCards.TYPE, id }, params, options)
	}

	async update(resource: GiftCardUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.update<GiftCardUpdate, GiftCard>({ ...resource, type: GiftCards.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: GiftCards.TYPE, id }, options)
	}

	async market(giftCardId: string | GiftCard, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _giftCardId = (giftCardId as GiftCard).id || giftCardId
		return this.resources.fetch<Market>({ type: 'markets' }, `gift_cards/${_giftCardId}/market`, params, options) as unknown as Market
	}

	async gift_card_recipient(giftCardId: string | GiftCard, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCardRecipient> {
		const _giftCardId = (giftCardId as GiftCard).id || giftCardId
		return this.resources.fetch<GiftCardRecipient>({ type: 'gift_card_recipients' }, `gift_cards/${_giftCardId}/gift_card_recipient`, params, options) as unknown as GiftCardRecipient
	}

	async attachments(giftCardId: string | GiftCard, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _giftCardId = (giftCardId as GiftCard).id || giftCardId
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `gift_cards/${_giftCardId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(giftCardId: string | GiftCard, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _giftCardId = (giftCardId as GiftCard).id || giftCardId
		return this.resources.fetch<Event>({ type: 'events' }, `gift_cards/${_giftCardId}/events`, params, options) as unknown as ListResponse<Event>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isGiftCard(resource: any): resource is GiftCard {
		return resource.type && (resource.type === GiftCards.TYPE)
	}


	relationship(id: string | ResourceId | null): GiftCardRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: GiftCards.TYPE } : { id: id.id, type: GiftCards.TYPE }
	}


	type(): string {
		return GiftCards.TYPE
	}

}


export default GiftCards

export { GiftCard, GiftCardCreate, GiftCardUpdate }
