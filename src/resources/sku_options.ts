import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { Attachment } from './attachments'


type SkuOptionType = 'sku_options'
type SkuOptionRel = ResourceRel & { type: SkuOptionType }
type MarketRel = ResourceRel & { type: MarketType }


interface SkuOption extends Resource {
	
	readonly type: SkuOptionType

	name: string
	currency_code?: string | null
	description?: string | null
	price_amount_cents?: number | null
	price_amount_float?: number | null
	formatted_price_amount?: string | null
	delay_hours?: number | null
	delay_days?: number | null
	sku_code_regex?: string | null

	market?: Market | null
	attachments?: Attachment[] | null

}


interface SkuOptionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string | null
	description?: string | null
	price_amount_cents?: number | null
	delay_hours?: number | null
	sku_code_regex?: string | null

	market?: MarketRel | null

}


interface SkuOptionUpdate extends ResourceUpdate {
	
	name?: string | null
	currency_code?: string | null
	description?: string | null
	price_amount_cents?: number | null
	delay_hours?: number | null
	sku_code_regex?: string | null

	market?: MarketRel | null

}


class SkuOptions extends ApiResource<SkuOption> {

	static readonly TYPE: SkuOptionType = 'sku_options' as const

	async create(resource: SkuOptionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuOption> {
		return this.resources.create<SkuOptionCreate, SkuOption>({ ...resource, type: SkuOptions.TYPE }, params, options)
	}

	async update(resource: SkuOptionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuOption> {
		return this.resources.update<SkuOptionUpdate, SkuOption>({ ...resource, type: SkuOptions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: SkuOptions.TYPE } : id, options)
	}

	async market(skuOptionId: string | SkuOption, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _skuOptionId = (skuOptionId as SkuOption).id || skuOptionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `sku_options/${_skuOptionId}/market`, params, options) as unknown as Market
	}

	async attachments(skuOptionId: string | SkuOption, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _skuOptionId = (skuOptionId as SkuOption).id || skuOptionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `sku_options/${_skuOptionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}


	isSkuOption(resource: any): resource is SkuOption {
		return resource.type && (resource.type === SkuOptions.TYPE)
	}


	relationship(id: string | ResourceId | null): SkuOptionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: SkuOptions.TYPE } : { id: id.id, type: SkuOptions.TYPE }
	}


	type(): SkuOptionType {
		return SkuOptions.TYPE
	}

}


export default SkuOptions

export type { SkuOption, SkuOptionCreate, SkuOptionUpdate, SkuOptionType }
