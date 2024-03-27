import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Price, PriceType, PriceSortable } from './prices'
import type { Attachment, AttachmentSortable } from './attachments'
import type { Version, VersionSortable } from './versions'
import type { Event, EventSortable } from './events'


type PriceFrequencyTierType = 'price_frequency_tiers'
type PriceFrequencyTierRel = ResourceRel & { type: PriceFrequencyTierType }
type PriceRel = ResourceRel & { type: PriceType }


export type PriceFrequencyTierSortable = Pick<PriceFrequencyTier, 'id' | 'name' | 'up_to' | 'price_amount_cents'> & ResourceSortable
export type PriceFrequencyTierFilterable = Pick<PriceFrequencyTier, 'id' | 'name' | 'up_to' | 'price_amount_cents'> & ResourceFilterable


interface PriceFrequencyTier extends Resource {
	
	readonly type: PriceFrequencyTierType

	name: string
	up_to?: number | null
	price_amount_cents: number
	price_amount_float?: number | null
	formatted_price_amount?: string | null

	price?: Price | null
	attachments?: Attachment[] | null
	versions?: Version[] | null
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


class PriceFrequencyTiers extends ApiResource<PriceFrequencyTier, PriceFrequencyTierSortable> {

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
		return this.resources.fetch<Price, PriceSortable>({ type: 'prices' }, `price_frequency_tiers/${_priceFrequencyTierId}/price`, params, options) as unknown as Price
	}

	async attachments(priceFrequencyTierId: string | PriceFrequencyTier, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _priceFrequencyTierId = (priceFrequencyTierId as PriceFrequencyTier).id || priceFrequencyTierId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `price_frequency_tiers/${_priceFrequencyTierId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(priceFrequencyTierId: string | PriceFrequencyTier, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _priceFrequencyTierId = (priceFrequencyTierId as PriceFrequencyTier).id || priceFrequencyTierId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `price_frequency_tiers/${_priceFrequencyTierId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async events(priceFrequencyTierId: string | PriceFrequencyTier, params?: QueryParamsList<EventSortable>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _priceFrequencyTierId = (priceFrequencyTierId as PriceFrequencyTier).id || priceFrequencyTierId as string
		return this.resources.fetch<Event, EventSortable>({ type: 'events' }, `price_frequency_tiers/${_priceFrequencyTierId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isPriceFrequencyTier(resource: any): resource is PriceFrequencyTier {
		return resource.type && (resource.type === PriceFrequencyTiers.TYPE)
	}


	relationship(id: string | ResourceId | null): PriceFrequencyTierRel {
		return super.relationshipOneToOne<PriceFrequencyTierRel>(id)
	}

	relationshipToMany(...ids: string[]): PriceFrequencyTierRel[] {
		return super.relationshipOneToMany<PriceFrequencyTierRel>(...ids)
	}


	type(): PriceFrequencyTierType {
		return PriceFrequencyTiers.TYPE
	}

}


export default PriceFrequencyTiers

export type { PriceFrequencyTier, PriceFrequencyTierCreate, PriceFrequencyTierUpdate, PriceFrequencyTierType }

/*
export const PriceFrequencyTiersClient = (init: ResourceAdapter | ResourcesInitConfig): PriceFrequencyTiers => {
	return new PriceFrequencyTiers((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
