import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Market } from './markets'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag } from './tags'
import type { Version } from './versions'


type SkuOptionRel = ResourceRel & { type: typeof SkuOptions.TYPE }
type MarketRel = ResourceRel & { type: 'markets' }
type TagRel = ResourceRel & { type: 'tags' }


interface SkuOption extends Resource {
	
	name?: string
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
	events?: Event[]
	tags?: Tag[]
	versions?: Version[]

}


interface SkuOptionCreate extends ResourceCreate {
	
	name: string
	currency_code?: string
	description?: string
	price_amount_cents?: number
	delay_hours?: number
	sku_code_regex?: string

	market?: MarketRel
	tags?: TagRel[]

}


interface SkuOptionUpdate extends ResourceUpdate {
	
	name?: string
	currency_code?: string
	description?: string
	price_amount_cents?: number
	delay_hours?: number
	sku_code_regex?: string

	market?: MarketRel
	tags?: TagRel[]

}


class SkuOptions extends ApiResource {

	static readonly TYPE: 'sku_options' = 'sku_options' as const
	// static readonly PATH = 'sku_options'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<SkuOption>> {
		return this.resources.list<SkuOption>({ type: SkuOptions.TYPE }, params, options)
	}

	async create(resource: SkuOptionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuOption> {
		return this.resources.create<SkuOptionCreate, SkuOption>({ ...resource, type: SkuOptions.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuOption> {
		return this.resources.retrieve<SkuOption>({ type: SkuOptions.TYPE, id }, params, options)
	}

	async update(resource: SkuOptionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuOption> {
		return this.resources.update<SkuOptionUpdate, SkuOption>({ ...resource, type: SkuOptions.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: SkuOptions.TYPE, id }, options)
	}

	async market(skuOptionId: string | SkuOption, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Market> {
		const _skuOptionId = (skuOptionId as SkuOption).id || skuOptionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `sku_options/${_skuOptionId}/market`, params, options) as unknown as Market
	}

	async attachments(skuOptionId: string | SkuOption, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _skuOptionId = (skuOptionId as SkuOption).id || skuOptionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `sku_options/${_skuOptionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(skuOptionId: string | SkuOption, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _skuOptionId = (skuOptionId as SkuOption).id || skuOptionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `sku_options/${_skuOptionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(skuOptionId: string | SkuOption, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _skuOptionId = (skuOptionId as SkuOption).id || skuOptionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `sku_options/${_skuOptionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(skuOptionId: string | SkuOption, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _skuOptionId = (skuOptionId as SkuOption).id || skuOptionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `sku_options/${_skuOptionId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isSkuOption(resource: any): resource is SkuOption {
		return resource.type && (resource.type === SkuOptions.TYPE)
	}


	relationship(id: string | ResourceId | null): SkuOptionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: SkuOptions.TYPE } : { id: id.id, type: SkuOptions.TYPE }
	}


	type(): string {
		return SkuOptions.TYPE
	}

}


export default SkuOptions

export { SkuOption, SkuOptionCreate, SkuOptionUpdate }
