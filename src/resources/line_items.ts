import { ApiResource } from '../resource'
import type { Resource, ResourceCreate, ResourceUpdate, ResourceId, ResourcesConfig, ResourceRel, ListResponse, ResourceSortable, ResourceFilterable } from '../resource'
import type { QueryParamsRetrieve, QueryParamsList } from '../query'

import type { Order, OrderType, OrderSortable } from './orders'
import type { Adjustment, AdjustmentType, AdjustmentSortable } from './adjustments'
import type { Bundle, BundleType, BundleSortable } from './bundles'
import type { ExternalPromotion, ExternalPromotionType, ExternalPromotionSortable } from './external_promotions'
import type { FixedAmountPromotion, FixedAmountPromotionType, FixedAmountPromotionSortable } from './fixed_amount_promotions'
import type { FreeShippingPromotion, FreeShippingPromotionType, FreeShippingPromotionSortable } from './free_shipping_promotions'
import type { GiftCard, GiftCardType, GiftCardSortable } from './gift_cards'
import type { PaymentMethod, PaymentMethodType, PaymentMethodSortable } from './payment_methods'
import type { PercentageDiscountPromotion, PercentageDiscountPromotionType, PercentageDiscountPromotionSortable } from './percentage_discount_promotions'
import type { Shipment, ShipmentType, ShipmentSortable } from './shipments'
import type { Sku, SkuType, SkuSortable } from './skus'
import type { LineItemOption, LineItemOptionSortable } from './line_item_options'
import type { ReturnLineItem, ReturnLineItemSortable } from './return_line_items'
import type { StockReservation, StockReservationSortable } from './stock_reservations'
import type { StockLineItem, StockLineItemSortable } from './stock_line_items'
import type { StockTransfer, StockTransferSortable } from './stock_transfers'
import type { Event, EventSortable } from './events'
import type { Tag, TagType, TagSortable } from './tags'


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


export type LineItemSortable = Pick<LineItem, 'id' | 'currency_code' | 'unit_amount_cents' | 'compare_at_amount_cents' | 'options_amount_cents' | 'discount_cents' | 'total_amount_cents' | 'tax_amount_cents' | 'name' | 'item_type' | 'coupon_code' | 'circuit_state' | 'circuit_failure_count'> & ResourceSortable
export type LineItemFilterable = Pick<LineItem, 'id' | 'quantity' | 'currency_code' | 'unit_amount_cents' | 'compare_at_amount_cents' | 'options_amount_cents' | 'discount_cents' | 'total_amount_cents' | 'tax_amount_cents' | 'name' | 'image_url' | 'item_type' | 'coupon_code' | 'circuit_state' | 'circuit_failure_count'> & ResourceFilterable


interface LineItem extends Resource {
	
	readonly type: LineItemType

	sku_code?: string | null
	bundle_code?: string | null
	quantity: number
	_external_price?: boolean | null
	currency_code?: string | null
	unit_amount_cents?: number | null
	unit_amount_float?: number | null
	formatted_unit_amount?: string | null
	compare_at_amount_cents?: number | null
	compare_at_amount_float?: number | null
	formatted_compare_at_amount?: string | null
	options_amount_cents?: number | null
	options_amount_float?: number | null
	formatted_options_amount?: string | null
	discount_cents?: number | null
	discount_float?: number | null
	formatted_discount?: string | null
	total_amount_cents?: number | null
	total_amount_float: number
	formatted_total_amount?: string | null
	tax_amount_cents?: number | null
	tax_amount_float: number
	formatted_tax_amount?: string | null
	name?: string | null
	image_url?: string | null
	discount_breakdown?: Record<string, any> | null
	tax_rate?: number | null
	tax_breakdown?: Record<string, any> | null
	item_type?: 'skus' | 'bundles' | 'shipments' | 'payment_methods' | 'adjustments' | 'gift_cards' | 'percentage_discount_promotions' | 'free_shipping_promotions' | 'free_gift_promotions' | 'fixed_price_promotions' | 'external_promotions' | 'fixed_amount_promotions' | null
	frequency?: string | null
	coupon_code?: string | null
	circuit_state?: string | null
	circuit_failure_count?: number | null

	order?: Order | null
	item?: Adjustment | Bundle | ExternalPromotion | FixedAmountPromotion | FreeShippingPromotion | GiftCard | PaymentMethod | PercentageDiscountPromotion | Shipment | Sku | null
	sku?: Sku | null
	bundle?: Bundle | null
	adjustment?: Adjustment | null
	gift_card?: GiftCard | null
	shipment?: Shipment | null
	payment_method?: PaymentMethod | null
	line_item_options?: LineItemOption[] | null
	return_line_items?: ReturnLineItem[] | null
	stock_reservations?: StockReservation[] | null
	stock_line_items?: StockLineItem[] | null
	stock_transfers?: StockTransfer[] | null
	events?: Event[] | null
	tags?: Tag[] | null

}


interface LineItemCreate extends ResourceCreate {
	
	sku_code?: string | null
	bundle_code?: string | null
	quantity: number
	_external_price?: boolean | null
	_update_quantity?: boolean | null
	_reserve_stock?: boolean | null
	unit_amount_cents?: number | null
	compare_at_amount_cents?: number | null
	name?: string | null
	image_url?: string | null
	item_type?: 'skus' | 'bundles' | 'shipments' | 'payment_methods' | 'adjustments' | 'gift_cards' | 'percentage_discount_promotions' | 'free_shipping_promotions' | 'free_gift_promotions' | 'fixed_price_promotions' | 'external_promotions' | 'fixed_amount_promotions' | null
	frequency?: string | null

