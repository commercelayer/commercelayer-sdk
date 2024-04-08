import type { Nullable } from '../types'
import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType } from './orders'
import type { Adjustment, AdjustmentType } from './adjustments'
import type { Bundle, BundleType } from './bundles'
import type { ExternalPromotion, ExternalPromotionType } from './external_promotions'
import type { FixedAmountPromotion, FixedAmountPromotionType } from './fixed_amount_promotions'
import type { FreeShippingPromotion, FreeShippingPromotionType } from './free_shipping_promotions'
import type { GiftCard, GiftCardType } from './gift_cards'
import type { PaymentMethod, PaymentMethodType } from './payment_methods'
import type { PercentageDiscountPromotion, PercentageDiscountPromotionType } from './percentage_discount_promotions'
import type { Shipment, ShipmentType } from './shipments'
import type { Sku, SkuType } from './skus'
import type { LineItemOption } from './line_item_options'
import type { ReturnLineItem } from './return_line_items'
import type { StockReservation } from './stock_reservations'
import type { StockLineItem } from './stock_line_items'
import type { StockTransfer } from './stock_transfers'
import type { Event } from './events'
import type { Tag, TagType } from './tags'


type LineItemType = 'line_items'
type LineItemRel = ResourceRel & { type: LineItemType }
type OrderRel = ResourceRel & { type: OrderType }
type AdjustmentRel = ResourceRel & { type: AdjustmentType }
type BundleRel = ResourceRel & { type: BundleType }
type ExternalPromotionRel = ResourceRel & { type: ExternalPromotionType }
type FixedAmountPromotionRel = ResourceRel & { type: FixedAmountPromotionType }
type FreeShippingPromotionRel = ResourceRel & { type: FreeShippingPromotionType }
type GiftCardRel = ResourceRel & { type: GiftCardType }
type PaymentMethodRel = ResourceRel & { type: PaymentMethodType }
type PercentageDiscountPromotionRel = ResourceRel & { type: PercentageDiscountPromotionType }
type ShipmentRel = ResourceRel & { type: ShipmentType }
type SkuRel = ResourceRel & { type: SkuType }
type TagRel = ResourceRel & { type: TagType }


export type LineItemSort = Pick<LineItem, 'id' | 'currency_code' | 'unit_amount_cents' | 'compare_at_amount_cents' | 'options_amount_cents' | 'discount_cents' | 'total_amount_cents' | 'tax_amount_cents' | 'name' | 'item_type' | 'coupon_code' | 'circuit_state' | 'circuit_failure_count'> & ResourceSort
// export type LineItemFilter = Pick<LineItem, 'id' | 'quantity' | 'currency_code' | 'unit_amount_cents' | 'compare_at_amount_cents' | 'options_amount_cents' | 'discount_cents' | 'total_amount_cents' | 'tax_amount_cents' | 'name' | 'image_url' | 'item_type' | 'coupon_code' | 'circuit_state' | 'circuit_failure_count'> & ResourceFilter


interface LineItem extends Resource {
	
	readonly type: LineItemType

