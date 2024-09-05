import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSort, /* ResourceFilter */ } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Event } from './events'
import type { LineItemOption } from './line_item_options'
import type { Order, OrderType } from './orders'
import type { ReturnLineItem } from './return_line_items'
import type { StockLineItem } from './stock_line_items'
import type { StockReservation } from './stock_reservations'
import type { StockTransfer } from './stock_transfers'
import type { Tag, TagType } from './tags'
import type { Adjustment, AdjustmentType } from './adjustments'
import type { Bundle, BundleType } from './bundles'
import type { GiftCard, GiftCardType } from './gift_cards'
import type { Sku, SkuType } from './skus'
import type { Shipment, ShipmentType } from './shipments'
import type { PaymentMethod, PaymentMethodType } from './payment_methods'
import type { PercentageDiscountPromotion, PercentageDiscountPromotionType } from './percentage_discount_promotions'
import type { FreeShippingPromotion, FreeShippingPromotionType } from './free_shipping_promotions'
import type { BuyXPayYPromotion, BuyXPayYPromotionType } from './buy_x_pay_y_promotions'
import type { FreeGiftPromotion, FreeGiftPromotionType } from './free_gift_promotions'
import type { FixedPricePromotion, FixedPricePromotionType } from './fixed_price_promotions'
import type { ExternalPromotion, ExternalPromotionType } from './external_promotions'
import type { FixedAmountPromotion, FixedAmountPromotionType } from './fixed_amount_promotions'
import type { FlexPromotion, FlexPromotionType } from './flex_promotions'


type LineItemType = 'line_items'
type LineItemRel = ResourceRel & { type: LineItemType }
type SkuRel = ResourceRel & { type: SkuType }
type BundleRel = ResourceRel & { type: BundleType }
type GiftCardRel = ResourceRel & { type: GiftCardType }
type ShipmentRel = ResourceRel & { type: ShipmentType }
type PaymentMethodRel = ResourceRel & { type: PaymentMethodType }
type AdjustmentRel = ResourceRel & { type: AdjustmentType }
type PercentageDiscountPromotionRel = ResourceRel & { type: PercentageDiscountPromotionType }
type FreeShippingPromotionRel = ResourceRel & { type: FreeShippingPromotionType }
type BuyXPayYPromotionRel = ResourceRel & { type: BuyXPayYPromotionType }
type FreeGiftPromotionRel = ResourceRel & { type: FreeGiftPromotionType }
type FixedPricePromotionRel = ResourceRel & { type: FixedPricePromotionType }
type ExternalPromotionRel = ResourceRel & { type: ExternalPromotionType }
type FixedAmountPromotionRel = ResourceRel & { type: FixedAmountPromotionType }
type FlexPromotionRel = ResourceRel & { type: FlexPromotionType }
type OrderRel = ResourceRel & { type: OrderType }
type TagRel = ResourceRel & { type: TagType }


export type LineItemSort = Pick<LineItem, 'id' | 'circuit_failure_count' | 'circuit_state' | 'compare_at_amount_cents' | 'coupon_code' | 'currency_code' | 'discount_cents' | 'item_type' | 'name' | 'options_amount_cents' | 'tax_amount_cents' | 'total_amount_cents' | 'unit_amount_cents'> & ResourceSort
// export type LineItemFilter = Pick<LineItem, 'id' | 'circuit_failure_count' | 'circuit_state' | 'compare_at_amount_cents' | 'coupon_code' | 'currency_code' | 'discount_cents' | 'image_url' | 'item_type' | 'name' | 'options_amount_cents' | 'quantity' | 'tax_amount_cents' | 'total_amount_cents' | 'unit_amount_cents'> & ResourceFilter


interface LineItem extends Resource {
	
	readonly type: LineItemType

