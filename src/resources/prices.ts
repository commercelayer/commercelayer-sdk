import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import { QueryParamsList, QueryParamsRetrieve } from '../query'

import { PriceList } from './price_lists'
import { Sku } from './skus'
import { Attachment } from './attachments'


type PriceRel = ResourceRel & { type: typeof Prices.TYPE }
type PriceListRel = ResourceRel & { type: 'price_lists' }
type SkuRel = ResourceRel & { type: 'skus' }


interface Price extends Resource {
	
	currency_code?: string
	sku_code?: string
	amount_cents?: number
	amount_float?: number
	formatted_amount?: string
	compare_at_amount_cents?: number
	compare_at_amount_float?: number
	formatted_compare_at_amount?: string

	price_list?: PriceList
	sku?: Sku
	attachments?: Attachment[]

}


interface PriceCreate extends ResourceCreate {
	
	sku_code?: string
	amount_cents: number
	compare_at_amount_cents: number

	price_list: PriceListRel
	sku?: SkuRel

}


interface PriceUpdate extends ResourceUpdate {
	
	sku_code?: string
	amount_cents?: number
	compare_at_amount_cents?: number

	price_list?: PriceListRel
	sku?: SkuRel

}


class Prices extends ApiResource {

	static readonly TYPE: 'prices' = 'prices'
	// static readonly PATH = 'prices'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Price>> {
		return this.resources.list({ type: Prices.TYPE }, params, options)
	}

	async create(resource: PriceCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Price> {
		return this.resources.create({ ...resource, type: Prices.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Price> {
		return this.resources.retrieve<Price>({ type: Prices.TYPE, id }, params, options)
	}

	async update(resource: PriceUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Price> {
		return this.resources.update({ ...resource, type: Prices.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: Prices.TYPE, id }, options)
	}
	


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isPrice(resource: any): resource is Price {
		return resource.type && (resource.type === Prices.TYPE)
	}


	relationship(id: string | ResourceId | null): PriceRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: Prices.TYPE } : { id: id.id, type: Prices.TYPE }
	}


	type(): string {
		return Prices.TYPE
	}

}


export default Prices

export { Price, PriceCreate, PriceUpdate }
