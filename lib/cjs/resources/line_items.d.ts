import { ApiResource, Resource, ResourceCreate, ResourceUpdate, ResourcesConfig, ResourceId, ListResponse } from '../resource';
import { /* QueryBuilderRetrieve, QueryBuilderList, */ QueryParamsList, QueryParamsRetrieve } from '../query';
import { Order } from './orders';
import { Adjustment } from './adjustments';
import { Bundle } from './bundles';
import { ExternalPromotion } from './external_promotions';
import { FixedAmountPromotion } from './fixed_amount_promotions';
import { FreeShippingPromotion } from './free_shipping_promotions';
import { GiftCard } from './gift_cards';
import { PaymentMethod } from './payment_methods';
import { PercentageDiscountPromotion } from './percentage_discount_promotions';
import { Shipment } from './shipments';
import { Sku } from './skus';
import { LineItemOption } from './line_item_options';
import { StockLineItem } from './stock_line_items';
import { StockTransfer } from './stock_transfers';
declare type LineItemRel = ResourceId & {
    type: typeof LineItems.TYPE;
};
declare type OrderRel = ResourceId & {
    type: 'orders';
};
declare type AdjustmentRel = ResourceId & {
    type: 'adjustments';
};
declare type BundleRel = ResourceId & {
    type: 'bundles';
};
declare type ExternalPromotionRel = ResourceId & {
    type: 'external_promotions';
};
declare type FixedAmountPromotionRel = ResourceId & {
    type: 'fixed_amount_promotions';
};
declare type FreeShippingPromotionRel = ResourceId & {
    type: 'free_shipping_promotions';
};
declare type GiftCardRel = ResourceId & {
    type: 'gift_cards';
};
declare type PaymentMethodRel = ResourceId & {
    type: 'payment_methods';
};
declare type PercentageDiscountPromotionRel = ResourceId & {
    type: 'percentage_discount_promotions';
};
declare type ShipmentRel = ResourceId & {
    type: 'shipments';
};
declare type SkuRel = ResourceId & {
    type: 'skus';
};
interface LineItem extends Resource {
    sku_code?: string;
    bundle_code?: string;
    quantity?: number;
    currency_code?: string;
    unit_amount_cents?: number;
    unit_amount_float?: number;
    formatted_unit_amount?: string;
    options_amount_cents?: number;
    options_amount_float?: number;
    formatted_options_amount?: string;
    discount_cents?: number;
    discount_float?: number;
    formatted_discount?: string;
    total_amount_cents?: number;
    total_amount_float?: number;
    formatted_total_amount?: string;
    tax_amount_cents?: number;
    tax_amount_float?: number;
    formatted_tax_amount?: string;
    name?: string;
    image_url?: string;
    discount_breakdown?: object;
    tax_rate?: number;
    tax_breakdown?: object;
    item_type?: string;
    order?: Order;
    item?: Adjustment | Bundle | ExternalPromotion | FixedAmountPromotion | FreeShippingPromotion | GiftCard | PaymentMethod | PercentageDiscountPromotion | Shipment | Sku;
    line_item_options?: LineItemOption[];
    /**
    * @deprecated This field should not be used as it may be removed in the future without notice
    */
    shipment_line_items?: object[];
    stock_line_items?: StockLineItem[];
    stock_transfers?: StockTransfer[];
}
interface LineItemCreate extends ResourceCreate {
    sku_code?: string;
    bundle_code?: string;
    quantity: number;
    _external_price?: boolean;
    _update_quantity?: boolean;
    unit_amount_cents?: number;
    name?: string;
    image_url?: string;
    item_type?: string;
    order: OrderRel;
    item?: AdjustmentRel | BundleRel | ExternalPromotionRel | FixedAmountPromotionRel | FreeShippingPromotionRel | GiftCardRel | PaymentMethodRel | PercentageDiscountPromotionRel | ShipmentRel | SkuRel;
}
interface LineItemUpdate extends ResourceUpdate {
    sku_code?: string;
    bundle_code?: string;
    quantity?: number;
    name?: string;
    image_url?: string;
}
declare class LineItems extends ApiResource {
    static readonly TYPE: 'line_items';
    list(params?: QueryParamsList, options?: ResourcesConfig): Promise<ListResponse<LineItem>>;
    create(resource: LineItemCreate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem>;
    retrieve(id: string, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem>;
    update(resource: LineItemUpdate, params?: QueryParamsRetrieve, options?: ResourcesConfig): Promise<LineItem>;
    delete(id: string, options?: ResourcesConfig): Promise<void>;
    isLineItem(resource: any): resource is LineItem;
    relationship(id: string | ResourceId): LineItemRel;
    type(): string;
}
export default LineItems;
export { LineItem, LineItemCreate, LineItemUpdate };