	/** 
	 * When creating or updating a new line item, set this attribute to '1' if you want to inject the unit_amount_cents price from an external source. Any successive price computation will be done externally, until the attribute is reset to '0'.
	 * @example ```"true"```
	 */
	_external_price?: boolean | null
	/** 
	 * The code of the associated bundle.
	 * @example ```"BUNDLEMM000000FFFFFFXLXX"```
	 */
	bundle_code?: string | null
	/** 
	 * The number of consecutive failures recorded by the circuit breaker associated to this resource, will be reset on first successful call to callback.
	 * @example ```"5"```
	 */
	circuit_failure_count?: number | null
	/** 
	 * The circuit breaker state, by default it is 'closed'. It can become 'open' once the number of consecutive failures overlaps the specified threshold, in such case no further calls to the failing callback are made.
	 * @example ```"closed"```
	 */
	circuit_state?: string | null
	/** 
	 * The compared price amount, in cents. Useful to display a percentage discount.
	 * @example ```"13000"```
	 */
	compare_at_amount_cents?: number | null
	/** 
	 * The compared price amount, float.
	 * @example ```"130"```
	 */
	compare_at_amount_float?: number | null
	/** 
	 * The coupon code, if any, used to trigger this promotion line item. null for other line item types or if the promotion line item wasn't triggered by a coupon.
	 * @example ```"SUMMERDISCOUNT"```
	 */
	coupon_code?: string | null
	/** 
	 * The international 3-letter currency code as defined by the ISO 4217 standard, automatically inherited from the order's market.
	 * @example ```"EUR"```
	 */
	currency_code?: string | null
	/** 
	 * The discount breakdown for this line item (if calculated).
	 * @example ```"[object Object]"```
	 */
	discount_breakdown?: Record<string, any> | null
	/** 
	 * The discount applied to the line item, in cents. When you apply a discount to an order, this is automatically calculated basing on the line item total_amount_cents value.
	 * @example ```"-1000"```
	 */
	discount_cents?: number | null
	/** 
	 * The discount applied to the line item, float. When you apply a discount to an order, this is automatically calculated basing on the line item total_amount_cents value.
	 * @example ```"10"```
	 */
	discount_float?: number | null
	/** 
	 * The compared price amount, formatted.
	 * @example ```"€130,00"```
	 */
	formatted_compare_at_amount?: string | null
	/** 
	 * The discount applied to the line item, fromatted. When you apply a discount to an order, this is automatically calculated basing on the line item total_amount_cents value.
	 * @example ```"€10,00"```
	 */
	formatted_discount?: string | null
	/** 
	 * The options amount of the line item, formatted.
	 * @example ```"€10,00"```
	 */
	formatted_options_amount?: string | null
	/** 
	 * The collected tax amount, otherwise calculated as total amount cents - discount cent * tax rate, formatted.
	 * @example ```"€18,80"```
	 */
	formatted_tax_amount?: string | null
	/** 
	 * Calculated as unit amount x quantity + options amount, formatted. This can be useful to display the amount with currency in you views.
	 * @example ```"€188,00"```
	 */
	formatted_total_amount?: string | null
	/** 
	 * The unit amount of the line item, formatted. This can be useful to display the amount with currency in you views.
	 * @example ```"€100,00"```
	 */
	formatted_unit_amount?: string | null
	/** 
	 * The frequency which generates a subscription. Must be supported by existing associated subscription_model.
	 * @example ```"monthly"```
	 */
	frequency?: string | null
	/** 
	 * The image_url of the line item. When blank, it gets populated with the image_url of the associated item (if present, SKU only).
	 * @example ```"https://img.yourdomain.com/skus/xYZkjABcde.png"```
	 */
	image_url?: string | null
	/** 
	 * The type of the associated item. One of 'skus', 'bundles', 'gift_cards', 'shipments', 'payment_methods', 'adjustments', 'percentage_discount_promotions', 'free_shipping_promotions', 'buy_x_pay_y_promotions', 'free_gift_promotions', 'fixed_price_promotions', 'external_promotions', 'fixed_amount_promotions', or 'flex_promotions'.
	 * @example ```"skus"```
	 */
	item_type?: 'skus' | 'bundles' | 'gift_cards' | 'shipments' | 'payment_methods' | 'adjustments' | 'percentage_discount_promotions' | 'free_shipping_promotions' | 'buy_x_pay_y_promotions' | 'free_gift_promotions' | 'fixed_price_promotions' | 'external_promotions' | 'fixed_amount_promotions' | 'flex_promotions' | null
	/** 
	 * The name of the line item. When blank, it gets populated with the name of the associated item (if present).
	 * @example ```"Men's Black T-shirt with White Logo (XL)"```
	 */
	name?: string | null
	/** 
	 * The options amount of the line item, in cents.
	 * @example ```"1000"```
	 */
	options_amount_cents?: number | null
	/** 
	 * The options amount of the line item, float.
	 * @example ```"10"```
	 */
	options_amount_float?: number | null
	/** 
	 * The line item quantity.
	 * @example ```"4"```
	 */
	quantity: number
	/** 
	 * The code of the associated SKU.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null
	/** 
	 * The collected tax amount, otherwise calculated as total amount cents - discount cent * tax rate, in cents.
	 * @example ```"1880"```
	 */
	tax_amount_cents?: number | null
	/** 
	 * The collected tax amount, otherwise calculated as total amount cents - discount cent * tax rate, float.
	 * @example ```"18.8"```
	 */
	tax_amount_float: number
	/** 
	 * The tax breakdown for this line item (if calculated).
	 * @example ```"[object Object]"```
	 */
	tax_breakdown?: Record<string, any> | null
	/** 
	 * The tax rate for this line item (if calculated).
	 * @example ```"0.22"```
	 */
	tax_rate?: number | null
	/** 
	 * Calculated as unit amount x quantity + options amount, in cents.
	 * @example ```"18800"```
	 */
	total_amount_cents?: number | null
	/** 
	 * Calculated as unit amount x quantity + options amount, float. This can be useful to track the purchase on thrid party systems, e.g Google Analyitcs Enhanced Ecommerce.
	 * @example ```"188"```
	 */
	total_amount_float: number
	/** 
	 * The unit amount of the line item, in cents. Can be specified only via an integration application, or when the item is missing, otherwise is automatically computed by using one of the available methods.
	 * @example ```"10000"```
	 */
	unit_amount_cents?: number | null
	/** 
	 * The unit amount of the line item, float. This can be useful to track the purchase on thrid party systems, e.g Google Analyitcs Enhanced Ecommerce.
	 * @example ```"100"```
	 */
	unit_amount_float?: number | null

