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
	currency_code?: string
	description?: string
	price_amount_cents?: number
	price_amount_float?: number
	formatted_price_amount?: string
	delay_hours?: number
	delay_days?: number
	sku_code_regex?: string

	market?: Market
	attachments?: Attachment[]

}


interface SkuOptionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string
	description?: string
	price_amount_cents?: number
	delay_hours?: number
	sku_code_regex?: string

	market?: MarketRel

}


interface SkuOptionUpdate extends ResourceUpdate {
	
	name: string
	currency_code?: string
	description?: string
	price_amount_cents?: number
	delay_hours?: number
	sku_code_regex?: string

	market?: MarketRel

}


class SkuOptions extends ApiResource<SkuOption> {

	static readonly TYPE: SkuOptionType = 'sku_options' as const
	// static readonly PATH = 'sku_options'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SkuOption>> {
		return this.resources.list<SkuOption>({ type: SkuOptions.TYPE }, params, options)
	}

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