	/** 
	 * The code of the associated SKU..
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: Nullable<string>
	/** 
	 * The code of the associated bundle..
	 * @example ```"BUNDLEMM000000FFFFFFXLXX"```
	 */
	bundle_code?: Nullable<string>
	/** 
	 * The line item quantity..
	 * @example ```"4"```
	 */
	quantity: number
	/** 
	 * When creating or updating a new line item, set this attribute to '1' if you want to inject the unit_amount_cents price from an external source. Any successive price computation will be done externally, until the attribute is reset to '0'..
	 * @example ```"true"```
	 */
	_external_price?: Nullable<boolean>
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard, automatically inherited from the order's market..
	 * @example ```"EUR"```
	 */
	currency_code?: Nullable<string>
	/** 
	 * The unit amount of the line item, in cents. Can be specified only without an item, otherwise is automatically computed by order's price list, associated price tiers or external source..
	 * @example ```"10000"```
	 */
	unit_amount_cents?: Nullable<number>
	/** 
	 * The unit amount of the line item, float. This can be useful to track the purchase on thrid party systems, e.g Google Analyitcs Enhanced Ecommerce..
	 * @example ```"100"```
	 */
	unit_amount_float?: Nullable<number>
	/** 
	 * The unit amount of the line item, formatted. This can be useful to display the amount with currency in you views..
	 * @example ```"€100,00"```
	 */
	formatted_unit_amount?: Nullable<string>
	/** 
	 * The compared price amount, in cents. Useful to display a percentage discount..
	 * @example ```"13000"```
	 */
	compare_at_amount_cents?: Nullable<number>
	/** 
	 * The compared price amount, float..
	 * @example ```"130"```
	 */
	compare_at_amount_float?: Nullable<number>
	/** 
	 * The compared price amount, formatted..
	 * @example ```"€130,00"```
	 */
	formatted_compare_at_amount?: Nullable<string>
	/** 
	 * The options amount of the line item, in cents..
	 * @example ```"1000"```
	 */
	options_amount_cents?: Nullable<number>
	/** 
	 * The options amount of the line item, float..
	 * @example ```"10"```
	 */
	options_amount_float?: Nullable<number>
	/** 
	 * The options amount of the line item, formatted..
	 * @example ```"€10,00"```
	 */
	formatted_options_amount?: Nullable<string>
	/** 
	 * The discount applied to the line item, in cents. When you apply a discount to an order, this is automatically calculated basing on the line item total_amount_cents value..
	 * @example ```"-1000"```
	 */
	discount_cents?: Nullable<number>
	/** 
	 * The discount applied to the line item, float. When you apply a discount to an order, this is automatically calculated basing on the line item total_amount_cents value..
	 * @example ```"10"```
	 */
	discount_float?: Nullable<number>
	/** 
	 * The discount applied to the line item, fromatted. When you apply a discount to an order, this is automatically calculated basing on the line item total_amount_cents value..
	 * @example ```"€10,00"```
	 */
	formatted_discount?: Nullable<string>
	/** 
	 * Calculated as unit amount x quantity + options amount, in cents..
	 * @example ```"18800"```
	 */
	total_amount_cents?: Nullable<number>
	/** 
	 * Calculated as unit amount x quantity + options amount, float. This can be useful to track the purchase on thrid party systems, e.g Google Analyitcs Enhanced Ecommerce..
	 * @example ```"188"```
	 */
	total_amount_float: number
	/** 
	 * Calculated as unit amount x quantity + options amount, formatted. This can be useful to display the amount with currency in you views..
	 * @example ```"€188,00"```
	 */
	formatted_total_amount?: Nullable<string>
	/** 
	 * The collected tax amount, otherwise calculated as total amount cents - discount cent * tax rate, in cents..
	 * @example ```"1880"```
	 */
	tax_amount_cents?: Nullable<number>
	/** 
	 * The collected tax amount, otherwise calculated as total amount cents - discount cent * tax rate, float..
	 * @example ```"18.8"```
	 */
	tax_amount_float: number
	/** 
	 * The collected tax amount, otherwise calculated as total amount cents - discount cent * tax rate, formatted..
	 * @example ```"€18,80"```
	 */
	formatted_tax_amount?: Nullable<string>
	/** 
	 * The name of the line item. When blank, it gets populated with the name of the associated item (if present)..
	 * @example ```"Black Men T-shirt with White Logo (XL)"```
	 */
	name?: Nullable<string>
	/** 
	 * The image_url of the line item. When blank, it gets populated with the image_url of the associated item (if present, SKU only)..
	 * @example ```"https://img.yourdomain.com/skus/xYZkjABcde.png"```
	 */
	image_url?: Nullable<string>
	/** 
	 * The discount breakdown for this line item (if calculated)..
	 * @example ```"[object Object]"```
	 */
	discount_breakdown?: Nullable<Record<string, any>>
	/** 
	 * The tax rate for this line item (if calculated)..
	 * @example ```"0.22"```
	 */
	tax_rate?: Nullable<number>
	/** 
	 * The tax breakdown for this line item (if calculated)..
	 * @example ```"[object Object]"```
	 */
	tax_breakdown?: Nullable<Record<string, any>>
	/** 
	 * The type of the associate item. Can be one of 'skus', 'bundles', 'shipments', 'payment_methods', 'adjustments', 'gift_cards', or a valid promotion type..
	 * @example ```"skus"```
	 */
	item_type?: Nullable<'skus' | 'bundles' | 'shipments' | 'payment_methods' | 'adjustments' | 'gift_cards' | 'percentage_discount_promotions' | 'free_shipping_promotions' | 'free_gift_promotions' | 'fixed_price_promotions' | 'external_promotions' | 'fixed_amount_promotions'>
	/** 
	 * The frequency which generates a subscription. Must be supported by existing associated subscription_model..
	 * @example ```"monthly"```
	 */
	frequency?: Nullable<string>
	/** 
	 * The coupon code, if any, used to trigger this promotion line item. null for other line item types or if the promotion line item wasn't triggered by a coupon..
	 * @example ```"SUMMERDISCOUNT"```
	 */
	coupon_code?: Nullable<string>
	/** 
	 * The circuit breaker state, by default it is 'closed'. It can become 'open' once the number of consecutive failures overlaps the specified threshold, in such case no further calls to the failing callback are made..
	 * @example ```"closed"```
	 */
	circuit_state?: Nullable<string>
	/** 
	 * The number of consecutive failures recorded by the circuit breaker associated to this resource, will be reset on first successful call to callback..
	 * @example ```"5"```
	 */
	circuit_failure_count?: Nullable<number>

