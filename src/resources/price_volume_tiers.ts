import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Price, PriceType, PriceSortable } from './prices'
import type { Attachment, AttachmentSortable } from './attachments'
import type { Version, VersionSortable } from './versions'
import type { Event, EventSortable } from './events'


type PriceVolumeTierType = 'price_volume_tiers'
type PriceVolumeTierRel = ResourceRel & { type: PriceVolumeTierType }
type PriceRel = ResourceRel & { type: PriceType }


export type PriceVolumeTierSortable = Pick<PriceVolumeTier, 'id' | 'name' | 'up_to' | 'price_amount_cents'> & ResourceSortable
export type PriceVolumeTierFilterable = Pick<PriceVolumeTier, 'id' | 'name' | 'up_to' | 'price_amount_cents'> & ResourceFilterable


interface PriceVolumeTier extends Resource {
	
	readonly type: PriceVolumeTierType

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


interface PriceVolumeTierCreate extends ResourceCreate {
	
	name: string
	up_to?: number | null
	price_amount_cents: number

	price: PriceRel

}


interface PriceVolumeTierUpdate extends ResourceUpdate {
	
	name?: string | null
	up_to?: number | null
	price_amount_cents?: number | null

	price?: PriceRel | null

}


class PriceVolumeTiers extends ApiResource<PriceVolumeTier, PriceVolumeTierSortable> {

	static readonly TYPE: PriceVolumeTierType = 'price_volume_tiers' as const

	async create(resource: PriceVolumeTierCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceVolumeTier> {
		return this.resources.create<PriceVolumeTierCreate, PriceVolumeTier>({ ...resource, type: PriceVolumeTiers.TYPE }, params, options)
	}

	async update(resource: PriceVolumeTierUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceVolumeTier> {
		return this.resources.update<PriceVolumeTierUpdate, PriceVolumeTier>({ ...resource, type: PriceVolumeTiers.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: PriceVolumeTiers.TYPE } : id, options)
	}

	async price(priceVolumeTierId: string | PriceVolumeTier, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Price> {
		const _priceVolumeTierId = (priceVolumeTierId as PriceVolumeTier).id || priceVolumeTierId as string
		return this.resources.fetch<Price, PriceSortable>({ type: 'prices' }, `price_volume_tiers/${_priceVolumeTierId}/price`, params, options) as unknown as Price
	}

	async attachments(priceVolumeTierId: string | PriceVolumeTier, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _priceVolumeTierId = (priceVolumeTierId as PriceVolumeTier).id || priceVolumeTierId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `price_volume_tiers/${_priceVolumeTierId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(priceVolumeTierId: string | PriceVolumeTier, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _priceVolumeTierId = (priceVolumeTierId as PriceVolumeTier).id || priceVolumeTierId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `price_volume_tiers/${_priceVolumeTierId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async events(priceVolumeTierId: string | PriceVolumeTier, params?: QueryParamsList<EventSortable>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _priceVolumeTierId = (priceVolumeTierId as PriceVolumeTier).id || priceVolumeTierId as string
		return this.resources.fetch<Event, EventSortable>({ type: 'events' }, `price_volume_tiers/${_priceVolumeTierId}/events`, params, options) as unknown as ListResponse<Event>
	}


	isPriceVolumeTier(resource: any): resource is PriceVolumeTier {
		return resource.type && (resource.type === PriceVolumeTiers.TYPE)
	}


	relationship(id: string | ResourceId | null): PriceVolumeTierRel {
		return super.relationshipOneToOne<PriceVolumeTierRel>(id)
	}

	relationshipToMany(...ids: string[]): PriceVolumeTierRel[] {
		return super.relationshipOneToMany<PriceVolumeTierRel>(...ids)
	}


	type(): PriceVolumeTierType {
		return PriceVolumeTiers.TYPE
	}

}


export default PriceVolumeTiers

export type { PriceVolumeTier, PriceVolumeTierCreate, PriceVolumeTierUpdate, PriceVolumeTierType }

/*
export const PriceVolumeTiersClient = (init: ResourceAdapter | ResourcesInitConfig): PriceVolumeTiers => {
	return new PriceVolumeTiers((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
