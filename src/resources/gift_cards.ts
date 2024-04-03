import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
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


export type GiftCardSort = Pick<GiftCard, 'id' | 'status' | 'currency_code' | 'balance_cents' | 'balance_max_cents' | 'expires_at'> & ResourceSort
// export type GiftCardFilter = Pick<GiftCard, 'id' | 'status' | 'code' | 'currency_code' | 'balance_cents' | 'balance_max_cents' | 'single_use' | 'rechargeable' | 'expires_at'> & ResourceFilter


interface GiftCard extends Resource {
	
	readonly type: GiftCardType

	status: 'draft' | 'inactive' | 'active' | 'redeemed'
	code?: Nullable<string>
	currency_code?: Nullable<string>
	initial_balance_cents: number
	initial_balance_float: number
	formatted_initial_balance: string
	balance_cents: number
	balance_float: number
	formatted_balance: string
	balance_max_cents?: Nullable<string>
	balance_max_float?: Nullable<number>
	formatted_balance_max?: Nullable<string>
	balance_log: Array<Record<string, any>>
	single_use?: Nullable<boolean>
	rechargeable?: Nullable<boolean>
	distribute_discount?: Nullable<boolean>
	image_url?: Nullable<string>
	expires_at?: Nullable<string>
	recipient_email?: Nullable<string>

	market?: Nullable<Market>
	gift_card_recipient?: Nullable<GiftCardRecipient>
	attachments?: Nullable<Attachment[]>
	events?: Nullable<Event[]>
	tags?: Nullable<Tag[]>
	versions?: Nullable<Version[]>

}


interface GiftCardCreate extends ResourceCreate {
	
	code?: Nullable<string>
	currency_code?: Nullable<string>
	balance_cents: number
	balance_max_cents?: Nullable<string>
	single_use?: Nullable<boolean>
	rechargeable?: Nullable<boolean>
	distribute_discount?: Nullable<boolean>
	image_url?: Nullable<string>
	expires_at?: Nullable<string>
	recipient_email?: Nullable<string>

	market?: Nullable<MarketRel>
	gift_card_recipient?: Nullable<GiftCardRecipientRel>
	tags?: Nullable<TagRel[]>

}


interface GiftCardUpdate extends ResourceUpdate {
	
	currency_code?: Nullable<string>
	balance_cents?: Nullable<number>
	balance_max_cents?: Nullable<string>
	single_use?: Nullable<boolean>
	rechargeable?: Nullable<boolean>
	distribute_discount?: Nullable<boolean>
	image_url?: Nullable<string>
	expires_at?: Nullable<string>
	recipient_email?: Nullable<string>
	_purchase?: Nullable<boolean>
	_activate?: Nullable<boolean>
	_deactivate?: Nullable<boolean>
	_balance_change_cents?: Nullable<number>

	market?: Nullable<MarketRel>
	gift_card_recipient?: Nullable<GiftCardRecipientRel>
	tags?: Nullable<TagRel[]>

}


class GiftCards extends ApiResource<GiftCard> {

	static readonly TYPE: GiftCardType = 'gift_cards' as const

	async create(resource: GiftCardCreate, params?: QueryParamsRetrieve<GiftCard>, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.create<GiftCardCreate, GiftCard>({ ...resource, type: GiftCards.TYPE }, params, options)
	}

	async update(resource: GiftCardUpdate, params?: QueryParamsRetrieve<GiftCard>, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.update<GiftCardUpdate, GiftCard>({ ...resource, type: GiftCards.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: GiftCards.TYPE } : id, options)
	}

	async market(giftCardId: string | GiftCard, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _giftCardId = (giftCardId as GiftCard).id || giftCardId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `gift_cards/${_giftCardId}/market`, params, options) as unknown as Market
	}

	async gift_card_recipient(giftCardId: string | GiftCard, params?: QueryParamsRetrieve<GiftCardRecipient>, options?: ResourcesConfig): Promise<GiftCardRecipient> {
		const _giftCardId = (giftCardId as GiftCard).id || giftCardId as string
		return this.resources.fetch<GiftCardRecipient>({ type: 'gift_card_recipients' }, `gift_cards/${_giftCardId}/gift_card_recipient`, params, options) as unknown as GiftCardRecipient
	}

	async attachments(giftCardId: string | GiftCard, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _giftCardId = (giftCardId as GiftCard).id || giftCardId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `gift_cards/${_giftCardId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(giftCardId: string | GiftCard, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _giftCardId = (giftCardId as GiftCard).id || giftCardId as string
		return this.resources.fetch<Event>({ type: 'events' }, `gift_cards/${_giftCardId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(giftCardId: string | GiftCard, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _giftCardId = (giftCardId as GiftCard).id || giftCardId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `gift_cards/${_giftCardId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(giftCardId: string | GiftCard, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _giftCardId = (giftCardId as GiftCard).id || giftCardId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `gift_cards/${_giftCardId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async _purchase(id: string | GiftCard, params?: QueryParamsRetrieve<GiftCard>, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.update<GiftCardUpdate, GiftCard>({ id: (typeof id === 'string')? id: id.id, type: GiftCards.TYPE, _purchase: true }, params, options)
	}

	async _activate(id: string | GiftCard, params?: QueryParamsRetrieve<GiftCard>, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.update<GiftCardUpdate, GiftCard>({ id: (typeof id === 'string')? id: id.id, type: GiftCards.TYPE, _activate: true }, params, options)
	}

	async _deactivate(id: string | GiftCard, params?: QueryParamsRetrieve<GiftCard>, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.update<GiftCardUpdate, GiftCard>({ id: (typeof id === 'string')? id: id.id, type: GiftCards.TYPE, _deactivate: true }, params, options)
	}

	async _balance_change_cents(id: string | GiftCard, triggerValue: number, params?: QueryParamsRetrieve<GiftCard>, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.update<GiftCardUpdate, GiftCard>({ id: (typeof id === 'string')? id: id.id, type: GiftCards.TYPE, _balance_change_cents: triggerValue }, params, options)
	}


	isGiftCard(resource: any): resource is GiftCard {
		return resource.type && (resource.type === GiftCards.TYPE)
	}


	relationship(id: string | ResourceId | null): GiftCardRel {
		return super.relationshipOneToOne<GiftCardRel>(id)
	}

	relationshipToMany(...ids: string[]): GiftCardRel[] {
		return super.relationshipOneToMany<GiftCardRel>(...ids)
	}


	type(): GiftCardType {
		return GiftCards.TYPE
	}

}


export default GiftCards

export type { GiftCard, GiftCardCreate, GiftCardUpdate, GiftCardType }
