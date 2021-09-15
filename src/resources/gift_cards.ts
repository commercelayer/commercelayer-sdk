/**
 * ©2021 Commerce Layer Inc.
 * Source code generated automatically by SDK codegen from OpenAPI schema 2.7.0
 * Generation date: 14-09-2021
 **/

import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource'
import { /* QueryBuilderRetrieve, QueryBuilderList, */QueryParamsList, QueryParamsRetrieve } from '../query'

import { Market } from './markets'
import { GiftCardRecipient } from './gift_card_recipients'
import { Attachment } from './attachments'


type GiftCardRel = ResourceId & { type: typeof GiftCards.TYPE }
type MarketRel = ResourceId & { type: 'markets' }
type GiftCardRecipientRel = ResourceId & { type: 'gift_card_recipients' }


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
	_balance_change_cents?: number

	market?: Market
	gift_card_recipient?: GiftCardRecipient
	attachments?: Attachment[]

}


interface GiftCardCreate extends ResourceCreate {
	
	code?: string
	currency_code: string
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
		return this.resources.list({ type: GiftCards.TYPE }, params, options)
	}

	async create(resource: GiftCardCreate, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.create(Object.assign(resource, { type: GiftCards.TYPE }) , options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.retrieve<GiftCard>({ type: GiftCards.TYPE, id }, params, options)
	}

	async update(resource: GiftCardUpdate, options?: ResourcesConfig): Promise<GiftCard> {
		return this.resources.update({ ...resource, type: GiftCards.TYPE }, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: GiftCards.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isGiftCard(resource: any): resource is GiftCard {
		return resource.type && (resource.type === GiftCards.TYPE)
	}

	/*
	filter(): QueryBuilderRetrieve {
		return new QueryBuilderRetrieve(GiftCards.TYPE)
	}
	*/

	/*
	filterList(): QueryBuilderList {
		return new QueryBuilderList(GiftCards.TYPE)
	}
	*/

	relationship(id: string | ResourceId): GiftCardRel {
		return (typeof id === 'string') ? { id, type: GiftCards.TYPE } : {id: id.id, type: GiftCards.TYPE }
	}

}


export default GiftCards

export { GiftCard, GiftCardCreate, GiftCardUpdate }
