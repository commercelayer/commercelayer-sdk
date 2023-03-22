import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Price, PriceType } from './prices'
import type { Attachment } from './attachments'
import type { Event } from './events'


type PriceFrequencyTierType = 'price_frequency_tiers'
type PriceFrequencyTierRel = ResourceRel & { type: PriceFrequencyTierType }
type PriceRel = ResourceRel & { type: PriceType }


interface PriceFrequencyTier extends Resource {
	
	readonly type: PriceFrequencyTierType

	name: string
	up_to?: number | null
	price_amount_cents: number
	price_amount_float?: number | null
	formatted_price_amount?: string | null

	price?: Price | null
	attachments?: Attachment[] | null
	events?: Event[] | null

}


interface PriceFrequencyTierCreate extends ResourceCreate {
	
	name: string
	up_to?: number | null
	price_amount_cents: number

	price: PriceRel

}


interface PriceFrequencyTierUpdate extends ResourceUpdate {
	
	name?: string | null
	up_to?: number | null
	price_amount_cents?: number | null

	price?: PriceRel | null

}


class PriceFrequencyTiers extends ApiResource<PriceFrequencyTier> {

	static readonly TYPE: PriceFrequencyTierType = 'price_frequency_tiers' as const

	async create(resource: PriceFrequencyTierCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceFrequencyTier> {
		return this.resources.create<PriceFrequencyTierCreate, PriceFrequencyTier>({ ...resource, type: PriceFrequencyTiers.TYPE }, params, options)
	}

	async update(resource: PriceFrequencyTierUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceFrequencyTier> {
		return this.resources.update<PriceFrequencyTierUpdate, PriceFrequencyTier>({ ...resource, type: PriceFrequencyTiers.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: PriceFrequencyTiers.TYPE } : id, options)
	}

	async price(priceFrequencyTierId: string | PriceFrequencyTier, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Price> {
		const _priceFrequencyTierId = (priceFrequencyTierId as PriceFrequencyTier).id || priceFrequencyTierId as string
		return this.resources.fetch<Price>({ type: 'prices' }, `price_frequency_tiers/${_priceFrequencyTierId}/price`, params, options) as unknown as Price
	}

	async attachments(priceFrequencyTierId: string | PriceFrequencyTier, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _priceFrequencyTierId = (priceFrequencyTierId as PriceFrequencyTier).id || priceFrequencyTierId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `price_frequency_tiers/${_priceFrequencyTierId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(priceFrequencyTierId: string | PriceFrequencyTier, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _priceFrequencyTierId = (priceFrequencyTierId as PriceFrequencyTier).id || priceFrequencyTierId as string
		return this.resources.fetch<Event>({ type: 'events' }, `price_frequency_tiers/${_priceFrequencyTierId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isPriceFrequencyTier(resource: any): resource is PriceFrequencyTier {
		return resource.type && (resource.type === PriceFrequencyTiers.TYPE)
	}


	relationship(id: string | ResourceId | null): PriceFrequencyTierRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: PriceFrequencyTiers.TYPE } : { id: id.id, type: PriceFrequencyTiers.TYPE }
	}


	type(): PriceFrequencyTierType {
		return PriceFrequencyTiers.TYPE
	}

}


export default PriceFrequencyTiers

export type { PriceFrequencyTier, PriceFrequencyTierCreate, PriceFrequencyTierUpdate, PriceFrequencyTierType }
