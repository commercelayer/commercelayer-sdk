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
import type { StockLineItem } from './stock_line_items'
import type { StockTransfer } from './stock_transfers'


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


interface LineItem extends Resource {
	
	sku_code?: string
	bundle_code?: string
	quantity?: number
	currency_code?: string
	unit_amount_cents?: number
	unit_amount_float?: number
	formatted_unit_amount?: string
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

	order?: Order
	item?: Adjustment | Bundle | ExternalPromotion | FixedAmountPromotion | FreeShippingPromotion | GiftCard | PaymentMethod | PercentageDiscountPromotion | Shipment | Sku
	line_item_options?: LineItemOption[]
	/**
	* @deprecated This field should not be used as it may be removed in the future without notice
	*/
	shipment_line_items?: object[]
	stock_line_items?: StockLineItem[]
	stock_transfers?: StockTransfer[]

}


interface LineItemCreate extends ResourceCreate {
	
	sku_code?: string
	bundle_code?: string
	quantity: number
	_external_price?: boolean
	_update_quantity?: boolean
	unit_amount_cents?: number
	name?: string
	image_url?: string
	item_type?: string

	order: OrderRel
	item?: AdjustmentRel | BundleRel | ExternalPromotionRel | FixedAmountPromotionRel | FreeShippingPromotionRel | GiftCardRel | PaymentMethodRel | PercentageDiscountPromotionRel | ShipmentRel | SkuRel

}


interface LineItemUpdate extends ResourceUpdate {
	
	sku_code?: string
	bundle_code?: string
	quantity?: number
	name?: string
	image_url?: string
	
}


class LineItems extends ApiResource {

	static readonly TYPE: 'line_items' = 'line_items'
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
		const _lineItemId = (lineItemId as LineItem).id || lineItemId
		return this.resources.fetch<Order>({ type: 'orders' }, `line_items/${_lineItemId}/order`, params, options) as unknown as Order
	}

	async line_item_options(lineItemId: string | LineItem, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<LineItemOption>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId
		return this.resources.fetch<LineItemOption>({ type: 'line_item_options' }, `line_items/${_lineItemId}/line_item_options`, params, options) as unknown as ListResponse<LineItemOption>
	}

	async stock_line_items(lineItemId: string | LineItem, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockLineItem>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId
		return this.resources.fetch<StockLineItem>({ type: 'stock_line_items' }, `line_items/${_lineItemId}/stock_line_items`, params, options) as unknown as ListResponse<StockLineItem>
	}

	async stock_transfers(lineItemId: string | LineItem, params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<StockTransfer>> {
		const _lineItemId = (lineItemId as LineItem).id || lineItemId
		return this.resources.fetch<StockTransfer>({ type: 'stock_transfers' }, `line_items/${_lineItemId}/stock_transfers`, params, options) as unknown as ListResponse<StockTransfer>
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
