import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Price, PriceType } from './prices'
import type { Attachment } from './attachments'
import type { Version } from './versions'
import type { Event } from './events'


type PriceFrequencyTierType = 'price_frequency_tiers'
type PriceFrequencyTierRel = ResourceRel & { type: PriceFrequencyTierType }
type PriceRel = ResourceRel & { type: PriceType }


export type PriceFrequencyTierSort = Pick<PriceFrequencyTier, 'id' | 'name' | 'up_to' | 'price_amount_cents'> & ResourceSort
// export type PriceFrequencyTierFilter = Pick<PriceFrequencyTier, 'id' | 'name' | 'up_to' | 'price_amount_cents'> & ResourceFilter


interface PriceFrequencyTier extends Resource {
	
	readonly type: PriceFrequencyTierType

	/** 
	 * The price tier's name.
	 * @example ```"six pack"```
	 */
	name: string
	/** 
	 * The tier upper limit, expressed as the line item frequency in days (or frequency label, ie 'monthly'). When 'null' it means infinity (useful to have an always matching tier).
	 * @example ```7```
	 */
	up_to?: number | null
	/** 
	 * The price of this price tier, in cents.
	 * @example ```1000```
	 */
	price_amount_cents: number
	/** 
	 * The price of this price tier, float.
	 * @example ```10```
	 */
	price_amount_float?: number | null
	/** 
	 * The price of this price tier, formatted.
	 * @example ```"€10,00"```
	 */
	formatted_price_amount?: string | null

	price?: Price | null
	attachments?: Attachment[] | null
	versions?: Version[] | null
	events?: Event[] | null

}


interface PriceFrequencyTierCreate extends ResourceCreate {
	
	/** 
	 * The price tier's name.
	 * @example ```"six pack"```
	 */
	name: string
	/** 
	 * The tier upper limit, expressed as the line item frequency in days (or frequency label, ie 'monthly'). When 'null' it means infinity (useful to have an always matching tier).
	 * @example ```7```
	 */
	up_to?: number | null
	/** 
	 * The price of this price tier, in cents.
	 * @example ```1000```
	 */
	price_amount_cents: number

	price: PriceRel

}


interface PriceFrequencyTierUpdate extends ResourceUpdate {
	
	/** 
	 * The price tier's name.
	 * @example ```"six pack"```
	 */
	name?: string | null
	/** 
	 * The tier upper limit, expressed as the line item frequency in days (or frequency label, ie 'monthly'). When 'null' it means infinity (useful to have an always matching tier).
	 * @example ```7```
	 */
	up_to?: number | null
	/** 
	 * The price of this price tier, in cents.
	 * @example ```1000```
	 */
	price_amount_cents?: number | null

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

	async price(priceFrequencyTierId: string | PriceFrequencyTier, params?: QueryParamsRetrieve<Price>, options?: ResourcesConfig): Promise<Price> {
		const _priceFrequencyTierId = (priceFrequencyTierId as PriceFrequencyTier).id || priceFrequencyTierId as string
		return this.resources.fetch<Price>({ type: 'prices' }, `price_frequency_tiers/${_priceFrequencyTierId}/price`, params, options) as unknown as Price
	}

	async attachments(priceFrequencyTierId: string | PriceFrequencyTier, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _priceFrequencyTierId = (priceFrequencyTierId as PriceFrequencyTier).id || priceFrequencyTierId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `price_frequency_tiers/${_priceFrequencyTierId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(priceFrequencyTierId: string | PriceFrequencyTier, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _priceFrequencyTierId = (priceFrequencyTierId as PriceFrequencyTier).id || priceFrequencyTierId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `price_frequency_tiers/${_priceFrequencyTierId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async events(priceFrequencyTierId: string | PriceFrequencyTier, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _priceFrequencyTierId = (priceFrequencyTierId as PriceFrequencyTier).id || priceFrequencyTierId as string
		return this.resources.fetch<Event>({ type: 'events' }, `price_frequency_tiers/${_priceFrequencyTierId}/events`, params, options) as unknown as ListResponse<Event>
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


const instance = new PriceFrequencyTiers()
export default instance

export type { PriceFrequencyTiers, PriceFrequencyTier, PriceFrequencyTierCreate, PriceFrequencyTierUpdate, PriceFrequencyTierType }
