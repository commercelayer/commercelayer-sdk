import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { LineItem, LineItemType } from './line_items'
import type { SkuOption, SkuOptionType } from './sku_options'


type LineItemOptionType = 'line_item_options'
type LineItemOptionRel = ResourceRel & { type: LineItemOptionType }
type LineItemRel = ResourceRel & { type: LineItemType }
type SkuOptionRel = ResourceRel & { type: SkuOptionType }


interface LineItemOption extends Resource {
	
	readonly type: LineItemOptionType

	name?: string
	quantity: number
	currency_code?: string
	unit_amount_cents?: number
	unit_amount_float?: number
	formatted_unit_amount?: string
	total_amount_cents?: number
	total_amount_float: number
	formatted_total_amount?: string
	delay_hours?: number
	delay_days?: number
	options: object

	line_item?: LineItem
	sku_option?: SkuOption

}


interface LineItemOptionCreate extends ResourceCreate {
	
	name?: string
	quantity: number
	options: object

	line_item: LineItemRel
	sku_option: SkuOptionRel

}


interface LineItemOptionUpdate extends ResourceUpdate {
	
	name?: string
	quantity: number
	options: object

	sku_option?: SkuOptionRel

}


class LineItemOptions extends ApiResource<LineItemOption> {

	static readonly TYPE: LineItemOptionType = 'line_item_options' as const
	// static readonly PATH = 'line_item_options'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<LineItemOption>> {
		return this.resources.list<LineItemOption>({ type: LineItemOptions.TYPE }, params, options)
	}

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
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `line_item_options/${_lineItemOptionId}/line_item`, params, options) as unknown as LineItem
	}

	async sku_option(lineItemOptionId: string | LineItemOption, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuOption> {
		const _lineItemOptionId = (lineItemOptionId as LineItemOption).id || lineItemOptionId as string
		return this.resources.fetch<SkuOption>({ type: 'sku_options' }, `line_item_options/${_lineItemOptionId}/sku_option`, params, options) as unknown as SkuOption
	}


	isLineItemOption(resource: any): resource is LineItemOption {
		return resource.type && (resource.type === LineItemOptions.TYPE)
	}


	relationship(id: string | ResourceId | null): LineItemOptionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: LineItemOptions.TYPE } : { id: id.id, type: LineItemOptions.TYPE }
	}


	type(): LineItemOptionType {
		return LineItemOptions.TYPE
	}

}


export default LineItemOptions

export type { LineItemOption, LineItemOptionCreate, LineItemOptionUpdate, LineItemOptionType }
