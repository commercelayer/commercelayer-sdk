import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { LineItem, LineItemType, LineItemSortable } from './line_items'
import type { SkuOption, SkuOptionType, SkuOptionSortable } from './sku_options'
import type { Event, EventSortable } from './events'
import type { Tag, TagType, TagSortable } from './tags'


type LineItemOptionType = 'line_item_options'
type LineItemOptionRel = ResourceRel & { type: LineItemOptionType }
type LineItemRel = ResourceRel & { type: LineItemType }
type SkuOptionRel = ResourceRel & { type: SkuOptionType }
type TagRel = ResourceRel & { type: TagType }


export type LineItemOptionSortable = Pick<LineItemOption, 'id' | 'name' | 'quantity' | 'currency_code' | 'unit_amount_cents' | 'delay_hours'> & ResourceSortable
export type LineItemOptionFilterable = Pick<LineItemOption, 'id' | 'name' | 'quantity' | 'currency_code' | 'unit_amount_cents' | 'delay_hours' | 'delay_days'> & ResourceFilterable


interface LineItemOption extends Resource {
	
	readonly type: LineItemOptionType

	name?: string | null
	quantity: number
	currency_code?: string | null
	unit_amount_cents?: number | null
	unit_amount_float?: number | null
	formatted_unit_amount?: string | null
	total_amount_cents?: number | null
	total_amount_float: number
	formatted_total_amount?: string | null
	delay_hours?: number | null
	delay_days?: number | null
	options: Record<string, any>

	line_item?: LineItem | null
	sku_option?: SkuOption | null
	events?: Event[] | null
	tags?: Tag[] | null

}


interface LineItemOptionCreate extends ResourceCreate {
	
	name?: string | null
	quantity: number
	options: Record<string, any>

	line_item: LineItemRel
	sku_option: SkuOptionRel
	tags?: TagRel[] | null

}


interface LineItemOptionUpdate extends ResourceUpdate {
	
	name?: string | null
	quantity?: number | null
	options?: Record<string, any> | null

	sku_option?: SkuOptionRel | null
	tags?: TagRel[] | null

}


class LineItemOptions extends ApiResource<LineItemOption, LineItemOptionSortable> {

	static readonly TYPE: LineItemOptionType = 'line_item_options' as const

	async create(resource: LineItemOptionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItemOption> {
		return this.resources.create<LineItemOptionCreate, LineItemOption>({ ...resource, type: LineItemOptions.TYPE }, params, options)
	}

	async update(resource: LineItemOptionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItemOption> {
		return this.resources.update<LineItemOptionUpdate, LineItemOption>({ ...resource, type: LineItemOptions.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: LineItemOptions.TYPE } : id, options)
	}

	async line_item(lineItemOptionId: string | LineItemOption, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
		const _lineItemOptionId = (lineItemOptionId as LineItemOption).id || lineItemOptionId as string
		return this.resources.fetch<LineItem, LineItemSortable>({ type: 'line_items' }, `line_item_options/${_lineItemOptionId}/line_item`, params, options) as unknown as LineItem
	}

	async sku_option(lineItemOptionId: string | LineItemOption, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuOption> {
		const _lineItemOptionId = (lineItemOptionId as LineItemOption).id || lineItemOptionId as string
		return this.resources.fetch<SkuOption, SkuOptionSortable>({ type: 'sku_options' }, `line_item_options/${_lineItemOptionId}/sku_option`, params, options) as unknown as SkuOption
	}

	async events(lineItemOptionId: string | LineItemOption, params?: QueryParamsList<EventSortable>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _lineItemOptionId = (lineItemOptionId as LineItemOption).id || lineItemOptionId as string
		return this.resources.fetch<Event, EventSortable>({ type: 'events' }, `line_item_options/${_lineItemOptionId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(lineItemOptionId: string | LineItemOption, params?: QueryParamsList<TagSortable>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _lineItemOptionId = (lineItemOptionId as LineItemOption).id || lineItemOptionId as string
		return this.resources.fetch<Tag, TagSortable>({ type: 'tags' }, `line_item_options/${_lineItemOptionId}/tags`, params, options) as unknown as ListResponse<Tag>
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

/*
export const LineItemOptionsClient = (init: ResourceAdapter | ResourcesInitConfig): LineItemOptions => {
	return new LineItemOptions((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
