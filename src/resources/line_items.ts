import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ResourceRel, ListResponse } from '../resource'
import type { QueryParamsList, QueryParamsRetrieve } from '../query'

import type { Order } from './orders'
import type { Adjustment } from './adjustments'
import type { Bundle } from './bundles'
import type { ExternalPromotion } from './external_promotions'
import type { FixedAmountPromotion } from './fixed_amount_promotions'
import type { FreeShippingPromotion } from './free_shipping_promotions'
import type { GiftCard } from './gift_cards'
import type { PaymentMethod } from './payment_methods'
import type { PercentageDiscountPromotion } from './percentage_discount_promotions'
import type { Shipment } from './shipments'
import type { Sku } from './skus'
import type { LineItemOption } from './line_item_options'
import type { ReturnLineItem } from './return_line_items'
import type { StockReservation } from './stock_reservations'
import type { StockLineItem } from './stock_line_items'
import type { StockTransfer } from './stock_transfers'
import type { Event } from './events'
import type { Tag } from './tags'


type LineItemRel = ResourceRel & { type: typeof LineItems.TYPE }
type OrderRel = ResourceRel & { type: 'orders' }
type AdjustmentRel = ResourceRel & { type: 'adjustments' }
type BundleRel = ResourceRel & { type: 'bundles' }
type ExternalPromotionRel = ResourceRel & { type: 'external_promotions' }
type FixedAmountPromotionRel = ResourceRel & { type: 'fixed_amount_promotions' }
type FreeShippingPromotionRel = ResourceRel & { type: 'free_shipping_promotions' }
type GiftCardRel = ResourceRel & { type: 'gift_cards' }
type PaymentMethodRel = ResourceRel & { type: 'payment_methods' }
type PercentageDiscountPromotionRel = ResourceRel & { type: 'percentage_discount_promotions' }
type ShipmentRel = ResourceRel & { type: 'shipments' }
type SkuRel = ResourceRel & { type: 'skus' }
type TagRel = ResourceRel & { type: 'tags' }


interface LineItem extends Resource {
	
	sku_code?: string
	bundle_code?: string
	quantity?: number
	_external_price?: boolean
	currency_code?: string
	unit_amount_cents?: number
	unit_amount_float?: number
	formatted_unit_amount?: string
	compare_at_amount_cents?: number
	compare_at_amount_float?: number
	formatted_compare_at_amount?: string
	options_amount_cents?: number
	options_amount_float?: number
	formatted_options_amount?: string
	discount_cents?: number
	discount_float?: number
	formatted_discount?: string
	total_amount_cents?: number
	total_amount_float?: number
	formatted_total_amount?: string
	tax_amount_cents?: number
	tax_amount_float?: number
	formatted_tax_amount?: string
	name?: string
	image_url?: string
	discount_breakdown?: object
	tax_rate?: number
	tax_breakdown?: object
	item_type?: string
	frequency?: string
	coupon_code?: string
	circuit_state?: string
	circuit_failure_count?: number

	order?: Order
	item?: Adjustment | Bundle | ExternalPromotion | FixedAmountPromotion | FreeShippingPromotion | GiftCard | PaymentMethod | PercentageDiscountPromotion | Shipment | Sku
	sku?: Sku
	bundle?: Bundle
	adjustment?: Adjustment
	gift_card?: GiftCard
	shipment?: Shipment
	payment_method?: PaymentMethod
	line_item_options?: LineItemOption[]
	return_line_items?: ReturnLineItem[]
	stock_reservations?: StockReservation[]
	stock_line_items?: StockLineItem[]
	stock_transfers?: StockTransfer[]
	events?: Event[]
	tags?: Tag[]

}


interface LineItemCreate extends ResourceCreate {
	
	sku_code?: string
	bundle_code?: string
	quantity: number
	_external_price?: boolean
	_update_quantity?: boolean
	_reserve_stock?: boolean
	unit_amount_cents?: number
	compare_at_amount_cents?: number
	name?: string
	image_url?: string
	item_type?: string
	frequency?: string