	adjustment?: Adjustment | null
	bundle?: Bundle | null
	events?: Event[] | null
	gift_card?: GiftCard | null
	item?: Sku | Bundle | GiftCard | Shipment | PaymentMethod | Adjustment | PercentageDiscountPromotion | FreeShippingPromotion | BuyXPayYPromotion | FreeGiftPromotion | FixedPricePromotion | ExternalPromotion | FixedAmountPromotion | FlexPromotion | null
	line_item_options?: LineItemOption[] | null
	order?: Order | null
	payment_method?: PaymentMethod | null
	return_line_items?: ReturnLineItem[] | null
	shipment?: Shipment | null
	sku?: Sku | null
	stock_line_items?: StockLineItem[] | null
	stock_reservations?: StockReservation[] | null
	stock_transfers?: StockTransfer[] | null
	tags?: Tag[] | null

}


interface LineItemCreate extends ResourceCreate {
	
	/** 
	 * When creating or updating a new line item, set this attribute to '1' if you want to inject the unit_amount_cents price from an external source. Any successive price computation will be done externally, until the attribute is reset to '0'.
	 * @example ```"true"```
	 */
	_external_price?: boolean | null
	/** 
	 * Send this attribute if you want to reserve the stock for the line item's SKUs quantity. Stock reservations expiration depends on the inventory model's cutoff. When used on update the existing active stock reservations are renewed.
	 * @example ```"true"```
	 */
	_reserve_stock?: boolean | null
	/** 
	 * When creating a new line item, set this attribute to '1' if you want to update the line item quantity (if present) instead of creating a new line item for the same SKU.
	 * @example ```"true"```
	 */
	_update_quantity?: boolean | null
	/** 
	 * The code of the associated bundle.
	 * @example ```"BUNDLEMM000000FFFFFFXLXX"```
	 */
	bundle_code?: string | null
	/** 
	 * The compared price amount, in cents. Useful to display a percentage discount.
	 * @example ```"13000"```
	 */
	compare_at_amount_cents?: number | null
	/** 
	 * The frequency which generates a subscription. Must be supported by existing associated subscription_model.
	 * @example ```"monthly"```
	 */
	frequency?: string | null
	/** 
	 * The image_url of the line item. When blank, it gets populated with the image_url of the associated item (if present, SKU only).
	 * @example ```"https://img.yourdomain.com/skus/xYZkjABcde.png"```
	 */
	image_url?: string | null
	/** 
	 * The type of the associated item. One of 'skus', 'bundles', 'gift_cards', 'shipments', 'payment_methods', 'adjustments', 'percentage_discount_promotions', 'free_shipping_promotions', 'buy_x_pay_y_promotions', 'free_gift_promotions', 'fixed_price_promotions', 'external_promotions', 'fixed_amount_promotions', or 'flex_promotions'.
	 * @example ```"skus"```
	 */
	item_type?: 'skus' | 'bundles' | 'gift_cards' | 'shipments' | 'payment_methods' | 'adjustments' | 'percentage_discount_promotions' | 'free_shipping_promotions' | 'buy_x_pay_y_promotions' | 'free_gift_promotions' | 'fixed_price_promotions' | 'external_promotions' | 'fixed_amount_promotions' | 'flex_promotions' | null
	/** 
	 * The name of the line item. When blank, it gets populated with the name of the associated item (if present).
	 * @example ```"Men's Black T-shirt with White Logo (XL)"```
	 */
	name?: string | null
	/** 
	 * The line item quantity.
	 * @example ```"4"```
	 */
	quantity: number
	/** 
	 * The code of the associated SKU.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null
	/** 
	 * The unit amount of the line item, in cents. Can be specified only via an integration application, or when the item is missing, otherwise is automatically computed by using one of the available methods.
	 * @example ```"10000"```
	 */
	unit_amount_cents?: number | null

