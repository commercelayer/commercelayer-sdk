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

	/** 
	 * The name of the line item option. When blank, it gets populated with the name of the associated SKU option.
	 * @example ```"Embossing"```
	 */
	name?: string | null
	/** 
	 * The line item option's quantity.
	 * @example ```2```
	 */
	quantity: number
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard, automatically inherited from the order's market.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * The unit amount of the line item option, in cents. When you add a line item option to an order, this is automatically populated from associated SKU option's price. Cannot be passed by sales channels.
	 * @example ```990```
	 */
	unit_amount_cents?: number | null
	/** 
	 * The unit amount of the line item option, float. This can be useful to track the purchase on thrid party systems, e.g Google Analyitcs Enhanced Ecommerce.
	 * @example ```9.9```
	 */
	unit_amount_float?: number | null
	/** 
	 * The unit amount of the line item option, formatted. This can be useful to display the amount with currency in you views.
	 * @example ```"€9,90"```
	 */
	formatted_unit_amount?: string | null
	/** 
	 * The unit amount x quantity, in cents.
	 * @example ```1880```
	 */
	total_amount_cents?: number | null
	/** 
	 * The unit amount x quantity, float. This can be useful to track the purchase on thrid party systems, e.g Google Analyitcs Enhanced Ecommerce.
	 * @example ```18.8```
	 */
	total_amount_float: number
	/** 
	 * The unit amount x quantity, formatted. This can be useful to display the amount with currency in you views.
	 * @example ```"€18,80"```
	 */
	formatted_total_amount?: string | null
	/** 
	 * The shipping delay that the customer can expect when adding this option (hours). Inherited from the associated SKU option.
	 * @example ```48```
	 */
	delay_hours?: number | null
	/** 
	 * The shipping delay that the customer can expect when adding this option (days, rounded).
	 * @example ```2```
	 */
	delay_days?: number | null
	/** 
	 * Set of key-value pairs that represent the selected options.
	 * @example ```{"embossing_text":"Happy Birthday!"}```
	 */
	options: Record<string, any>

	line_item?: LineItem | null
	sku_option?: SkuOption | null
	events?: Event[] | null
	tags?: Tag[] | null

}


interface LineItemOptionCreate extends ResourceCreate {
	
	/** 
	 * The name of the line item option. When blank, it gets populated with the name of the associated SKU option.
	 * @example ```"Embossing"```
	 */
	name?: string | null
	/** 
	 * The line item option's quantity.
	 * @example ```2```
	 */
	quantity: number
	/** 
	 * The unit amount of the line item option, in cents. When you add a line item option to an order, this is automatically populated from associated SKU option's price. Cannot be passed by sales channels.
	 * @example ```990```
	 */
	unit_amount_cents?: number | null
	/** 
	 * Set of key-value pairs that represent the selected options.
	 * @example ```{"embossing_text":"Happy Birthday!"}```
	 */
	options: Record<string, any>

	line_item: LineItemRel
	sku_option: SkuOptionRel
	tags?: TagRel[] | null

}


interface LineItemOptionUpdate extends ResourceUpdate {
	
	/** 
	 * The name of the line item option. When blank, it gets populated with the name of the associated SKU option.
	 * @example ```"Embossing"```
	 */
	name?: string | null
	/** 
	 * The line item option's quantity.
	 * @example ```2```
	 */
	quantity?: number | null
	/** 
	 * The unit amount of the line item option, in cents. When you add a line item option to an order, this is automatically populated from associated SKU option's price. Cannot be passed by sales channels.
	 * @example ```990```
	 */
	unit_amount_cents?: number | null
	/** 
	 * Set of key-value pairs that represent the selected options.
	 * @example ```{"embossing_text":"Happy Birthday!"}```
	 */
	options?: Record<string, any> | null
	/** 
	 * Comma separated list of tags to be added. Duplicates, invalid and non existing ones are discarded. Cannot be passed by sales channels.
	 */
	_add_tags?: string | null
	/** 
	 * Comma separated list of tags to be removed. Duplicates, invalid and non existing ones are discarded. Cannot be passed by sales channels.
	 */
	_remove_tags?: string | null

	sku_option?: SkuOptionRel | null
	tags?: TagRel[] | null

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

	async _add_tags(id: string | LineItemOption, triggerValue: string, params?: QueryParamsRetrieve<LineItemOption>, options?: ResourcesConfig): Promise<LineItemOption> {
		return this.resources.update<LineItemOptionUpdate, LineItemOption>({ id: (typeof id === 'string')? id: id.id, type: LineItemOptions.TYPE, _add_tags: triggerValue }, params, options)
	}

	async _remove_tags(id: string | LineItemOption, triggerValue: string, params?: QueryParamsRetrieve<LineItemOption>, options?: ResourcesConfig): Promise<LineItemOption> {
		return this.resources.update<LineItemOptionUpdate, LineItemOption>({ id: (typeof id === 'string')? id: id.id, type: LineItemOptions.TYPE, _remove_tags: triggerValue }, params, options)
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


const instance = new LineItemOptions()
export default instance

export type { LineItemOptions, LineItemOption, LineItemOptionCreate, LineItemOptionUpdate, LineItemOptionType }
