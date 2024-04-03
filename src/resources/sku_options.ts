import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Market, MarketType } from './markets'
import type { Attachment } from './attachments'
import type { Event } from './events'
import type { Tag, TagType } from './tags'
import type { Version } from './versions'


type SkuOptionType = 'sku_options'
type SkuOptionRel = ResourceRel & { type: SkuOptionType }
type MarketRel = ResourceRel & { type: MarketType }
type TagRel = ResourceRel & { type: TagType }


export type SkuOptionSort = Pick<SkuOption, 'id' | 'name' | 'currency_code' | 'price_amount_cents' | 'delay_hours' | 'delay_days'> & ResourceSort
// export type SkuOptionFilter = Pick<SkuOption, 'id' | 'name' | 'currency_code' | 'description' | 'price_amount_cents' | 'delay_hours' | 'delay_days'> & ResourceFilter


interface SkuOption extends Resource {
	
	readonly type: SkuOptionType

	name: string
	currency_code?: Nullable<string>
	description?: Nullable<string>
	price_amount_cents?: Nullable<number>
	price_amount_float?: Nullable<number>
	formatted_price_amount?: Nullable<string>
	delay_hours?: Nullable<number>
	delay_days?: Nullable<number>
	sku_code_regex?: Nullable<string>

	market?: Nullable<Market>
	attachments?: Nullable<Attachment[]>
	events?: Nullable<Event[]>
	tags?: Nullable<Tag[]>
	versions?: Nullable<Version[]>

}


interface SkuOptionCreate extends ResourceCreate {
	
	name: string
	currency_code?: Nullable<string>
	description?: Nullable<string>
	price_amount_cents?: Nullable<number>
	delay_hours?: Nullable<number>
	sku_code_regex?: Nullable<string>

	market?: Nullable<MarketRel>
	tags?: Nullable<TagRel[]>

}


interface SkuOptionUpdate extends ResourceUpdate {
	
	name?: Nullable<string>
	currency_code?: Nullable<string>
	description?: Nullable<string>
	price_amount_cents?: Nullable<number>
	delay_hours?: Nullable<number>
	sku_code_regex?: Nullable<string>

	market?: Nullable<MarketRel>
	tags?: Nullable<TagRel[]>

}


class SkuOptions extends ApiResource<SkuOption> {

	static readonly TYPE: SkuOptionType = 'sku_options' as const

	async create(resource: SkuOptionCreate, params?: QueryParamsRetrieve<SkuOption>, options?: ResourcesConfig): Promise<SkuOption> {
		return this.resources.create<SkuOptionCreate, SkuOption>({ ...resource, type: SkuOptions.TYPE }, params, options)
	}

	async update(resource: SkuOptionUpdate, params?: QueryParamsRetrieve<SkuOption>, options?: ResourcesConfig): Promise<SkuOption> {
		return this.resources.update<SkuOptionUpdate, SkuOption>({ ...resource, type: SkuOptions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: SkuOptions.TYPE } : id, options)
	}

	async market(skuOptionId: string | SkuOption, params?: QueryParamsRetrieve<Market>, options?: ResourcesConfig): Promise<Market> {
		const _skuOptionId = (skuOptionId as SkuOption).id || skuOptionId as string
		return this.resources.fetch<Market>({ type: 'markets' }, `sku_options/${_skuOptionId}/market`, params, options) as unknown as Market
	}

	async attachments(skuOptionId: string | SkuOption, params?: QueryParamsList<Attachment>, options?: ResourcesConfig): Promise<ListResponse<Attachment>> {
		const _skuOptionId = (skuOptionId as SkuOption).id || skuOptionId as string
		return this.resources.fetch<Attachment>({ type: 'attachments' }, `sku_options/${_skuOptionId}/attachments`, params, options) as unknown as ListResponse<Attachment>
	}

	async events(skuOptionId: string | SkuOption, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _skuOptionId = (skuOptionId as SkuOption).id || skuOptionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `sku_options/${_skuOptionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(skuOptionId: string | SkuOption, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _skuOptionId = (skuOptionId as SkuOption).id || skuOptionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `sku_options/${_skuOptionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async versions(skuOptionId: string | SkuOption, params?: QueryParamsList<Version>, options?: ResourcesConfig): Promise<ListResponse<Version>> {
		const _skuOptionId = (skuOptionId as SkuOption).id || skuOptionId as string
		return this.resources.fetch<Version>({ type: 'versions' }, `sku_options/${_skuOptionId}/versions`, params, options) as unknown as ListResponse<Version>
	}


	isSkuOption(resource: any): resource is SkuOption {
		return resource.type && (resource.type === SkuOptions.TYPE)
	}


	relationship(id: string | ResourceId | null): SkuOptionRel {
		return super.relationshipOneToOne<SkuOptionRel>(id)
	}

	relationshipToMany(...ids: string[]): SkuOptionRel[] {
		return super.relationshipOneToMany<SkuOptionRel>(...ids)
	}


	type(): SkuOptionType {
		return SkuOptions.TYPE
	}

}


export default SkuOptions

export type { SkuOption, SkuOptionCreate, SkuOptionUpdate, SkuOptionType }
