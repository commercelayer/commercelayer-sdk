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

	/** 
	 * The SKU option's internal name.
	 * @example ```"Embossing"```
	 */
	name: string
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * An internal description of the SKU option.
	 * @example ```"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."```
	 */
	description?: string | null
	/** 
	 * The price of this shipping method, in cents.
	 * @example ```"1000"```
	 */
	price_amount_cents?: number | null
	/** 
	 * The price of this shipping method, float.
	 * @example ```"10"```
	 */
	price_amount_float?: number | null
	/** 
	 * The price of this shipping method, formatted.
	 * @example ```"€10,00"```
	 */
	formatted_price_amount?: string | null
	/** 
	 * The delay time (in hours) that should be added to the delivery lead time when this option is purchased.
	 * @example ```"48"```
	 */
	delay_hours?: number | null
	/** 
	 * The delay time, in days (rounded).
	 * @example ```"2"```
	 */
	delay_days?: number | null
	/** 
	 * The regex that will be evaluated to match the SKU codes.
	 * @example ```"^(A|B).*$"```
	 */
	sku_code_regex?: string | null

	market?: Market | null
	attachments?: Attachment[] | null
	events?: Event[] | null
	tags?: Tag[] | null
	versions?: Version[] | null

}


interface SkuOptionCreate extends ResourceCreate {
	
	/** 
	 * The SKU option's internal name.
	 * @example ```"Embossing"```
	 */
	name: string
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * An internal description of the SKU option.
	 * @example ```"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."```
	 */
	description?: string | null
	/** 
	 * The price of this shipping method, in cents.
	 * @example ```"1000"```
	 */
	price_amount_cents?: number | null
	/** 
	 * The delay time (in hours) that should be added to the delivery lead time when this option is purchased.
	 * @example ```"48"```
	 */
	delay_hours?: number | null
	/** 
	 * The regex that will be evaluated to match the SKU codes.
	 * @example ```"^(A|B).*$"```
	 */
	sku_code_regex?: string | null

	market?: MarketRel | null
	tags?: TagRel[] | null

}


interface SkuOptionUpdate extends ResourceUpdate {
	
	/** 
	 * The SKU option's internal name.
	 * @example ```"Embossing"```
	 */
	name?: string | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * An internal description of the SKU option.
	 * @example ```"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."```
	 */
	description?: string | null
	/** 
	 * The price of this shipping method, in cents.
	 * @example ```"1000"```
	 */
	price_amount_cents?: number | null
	/** 
	 * The delay time (in hours) that should be added to the delivery lead time when this option is purchased.
	 * @example ```"48"```
	 */
	delay_hours?: number | null
	/** 
	 * The regex that will be evaluated to match the SKU codes.
	 * @example ```"^(A|B).*$"```
	 */
	sku_code_regex?: string | null

	market?: MarketRel | null
	tags?: TagRel[] | null

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
