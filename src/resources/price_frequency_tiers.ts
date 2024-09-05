import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Price, PriceType } from './prices'
import type { Version } from './versions'


type PriceFrequencyTierType = 'price_frequency_tiers'
type PriceFrequencyTierRel = ResourceRel & { type: PriceFrequencyTierType }
type PriceRel = ResourceRel & { type: PriceType }


export type PriceFrequencyTierSort = Pick<PriceFrequencyTier, 'id' | 'name' | 'price_amount_cents' | 'up_to'> & ResourceSort
// export type PriceFrequencyTierFilter = Pick<PriceFrequencyTier, 'id' | 'name' | 'price_amount_cents' | 'up_to'> & ResourceFilter


interface PriceFrequencyTier extends Resource {
	
	readonly type: PriceFrequencyTierType

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
	 * The tier upper limit, expressed as the line item frequency in days (or frequency label, ie 'monthly'). When 'null' it means infinity (useful to have an always matching tier).
	 * @example ```"7"```
	 */
	up_to?: number | null

	attachments?: Attachment[] | null
	events?: Event[] | null
	price?: Price | null
	versions?: Version[] | null

}


interface PriceFrequencyTierCreate extends ResourceCreate {
	
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
	 * The tier upper limit, expressed as the line item frequency in days (or frequency label, ie 'monthly'). When 'null' it means infinity (useful to have an always matching tier).
	 * @example ```"7"```
	 */
	up_to?: number | null

	price: PriceRel

}


interface PriceFrequencyTierUpdate extends ResourceUpdate {
	
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
	 * The tier upper limit, expressed as the line item frequency in days (or frequency label, ie 'monthly'). When 'null' it means infinity (useful to have an always matching tier).
	 * @example ```"7"```
	 */
	up_to?: number | null

	price?: PriceRel | null

}


class PriceFrequencyTiers extends ApiResource<PriceFrequencyTier> {

	static readonly TYPE: PriceFrequencyTierType = 'price_frequency_tiers' as const

	async create(resource: PriceFrequencyTierCreate, params?: QueryParamsRetrieve<PriceFrequencyTier>, options?: ResourcesConfig): Promise<PriceFrequencyTier> {
		return this.resources.create<PriceFrequencyTierCreate, PriceFrequencyTier>({ ...resource, type: PriceFrequencyTiers.TYPE }, params, options)
	}

	async update(resource: PriceFrequencyTierUpdate, params?: QueryParamsRetrieve<PriceFrequencyTier>, options?: ResourcesConfig): Promise<PriceFrequencyTier> {
		return this.resources.update<PriceFrequencyTierUpdate, PriceFrequencyTier>({ ...resource, type: PriceFrequencyTiers.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: PriceFrequencyTiers.TYPE } : id, options)
	}

	async attachments(priceFrequencyTierId: string | PriceFrequencyTier, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _priceFrequencyTierId = (priceFrequencyTierId as PriceFrequencyTier).id || priceFrequencyTierId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `price_frequency_tiers/${_priceFrequencyTierId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(priceFrequencyTierId: string | PriceFrequencyTier, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _priceFrequencyTierId = (priceFrequencyTierId as PriceFrequencyTier).id || priceFrequencyTierId as string
		return this.resources.fetch<Event>({ type: 'events' }, `price_frequency_tiers/${_priceFrequencyTierId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async price(priceFrequencyTierId: string | PriceFrequencyTier, params?: QueryParamsRetrieve<Price>, options?: ResourcesConfig): Promise<Price> {
		const _priceFrequencyTierId = (priceFrequencyTierId as PriceFrequencyTier).id || priceFrequencyTierId as string
		return this.resources.fetch<Price>({ type: 'prices' }, `price_frequency_tiers/${_priceFrequencyTierId}/price`, params, options) as unknown as Price
	}

	async versions(priceFrequencyTierId: string | PriceFrequencyTier, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _priceFrequencyTierId = (priceFrequencyTierId as PriceFrequencyTier).id || priceFrequencyTierId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `price_frequency_tiers/${_priceFrequencyTierId}/versions`, params, options) as unknown as ListResponse<Version>
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