	order?: Nullable<Order>
	item?: Nullable<Adjustment | Bundle | ExternalPromotion | FixedAmountPromotion | FreeShippingPromotion | GiftCard | PaymentMethod | PercentageDiscountPromotion | Shipment | Sku>
	sku?: Nullable<Sku>
	bundle?: Nullable<Bundle>
	adjustment?: Nullable<Adjustment>
	gift_card?: Nullable<GiftCard>
	shipment?: Nullable<Shipment>
	payment_method?: Nullable<PaymentMethod>
	line_item_options?: Nullable<LineItemOption[]>
	return_line_items?: Nullable<ReturnLineItem[]>
	stock_reservations?: Nullable<StockReservation[]>
	stock_line_items?: Nullable<StockLineItem[]>
	stock_transfers?: Nullable<StockTransfer[]>
	events?: Nullable<Event[]>
	tags?: Nullable<Tag[]>

}


interface LineItemCreate extends ResourceCreate {
	
	/** 
	 * The code of the associated SKU..
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: Nullable<string>
	/** 
	 * The code of the associated bundle..
	 * @example ```"BUNDLEMM000000FFFFFFXLXX"```
	 */
	bundle_code?: Nullable<string>
	/** 
	 * The line item quantity..
	 * @example ```"4"```
	 */
	quantity: number
	/** 
	 * When creating or updating a new line item, set this attribute to '1' if you want to inject the unit_amount_cents price from an external source. Any successive price computation will be done externally, until the attribute is reset to '0'..
	 * @example ```"true"```
	 */
	_external_price?: Nullable<boolean>
	/** 
	 * When creating a new line item, set this attribute to '1' if you want to update the line item quantity (if present) instead of creating a new line item for the same SKU..
	 * @example ```"true"```
	 */
	_update_quantity?: Nullable<boolean>
	/** 
	 * Send this attribute if you want to reserve the stock for the line item's SKUs quantity. Stock reservations expiration depends on the inventory model's cutoff. When used on update the existing active stock reservations are renewed..
	 * @example ```"true"```
	 */
	_reserve_stock?: Nullable<boolean>
	/** 
	 * The unit amount of the line item, in cents. Can be specified only without an item, otherwise is automatically computed by order's price list, associated price tiers or external source..
	 * @example ```"10000"```
	 */
	unit_amount_cents?: Nullable<number>
	/** 
	 * The compared price amount, in cents. Useful to display a percentage discount..
	 * @example ```"13000"```
	 */
	compare_at_amount_cents?: Nullable<number>
	/** 
	 * The name of the line item. When blank, it gets populated with the name of the associated item (if present)..
	 * @example ```"Black Men T-shirt with White Logo (XL)"```
	 */
	name?: Nullable<string>
	/** 
	 * The image_url of the line item. When blank, it gets populated with the image_url of the associated item (if present, SKU only)..
	 * @example ```"https://img.yourdomain.com/skus/xYZkjABcde.png"```
	 */
	image_url?: Nullable<string>
	/** 
	 * The type of the associate item. Can be one of 'skus', 'bundles', 'shipments', 'payment_methods', 'adjustments', 'gift_cards', or a valid promotion type..
	 * @example ```"skus"```
	 */
	item_type?: Nullable<'skus' | 'bundles' | 'shipments' | 'payment_methods' | 'adjustments' | 'gift_cards' | 'percentage_discount_promotions' | 'free_shipping_promotions' | 'free_gift_promotions' | 'fixed_price_promotions' | 'external_promotions' | 'fixed_amount_promotions'>
	/** 
	 * The frequency which generates a subscription. Must be supported by existing associated subscription_model..
	 * @example ```"monthly"```
	 */
	frequency?: Nullable<string>

