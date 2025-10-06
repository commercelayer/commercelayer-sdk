import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { GiftCardRecipient, GiftCardRecipientType } from './gift_card_recipients'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'
import type { EventStore } from './event_stores'


type GiftCardType = 'gift_cards'
type GiftCardRel = ResourceRel & { type: GiftCardType }
type MarketRel = ResourceRel & { type: MarketType }
type GiftCardRecipientRel = ResourceRel & { type: GiftCardRecipientType }
type TagRel = ResourceRel & { type: TagType }


export type GiftCardSort = Pick<GiftCard, 'id' | 'status' | 'currency_code' | 'balance_cents' | 'balance_max_cents' | 'expires_at'> & ResourceSort
// export type GiftCardFilter = Pick<GiftCard, 'id' | 'status' | 'code' | 'currency_code' | 'balance_cents' | 'balance_max_cents' | 'single_use' | 'rechargeable' | 'expires_at'> & ResourceFilter


interface GiftCard extends Resource {
	
	readonly type: GiftCardType

	/** 
	 * The gift card status. One of 'draft' (default), 'inactive', 'active', or 'redeemed'.
	 * @example ```"draft"```
	 */
	status: 'draft' | 'inactive' | 'active' | 'redeemed'
	/** 
	 * The gift card code UUID. If not set, it's automatically generated.
	 * @example ```"32db311a-75d9-4c17-9e34-2be220137ad6"```
	 */
	code?: string | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * The gift card initial balance, in cents.
	 * @example ```15000```
	 */
	initial_balance_cents: number
	/** 
	 * The gift card initial balance, float.
	 * @example ```150```
	 */
	initial_balance_float: number
	/** 
	 * The gift card initial balance, formatted.
	 * @example ```"€150,00"```
	 */
	formatted_initial_balance: string
	/** 
	 * The gift card balance, in cents.
	 * @example ```15000```
	 */
	balance_cents: number
	/** 
	 * The gift card balance, float.
	 * @example ```150```
	 */
	balance_float: number
	/** 
	 * The gift card balance, formatted.
	 * @example ```"€150,00"```
	 */
	formatted_balance: string
	/** 
	 * The gift card balance max, in cents.
	 * @example ```100000```
	 */
	balance_max_cents?: number | null
	/** 
	 * The gift card balance max, float.
	 * @example ```1000```
	 */
	balance_max_float?: number | null
	/** 
	 * The gift card balance max, formatted.
	 * @example ```"€1000,00"```
	 */
	formatted_balance_max?: string | null
	/** 
	 * The gift card balance log. Tracks all the gift card transactions.
	 * @example ```[{"datetime":"2019-12-23T12:00:00.000Z","balance_change_cents":-10000},{"datetime":"2020-02-01T12:00:00.000Z","balance_change_cents":5000}]```
	 */
	balance_log: Array<Record<string, any>>
	/** 
	 * The gift card usage log. Tracks all the gift card usage actions by orders.
	 * @example ```{"eNoKkhmbNp":[{"action":"use","amount_cents":-1000,"balance_cents":4000,"order_number":"11111","datetime":"2020-02-01T12:00:00.000Z"}]}```
	 */
	usage_log: Record<string, any>
	/** 
	 * Indicates if the gift card can be used only one.
	 */
	single_use?: boolean | null
	/** 
	 * Indicates if the gift card can be recharged.
	 * @example ```true```
	 */
	rechargeable?: boolean | null
	/** 
	 * Indicates if redeemed gift card amount is distributed for tax calculation.
	 * @example ```true```
	 */
	distribute_discount?: boolean | null
	/** 
	 * The URL of an image that represents the gift card.
	 * @example ```"https://img.yourdomain.com/gift_cards/32db311a.png"```
	 */
	image_url?: string | null
	/** 
	 * Time at which the gift card will expire.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	expires_at?: string | null
	/** 
	 * The email address of the associated recipient. When creating or updating a gift card, this is a shortcut to find or create the associated recipient by email.
	 * @example ```"john@example.com"```
	 */
	recipient_email?: string | null

	market?: Market | null
	gift_card_recipient?: GiftCardRecipient | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	tags?: Tag[] | null
	versions?: Version[] | null
	event_stores?: EventStore[] | null

}


interface GiftCardCreate extends ResourceCreate {
	
