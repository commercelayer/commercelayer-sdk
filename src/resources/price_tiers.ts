import { ApiResource } from '../resource'
import type { Resource, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Price } from './prices'
import type { Attachment } from './attachments'
import type { Version } from './versions'


type PriceTierType = 'price_tiers'
type PriceTierRel = ResourceRel & { type: PriceTierType }


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


class PriceTiers extends ApiResource<PriceTier> {

	static readonly TYPE: PriceTierType = 'price_tiers' as const

	async price(priceTierId: string | PriceTier, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Price> {
		const _priceTierId = (priceTierId as PriceTier).id || priceTierId as string
		return this.resources.fetch<Price>({ type: 'prices' }, `price_tiers/${_priceTierId}/price`, params, options) as unknown as Price
	}

	async attachments(priceTierId: string | PriceTier, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _priceTierId = (priceTierId as PriceTier).id || priceTierId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `price_tiers/${_priceTierId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async versions(priceTierId: string | PriceTier, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _priceTierId = (priceTierId as PriceTier).id || priceTierId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `price_tiers/${_priceTierId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isPriceTier(resource: any): resource is PriceTier {
		return resource.type && (resource.type === PriceTiers.TYPE)
	}


	relationship(id: string | ResourceId | null): PriceTierRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: PriceTiers.TYPE } : { id: id.id, type: PriceTiers.TYPE }
	}


	type(): PriceTierType {
		return PriceTiers.TYPE
	}


	parse(payload: any): PriceTier | PriceTier[] {
		return super.parse(payload)
	}

}


export default PriceTiers

export type { PriceTier, PriceTierType }