	order: OrderRel
	item?: Nullable<AdjustmentRel | BundleRel | ExternalPromotionRel | FixedAmountPromotionRel | FreeShippingPromotionRel | GiftCardRel | PaymentMethodRel | PercentageDiscountPromotionRel | ShipmentRel | SkuRel>
	sku?: Nullable<SkuRel>
	bundle?: Nullable<BundleRel>
	adjustment?: Nullable<AdjustmentRel>
	gift_card?: Nullable<GiftCardRel>
	shipment?: Nullable<ShipmentRel>
	payment_method?: Nullable<PaymentMethodRel>
	tags?: Nullable<TagRel[]>

}


interface LineItemUpdate extends ResourceUpdate {
	
	/** 
	 * The code of the associated SKU..
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: Nullable<string>
	/** 
	 * The code of the associated bundle..
	 * @example ```"BUNDLEMM000000FFFFFFXLXX"```
	 */
	bundle_code?: Nullable<string>
	/** 
	 * The line item quantity..
	 * @example ```"4"```
	 */
	quantity?: Nullable<number>
	/** 
	 * When creating or updating a new line item, set this attribute to '1' if you want to inject the unit_amount_cents price from an external source. Any successive price computation will be done externally, until the attribute is reset to '0'..
	 * @example ```"true"```
	 */
	_external_price?: Nullable<boolean>
	/** 
	 * Send this attribute if you want to reserve the stock for the line item's SKUs quantity. Stock reservations expiration depends on the inventory model's cutoff. When used on update the existing active stock reservations are renewed..
	 * @example ```"true"```
	 */
	_reserve_stock?: Nullable<boolean>
	/** 
	 * The compared price amount, in cents. Useful to display a percentage discount..
	 * @example ```"13000"```
	 */
	compare_at_amount_cents?: Nullable<number>
	/** 
	 * The name of the line item. When blank, it gets populated with the name of the associated item (if present)..
	 * @example ```"Black Men T-shirt with White Logo (XL)"```
	 */
	name?: Nullable<string>
	/** 
	 * The image_url of the line item. When blank, it gets populated with the image_url of the associated item (if present, SKU only)..
	 * @example ```"https://img.yourdomain.com/skus/xYZkjABcde.png"```
	 */
	image_url?: Nullable<string>
	/** 
	 * The frequency which generates a subscription. Must be supported by existing associated subscription_model..
	 * @example ```"monthly"```
	 */
	frequency?: Nullable<string>
	/** 
	 * Send this attribute if you want to reset the circuit breaker associated to this resource to 'closed' state and zero failures count..
	 * @example ```"true"```
	 */
	_reset_circuit?: Nullable<boolean>

	tags?: Nullable<TagRel[]>

}


class LineItems extends ApiResource<LineItem> {

	static readonly TYPE: LineItemType = 'line_items' as const

	async create(resource: LineItemCreate, params?: QueryParamsRetrieve<LineItem>, options?: ResourcesConfig): Promise<LineItem> {
		return this.resources.create<LineItemCreate, LineItem>({ ...resource, type: LineItems.TYPE }, params, options)
	}

