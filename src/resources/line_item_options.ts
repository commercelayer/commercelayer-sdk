import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { LineItem, LineItemType } from './line_items'
import type { SkuOption, SkuOptionType } from './sku_options'
import type { Event } from './events'
import type { Tag, TagType } from './tags'


type LineItemOptionType = 'line_item_options'
type LineItemOptionRel = ResourceRel & { type: LineItemOptionType }
type LineItemRel = ResourceRel & { type: LineItemType }
type SkuOptionRel = ResourceRel & { type: SkuOptionType }
type TagRel = ResourceRel & { type: TagType }


export type LineItemOptionSort = Pick<LineItemOption, 'id' | 'name' | 'quantity' | 'currency_code' | 'unit_amount_cents' | 'delay_hours'> & ResourceSort
// export type LineItemOptionFilter = Pick<LineItemOption, 'id' | 'name' | 'quantity' | 'currency_code' | 'unit_amount_cents' | 'delay_hours' | 'delay_days'> & ResourceFilter


interface LineItemOption extends Resource {
	
	readonly type: LineItemOptionType

	name?: Nullable<string>
	quantity: number
	currency_code?: Nullable<string>
	unit_amount_cents?: Nullable<number>
	unit_amount_float?: Nullable<number>
	formatted_unit_amount?: Nullable<string>
	total_amount_cents?: Nullable<number>
	total_amount_float: number
	formatted_total_amount?: Nullable<string>
	delay_hours?: Nullable<number>
	delay_days?: Nullable<number>
	options: Record<string, any>

	line_item?: Nullable<LineItem>
	sku_option?: Nullable<SkuOption>
	events?: Nullable<Event[]>
	tags?: Nullable<Tag[]>

}


interface LineItemOptionCreate extends ResourceCreate {
	
	name?: Nullable<string>
	quantity: number
	options: Record<string, any>

	line_item: LineItemRel
	sku_option: SkuOptionRel
	tags?: Nullable<TagRel[]>

}


interface LineItemOptionUpdate extends ResourceUpdate {
	
	name?: Nullable<string>
	quantity?: Nullable<number>
	options?: Nullable<Record<string, any>>

	sku_option?: Nullable<SkuOptionRel>
	tags?: Nullable<TagRel[]>

}


class LineItemOptions extends ApiResource<LineItemOption> {

	static readonly TYPE: LineItemOptionType = 'line_item_options' as const

	async create(resource: LineItemOptionCreate, params?: QueryParamsRetrieve<LineItemOption>, options?: ResourcesConfig): Promise<LineItemOption> {
		return this.resources.create<LineItemOptionCreate, LineItemOption>({ ...resource, type: LineItemOptions.TYPE }, params, options)
	}

	async update(resource: LineItemOptionUpdate, params?: QueryParamsRetrieve<LineItemOption>, options?: ResourcesConfig): Promise<LineItemOption> {
		return this.resources.update<LineItemOptionUpdate, LineItemOption>({ ...resource, type: LineItemOptions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: LineItemOptions.TYPE } : id, options)
	}

	async line_item(lineItemOptionId: string | LineItemOption, params?: QueryParamsRetrieve<LineItem>, options?: ResourcesConfig): Promise<LineItem> {
		const _lineItemOptionId = (lineItemOptionId as LineItemOption).id || lineItemOptionId as string
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `line_item_options/${_lineItemOptionId}/line_item`, params, options) as unknown as LineItem
	}

	async sku_option(lineItemOptionId: string | LineItemOption, params?: QueryParamsRetrieve<SkuOption>, options?: ResourcesConfig): Promise<SkuOption> {
		const _lineItemOptionId = (lineItemOptionId as LineItemOption).id || lineItemOptionId as string
		return this.resources.fetch<SkuOption>({ type: 'sku_options' }, `line_item_options/${_lineItemOptionId}/sku_option`, params, options) as unknown as SkuOption
	}

	async events(lineItemOptionId: string | LineItemOption, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _lineItemOptionId = (lineItemOptionId as LineItemOption).id || lineItemOptionId as string
		return this.resources.fetch<Event>({ type: 'events' }, `line_item_options/${_lineItemOptionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(lineItemOptionId: string | LineItemOption, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _lineItemOptionId = (lineItemOptionId as LineItemOption).id || lineItemOptionId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `line_item_options/${_lineItemOptionId}/tags`, params, options) as unknown as ListResponse<Tag>
	}


	isLineItemOption(resource: any): resource is LineItemOption {
		return resource.type && (resource.type === LineItemOptions.TYPE)
	}


	relationship(id: string | ResourceId | null): LineItemOptionRel {
		return super.relationshipOneToOne<LineItemOptionRel>(id)
	}

	relationshipToMany(...ids: string[]): LineItemOptionRel[] {
		return super.relationshipOneToMany<LineItemOptionRel>(...ids)
	}


	type(): LineItemOptionType {
		return LineItemOptions.TYPE
	}

}


export default LineItemOptions

export type { LineItemOption, LineItemOptionCreate, LineItemOptionUpdate, LineItemOptionType }
