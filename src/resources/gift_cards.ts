import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { GiftCardRecipient, GiftCardRecipientType } from './gift_card_recipients'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'


type GiftCardType = 'gift_cards'
type GiftCardRel = ResourceRel & { type: GiftCardType }
type MarketRel = ResourceRel & { type: MarketType }
type GiftCardRecipientRel = ResourceRel & { type: GiftCardRecipientType }
type TagRel = ResourceRel & { type: TagType }


interface GiftCard extends Resource {
	
	readonly type: GiftCardType

	status: 'draft' | 'inactive' | 'active' | 'redeemed'
	code?: string | null
	currency_code?: string | null
	initial_balance_cents: number
	initial_balance_float: number
	formatted_initial_balance: string
	balance_cents: number
	balance_float: number
	formatted_balance: string
	balance_max_cents?: string | null
	balance_max_float?: number | null
	formatted_balance_max?: string | null
	balance_log: Array<Record<string, any>>
	usage_log: Record<string, any>
	single_use?: boolean | null
	rechargeable?: boolean | null
	distribute_discount?: boolean | null
	image_url?: string | null
	expires_at?: string | null
	recipient_email?: string | null

	market?: Market | null
	gift_card_recipient?: GiftCardRecipient | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	tags?: Tag[] | null
	versions?: Version[] | null

}


interface GiftCardCreate extends ResourceCreate {
	
	code?: string | null
	currency_code?: string | null
	balance_cents: number
	balance_max_cents?: string | null
	single_use?: boolean | null
	rechargeable?: boolean | null
	distribute_discount?: boolean | null
	image_url?: string | null
	expires_at?: string | null
	recipient_email?: string | null

	market?: MarketRel | null
	gift_card_recipient?: GiftCardRecipientRel | null
	tags?: TagRel[] | null

}


interface GiftCardUpdate extends ResourceUpdate {
	
	currency_code?: string | null
	balance_cents?: number | null
	balance_max_cents?: string | null
	single_use?: boolean | null
	rechargeable?: boolean | null
	distribute_discount?: boolean | null
	image_url?: string | null
	expires_at?: string | null
	recipient_email?: string | null
	_purchase?: boolean | null
	_activate?: boolean | null
	_deactivate?: boolean | null
	_balance_change_cents?: number | null

	market?: MarketRel | null
	gift_card_recipient?: GiftCardRecipientRel | null
	tags?: TagRel[] | null

}


class GiftCards extends ApiResource<GiftCard> {

	static readonly TYPE: GiftCardType = 'gift_cards' as const

	async create(resource: GiftCardCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.create<GiftCardCreate, GiftCard>({ ...resource, type: GiftCards.TYPE }, params, options)
	}

	async update(resource: GiftCardUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.update<GiftCardUpdate, GiftCard>({ ...resource, type: GiftCards.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: GiftCards.TYPE } : id, options)
	}

	async market(giftCardId: string | GiftCard, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _giftCardId = (giftCardId as GiftCard).id || giftCardId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `gift_cards/${_giftCardId}/market`, params, options) as unknown as Market
	}

	async gift_card_recipient(giftCardId: string | GiftCard, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCardRecipient> {
		const _giftCardId = (giftCardId as GiftCard).id || giftCardId as string
		return this.resources.fetch<GiftCardRecipient>({ type: 'gift_card_recipients' }, `gift_cards/${_giftCardId}/gift_card_recipient`, params, options) as unknown as GiftCardRecipient
	}

	async attachments(giftCardId: string | GiftCard, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _giftCardId = (giftCardId as GiftCard).id || giftCardId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `gift_cards/${_giftCardId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(giftCardId: string | GiftCard, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _giftCardId = (giftCardId as GiftCard).id || giftCardId as string
		return this.resources.fetch<Event>({ type: 'events' }, `gift_cards/${_giftCardId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(giftCardId: string | GiftCard, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _giftCardId = (giftCardId as GiftCard).id || giftCardId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `gift_cards/${_giftCardId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(giftCardId: string | GiftCard, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _giftCardId = (giftCardId as GiftCard).id || giftCardId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `gift_cards/${_giftCardId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _purchase(id: string | GiftCard, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.update<GiftCardUpdate, GiftCard>({ id: (typeof id === 'string')? id: id.id, type: GiftCards.TYPE, _purchase: true }, params, options)
	}

	async _activate(id: string | GiftCard, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.update<GiftCardUpdate, GiftCard>({ id: (typeof id === 'string')? id: id.id, type: GiftCards.TYPE, _activate: true }, params, options)
	}

	async _deactivate(id: string | GiftCard, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.update<GiftCardUpdate, GiftCard>({ id: (typeof id === 'string')? id: id.id, type: GiftCards.TYPE, _deactivate: true }, params, options)
	}

	async _balance_change_cents(id: string | GiftCard, triggerValue: number, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.update<GiftCardUpdate, GiftCard>({ id: (typeof id === 'string')? id: id.id, type: GiftCards.TYPE, _balance_change_cents: triggerValue }, params, options)
	}


	isGiftCard(resource: any): resource is GiftCard {
		return resource.type && (resource.type === GiftCards.TYPE)
	}


	relationship(id: string | ResourceId | null): GiftCardRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: GiftCards.TYPE } : { id: id.id, type: GiftCards.TYPE }
	}


	type(): GiftCardType {
		return GiftCards.TYPE
	}

}


export default GiftCards

export type { GiftCard, GiftCardCreate, GiftCardUpdate, GiftCardType }