	async update(resource: LineItemUpdate, params?: QueryParamsRetrieve<LineItem>, options?: ResourcesConfig): Promise<LineItem> {
		return this.resources.update<LineItemUpdate, LineItem>({ ...resource, type: LineItems.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: LineItems.TYPE } : id, options)
	}

	async order(lineItemId: string | LineItem, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `line_items/${_lineItemId}/order`, params, options) as unknown as Order
	}

	async line_item_options(lineItemId: string | LineItem, params?: QueryParamsList<LineItemOption>, options?: ResourcesConfig): Promise<ListResponse<LineItemOption>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<LineItemOption>({ type: 'line_item_options' }, `line_items/${_lineItemId}/line_item_options`, params, options) as unknown as ListResponse<LineItemOption>
	}

	async return_line_items(lineItemId: string | LineItem, params?: QueryParamsList<ReturnLineItem>, options?: ResourcesConfig): Promise<ListResponse<ReturnLineItem>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<ReturnLineItem>({ type: 'return_line_items' }, `line_items/${_lineItemId}/return_line_items`, params, options) as unknown as ListResponse<ReturnLineItem>
	}

	async stock_reservations(lineItemId: string | LineItem, params?: QueryParamsList<StockReservation>, options?: ResourcesConfig): Promise<ListResponse<StockReservation>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<StockReservation>({ type: 'stock_reservations' }, `line_items/${_lineItemId}/stock_reservations`, params, options) as unknown as ListResponse<StockReservation>
	}

	async stock_line_items(lineItemId: string | LineItem, params?: QueryParamsList<StockLineItem>, options?: ResourcesConfig): Promise<ListResponse<StockLineItem>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<StockLineItem>({ type: 'stock_line_items' }, `line_items/${_lineItemId}/stock_line_items`, params, options) as unknown as ListResponse<StockLineItem>
	}

	async stock_transfers(lineItemId: string | LineItem, params?: QueryParamsList<StockTransfer>, options?: ResourcesConfig): Promise<ListResponse<StockTransfer>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<StockTransfer>({ type: 'stock_transfers' }, `line_items/${_lineItemId}/stock_transfers`, params, options) as unknown as ListResponse<StockTransfer>
	}

	async events(lineItemId: string | LineItem, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<Event>({ type: 'events' }, `line_items/${_lineItemId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(lineItemId: string | LineItem, params?: QueryParamsList<Tag>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `line_items/${_lineItemId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async _external_price(id: string | LineItem, params?: QueryParamsRetrieve<LineItem>, options?: ResourcesConfig): Promise<LineItem> {
		return this.resources.update<LineItemUpdate, LineItem>({ id: (typeof id === 'string')? id: id.id, type: LineItems.TYPE, _external_price: true }, params, options)
	}

	async _reserve_stock(id: string | LineItem, params?: QueryParamsRetrieve<LineItem>, options?: ResourcesConfig): Promise<LineItem> {
		return this.resources.update<LineItemUpdate, LineItem>({ id: (typeof id === 'string')? id: id.id, type: LineItems.TYPE, _reserve_stock: true }, params, options)
	}

	async _reset_circuit(id: string | LineItem, params?: QueryParamsRetrieve<LineItem>, options?: ResourcesConfig): Promise<LineItem> {
		return this.resources.update<LineItemUpdate, LineItem>({ id: (typeof id === 'string')? id: id.id, type: LineItems.TYPE, _reset_circuit: true }, params, options)
	}


	isLineItem(resource: any): resource is LineItem {
		return resource.type && (resource.type === LineItems.TYPE)
	}


	relationship(id: string | ResourceId | null): LineItemRel {
		return super.relationshipOneToOne<LineItemRel>(id)
	}

	relationshipToMany(...ids: string[]): LineItemRel[] {
		return super.relationshipOneToMany<LineItemRel>(...ids)
	}


	type(): LineItemType {
		return LineItems.TYPE
	}

}


export default LineItems

export type { LineItem, LineItemCreate, LineItemUpdate, LineItemType }
