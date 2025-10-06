import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Price } from './prices'
import type { Attachment } from './attachments'
import type { Version } from './versions'
import type { EventStore } from './event_stores'


type PriceTierType = 'price_tiers'
type PriceTierRel = ResourceRel & { type: PriceTierType }


export type PriceTierSort = Pick<PriceTier, 'id' | 'name' | 'up_to' | 'price_amount_cents'> & ResourceSort
// export type PriceTierFilter = Pick<PriceTier, 'id' | 'name' | 'up_to' | 'price_amount_cents'> & ResourceFilter


interface PriceTier extends Resource {
	
	readonly type: PriceTierType

	/** 
	 * The price tier's name.
	 * @example ```"six pack"```
	 */
	name: string
	/** 
	 * The tier upper limit. When 'null' it means infinity (useful to have an always matching tier).
	 * @example ```20.5```
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
	event_stores?: EventStore[] | null

}


class PriceTiers extends ApiResource<PriceTier> {

	static readonly TYPE: PriceTierType = 'price_tiers' as const

	async price(priceTierId: string | PriceTier, params?: QueryParamsRetrieve<Price>, options?: ResourcesConfig): Promise<Price> {
		const _priceTierId = (priceTierId as PriceTier).id || priceTierId as string
		return this.resources.fetch<Price>({ type: 'prices' }, `price_tiers/${_priceTierId}/price`, params, options) as unknown as Price
	}

	async attachments(priceTierId: string | PriceTier, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _priceTierId = (priceTierId as PriceTier).id || priceTierId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `price_tiers/${_priceTierId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(priceTierId: string | PriceTier, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _priceTierId = (priceTierId as PriceTier).id || priceTierId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `price_tiers/${_priceTierId}/versions`, params, options) as unknown as ListResponse<Version>
	}

	async event_stores(priceTierId: string | PriceTier, params?: QueryParamsList<EventStore>, options?: ResourcesConfig): Promise<ListResponse<EventStore>> {
		const _priceTierId = (priceTierId as PriceTier).id || priceTierId as string
		return this.resources.fetch<EventStore>({ type: 'event_stores' }, `price_tiers/${_priceTierId}/event_stores`, params, options) as unknown as ListResponse<EventStore>
	}


	isPriceTier(resource: any): resource is PriceTier {
		return resource.type && (resource.type === PriceTiers.TYPE)
	}


	relationship(id: string | ResourceId | null): PriceTierRel {
		return super.relationshipOneToOne<PriceTierRel>(id)
	}

	relationshipToMany(...ids: string[]): PriceTierRel[] {
		return super.relationshipOneToMany<PriceTierRel>(...ids)
	}


	type(): PriceTierType {
		return PriceTiers.TYPE
	}

}


const instance = new PriceTiers()
export default instance

export type { PriceTiers, PriceTier, PriceTierType }
