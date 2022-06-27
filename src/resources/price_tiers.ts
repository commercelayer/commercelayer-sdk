import { ApiResource, Resource, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Price } from './prices'
import type { Attachment } from './attachments'


type PriceTierRel = ResourceRel & { type: typeof PriceTiers.TYPE }


interface PriceTier extends Resource {
	
	name?: string
	up_to?: number
	price_amount_cents?: number
	price_amount_float?: number
	formatted_price_amount?: string

	price?: Price
	attachments?: Attachment[]

}


class PriceTiers extends ApiResource {

	static readonly TYPE: 'price_tiers' = 'price_tiers'
	// static readonly PATH = 'price_tiers'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PriceTier>> {
		return this.resources.list<PriceTier>({ type: PriceTiers.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceTier> {
		return this.resources.retrieve<PriceTier>({ type: PriceTiers.TYPE, id }, params, options)
	}

	async price(priceTierId: string | PriceTier, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Price> {
		const _priceTierId = (priceTierId as PriceTier).id || priceTierId
		return this.resources.fetch<Price>({ type: 'prices' }, `price_tiers/${_priceTierId}/price`, params, options) as unknown as Price
	}

	async attachments(priceTierId: string | PriceTier, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _priceTierId = (priceTierId as PriceTier).id || priceTierId
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `price_tiers/${_priceTierId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPriceTier(resource: any): resource is PriceTier {
		return resource.type && (resource.type === PriceTiers.TYPE)
	}


	relationship(id: string | ResourceId | null): PriceTierRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: PriceTiers.TYPE } : { id: id.id, type: PriceTiers.TYPE }
	}


	type(): string {
		return PriceTiers.TYPE
	}

}


export default PriceTiers

export { PriceTier }
