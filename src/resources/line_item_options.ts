import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { LineItem } from './line_items'
import type { SkuOption } from './sku_options'


type LineItemOptionRel = ResourceRel & { type: typeof LineItemOptions.TYPE }
type LineItemRel = ResourceRel & { type: 'line_items' }
type SkuOptionRel = ResourceRel & { type: 'sku_options' }


interface LineItemOption extends Resource {
	
	name?: string
	quantity?: number
	currency_code?: string
	unit_amount_cents?: number
	unit_amount_float?: number
	formatted_unit_amount?: string
	total_amount_cents?: number
	total_amount_float?: number
	formatted_total_amount?: string
	delay_hours?: number
	delay_days?: number
	options?: object

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
	quantity?: number
	options?: object

	sku_option?: SkuOptionRel

}


class LineItemOptions extends ApiResource {

	static readonly TYPE: 'line_item_options' = 'line_item_options'
	// static readonly PATH = 'line_item_options'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<LineItemOption>> {
		return this.resources.list<LineItemOption>({ type: LineItemOptions.TYPE }, params, options)
	}

	async create(resource: LineItemOptionCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItemOption> {
		return this.resources.create<LineItemOptionCreate, LineItemOption>({ ...resource, type: LineItemOptions.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItemOption> {
		return this.resources.retrieve<LineItemOption>({ type: LineItemOptions.TYPE, id }, params, options)
	}

	async update(resource: LineItemOptionUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItemOption> {
		return this.resources.update<LineItemOptionUpdate, LineItemOption>({ ...resource, type: LineItemOptions.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: LineItemOptions.TYPE, id }, options)
	}

	async line_item(lineItemOptionId: string | LineItemOption, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
		const _lineItemOptionId = (lineItemOptionId as LineItemOption).id || lineItemOptionId
		return this.resources.fetch<LineItem>({ type: 'line_items' }, `line_item_options/${_lineItemOptionId}/line_item`, params, options) as unknown as LineItem
	}

	async sku_option(lineItemOptionId: string | LineItemOption, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<SkuOption> {
		const _lineItemOptionId = (lineItemOptionId as LineItemOption).id || lineItemOptionId
		return this.resources.fetch<SkuOption>({ type: 'sku_options' }, `line_item_options/${_lineItemOptionId}/sku_option`, params, options) as unknown as SkuOption
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isLineItemOption(resource: any): resource is LineItemOption {
		return resource.type && (resource.type === LineItemOptions.TYPE)
	}


	relationship(id: string | ResourceId | null): LineItemOptionRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: LineItemOptions.TYPE } : { id: id.id, type: LineItemOptions.TYPE }
	}


	type(): string {
		return LineItemOptions.TYPE
	}

}


export default LineItemOptions

export { LineItemOption, LineItemOptionCreate, LineItemOptionUpdate }