	order: OrderRel
	item?: AdjustmentRel | BundleRel | ExternalPromotionRel | FixedAmountPromotionRel | FreeShippingPromotionRel | GiftCardRel | PaymentMethodRel | PercentageDiscountPromotionRel | ShipmentRel | SkuRel | null
	sku?: SkuRel | null
	bundle?: BundleRel | null
	adjustment?: AdjustmentRel | null
	gift_card?: GiftCardRel | null
	shipment?: ShipmentRel | null
	payment_method?: PaymentMethodRel | null
	tags?: TagRel[] | null

}


interface LineItemUpdate extends ResourceUpdate {
	
	sku_code?: string | null
	bundle_code?: string | null
	quantity?: number | null
	_external_price?: boolean | null
	_reserve_stock?: boolean | null
	compare_at_amount_cents?: number | null
	name?: string | null
	image_url?: string | null
	frequency?: string | null
	_reset_circuit?: boolean | null

	tags?: TagRel[] | null

}


class LineItems extends ApiResource<LineItem, LineItemSortable> {

	static readonly TYPE: LineItemType = 'line_items' as const

	async create(resource: LineItemCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
		return this.resources.create<LineItemCreate, LineItem>({ ...resource, type: LineItems.TYPE }, params, options)
	}

	async update(resource: LineItemUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
		return this.resources.update<LineItemUpdate, LineItem>({ ...resource, type: LineItems.TYPE }, params, options)
	}

	async delete(id: string | ResourceId, options?: ResourcesConfig): Promise<void> {
		await this.resources.delete((typeof id === 'string')? { id, type: LineItems.TYPE } : id, options)
	}

	async order(lineItemId: string | LineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<Order> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<Order, OrderSortable>({ type: 'orders' }, `line_items/${_lineItemId}/order`, params, options) as unknown as Order
	}

	async line_item_options(lineItemId: string | LineItem, params?: QueryParamsList<LineItemOptionSortable>, options?: ResourcesConfig): Promise<ListResponse<LineItemOption>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<LineItemOption, LineItemOptionSortable>({ type: 'line_item_options' }, `line_items/${_lineItemId}/line_item_options`, params, options) as unknown as ListResponse<LineItemOption>
	}

	async return_line_items(lineItemId: string | LineItem, params?: QueryParamsList<ReturnLineItemSortable>, options?: ResourcesConfig): Promise<ListResponse<ReturnLineItem>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<ReturnLineItem, ReturnLineItemSortable>({ type: 'return_line_items' }, `line_items/${_lineItemId}/return_line_items`, params, options) as unknown as ListResponse<ReturnLineItem>
	}

	async stock_reservations(lineItemId: string | LineItem, params?: QueryParamsList<StockReservationSortable>, options?: ResourcesConfig): Promise<ListResponse<StockReservation>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<StockReservation, StockReservationSortable>({ type: 'stock_reservations' }, `line_items/${_lineItemId}/stock_reservations`, params, options) as unknown as ListResponse<StockReservation>
	}

	async stock_line_items(lineItemId: string | LineItem, params?: QueryParamsList<StockLineItemSortable>, options?: ResourcesConfig): Promise<ListResponse<StockLineItem>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<StockLineItem, StockLineItemSortable>({ type: 'stock_line_items' }, `line_items/${_lineItemId}/stock_line_items`, params, options) as unknown as ListResponse<StockLineItem>
	}

	async stock_transfers(lineItemId: string | LineItem, params?: QueryParamsList<StockTransferSortable>, options?: ResourcesConfig): Promise<ListResponse<StockTransfer>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<StockTransfer, StockTransferSortable>({ type: 'stock_transfers' }, `line_items/${_lineItemId}/stock_transfers`, params, options) as unknown as ListResponse<StockTransfer>
	}

	async events(lineItemId: string | LineItem, params?: QueryParamsList<EventSortable>, options?: ResourcesConfig): Promise<ListResponse<Event>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<Event, EventSortable>({ type: 'events' }, `line_items/${_lineItemId}/events`, params, options) as unknown as ListResponse<Event>
	}

	async tags(lineItemId: string | LineItem, params?: QueryParamsList<TagSortable>, options?: ResourcesConfig): Promise<ListResponse<Tag>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId as string
		return this.resources.fetch<Tag, TagSortable>({ type: 'tags' }, `line_items/${_lineItemId}/tags`, params, options) as unknown as ListResponse<Tag>
	}

	async _external_price(id: string | LineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
		return this.resources.update<LineItemUpdate, LineItem>({ id: (typeof id === 'string')? id: id.id, type: LineItems.TYPE, _external_price: true }, params, options)
	}

	async _reserve_stock(id: string | LineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
		return this.resources.update<LineItemUpdate, LineItem>({ id: (typeof id === 'string')? id: id.id, type: LineItems.TYPE, _reserve_stock: true }, params, options)
	}

	async _reset_circuit(id: string | LineItem, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem> {
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

/*
export const LineItemsClient = (init: ResourceAdapter | ResourcesInitConfig): LineItems => {
	return new LineItems((init instanceof ResourcesInitConfig)? ApiResourceAdapter(init) : init )
}
*/
