import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { Price } from './prices'
import { Attachment } from './attachments'


type PriceVolumeTierRel = ResourceRel & { type: typeof PriceVolumeTiers.TYPE }
type PriceRel = ResourceRel & { type: 'prices' }


interface PriceVolumeTier extends Resource {
	
	name?: string
	up_to?: number
	price_amount_cents?: number
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
	
	name?: string
	up_to?: number
	price_amount_cents?: number

	price?: PriceRel

}


class PriceVolumeTiers extends ApiResource {

	static readonly TYPE: 'price_volume_tiers' = 'price_volume_tiers'
	// static readonly PATH = 'price_volume_tiers'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<PriceVolumeTier>> {
		return this.resources.list({ type: PriceVolumeTiers.TYPE }, params, options)
	}

	async create(resource: PriceVolumeTierCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceVolumeTier> {
		return this.resources.create({ ...resource, type: PriceVolumeTiers.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceVolumeTier> {
		return this.resources.retrieve<PriceVolumeTier>({ type: PriceVolumeTiers.TYPE, id }, params, options)
	}

	async update(resource: PriceVolumeTierUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<PriceVolumeTier> {
		return this.resources.update({ ...resource, type: PriceVolumeTiers.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: PriceVolumeTiers.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPriceVolumeTier(resource: any): resource is PriceVolumeTier {
		return resource.type && (resource.type === PriceVolumeTiers.TYPE)
	}


	relationship(id: string | ResourceId | null): PriceVolumeTierRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: PriceVolumeTiers.TYPE } : { id: id.id, type: PriceVolumeTiers.TYPE }
	}


	type(): string {
		return PriceVolumeTiers.TYPE
	}

}


export default PriceVolumeTiers

export { PriceVolumeTier, PriceVolumeTierCreate, PriceVolumeTierUpdate }
