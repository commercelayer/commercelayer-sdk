import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Price, PriceType } from './prices'
import type { Attachment } from './attachments'


type PriceVolumeTierType = 'price_volume_tiers'
type PriceVolumeTierRel = ResourceRel & { type: PriceVolumeTierType }
type PriceRel = ResourceRel & { type: PriceType }


interface PriceVolumeTier extends Resource {
	
	readonly type: PriceVolumeTierType

	name: string
	up_to?: number
	price_amount_cents: number
	price_amount_float?: number
	formatted_price_amount?: string

	price?: Price
	attachments?: Attachment[]

}


interface PriceVolumeTierCreate extends ResourceCreate {
	
	name: string
	up_to?: number
	price_amount_cents: number

	price: PriceRel

}


interface PriceVolumeTierUpdate extends ResourceUpdate {
	
	name: string
	up_to?: number
	price_amount_cents: number

	price?: PriceRel

}


class PriceVolumeTiers extends ApiResource<PriceVolumeTier> {

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
		return this.resources.fetch<Price>({ type: 'prices' }, `price_volume_tiers/${_priceVolumeTierId}/price`, params, options) as unknown as Price
	}

	async attachments(priceVolumeTierId: string | PriceVolumeTier, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _priceVolumeTierId = (priceVolumeTierId as PriceVolumeTier).id || priceVolumeTierId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `price_volume_tiers/${_priceVolumeTierId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isPriceVolumeTier(resource: any): resource is PriceVolumeTier {
		return resource.type && (resource.type === PriceVolumeTiers.TYPE)
	}


	relationship(id: string | ResourceId | null): PriceVolumeTierRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: PriceVolumeTiers.TYPE } : { id: id.id, type: PriceVolumeTiers.TYPE }
	}


	type(): PriceVolumeTierType {
		return PriceVolumeTiers.TYPE
	}

}


export default PriceVolumeTiers

export type { PriceVolumeTier, PriceVolumeTierCreate, PriceVolumeTierUpdate, PriceVolumeTierType }
