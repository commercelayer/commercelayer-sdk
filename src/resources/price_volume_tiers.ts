import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Price, PriceType } from './prices'
import type { Attachment } from './attachments'
import type { Version } from './versions'
import type { Event } from './events'


type PriceVolumeTierType = 'price_volume_tiers'
type PriceVolumeTierRel = ResourceRel & { type: PriceVolumeTierType }
type PriceRel = ResourceRel & { type: PriceType }


export type PriceVolumeTierSort = Pick<PriceVolumeTier, 'id' | 'name' | 'up_to' | 'price_amount_cents'> & ResourceSort
// export type PriceVolumeTierFilter = Pick<PriceVolumeTier, 'id' | 'name' | 'up_to' | 'price_amount_cents'> & ResourceFilter


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


class PriceVolumeTiers extends ApiResource<PriceVolumeTier> {

	static readonly TYPE: PriceVolumeTierType = 'price_volume_tiers' as const

	async create(resource: PriceVolumeTierCreate, params?: QueryParamsRetrieve<PriceVolumeTier>, options?: ResourcesConfig): Promise<PriceVolumeTier> {
		return this.resources.create<PriceVolumeTierCreate, PriceVolumeTier>({ ...resource, type: PriceVolumeTiers.TYPE }, params, options)
	}

	async update(resource: PriceVolumeTierUpdate, params?: QueryParamsRetrieve<PriceVolumeTier>, options?: ResourcesConfig): Promise<PriceVolumeTier> {
		return this.resources.update<PriceVolumeTierUpdate, PriceVolumeTier>({ ...resource, type: PriceVolumeTiers.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: PriceVolumeTiers.TYPE } : id, options)
	}

	async price(priceVolumeTierId: string | PriceVolumeTier, params?: QueryParamsRetrieve<Price>, options?: ResourcesConfig): Promise<Price> {
		const _priceVolumeTierId = (priceVolumeTierId as PriceVolumeTier).id || priceVolumeTierId as string
		return this.resources.fetch<Price>({ type: 'prices' }, `price_volume_tiers/${_priceVolumeTierId}/price`, params, options) as unknown as Price
	}

	async attachments(priceVolumeTierId: string | PriceVolumeTier, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _priceVolumeTierId = (priceVolumeTierId as PriceVolumeTier).id || priceVolumeTierId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `price_volume_tiers/${_priceVolumeTierId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(priceVolumeTierId: string | PriceVolumeTier, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _priceVolumeTierId = (priceVolumeTierId as PriceVolumeTier).id || priceVolumeTierId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `price_volume_tiers/${_priceVolumeTierId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async events(priceVolumeTierId: string | PriceVolumeTier, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _priceVolumeTierId = (priceVolumeTierId as PriceVolumeTier).id || priceVolumeTierId as string
		return this.resources.fetch<Event>({ type: 'events' }, `price_volume_tiers/${_priceVolumeTierId}/events`, params, options) as unknown as ListResponse<Event>
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