	/** 
	 * The gift card code UUID. If not set, it's automatically generated.
	 * @example ```"32db311a-75d9-4c17-9e34-2be220137ad6"```
	 */
	code?: string | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * The gift card balance, in cents.
	 * @example ```15000```
	 */
	balance_cents: number
	/** 
	 * The gift card balance max, in cents.
	 * @example ```100000```
	 */
	balance_max_cents?: number | null
	/** 
	 * Indicates if the gift card can be used only one.
	 */
	single_use?: boolean | null
	/** 
	 * Indicates if the gift card can be recharged.
	 * @example ```true```
	 */
	rechargeable?: boolean | null
	/** 
	 * Indicates if redeemed gift card amount is distributed for tax calculation.
	 * @example ```true```
	 */
	distribute_discount?: boolean | null
	/** 
	 * The URL of an image that represents the gift card.
	 * @example ```"https://img.yourdomain.com/gift_cards/32db311a.png"```
	 */
	image_url?: string | null
	/** 
	 * Time at which the gift card will expire.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	expires_at?: string | null
	/** 
	 * The email address of the associated recipient. When creating or updating a gift card, this is a shortcut to find or create the associated recipient by email.
	 * @example ```"john@example.com"```
	 */
	recipient_email?: string | null

	market?: MarketRel | null
	gift_card_recipient?: GiftCardRecipientRel | null
	tags?: TagRel[] | null

}


interface GiftCardUpdate extends ResourceUpdate {
	
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * The gift card balance, in cents.
	 * @example ```15000```
	 */
	balance_cents?: number | null
	/** 
	 * The gift card balance max, in cents.
	 * @example ```100000```
	 */
	balance_max_cents?: number | null
	/** 
	 * Indicates if the gift card can be used only one.
	 */
	single_use?: boolean | null
	/** 
	 * Indicates if the gift card can be recharged.
	 * @example ```true```
	 */
	rechargeable?: boolean | null
	/** 
	 * Indicates if redeemed gift card amount is distributed for tax calculation.
	 * @example ```true```
	 */
	distribute_discount?: boolean | null
	/** 
	 * The URL of an image that represents the gift card.
	 * @example ```"https://img.yourdomain.com/gift_cards/32db311a.png"```
	 */
	image_url?: string | null
	/** 
	 * Time at which the gift card will expire.
	 * @example ```"2018-01-01T12:00:00.000Z"```
	 */
	expires_at?: string | null
	/** 
	 * The email address of the associated recipient. When creating or updating a gift card, this is a shortcut to find or create the associated recipient by email.
	 * @example ```"john@example.com"```
	 */
	recipient_email?: string | null
	/** 
	 * Send this attribute if you want to confirm a draft gift card. The gift card becomes 'inactive', waiting to be activated.
	 * @example ```true```
	 */
	_purchase?: boolean | null
	/** 
	 * Send this attribute if you want to activate a gift card.
	 * @example ```true```
	 */
	_activate?: boolean | null
	/** 
	 * Send this attribute if you want to deactivate a gift card.
	 * @example ```true```
	 */
	_deactivate?: boolean | null
	/** 
	 * The balance change, in cents. Send a negative value to reduces the card balance by the specified amount. Send a positive value to recharge the gift card (if rechargeable).
	 * @example ```-5000```
	 */
	_balance_change_cents?: number | null
	/** 
	 * Comma separated list of tags to be added. Duplicates, invalid and non existing ones are discarded. Cannot be passed by sales channels.
	 */
	_add_tags?: string | null
	/** 
	 * Comma separated list of tags to be removed. Duplicates, invalid and non existing ones are discarded. Cannot be passed by sales channels.
	 */
	_remove_tags?: string | null

	market?: MarketRel | null
	gift_card_recipient?: GiftCardRecipientRel | null
	tags?: TagRel[] | null

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

	async event_stores(giftCardId: string | GiftCard, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _giftCardId = (giftCardId as GiftCard).id || giftCardId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `gift_cards/${_giftCardId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
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

	async _add_tags(id: string | GiftCard, triggerValue: string, params?: QueryParamsRetrieve<GiftCard>, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.update<GiftCardUpdate, GiftCard>({ id: (typeof id === 'string')? id: id.id, type: GiftCards.TYPE, _add_tags: triggerValue }, params, options)
	}

	async _remove_tags(id: string | GiftCard, triggerValue: string, params?: QueryParamsRetrieve<GiftCard>, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.update<GiftCardUpdate, GiftCard>({ id: (typeof id === 'string')? id: id.id, type: GiftCards.TYPE, _remove_tags: triggerValue }, params, options)
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


const instance = new GiftCards()
export default instance

export type { GiftCards, GiftCard, GiftCardCreate, GiftCardUpdate, GiftCardType }