	order: OrderRel
	item?: AdjustmentRel | BundleRel | ExternalPromotionRel | FixedAmountPromotionRel | FreeShippingPromotionRel | GiftCardRel | PaymentMethodRel | PercentageDiscountPromotionRel | ShipmentRel | SkuRel
	sku?: SkuRel
	bundle?: BundleRel
	adjustment?: AdjustmentRel
	gift_card?: GiftCardRel
	shipment?: ShipmentRel
	payment_method?: PaymentMethodRel
	tags?: TagRel[]

}


interface LineItemUpdate extends ResourceUpdate {
	
	sku_code?: string
	bundle_code?: string
	quantity?: number
	_external_price?: boolean
	_reserve_stock?: boolean
	compare_at_amount_cents?: number
	name?: string
	image_url?: string
	frequency?: string
	_reset_circuit?: boolean

	tags?: TagRel[]

}


class LineItems extends ApiResource {

	static readonly TYPE: 'line_items' = 'line_items' as const
	// static readonly PATH = 'line_items'

	async list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<LineItem>> {
		return this.resources.list<LineItem>({ type: LineItems.TYPE }, params, options)
	}

	async create(resource: LineItemCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
		return this.resources.create<LineItemCreate, LineItem>({ ...resource, type: LineItems.TYPE }, params, options)
	}

	async retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
		return this.resources.retrieve<LineItem>({ type: LineItems.TYPE, id }, params, options)
	}

	async update(resource: LineItemUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
		return this.resources.update<LineItemUpdate, LineItem>({ ...resource, type: LineItems.TYPE }, params, options)
	}

	async delete(id: string, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete({ type: LineItems.TYPE, id }, options)
	}

	async order(lineItemId: string | LineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<Order>({ type: 'orders' }, `line_items/${_lineItemId}/order`, params, options) as unknown as Order
	}

	async line_item_options(lineItemId: string | LineItem, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<LineItemOption>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<LineItemOption>({ type: 'line_item_options' }, `line_items/${_lineItemId}/line_item_options`, params, options) as unknown as ListResponse<LineItemOption>
	}

	async return_line_items(lineItemId: string | LineItem, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<ReturnLineItem>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<ReturnLineItem>({ type: 'return_line_items' }, `line_items/${_lineItemId}/return_line_items`, params, options) as unknown as ListResponse<ReturnLineItem>
	}

	async stock_reservations(lineItemId: string | LineItem, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockReservation>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<StockReservation>({ type: 'stock_reservations' }, `line_items/${_lineItemId}/stock_reservations`, params, options) as unknown as ListResponse<StockReservation>
	}

	async stock_line_items(lineItemId: string | LineItem, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockLineItem>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<StockLineItem>({ type: 'stock_line_items' }, `line_items/${_lineItemId}/stock_line_items`, params, options) as unknown as ListResponse<StockLineItem>
	}

	async stock_transfers(lineItemId: string | LineItem, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockTransfer>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<StockTransfer>({ type: 'stock_transfers' }, `line_items/${_lineItemId}/stock_transfers`, params, options) as unknown as ListResponse<StockTransfer>
	}

	async events(lineItemId: string | LineItem, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<Event>({ type: 'events' }, `line_items/${_lineItemId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(lineItemId: string | LineItem, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<Tag>({ type: 'tags' }, `line_items/${_lineItemId}/tags`, params, options) as unknown as ListResponse<Tag>
	}


	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
	isLineItem(resource: any): resource is LineItem {
		return resource.type && (resource.type === LineItems.TYPE)
	}


	relationship(id: string | ResourceId | null): LineItemRel {
		return ((id === null) || (typeof id === 'string')) ? { id, type: LineItems.TYPE } : { id: id.id, type: LineItems.TYPE }
	}


	type(): string {
		return LineItems.TYPE
	}

}


export default LineItems

export { LineItem, LineItemCreate, LineItemUpdate }
