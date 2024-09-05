import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Price, PriceType } from './prices'
import type { Version } from './versions'


type PriceVolumeTierType = 'price_volume_tiers'
type PriceVolumeTierRel = ResourceRel & { type: PriceVolumeTierType }
type PriceRel = ResourceRel & { type: PriceType }


export type PriceVolumeTierSort = Pick<PriceVolumeTier, 'id' | 'name' | 'price_amount_cents' | 'up_to'> & ResourceSort
// export type PriceVolumeTierFilter = Pick<PriceVolumeTier, 'id' | 'name' | 'price_amount_cents' | 'up_to'> & ResourceFilter


interface PriceVolumeTier extends Resource {
	
	readonly type: PriceVolumeTierType

	/** 
	 * The price of this price tier, formatted.
	 * @example ```"€10,00"```
	 */
	formatted_price_amount?: string | null
	/** 
	 * The price tier's name.
	 * @example ```"six pack"```
	 */
	name: string
	/** 
	 * The price of this price tier, in cents.
	 * @example ```"1000"```
	 */
	price_amount_cents: number
	/** 
	 * The price of this price tier, float.
	 * @example ```"10"```
	 */
	price_amount_float?: number | null
	/** 
	 * The tier upper limit, expressed as the line item quantity. When 'null' it means infinity (useful to have an always matching tier).
	 * @example ```"15"```
	 */
	up_to?: number | null

	attachments?: Attachment[] | null
	events?: Event[] | null
	price?: Price | null
	versions?: Version[] | null

}


interface PriceVolumeTierCreate extends ResourceCreate {
	
	/** 
	 * The price tier's name.
	 * @example ```"six pack"```
	 */
	name: string
	/** 
	 * The price of this price tier, in cents.
	 * @example ```"1000"```
	 */
	price_amount_cents: number
	/** 
	 * The tier upper limit, expressed as the line item quantity. When 'null' it means infinity (useful to have an always matching tier).
	 * @example ```"15"```
	 */
	up_to?: number | null

	price: PriceRel

}


interface PriceVolumeTierUpdate extends ResourceUpdate {
	
	/** 
	 * The price tier's name.
	 * @example ```"six pack"```
	 */
	name?: string | null
	/** 
	 * The price of this price tier, in cents.
	 * @example ```"1000"```
	 */
	price_amount_cents?: number | null
	/** 
	 * The tier upper limit, expressed as the line item quantity. When 'null' it means infinity (useful to have an always matching tier).
	 * @example ```"15"```
	 */
	up_to?: number | null

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

	async attachments(priceVolumeTierId: string | PriceVolumeTier, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _priceVolumeTierId = (priceVolumeTierId as PriceVolumeTier).id || priceVolumeTierId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `price_volume_tiers/${_priceVolumeTierId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(priceVolumeTierId: string | PriceVolumeTier, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _priceVolumeTierId = (priceVolumeTierId as PriceVolumeTier).id || priceVolumeTierId as string
		return this.resources.fetch<Event>({ type: 'events' }, `price_volume_tiers/${_priceVolumeTierId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async price(priceVolumeTierId: string | PriceVolumeTier, params?: QueryParamsRetrieve<Price>, options?: ResourcesConfig): Promise<Price> {
		const _priceVolumeTierId = (priceVolumeTierId as PriceVolumeTier).id || priceVolumeTierId as string
		return this.resources.fetch<Price>({ type: 'prices' }, `price_volume_tiers/${_priceVolumeTierId}/price`, params, options) as unknown as Price
	}

	async versions(priceVolumeTierId: string | PriceVolumeTier, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _priceVolumeTierId = (priceVolumeTierId as PriceVolumeTier).id || priceVolumeTierId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `price_volume_tiers/${_priceVolumeTierId}/versions`, params, options) as unknown as ListResponse<Version>
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
