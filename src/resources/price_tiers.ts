import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Price, PriceSortable } from './prices'
import type { Attachment, AttachmentSortable } from './attachments'
import type { Version, VersionSortable } from './versions'


type PriceTierType = 'price_tiers'
type PriceTierRel = ResourceRel & { type: PriceTierType }


export type PriceTierSortable = Pick<PriceTier, 'id' | 'name' | 'up_to' | 'price_amount_cents'> & ResourceSortable
export type PriceTierFilterable = Pick<PriceTier, 'id' | 'name' | 'up_to' | 'price_amount_cents'> & ResourceFilterable


interface PriceTier extends Resource {
	
	readonly type: PriceTierType

	name: string
	up_to?: number | null
	price_amount_cents: number
	price_amount_float?: number | null
	formatted_price_amount?: string | null

	price?: Price | null
	attachments?: Attachment[] | null
	versions?: Version[] | null

}


class PriceTiers extends ApiResource<PriceTier, PriceTierSortable> {

	static readonly TYPE: PriceTierType = 'price_tiers' as const

	async price(priceTierId: string | PriceTier, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Price> {
		const _priceTierId = (priceTierId as PriceTier).id || priceTierId as string
		return this.resources.fetch<Price, PriceSortable>({ type: 'prices' }, `price_tiers/${_priceTierId}/price`, params, options) as unknown as Price
	}

	async attachments(priceTierId: string | PriceTier, params?: QueryParamsList<AttachmentSortable>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _priceTierId = (priceTierId as PriceTier).id || priceTierId as string
		return this.resources.fetch<Attachment, AttachmentSortable>({ type: 'attachments' }, `price_tiers/${_priceTierId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(priceTierId: string | PriceTier, params?: QueryParamsList<VersionSortable>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _priceTierId = (priceTierId as PriceTier).id || priceTierId as string
		return this.resources.fetch<Version, VersionSortable>({ type: 'versions' }, `price_tiers/${_priceTierId}/versions`, params, options) as unknown as ListResponse<Version>
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


export default PriceTiers

export type { PriceTier, PriceTierType }

/*
export const PriceTiersClient = (init: ResourceAdapter | ResourcesInitConfig): PriceTiers => {
	return new PriceTiers((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
