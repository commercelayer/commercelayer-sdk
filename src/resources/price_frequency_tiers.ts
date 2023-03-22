import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Price } from './prices'
import type { Attachment } from './attachments'
import type { Event } from './events'


type PriceFrequencyTierRel = ResourceRel & { type: typeof PriceFrequencyTiers.TYPE }
type PriceRel = ResourceRel & { type: 'prices' }


interface PriceFrequencyTier extends Resource {
	
	name?: string
	up_to?: number
	price_amount_cents?: number
	price_amount_float?: number
	formatted_price_amount?: string

	price?: Price
	attachments?: Attachment[]
	events?: Event[]

}


interface PriceFrequencyTierCreate extends ResourceCreate {
	
	name: string
	up_to?: number
	price_amount_cents: number

	price: PriceRel

}


interface PriceFrequencyTierUpdate extends ResourceUpdate {
	
	name?: string
	up_to?: number
	price_amount_cents?: number

	price?: PriceRel

}


class PriceFrequencyTiers extends ApiResource {

	static readonly TYPE: 'price_frequency_tiers' = 'price_frequency_tiers' as const
	// static readonly PATH = 'price_frequency_tiers'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PriceFrequencyTier>> {
		return this.resources.list<PriceFrequencyTier>({ type: PriceFrequencyTiers.TYPE }, params, options)
	}

	async create(resource: PriceFrequencyTierCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceFrequencyTier> {
		return this.resources.create<PriceFrequencyTierCreate, PriceFrequencyTier>({ ...resource, type: PriceFrequencyTiers.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceFrequencyTier> {
		return this.resources.retrieve<PriceFrequencyTier>({ type: PriceFrequencyTiers.TYPE, id }, params, options)
	}

	async update(resource: PriceFrequencyTierUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceFrequencyTier> {
		return this.resources.update<PriceFrequencyTierUpdate, PriceFrequencyTier>({ ...resource, type: PriceFrequencyTiers.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: PriceFrequencyTiers.TYPE, id }, options)
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


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPriceFrequencyTier(resource: any): resource is PriceFrequencyTier {
		return resource.type && (resource.type === PriceFrequencyTiers.TYPE)
	}


	relationship(id: string | ResourceId | null): PriceFrequencyTierRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: PriceFrequencyTiers.TYPE } : { id: id.id, type: PriceFrequencyTiers.TYPE }
	}


	type(): string {
		return PriceFrequencyTiers.TYPE
	}

}


export default PriceFrequencyTiers

export { PriceFrequencyTier, PriceFrequencyTierCreate, PriceFrequencyTierUpdate }