	item?: SkuRel | BundleRel | GiftCardRel | ShipmentRel | PaymentMethodRel | AdjustmentRel | PercentageDiscountPromotionRel | FreeShippingPromotionRel | BuyXPayYPromotionRel | FreeGiftPromotionRel | FixedPricePromotionRel | ExternalPromotionRel | FixedAmountPromotionRel | FlexPromotionRel | null
	order: OrderRel
	tags?: TagRel[] | null

}


interface LineItemUpdate extends ResourceUpdate {
	
	/** 
	 * When creating or updating a new line item, set this attribute to '1' if you want to inject the unit_amount_cents price from an external source. Any successive price computation will be done externally, until the attribute is reset to '0'.
	 * @example ```"true"```
	 */
	_external_price?: boolean | null
	/** 
	 * Send this attribute if you want to reserve the stock for the line item's SKUs quantity. Stock reservations expiration depends on the inventory model's cutoff. When used on update the existing active stock reservations are renewed.
	 * @example ```"true"```
	 */
	_reserve_stock?: boolean | null
	/** 
	 * Send this attribute if you want to reset the circuit breaker associated to this resource to 'closed' state and zero failures count.
	 * @example ```"true"```
	 */
	_reset_circuit?: boolean | null
	/** 
	 * The code of the associated bundle.
	 * @example ```"BUNDLEMM000000FFFFFFXLXX"```
	 */
	bundle_code?: string | null
	/** 
	 * The compared price amount, in cents. Useful to display a percentage discount.
	 * @example ```"13000"```
	 */
	compare_at_amount_cents?: number | null
	/** 
	 * The frequency which generates a subscription. Must be supported by existing associated subscription_model.
	 * @example ```"monthly"```
	 */
	frequency?: string | null
	/** 
	 * The image_url of the line item. When blank, it gets populated with the image_url of the associated item (if present, SKU only).
	 * @example ```"https://img.yourdomain.com/skus/xYZkjABcde.png"```
	 */
	image_url?: string | null
	/** 
	 * The name of the line item. When blank, it gets populated with the name of the associated item (if present).
	 * @example ```"Men's Black T-shirt with White Logo (XL)"```
	 */
	name?: string | null
	/** 
	 * The line item quantity.
	 * @example ```"4"```
	 */
	quantity?: number | null
	/** 
	 * The code of the associated SKU.
	 * @example ```"TSHIRTMM000000FFFFFFXLXX"```
	 */
	sku_code?: string | null
	/** 
	 * The unit amount of the line item, in cents. Can be specified only via an integration application, or when the item is missing, otherwise is automatically computed by using one of the available methods.
	 * @example ```"10000"```
	 */
	unit_amount_cents?: number | null

	tags?: TagRel[] | null

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

	async events(lineItemId: string | LineItem, params?: QueryParamsList<Event>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<Event>({ type: 'events' }, `line_items/${_lineItemId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async line_item_options(lineItemId: string | LineItem, params?: QueryParamsList<LineItemOption>, options?: ResourcesConfig): Promise<ListResponse<LineItemOption>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<LineItemOption>({ type: 'line_item_options' }, `line_items/${_lineItemId}/line_item_options`, params, options) as unknown as ListResponse<LineItemOption>
	}

	async order(lineItemId: string | LineItem, params?: QueryParamsRetrieve<Order>, options?: ResourcesConfig): Promise<Order> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `line_items/${_lineItemId}/order`, params, options) as unknown as Order
	}

	async return_line_items(lineItemId: string | LineItem, params?: QueryParamsList<ReturnLineItem>, options?: ResourcesConfig): Promise<ListResponse<ReturnLineItem>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<ReturnLineItem>({ type: 'return_line_items' }, `line_items/${_lineItemId}/return_line_items`, params, options) as unknown as ListResponse<ReturnLineItem>
	}

	async stock_line_items(lineItemId: string | LineItem, params?: QueryParamsList<StockLineItem>, options?: ResourcesConfig): Promise<ListResponse<StockLineItem>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<StockLineItem>({ type: 'stock_line_items' }, `line_items/${_lineItemId}/stock_line_items`, params, options) as unknown as ListResponse<StockLineItem>
	}

	async stock_reservations(lineItemId: string | LineItem, params?: QueryParamsList<StockReservation>, options?: ResourcesConfig): Promise<ListResponse<StockReservation>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<StockReservation>({ type: 'stock_reservations' }, `line_items/${_lineItemId}/stock_reservations`, params, options) as unknown as ListResponse<StockReservation>
	}

	async stock_transfers(lineItemId: string | LineItem, params?: QueryParamsList<StockTransfer>, options?: ResourcesConfig): Promise<ListResponse<StockTransfer>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<StockTransfer>({ type: 'stock_transfers' }, `line_items/${_lineItemId}/stock_transfers`, params, options) as unknown as ListResponse<StockTransfer>
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
